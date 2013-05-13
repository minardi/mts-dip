class Doctor < ActiveRecord::Base
  attr_accessible :duration, :name, :specialization_id
  belongs_to :specialization
end
