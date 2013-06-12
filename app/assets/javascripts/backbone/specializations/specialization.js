(function(app) {

	app.SpecModel = Backbone.Model.extend({
 
		is_selected: false,

		urlRoot: "/specializations",

		validate: function(attrs) {
   			if (!attrs.name) {
      			return "Spec must have a name";
    		}
		}
	});

})(window);