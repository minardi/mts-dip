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

    url : 'users/login.json',

    validate: function(attrs) {

      var reg_email = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;

      if (!attrs.name) {
          return "User must have a name";
      }

      if (attrs.password.length <= 3) {
          return "Password is too short";
      }

      if (reg_email.exec(attrs.email) == null) {
          return "Please set valid email";
      }
     }

  });
 
 })(window);