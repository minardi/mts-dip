 (function(app) {
  
    app.DoctorsCollection = Backbone.Collection.extend({
     url: '/doctors', 
     model: window.DoctorModel
    })
   
 })(window);  