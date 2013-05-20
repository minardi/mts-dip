(function(app) {

    app.UserView = Backbone.View.extend({
        
        el: '#login_block',
        
        initialize: function() {
            
            var log_user = new app.UserModel();
            this.user = log_user; // for UserEx;
            this.render();

            Backbone.Mediator.sub("user_blocked", this.userBlock, this);
            
        },

        nav_template: JST["backbone/user_login/nav_template"],
        
        inrole_template: JST["backbone/user_login/user_template"],

        events: {
            
            "click #btn_login": "userLogin",
            "click #close": "hideError",
        },

        userBlock: function(attr) {

            this.user.set({role:{"key":"blocked"}});

        },

        userLogin: function() {

            var user_email = this.$el.find('input[type=text]').val(),
                    user_password = this.$el.find('input[type=password]').val();
            
            log_user = new app.UserModel({ email: user_email,
                                                                    password: user_password
                                                                    });
            this.user = log_user; // for UserEx;
            log_user.on('sync', this.checkLogin, this);
            log_user.save();            
        },

        checkLogin: function(params, attr) {
            
            if(log_user.get('login')) {
                                 console.log(this.user.get("id"), attr["user_id"]);
                if (this.user.get("id") === attr["user_id"]){

                 console.log(this.user.get("role"));
                }
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