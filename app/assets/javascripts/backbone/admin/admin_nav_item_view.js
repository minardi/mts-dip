(function(app) {

	app.AdminNavItemView = Backbone.View.extend({

    	tagName: "li",

    	template: JST["backbone/specializations/specialization_template"],

		events: {
			"click": "itemSelect"
		},

		itemSelect: function() {

   			var current_dashboard_view = new app.AdminDashboardView({board_type:this.model.get("name").toLowerCase(),
   																	 el:$("#admin_dashboard")});

		},

		render: function() {
			
			this.$el.html(this.template({name: this.model.get("name")}));
	        return this; 
	    }
	});


})(window);
