class UserSerializer
  include JSONAPI::Serializer
  attributes :email
  attributes :token do |user|
    JWT.encode(
      { email: user.email, id: user.id, exp: Time.now.to_i + 24 * 3600 }, ENV['JWT_SECRET_KEY'], 'HS256'
    )
  end

  has_many :tasks
end
