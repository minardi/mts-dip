(function(app, mts) {
    
    app.RouterView = Backbone.View.extend({

        private_schedule_template : JST["router/private-schedule_template"],
        
        doctor_schedule_template : JST["router/doctor-schedule_template"],

        home_template : JST["router/home_template"],

        admin_panel_template : JST["router/admin-panel_template"],
        
        initialize : function() {
            
            mts.user_view = mts.user_view || new app.UserView({el: $("#login_block")});
            
            app.UserEx.prototype = mts.user_view;
            app.userEx = new app.UserEx();
            mts.errorProvider = new app.errorProvider();
            mts.hintProvider = new app.hintProvider();
                
        },
               
        handlerIndex : function(){

            this.renderIndex();
            
            mts.specializationList = mts.specializationList || 
                                        new app.SpecsView({el:$("#specializations")});
                       
            mts.doctorsView = mts.doctorsView ||
                                        new app.DoctorsView({el:$("#doctors")});
            
            mts.weekly = mts.weekly ||
                            new app.WeeklyCollectionView({el : $('#weekly-table')});
            
            mts.userStatus = mts.userStatus || 
                                 new app.UserStatusView();
            
            mts.dayTimelines = mts.dayTimelines ||   
                                      new app.DailySchedulesView({el:$("#daily_schedules")});
            
            mts.ticketsView = mts.ticketsView || 
                                   new app.TicketsView();   
            mts.nextTickets = mts.nextTickets || 
                       new app.NextTicketsView({el: $("#next-tickets")});  

        },
       
        renderIndex : function(){
            
            this.$el.children('.action-block').addClass('hidden');
        
            if(this.$el.children('#home-tmp').length === 0){
                this.$el.append(this.home_template());
            } else {
                this.$el.children('#home-tmp').removeClass('hidden');
            }
        },
        
        handlerShowHome : function(){

            this.renderShowHome();

            mts.specializationList = mts.specializationList || 
                                        new app.SpecsView({el:$("#specializations")});
                       
            mts.doctorsView = mts.doctorsView ||
                                        new app.DoctorsView({el:$("#doctors")});
            
            mts.weekly = mts.weekly ||
                            new app.WeeklyCollectionView({el : $('#weekly-table')});
            
            mts.userStatus = mts.userStatus || 
                                 new app.UserStatusView();
            
            mts.dayTimelines = mts.dayTimelines ||   
                                      new app.DailySchedulesView({el:$("#daily_schedules")});
            
            mts.ticketsView = mts.ticketsView || 
                                   new app.TicketsView();    

            mts.nextTickets = mts.nextTickets || 
                                   new app.NextTicketsView({el: $("#next-tickets")}); 
 
        },
        
        renderShowHome : function() {
            
            this.$el.children('.action-block').addClass('hidden');
        
            if(this.$el.children('#home-tmp').length === 0){
                this.$el.append(this.home_template());
            } else {
                this.$el.children('#home-tmp').removeClass('hidden');
            }
        },
        
        handlerShowPrivateSchedule : function() {
        
        this.renderShowPrivateSchedule();
        
        if (app.userEx.getRole() !== "guest") {
            
            $('#block_user_tickets').removeClass("hidden");
            
            if (mts.weekDaysUser instanceof WeekDaysView) {              
                mts.weekDaysUser.refresh()              
             
            } else {                
                mts.weekDaysUser = new WeekDaysView({el : $('#block_user_tickets')});     
            }   

        } else {    
            $('#block_user_tickets').addClass("hidden");
        }

        },
        
        renderShowPrivateSchedule : function() {
            
            this.$el.children('.action-block').addClass('hidden');
        
            if(this.$el.children('#private-schedule-tmp').length === 0){
                this.$el.append(this.private_schedule_template());
            } else {
                this.$el.children('#private-schedule-tmp').removeClass('hidden');
            }


        },

        handlerShowDoctorSchedule : function () {
            
            this.renderShowDoctorSchedule();

            if (app.userEx.getRole() === "doctor") {

                if (mts.weekDaysDoctor instanceof CurrentSchedulesView) {
                    mts.weekDaysDoctor.refresh();  
                } else {
                    mts.weekDaysDoctor = new CurrentSchedulesView({el:$("#current_schedules")});
                }
    
                $('#block_schedules').removeClass("hidden");
                $('#block_user_tickets').removeClass("hidden");

            }

            if (app.userEx.getRole() === "guest") {
                $('#block_schedules').addClass("hidden");  
            }

        },

        renderShowDoctorSchedule : function () {

            this.$el.children('.action-block').addClass('hidden');
        
            if(this.$el.children('#doctor-schedule-tmp').length === 0){
                this.$el.append(this.doctor_schedule_template());
            } else {
                this.$el.children('#doctor-schedule-tmp').removeClass('hidden');
            }

        },

        hadlerShowAdminPanel : function() {

            this.renderShowAdminPanel();
            //if()
            mts.administration = (mts.administration) 
                ? 
                    mts.administration 
                : 
                    new app.AdminNavigationView({el : $("#admin_navigation")});
        },

        renderShowAdminPanel : function(){

            this.$el.children('.action-block').addClass('hidden');
        
            if(this.$el.children('#admin-panel').length === 0){
                this.$el.append(this.admin_panel_template());
            } else {
                this.$el.children('#admin-panel').removeClass('hidden');
            }
        }
        
        
    });
    
}(window, window.mts))
