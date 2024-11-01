class UserMailer < ApplicationMailer
  default from: 'elisiodev741@gmail.com'
  
  def reset_password_email(user)
    @user = user
    @reset_password_url ="#{ENV['RESET_PASSWORD_URL']}/#{@user.reset_password_token}"

    mail(to: @user.email, subject: 'Instruções de recuperação de senha')
  end
end
