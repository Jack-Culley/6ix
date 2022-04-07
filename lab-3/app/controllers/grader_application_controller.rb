# frozen_string_literal: true

class GraderApplicationController < ApplicationController
  respond_to :html
  before_action :authenticate_user!

  def index; end

  def new
    @user = current_user
    @course = Course.new
  end

  def create
    @user = current_user
    courses_taken = application_params&.dig(:courses_taken_attributes).to_h
    courses_taken.each do |key, _value|
      course_params = courses_taken[key]
      course_params.delete('_destroy')
      @course = CoursesTaken.create(course_params)
      respond_with(@user, @course) && return unless @course.valid?
    end

    flash[:notice] = 'Successfully submitted course(s) taken'
    redirect_to dashboard_index_path
  end

  def application_params
    params.require(:user).permit(courses_taken_attributes: %i[id letter_grade department course_number _destroy],
                                 availability: [monday: %i[is_available start_time
                                                           end_time], tuesday: %i[is_available start_time
                                                                                  end_time], wednesday: %i[is_available start_time
                                                                                                           end_time], thursday: %i[
                                                                                                             is_available start_time end_time
                                                                                                           ], friday: %i[
                                                                                                             is_available start_time end_time
                                                                                                           ]])
  end
end
