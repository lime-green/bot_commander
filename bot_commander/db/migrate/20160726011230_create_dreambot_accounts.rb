class CreateDreambotAccounts < ActiveRecord::Migration[5.0]
  def change
    create_table :dreambot_accounts do |t|
      t.string :username, null: false
      t.string :password, null: false

      t.timestamps
    end
  end
end
