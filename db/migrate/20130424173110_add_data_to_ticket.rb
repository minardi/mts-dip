class AddDataToTicket < ActiveRecord::Migration
  def change
    add_column :tickets, :data, :string
  end
end
