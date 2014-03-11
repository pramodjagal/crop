Myapp::Application.routes.draw do
  get "preview/index"
  get "imagecrop/index"
  root to: "imagecrop#index"
end
