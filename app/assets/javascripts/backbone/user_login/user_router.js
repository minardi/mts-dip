(function(app) {

  app.UserRouter = Backbone.Router.extend({

    routes: {
      ''                    : 'index',
      'home'                : 'showHome',
      'my-private-schedule' : 'showPrivateSchedule'
    },

    index: function() {
      $('#current_schedules').addClass("hidden");
      $('#week_user_tickets').addClass("hidden");
      $('#next-tickets').addClass("hidden");
      // $('#tab_schedules').addClass("hidden");
    },

    showHome: function() {

      $('#tab_schedules').addClass("hidden");
      $('#week_user_tickets').addClass("hidden");
      $('#next-tickets').removeClass("hidden");
      // $('#tab_schedules').addClass("hidden");

    },

    showPrivateSchedule: function() {
      $("#home").removeClass("active");
      $("#private_schedule").addClass("active");
      $('#left_block').addClass("hidden");
      $('#weekly-table').addClass("hidden");
      $('#daily_schedules').addClass("hidden");
      $('#week_user_tickets').addClass("hidden");
      $('#current_schedules').removeClass("hidden");
      $('#week_user_tickets').removeClass("hidden");
      // $('#tab_schedules').removeClass("hidden"); 
    }

  });

})(window);