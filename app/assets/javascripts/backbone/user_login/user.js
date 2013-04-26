(function(app) {

  app.UserModel = Backbone.Model.extend({
          
    defaults : {
        id : 0,
        name : '',
        role : {'unknown'},
    }       
  });
 
 })(window);