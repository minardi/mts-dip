$(function () { 

  var specializationList = new SpecsView({el:$("#specializations")}),
      doctorsView = new DoctorsView({el:$("#doctors")}),
      dayTimelines = new DailySchedulesView({el:$("#daily_schedules")}),

      ticketsView = new TicketsView(),
      nextTickets = new NextTicketsView({el: $("#next-tickets")}),
      weekly = new WeeklyCollectionView({el : $('#weekly-table')}),
      weekdays = new WeekDaysView({el : $('#week_user_tickets')}),    

<<<<<<< HEAD
  	  currentTimelines = new CurrentSchedulesView({el:$("#current_schedules")}),
=======
      currentTimelines = new CurrentSchedulesView({el:$("#current_schedules")}),
>>>>>>> 70fb9fae87248b19ee106398bb2d2adf2a7c0eac
      user = new UserView({el: $("#login_block")});

      window.router = new UserRouter();
      
<<<<<<< HEAD
=======
      window.UserEx.prototype = user;
      window.userEx = new window.UserEx();
      
      console.log(router);
>>>>>>> 70fb9fae87248b19ee106398bb2d2adf2a7c0eac
  Backbone.history.start();
});
