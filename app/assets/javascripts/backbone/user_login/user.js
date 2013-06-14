(function(app) {

  app.UserModel = Backbone.Model.extend({
          
    defaults : {
        id : 0,
        email : 'x@xxxxx.xxx',
        password : '12345',
        name : 'Newuser',
        login : false,
        role : {
                 key: 'guest'
               }
    },

    url : 'users/login.json',

    //validate: function(attrs) {

    urlRoot : '/users',

    switchUrl: function() {
      this.url = this.urlRoot;
    }
    //,

    //validate: function(attrs) {
 
    //  if (reg_email.exec(attrs.email) == null) {
    //      return "Please set valid email";
    //  }
    // } 

   });
 
 })(window);
