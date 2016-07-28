Rails.application.routes.draw do
  resources :servers, only: [:index, :create, :update, :destroy]
  resources :scripts, only: [:index, :create, :update, :destroy]
  resources :dreambot_accounts, only: [:index, :create, :update, :destroy]
  resources :rs_accounts, only: [:index, :create, :update, :destroy]

  post 'receive_heartbeat', to: 'rs_accounts#receive_heartbeat'
  post 'mark_ready', to: 'rs_accounts#mark_ready'

  post 'bootstrap_server', to: 'deployment#bootstrap_server'
  post 'deploy_script', to: 'deployment#deploy_script'
end
