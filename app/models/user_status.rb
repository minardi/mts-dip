class UserStatus < ActiveRecord::Base
  attr_accessible :missing_count, :user_id
end
