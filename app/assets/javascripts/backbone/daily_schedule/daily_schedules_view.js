(function(app) {

	app.DailySchedulesView = Backbone.View.extend({		

			el: $("#daily_schedules"), 
			template: JST["backbone/daily_schedule/daily_schedules_template"],
						
			initialize: function() {
				this.daily_schedules = new app.DailySchedules();

				Backbone.Mediator.sub("day_selected", this.addDailySchedule, this);
				Backbone.Mediator.sub("day_unselected", this.removeDailySchedule, this);
				this.render();
				Backbone.Mediator.pub("day_selected", {date: "11:11:0000", doctor_id: 1, doctor_name: "Ivanov", duration: 15, timeline_start: 900, timeline_end: 1100});
			},

			addDailySchedule: function(attr) {
				
				daily_schedule = new app.DailySchedule( {  date: attr["date"],
													  doctor_id: attr["doctor_id"],
													doctor_name: attr["doctor_name"],
													   duration: attr["duration"],
													   timeline: {start: attr["timeline_start"], 
																  end: 	attr["timeline_end"]  	
															     }
												} );

				this.daily_schedules.add(daily_schedule);
				console.log(daily_schedule);
				//app.DailyScheduleView is undefined. WTF??
				daily_schedule_view = new app.DailyScheduleView( {model: daily_schedule} );
				this.$el.find("#daily_schedules_content").append(daily_schedule_view.render().el);
			},

			removeDailySchedule: function(attr) {

				//определяем удаляемый daily schedule по дате и доктору
				var daily_schedule_to_remove = this.daily_schedules.where({ date: attr["date"],
																			doctor_id: attr["doctor_id"]
                    													  });
				this.daily_schedules.remove(daily_schedule_to_remove);
			},

			render: function() {		
				this.$el.html(this.template());
				return this;
			}		
	});	

})(window);

