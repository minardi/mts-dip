(function(app) {

    app.UserView = Backbone.View.extend({
        
        // el - elent-bloc "div", with login field
        el: '#login_block',

        initialize: function() {
    
            this.user = new app.UserModel();
            this.render();

        },

        nav_template: JST["backbone/user_login/nav_template"],
       
        inrole_template: JST["backbone/user_login/user_template"],

        login_events: {
            "keydown" : "checkEnter", 
            "click #btn_login" : "userLogin"
        },

        nav_events : {
            "click #home" : "routHome",
            "click #exit" : "userLogout"
        },

        permition_events : {
            my_schedule : {"click #private-schedule": "routPrivateSchedule"},
            doctor_schedule : {"click #doctor-schedule" : "routDoctorSchedule"},
            admin_panel : {"click #admin-panel" : "routAdminPanel"}
        },

        checkEnter: function(e) {
            if(e.keyCode === 13) {
                this.userLogin();
            }
        },

        userLogin: function() {

            var user_email = this.$el.find('input[type=text]').val(),
                user_password = this.$el.find('input[type=password]').val();
            
            this.user = new app.UserModel({ email: user_email,
                                            password: user_password
                                        });
 
            this.user.on('sync', this.checkLogin, this);
            this.user.save();            
        },

        checkLogin: function() {
            //add check user role before login and show message of block
            if (this.user.get('role') == 'blocked') {

                Backbone.Mediator.pub("error", {el:$('#btn_login'), message:"Your account was BLOCKED! You have more than three missed reception!"});

            } else {
                // check: user come in or not
                if(this.user.get('login')) {    
                    this.routHome();
                    Backbone.Mediator.pub('user_login', 
                                                    {
                                                        id : this.user.get('id'),
                                                        role: this.user.get('role',[0])
                                                    }
                                         );

                    this.startNavigate();
                    
                    return this;

                } else {
                
                    Backbone.Mediator.pub("error", {el:$('#btn_login'), message:"Login Error!</strong>Check input items!"});
                }
            }
        },

        render: function() {
            this.delegateEvents(this.login_events);
            this.$el.html(this.nav_template);
            return this;
        },

        startNavigate : function() {

            var events = {};
            _.extend(events, this.nav_events); 
            
            this.renderNavigate();
            
            for(perm in this.user.get('role')['permition']){
                _.extend(events, this.permition_events[perm]);
            }
            
            this.delegateEvents(events);
        },

        renderNavigate : function() {
            this.$el.html(this.inrole_template({
                                                name: this.user.get('name'),
                                                permition : this.user.get('role')['permition']
                                            })
            );
        },

        routHome: function() {
            mts.router.navigate('home', {trigger:true});
        },  

        routPrivateSchedule: function() {
    
            mts.router.navigate('my-private-schedule', {trigger:true});
        }, 

        routDoctorSchedule : function() {
    
            mts.router.navigate('my-doctor-schedule', {trigger:true});
        },

        routAdminPanel : function() {
            mts.router.navigate('admin', {trigger:true});
        },

        userLogout: function() {
            
            this.user = new app.UserModel();
            Backbone.Mediator.pub('user_logout', 
                                                {
                                                    id : this.user.get('id'),
                                                    role: this.user.get('role',[0])
                                                }
                                 );
            this.render(); 
            mts.router.navigate('', {trigger : true});
            return this;
        },


    });
        
})(window);