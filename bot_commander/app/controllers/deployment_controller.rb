class DeploymentController < ApplicationController
  def deploy_script
    server = Server.find(params[:server_id])
    rs_account = RsAccount.find(params[:rs_account_id])

    if params[:dreambot_account_id]
      dreambot_account = DreambotAccount.find(params[:dreambot_account_id])
    else
      dreambot_account = DreambotAccount.first
    end

    script = Script.find_by(name: params[:script_name])

    render json: {errors: ["Server has invalid state for script deployment: #{server.state}"]}, status: 422 unless server.ready?
    ScriptService.run(server, script, rs_account, dreambot_account)

  rescue StandardError => e
    render json: {errors: [e.message]}, status: 422
  end

  def bootstrap_server
    server = Server.find(params[:server_id])

    render json: {errors: ["Server has invalid state for bootstrapping: #{server.state}"]}, status: 422 unless server.spawned?
    begin
      InitServerService.init(server)
    rescue StandardError => e
      render json: {errors: [e.message]}, status: 422
    end
  end
end
