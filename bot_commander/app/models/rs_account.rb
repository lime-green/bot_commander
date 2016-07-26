class RsAccount < ApplicationRecord
  include ActiveModel::Transitions

  belongs_to :server, required: false

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
      transitions to: :running, from: :done_tutorial
    end
  end
end
