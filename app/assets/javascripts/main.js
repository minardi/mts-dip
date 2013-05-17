$(function () { 

  var specializationList = new SpecsView({el:$("#specializations")}),
      doctorsView = new DoctorsView({el:$("#doctors")}),
      dayTimelines = new DailySchedulesView({el:$("#daily_schedules")}),

      ticketsView = new TicketsView(),
      nextTickets = new NextTicketsView({el: $("#next-tickets")}),
      weekly = new WeeklyCollectionView({el : $('#weekly-table')}),
      weekdays = new WeekDaysView({el : $('#week_user_tickets')}),    
      currentTimelines = new CurrentSchedulesView({el:$("#current_schedules")}),

      user = new UserView({el: $("#login_block")});

      window.router = new UserRouter();
      window.UserEx.prototype = user;
      window.userEx = new window.UserEx();
  Backbone.history.start();
});
