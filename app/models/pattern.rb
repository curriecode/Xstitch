class Pattern < ApplicationRecord
  belongs_to :user
  has_many :favourites, :dependent => :destroy
  has_many :checkpoints

  ## commented out validations to make development easier can uncomment later
  # validates :title, presence: true
  # validates :description, presence: true
  # validates :colours, presence: true

  has_one_attached :image
end
