(function(app) {

  app.UserModel = Backbone.Model.extend({
          
    defaults : {
        //id : 0,
        email : '',
        password : '',
        name : '',
        login : false,
        role : {
                 key : 'guest',
                 permition : {}
               }
    },

    url : 'users/login.json',

    switchUrl: function() {
      this.url = "/users";
    }
    //,

    //validate: function(attrs) {
 
    //  if (reg_email.exec(attrs.email) == null) {
    //      return "Please set valid email";
    //  }
    // } 

   });
 
 })(window);
