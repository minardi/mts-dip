$(function () {	


  var     specializationList = new SpecsView({el:$("#specializations")}),
  	  doctorsView = new DoctorsListView({el:$(".doctors")}),
  	 // dayTimelines = new DailySchedulesView({el:$("#daily_schedules")}),
          ticketsView = new TicketsView({el: $("#tickets")}),
          weekly = new WeeklyCollectionView({el : $('#weekly-table')});  	
 
});
