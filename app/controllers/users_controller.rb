class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def index
    
    
      @users = User.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @users }
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      sign_in @user
      flash[:success] = "Welcome to the MTSv.3!"
      redirect_to @user #??????перенаправление на страницу показывающую пользователя
    else
      render 'new'
    end
  end

  private

    def signed_in_user
      redirect_to signin_url, notice: "Please sign in." unless signed_in?
    end

end
