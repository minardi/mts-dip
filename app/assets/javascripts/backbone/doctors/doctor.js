(function(app) {
  
  app.DoctorModel = Backbone.Model.extend({
    defaults:{
        name: "doctor name",
        duration: 15,
		    specialization_id: null
    },

    is_select: false,
    is_render: false,

    urlRoot: "/doctors" ,

    validate: function(attrs) {

      if (!attrs.name) {
          return "Doctor must have a name";
      }
    }

  });

})(window);
  
  
   
   