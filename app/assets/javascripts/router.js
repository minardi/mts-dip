(function(app, mts) {

  app.Router = Backbone.Router.extend({

    routes: {
      ''                    : 'index',
      'home'                : 'showHome',
      'my-private-schedule' : 'showPrivateSchedule',
      'my-doctor-schedule'  : 'showDoctorSchedule',
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

    showDoctorSchedule: function() {
        
        this.view.handlerShowDoctorSchedule();
    },


    showAdminPanel: function() {
    
        this.view.hadlerShowAdminPanel();

    }



  });

})(window, window.mts);
