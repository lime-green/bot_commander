class CreateRsAccounts < ActiveRecord::Migration[5.0]
  def change
    create_table :rs_accounts do |t|
      t.string :username, null: false
      t.string :password, null: false
      t.string :state
      t.references :server

      t.timestamps
    end
  end
end
