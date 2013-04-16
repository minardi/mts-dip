(function(app) {

	app.SpecView = Backbone.View.extend({

	    	tagName: "li",

			events: {
				"click": "specSelected"
			},

			specSelected: function() {
				Backbone.Mediator.pub("specSelect");
			},

			render: function() {
				this.$el.append(this.model.get("name"));
		        return this; 
		    },
	});


})(window);
