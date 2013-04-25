(function(app) {
  
  app.TicketModel = Backbone.Model.extend({
    urlRoot: "tickets", 
    defaults:  {
        doctor_id: 0,
        data: "",
        time: "",
	selector_id: ""
    }

  })

})(window);
  
  
   
   