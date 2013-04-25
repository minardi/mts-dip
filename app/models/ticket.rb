class Ticket < ActiveRecord::Base
  attr_accessible :data, :time, :doctor_id, :selector_id 
end
