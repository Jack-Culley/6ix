# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }
  root 'home#index'
  resources 'dashboard', only: %w[index destroy]
  resources 'refresh', only: %w[index]
  resources 'course'
  resources 'profile', only: %w[index]
  resources 'grader_application'
  resources 'user_approval' do
    collection do
      put :approve_button_click
    end
  end
  resources 'assign_graders'
  # get '/assign_graders_to_section/:id', to: 'assign_graders_to_section#index', as: 'section'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
