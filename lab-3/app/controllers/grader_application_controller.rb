class GraderApplicationController < ApplicationController
  before_action :authenticate_user!
  
  def index; end
  
  def new 
    @user = current_user
  end

  def create
    binding.pry
    @user = current_user
  end

  def application_params
    params.require(:user).require(:courses_taken).permit(:grade)
  end
end
