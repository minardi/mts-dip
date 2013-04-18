(function(app) {

	//Daily Schedule model
	app.DSModel = Backbone.Model.extend({		
	
		defaults: {
			date: "00-00-0000",
			doctor_name: "Ivanov",
			duration: 15,
			timeline: {start: 9, //время начала
						end: 11  //и окончания приема (с 9 до 11)	уточнить формат	
					  }
		}

	});	

})(window);

