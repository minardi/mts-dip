(function(app) {

	app.SpecsView = Backbone.View.extend({
			
			template: JST["backbone/specializations/specializations_template"],

	  		initialize: function() {
	  			this.specs = new SpecsCollection(),
	  			this.specs.on("reset", this.render, this);
	  			this.specs.fetch();
	  		},
			
			addSpec: function(model) {
				var spec = new app.SpecView({model: model});
				this.$el.find("ul").append(spec.render().el);					
			},
			
			render: function() {
				this.$el.html(this.template());
				//this.$el.find("ul").append(this.$el);
				this.specs.each(this.addSpec, this);	
				return this;
			}				
	 	});

})(window);