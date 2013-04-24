class RemoveDataTime2FromTicket < ActiveRecord::Migration
  def up
    remove_column :tickets, :data_time
  end

  def down
    add_column :tickets, :data_time, :string
  end
end
