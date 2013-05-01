class RemoveSelectorIdFromTicket < ActiveRecord::Migration
  def up
    remove_column :tickets, :selector_id
  end

  def down
    add_column :tickets, :selector_id, :string
  end
end
