class WeeklySchedulesController < ApplicationController
  # GET /weekly_schedules
  # GET /weekly_schedules.json
  def index
    @weekly_schedules = WeeklySchedule.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @weekly_schedules }
    end
  end

  # GET /weekly_schedules/1
  # GET /weekly_schedules/1.json
  def show
    if params[:doctor_id] != nil then   
        @weekly_schedule =  WeeklySchedule.find_by_doctor_id(params[:doctor_id])
    else
    
         @weekly_schedule = WeeklySchedule.find(params[:id])
    
    end
    
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @weekly_schedule }
    end
  end

  # GET /weekly_schedules/new
  # GET /weekly_schedules/new.json
  def new
    @weekly_schedule = WeeklySchedule.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @weekly_schedule }
    end
  end
  
  #GET /weekly_schedules/search
  #GET /weekly_schedules/search.json
  
  def search
    @weekly_schedule = WeeklySchedule.find_by_doctor_id(params[:doctor_id])
    
    respond_to do |format|
      format.html # search.html.erb
      format.json { render json: @weekly_schedule }
    end
  end
  
  # GET /weekly_schedules/1/edit
  def edit
    @weekly_schedule = WeeklySchedule.find(params[:id])
  end

  # POST /weekly_schedules
  # POST /weekly_schedules.json
  def create
    @weekly_schedule = WeeklySchedule.new(params[:weekly_schedule])

    respond_to do |format|
      if @weekly_schedule.save
        format.html { redirect_to @weekly_schedule, notice: 'Weekly schedule was successfully created.' }
        format.json { render json: @weekly_schedule, status: :created, location: @weekly_schedule }
      else
        format.html { render action: "new" }
        format.json { render json: @weekly_schedule.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /weekly_schedules/1
  # PUT /weekly_schedules/1.json
  def update
    @weekly_schedule = WeeklySchedule.find(params[:id])

    respond_to do |format|
      if @weekly_schedule.update_attributes(params[:weekly_schedule])
        format.html { redirect_to @weekly_schedule, notice: 'Weekly schedule was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @weekly_schedule.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /weekly_schedules/1
  # DELETE /weekly_schedules/1.json
  def destroy
    @weekly_schedule = WeeklySchedule.find(params[:id])
    @weekly_schedule.destroy

    respond_to do |format|
      format.html { redirect_to weekly_schedules_url }
      format.json { head :no_content }
    end
  end
end
