(function(app) { 

  app.TicketsView = Backbone.View.extend({

    template: JST["backbone/tickets/tickets_template"],
    select_class: "select_ticket",
    

    initialize: function() {     
      this.Tickets = new TicketsCollection();
      this.Tickets.on("reset",this.addAllTickets,this)      
      this.Tickets.fetch();
      
      Backbone.Mediator.sub('ticket_added', this.addTicket,this);
      Backbone.Mediator.sub('ticket_removed', this.removeTicket,this);
    },
    
    
    addTicket: function(attrs) {      
      
      if (this.Tickets.is_there(attrs) == false) {
	
	var model = new TicketModel(attrs)
	
        model.save();
        this.Tickets.fetch();      
        
	$("#"+attrs["selector_id"]).addClass(this.select_class);
	
      } 
      
      
       
    },
    
    removeTicket: function(attrs) {
      
      var tickets = this.Tickets.where(attrs);
            
      if (tickets.length > 0) {
	tickets[0].destroy();
        this.Tickets.fetch();
      }          
      
      $("#"+attrs["selector_id"]).removeClass(this.select_class);
      
    },
    
    
    
    addOneTicket: function(ticket) {
       var view = new TicketView({model : ticket});
       
       $("#"+ticket.get("selector_id")).addClass(this.select_class);
    },
    
    addAllTickets: function() {
      this.Tickets.each(this.addOneTicket,this);
    }, 
    
    
    render: function() {     
      this.$el.html(this.template());
      return this;
    }
    
  });
})(window);