(function(app) {

	app.AdminDashItemView = Backbone.View.extend({

    	tagName: "tr",

		events: {
			"click .admin_item_edit": "editItem",
			"click .admin_item_delete": "deleteItem",
			"mouseover": "displayActions",
			"mouseout": "displayActions"
		},

		specs_tpl: JST["backbone/admin/templates/admin_specs_item_template"],
        doctors_tpl: JST["backbone/admin/templates/admin_doctors_item_template"],
        tickets_tpl: JST["backbone/admin/templates/admin_tickets_item_template"],
        users_tpl: JST["backbone/admin/templates/admin_users_item_template"],

		initialize: function() {

			this.model.on("change", this.render, this);
			this.model.on("destroy", this.hideEl, this);

			switch (this.options.board_type) {
				case "specializations":
					this.template = this.specs_tpl;
					break;
				case "doctors":
					this.template = this.doctors_tpl;
					break;
				case "users":
					this.template = this.users_tpl;
					break;
				case "tickets":
					this.template = this.tickets_tpl;
					break;
			}
		},

		displayActions: function() {
			this.$el.find(".admin_item_edit").toggleClass("hidden");
			this.$el.find(".admin_item_delete").toggleClass("hidden");
		},

		editItem: function() {

			var edit_view = new app.AdminCreateView({model: this.model,
                                                     board_type: this.options.board_type});
            $("#admin_panel").prepend(edit_view.render().el);
		},

		deleteItem: function() {
			
			var del_view = new app.AdminDeleteView({model: this.model});
            $("#admin_panel").prepend(del_view.render().el);
		},

		hideEl: function() {
			this.$el.children().css("background-color", "#f08080");
			this.$el.hide(600);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
	        return this; 
	    }
	});


})(window);
