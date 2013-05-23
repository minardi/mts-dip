(function(app, mts) {

  app.Router = Backbone.Router.extend({

    routes: {
      ''                    : 'index',
      'home'                : 'showHome',
      'my-private-schedule' : 'showPrivateSchedule'
    },

    routObjects: function(obj){

      switch(obj){

        case 'user': mts.user != null ? 
                                 mts.user :
                                 mts.user = new app.UserView({el: $("#login_block")});
                         return mts.user;
        break;

        case 'specialization_list' : mts.specializationList != null ? 
                                                               mts.specializationList : 
                                                               mts.specializationList  = new app.SpecsView({el:$("#specializations")});
                                     return mts.specializationList;
        break;

        case 'doctors_view': mts.doctorsView != null ? mts.doctorsView :
                                mts.doctorsView = new app.DoctorsView({el:$("#doctors")});
                                return mts.doctorsView;
        break;

        case 'weekly': mts.weekly != null ? 
                                     mts.weekly :
                                     mts.weekly = new app.WeeklyCollectionView({el : $('#weekly-table')});
                       return mts.doctorsView;
        break;

        case 'user_status': mts.userStatus != null ? 
                                              mts.userStatus : 
                                              mts.userStatus = new app.UserStatusView();
                            return mts.userStatus;
        break;

        case 'day_time_lines': mts.dayTimelines != null ? 
                                                   mts.dayTimelines :   
                                                   mts.dayTimelines = new app.DailySchedulesView({el:$("#daily_schedules")});
                               return mts.dayTimelines;
        break;

        case 'tickets_view': mts.ticketsView != null ? 
                                                mts.ticketsView : 
                                                mts.ticketsView = new app.TicketsView();
                             return mts.ticketsView;
        break;

        case 'next_tickets': mts.nextTickets != null ? 
                                                mts.nextTickets : 
                                                mts.nextTickets = new app.NextTicketsView({el: $("#next-tickets")});
                             return mts.nextTickets;
        break;

      }
    },

    index: function() {

      this.routObjects('user');
      this.routObjects('specialization_list');
      this.routObjects('doctors_view');
      this.routObjects('weekly');
      this.routObjects('day_time_lines');
      this.routObjects('user_status');
      this.routObjects('tickets_view');

      mts.weekdays = null;

      app.UserEx.prototype = mts.user;
      app.userEx = new app.UserEx();
    },

    showHome: function() {

      $('#tab2').addClass("hidden");
      $('#tab1').removeClass("hidden");

      this.routObjects('user');
      this.routObjects('specialization_list');
      this.routObjects('doctors_view');
      this.routObjects('weekly');
      this.routObjects('day_time_lines');
      this.routObjects('next_tickets');
    
    },

    showPrivateSchedule: function() {

      $('#tab1').addClass("hidden");
      $('#tab2').removeClass("hidden");

      this.routObjects('user');

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