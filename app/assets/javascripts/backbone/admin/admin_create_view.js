(function(app) {

	app.AdminCreateView = Backbone.View.extend({

		className: "modal admin_create",

		events: {
			"click .btn-danger" : "cancelCreation",
			"click .btn-success" : "performCreation",
			"click [name='role']" : "toggleDocList",

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
				case "tickets":
					this.ticketsMode();
					break;
			}

			this.model.on("save", function() { 
				// if (this.model.get("role") === {key:})
					this.remove(); 
			}, this);

			/*this.model.on("save", function() {
				if (this.model instanceof app.DoctorModel) this.userForDoctor();
			}, this);*/

			this.model.on("destroy", function() {
				mts.current_board.collection.remove(this.model); this.remove();
			}, this);

			this.model.on("error", this.modelError, this);
		},

		modelError: function(model, error) {
			console.log(error);
			Backbone.Mediator.pub("error", {el: $(".modal-body"), message: error}); 
		},

		modelSave: function(model) {
			mts.current_board.collection.add(model, {merge:true});
			model.trigger("save");
		},

		userForDoctor: function(model) {
			var doc_user = new app.UserModel();

			doc_user.set({name: model.get("name"), 
						  email: $("#user_email").val(),
						  password: $("#user_password").val(),
						  role: {key: "doctor",
								 doctor_id: model.get("id")} });

			doc_user.switchUrl();
			doc_user.save();

		},

		toggleDocList: function(event) {

			if ($(event.target).val() === "doctor") {
				$("#app_doc").removeClass("hidden");
			} else {
				$("#app_doc").addClass("hidden");
			}

		},

		specsMode: function() {
			this.template = this.specs_tpl;
			this.creation_method = this.createSpec;
  		},

  		doctorsMode: function() {
  			var spec_list = new app.SpecsCollection();

  			this.template = this.doctors_tpl;

  			spec_list.fetch();
  			spec_list.on("reset", function(list) {list.each(this.addToSelect)}, this);

			this.creation_method = this.createDoctor;	
  		},

  		scheduleMode: function() {
  			var doc_list = new app.DoctorsCollection();

			this.template = this.schedule_tpl;

  			doc_list.fetch();
  			doc_list.on("reset", function(list) {list.each(this.addToSelect)}, this);

  			this.creation_method = this.createSchedule;
  		},

  		usersMode: function() {
  			var doc_list = new app.DoctorsCollection();

  			this.template = this.users_tpl;

  			doc_list.fetch();
  			doc_list.on("reset", function(list) {list.each(this.addToSelect)}, this);

  			

  			this.creation_method = this.createUser;
  		},

  		ticketsMode: function() {
  			var doc_list = new app.DoctorsCollection(),
  				user_list = new app.UsersCollection();
  
  			this.template = this.tickets_tpl;	

  			user_list.fetch();
  			doc_list.fetch();
  			user_list.on("reset", function(list) {list.each(this.addToSelect)}, this);
  			doc_list.on("reset", function(list) {list.each(this.addToSelect)}, this);

  			this.creation_method = this.createTicket;
  		},

		cancelCreation: function() {
			//this.model = null;
			this.remove();

		},

		performCreation: function() {
			this.creation_method();
		},

		addToSelect: function(model) {
			var option = document.createElement("option"),
				select = (model instanceof app.UserModel) ? $("#user_select_list") : $("#select_list");

			$(option).text(model.get("name")).attr("value", model.get("id"));

			$(select).append(option);

		},

		createSpec: function() {
			this.model.set("name", $("#spec_name").val());
			this.model.save({}, {success: this.modelSave});
		},

		createDoctor: function() {

			this.model.set({name: $("#doctor_name").val(),
						    duration: $("[name='dur']:checked").val(),
						    specialization_id: specialization_id});

			if ((email != "") && (password != "")) {
				this.model.save({}, {success: this.userForDoctor});
				this.remove();
			} else {
				this.model.save({}, {success: this.modelSave});
			}

		},

		createSchedule: function() {
			var schedule = {
					sun: {}, mon: {}, tue: {}, wed: {}, thu: {}, fri: {}, sat: {}
				};

			_.each(schedule, function(i, day, week) {
				week[day]["start"] = $("#" + day + "-start").val(); 
				week[day]["end"] = $("#" + day + "-end").val();
			});

			this.model.set({schedule: schedule, doctor_id: $("#select_list").val()});
			this.model.save({}, {success: this.modelSave});
			//fix moment with weekly_schedule id/doctor_id
		},

		createUser: function() {
			var role = $("[name='role']:checked").val();

			this.model.set({name: $("#user_name").val(), 
							email: $("#user_email").val(),
							password: $("#user_password").val(),
							role: {key: role} });

			if (role === "doctor") {
  				this.model.set({role: {key: role, 
  									   doctor_id: $("#select_list").val()} });
  			}

  			console.log(this.model.toJSON());

			this.model.switchUrl();
			this.model.save({}, {success: this.modelSave});

		},

		createTicket: function() {
			var status = $("[name='ticket_status']:checked").val();

			this.model.set({doctor_id: +$("#select_list").val(),
							user_id: +$("#user_select_list").val(),
							status: status,
							data: $("#ticket_day").val() + "-" + 
								  $("#ticket_month").val() + "-" + 
								  $("#ticket_year").val(),
							time: $("#ticket_hours").val() + ":" + 
								  $("#ticket_minutes").val() });

			console.log(this.model.toJSON());
			this.model.save({}, {success: this.modelSave});
		},

		render: function() {

			this.$el.html(this.template(this.model.toJSON()));
	        return this; 
	    }

	});


})(window);
