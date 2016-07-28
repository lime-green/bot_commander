class ServersController < ApplicationController
  before_action :get_server, only: [:update, :destroy]

  def index
    @servers = Server.all
    render json: @servers
  end

  def create
    @server = ::Server.new(server_params)

    if @server.save
      render json: @server
    else
      render json: {errors: @server.errors.full_messages}, status: 400
    end
  end

  def update
    if @server.update_attributes(server_params)
      render json: @server
    else
      render json: {errors: @server.errors.full_messages}, status: 400
    end
  end

  def destroy
    @server.destroy
    head :no_content
  end

  private

  def server_params
    params.require(:server).permit(:name, :ip)
  end

  def get_server
    @server = Server.find(params[:id])
  end
end
