Myapp::Application.routes.draw do
  get "preview/index"
  root to: "preview#index"
end
