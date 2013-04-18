class CreateWeeklySchedules < ActiveRecord::Migration
  def change
    create_table :weekly_schedules do |t|
      t.integer :doctor_id
      t.text :schedule

      t.timestamps
    end
  end
end
