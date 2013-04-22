(function(app) { 

  app.TicketsView = Backbone.View.extend({

    template: JST["backbone/tickets/tickets_template"],
    

    initialize: function() {     
      this.Tickets = new TicketsCollection();
      this.Tickets.on("reset",this.addAllTickets,this)
      
      this.Tickets.fetch();
    },
    
    
    addTicket: function(ticket) {
       var view = new TicketView({model : ticket});
       
       this.$el.append(view.render().el);
    },  
    
    addAllTickets: function() {
      this.Tickets.each(this.addTicket,this);
    }, 
    
    
    render: function() {     
      this.$el.html(this.template());
      return this;
    }

  });
})(window);