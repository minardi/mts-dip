class AddSelectorIdToTicket < ActiveRecord::Migration
  def change
    add_column :tickets, :selector_id, :string
  end
end
