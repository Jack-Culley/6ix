# frozen_string_literal: true

class UserApprovalController < ApplicationController
  before_action :admin?
  def index
    @unapproved_users = User.where(is_approved: false)

    #used for displaying the button only on the dashboard page
    @on_approval_page = true
  end

  def approve_button_click
    @user = User.find_by(id: params[:id])
    @user.update(is_approved:true)
    if(@user.valid?)
      flash[:notice]='User has been approved'
      redirect_to user_approval_index_path
    else
      flash[:alert]='Failed to approve user'
    end
  end
end
