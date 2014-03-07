class BuilderController < ApplicationController
  def show

  end

  def albums

  end

  def back_to_albums
    redirect_to action: :albums
    # render 'albums'
  end
  def editoptions

  end

  def test
    fileObj=File.open('a.json');
    readObj=fileObj.read
    @jsonObj=JSON.parse(readObj);
  end
end