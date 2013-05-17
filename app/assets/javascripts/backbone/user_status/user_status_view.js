(function(app) {

    app.UserStatusView = Backbone.View.extend({

        initialize: function () {

            Backbone.Mediator.sub("user_miss", this.getModels, this);

        },

        getModels: function (attr){
            this.userModel = new app.UserModel({id:attr["user_id"]});
            this.statusModel = new app.StatusModel();

            this.userModel.fetch();
            this.statusModel.setUrl(attr);
                        this.userModel.on("reset", this.addMiss, this);
        },

        addMiss: function (attr) {

        var miss_count = this.statusModel.get("miss_count");


            miss_count = miss_count + 1;
            this.statusModel.save();

            console.log(miss_count);

        },
    });
})(window);