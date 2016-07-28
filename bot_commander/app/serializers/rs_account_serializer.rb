class RsAccountSerializer < ActiveModel::Serializer
  attributes :username, :password, :state, :server, :id

  def server
    object.server.try(:id)
  end

  def state
    object.current_state
  end
end
