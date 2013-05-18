(function(app) {

  app.UserRouter = Backbone.Router.extend({

    routes: {
      ''                 : 'index',
      'home'             : 'showHome',
      'private-schedule' : 'showPrivateSchedule'
    },

    index: function() {
      console.log('hello index');
    },

    showHome: function() {
      console.log('hollo home');
      //checkLogin.render();
    },

    showPrivateSchedule: function() {
      console.log('hollo table');
    }

  });

})(window);