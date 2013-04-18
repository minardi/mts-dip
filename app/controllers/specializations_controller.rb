class SpecializationsController < ApplicationController
  # GET /specializations
  # GET /specializations.json
  def index
    @specializations = Specialization.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @specializations }
    end
  end

  # GET /specializations/1
  # GET /specializations/1.json
  def show
    @specialization = Specialization.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @specialization }
    end
  end

  # GET /specializations/new
  # GET /specializations/new.json
  def new
    @specialization = Specialization.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @specialization }
    end
  end

  # GET /specializations/1/edit
  def edit
    @specialization = Specialization.find(params[:id])
  end

  # POST /specializations
  # POST /specializations.json
  def create
    @specialization = Specialization.new(params[:specialization])

    respond_to do |format|
      if @specialization.save
        format.html { redirect_to @specialization, notice: 'Specialization was successfully created.' }
        format.json { render json: @specialization, status: :created, location: @specialization }
      else
        format.html { render action: "new" }
        format.json { render json: @specialization.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /specializations/1
  # PUT /specializations/1.json
  def update
    @specialization = Specialization.find(params[:id])

    respond_to do |format|
      if @specialization.update_attributes(params[:specialization])
        format.html { redirect_to @specialization, notice: 'Specialization was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @specialization.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /specializations/1
  # DELETE /specializations/1.json
  def destroy
    @specialization = Specialization.find(params[:id])
    @specialization.destroy

    respond_to do |format|
      format.html { redirect_to specializations_url }
      format.json { head :no_content }
    end
  end
end
