var mts = {   
              specializationList : null,
              doctorsView : null,
              weekly : null,
              user : null,
              userStatus : null,
              dayTimelines : null,
              ticketsView : null,
              currentTimelines : null,
              weekdays : null,
              nextTickets : null,
              errorProvider : null,
              router : null
          };

$(function () { 
   mts.router = new Router();
   Backbone.history.start({pushState: true});

});
