(function(app) { 

  app.TicketsView = Backbone.View.extend({

    template: JST["backbone/tickets/tickets_template"],
  
    initialize: function() {

      this.type_ticket = "sl-doc"; 

      this.Tickets = new TicketsCollection();

      this.Tickets.on("reset", this.addAllTickets,this)
      this.Tickets.on("add", this.addOneTicket,this)      
  
      Backbone.Mediator.sub('ticket_added', this.createTicket,this);      
      Backbone.Mediator.sub('timeline_render', this.handlerTickets,this);

    },

    handlerTickets: function(attrs) {
       this.type_ticket = attrs["type"];

       if( this.Tickets.is_there(attrs) === true) {
          this.addAllTickets();    
       } else {
          this.Tickets.fetchByAttr(attrs);
       }

    },

    createTicket: function(attrs) { 
        var  model,
             view; 

      this.type_ticket = attrs["type"];
       
     if (this.Tickets.is_there(attrs) === false) {     
         attrs["user_id"] = app.userEx.getId();
         model = new TicketModel(attrs);

         model.save();
         this.Tickets.push(model);
      
      } 
    },
    
    
    
    addOneTicket: function(ticket) {
      var view,
          hash = ticket.attributes,
          selector_id;  
      
      hash["type"] = this.type_ticket;            
      selector_id = this.createSelector(hash);

      ticket.type = this.type_ticket;

      view = new TicketView({
                              model : ticket, 
                              el: $("#"+selector_id),    
                            });
      view.render();
    },

    addAllTickets: function() {
      this.Tickets.each(this.addOneTicket,this);
    }, 
    
    createSelector: function(attrs) {
      var time,
          type,
          id,
          temp;

      temp = attrs["type"].split("-");

      temp[1] === "doc" ? id = attrs["doctor_id"] :
                          id = attrs["user_id"]   ; 
       

      type = attrs["type"];

      temp = attrs["time"].split(":");

      time = "t" + temp[0] + "" + temp[1];
      
      return type +
             id +
             "_" + 
             attrs["data"] + 
             "_"+
             time;
 
    },
    
    render: function() {     
      this.$el.html(this.template());
      return this;
    }
    
  });
})(window);