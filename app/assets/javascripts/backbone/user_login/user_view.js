(function(app) {

	app.UserView = Backbone.View.extend({
		
		el: '#login_block',

		initialize: function() {
			
			var logUser = new app.UserModel();
			this.render();
			
		},

		nav_template: JST["backbone/user_login/nav_template"],
		
		inrole_template: JST["backbone/user_login/user_template"],

		events: {
			
			"click #btn_login": "user_login" 
		},

		user_login: function() {

			var user_email = this.$el.find('input[type=text]').val(),
					user_password = this.$el.find('input[type=password]').val();
			
			logUser = new app.UserModel({ email: user_email,
									  								password: user_password
																	});
			logUser.on('sync', this.check_login, this);
			logUser.save();			
		},

		check_login: function(params) {
			
			if(logUser.get('login')) {
				console.log(params);
				Backbone.Mediator.pub('login_user', 
									                        {
									                            id : logUser.get('id')
									                        }
                    					);
				this.$el.html(this.inrole_template({ name: logUser.get('name')}));
				return this;
			} else {

				this.$el.append(
                    $('<div />', 
                        {
                           text : 'Login Error! Check input items!',
                           "class" : 'alert alert-error'
                        }
                    )
                .prepend(
                    $('<button />', 
                        {
                            "class" : "close"
                        }
                    )
                )
            );
			}
		},

		render: function() {

				this.$el.html(this.nav_template);
				return this;
		}

	});

		
})(window);