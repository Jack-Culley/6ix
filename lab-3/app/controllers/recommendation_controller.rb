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
    first_name = User.find(id: instructor_id).first_name
    last_name = User.find(id: instructor_id).last_name
    return first_name + " " + last_name
  end
  helper_method :get_instructor_name

  def get_recommendation_status(user_id)
    student = User.find(user_id)
    if student.courses_taken.empty?
      return "Not Recommended"
    end
    courses = student.courses_taken
    courses.all.each do |c|
        if c.is_recommended
          return "Recommended"
          exit
        end
        return "Not Recommended"
      end
    end
  helper_method :get_recommendation_status


end
