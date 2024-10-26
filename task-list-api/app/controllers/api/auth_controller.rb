module Api
  class AuthController < ApplicationController
    before_action :authenticate_api_request!, only: [:change_password]

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
        render json: { error: 'E-mail ou senha incorreto!' }, status: :unauthorized
      end
    end

    def change_password
      user = current_user

      if user&.valid_password?(change_password_request_params[:current_password])
        if user.update(
          password: change_password_request_params[:new_password],
          password_confirmation: change_password_request_params[:password_confirmation]
        )
          render json: { message: 'Senha alterada com sucesso!' }
        else
          render json: user.errors, status: :unprocessable_entity
        end
      else
        render json: { error: 'Senha atual está incorreta' }, status: :unauthorized
      end
    end

    private

    def change_password_request_params
      params.require(:user).permit(:current_password, :new_password, :password_confirmation)
    end

    def user_request_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
  end
end