# frozen_string_literal: false

module DashboardHelper
  def get_days_of_week(days_of_the_week)
    day_string = ''
    days_of_the_week.each_with_index do |day, i|
      day_string << Section::DAYS[i.to_s] if day
    end
    day_string
  end

  def get_date(date)
    return if date.nil?

    date.strftime('%H:%M')
  end

  def convert_term_code(term_code)
    case term_code
    when '1222'
      'Spring 22'
    when '1224'
      'Summer 22'
    when '1228'
      'Autumn 22'
    end
  end
end
