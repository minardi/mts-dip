 (function(app) {
  
    app.TicketsCollection = Backbone.Collection.extend({
     url: '/tickets', 
     model: window.TicketModel
    })
   
 })(window);  