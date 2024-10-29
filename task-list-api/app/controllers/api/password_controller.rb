module Api
  class PasswordController < ApplicationController
    def recover
      user = User.find_by(email: user_recover_password_params[:email])
      if user
        user.generate_password_token!
        UserMailer.reset_password_email(user).deliver_now
        render json: { message: 'Instruções de recuperação de senha enviadas para seu e-mail' }, status: :ok
      else
        render json: { error: 'E-mail não encontrado' }, status: :not_found
      end
    end
  
    def reset
      user = User.find_by(reset_password_token: user_reset_password_params[:token])
      if user && user.password_token_valid?
        if user.reset_password(user_reset_password_params[:password], user_reset_password_params[:password_confirmation])
          render json: { message: 'Senha atualizada com sucesso!' }, status: :ok
        else
          render json: { error: 'Erro ao atualizar a senha' }, status: :unprocessable_entity
        end
      else
        render json: { error: 'Token inválido ou expirado' }, status: :not_found
      end
    end
  
    private
  
    def user_recover_password_params
      params.require(:user).permit(:email)
    end
  
    def user_reset_password_params
      params.require(:user).permit(:token, :password, :password_confirmation)
    end
  end
end
