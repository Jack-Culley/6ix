# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
    get_courses
    courses = filter_courses
    @pagy, @courses = pagy(courses || Course.order(id: sort_order.to_sym))
    @sections = Section.all
  end

  def destroy
    Section.delete_all
    Course.delete_all
    redirect_to dashboard_index_path
  end

  private

  def filter_courses
    return Course.for_course_number(params[:course_search]).order(id: sort_order.to_sym) unless params[:course_search].nil?
    return Course.for_level(params[:course_level].to_i).order(id: sort_order.to_sym) unless params[:course_level].nil?
    return Course.order(id: sort_order.to_sym) if params[:refresh]&.dig(:semester)&.empty?
    return Course.for_term(params[:refresh][:semester]).order(id: sort_order.to_sym) unless params[:refresh].nil?
  end

  def sort_order
    return params[:sort] unless params[:sort].nil?

    'asc'
  end

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
    #data = osu_client.get('classes/search', api_params).to_hash&.dig(:body, 'data')
    # spring 1222, fall 1228, summer 1224
    course_codes = ['1222','1228','1224']
    course_codes.each do |code|
      data = osu_client.get('classes/search', { q: 'cse', campus: 'col', term: code }).to_hash&.dig(:body, 'data')
      save_courses(data['courses'])
      total_pages = data['totalPages']
      2.upto(total_pages) do |page|
        data = osu_client.get('classes/search',
          { q: 'cse', campus: 'col', term: code, p: page }).to_hash&.dig(:body, 'data')
        save_courses(data['courses'])
      end
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
                       days_of_the_week: [section['meetings'].first['monday'], section['meetings'].first['tuesday'], section['meetings'].first['wednesday'], section['meetings'].first['thursdsay'], section['meetings'].first['friday'], section['meetings'].first['saturday'], section['meetings'].first['sunday']],
                       number_of_graders: 0, course_id: course_object.id)
      end
    end
  end
end
