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
