class DreambotAccountsController < ApplicationController
  before_action :get_account, only: [:update, :destroy]

  def index
    @dreambot_accounts = DreambotAccount.all
    render json: @dreambot_accounts
  end

  def create
    @dreambot_account = DreambotAccount.new

    if @dreambot_account.save
      render json: @dreambot_account
    else
      render json: {errors: @dreambot_account.errors.full_messages}, status: 400
    end
  end

  def update
    if @dreambot_account.update_attributes(dreambot_account_params)
      render json: @dreambot_account
    else
      render json: {errors: @dreambot_account.errors.full_messages}, status: 400
    end
  end

  def destroy
    @dreambot_account.destroy
    head :no_content
  end

  private

  def dreambot_account_params
    params.require(:dreambot_account).permit(:username, :password)
  end

  def get_account
    @dreambot_account = DreambotAccount.find(params[:id])
  end
end
