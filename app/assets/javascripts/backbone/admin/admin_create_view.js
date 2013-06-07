(function(app) {

	app.AdminCreateView = Backbone.View.extend({

		className: "modal admin_create",

		events: {
			"click .btn-danger" : "cancelCreation",
			"click .btn-success" : "performCreation"

		},

		specs_tpl: JST["backbone/admin/templates/admin_create_spec_template"],
        doctors_tpl: JST["backbone/admin/templates/admin_create_doctor_template"],
        schedule_tpl: JST["backbone/admin/templates/admin_create_schedule_template"],
        tickets_tpl: JST["backbone/admin/templates/admin_create_ticket_template"],
        users_tpl: JST["backbone/admin/templates/admin_create_user_template"],

		initialize: function() {

			this.setTemplate();
		},

		setTemplate: function() {

			switch (this.options.board_type) {
				case "specializations":
					this.template = this.specs_tpl;
					break;
				case "doctors":
					this.template = this.doctors_tpl;
					break;
				case "users":
					this.template = this.users_tpl
					break;
				case "schedule":
					this.template = this.schedule_tpl;
					break;
			}
		},

		cancelCreation: function() {
			//this.model = null;
			this.remove();

		},

		performCreation: function() {
			console.log("wheee!");
			//collect values
			//this.model.save();

		},

		render: function() {

			this.$el.html(this.template());
	        return this; 
	    }

	});


})(window);
