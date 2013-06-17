(function(app) {

	app.AdminNavItemView = Backbone.View.extend({

    	tagName: "li",

    	template: JST["backbone/specializations/specialization_template"],

		events: {
			"click": "itemSelect"
		},
		current_dashboard_view : null,

		itemSelect: function() {
			var board_type = this.model.get("name").toLowerCase();

			if (mts.current_board) mts.current_board.remove();

   			mts.current_board = (board_type === "schedule") ? 
   				new app.AdminSchedulesView() :
				new app.AdminDashboardView({board_type: board_type});

		},

		render: function() {
			
			this.$el.html(this.template({name: this.model.get("name")}));
	        return this; 
	    }
	});


})(window);
