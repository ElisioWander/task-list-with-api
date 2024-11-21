class Task < ApplicationRecord
  acts_as_paranoid(delete_all_enabled: true)

  belongs_to :user
  
  validates :description, presence: true
end
