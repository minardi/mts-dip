(function(app) { 

  app.DoctorsListView = Backbone.View.extend({

    template: JST["backbone/doctors/doctors_template"],
    

    initialize: function() {     
      this.AllDoctors = new DoctorsCollection();
      this.CurentDoctors = new DoctorsCollection();
      this.CurentDoctors.on("reset",this.addAllDoctors,this)
      
      Backbone.Mediator.sub('spec_selected', this.pushDoctors,this);
      Backbone.Mediator.sub('spec_unselected', this.popDoctors,this);
      
      this.AllDoctors.fetch();
    },
    
    pushDoctors: function(attr) {
      
      this.AllDoctors.each(function(doctor) {
	
	if (doctor.get("specialization_id") == attr["id"]) {
	  this.CurentDoctors.push(doctor);	  
	} 
	
      },this);
     
      this.CurentDoctors.trigger("reset");
      
    },
    
    popDoctors: function(attr) {
      var doctors = this.CurentDoctors.where({
	               specialization_id: parseInt(attr["id"],10)
                     });
      
      // publishid mediator event with doctor, before remove model
      $.each(doctors, function(index,doctor) {
	Backbone.Mediator.pub('doctor_unselected', { 
	                                             id: doctor.get("id"),
	                                             name: doctor.get("name")   
	                                          });
	
      }); 
      
      this.CurentDoctors.remove(doctors);
      this.CurentDoctors.trigger("reset");      
    },  
    
    addAllDoctors: function() {
      this.$el.html("");
      this.CurentDoctors.each(this.addOneDoctor,this)
    }, 
    
    addOneDoctor: function(m) {      
      var view = new DoctorView({model:m});
      this.$el.append(view.render().el);      
    },
   
    // Re-render the titles of the stick item.
    render: function() {     
      this.$el.html(this.template());
      return this;
    }

  });
})(window);