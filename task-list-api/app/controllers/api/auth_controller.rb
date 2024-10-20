module Api
  class AuthController < ApplicationController
    def sign_up
      user = User.new(user_request_params)
      if user.save
        render json: UserSerializer.new(user), status: :created
      else
        render json: user.errors, status: :unprocessable_entity
      end 
    end

    def sign_in
      user = User.find_by(email: user_request_params[:email])
      if user&.valid_password?(user_request_params[:password])
        render json: UserSerializer.new(user), status: :ok
      else
        render json: { error: 'Invalid email or password!' }, status: :unauthorized
      end
    end

    private

    def user_request_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
  end
end