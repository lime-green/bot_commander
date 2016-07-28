class ScriptsController < ApplicationController
  before_action :get_script, only: [:update, :destroy]

  def index
    @scripts = Script.all
    render json: @scripts
  end

  def create
    @script = Script.new

    if @script.save
      render json: @script
    else
      render json: {errors: @script.errors.full_messages}, status: 400
    end
  end

  def update
    if @script.update_attributes(script_params)
      render json: @script
    else
      render json: {errors: @script.errors.full_messages}, status: 400
    end
  end

  def destroy
    @script.destroy
    head :no_content
  end

  private

  def script_params
    params.require(:script).permit(:script)
  end

  def get_script
    @script = Script.find(params[:id])
  end
end
