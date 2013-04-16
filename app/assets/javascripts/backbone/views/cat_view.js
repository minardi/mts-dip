(function(app) {

	app.CatView = Backbone.View.extend({		

			className: "cat",
			
		    template: JST['backbone/templates/cats'],
			
			render: function() {		
				this.$el.html(this.template(this.model.toJSON()));				
				return this;	
			}		
	});	

})(window);

