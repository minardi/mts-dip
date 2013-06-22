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
			this.model.on("destroy", this.hideEl, this);
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

			var del_view = new app.AdminDeleteView({model: this.model});
            $("#admin_panel").prepend(del_view.render().el);
		},

		hideEl: function() {
			this.$el.css("background-color", "#f08080");
			this.$el.hide(600);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
	        return this; 
	    }

	});


})(window);
