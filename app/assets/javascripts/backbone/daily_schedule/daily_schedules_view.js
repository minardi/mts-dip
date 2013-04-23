(function(app) {

	app.DailySchedulesView = Backbone.View.extend({		

			el: $("#daily_schedules"), 
			template: JST["backbone/daily_schedule/daily_schedules_template"],
						
			initialize: function() {
				this.daily_schedules = new app.DailySchedules();

				Backbone.Mediator.sub("weekly_selectItem", this.addDailySchedule, this);
				Backbone.Mediator.sub("weekly_unselectItem", this.removeDailySchedule, this);
				this.render();			
			},

			addDailySchedule: function(attr) {

				var schedule_array = attr["schedule"].split(" - "),
					schedule_start = schedule_array[0],
					schedule_end = schedule_array[1];
					
					/*day = "";

				switch (attr["day"]){
					case "sun":
						day = "Sunday";
					break;
					case "mon":
						day = "Monday";
					break;
					case "tue":
						day = "Tuesday";
					break;
					case "wed":
						day = "Wednesday";
					break;
					case "thu":
						day = "Thursday";
					break;
					case "fri":
						day = "Friday";
					break;
					case "sat":
						day = "Saturday";
					break;					
				}*/
				
				daily_schedule = new app.DailySchedule( { doctor_id: attr["id"],
													      doctor_name: attr["name"],
													      day: attr["day"],
													      //duration: attr["duration"],
													      schedule_start: schedule_start,
													      schedule_end: schedule_end,
													      visible: true
												      } );

				this.daily_schedules.add(daily_schedule);

				daily_schedule_view = new app.DailyScheduleView( {model: daily_schedule} );

				this.$el.find("#daily_schedules_content").append(daily_schedule_view.render().el);
			},

			removeDailySchedule: function(attr) {

				var daily_schedule_to_remove = this.daily_schedules.where({ 
																			doctor_id: attr["id"],
																			day: attr["day"]
                    													  });
				daily_schedule_to_remove[0].set("visible", false);
				this.daily_schedules.remove(daily_schedule_to_remove);
			},

			render: function() {		
				this.$el.html(this.template());
				return this;
			}		
	});	

})(window);

