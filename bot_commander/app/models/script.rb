class Script < ApplicationRecord
  validates :name, presence: true

  def self.get_ram_setting
    255
  end
end
