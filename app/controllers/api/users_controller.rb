class Api::UsersController < ApplicationController

  def index
    render json: User.all
  end

  def show
    p params
    id = params[:id]
    user = User.find(id)
    favs = user.favourites

    render json: { user: user, favorites: favs }, status: 200 and return
  end

end
