(function(app) {

  app.UserModel = Backbone.Model.extend({
          
    defaults : {
        email : '',
        password : '',
        name : '',

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
