class ApplicationController < ActionController::API
  def authenticate_api_request!
    render(json: { message: 'unauthorized request' }, status: :unauthorized) unless current_user
  end

  def current_user
    @current_user ||= Users::Auth.new(request.headers).call
  end
end
