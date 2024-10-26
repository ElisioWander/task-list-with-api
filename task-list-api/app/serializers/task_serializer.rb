class TaskSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  attributes :description, :is_checked, :user_id
end
