(function(app) {

	app.AdminDashboard = Backbone.Collection.extend({

  		model: app.AdminDashItem,

  		setUrl: function(type) {
  			this.url = (type === "schedule") ? "/weekly_schedules.json" : "/" + type + ".json";
  		}

	});

})(window);
