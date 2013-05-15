(function(app) {

  app.UserRouter = Backbone.Router.extend({

    routes: {
      ''         : 'index',
      'home' : 'showHome',
      'private-schedule' : 'showPrivateSchedule'
    },

    index: function() {
      console.log('hello index');
    },

    showHome: function(id) {
      console.log('hollo home');
    },

    showPrivateSchedule: function(id) {
      console.log('hollo table');
    }

  });

})(window);