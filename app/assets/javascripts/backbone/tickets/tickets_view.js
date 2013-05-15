(function(app) { 

  app.TicketsView = Backbone.View.extend({

    template: JST["backbone/tickets/tickets_template"],
  
    initialize: function() {
      
      this.Tickets = new TicketsCollection();

      this.Tickets.on("reset",this.addAllTickets,this)
      this.Tickets.on("add",this.addOneTicket,this)      
  
      Backbone.Mediator.sub('ticket_added', this.createTicket,this);      
      Backbone.Mediator.sub('timeline_render', this.Tickets.fetchByAttr,this.Tickets);

    }, 

    createTicket: function(attrs) {

     var  time = attrs["time"].split(":"),
          selector_id = "doc"+attrs["doctor_id"]+"_"+
                       attrs["data"]+"_t"+time[0]+""+time[1],
          model,
          view;             


     if (this.Tickets.is_there(attrs) == false) {
     
         // this attrs for save user id withaut user
         attrs["user_id"] = 1;

         model = new TicketModel(attrs);
         view = new TicketView({
                                 model:model, 
                                 el: $("#"+selector_id)        
                             });
      
         view.render();
         model.save();
         this.Tickets.push(model);      
        
      } 
    },
    
    
    
    addOneTicket: function(ticket) {

      var  time = ticket.get("time").split(":"),
           selector_id = "doc"+ticket.get("doctor_id")+"_"+
                         ticket.get("data")+"_t"+time[0]+""+time[1],
            view;               

      view = new TicketView({
                              model : ticket, 
                              el: $("#"+selector_id)    
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