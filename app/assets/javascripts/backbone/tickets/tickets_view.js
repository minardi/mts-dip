(function(app) { 

  app.TicketsView = Backbone.View.extend({

    template: JST["backbone/tickets/tickets_template"],
  
    initialize: function() {
      this.is_doctor = false; 

      this.Tickets = new TicketsCollection();

      this.Tickets.on("reset", this.addAllTickets,this)
      this.Tickets.on("add", this.addOneTicket,this)      
  
      Backbone.Mediator.sub('ticket_added', this.createTicket,this);      
      Backbone.Mediator.sub('timeline_render', this.handlerTickets,this);

    },

    handlerTickets: function(attrs) {
       this.is_doctor = attrs["is_doctor"]

       if( this.Tickets.is_there(attrs) === true) {
          this.addAllTickets();    
       } else {
          this.Tickets.fetchByAttr(attrs);
       }

    },

    createTicket: function(attrs) {

     var  time = attrs["time"].split(":"),
          selector_id = "doc"+attrs["doctor_id"]+"_"+
                       attrs["data"]+"_t"+time[0]+""+time[1],
          model,
          view;             
          
      this.is_doctor = attrs["is_doctor"]    

     if (this.Tickets.is_there(attrs) === false) {     
  
         model = new TicketModel(attrs);

         model.save();
         this.Tickets.push(model);
       //  this.addOneTicket(model); 
      
      } 
    },
    
    
    
    addOneTicket: function(ticket) {

      var  time = ticket.get("time").split(":"),
           selector_id = "doc"+ticket.get("doctor_id")+"_"+
                         ticket.get("data")+"_t"+time[0]+""+time[1],
            view;               
      
       
      // ticket.is_doctor = this.is_doctor 
      ticket.is_doctor = true;

      view = new TicketView({
                              model : ticket, 
                              el: $("#"+selector_id),    
                            });
      view.render();
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