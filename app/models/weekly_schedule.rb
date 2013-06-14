class WeeklySchedule < ActiveRecord::Base
  
  attr_accessible :doctor_id, :schedule
  
  serialize :schedule
  
  belongs_to :doctor
	
end
