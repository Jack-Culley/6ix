# frozen_string_literal: true

module RecommendationHelper
  include Pagy::Frontend

  def get_instructor_name(instructor_id)
    return 'No instructor' if instructor_id.nil?

    first_name = User.find(instructor_id).first_name
    last_name = User.find(instructor_id).last_name
    "#{first_name} #{last_name}"
  end

  def get_recommendation_status(user_id, course_num)
    student = User.find(user_id)
    return 'Not Recommended' if student.courses_taken.empty?

    course = student.courses_taken.find_by(course_number: course_num)
    if course.is_recommended
      return 'Recommended'
      exit
    end
    'Not Recommended'
  end

  def get_sections_requested(user_id, section_number)
    courses = CoursesTaken.find_by(user_id: user_id)
    if courses.is_requested != ''
      return 'Yes' if courses.is_requested.include?(section_number.to_s)

      'No'
    end
  end
end
