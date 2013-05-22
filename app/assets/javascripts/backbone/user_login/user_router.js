(function(app) {

  app.UserRouter = Backbone.Router.extend({

    routes: {
      ''                    : 'index',
      'home'                : 'showHome',
      'my-private-schedule' : 'showPrivateSchedule'
    },

    index: function() {
      // $('#current_schedules').addClass("hidden");
      // $('#week_user_tickets').addClass("hidden");
      // $('#next-tickets').addClass("hidden");
      // $('#left_block').removeClass("hidden");
      // $('#tab_schedules').addClass("hidden");
      var specializationList,
          doctorsView,
          weekly,
          user,
          userStatus,
          dayTimelines,
          index_elem;

      // index_elem = user && userStatus && specializationList && doctorsView && weekly;
      // if(index_elem) {
      //   return index_elem;
      // } else {
        user = new UserView({el: $("#login_block")});
        specializationList = new SpecsView({el:$("#specializations")});
        doctorsView = new DoctorsView({el:$("#doctors")});
        weekly = new WeeklyCollectionView({el : $('#weekly-table')});
        userStatus = new UserStatusView();
        dayTimelines = new DailySchedulesView({el:$("#daily_schedules")});
      // }
      window.UserEx.prototype = user;
      window.userEx = new window.UserEx();
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

    },

    showPrivateSchedule: function() {
      var currentTimelines,
          weekdays,
          prsch_elem;

      // prsch_elem = currentTimelines && weekdays;

      // if(prsch_elem) {
      //   return prsch_elem;
      // } else {
        weekdays = new WeekDaysView({el : $('#week_user_tickets')});    
        currentTimelines = new CurrentSchedulesView({el:$("#current_schedules")});
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