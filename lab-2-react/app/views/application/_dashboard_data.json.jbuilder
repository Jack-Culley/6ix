json.courses courses do |course|
  json.id course.id
  json.department course.department
  json.campus course.campus
  json.course_title course.course_title
  json.edit edit_course_path(course)
  json.sections course.sections do |section|
    json.section_number section.section_number
    json.start_time get_date(section.start_time)
    json.end_time get_date(section.end_time)
    json.days_of_the_week get_days_of_week(section.days_of_the_week)
    json.number_of_graders section.number_of_graders
  end
end
json.length courses.count
json.pagy pagy
