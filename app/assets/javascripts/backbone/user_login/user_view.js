(function(app) {

	app.UserView = Backbone.View.extend({
        
        el: '#login_block',

        initialize: function() {
            // console.log(this.el.innerHTML);
        },

        template: JST["backbone/user_login/nav_template"],
        
        // inrole_template: JST["backbone/user_login/role_template"],

        events: {
            
            "click #btn_login": "user_login" 
        },

        user_login: function(e) {

            var user_email = $(e.currentTarget).find('input[type=text]').val();
            var user_password = $(e.currentTarget).find('input[type=password]').val();
            // console.log(user_log);

            var logUser = new UserModel({ email: user_email,
                                          password: user_password
                                        });
            console.log(logUser);
        },

        render: function() {
            
            //var template = this.template(this.model.toJSON());
            
            this.$el.html(this.template);
            return this;

        }


    });

        
})(window);