(function(app) {

	app.AdminCreateView = Backbone.View.extend({

		className: "modal admin_create",

		events: {
			"click .btn-danger" : "removeEl",
			"click .btn-success" : "creation",
			"change [name='role']" : "toggleDocList",
		},

		specs: new app.SpecsCollection(),
		doctors: new app.DoctorsCollection(),
		users: new app.UsersCollection(),

		specs_tpl: JST["backbone/admin/templates/admin_create_spec_template"],
        doctors_tpl: JST["backbone/admin/templates/admin_create_doctor_template"],
        schedule_tpl: JST["backbone/admin/templates/admin_create_schedule_template"],
        tickets_tpl: JST["backbone/admin/templates/admin_create_ticket_template"],
        users_tpl: JST["backbone/admin/templates/admin_create_user_template"],

		initialize: function() {

			mts.current_board.undelegateEvents();

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

			this.model.on("save", this.removeEl, this);
			this.model.on("error", this.modelError, this);
			this.specs.on("reset", function(list) {this.render(); list.each(this.addToSelect, this)}, this);
			this.doctors.on("reset", function(list) {this.render(); list.each(this.addToSelect, this)}, this);
			this.users.on("reset", function(list) {this.clearSelect("users"); list.each(this.addToSelect, this)}, this);
		},

		modelError: function(model, error) {
			console.log(error);
			Backbone.Mediator.pub("error", {el: $(".modal-body"), message: error}); 
		},

		modelSave: function(model) {
			mts.current_board.collection.add(model, {merge:true});
			model.trigger("save");
		},

		scheduleSave: function(model) {
			Backbone.Mediator.pub("schedule_saved", model);
			model.trigger("save");
		},

		userForDoctor: function(model) {

			var doc_user = new app.UserModel({name: model.get("name"), 
						  					  email: $("#user_email").val(),
						  					  password: $("#user_password").val(),
						  					  role: {key: "doctor", 
						  					  		 doctor_id:  model.get("id"), 
						  					  		 permition:{my_schedule: true, 
						  					  		 			doctor_schedule: true} } });


			mts.current_board.collection.add(model, {merge:true});

			doc_user.save();
			model.trigger("save");
		},

		toggleDocList: function(event) {

			if ( $(event.target).val() === "doctor") {
				$("#app_doc").removeClass("hidden");
			} else {
				$("#app_doc").addClass("hidden");
			}
		},

		specsMode: function() {
			this.template = this.specs_tpl;
			this.creation = this.createSpec;
  		},

  		doctorsMode: function() {

  			this.template = this.doctors_tpl;
			this.creation = this.createDoctor;	
  			this.specs.fetch();		
  		},

  		scheduleMode: function() {

  			this.$el.css("width", "430px");
  			this.template = this.schedule_tpl;
  			this.creation = this.createSchedule;
  			this.doctors.fetch();
  		},

  		usersMode: function() {

  			this.template = this.users_tpl;
  			this.creation = this.createUser;
  			this.doctors.fetch();		
  		},

  		ticketsMode: function() {
 			
  			this.template = this.tickets_tpl;
  			this.creation = this.createTicket;
			this.doctors.fetch();
			this.users.fetch();
  		},

		clearSelect: function(list) {
			if (list === "users") $("#user_select_list").empty();
				else $("#select_list").empty();
		},

		addToSelect: function(model) {

			var option = document.createElement("option"),
				select = (model instanceof app.UserModel) ? $("#user_select_list") : $("#select_list");

			$(option).text(model.get("name")).attr("value", model.get("id"));
			$(select).append(option);

			if (this.isCurrent(model)) $(option).attr("selected", "selected");
		},

		isCurrent: function(model) {

			var result = false;

			switch (this.options.board_type) {

				case "doctors":
					if (this.model.get("specialization_id") === model.get("id")) result = true;
					break;
				case "users":
					if ((this.model.get("role"))["doctor_id"] == model.get("id")) result = true;
					break;
				case "tickets":
					if (this.model.get("doctor_id") === model.get("id")) result = true;
					if (this.model.get("user_id") === model.get("id")) result = true;
					break;
				case "schedule":
					if (this.model.get("doctor_id") === model.get("id")) result = true;
					break;
			}

			return result;
		},

		createSpec: function() {
			this.model.set("name", $("#spec_name").val());
			this.model.save({}, {success: this.modelSave});
		},

		createDoctor: function() {

			this.model.set({name: $("#doctor_name").val(),
						    duration: $("[name='dur']:checked").val(),
						    specialization_id: $("#select_list").val()});
							
			if (this.model.isNew()) {
				this.model.save({}, {success: this.userForDoctor});	
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

			this.model.set({schedule: schedule, 
							doctor_id: $("#select_list").val(),
							start: $("#schedule_start").val(),
							end: $("#schedule_end").val()});

			this.model.save({}, {success: this.scheduleSave});
		},

		createUser: function() {
			var role = $("[name='role']:checked").val();

			this.model.set({name: $("#user_name").val(), 
							email: $("#user_email").val(),
							password: $("#user_password").val(),
							role: {key: role,
								   permition:{my_schedule:true} } });

			if (role === "doctor") {
  				this.model.set({role: {key: role, 
  									   doctor_id: $("#select_list").val(),
  									   permition:{my_schedule: true, 
  									   			  doctor_schedule: true} } });
  			}

  			if (role === "admin") {
  				this.model.set({role: {key: "admin", 
  									   permition: {admin_panel: true, 	
  												   my_schedule: true} } });
  			}

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

			this.model.save({}, {success: this.modelSave});
		},

		removeEl: function() {
			this.undelegateEvents();
			this.remove();
			mts.current_board.delegateEvents();
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
	        return this; 
	    }

	});

})(window);
