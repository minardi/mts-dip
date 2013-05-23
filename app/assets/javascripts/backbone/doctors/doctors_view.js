(function(app) { 

  app.DoctorsView = Backbone.View.extend({

    template: JST["backbone/doctors/doctors_template"],

    initialize: function() {  

      this.$el.append(this.template);
      this.setElement(this.$el.children("ul"));
     
      
      this.AllDoctors = new DoctorsCollection();

      this.AllDoctors.on("add", this.addSelDoctors,this);
      
      Backbone.Mediator.sub('spec_selected', this.fetchDoctors,this);
      Backbone.Mediator.sub('spec_unselected', this.unselDoctors,this);
      
    },

    fetchDoctors: function(attr) {
      
       this.AllDoctors.setRenderDoctors(attr["id"]);
       
       this.addAllDoctors(); 
      
    },

    addSelDoctors: function(doctor) {
  
      doctor.is_render = true;

      this.addOneDoctor(doctor);
    },

    
    
    unselDoctors: function(attr) {        
      
      this.AllDoctors.unsetDoctors(attr["id"]);      
      
      if (this.AllDoctors.lengthByAttr({is_render:true}) === 0) {
          this.ElHide();         	   
      }
      
      this.addAllDoctors();   
         
    },  
    
    addAllDoctors: function(attr) {
      
      this.$el.html(""); 
      this.AllDoctors.each(this.addOneDoctor, this)
    }, 
    
    addOneDoctor: function(doctor) {      
      var view;

        if (doctor.is_render === true) {           
           view = new DoctorView({model:doctor});
           this.ElShow(); 
           
           this.$el.append(view.render().el); 
        } 

    },
   
    ElShow: function() {
      this.$el.removeClass("hidden");
    },

    ElHide: function() {
       this.$el.addClass("hidden");
    },

    render: function() {     
      this.$el.html(this.template());
      return this;
    }

  });
})(window);