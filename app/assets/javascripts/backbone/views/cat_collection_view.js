(function(app) {

	app.CatsView = Backbone.View.extend({

			initialize: function() {
				this.collection = new CatCollection();
			},						
		
			events: {
				"click": "render"
			},
			
			addCat: function(cat) {
					var view = new CatView({model: cat});
					this.$el.append(view.render().el);					
			},
			
			render: function() {			   				
				this.$el.html("");									
				this.collection.each(this.addCat, this);	
			}		
	});
})(window);

