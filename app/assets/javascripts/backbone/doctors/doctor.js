(function(app) {
  
  app.DoctorModel = Backbone.Model.extend({
    defaults:{
        name: "",
        duration: 0,
		    //is_select: false,
		    specialization_id: null
        //is_render: false
    },

    is_select: false,

    is_render: false

  });

})(window);
  
  
   
   