(function(app) {

    app.UserView = Backbone.View.extend({
        
        // el - elent-bloc "div", with login fild
        el: '#login_block',

        initialize: function() {
            
            this.user = new app.UserModel();
            this.render();

            Backbone.Mediator.sub("user_blocked", this.userBlock, this);
            
        },

        // template with logins inputs
        nav_template: JST["backbone/user_login/nav_template"],
        
        // template with "user on" 
        inrole_template: JST["backbone/user_login/user_template"],

        events: {
            
            "click #btn_login"              : "userLogin",
            "click #close"                      : "hideError",
            "click #home"                       : "routHome",
            "click #private_schedule" : "routPrivateSchedule",
            "click #exit"                           : "userLogout"
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
            
            if(this.user.get('login')) {

                console.log(this.user.get("id"), attr["user_id"]);
                if (this.user.get("id") === attr["user_id"]){console.log("warn");}

                Backbone.Mediator.pub('user_login', 
                                                            {
                                                                id : this.user.get('id'),
                                                                role: this.user.get('role',[0])
                                                            }
                                        );

                this.$el.html(this.inrole_template({ name: this.user.get('name')}));
                this.routHome();
                return this;

            } else {
                
                $("#login_error").removeClass("hidden");
                setTimeout(this.hideError, 3000);
            }
        },

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

<<<<<<< HEAD
        hideError: function() {
            $("#login_error").hide();
        },
=======
        routHome: function() {
            app.router.navigate('home', {trigger:true});
        },

        routPrivateSchedule: function() {
    
            app.router.navigate('my-private-schedule', {trigger:true});
            //return false;
        }, 

        userLogout: function() {
            $("#exit").addClass("active");
            $("#private_schedule").removeClass("active");
            this.user.clear();
            Backbone.Mediator.pub('user_logout', 
                                                            {
                                                                id : this.user.get('id'),
                                                                role: this.user.get('role',[0])
                                                            }
                                        );
            this.$el.html(this.nav_template);
            app.router.navigate('', {trigger:true});
            return this;
        },

        render: function() {
>>>>>>> 864f1de957e07a1d32537b7b84f50a7399d480c0

        render: function() {

                this.$el.html(this.nav_template);
                return this;
        }

    });
        
})(window);