(function(app) {

	app.DailySchedulesView = Backbone.View.extend({		

			el: $("#daily_schedules"), 
			template: JST["backbone/daily_schedule/daily_schedules_template"],

			views: {},
						
			initialize: function() {
				this.daily_schedules = new app.DailySchedules();

				Backbone.Mediator.sub("weekly_selectItem", this.addDailySchedule, this);
				Backbone.Mediator.sub("weekly_unselectItem", this.removeDailySchedule, this);
				this.render();
			},

			addDailySchedule: function(attr) {

				var schedule_array = attr["schedule"].split(" - ");
					schedule_start = schedule_array[0];
					schedule_end = schedule_array[1];
				
				daily_schedule = new app.DailySchedule( { doctor_id: attr["id"],
													      doctor_name: attr["name"],
													      //duration: attr["duration"],
													      schedule_start: schedule_start,
													      schedule_end: schedule_end
												      } );

				console.log(daily_schedule);

				this.daily_schedules.add(daily_schedule);

				daily_schedule_view = new app.DailyScheduleView( {model: daily_schedule} );

				//добавить дату
				this.views[daily_schedule.get("doctor_id")] = daily_schedule_view;

				this.$el.find("#daily_schedules_content").append(daily_schedule_view.render().el);
			},

			removeDailySchedule: function(attr) {

				//определяем удаляемый daily schedule по дате и доктору (добавить дату)
				var daily_schedule_to_remove = this.daily_schedules.where({ 
																			doctor_id: attr["id"]
                    													  });
				this.daily_schedules.remove(daily_schedule_to_remove);
				console.log(this.views);
				var view_to_remove = this.views[attr["id"]];
            
            	if(view_to_remove) {
                	view_to_remove.remove();
                	delete this.views[attr["id"]];
                }
			},

			render: function() {		
				this.$el.html(this.template());
				return this;
			}		
	});	

})(window);

