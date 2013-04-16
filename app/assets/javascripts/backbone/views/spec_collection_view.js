(function(app) {

	app.SpecsView = Backbone.View.extend({
			specs: new SpecsCollection(),

			tagName: "ul",
			className: "speclist",

	  		initialize: function() {
	  			this.specs.on("reset", this.render, this);

	  		},

			
			//function that fills our list (collection view) with new views
			addSpec: function(model) {
				var spec = new app.SpecView({model: model});
				this.$el.append(spec.render().el);					
			},
			
			render: function() {
				$("body").append(this.$el);	
				this.specs.each(this.addSpec, this);	
				return this;
			}				
	 	});

})(window);