# frozen_string_literal: true

class RecommendationController < ApplicationController
  before_action :authenticate_user!, :instructor?

  def index
    @user = current_user
    get_students
    @pagy, @students = pagy(User.order(last_name: :asc))
  end

  def get_students
    @students ||= query_students
  end

  def query_students
    return User.where(user_type: "student").order(last_name: :asc) unless User.all.empty?
  end

  def get_instructor_name(instructor_id)
    @first_name = User.where(id: instructor_id).first_name
    @last_name = User.where(id: instructor_id).last_name
    return @first_name + " " + @last_name

  end

  def get_course_name(course_number)
    return courses.where(id: course_number).course_title
  end
end
