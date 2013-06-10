(function(app) {

	app.CurrentSchedulesView = Backbone.View.extend({		

			template: JST["backbone/current_schedule/current_schedules_template"],
						
			initialize: function() {

				var doctor_id = app.userEx.getDoctorId();

				this.fetchSchedule(doctor_id);	

				  this.date = new app.DateEx();

				  this.navigate = new NavigateWeek(this.date,this);
      
                  this.$el.parent().prepend(this.navigate.el);


			},

			fetchSchedule: function(doctor_id) {

				var mySchedule = new app.WeeklyModel();

				mySchedule.getCurrent(doctor_id);
				mySchedule.fetch();
				mySchedule.on("sync", this.render, this);
			},

			addSchedule: function(attr) {

				var schedule_array = attr["schedule"].split(" - "),
					schedule_start = schedule_array[0],
					schedule_end = schedule_array[1],
					current_schedule_view,
					daily_schedule = new app.DailySchedule({ doctor_id: attr["doctor_id"],
													      day: attr["day"],
													      duration: attr["duration"],
													      schedule_start: schedule_start,
													      schedule_end: schedule_end,
													      visible: true });

				current_schedule_view = new app.DailyScheduleView( {model: daily_schedule, ticketType: "cw-doc"} );
				current_schedule_view.template = JST["backbone/current_schedule/current_schedule_template"];
				//VIEW REUSED! verify events on current and daily schedules

				this.$el.find("tbody").append(current_schedule_view.render().el);

				Backbone.Mediator.pub("timeline_render",{ doctor_id: app.userEx.getDoctorId(),
			                                              data: attr["day"],
			                                              type: "cw-doc" });
			},

			refresh: function() {
				//this.remove();
				this.fetchSchedule(app.userEx.getDoctorId());	
				console.log("refresh!");
			},
				
			render: function(model) {

				var day_time = model.get("schedule"),
				    week = this.date.getCurrentWeek({transport:true})
					

				this.$el.html(this.template());
				
                 _.each(week,function(date,day){

                        this.addSchedule({ doctor_id: model.get("doctor_id"),
				    	day: date,
				    	duration: model.get("doctor_duration"),
				     	schedule: day_time[day]["start"] + " - " + day_time[day]["end"] });
                 },this)
	
				return this;
			}		
	});	

})(window);

