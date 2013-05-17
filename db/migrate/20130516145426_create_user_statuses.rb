class CreateUserStatuses < ActiveRecord::Migration
  def change
    create_table :user_statuses do |t|
      t.integer :missing_count

      t.timestamps
    end
  end
end
