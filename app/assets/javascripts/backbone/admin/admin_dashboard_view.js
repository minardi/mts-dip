(function(app) {

	app.AdminDashboardView = Backbone.View.extend({

        specs_tpl: JST["backbone/admin/templates/admin_specializations_template"],
        doctors_tpl: JST["backbone/admin/templates/admin_doctors_template"],
        schedule_tpl: JST["backbone/admin/templates/admin_schedules_template"],
        tickets_tpl: JST["backbone/admin/templates/admin_tickets_template"],
        users_tpl: JST["backbone/admin/templates/admin_users_template"],
			
  		initialize: function() {

  			this.collection = new app.AdminDashboard();

  			switch (this.options.board_type) {

  				case "specializations": this.specsMode();
  					break;
  				case "doctors": this.doctorsMode();
  					break;
  				case "schedule": this.scheduleMode();
  					break;
  				case "tickets": this.ticketsMode();
  					break;
  				case "users": this.usersMode();
  					break;
  			}

 			this.collection.fetch();
  			this.collection.on("reset", this.render, this);
  		},

  		specsMode: function() {

  			this.template = this.specs_tpl;
  			this.collection.setUrl("specializations");
  		},

  		doctorsMode: function() {

  			this.template = this.doctors_tpl;
  			this.collection.setUrl("doctors");
  		},

  		scheduleMode: function() {

  			this.template = this.schedule_tpl;
  			this.collection.setUrl("weekly_schedules");
  		},

  		ticketsMode: function() {

  			this.template = this.tickets_tpl;
  			this.collection.setUrl("tickets");
  		},

  		usersMode: function() {

  			this.template = this.users_tpl;
  			this.collection.setUrl("users");
  		},
		
		addItem: function(model) {

			var item_view = new app.AdminDashItemView({model: model,
													   board_type: this.options.board_type});
			this.$el.find("#dashboard_content").append(item_view.render().el);
		},
		
		render: function() {
			this.$el.html(this.template());
			this.collection.each(this.addItem, this);
            //console.log(this.collection);
				
			return this;
		}			
	});

})(window);