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

    
    // Switch this view into `"editing"` mode, displaying the input field.
    chose: function(el) {
      
      //refactor as a specializations
       var is_select = this.model.is_select;
       
       if (is_select) {
	         is_select = false;
	         this.$el.removeClass("selected_doctor");
	         Backbone.Mediator.pub('doctor_unselected', { 
	                                                      id: this.model.get("id")
	                                              
	                                                    });
	 
        } else {
	        is_select = true;
	        this.$el.addClass("selected_doctor");
	 
	        Backbone.Mediator.pub('doctor_selected', { 
	                                                   id: this.model.get("id"),
	                                                   name: this.model.get("name"),
			                                               duration: this.model.get("duration") 
	                                                  });
	 
       }
       
       this.model.is_select = is_select;
       
       return false;
       
    },

    // Re-render the titles of the stick item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });
})(window);