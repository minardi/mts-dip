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


    selSpecFromUrl: function(sel_id) {
      this.view.handlerIndex();
      mts.historyHome.selSpec(sel_id);
    },

    showAdminPanel: function() {
      $('#tab1').addClass('hidden');
      $('#tab2').addClass('hidden');
      $('#tab3').removeClass('hidden');

      mts.administration = (mts.administration) ? 
        mts.administration : 
        new app.AdminNavigationView({el:$("#admin_navigation")});

    }



  });

})(window, window.mts);
