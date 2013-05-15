 (function(app) {
  
    app.WeekTicketsCollection = Backbone.Collection.extend({
       url: '/tickets', 
       model: app.TicketModel,
    })

    
 })(window);  