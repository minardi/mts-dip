(function(app) {

	app.SpecView = Backbone.View.extend({

	    	tagName: "li",
	    	template: JST["backbone/specializations/specialization_template"],

			events: {
				"click": "specSelect"
			},

			specSelect: function() {

				var is_selected = this.model.get("is_selected");

				this.$el.toggleClass("selected_spec");
       
       			if (is_selected) {
	 				is_selected = false;	 				
	 				Backbone.Mediator.pub("spec_unselected", { id: this.model.get("id") });
	 			} else {
	 				is_selected = true;
	 				Backbone.Mediator.pub("spec_selected", { id: this.model.get("id") });
	            }
       
       			this.model.set("is_selected", is_selected);
			},

			render: function() {
				this.$el.html(this.template(this.model.toJSON()));
		        return this; 
		    }
	});


})(window);
