(function(app) {
  
  app.WeekTicketModel = Backbone.Model.extend({
    urlRoot: "tickets", 
    defaults:  {
      
        doctor_id: 0,
        data: "",
        time: "",
	      selector_id: "", 
	      user_id: 0
    }

  })

})(window);
  
  
   
   