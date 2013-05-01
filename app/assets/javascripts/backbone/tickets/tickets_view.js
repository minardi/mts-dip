(function(app) { 

  app.TicketsView = Backbone.View.extend({

    template: JST["backbone/tickets/tickets_template"],
  
    initialize: function() {
      
      this.Tickets = new TicketsCollection();
      this.Tickets.on("reset",this.addAllTickets,this)      
  
      Backbone.Mediator.sub('ticket_added', this.addTicket,this);
      
      Backbone.Mediator.sub('timeline_render', function(attrs) {  
        var hesh_tickets = this.Tickets.where(attrs);

        if ( hesh_tickets.length != 0 ) {

          this.addTicketsWithHash(hesh_tickets); 
        
        } else {
        
          this.Tickets.fetchByParam(attrs, this.addTicketsWithHash,this);  
        
        }
        
     
      },this);
      
    },    
    
    addTicketsWithHash: function(attrs, context) {
       var SelTickets = new TicketsCollection(),
           self = this;
       
       if ( context != null ) {
          self = context;
       }

       $.each(attrs, function(index, attr) {
         var model = new TicketModel(attr);
         SelTickets.add(model);
       })
       SelTickets.each(self.addOneTicket,self);
    },


    addTicket: function(attrs) {

     var  time = attrs["time"].split(":"),
          selector_id = "doc"+attrs["doctor_id"]+"_"+
                       attrs["data"]+"_t"+time[0]+""+time[1]; 


    console.log(selector_id);  
    if (this.Tickets.is_there(attrs) == false) {
     
     // this attrs for save user id withaut user
     attrs["user_id"] = 1;

     var model = new TicketModel(attrs),
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
                         ticket.get("data")+"_t"+time[0]+""+time[1]; 

       console.log(selector_id);
       var view = new TicketView({
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