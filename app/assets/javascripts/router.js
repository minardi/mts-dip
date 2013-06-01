(function(app, mts) {

  app.Router = Backbone.Router.extend({

    routes: {
      ''                    : 'index',
      'home'                : 'index',
      'my-private-schedule' : 'showPrivateSchedule'
    },
    
    initialize : function() {
        this.view = new app.RouterView({el : $('#mts-application')});
    },

    index: function() {
        
        this.view.handlerIndex();
     },

    showHome: function() {

        this.view.handlerShowHome();
    },

    showPrivateSchedule: function() {
        
        this.view.handlerShowPrivateSchedule();
    }

  });

})(window, window.mts);