# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
    get_courses
    @pagy = pagy(Course.order(id: :asc))
    # @pagy, @courses = pagy(Course.order(id: :asc))
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

  def query_courses
    return Course.order(id: :asc) unless Course.all.empty?

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
      sections = course_data['sections']
      course_object = Course.create(department: course['subject'], campus: course['campus'],
                                    course_title: course['title'])
      sections.each do |section|
        Section.create(section_number: section['classNumber'].to_i, start_time: section['meetings'].first['startTime'],
                       end_time: section['meetings'].first['endTime'],
                       days_of_the_week: [section['meetings'].first['monday'], section['meetings'].first['tuesday'], section['meetings'].first['wednesday'], section['meetings'].first['thurdsay'], section['meetings'].first['friday'], section['meetings'].first['saturday'], section['meetings'].first['sunday']],
                       number_of_graders: 0, course_id: course_object.id)
      end
    end
  end
end
