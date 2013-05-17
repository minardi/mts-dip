(function(app) {

  app.UserRouter = Backbone.Router.extend({

    routes: {
      ''                    : 'index',
      'home'                : 'showHome',
      'my-private-schedule' : 'showPrivateSchedule'
    },

    index: function() {
      
    },

    showHome: function() {

    },

    showPrivateSchedule: function() {
      
    }

  });

})(window);