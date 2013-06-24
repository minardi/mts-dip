(function(app) {

  app.UserModel = Backbone.Model.extend({
          
    defaults : {
        email : 'x@xxxxx.xxx',
        password : '123456',
        name : 'Newuser',

        login : false,
        role : {
                 key : 'guest',
                 permition : {}
               }
    },

    urlRoot : '/users',

    loginUrl: function(type) {

      this.urlRoot = '/users/login';                  
    
    }

   });
 
 })(window);
