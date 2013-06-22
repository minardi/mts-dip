(function(app) {

	app.AdminDeleteView = Backbone.View.extend({

		className: "modal admin_delete",

		events: {
			"click .btn-danger" : "cancel",
			"click .btn-success" : "perform",

		},

		template: JST["backbone/admin/templates/admin_deletion_template"],

		initialize: function() {

		
		},

		cancel: function() {
			this.undelegateEvents();
			this.remove();
		},

		perform: function() {
			this.model.destroy();
			this.undelegateEvents();
			this.remove();
		},

		render: function() {
			this.$el.html(this.template( {id: this.model.get("id")} ));
	        return this; 
	    }

	});


})(window);
