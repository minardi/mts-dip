class WeeklySchedule < ActiveRecord::Base
  
  attr_accessible :doctor_id, :schedule, :start, :end
  
  serialize :schedule
  
  belongs_to :doctor
	
end
