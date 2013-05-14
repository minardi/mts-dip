(function(app) {
  
  app.DoctorModel = Backbone.Model.extend({
    defaults:{
        name: "",
        duration: 0,
		    specialization_id: null
    },

    is_select: false,
    is_render: false

  });

})(window);
  
  
   
   