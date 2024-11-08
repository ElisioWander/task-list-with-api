module Api
  class AuthController < ApplicationController
    before_action :authenticate_api_request!, only: [:change_password]

    def sign_up
      user = User.new(user_request_params)

      return render json: user.errors, status: :unprocessable_entity unless user.save 
      render json: UserSerializer.new(user), status: :created
    end

    def sign_in
      user = User.find_by(email: user_request_params[:email])

      unless user&.valid_password?(user_request_params[:password])
        return render json: { error: 'E-mail ou senha incorretos!' }, status: :unauthorized 
      end 

      render json: UserSerializer.new(user), status: :ok
    end

    def change_password
      unless current_user&.valid_password?(change_password_request_params[:current_password])
        return render json: { error: 'Senha atual está incorreta' }, status: :unauthorized
      end

      unless current_user.update(
        password: change_password_request_params[:new_password],
        password_confirmation: change_password_request_params[:password_confirmation]
      )
        return render json: current_user.errors, status: :unprocessable_entity
      end

      render json: { message: 'Senha alterada com sucesso!' }, status: :ok
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