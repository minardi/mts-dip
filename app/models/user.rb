class User < ActiveRecord::Base
  attr_accessible :email, :password

  validates :email, :presence => true

end
