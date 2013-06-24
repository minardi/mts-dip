(function(app) {

	app.AdminDeleteView = Backbone.View.extend({

		className: "modal admin_delete",

		events: {
			"click .btn-danger" : "cancel",
			"click .btn-success" : "perform",
		},

		initialize: function() {
			mts.current_board.undelegateEvents();
		},

		template: JST["backbone/admin/templates/admin_deletion_template"],

		cancel: function() {
			mts.current_board.delegateEvents();
			this.undelegateEvents();
			this.remove();
		},

		perform: function() {
			this.model.destroy();
			mts.current_board.delegateEvents();
			this.undelegateEvents();
			this.remove();
		},

		render: function() {
			this.$el.html(this.template( {id: this.model.get("id")} ));
	        return this; 
	    }

	});


})(window);
