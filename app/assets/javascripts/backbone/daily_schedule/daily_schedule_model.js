(function(app) {

	app.DailySchedule = Backbone.Model.extend({		
	
		defaults: {
			date: "00-00-0000",
			doctor_id: 1,
			doctor_name: "Ivanov",
			duration: 15,
			timeline: {start: 900, //время начала
						end: 1100  //и окончания приема (с 9 до 11)
					  }
		},

	});	

})(window);

