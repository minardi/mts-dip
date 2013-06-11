(function(app) {

  app.UsersCollection = Backbone.Collection.extend({
          
    model: app.UserModel,

    url: '/users'

  });
 
 })(window);