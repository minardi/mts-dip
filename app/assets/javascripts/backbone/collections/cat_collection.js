(function(app) {

	app.CatCollection = Backbone.Collection.extend({
			initialize: function() {
				this.add(new Cat({"color": "black", "name": "Barsik"}));
				this.add(new Cat({"color": "gray", "name": "Murzik"}));
				this.add(new Cat({"color": "green", "name": "House M.D."}));
				this.add(new Cat({"color": "white", "name": "Pushok"}));
			},
			
			model: Cat
	});

})(window);

