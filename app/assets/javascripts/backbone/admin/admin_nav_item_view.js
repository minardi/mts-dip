(function(app) {

	app.AdminNavItemView = Backbone.View.extend({

    	tagName: "li",

    	template: JST["backbone/specializations/specialization_template"],

		events: {
			"click": "itemSelect"
		},
		current_dashboard_view : null,

		itemSelect: function() {
			this.current_dashboard_view ? this.current_dashboard_view.remove() : null;
   			this.current_dashboard_view = new app.AdminDashboardView({board_type:this.model.get("name").toLowerCase(),
   																	 el:$("#admin_dashboard")});

		},

		render: function() {
			
			this.$el.html(this.template({name: this.model.get("name")}));
	        return this; 
	    }
	});


})(window);
