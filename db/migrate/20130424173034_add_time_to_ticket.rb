class AddTimeToTicket < ActiveRecord::Migration
  def change
    add_column :tickets, :time, :string
  end
end
