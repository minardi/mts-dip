(function(app) {

  app.UserModel = Backbone.Model.extend({
          
    defaults : {
        id : 0,
        email : '',
        password : '',
        name : '',
        login : false,
        role : {
                 key: 'guest'
               }
    },

    url : 'users/login.json'
  });
 
 })(window);