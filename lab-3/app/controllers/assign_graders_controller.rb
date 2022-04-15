# frozen_string_literal: true

class AssignGradersController < ApplicationController
  before_action :admin?
  def index
    @open_sections = Section.joins('INNER JOIN courses c ON sections.course_id = c.id').where('number_of_graders < number_of_graders_required')
    @filled_sections = Section.joins('INNER JOIN courses c ON sections.course_id = c.id').where('number_of_graders >= number_of_graders_required')
    # used for displaying the button only on the dashboard page
    @on_assign_graders_page = true
  end
end
