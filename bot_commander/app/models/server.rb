class Server < ApplicationRecord
  include ActiveModel::Transitions

  has_many :rs_accounts

  state_machine do
    state :spawned
    state :ready

    event :mark_ready do
      transitions to: :ready, from: :spawned
    end
  end
end
