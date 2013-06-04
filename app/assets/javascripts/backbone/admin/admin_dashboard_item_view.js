(function(app) {

	app.AdminDashItemView = Backbone.View.extend({

    	tagName: "tr",

		events: {
			"click .admin_item_edit": "editItem",
			"click .admin_item_delete": "deleteItem"
		},

		initialize: function() {

			this.setTemplate();
			
			this.model.on("change", this.render, this);
		},

		setTemplate: function() {

			switch (this.options.board_type) {
				case "specializations":
					this.template = JST["backbone/admin/admin_specializations_item_template"];
					break;
				case "doctors":
					this.template = JST["backbone/admin/admin_doctors_item_template"];
					break;
				case "users":
					this.template = JST["backbone/admin/admin_users_item_template"];
					break;
				case "schedule":
					this.template = JST["backbone/admin/admin_schedules_item_template"];
					break;
				case "tickets":
					this.template = JST["backbone/admin/admin_tickets_item_template"];
					break;
			}
		},

		editItem: function() {
   
		},

		deleteItem: function() {
   
		},

		render: function() {
			
			this.$el.html(this.template(this.model.toJSON()));
	        return this; 
	    }
	});


})(window);
