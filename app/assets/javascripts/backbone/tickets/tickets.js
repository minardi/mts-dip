 (function(app) {
  
    app.TicketsCollection = Backbone.Collection.extend({
     url: '/tickets', 
     model: window.TicketModel,
     
     is_there: function(attrs) {
       var models = this.where(attrs),
           is_null = false;
	   
	if (models.length > 0) is_null = true;
        return is_null;       
     }
     
    })
   
 })(window);  