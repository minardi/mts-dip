class User < ActiveRecord::Base
  attr_accessible :email, :password

<<<<<<< HEAD
  #validates: email, :presence => true
  #validates: password, :presence => true
=======
  validates :email, :presence => true

>>>>>>> 8e4bd4e0a5d9b4da7e09ba98b95f572b722a4904
end
