(function(app) {

    app.UserView = Backbone.View.extend({
        
        // el - elent-bloc "div", with login field
        el: '#login_block',

        initialize: function() {
            
            this.user = new app.UserModel();
            this.render();

        },

        // template with logins inputs
        nav_template: JST["backbone/user_login/nav_template"],
        
        // template with "user on" 
        inrole_template: JST["backbone/user_login/user_template"],

        events: {
            
            "click #btn_login"        : "userLogin",
            "click #close"            : "hideError",
            "click #home"             : "routHome",
            "click #private_schedule" : "routPrivateSchedule",
            "click #exit"             : "userLogout"
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

        checkLogin: function() {
            
            if (this.user.get('role') == 'blocked') {

                $("#blocked_user").removeClass("hidden");
                
                setTimeout(this.hideError, 3000);
            } else {
            if(this.user.get('login')) {

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
        }
        },


        hideError: function() {
            $("#login_error").hide();
            $("#blocked_user").hide();
        },

        routHome: function() {
            app.mts.router.navigate('home', {trigger:true});
            this.navTab("#home", "#private_schedule");

        },

        routPrivateSchedule: function() {
    
            app.mts.router.navigate('my-private-schedule', {trigger:true});
            $("#private_schedule").addClass("active");
            this.navTab("#private_schedule", "#home");
        }, 

        userLogout: function() {

            $("#tab1").removeClass("hidden");
            $("#tab2").addClass("hidden");
            $("#next-tickets").addClass("hidden");
            this.user.clear();
            // mts.nextTickets = new app.NextTicketsView({model : model});
            // app.mts.nextTickets.clear();
            Backbone.Mediator.pub('user_logout', 
                                                {
                                                    id : this.user.get('id'),
                                                    role: this.user.get('role',[0])
                                                }
                                 );
            this.$el.html(this.nav_template);
            
            app.mts.router.navigate('');
            return this;
        },

        navTab: function(tab1, tab2) {
            if($(tab1).addClass("active")) {
                $(tab2).removeClass("active");
            }
        },

        render: function() {

                this.$el.html(this.nav_template);
                return this;
        }

    });
        
})(window);