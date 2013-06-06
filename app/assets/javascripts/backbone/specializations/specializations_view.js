(function(app) {

	app.SpecsView = Backbone.View.extend({
			
		template: JST["backbone/specializations/specializations_template"],

  		initialize: function() {

  			this.specs = new SpecsCollection();
  			this.specs.on("reset", this.render, this);
  			Backbone.Mediator.sub("check_spec",this.checkSpec,this)
  		},

  		checkSpec: function(attr) {
  		   var model = this.specs.where({"id":attr["id"]});
  		   //model.model.is_selected = true;
           //console.log(this.specs);
           console.log(this.specs); 
  		},
		
		addSpec: function(model) {

			var spec = new app.SpecView({model: model}),
			    view = spec.render(); 

			    view.$el.attr('id', 'spec_'+model.get("id"));
              
			this.$el.children("ul").append(view.el);					
		},
		
		render: function() {

			this.$el.html(this.template());
			this.specs.each(this.addSpec, this);
				
			return this;
		}				
	});

})(window);