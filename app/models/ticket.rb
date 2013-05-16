class Ticket < ActiveRecord::Base
  attr_accessible :data, :time, :doctor_id, :user_id, :status 
   belongs_to :user
end
