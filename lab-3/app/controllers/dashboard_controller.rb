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
    unless params[:course_level].nil? || params[:course_level].empty?
      return Course.for_params_with_level(filter_params,
                                          params[:course_level].to_i).order(course_number: sort_order)
    end

    Course.for_params(filter_params).order(course_number: sort_order)
  end

  def filter_params
    h = {}
    h[:course_number] = params[:course_search] unless params[:course_search].nil? || params[:course_search].empty?
    h[:term] = params[:term] unless params[:term].nil? || params[:term].empty?

    h
  end

  def sort_order
    return params[:sort] unless params[:sort].nil?

    'asc'
  end

  def get_courses
    @courses ||= query_courses
  end

  def build_courses(term)
    data = osu_client.get('classes/search', { q: 'cse', campus: 'col', term: term }).to_hash&.dig(:body, 'data')
    save_courses(data['courses'], term)
    total_pages = data['totalPages']
    2.upto(total_pages) do |page|
      data = osu_client.get('classes/search',
                            { q: 'cse', campus: 'col', term: term, p: page }).to_hash&.dig(:body, 'data')
      save_courses(data['courses'], term)
    end
  end

  def query_courses
    return unless Course.all.empty?

    build_courses('1222')
    build_courses('1224')
    build_courses('1228')

    Course.all
  end

  def save_courses(courses, term)
    courses.each do |course_data|
      course = course_data['course']
      sections = course_data['sections']
      course_object = Course.find_or_create_by(department: course['subject'], campus: course['campus'],
                                               course_title: course['title'], course_number: course['catalogNumber'], term: term)
      sections.each do |section|
        s = Section.create(section_number: section['classNumber'].to_i, start_time: section['meetings'].first['startTime'],
                           end_time: section['meetings'].first['endTime'],
                           days_of_the_week: [section['meetings'].first['monday'], section['meetings'].first['tuesday'], section['meetings'].first['wednesday'], section['meetings'].first['thursday'], section['meetings'].first['friday'], section['meetings'].first['saturday'], section['meetings'].first['sunday']],
                           number_of_graders: 0, course_id: course_object.id)
      end
    end
  end
end
