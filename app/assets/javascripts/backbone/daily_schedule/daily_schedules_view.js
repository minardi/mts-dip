(function(app) {

	app.DailySchedulesView = Backbone.View.extend({		

			template: JST["backbone/daily_schedule/daily_schedules_template"],
						
			initialize: function() {

				this.daily_schedules = new app.DailySchedules();

				Backbone.Mediator.sub("weekly_selectItem", this.addDailySchedule, this);
				Backbone.Mediator.sub("weekly_unselectItem", this.removeDailySchedule, this);
				this.render();
				
				this.$el.hide();	
			},

			splitScheduleStr: function(schedule_str) {

				var schedule_array = schedule_str.split("-");

				return {start: schedule_array[0],
						end: schedule_array[1]}
			},

			addDailySchedule: function(attr) {

				var schedule_time = this.splitScheduleStr(attr["schedule"]),
					daily_schedule_view;

			    daily_schedule = new app.DailySchedule( { doctor_id: attr["id"],
													      doctor_name: attr["name"],
													      day: attr["day"],
													      duration: attr["duration"],
													      schedule_start: schedule_time.start,
													      schedule_end: schedule_time.end,
												      } );

				this.daily_schedules.add(daily_schedule);
				this.$el.show();

				daily_schedule_view = new app.DailyScheduleView( {model: daily_schedule} );

				this.$el.find("#daily_schedules_content").append(daily_schedule_view.render().el);
				
				Backbone.Mediator.pub("timeline_render",{
				                                          doctor_id: attr["id"],
			                                              data: attr["day"],
			                                              type: "sl-doc"	   
				                                        });
			},

			removeDailySchedule: function(attr) {

				var daily_schedule_to_remove = this.daily_schedules.where({ 
																			doctor_id: attr["id"],
																			day: attr["day"]
                    													  });
				daily_schedule_to_remove[0].set("visible", false);
				this.daily_schedules.remove(daily_schedule_to_remove);

				if (this.daily_schedules.length == 0) {
					this.$el.hide();	
				}
			},

			render: function() {	

				this.$el.html(this.template());
				return this;
			}		
	});	

})(window);

