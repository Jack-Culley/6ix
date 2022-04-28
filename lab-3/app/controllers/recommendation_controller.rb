# frozen_string_literal: true

class RecommendationController < ApplicationController
  before_action :authenticate_user!, :instructor?

  def index
    @user = current_user
    @pagy, @students = pagy(User.order(last_name: :asc))
    @students = query_students
    @sections = Section.all
  end

  def query_students
    return User.where(user_type: "student").order(last_name: :asc) unless User.all.empty?
  end

  def get_instructor_name(instructor_id)
    if instructor_id == nil
      return "No instructor"
    end
    first_name = User.find(instructor_id).first_name
    last_name = User.find(instructor_id).last_name
    return first_name + " " + last_name
  end
  helper_method :get_instructor_name

  def get_recommendation_status(user_id, course_num)
    student = User.find(user_id)
    if student.courses_taken.empty?
      return "Not Recommended"
    end
    course = student.courses_taken.find_by(course_number: course_num)
    if course.is_recommended
        return "Recommended"
        exit
      end
      return "Not Recommended"
    end

  helper_method :get_recommendation_status

  def get_sections_requested(user_id, section_number)
    courses = CoursesTaken.find_by(user_id: user_id)
    if courses.is_requested != ""
      if courses.is_requested.include?(section_number.to_s)
        return "Yes"
      end
      return "No"
    end
  end
  helper_method :get_sections_requested

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
