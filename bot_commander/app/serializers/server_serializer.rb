class ServerSerializer < ActiveModel::Serializer
  attributes :ip, :name, :state, :rs_accounts, :id

  def rs_accounts
    object.rs_accounts.map do |rs_account|
      rs_account.id
    end
  end

  def state
    object.current_state
  end
end
