(function(app) {

  app.TicketView = Backbone.View.extend({


    events: {
       "contextmenu":"render"
    },

    tagName: "span",
    select_class: "select_ticket",
    unselect_class: "worktime",

   

    initialize: function() {
      this.model.on('change', this.render, this);

      this.setEventsWithRight ();
      
      Backbone.Mediator.sub('user_logout', this.unsetEventsWithRight, this);

    }, 

    unsetEventsWithRight: function() {
      this.model.type = "sl-doc";
      this.events = {};
      this.delegateEvents();
    },

    setEventsWithRight: function() {    
       
       if ((this.model.type == "cw-doc") && (this.isDateLarge())) {
         
          this.events = { 
                         "click" : "changeStatusVisit", 
                         "contextmenu" : "changeStatusMis"
                       } 
         } else if ( 
                      (this.model.get("status") == "default") &&
                      (this.model.get("user_id") == userEx.getId())
                   )    

         {
             this.events = { 
                          "dblclick" : "ticketRemove"                         
                         }              
         } 
        
        this.delegateEvents();
    },

    changeStatusVisit: function() {


       switch (this.model.get("status")) {
          
         case "visited":
           this.model.set({status:"canceled"});
           this.model.save();
           break;

         case "canceled": 
           this.model.set({status:"default"});
           this.model.save();
           break;

         default:
           this.model.set({status:"visited"})
           this.model.save();
       }
 
    },

    changeStatusMis: function() {

      switch (this.model.get("status")) {
          
         case "missed":
           this.model.set({status:"default"});
           this.model.save();
           Backbone.Mediator.pub('remove_user_miss', this.model.get('user_id'));
           break;

         default:
           this.model.set({status:"missed"});
           this.model.save();
           Backbone.Mediator.pub('user_miss', this.model.get('user_id'));
       }

      this.render(); 

      return false;
    },    
    
    ticketRemove: function() {

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
    
    isDateLarge: function() {
     var date = new Date,
         date_s,
         time_s;

      date_s = this.addNil(date.getDate())+"-"+
               this.addNil( date.getMonth())+"-"+ 
               date.getFullYear();

      time_s =  this.addNil(date.getHours())+":"+
                this.addNil(date.getMinutes());

      return (date_s + time_s) > (this.model.get("data") + this.model.get("time")) ? true : false; 
      

    },

    addNil: function(a) {

     if (a < 10) return "0"+a;  
     return a;
    },


    render: function() {
      this.removeClass();
      this.addClass();
    }

  });
  
})(window);
