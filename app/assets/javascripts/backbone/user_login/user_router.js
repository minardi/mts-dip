(function(app) {

  app.UserRouter = Backbone.Router.extend({

    routes: {
      ''                    : 'index',
      'home'                : 'index',
      'my-private-schedule' : 'showPrivateSchedule'
    },

    index: function() {

      app.mts.user != null ? app.mts.user :
                             app.mts.user = new UserView({el: $("#login_block")});
      
      app.mts.specializationList != null ? app.mts.specializationList : 
                                           app.mts.specializationList  = new SpecsView({el:$("#specializations")});
      
      app.mts.doctorsView != null ? app.mts.doctorsView :
                                    app.mts.doctorsView = new DoctorsView({el:$("#doctors")});
      
      app.mts.weekly != null ? app.mts.weekly :
                               app.mts.weekly = new WeeklyCollectionView({el : $('#weekly-table')});
      
      app.mts.userStatus != null ? app.mts.userStatus : 
                                   app.mts.userStatus = new UserStatusView();
      
      app.mts.dayTimelines != null ? app.mts.dayTimelines :   
                                     app.mts.dayTimelines = new DailySchedulesView({el:$("#daily_schedules")});
      
      app.mts.nextTickets != null ? app.mts.nextTickets : 
                                    app.mts.nextTickets = new NextTicketsView({el: $("#next-tickets")});
      
      app.mts.ticketsView == null ? app.mts.ticketsView = new TicketsView() : app.mts.ticketsView;

      app.mts.weekdays = null;

      app.UserEx.prototype = app.mts.user;
      app.userEx = new app.UserEx();
    },

    showHome: function() {
      //var ticketsView;

      // if(ticketsView) {
      //   return ticketsView;
      // } else {
      //  ticketsView = new TicketsView();

      // }
      // $('#tab_schedules').addClass("hidden");
      // $('#week_user_tickets').addClass("hidden");
      // $('#next-tickets').removeClass("hidden");
      // $('#tab_schedules').addClass("hidden");

      $('#tab2').addClass("hidden");
      app.mts.ticketsView == null ? app.mts.ticketsView = new TicketsView() : app.mts.ticketsView;
      $('#tab1').removeClass("hidden");

    },

    showPrivateSchedule: function() {


      $('#tab1').addClass("hidden");
      $('#tab2').removeClass("hidden");

      // app.mts.weekdays != null ? app.mts.weekdays : 
      //                            app.mts.weekdays = new WeekDaysView({el : $('#week_user_tickets')});    
      // app.mts.currentTimelines != null ?  app.mts.currentTimelines :
      //                                     app.mts.currentTimelines= new CurrentSchedulesView({el:$("#current_schedules")});

      //if (app.mts.weekdays == null) {
        app.mts.weekdays = (app.userEx.getRole() == "doctor") ? 
          new CurrentSchedulesView({el:$("#current_schedules")}) :
          new WeekDaysView({el : $('#week_user_tickets')});
          console.log("hi");
     // }
    }

  });

})(window);