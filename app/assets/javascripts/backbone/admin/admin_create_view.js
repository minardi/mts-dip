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

			switch (this.options.board_type) {
				case "specializations":
					this.specsMode();
					break;
				case "doctors":
					this.doctorsMode();
					break;
				case "users":
					this.usersMode();
					break;
				case "schedule":
					this.scheduleMode();
					break;
			}

			this.model.on("sync", function() {mts.current_board.collection.add(this.model)}, this);
			this.model.on("destroy", function() {mts.current_board.collection.remove(this.model)}, this);
			//this.model.on("sync", mts.current_board.render, mts.current_board);
		},

		specsMode: function() {
			this.template = this.specs_tpl;
			this.creation_method = this.createSpec;
  		},

  		doctorsMode: function() {
  			var spec_list = new app.SpecsCollection();

  			spec_list.fetch();
  			spec_list.on("reset", function(list) {list.each(this.addToSelect)}, this);
			this.template = this.doctors_tpl;
			this.creation_method = this.createDoctor;			
  		},

  		scheduleMode: function() {
  			var doc_list = new app.DoctorsCollection();

  			doc_list.fetch();
  			doc_list.on("reset", function(list) {list.each(this.addToSelect)}, this);
  			this.template = this.schedule_tpl;
  			this.creation_method = this.createSchedule;
  		},

  		usersMode: function() {
  			this.template = this.users_tpl;
  			this.creation_method = this.createUser;
  			this.model.setUrl();
  		},

		cancelCreation: function() {
			//this.model = null;
			this.remove();

		},

		performCreation: function() {
			this.creation_method();
			//this.remove();
		},

		addToSelect: function(model) {
			var option = document.createElement("option");

			$(option).text(model.get("name")).attr("value", model.get("id"));
			$("#select_list").append(option);
			console.log("item added to select");
		},

		createSpec: function() {
			this.model.set("name", $("#spec_name").val());
			this.model.save();
			this.remove();
		},

		createDoctor: function() {
			this.model.set({name: $("#doctor_name").val(),
						    duration: $("[name='dur']:checked").val(),
						    specialization_id: $("#select_list").val()});

			this.model.save();
			this.remove();
		},

		createSchedule: function() {
			var schedule = {
					sun: {}, mon: {}, tue: {}, wed: {}, thu: {}, fri: {}, sat: {}
				};

			_.each(schedule, function(i, day, week) {
				week[day]["start"] = $("#" + day + "-start").val(); 
				week[day]["end"] = $("#" + day + "-end").val();
			});

			this.model.set({schedule: schedule,
							doctor_id: $("#select_list").val()});
			this.model.save();
			this.remove();
		},

		createUser: function() {
			var role = $("[name='role']:checked").val();

			this.model.set({name: $("#user_name").val(), 
							email: $("#user_email").val(),
							password: $("#user_password").val(),
							role: {key: role} });

			console.log(this.model.toJSON());

			this.model.save();
			//doesn't saving. I think, problem will be solved after adding devise

			if (role === "Doctor") {
				this.model = new app.DoctorModel();
				this.doctorsMode();
				this.render();
				console.log(this.model.toJSON());
			} else {
				this.remove();
			}
			//check, will DOCTOR model (tr) be added to USERS board or not 
		},

		render: function() {

			this.$el.html(this.template());
	        return this; 
	    }

	});


})(window);
