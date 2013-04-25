(function(app) { 

  app.TicketsView = Backbone.View.extend({

    template: JST["backbone/tickets/tickets_template"],
  
    initialize: function() {
      
      this.Tickets = new TicketsCollection();
      this.Tickets.on("reset",this.addAllTickets,this)      
  
      Backbone.Mediator.sub('ticket_added', this.addTicket,this);
      
      Backbone.Mediator.sub('timelime_render', function(attrs) {	
	this.Tickets.fetchByParam(attrs);
      },this);
      
    },
    
    
    addTicket: function(attrs) {
      
      if (this.Tickets.is_there(attrs) == false) {
	
	var model = new TicketModel(attrs),
	    view = new TicketView({
	                             model:model, 
			              el: $("#"+attrs["selector_id"])	       
	                         });
	    
        view.render();
	model.save();
        this.Tickets.push(model);      
        
      } 
    },
    
    
    
    addOneTicket: function(ticket) {
       var view = new TicketView({
	                           model : ticket, 
				    el: $("#"+ticket.get("selector_id"))	  
                                });
       view.render();
    },
    
    addAllTickets: function() {
      console.log("tickets load",this.Tickets.length)
      this.Tickets.each(this.addOneTicket,this);
    }, 
    
    
    render: function() {     
      this.$el.html(this.template());
      return this;
    }
    
  });
})(window);