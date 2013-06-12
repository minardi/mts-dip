 class WeeklySchedulesController < ApplicationController
  # GET /weekly_schedules
  # GET /weekly_schedules.json
  def index
    @weekly_schedules = WeeklySchedule.all

    respond_to do |format|
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
      format.json { render json: @weekly_schedule }
    end
  end
  

  # POST /weekly_schedules
  # POST /weekly_schedules.json
  def create
    @weekly_schedule = WeeklySchedule.new(params[:weekly_schedule])
    respond_to do |format|
      if @weekly_schedule.save
        format.html { redirect_to doctors_path, notice: 'Schedule was successfully created.' }
        format.json { render json: @weekly_schedule, status: :created, location: @doctor }
      else
        format.html { render action: "new" }
        format.json { render json: @weekly_schedule.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /weekly_schedules/1
  # PUT /weekly_schedules/1.json
  def update
    @doctor = WeeklySchedule.find(params[:id])

    respond_to do |format|
      if @weekly_schedule.update_attributes(params[:weekly_schedule])
        format.html { redirect_to @weekly_schedule, notice: 'Schedule was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @weekly_schedule.errors, status: :unprocessable_entity }
      end
    end
  end




  # GET /weekly_schedules/1/getduration
  # GET /weekly_schedules/1/getduration.json
  def getduration
    if params[:doctor_id] != nil then   
        @weekly_schedule =  WeeklySchedule.find_by_doctor_id(params[:doctor_id])
    else
         @weekly_schedule = WeeklySchedule.find(params[:id])
         @schedule_with_duration = {"doctor_duration"=>@weekly_schedule.doctor.duration,
                                    "doctor_id"=>@weekly_schedule.doctor_id,
                                    "schedule"=>@weekly_schedule.schedule}

    end
    
    respond_to do |format|
      format.json { render json: @schedule_with_duration }
    end
  end
  
  # GET /weekly_schedules/1/doctor
  # GET /weekly_schedules/1/doctor.json
  
  def searchbydoctor
  
    if params[:id] != nil then
        @weekly_schedule =  WeeklySchedule.find_by_doctor_id(params[:id])
    end
    
    respond_to do |format|
        format.json { render json:  @weekly_schedule }
    end    
  
  end

end
