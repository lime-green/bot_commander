class Server < ApplicationRecord
  include ActiveModel::Transitions

  has_many :rs_accounts
  attr_accessor :state

  validates :name, presence: true
  validates :name, length: { in: 2..12 }

  validates :ip, presence: true
  validates :ip, format: {with: Resolv::IPv4::Regex, message: "Not a valid ipv4 address"}

  state_machine do
    state :spawned
    state :initializing
    state :ready

    event :mark_spawned do
      transitions to: :spawned, from: :initializing
    end

    event :mark_ready do
      transitions to: :ready, from: :initializing
    end

    event :mark_initializing do
      transitions to: :initializing, from: :spawned
    end
  end
end
