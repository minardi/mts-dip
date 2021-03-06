MTSDip::Application.routes.draw do

  get "test/index"

  # devise_for :admins


  resources :user_statuses


  match 'users/login' => 'users#login'
  resources :users
  
  resources :tickets

  resources :specializations

  # resources :sessions, only: [:new, :create, :destroy]

  # match '/signup',  to: 'users#new'
  # match '/signin',  to: 'sessions#new'
  # match '/signout', to: 'sessions#destroy', via: :delete


  get "main/home"

  match "home/:arg" => "main#home"
  match "test" => "test#index", :via => "get"   

  root :to => 'main#home'

  # match '/doctors/:specialization_id' => "doctors#index"
  resources :doctors
  
  get 'weekly_schedules/get-schedule' => 'weekly_schedules#getschedule'

  get 'weekly_schedules' => 'weekly_schedules#index'

  get 'weekly_schedules/:id' => 'weekly_schedules#show'

  delete 'weekly_schedules/:id' => 'weekly_schedules#destroy'

  post 'weekly_schedules' => 'weekly_schedules#create'

  put 'weekly_schedules/:id'  => 'weekly_schedules#update'

  match 'weekly_schedules/getbydoc/:doctor_id' => 'weekly_schedules#getbydoc'
  
  match 'weekly_schedules/:id/getduration' => 'weekly_schedules#getduration'

  match 'tickets/:user_id/doctor_name' => 'tickets#doctor_name'

  match 'user_statuses/:id/addmiss' => 'user_statuses#addmiss'

  match 'user_statuses/:id/removemiss' => 'user_statuses#removemiss'

  match '/:route' => 'main#home'  


  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
