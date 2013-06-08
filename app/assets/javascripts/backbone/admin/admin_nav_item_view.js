(function(app) {

	app.AdminNavItemView = Backbone.View.extend({

    	tagName: "li",

    	template: JST["backbone/specializations/specialization_template"],

		events: {
			"click": "itemSelect"
		},

		itemSelect: function() {
			if (mts.current_dashboard) mts.current_dashboard.remove();
   			mts.current_dashboard = new app.AdminDashboardView({board_type:this.model.get("name").toLowerCase()});

		},

		render: function() {
			
			this.$el.html(this.template({name: this.model.get("name")}));
	        return this; 
	    }
	});


})(window);
