(function(app) { 

  app.DoctorsView = Backbone.View.extend({

    template: JST["backbone/doctors/doctors_template"],
    tagName: "ul",

    initialize: function() {  
      
      this.$el.append(this.template);
      this.$el = this.$el.find(":first-child") ;
      this.$el.hide();
      
      this.AllDoctors = new DoctorsCollection();
      this.FetchDoctors = new DoctorsCollection();

      this.FetchDoctors.on("reset",this.addSelDoctors,this);
      
      Backbone.Mediator.sub('spec_selected', this.fetchDoctors,this);
      Backbone.Mediator.sub('spec_unselected', this.unselDoctors,this);
      
    },

    fetchDoctors: function(attr) {
      var docs_length = this.AllDoctors.where({
                                                specialization_id:attr["id"]
                                              }).length; 

      if (docs_length == 0) {
         this.FetchDoctors.fetchBySpecId(attr["id"]);  
      } else {  

        this.AllDoctors.each(function(doctor) {
         
           if (doctor.get("specialization_id") == attr["id"]) {
             doctor.set({is_render:true});
           } 
        
        },this)

        this.addAllDoctors(); 
      }
      
    },

    addSelDoctors: function() {

      this.FetchDoctors.each(function(doctor) {

         doctor.set({is_render:true});
         this.AllDoctors.add(doctor);        
         this.addOneDoctor(doctor);        

         this.addAllDoctors();
      },this);
    },

    
    
    unselDoctors: function(attr) {
        
      // publishid mediator event with doctor, before remove model
      
      this.AllDoctors.each(function(doctor) {
        // проверяю если моделька подходит по параметрам спец и отрендерина то ... 
       
        if ((attr["id"] == doctor.get("specialization_id"))&&(doctor.get("is_render") == true)) {
          
           Backbone.Mediator.pub('doctor_unselected', { 
                                                        id: doctor.get("id")                                   
                                                      });
           doctor.set({is_render: false});
        }  

      },this) 
      
      
      if (this.AllDoctors.where({is_render:true}).length == 0) {
         this.$el.hide();         	   
      }
      
      this.addAllDoctors();   
         
    },  
    
    addAllDoctors: function(attr) {
      
      this.$el.html(""); 
      this.AllDoctors.each(this.addOneDoctor,this)
    }, 
    
    addOneDoctor: function(m) {

        if (m.get("is_render") == true) {
           this.$el.show();   
           var view = new DoctorView({model:m});
           
           m.set({is_render: true});
           this.$el.append(view.render().el); 
        } 

    },
   
    // Re-render the titles of the stick item.
    render: function() {     
      this.$el.html(this.template());
      return this;
    }

  });
})(window);