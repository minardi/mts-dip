(function(app) {

	app.DoctorScheduleView = Backbone.View.extend({

		className: "admin_schedule",

		template: JST["backbone/admin/templates/admin_one_schedule_template"],

		events: {
			"click .admin_item_edit": "editItem",
			"click .admin_item_delete": "deleteItem",
			"mouseover": "displayActions",
			"mouseout": "displayActions"
		},

		initialize: function() {
			this.render();
			this.model.on("change", this.render, this);
		},

		displayActions: function() {
			this.$el.find(".admin_actions").toggleClass("hidden");
		},

		editItem: function() {
			var edit_view = new app.AdminCreateView({model: this.model,
                                                     board_type: "schedule"});
            $("#admin_panel").prepend(edit_view.render().el);
		},

		deleteItem: function() {
			if (confirm("Do you really want to delete this?") === true) {
				this.model.switchUrl("modify", this.model.get("id"));
				this.model.destroy();
				this.$el.hide(600);
			}  
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
	        return this; 
	    }

	});


})(window);
