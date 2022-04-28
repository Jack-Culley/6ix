# frozen_string_literal: true

class AssignGradersController < ApplicationController
  before_action :admin?
  def index
    # binding.pry
    @open_courses ||= Course.joins('INNER JOIN sections s ON courses.id = s.course_id').where('number_of_graders < number_of_graders_required').for_params(filter_params_open).order(course_number: sort_order_open).pluck(:id)
    open_sections ||= Section.where(course_id: @open_courses).where('number_of_graders < number_of_graders_required')
    @filled_courses ||= Course.joins('INNER JOIN sections s ON courses.id = s.course_id').where('number_of_graders >= number_of_graders_required').for_params(filter_params_filled).order(course_number: sort_order_filled).pluck(:id)
    filled_sections ||= Section.where(course_id: @filled_courses).where('number_of_graders >= number_of_graders_required')
    @pagy_open, @open_sections = pagy(open_sections, page_param: :page_open)
    @pagy_filled, @filled_sections = pagy(filled_sections, page_param: :page_filled)
    # used for displaying the button only on the dashboard page
    @on_assign_graders_page = true
  end

  def show
    @section_number = params[:id]
    @section = Section.find_by(section_number: @section_number)
    @possible_graders = possible_graders
  end

  def update
    # update required number
    @section_number = params[:id]
    new_number = params[:section][:number_of_graders_required]
    @section = Section.find_by(section_number: @section_number)
    @section.update(number_of_graders_required: new_number)

    # update graders list
    graders_hash = params[:graders]

    if !graders_hash.nil?
      graders_array = []

      graders_hash.each do |key, _value|
        graders_array << key.to_i
      end

      @section.update(grader_ids: graders_array, number_of_graders: graders_array.length)
    else
      @section.update(grader_ids: [], number_of_graders: 0)
    end

    # flashes alert
    if @section.valid?
      flash[:notice] = 'Section updated!'
      redirect_to assign_graders_url
    else
      respond_with @section
    end
  end

  # this method parses availabilities json and returns true if user's availability matches section's
  def parse_time(availabilities)
    availabilities.each do |availability|
      times = availability.split(',')
      startTime = @section.start_time.hour.to_s + @section.start_time.min.to_s
      endTime = @section.end_time.hour.to_s + @section.end_time.min.to_s
      return false unless times[0].to_i <= startTime.to_i && times[1].to_i >= endTime.to_i
    end
    true
  end

  # this method determines and array of possible graders for a section based on their availability
  def possible_graders
    possible_graders = []
    User.all.where(user_type: 'student').each do |u|
      available_to_grade = true
      start_time = DateTime.parse(@section.start_time.to_s)
      end_time = DateTime.parse(@section.end_time.to_s)
      days_of_the_week = @section.days_of_the_week
      # [false, true, false, nil, false, false, false]
      if u.availability.nil?
        available_to_grade = false
        next
      end
      user_availabilities = JSON.parse(u.availability.availability_json)&.dig('data')
      # {"monday"=>{"is_available"=>"1", "availabilities"=>"(0000,2400),(1231231)"},
      #  "tuesday"=>{"is_available"=>"1", "availabilities"=>"(0000,2400)"},
      #  "wednesday"=>{"is_available"=>"1", "availabilities"=>"(0000,2400)"},
      #  "thursday"=>{"is_available"=>"1", "availabilities"=>"(0000,2400)"},
      #  "friday"=>{"is_available"=>"1", "availabilities"=>"(0000,2400)"}}}
      user_availabilities.each_with_index do |(_day, data), index|
        next unless days_of_the_week[index]

        available_for_day = data['is_available'].to_i == 1
        if available_for_day == days_of_the_week[index]
          availabilities = data['availabilities'].gsub('(', '').split(/\),/)
          availabilities.last.chop!
          if parse_time(availabilities) == false
            available_to_grade = false
            break
          end
        else
          available_to_grade = false
          break
        end
      end
      u.courses_taken.each do |userCourse|
        if userCourse.course_number == @section.course.course_number && userCourse.department == @section.course.department && available_to_grade
          possible_graders << u
        end
      end
    end
    possible_graders
  end

  def filter_params_open
    h = {}
    unless params[:course_search_open].nil? || params[:course_search_open].empty?
      h[:course_number] =
        params[:course_search_open]
    end
    h[:term] = params[:term_open] unless params[:term_open].nil? || params[:term_open].empty?

    h
  end

  def filter_params_filled
    h = {}
    unless params[:course_search_filled].nil? || params[:course_search_filled].empty?
      h[:course_number] =
        params[:course_search_filled]
    end
    h[:term] = params[:term_filled] unless params[:term_filled].nil? || params[:term_filled].empty?

    h
  end

  def sort_order_open
    return params[:sort_open] unless params[:sort_open].nil?

    'asc'
  end

  def sort_order_filled
    return params[:sort_filled] unless params[:sort_filled].nil?

    'asc'
  end
end
