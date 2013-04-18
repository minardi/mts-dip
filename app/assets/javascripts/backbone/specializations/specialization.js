(function(app) {

	app.SpecModel = Backbone.Model.extend({
    
		defaults: {
			name: "",
			is_selected: false
		}
	});

})(window);