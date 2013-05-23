class AddStatusToUserStatus < ActiveRecord::Migration
  def change
    add_column :user_statuses, :status, :string
  end
end
