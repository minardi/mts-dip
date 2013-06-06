(function(app, mts) {

  app.Router = Backbone.Router.extend({

    routes: {
      ''                    : 'index',
      'home'                : 'index',
      'home/'               : 'index',
      'home/:sel_id'        : 'selSpecFromUrl',
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
    },

    selSpecFromUrl: function(sel_id) {
      this.view.handlerIndex();
      mts.historyHome.selSpec(sel_id);
    }



  });

})(window, window.mts);