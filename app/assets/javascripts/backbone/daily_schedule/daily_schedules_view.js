(function(app) {

	app.DSTableView = Backbone.View.extend({		

			tagName: "tbody", //tbody потому, что table уже есть на странице (спрятанная)
			template: JST["backbone/templates/daily_schedules/daily_schedules_list"],
						
			initialize: function() {
				this.daily_schedules = new app.DSCollection();

				Backbone.Mediator.sub("day_selected", this.addDaiySchedule, this);
				Backbone.Mediator.sub("day_unselected", this.removeDaiySchedule, this);
				this.render();
			},

			addDailySchedule: function(attr) {
				
				daily_schedule = new app.DSModel( { date: 		 attr["date"],
													doctor_name: attr["doctor_name"],
													duration: 	 attr["duration"],
													timeline: 	 {start: attr["timeline_start"], 
																  end: 	attr["timeline_end"]  	
															     }
												} );

				this.daily_schedules.add(daily_schedule);	
				daily_schedule_view = new app.DSView({model: daily_schedule});
				this.$el.append(daily_schedule_view.render().el);

				console.log("Doctor's daily schedule added to table");
			},

			removeDailySchedule: function(attr) {

				//определяем удаляемый daily schedule по дате и доктору
				var daily_schedule_to_remove = this.daily_schedules.where({ date: attr["date"],
																			doctor_name: attr["doctor_name"]
                    													  });
				this.daily_schedules.remove(daily_schedule_to_remove);

				//спросить про удаление вьюшки, соответствующей удаляемой модели
			},

			render: function() {		
				this.$el.html(this.template());
				return this;
			}		
	});	

})(window);

