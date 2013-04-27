class Ticket < ActiveRecord::Base
  attr_accessible :data, :time, :doctor_id, :selector_id, :user_id 
   belongs_to :user
end
