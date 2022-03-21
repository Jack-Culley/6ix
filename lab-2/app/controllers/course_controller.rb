class CourseController < ApplicationController
  def edit
    @course = Course.find_by(id: params[:id])
  end

  def update; end
end
