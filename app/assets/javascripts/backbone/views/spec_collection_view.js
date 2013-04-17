(function(app) {

	app.SpecsView = Backbone.View.extend({
			
			tagName: "ul",
			className: "speclist",
			template: JST["backbone/templates/specializations/spec_list"],

	  		initialize: function() {
	  			this.specs = new SpecsCollection(),
	  			this.specs.on("reset", this.render, this);
	  			this.specs.fetch();
	  		},
			
			addSpec: function(model) {
				var spec = new app.SpecView({model: model});
				this.$el.append(spec.render().el);					
			},
			
			render: function() {
				this.$el.html(this.template());
				$("body").append(this.$el);	 //correct "body" for current element in template
				this.specs.each(this.addSpec, this);	
				return this;
			}				
	 	});

})(window);