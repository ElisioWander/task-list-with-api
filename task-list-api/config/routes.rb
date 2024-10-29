Rails.application.routes.draw do
  devise_for :users, skip: [:sessions, :registrations, :passwords]
  resources :tasks, only: [:index, :create, :update, :destroy, :restore]
  resources :password, only: [:create]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api do
    get 'tasks', to: 'tasks#index'
    post 'tasks', to: 'tasks#create'
    put 'tasks', to: 'tasks#update'
    delete 'tasks', to: 'tasks#destroy'
    post 'tasks/restore', to: 'tasks#restore'


    post 'auth/sign-up', to: 'auth#sign_up'
    post 'auth/sign-in', to: 'auth#sign_in'
    post 'auth/change-password', to: 'auth#change_password'

    post 'password/recover', to: 'password#recover'
    post 'password/reset', to: 'password#reset'

  end
end
