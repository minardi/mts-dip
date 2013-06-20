class CreateWeeklySchedules < ActiveRecord::Migration
  def change
    create_table :weekly_schedules do |t|
      t.integer :doctor_id
      t.text :schedule
      t.text :start
      t.text :end
      
      t.timestamps
    end
  end
end
