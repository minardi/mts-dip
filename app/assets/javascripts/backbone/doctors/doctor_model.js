(function(app) {
  
  app.DoctorModel = Backbone.Model.extend({
    defaults: function() {
      return {
        name: "",
        duration: 0,
	is_select: false,
	specialization_id: null
	
      }
    }

  })

})(window);
  
  
   
   