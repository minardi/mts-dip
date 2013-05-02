 (function(app) {
  
    app.DoctorsCollection = Backbone.Collection.extend({
     url: '/doctors', 
     
     model: window.DoctorModel,

     fetchBySpecId: function(spec_id) {
     	var url = this.url;
        this.url = this.url + "?&specialization_id="+spec_id;
        
        this.fetch();
         
        this.url = url;
     }

    })


   
 })(window);  