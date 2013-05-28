(function(app) {

	app.CurrentSchedulesView = Backbone.View.extend({		

			template: JST["backbone/current_schedule/current_schedules_template"],
						
			initialize: function() {

				var doctor_id,
					mySchedule;

				if (app.userEx.getRole() === "doctor") {

					doctor_id = app.userEx.getDoctorId();
					mySchedule = new app.WeeklyModel();

					mySchedule.getCurrent(doctor_id);
					mySchedule.fetch( {success: this.render, error: this.fetchError} );
				}

			},

			fetchError: function() {
				console.warn("model was not fetched");
			},

			addSchedule: function(attr) {

				var schedule_array = attr["schedule"].split(" - "),
					schedule_start = schedule_array[0],
					schedule_end = schedule_array[1],
					current_schedule_view,
					daily_schedule = new app.DailySchedule( { doctor_id: attr["doctor_id"],
													      day: attr["day"],
													      duration: attr["duration"],
													      schedule_start: schedule_start,
													      schedule_end: schedule_end,
													      visible: true
												      } );

				this.$el.show();

				current_schedule_view = new app.DailyScheduleView( {model: daily_schedule} );
				current_schedule_view.template = JST["backbone/current_schedule/current_schedule_template"];
				current_schedule_view.ticketType = "cw-doc";
				//VIEW REUSED! verify events on current and daily schedules

				this.$el.find("#current_schedules_content").append(current_schedule_view.render().el);

				Backbone.Mediator.pub("timeline_render",{ doctor_id: app.userEx.getDoctorId(),
			                                              data: attr["day"],
			                                              type: "cw-doc" });
			},
				
			render: function(model) {

				var day_time = model.get("schedule"),
					dateex = new app.DateEx();

				//context loss. wtf?

				mts.weekdays.$el.html(mts.weekdays.template());
				dateex.date.setDate(dateex.date.getDate() - dateex.date.getDay());

				for(key in day_time) {

				    mts.weekdays.addSchedule({doctor_id: model.get("doctor_id"),
				    				  		  day: dateex.dateTransFormat(),
				    				  		  duration: model.get("doctor_duration"),
				    				  		  schedule: day_time[key]["start"] + " - " + day_time[key]["end"]
				    				 		});

				    dateex.date.setDate(dateex.date.getDate() + 1);
		    	}
	
				return this;
			}		
	});	

})(window);

