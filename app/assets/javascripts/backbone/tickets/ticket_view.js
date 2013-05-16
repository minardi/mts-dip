(function(app) {

  app.TicketView = Backbone.View.extend({

    tagName: "span",
    select_class: "select_ticket",
    unselect_class: "worktime",
  
    initialize: function() {
      this.model.bind('change', this.render, this);
      
      this.setEvents();
      
    },

    setEvents: function() {
      if(this.model.is_doctor) {
        this.events = { 
                        "click" : "changeStatusVisit", 
                        "contextmenu" : "changeStatusMis"
                      } 
      } else {
        this.events = { "dblclick" : "ticketRemove" } 
      } 
    },

    changeStatusVisit: function() {
       var current_doctor = 1;

       if (this.model.get("doctor_id") !== current_doctor ) return false;

       switch (this.model.get("status")) {
          
         case "visited":
           this.model.set({status:"canceled"})
           this.model.save();
         break

         case "canceled": 
           this.model.set({status:"default"})
           this.model.save();
         break

         default:
           this.model.set({status:"visited"})
           this.model.save();
       }
 
       console.log(this.model.get("status"));
//       this.render();
    },

    changeStatusMis: function() {
      var current_doctor = 1;

      if (this.model.get("doctor_id") !== current_doctor ) return false;

      switch (this.model.get("status")) {
          
         case "missed":
           this.model.set({status:"default"})
           this.model.save();
         break

         default:
           this.model.set({status:"missed"})
           this.model.save();
       }

      this.render(); 

      return false
    },    
    
    ticketRemove: function(el) {

      this.model.destroy();
      
      this.removeClass();
      this.$el.addClass(this.unselect_class);      
    },

    removeClass: function() {
      this.$el.removeClass("default_ticket");
      this.$el.removeClass("missed_ticket");
      this.$el.removeClass("visited_ticket");
      this.$el.removeClass("canceled_ticket");
      this.$el.removeClass("worktime");
      
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