 (function(app) {
  
    app.DoctorsCollection = Backbone.Collection.extend({
     
     model: app.DoctorModel,

     fetchBySpecId: function(spec_id) {
        this.url = "/doctors?&specialization_id="+spec_id;
        this.fetch();
      }

    })

 })(window);  