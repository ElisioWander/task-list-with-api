module Users
  class Auth
    def initialize(headers)
      @headers = headers
    end

    def call
      authorized_request
    end

    private

    def authorized_request
      jwt_decoded = JWT.decode token, ENV['JWT_SECRET_KEY'], true, { algorithm: 'HS256' }
      user(jwt_decoded)
    rescue StandardError
      nil
    end

    def user(jwt_decoded)
      User.find_by(id: jwt_decoded.first['id'])
    end

    def token
      @headers['Authorization'].split(' ').last
    end
  end
end