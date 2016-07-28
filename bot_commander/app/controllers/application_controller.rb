class ApplicationController < ActionController::Base
  rescue_from StandardError, with: :render_unknown_error

  def render_unknown_error(error)
    render(json: {errors: [error]}, status: 500)
  end
end
