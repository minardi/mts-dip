class Ticket < ActiveRecord::Base
<<<<<<< HEAD
  attr_accessible :data, :time, :doctor_id, :user_id, :status 
=======
  
  attr_accessible :data, :time, :doctor_id, :user_id
>>>>>>> 577f1f69801d3368c9088b00cfd8e757314f0bac
   belongs_to :user
   belongs_to :doctor
end
