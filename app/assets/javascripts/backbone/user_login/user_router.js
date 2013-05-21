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
      app.mts.user = new UserView({el: $("#login_block")});
      app.mts.specializationList = new SpecsView({el:$("#specializations")});
      app.mts.doctorsView = new DoctorsView({el:$("#doctors")});
      app.mts.weekly = new WeeklyCollectionView({el : $('#weekly-table')});
      app.mts.userStatus = new UserStatusView();
      app.mts.dayTimelines = new DailySchedulesView({el:$("#daily_schedules")});
      app.mts.nextTickets = new NextTicketsView({el: $("#next-tickets")});
      // }
      app.UserEx.prototype = app.mts.user;
      app.userEx = new app.UserEx();
    },

    showHome: function() {

      $("#tab1").show();
      $("#tab2").hide();

      
      // if(ticketsView) {
      //   return ticketsView;
      // } else {
      app.mts.ticketsView = new TicketsView();


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

      app.mts.weekdays = (app.userEx.getRole() == "doctor") ? 
        new CurrentSchedulesView({el:$("#current_schedules")}) :
        new WeekDaysView({el : $('#week_user_tickets')});
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