class Task < ApplicationRecord
  acts_as_paranoid

  belongs_to :user
  
  validates :description, presence: true
end
