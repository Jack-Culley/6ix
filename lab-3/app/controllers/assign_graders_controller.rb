# frozen_string_literal: true

class AssignGradersController < ApplicationController
  before_action :admin?
  def index
    @open_sections = Section.joins('INNER JOIN courses c ON sections.course_id = c.id').where('number_of_graders < number_of_graders_required')
    @filled_sections = Section.joins('INNER JOIN courses c ON sections.course_id = c.id').where('number_of_graders >= number_of_graders_required')
    # used for displaying the button only on the dashboard page
    @on_assign_graders_page = true
  end

  def show
    @section_number = params[:id]
    # #binding.pry
    @section = Section.find_by(section_number: @section_number)
    @possible_graders = possible_graders

    # @requested_graders = User.where()
    # @user = User.all
    # @recommended_graders =
    # @interested_graders =
  end

  def parse_time(availabilities)
    availabilities.each do |availability|
      times = availability.split(',')
      # binding.pry
      startTime = @section.start_time.hour.to_s + @section.start_time.min.to_s
      endTime = @section.end_time.hour.to_s + @section.end_time.min.to_s
      return false unless times[0].to_i <= startTime.to_i && times[1].to_i >= endTime.to_i
    end
    true
  end

  def possible_graders
    possible_graders = []
    User.all.where(user_type: 'student').each do |u|
      # binding.pry
      available_to_grade = true
      # u.courses_taken.where(course_number: sw1.course_number, department: sw1.department) returns a user with the course in question taken
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
          # break unless parse_time(availabilites)
          if parse_time(availabilities) == false
            available_to_grade = false
            break
          end
        else
          available_to_grade = false
          break
        end
      end
      possible_graders << u if u.courses_taken.where(course_number: @section.course.course_number,
                                                     department: @section.course.department) && available_to_grade
    end
    possible_graders
  end
end
