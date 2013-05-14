(function(app) {

  app.DoctorView = Backbone.View.extend({

    tagName: "li",
    template: JST["backbone/doctors/doctor_template"],
    
    events: {
      "click" : "chose",
    },

    initialize: function() {
      this.model.on("change", this.render, this);

      if (this.model.is_select) { 
        this.$el.addClass("selected_doctor");
      }   
    },

    
    chose: function(el) {
           
       this.model.is_select ? this.doctorUnsel() : this.doctorSel() ;
       
    },

    doctorSel: function() {
      Backbone.Mediator.pub('doctor_selected', { 
                                                     id: this.model.get("id"),
                                                     name: this.model.get("name"),
                                                     duration: this.model.get("duration") 
                                                });
      this.$el.addClass("selected_doctor");


      this.model.is_select = true; 

      return false;

    },

    doctorUnsel: function() {
      Backbone.Mediator.pub('doctor_unselected', { 
                                                        id: this.model.get("id")
                                                
                            }) 

      this.$el.removeClass("selected_doctor");
       
      this.model.is_select = false;  
      
      return false;
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });
})(window);