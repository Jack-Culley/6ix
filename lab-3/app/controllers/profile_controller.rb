# frozen_string_literal: true

class ProfileController < ApplicationController
  def index
    @user = current_user
  end

  def get_requests(section_number)
    section = Section.find_by(section_number: section_number)
    course = CoursesTaken.find(section.course_id)
    if course.is_requested.include?(section_number.to_s)
      stud = User.find_by(id: course.user_id)
      return stud.email
    end
  end
  helper_method :get_requests

  def get_course_title(course_number)
    course = Course.find_by(course_number: course_number)
    return course.course_title
  end
  helper_method :get_course_title
end
