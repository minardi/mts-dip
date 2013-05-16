class AddUserIdToUserStatus < ActiveRecord::Migration
  def change
    add_column :user_statuses, :user_id, :integer
  end
end
