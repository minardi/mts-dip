$(function () { 

  // var specializationList = new SpecsView({el:$("#specializations")}),
    // var  doctorsView = new DoctorsView({el:$("#doctors")}),
   // var   dayTimelines = new DailySchedulesView({el:$("#daily_schedules")}),

   //   ticketsView = new TicketsView(),
   var   nextTickets = new NextTicketsView({el: $("#next-tickets")}),
         ticketsView = new TicketsView();
      // weekly = new WeeklyCollectionView({el : $('#weekly-table')}),
      // weekdays = new WeekDaysView({el : $('#week_user_tickets')}),    
      // currentTimelines = new CurrentSchedulesView({el:$("#current_schedules")});

 //     user = new UserView({el: $("#login_block")}),
  //    userStatus = new UserStatusView();

      window.router = new UserRouter();
      // window.UserEx.prototype = user;
      // window.userEx = new window.UserEx();
  Backbone.history.start();
});
