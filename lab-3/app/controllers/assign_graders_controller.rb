# frozen_string_literal: true

class AssignGradersController < ApplicationController
    before_action :admin?
    def index
    
        # used for displaying the button only on the dashboard page
        @on_assign_graders_page = true
      end
end