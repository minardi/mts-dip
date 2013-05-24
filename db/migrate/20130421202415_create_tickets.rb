class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.integer :doctor_id

      t.timestamps
    end
  end
end
