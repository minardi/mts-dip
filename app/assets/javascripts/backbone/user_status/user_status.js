(function(app) {

  app.StatusModel = Backbone.Model.extend({

    url:"/user_statuses.json",
          
    defaults : {
        miss_count: 0,
        //user_id: 0,
    },

    resetUrl: function(attr) {
      
      var user_id = attr["user_id"];

         this.url = '/user_statuses/'+ user_id +'.json';

         this.fetch();

        },
  });
 
 })(window);