 (function(app) {
  
    app.DoctorsCollection = Backbone.Collection.extend({

     url: '/doctors',	
     model: app.DoctorModel,
     
     lengthByAttr: function(attrs) {
     	return this.where(attrs).length;
     },

     setDoctors: function(spec_id) {
    
         if (this.lengthByAttr({ specialization_id:spec_id }) === 0) {
         
           this.fetch({remove : false, update : true, data : {specialization_id: spec_id}});

         } else {  
  
           this.each(function(doctor) {
          
              if (doctor.get("specialization_id") == spec_id) {
                 doctor.is_render = true;
              } 
          
            }, this)

         }
     },

   
   unsetDoctors: function(spec_id) {

   	  this.each(function(doctor) {

        if (spec_id === doctor.get("specialization_id")) {
          
           Backbone.Mediator.pub('doctor_unselected', { 
                                                        id: doctor.get("id")                                   
                                                      });
           doctor.is_render = false;
           doctor.is_select = false;

        }  

      }, this) 
   }

  }) 

 })(window);  