class RsAccountsController < ApplicationController
  before_action :get_account, only: [:update, :destroy, :receive_heartbeat, :mark_ready]

  def mark_ready
    @rs_account.mark_ready!
  end

  def receive_heartbeat
    HeartbeatService.receive(@rs_account)
  end

  def index
    @rs_accounts = RsAccount.all
    render json: @rs_accounts
  end

  def create
    @rs_account = RsAccount.new

    if @rs_account.save
      render json: @rs_account
    else
      render json: {errors: @rs_account.errors.full_messages}, status: 400
    end
  end

  def update
    if @rs_account.update_attributes(rs_account_params)
      render json: @rs_account
    else
      render json: {errors: @rs_account.errors.full_messages}, status: 400
    end
  end

  def destroy
    @rs_account.destroy
    head :no_content
  end

  private

  def rs_account_params
    params.require(:rs_account).permit(:rs_account)
  end

  def get_account
    @rs_account = RsAccount.find(params[:id])
  end
end
