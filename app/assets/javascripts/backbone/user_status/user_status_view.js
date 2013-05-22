(function(app) {

    app.UserStatusView = Backbone.View.extend({

        initialize: function () {

            this.statusModel = new app.StatusModel();

            Backbone.Mediator.sub("user_miss", this.addMiss, this);
            Backbone.Mediator.sub("remove_user_miss", this.removeMiss, this);

        },

        addMiss: function (attr){

            this.statusModel.addMissUrl(attr);
             
        },

        removeMiss: function (attr) {
 
            this.statusModel.removeMissUrl(attr);

        },
    });
})(window);