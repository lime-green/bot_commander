class CreateServers < ActiveRecord::Migration[5.0]
  def change
    create_table :servers do |t|
      t.string :ip, null: false
      t.string :name
      t.string :state

      t.timestamps
    end
  end
end
