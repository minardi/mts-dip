(function(app) {

  app.TicketView = Backbone.View.extend({

    tagName: "span",
    select_class: "select_ticket",
    unselect_class: "worktime",
  
    initialize: function() {
      this.model.on('change', this.render, this);
      
      //this.setEvents();
      this.setEventsWithRight();

      Backbone.Mediator.sub('user_login', this.setEventsWithRight, this);
      
    }, 

    setEventsWithRight: function() {
      console.log("login_ticket", this);
      
      //if(this.model.type === "cw-doc") {
       // this.events = { 
       //                 "click" : "changeStatusVisit", 
       //                 "contextmenu" : "changeStatusMis"
       //               } 
      //} else {
        this.render();
        this.events = { "dblclick" : "ticketRemove" }
       // this.$el.on("dblclick", this.ticketRemove, this);
      //} 
    },

    changeStatusVisit: function() {
       var current_doctor = 1;

       switch (this.model.get("status")) {
          
         case "visited":
           this.model.set({status:"canceled"})
           this.model.save();
           break;

         case "canceled": 
           this.model.set({status:"default"})
           this.model.save();
           break;

         default:
           this.model.set({status:"visited"})
           this.model.save();
       }
 
    },

    changeStatusMis: function() {
      var current_doctor = 1;

      switch (this.model.get("status")) {
          
         case "missed":
           this.model.set({status:"default"});
           this.model.save();
           break;

         default:
           this.model.set({status:"missed"});
           this.model.save();
       }

      this.render(); 

      return false;
    },    
    
    ticketRemove: function(el) {

      console.log("remove"); 
      this.model.destroy();
      
      this.removeClass();
      this.$el.addClass(this.unselect_class);      
    },

    removeClass: function() {

      this.$el.removeClass("default_ticket").
               removeClass("missed_ticket").
               removeClass("visited_ticket").
               removeClass("canceled_ticket").
               removeClass("worktime");
      
    },

    addClass: function() {
      this.$el.addClass(this.model.get("status")+"_ticket");   
    },

    render: function() {

      this.removeClass();
      this.addClass();
    }

  });
  
})(window);