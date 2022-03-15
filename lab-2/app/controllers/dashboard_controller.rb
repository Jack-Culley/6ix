# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
    get_courses
  end

  private

  def get_courses
    @courses ||= query_courses
  end

  def query_courses
    return Course.all unless Course.all.empty?

    data = osu_client.get('classes/search', { q: 'cse', campus: 'col', term: '1222' }).to_hash&.dig(:body, 'data')
    save_courses(data['courses'])
    total_pages = data['totalPages']
    2.upto(total_pages) do |page|
      data = osu_client.get('classes/search',
                            { q: 'cse', campus: 'col', term: '1222', p: page }).to_hash&.dig(:body, 'data')
      save_courses(data['courses'])
    end

    Course.all
  end

  def save_courses(courses)
    courses.each do |course_data|
      course = course_data['course']
      Course.create(department: course['subject'], campus: course['campus'], course_title: course['title'])
    end
  end
end
