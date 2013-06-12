(function(app) {

	app.SpecsCollection = Backbone.Collection.extend({

  		model: app.SpecModel,
		url: '/specializations.json',

	});

})(window);
