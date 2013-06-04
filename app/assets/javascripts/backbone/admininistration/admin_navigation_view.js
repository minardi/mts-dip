(function(app) {

	app.SpecsView = Backbone.View.extend({
			
		template: JST["backbone/specializations/specializations_template"],

  		initialize: function() {

  			this.specs = new SpecsCollection();
  			this.specs.on("reset", this.render, this);
  		},
		
		addSpec: function(model) {

			var spec = new app.SpecView({model: model});

			this.$el.children("ul").append(spec.render().el);					
		},
		
		render: function() {

			this.$el.html(this.template());
			this.specs.each(this.addSpec, this);
				
			return this;
		}				
	});

})(window);