# frozen_string_literal: true

class GraderApplicationController < ApplicationController
  respond_to :html
  before_action :authenticate_user!, :student?

  def index; end

  def new
    @user = current_user
    @course = Course.new
    @availabilities = Availability.new
  end

  def create
    @user = current_user
    courses_taken = application_params&.dig(:courses_taken_attributes).to_h
    has_errors = false
    ActiveRecord::Base.transaction do
      create_courses_taken(courses_taken)
      availability_params = application_params&.dig(:availability)
      has_errors = create_availabilities(availability_params)
    end

    return if has_errors

    flash[:alert] = nil
    flash[:notice] = 'Successfully submitted course(s) taken'
    redirect_to dashboard_index_path
  end

  private

  def application_params
    params.require(:user).permit(courses_taken_attributes: %i[id letter_grade department course_number _destroy interest],
                                 availability: [monday: %i[is_available
                                                           availabilities], tuesday: %i[is_available
                                                                                        availabilities], wednesday: %i[
                                                                                          is_available availabilities
                                                                                        ], thursday: %i[
                                                                                          is_available availabilities
                                                                                        ], friday: %i[
                                                                                          is_available availabilities
                                                                                        ]])
  end

  def create_courses_taken(courses_taken)
    # TODO: Link courses taken & availabilities to a user
    flash[:alert] = []
    courses_taken.each do |key, _value|
      course_params = courses_taken[key]
      course_params.delete('_destroy')
      next if Course.find_by(id: course_params['id'])

      course_params.delete('id')
      course_params[:user_id] = @user.id
      @course = CoursesTaken.create(course_params)
      flash[:alert] << @course.errors.full_messages unless @course.errors.empty?
    end
  end

  # rubocop:disable Metrics/MethodLength
  # rubocop:disable Metrics/AbcSize
  def create_availabilities(availability_params)
    regexp = /\A(\([0-2]{1}\d{3},[0-2]{1}\d{3}\),{0,1})+\z/
    count = 0
    @availabilities = @user.availability || Availability.new
    # This block ensures that the availabilities are not empty or filled in correctly
    availability_params.to_h.each do |day, value|
      if value[:availabilities].empty?
        count += 1
        next
      end

      unless value[:availabilities].match?(regexp)
        @availabilities.errors.add(day.to_sym,
                                   " availabilites aren't in the correct format.")
      end
    end

    @availabilities.errors.add(:availabilities, ' no availabilities selected') if count == 5
    unless @availabilities.errors.empty? && flash[:alert].empty?
      flash[:alert] << @availabilities.errors.full_messages if @availabilities.errors.any?
      redirect_to new_grader_application_url
      return true
    end

    json_obj = { data: availability_params }.to_json
    @availabilities.update(availability_json: json_obj, user_id: @user.id)
    false
  end
end
