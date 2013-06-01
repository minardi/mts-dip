(function(app, mts) {
    
    app.RouterView = Backbone.View.extend({
        
        initialize : function (){
        
        },
        
        tab2Template : JST["router/tab2_template"],
        
        tab1Template : JST["router/tab1_template"],
        
        createUser : function() {
            
            mts.user = mts.user || new app.UserView({el: $("#login_block")});
            
            app.UserEx.prototype = mts.user;
            app.userEx = new app.UserEx();
                
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
             console.log(mts.weekdays);
            if (mts.weekdays instanceof CurrentSchedulesView) {
                  mts.weekdays.refresh();  
                } else {
                  mts.weekdays = new CurrentSchedulesView({el:$("#current_schedules")});
                }
    
                $('#week_user_tickets').addClass("hidden");
                $('#current_schedules').removeClass("hidden");

        } else if ((app.userEx.getRole() == "patient")) {
            //add same refresh as doctor does) 
          
            if (mts.weekdays instanceof WeekDaysView) mts.weekdays.remove();

              mts.weekdays = new WeekDaysView({el : $('#week_user_tickets')});
    
            $('#week_user_tickets').removeClass("hidden");
            $('#current_schedules').addClass("hidden");
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
        
        
    });
    
}(window, window.mts))