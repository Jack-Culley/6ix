# frozen_string_literal: true

class CourseController < ApplicationController
  respond_to :html

  before_action :admin?

  def edit
    @course = Course.find_by(id: params[:id])
  end

  def update
    @course = Course.find_by(id: params[:id])
    @course.update(course_params)
    if @course.valid?
      redirect_to dashboard_index_url
    else
      respond_with @course
    end
  end

  def destroy
    course = Course.find_by(id: params[:id])
    sections = Section.where(course_id: course.id)
    sections.delete_all
    course.delete
    redirect_to dashboard_index_url
  end

  def new
    @course = Course.new
  end

  def create
    @course = Course.create(course_params)
    if @course.valid?
      redirect_to dashboard_index_url
    else
      respond_with @course
    end
  end

  private

  def course_params
    params.require(:course).permit(:department, :campus, :course_title)
  end
end
