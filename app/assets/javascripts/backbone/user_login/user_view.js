(function(app) {

	app.UserView = Backbone.View.extend({
        
        el: '#login_block',

        initialize: function() {
            // console.log(this.el.innerHTML);
        },

        nav_template: JST["backbone/user_login/nav_template"],
        
        // inrole_template: JST["backbone/user_login/role_template"],

        events: {
            
            "click #btn_login": "user_login" 
        },

        user_login: function(e) {

            var user_email = this.$el.children('input[type=text]').val(),
                user_password = this.$el.children('input[type=password]').val(),
            
                logUser = new app.UserModel({ email: user_email,
                                              password: user_password
                                            });
            console.log(user_email);
            console.log(logUser);
        },

        render: function() {
            
            //var template = this.template(this.model.toJSON());
            
            this.$el.html(this.nav_template());
            return this;

        }


    });

        
})(window);