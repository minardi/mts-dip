(function(app) {

	app.AdminDashItemView = Backbone.View.extend({

    	tagName: "tr",

		events: {
			"click .admin_item_edit": "editItem",
			"click .admin_item_delete": "deleteItem",
			"mouseover": "displayActions",
			"mouseout": "displayActions"
		},

		initialize: function() {

			this.setTemplate();
			this.model.on("change", this.render, this);
		},

		setTemplate: function() {

			switch (this.options.board_type) {
				case "specializations":
					this.template = JST["backbone/admin/templates/admin_specs_item_template"];
					break;
				case "doctors":
					this.template = JST["backbone/admin/templates/admin_doctors_item_template"];
					break;
				case "users":
					this.template = JST["backbone/admin/templates/admin_users_item_template"];
					break;
				case "schedule":
					this.template = JST["backbone/admin/templates/admin_schedules_item_template"];
					break;
				case "tickets":
					this.template = JST["backbone/admin/templates/admin_tickets_item_template"];
					break;
			}
		},

		displayActions: function() {
			this.$el.find(".admin_item_edit").toggleClass("hidden");
			this.$el.find(".admin_item_delete").toggleClass("hidden");
   
		},

		editItem: function() {
			console.log("item edit method");
		},

		deleteItem: function() {
			console.log("item delete method");
			if (confirm("Удалить элемент?") === true) {
				//destroy!
				this.$el.children().css("background-color", "#f08080");
				this.$el.hide(600);
			}  
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
	        return this; 
	    }
	});


})(window);
