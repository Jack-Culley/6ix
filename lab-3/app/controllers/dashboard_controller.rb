# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
    get_courses
    courses = Course.where(term: params[:refresh][:semester]).order(id: :asc) unless params[:refresh].nil?
    courses = Course.order(id: :asc) if params[:refresh]&.dig(:semester)&.empty?
    @pagy, @courses = pagy(courses || Course.order(id: :asc))
    @sections = Section.all
  end

  def destroy
    Section.delete_all
    Course.delete_all
    redirect_to dashboard_index_path
  end

  private

  def get_courses
    @courses ||= query_courses
  end

  def api_params(page = nil)
    h = { q: 'cse', campus: 'col' }
    return h if params[:refresh].nil?

    h[:term] = params[:refresh][:semester]
    h[:page] = page if page
    h
  end

  def build_courses
    data = osu_client.get('classes/search', api_params).to_hash&.dig(:body, 'data')
    save_courses(data['courses'])
    total_pages = data['totalPages']
    2.upto(total_pages) do |page|
      data = osu_client.get('classes/search',
                            api_params(page)).to_hash&.dig(:body, 'data')
      save_courses(data['courses'])
    end
  end

  def query_courses
    return unless Course.all.empty?

    build_courses

    Course.all
  end

  def term_code(course)
    return '1222' if course['term'].include?('Spring')
    return '1224' if course['term'].include?('Summer')
    return '1228' if course['term'].include?('Autumn')
  end

  def save_courses(courses)
    courses.each do |course_data|
      course = course_data['course']
      sections = course_data['sections']
      course_object = Course.create(department: course['subject'], campus: course['campus'],
                                    course_title: course['title'], course_number: course['catalogNumber'], term: term_code(course))
      sections.each do |section|
        Section.create(section_number: section['classNumber'].to_i, start_time: section['meetings'].first['startTime'],
                       end_time: section['meetings'].first['endTime'],
                       days_of_the_week: [section['meetings'].first['monday'], section['meetings'].first['tuesday'], section['meetings'].first['wednesday'], section['meetings'].first['thurdsay'], section['meetings'].first['friday'], section['meetings'].first['saturday'], section['meetings'].first['sunday']],
                       number_of_graders: 0, course_id: course_object.id)
      end
    end
  end
end
