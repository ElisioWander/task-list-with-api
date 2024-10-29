class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, #:registerable,
         :recoverable, :rememberable, :validatable

  has_many :tasks, dependent: :destroy

  def generate_password_token!
    self.reset_password_token = SecureRandom.hex(10)
    self.reset_password_sent_at = Time.now.utc
    save!
  end

  def password_token_valid?
    (self.reset_password_sent_at + 4.hours) > Time.now.utc
  end

  def reset_password(password, password_confirmation)
    puts "password>>>>#{password}<<<<<"
    puts "password_confirmation>>>>#{password_confirmation}<<<<<"

    self.reset_password_token = nil
    self.password = password
    self.password_confirmation = password_confirmation

    save!
  end
end
