(function(app) {

  app.UserModel = Backbone.Model.extend({
          
    defaults : {
        id : 0,
        email: '',
        password: '',
        name : '',
        role : 'guest'
    }       
  });
 
 })(window);