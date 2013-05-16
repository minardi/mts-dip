(function(app) {

	app.UserView = Backbone.View.extend({
		
		el: '#login_block',

		initialize: function() {
			
			var log_user = new app.UserModel();
			this.render();
			
		},

		nav_template: JST["backbone/user_login/nav_template"],
		
		inrole_template: JST["backbone/user_login/user_template"],

		events: {
			
			"click #btn_login": "userLogin",
			"click #close": "hideError",
			// "click " 
		},

		userLogin: function() {

			var user_email = this.$el.find('input[type=text]').val(),
					user_password = this.$el.find('input[type=password]').val();
			
			log_user = new app.UserModel({ email: user_email,
									  								password: user_password
																	});
			log_user.on('sync', this.checkLogin, this);
			log_user.save();			
		},

		checkLogin: function(params) {
			
			if(log_user.get('login')) {
				console.log(params);
				
				app.router.navigate('home', {trigger:true});
				
				Backbone.Mediator.pub('user_login', 
									                        {
									                            id : log_user.get('id')
									                        }
                    					);
				this.$el.html(this.inrole_template({ name: log_user.get('name')}));
				return this;
			} else {
				$("#login_error").removeClass("hidden");
			}
		},

		hideError: function() {
			$("#login_error").hide();
		},

		render: function() {

				this.$el.html(this.nav_template);
				return this;
		}

	});
		
})(window);