require 'test_helper'

class AlbumsloaderControllerTest < ActionController::TestCase
  test "should get albums" do
    get :albums
    assert_response :success
  end

end
