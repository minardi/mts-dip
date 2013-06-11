(function(app, mts) {
    
    app.RouterView = Backbone.View.extend({

        tab2Template : JST["router/tab2_template"],
        
        tab1Template : JST["router/tab1_template"],

        tab3Template : JST["router/tab3_template"],
        
        createUser : function() {
            
            mts.user_view = mts.user_view || new app.UserView({el: $("#login_block")});
            
            app.UserEx.prototype = mts.user_view;
            app.userEx = new app.UserEx();
            mts.errorProvider = new app.errorProvider();
                
        },
               
        handlerIndex : function(){

            this.renderIndex();
            
            this.createUser();
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

             
             //mts.historyHome = mts.historyHome || 
               //                         new app.HistoryView({model: new HistoryHomeModel()});                       
             
         //   mts.weekdays = null;


        },
       
        renderIndex : function(){
            
            this.$el.children('.action-block').addClass('hidden');
        
            if(this.$el.children('#tab1').length === 0){
                this.$el.append(this.tab1Template());
            } else {
                this.$el.children('#tab1').removeClass('hidden');
            }
        },
        
        handlerShowHome : function(){
            
            this.renderShowHome();
            
            this.createUser();
            
            mts.specializationList = mts.specializationList || 
                                            new app.SpecsView({el:$("#specializations")});
                   
            mts.doctorsView = mts.doctorsView ||
                                   new app.DoctorsView({el:$("#doctors")});
            
            mts.weekly = mts.weekly ||
                        new app.WeeklyCollectionView({el : $('#weekly-table')});
            
            mts.dayTimelines = mts.dayTimelines ||   
                                      new app.DailySchedulesView({el:$("#daily_schedules")});
            mts.nextTickets = mts.nextTickets || 
                                   new app.NextTicketsView({el: $("#next-tickets")});       
    
        },
        
        renderShowHome : function() {
            
            this.$el.children('.action-block').addClass('hidden');
        
            if(this.$el.children('#tab1').length === 0){
                this.$el.append(this.tab1Template());
            } else {
                this.$el.children('#tab1').removeClass('hidden');
            }
        },
        
        handlerShowPrivateSchedule : function() {
        
        this.renderShowPrivateSchedule();
            
        this.createUser();
            
        if (app.userEx.getRole() == "doctor") {

            if (mts.weekDaysDoctor instanceof CurrentSchedulesView) {
                  mts.weekDaysDoctor.refresh();  
                } else {
                  mts.weekDaysDoctor = new CurrentSchedulesView({el:$("#current_schedules")});
                }
    
                $('#current_schedules').removeClass("hidden");
                $('#week_user_tickets').removeClass("hidden");

        } 


        if (app.userEx.getRole() == "patient") {
            $('#current_schedules').addClass("hidden");
            $('#week_user_tickets').removeClass("hidden");
          }

        
        if (app.userEx.getRole() != "guest") {

          if (mts.weekDaysUser instanceof WeekDaysView) {              
              mts.weekDaysUser.refresh()              
             
           } else {                
               mts.weekDaysUser = new WeekDaysView({el : $('#week_user_tickets')});     
           }   

        } else if (app.userEx.getRole() == "guest") {
            $('#current_schedules').addClass("hidden");            
            $('#week_user_tickets').addClass("hidden");
        }

        },
        
        renderShowPrivateSchedule : function() {
            
            this.$el.children('.action-block').addClass('hidden');
        
            if(this.$el.children('#tab2').length === 0){
                this.$el.append(this.tab2Template());
            } else {
                this.$el.children('#tab2').removeClass('hidden');
            }


        },

        hadlerShowAdminPanel : function() {

            this.renderShowAdminPanel();

            mts.administration = (mts.administration) 
                ? 
                    mts.administration 
                : 
                    new app.AdminNavigationView({el : $("#admin_navigation")});
        },

        renderShowAdminPanel : function(){

            this.$el.children('.action-block').addClass('hidden');
        
            if(this.$el.children('#tab3').length === 0){
                this.$el.append(this.tab3Template());
            } else {
                this.$el.children('#tab3').removeClass('hidden');
            }
        }
        
        
    });
    
}(window, window.mts))
