Myapp::Application.routes.draw do
  get "review/index"
  get "preview/index"
  get "imagecrop/index"
  root to: "imagecrop#index"
end
