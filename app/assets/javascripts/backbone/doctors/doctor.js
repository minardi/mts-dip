(function(app) {
  
  app.DoctorModel = Backbone.Model.extend({
    defaults:{
        name: "",
        duration: 0,
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
  
  
   
   