class RsAccount < ApplicationRecord
  include ActiveModel::Transitions

  belongs_to :server, required: false
  scope :limbo_accounts, -> { where(["heartbeat_at < ?", Time.now - 3.minutes]) }

  validates :username, presence: true
  validates :password, presence: true

  state_machine do
    state :created
    state :doing_tutorial
    state :ready
    state :running

    event :failed_tutorial do
      transitions to: :created, from: :doing_tutorial
    end

    event :do_tutorial do
      transitions to: :doing_tutorial, from: :created
    end

    event :mark_ready do
      transitions to: :ready, from: :doing_tutorial
    end

    event :mark_running do
      transitions to: :running, from: :ready, on_transition: :receive_heartbeat!
    end

    event :stop_running do
      transitions to: :ready, from: :running
    end
  end

  def receive_heartbeat!
    self.heartbeat_at = Time.now
    self.save!
  end
end
