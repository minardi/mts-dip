(function(app, mts) {

  app.Router = Backbone.Router.extend({

    routes: {
      ''                    : 'index',
      'home'                : 'index',
      'home/'               : 'index',
      'home/:sel_id'        : 'selSpecFromUrl',
      'my-private-schedule' : 'showPrivateSchedule',
      'admin'               : 'showAdminPanel'

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

<<<<<<< HEAD
    selSpecFromUrl: function(sel_id) {
      this.view.handlerIndex();
      mts.historyHome.selSpec(sel_id);
=======
    showAdminPanel: function() {
      $('#tab1').addClass('hidden');
      $('#tab2').addClass('hidden');
      $('#tab3').removeClass('hidden');

      mts.administration = new app.AdminNavigationView({el:$("#admin_navigation")});
>>>>>>> de02eb6505ed735d6080c42d71096a0a5952014a
    }



  });

})(window, window.mts);
