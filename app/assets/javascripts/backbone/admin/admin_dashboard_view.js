(function(app) {

	app.AdminDashboardView = Backbone.View.extend({
			
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

  			this.template = JST["backbone/admin/templates/admin_specializations_template"];
  			this.collection.setUrl("specializations");
  		},

  		doctorsMode: function() {

  			this.template = JST["backbone/admin/templates/admin_doctors_template"];
  			this.collection.setUrl("doctors");
  		},

  		scheduleMode: function() {

  			this.template = JST["backbone/admin/templates/admin_schedules_template"];
  			this.collection.setUrl("weekly_schedules");
  		},

  		ticketsMode: function() {

  			this.template = JST["backbone/admin/templates/admin_tickets_template"];
  			this.collection.setUrl("tickets");
  		},

  		usersMode: function() {

  			this.template = JST["backbone/admin/templates/admin_users_template"];
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
				
			return this;
		}			
	});

})(window);