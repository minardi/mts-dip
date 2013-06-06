(function(app, mts) {

  app.Router = Backbone.Router.extend({

    routes: {
      ''                    : 'index',
      'home'                : 'showHome',
      'my-private-schedule' : 'showPrivateSchedule'
    },

    tabNavigator: function(tab) {

      switch(tab) {
        
        case 'index' : mts.user = mts.user || new app.UserView({el: $("#login_block")});
                       
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
                       mts.provide = mts.errorProvider || new app.errorProvider();                                                      
        break;

        case 'tab1' :  mts.user = mts.user || new app.UserView({el: $("#login_block")});
                       
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
        break;

        case 'tab2' : mts.user = mts.user || new app.UserView({el: $("#login_block")});
        break;
      }

    },

    index: function() {

      this.tabNavigator('index');
      mts.weekdays = null;

      app.UserEx.prototype = mts.user;
      app.userEx = new app.UserEx();
    },

    showHome: function() {

      $('#tab2').addClass("hidden");
      $('#tab1').removeClass("hidden");
      this.tabNavigator('tab1');
    },

    showPrivateSchedule: function() {

      $('#tab1').addClass("hidden");
      $('#tab2').removeClass("hidden");

      this.tabNavigator('tab2');

        mts.weekdays = (app.userEx.getRole() === "doctor") ? 
          new CurrentSchedulesView({el:$("#current_schedules")}) :
          new WeekDaysView({el : $('#week_user_tickets')});
          
        (app.userEx.getRole() === "doctor") ? 
          $('#week_user_tickets').addClass("hidden") :
          $('#current_schedules').addClass("hidden");
          
         (app.userEx.getRole() !== "doctor") ? 
          $('#week_user_tickets').removeClass("hidden") :
          $('#current_schedules').removeClass("hidden"); 

    }

  });

})(window, window.mts);