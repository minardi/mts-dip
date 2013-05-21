$(function () { 

  // var specializationList = new SpecsView({el:$("#specializations")}),
    // var  doctorsView = new DoctorsView({el:$("#doctors")}),
   // var   dayTimelines = new DailySchedulesView({el:$("#daily_schedules")}),

<<<<<<< HEAD
      ticketsView = new TicketsView(),
      nextTickets = new NextTicketsView({el: $("#next-tickets")}),
      weekly = new WeeklyCollectionView({el : $('#weekly-table')}),
      //weekdays = new WeekDaysView({el : $('#week_user_tickets')}),    
      currentTimelines = new CurrentSchedulesView({el:$("#current_schedules")}),
=======
   //   ticketsView = new TicketsView(),
   var   nextTickets = new NextTicketsView({el: $("#next-tickets")});
      // weekly = new WeeklyCollectionView({el : $('#weekly-table')}),
      // weekdays = new WeekDaysView({el : $('#week_user_tickets')}),    
      // currentTimelines = new CurrentSchedulesView({el:$("#current_schedules")});
>>>>>>> ea4b96c58ef1c14a5f2b03c2ee3370a88da6a9ab

 //     user = new UserView({el: $("#login_block")}),
  //    userStatus = new UserStatusView();

      window.router = new UserRouter();
      // window.UserEx.prototype = user;
      // window.userEx = new window.UserEx();
  Backbone.history.start();
});
