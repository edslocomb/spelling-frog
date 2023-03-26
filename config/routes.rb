Rails.application.routes.draw do
  resources :words
  resources :puzzles
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "puzzles#index"
end
