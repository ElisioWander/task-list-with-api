class ApplicationController < ActionController::API
  def authenticate_api_request!
    render(json: { message: 'unauthorized request' }, status: :unauthorized) unless authorized_request?
  end

  def authorized_request?
    jwt_decoded = JWT.decode token, ENV['JWT_SECRET_KEY'], true, { algorithm: 'HS256' }
    user(jwt_decoded)
  rescue StandardError
    nil
  end

  def current_user
    @current_user ||= authorized_request?
  end

  def user(jwt_decoded)
    User.find_by(id: jwt_decoded.first['id'])
  end

  def token
    request.headers['Authorization'].split(' ').last
  end
end
