var mts = {   
              specializationList : null,
              doctorsView : null,
              weekly : null,
              user : null,
              userStatus : null,
              dayTimelines : null,
              ticketsView : null,
              currentTimelines : null,
              weekDaysUser : null,
              weekDaysDoctor : null,
              nextTickets : null,
              router : null,
              historyHome: null
          };

$(function () { 
   mts.router = new Router();
   Backbone.history.start({pushState: true});

});
