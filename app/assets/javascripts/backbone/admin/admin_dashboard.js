(function(app) {

	app.AdminDashboard = Backbone.Collection.extend({

  		model: app.AdminDashItem,

  		setUrl: function(type) {
  			this.url = "/" + type + ".json";
  		}

	});

})(window);
