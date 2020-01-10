class Api::PatternsController < ApplicationController

  def index
    render json: Pattern.all
  end

  def show
    id = params[:id]
    pattern = Pattern.find(id)
    favourite = Favourite.find_by(pattern_id: pattern.id)   # TODO: just finds any one example.  probaby a bug.
    # Favourite.find_by(user_id: 1)
    render json: { pattern: pattern, favourite: favourite}, status: 200 and return
  end

  def create
    puts "inside create pattern"
    @pattern = Pattern.create(
      user_id: params[:user_id],
      title: params[:title],
      description: params[:description],
      forked_from_id: params[:forked_from_id]
    )
    # byebug    
    if @pattern.save
      @checkpoint = Checkpoint.create(
        pattern_id: @pattern.id,
        colours: params[:colours],
        user_id: params[:user_id],
        image_url: params[:image_url]
      )
      if @checkpoint.save 
        render json: { pattern: @pattern, checkpoint: @checkpoint}, status: 200 and return
      else
        puts "Failed saveee"
        puts @checkpoint.errors
        render json: { error: @checkpoint.errors}, status: 500
      end
    else
      puts "Failed save"
      puts @pattern.errors
      render json: { error: @pattern.errors}, status: 500
    end
  end

  def destroy
    @pattern = Pattern.find params[:id]
    @pattern.destroy
  end

end