(function(app) {

	app.DailySchedule = Backbone.Model.extend({		
	
		defaults: {
			doctor_id: "",
			doctor_name: "",
			duration: 15,
			day: "",
			schedule_start: "10:00",
			schedule_end: "12:00",
			visible: true		
		},	

	});	

})(window);

