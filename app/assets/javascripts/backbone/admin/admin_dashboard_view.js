(function(app) {

	app.AdminDashboardView = Backbone.View.extend({
			
  		initialize: function() {

  			this.setTemplate();

  			this.collection = new app.AdminDashboard();
  			this.collection.setUrl(this.options.board_type);
 			this.collection.fetch();
 			//this.render();
 			console.log(this.collection);
  			this.collection.on("reset", this.render, this);

  		},

  		setTemplate: function() {

			switch (this.options.board_type) {
				case "specializations":
					this.template = JST["backbone/admin/admin_specializations_template"];
					break;
				case "doctors":
					this.template = JST["backbone/admin/admin_doctors_template"];
					break;
				case "users":
					this.template = JST["backbone/admin/admin_users_template"];
					break;
				case "schedule":
					this.template = JST["backbone/admin/admin_schedules_template"];
					break;
				case "tickets":
					this.template = JST["backbone/admin/admin_tickets_template"];
					break;
			}

		},

		
		addItem: function(model) {

			var item_view = new app.AdminDashItemView({model: model,
													   board_type: this.options.board_type});

			this.$el.children("#dashboard_content").append(item_view.render().el);					
		},
		
		render: function() {
			console.log("i am render method");
			this.$el.html(this.template());
			this.collection.each(this.addItem, this);
				
			return this;
		}			
	});

})(window);