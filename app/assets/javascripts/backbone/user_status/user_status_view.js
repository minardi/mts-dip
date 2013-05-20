(function(app) {

    app.UserStatusView = Backbone.View.extend({

        initialize: function () {

            this.statusModel = new app.StatusModel();

            Backbone.Mediator.sub("user_miss", this.getModels, this);

            this.statusModel.on("sync", this.addMiss, this);
            //this.statusModel.on("all", function(e){console.log(e);}, this)
        },

        getModels: function (attr){

            this.statusModel.resetUrl(attr);
             
        },

        addMiss: function (attr) {
 
        var miss_count = this.statusModel.get("miss_count");

            if (miss_count === 3) {
                Backbone.Mediator.pub("user_blocked", {user_id: attr["user_id"]} );
            }

        },
    });
})(window);