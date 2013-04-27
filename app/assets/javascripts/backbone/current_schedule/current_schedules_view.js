(function(app) {

	app.CurrentSchedulesView = Backbone.View.extend({		

			template: JST["backbone/current_schedule/current_schedules_template"],
						
			initialize: function() {

				Backbone.Mediator.sub("user_logined", this.render, this);

				this.$el.hide();	

				Backbone.Mediator.pub("user_logined", { id: 1,
													    name: "jenya",
													    role: "doctor"													      
												        });	
			},

			addSchedule: function(attr) {

				var schedule_array = attr["schedule"].split(" - "),
					schedule_start = schedule_array[0],
					schedule_end = schedule_array[1];

				var current_schedule = new app.CurrentSchedule( { doctor_id: attr["id"],
													      doctor_name: attr["name"],
													      day: attr["day"],
													      duration: attr["duration"],
													      schedule_start: schedule_start,
													      schedule_end: schedule_end,
													      visible: true
												      } );

				this.$el.show();

				current_schedule_view = new app.CurrentScheduleView( {model: current_schedule} );
				this.$el.find("#current_schedules_content").append(current_schedule_view.render().el);

				/*Backbone.Mediator.pub("timeline_render",{
				                                          doctor_id: attr["id"],
			                                              data: attr["day"]				   
				                                        });*/
			},

			formatDate: function(date) {

				var dd = date.getDate(),
					mm = date.getMonth() + 1,
					yy = date.getFullYear() % 100;

  				if (dd < 10) {
  					dd = '0' + dd;
  				}

  				if (mm < 10) {
  					mm = '0' + mm;
  				}	

  				if (yy < 10) {
  					yy = '0' + yy;
  				}

  				return dd + '.' + mm + '.' + yy;
			},

			render: function(param) {

				this.$el.html(this.template());

				if (param["role"] == "doctor") {

					var mySchedule = new app.WeeklyModel(),
						doctorHelpModel = new app.DoctorModel();

					mySchedule.urlRoot =  "/weekly_schedules/" + param["id"] +".json";
					doctorHelpModel.urlRoot =  "/doctors/" + param["id"] +".json";

					//обязательно сначала фетч и описание sync для доктора, после - для mySchedule
					doctorHelpModel.fetch();

					doctorHelpModel.on("change", function () {
						duration = doctorHelpModel.get("duration");
					}, this);

					mySchedule.fetch();

					mySchedule.on("change", function () {

						var daily_array = {},
					    	date = new Date();

						date.setDate(date.getDate() - date.getDay());

						daily_array[0] = mySchedule.attributes.schedule.sun.start + " - " + mySchedule.attributes.schedule.sun.end;
					    daily_array[1] = mySchedule.attributes.schedule.mon.start + " - " + mySchedule.attributes.schedule.mon.end;
					    daily_array[2] = mySchedule.attributes.schedule.tue.start + " - " + mySchedule.attributes.schedule.tue.end;
					    daily_array[3] = mySchedule.attributes.schedule.wed.start + " - " + mySchedule.attributes.schedule.wed.end;
					    daily_array[4] = mySchedule.attributes.schedule.thu.start + " - " + mySchedule.attributes.schedule.thu.end;
					    daily_array[5] = mySchedule.attributes.schedule.fri.start + " - " + mySchedule.attributes.schedule.fri.end;
					    daily_array[6] = mySchedule.attributes.schedule.sat.start + " - " + mySchedule.attributes.schedule.sat.end;

					    for(i=0;i<=6;i++) {

						    this.addSchedule({id: param["id"],
						    					   name: param["name"],
						    					   day: this.formatDate(date),
						    					   duration: doctorHelpModel.get("duration"),
						    					   schedule: daily_array[i]
						    					  });

						    date.setDate(date.getDate() + 1);
				    	}

					}, this);    
				    
				}
			
				return this;
			}		
	});	

})(window);

