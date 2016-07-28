class HeartbeatService
  def self.receive(rs_account)
    rs_account.receive_heartbeat!
  end
end
