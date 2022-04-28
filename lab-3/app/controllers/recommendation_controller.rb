# frozen_string_literal: true

class RecommendationController < ApplicationController
  before_action :authenticate_user!, :instructor?

  def index
    @user = current_user
    query_students
    @pagy, @students = pagy(User.where(user_type: 'student').order(last_name: :asc))
    @sections = Section.all
  end

  def query_students
    @students ||= User.where(user_type: 'student') unless User.where(user_type: 'student').empty?
  end

  def recommend_button_click
    @course = CoursesTaken.find_by(user_id: params[:id], course_number: params[:course_number])
    if @course.is_recommended?
      flash[:alert] = 'Student is already recommended'
      return
    end
    @course.update(is_recommended: true)
    if @course.is_recommended?
      flash[:notice] = 'Student has been recommended'
      redirect_to recommendation_index_path
    else
      flash[:alert] = 'Failed to recommend student'
    end
  end

  def request_button_click
    @user = current_user
    @instructor = User.find_by(id: params[:iid])
    @student = User.find_by(id: params[:sid])
    @course = CoursesTaken.find_by(course_number: params[:course_number])
    @section = Section.find_by(section_number: params[:section_number])
    if @user.id != @section.instructor_id
      flash[:alert] = 'You can only request students for your section.'
      redirect_to recommendation_index_path
      return
    end
    @course.update(is_requested: @course.is_requested << " #{params[:section_number]}")
    if @course.is_requested?
      flash[:notice] = 'Student has been requested for your section'
      redirect_to recommendation_index_path
    else
      flash[:alert] = 'Failed to request student'
    end
  end
end
