
  
  var mts = {  specializationList : null,
                  doctorsView : null,
                  weekly : null,
                  user : null,
                  userStatus : null,
                  dayTimelines : null,
                  ticketsView : null,
                  currentTimelines : null,
                  weekdays : null,
                  nextTickets : null,
                  router : null
                };

$(function () { 
  mts.router = new UserRouter();
   Backbone.history.start({pushState: true});

});
