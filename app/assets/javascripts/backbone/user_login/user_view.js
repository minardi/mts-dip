(function(app) {

	app.UserView = Backbone.View.extend({
		
		el: '#login_block',

		initialize: function() {
			
			log_user = new app.UserModel();
      this.user = log_user; // for UserEx;
			this.render();
			
		},

		nav_template: JST["backbone/user_login/nav_template"],
		
		inrole_template: JST["backbone/user_login/user_template"],

		events: {
			
			"click #btn_login" 				: "userLogin",
			"click #close" 						: "hideError",
			"click #private_schedule" : "privateSchedule",
			"click #exit"							: "userLogout"
		},

		userLogin: function() {

			user_email = this.$el.find('input[type=text]').val(),
			user_password = this.$el.find('input[type=password]').val();
			
			log_user.set({ email: user_email,
									   password: user_password
									});
      this.user = log_user; // for UserEx;
			log_user.on('sync', this.checkLogin, this);
			log_user.save();			
		},

		checkLogin: function(params) {
			
			if(log_user.get('login')) {

				Backbone.Mediator.pub('user_login', 
									                        {
									                            id : log_user.get('id'),
									                            role: log_user.get('role',[0])
									                        }
                    					);

				this.$el.html(this.inrole_template({ name: log_user.get('name')}));
				app.router.navigate('home', {trigger:true});
				return this;

			} else {
				
				$("#login_error").removeClass("hidden");
				setTimeout(this.hideError, 3000);
			}
		},

		hideError: function() {
			$("#login_error").hide();
		},

		privateSchedule: function() {
	
			app.router.navigate('my-private-schedule', {trigger:true});
			//return false;
		}, 

		userLogout: function() {
			$("#exit").addClass("active");
			log_user.clear();
			Backbone.Mediator.pub('user_login', 
									                        {
									                            id : log_user.get('id'),
									                            role: log_user.get('role',[0])
									                        }
                    					);
			this.$el.html(this.nav_template);
			app.router.navigate('', {trigger:true});
			console.log(log_user);
			return this;
		},

		render: function() {

				this.$el.html(this.nav_template);
				return this;
		}

	});
		
})(window);