# frozen_string_literal: true

module RecommendationHelper
  include Pagy::Frontend

  def get_instructor_name(instructor_id)
    if instructor_id.nil?
      return "No instructor"
    end
    first_name = User.find(instructor_id).first_name
    last_name = User.find(instructor_id).last_name
    return first_name + " " + last_name
  end

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

  def get_sections_requested(user_id, section_number)
    courses = CoursesTaken.find_by(user_id: user_id)
    if courses.is_requested != ""
      if courses.is_requested.include?(section_number.to_s)
        return "Yes"
      end
      return "No"
    end
  end
end

