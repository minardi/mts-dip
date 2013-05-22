(function(app, mts) {

  app.Router = Backbone.Router.extend({

    routes: {
      ''                    : 'index',
      'home'                : 'showHome',
      'my-private-schedule' : 'showPrivateSchedule'
    },

    index: function() {

      mts.user != null ? mts.user :
                             mts.user = new app.UserView({el: $("#login_block")});
      
      mts.specializationList != null ? mts.specializationList : 
                                           mts.specializationList  = new app.SpecsView({el:$("#specializations")});
      
      mts.doctorsView != null ? mts.doctorsView :
                                    mts.doctorsView = new app.DoctorsView({el:$("#doctors")});
      
      mts.weekly != null ? mts.weekly :
                               mts.weekly = new app.WeeklyCollectionView({el : $('#weekly-table')});
      
      mts.userStatus != null ? mts.userStatus : 
                                   mts.userStatus = new app.UserStatusView();
      
      mts.dayTimelines != null ? mts.dayTimelines :   
                                     mts.dayTimelines = new app.DailySchedulesView({el:$("#daily_schedules")});
  
      
      mts.ticketsView == null ? mts.ticketsView = new app.TicketsView() : mts.ticketsView;

      mts.weekdays = null;

      app.UserEx.prototype = mts.user;
      app.userEx = new app.UserEx();
    },

    showHome: function() {

      $('#tab2').addClass("hidden");
      mts.nextTickets != null ? mts.nextTickets : 
                                    mts.nextTickets = new app.NextTicketsView({el: $("#next-tickets")});
      $('#tab1').removeClass("hidden");

      

    },

    showPrivateSchedule: function() {


      $('#tab1').addClass("hidden");
      $('#tab2').removeClass("hidden");

      if (mts.weekdays == null) {
        mts.weekdays = (app.userEx.getRole() == "doctor") ? 
          new CurrentSchedulesView({el:$("#current_schedules")}) :
          new WeekDaysView({el : $('#week_user_tickets')});
      }
    }

  });

})(window, window.mts);