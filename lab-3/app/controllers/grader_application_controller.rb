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

  def edit
    @user = current_user
    @course = Course.find(params[:id])
    @availabilities = Availability.find(params[:id])
  end

  def update
    @user = current_user
    update_user_courses
    has_errors = update_user_availabilities
    return if has_errors
    
    flash[:alert] = nil
    flash[:notice] = 'Successfully updated course(s) taken'
    return redirect_to dashboard_index_path

    
  end



  private

  def update_user_courses
    flash[:alert] = []
    courses_taken=application_params&.dig(:courses_taken_attributes).to_h
    courses_taken.each do |key, _value|
      course_params = courses_taken[key]
      should_destroy = course_params.dig('_destroy')=='1'? true:false
      @user.courses_taken.delete(course_params[:id].to_i)if should_destroy 
      next if should_destroy
      course_params.delete('_destroy')
      
      @course = CoursesTaken.find_or_initialize_by(id: course_params[:id], course_number: course_params[:course_number]).tap do |course_taken|
        course_taken.letter_grade = course_params[:letter_grade]
        course_taken.department = course_params[:department]
        course_taken.course_number = course_params[:course_number]
        course_taken.is_requested = course_params[:is_requested] 
        course_taken.user_id = current_user.id
        course_taken.interest = course_params[:interest]
      end
      @course.save
      flash[:alert] << @course.errors.full_messages unless @course.errors.empty?
    end
  end

  def update_user_availabilities
    availability_params = application_params&.dig(:availability)
    availability_params.to_h.each do |day, value|
      if (value[:is_available]=='0' && !value[:availabilities].empty?)     
        availability_params[day.to_sym][:availabilities]=''  
      elsif (value[:is_available]=='1' && value[:availabilities].empty?)
        availability_params[day.to_sym][:is_available] = '0'       
      end 
    end
    create_availabilities(availability_params, is_edit:true)
  end

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
  def create_availabilities(availability_params, is_edit:false)
    regexp = /\A(\([0-2]{1}\d{3},[0-2]{1}\d{3}\),{0,1})+\z/
    count = 0
    @availabilities = @user.availability || Availability.create
    # This block ensures that the availabilities are not empty or filled in correctly
    availability_params.to_h.each do |day, value|
      if value[:availabilities].empty?
        count += 1
        next
      end

      unless value[:availabilities].match?(regexp)
        @availabilities.errors.add(day.to_sym,
                                   " availabilities aren't in the correct format.")
      end
    end

    @availabilities.errors.add(:availabilities, ' no availabilities selected') if count == 5
    unless @availabilities.errors.empty? && flash[:alert].empty?
      flash[:alert] << @availabilities.errors.full_messages if @availabilities.errors.any?
      if(is_edit)
        redirect_to edit_grader_application_url(current_user.id)
      else
        redirect_to new_grader_application_url
      end
      return true
    end

    json_obj = { data: availability_params }.to_json
    @availabilities.update(availability_json: json_obj, user_id: @user.id)
    false
  end
end
