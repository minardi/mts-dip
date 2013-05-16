(function(app) {
  
  app.TicketModel = Backbone.Model.extend({
    urlRoot: "tickets", 
    
    defaults:  {
        doctor_id: 0,
        data: "",
        time: "",
	    user_id: 0,
	    status: "default"
    },
    
    is_doctor: false

  })

})(window);
  
  
   
   