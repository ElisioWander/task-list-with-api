class TaskSerializer
  include JSONAPI::Serializer
  attributes :description, :is_checked, :user_id
end
