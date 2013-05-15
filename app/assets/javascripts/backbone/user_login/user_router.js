(function(app) {

  app.UserRouter = Backbone.Router.extend({

    routes: {
      ''         : 'index',
      'home/:id' : 'showHome',
      'private-schedule/:id' : 'showPrivateSchedule'
    },

    index: function() {
      console.log('hello index');
    },

    showHome: function(id) {
      console.log(id);
      //vent.trigger('home:show', id);
    },

    showPrivateSchedule: function(id) {
      console.log(id);
      //vent.trigger('home:show', id);
    }

  });

  new app.UserRouter();
  Backbone.history.start();

})(window);