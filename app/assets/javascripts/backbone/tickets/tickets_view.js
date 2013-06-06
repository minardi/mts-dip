(function(app) { 

  app.TicketsView = Backbone.View.extend({

    template: JST["backbone/tickets/tickets_template"],
  
    initialize: function() {

      this.type_ticket = "sl-doc"; 

      this.Tickets = new TicketsCollection();

      this.Tickets.on("reset", this.addAllTickets, this);
      this.Tickets.on("add", this.addOneTicket, this);      
  
      Backbone.Mediator.sub('ticket_added', this.createTicket, this);      
      Backbone.Mediator.sub('timeline_render', this.handlerTickets, this);
         
   
      
      Backbone.Mediator.sub('user_login', this.getUserSchedule, this);

      Backbone.Mediator.sub('user_login', this.enableEvents, this);

      Backbone.Mediator.sub('user_logout', this.disableEvents, this);

    },

    enableEvents: function() {
      this.Tickets.is_set_event = true;
    },

    disableEvents: function() {
      this.Tickets.is_set_event = false;
    },

    handlerTickets: function(attrs) {


       this.type_ticket = attrs["type"];
      
       if( this.Tickets.is_there(attrs) === true) {
          this.addAllTickets();  
 
       } else {
          this.Tickets.fetchByAttr(attrs);
       };

    },

    createTicket: function(attrs) { 
        var  model,
             view; 
    
      this.type_ticket = attrs["type"];
       
     if (this.Tickets.is_there(attrs) === false) {     

         if(this.Tickets.cloneValid(attrs)) {
             
             attrs["user_id"] = app.userEx.getId();
             model = new TicketModel(attrs);
    
             model.save();
             this.Tickets.push(model);
         }
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

      if (this.Tickets.is_set_event) {
       view.setEventsWithRight(); 
      
     }
      
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

      id = temp[1] == "doc" ?  attrs["doctor_id"] :
                               attrs["user_id"]   ; 
       

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
    },
    
    //sorry :), in future we may use handler, who may getting schedule by custom date;
    
    getUserSchedule : function (user_data) {
        
        var date = new app.DateEx(),
            week_schedule = date.getCurrentWeek({transport : true});
        
        for(day in week_schedule) {
            
            this.Tickets.fetchByAttr({
                user_id : user_data['id'],
                data : week_schedule[day]
                
            });
            
        }
    }
    
  });
})(window);