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
					this.creation_method = this.createSpec;
					break;
				case "doctors":
					this.template = this.doctors_tpl;
					this.creation_method = this.createDoctor;
					var spec_list = new app.SpecsCollection();
					spec_list.on("reset", function(list) {list.each(this.addSpectoSelect)}, this);
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
			this.creation_method();
			this.model.save();
			this.remove();
		},

		addSpectoSelect: function(model) {
			var option = document.createElement("option");

			$(option).text(model.get("name")).attr("value", model.get("name"));
			$("#spec_select_list").append(option);
			console.log("added spec");
		},

		createSpec: function() {
			this.model.set("name", $("#spec_name").val());
		},

		createDoctor: function() {
			this.model.set("name", $("#doctor_name").val());
			this.model.set("duration", $("[name='dur']").val());
			this.model.set("specialization_id", $("spec_select_list").val());
		},

		render: function() {

			this.$el.html(this.template());
	        return this; 
	    }

	});


})(window);
