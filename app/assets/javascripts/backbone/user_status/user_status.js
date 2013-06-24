(function(app) {

  app.StatusModel = Backbone.Model.extend({

    url:"/user_statuses.json",
          
    defaults : {
        miss_count: 0,
        status: "",
    },

    addMissUrl: function(attr) {
      
      var user_id = attr;

         this.url = '/user_statuses/'+ user_id +'/addmiss';

         this.fetch();

        },

    removeMissUrl: function(attr) {
      var user_id = attr;

         this.url = '/user_statuses/'+ user_id +'/removemiss';

         this.fetch();
    }
  });
 
 })(window);