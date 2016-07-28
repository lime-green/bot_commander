class AddHeartbeatAtToRsAccounts < ActiveRecord::Migration[5.0]
  def change
    add_column :rs_accounts, :heartbeat_at, :datetime
  end
end
