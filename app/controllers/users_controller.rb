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
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user }
    end
  end

  def login
    @user = User.find_by_email_and_password(params[:email], params[:password])
    # @user_password = User.find_by_password(params[:password])
    # if @user_email && @user_password
    if @user
      # @user = User.find_by_id(params[:id])
      @login_user = {"id"=>@user.id,
                     "name"=>@user.name,
                     "email"=>@user.email,
                     "role"=>@user.role,
                     "login"=>true
                    }
    else
      flash[:error] = 'Invalid email/password combination' # Not quite right!
    end

    respond_to do |format|
      format.json { render json: @login_user }
    end
  end
  
  def create
    @user = User.new(params[:user])

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render json: @user, status: :created, location: @user }
      else
        format.html { render action: "new" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @user = User.find(params[:id])

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

   private

    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_path) unless current_user?(@user)
    end
  #   def signed_in_user
  #     redirect_to signin_url, notice: "Please sign in." unless signed_in?
  #   end

end
