$(function () {	


  var specializationList = new SpecsView({el:$("#specializations")}),
  	  doctorsView = new DoctorsView({el:$(".doctors")}),
  	  dayTimelines = new DailySchedulesView({el:$("#daily_schedules")}),
      ticketsView = new TicketsView(),
      weekly = new WeeklyCollectionView({el : $('#weekly-table')}),
      weekdays = new WeekDaysView({el : $('#week_user_tickets')});  	
 
});
