(function(app) {

	app.DoctorScheduleView = Backbone.View.extend({

		className: "admin_schedule",

		template: JST["backbone/admin/templates/admin_one_schedule_template"],

		events: {

		},

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
	        return this; 
	    }

	});


})(window);
