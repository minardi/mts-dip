(function(app) {

  app.UserRouter = Backbone.Router.extend({

    routes: {
      ''                    : 'index',
      'home'                : 'showHome',
      'my-private-schedule' : 'showPrivateSchedule'
    },

    index: function() {

      $("#tab1").show();
      $("#tab2").hide();

      // $('#current_schedules').addClass("hidden");
      // $('#week_user_tickets').addClass("hidden");
      // $('#next-tickets').addClass("hidden");
      // $('#left_block').removeClass("hidden");
      // $('#tab_schedules').addClass("hidden");
      
      // index_elem = user && userStatus && specializationList && doctorsView && weekly;
      // if(index_elem) {
      //   return index_elem;
      // } else {
      if (app.mts.user == null) app.mts.user = new UserView({el: $("#login_block")});
      if (app.mts.specializationList == null) app.mts.specializationList = new SpecsView({el:$("#specializations")});
      if (app.mts.doctorsView == null) app.mts.doctorsView = new DoctorsView({el:$("#doctors")});
      if (app.mts.weekly == null) app.mts.weekly = new WeeklyCollectionView({el : $('#weekly-table')});
      if (app.mts.userStatus == null) app.mts.userStatus = new UserStatusView();
      if (app.mts.dayTimelines == null) app.mts.dayTimelines = new DailySchedulesView({el:$("#daily_schedules")});
      if (app.mts.ticketsView == null) app.mts.ticketsView = new TicketsView();

      app.mts.weekdays = null;
      // }
      app.UserEx.prototype = app.mts.user;
      app.userEx = new app.UserEx();
    },

    showHome: function() {

      $("#tab1").show();
      $("#tab2").hide();

      if (app.userEx.getRole() !== "guest") {
        app.mts.nextTickets = new NextTicketsView({el: $("#next-tickets")});
        
      }
      // if(ticketsView) {
      //   return ticketsView;
      // } else {
      


      // }
      // $('#tab_schedules').addClass("hidden");
      // $('#week_user_tickets').addClass("hidden");
      // $('#next-tickets').removeClass("hidden");
      // $('#tab_schedules').addClass("hidden");

    },

    showPrivateSchedule: function() {

      $("#tab2").show();
      $("#tab1").hide();
      
      // prsch_elem = currentTimelines && weekdays;

      // if(prsch_elem) {
      //   return prsch_elem;
      // } else {

      if (app.mts.weekdays == null) {
        app.mts.weekdays = (app.userEx.getRole() == "doctor") ? 
          new CurrentSchedulesView({el:$("#current_schedules")}) :
          new WeekDaysView({el : $('#week_user_tickets')});
      }
      // }

      // $("#home").removeClass("active");
      // $("#private_schedule").addClass("active");
      // $('#left_block').addClass("hidden");
      // $('#weekly-table').addClass("hidden");
      // $('#daily_schedules').addClass("hidden");
      // $('#week_user_tickets').addClass("hidden");
      // $('#current_schedules').removeClass("hidden");
      // $('#week_user_tickets').removeClass("hidden");
      // $('#tab_schedules').removeClass("hidden"); 
    }

  });

})(window);