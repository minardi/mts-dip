(function(app) {
    app.NextTicketsView = Backbone.View.extend({

        initialize: function() {
            
            this.Tickets = new app.TicketsCollection();
            
            this.Tickets.on("reset", this.render, this);
            this.Tickets.on("all", function(a) {console.log(a)}, this);
            Backbone.Mediator.sub("user_login", this.Tickets.updateURL);

        },

       selectStick: function() {  

            // var model = new app.TicketModel();
            //     console.log(this.allTickets);


            // this.allTickets.each(function(model) {
                
            //    if (model.get("data") <=?????????Wait Nor's new Date???????????????? ) {
            //         this.CurentTickets.add(model);
            //         //this.addStick(model);//???????????????????Delete before release?????????????????}
            // }, this);

            //   console.log(this.CurentTickets);

        },

        addStickers: function() {

            this.Tickets.each(this.addStick, this);

        },

        addStick: function(model) {

            var view = new NextTicketView({model:model});

            this.$el.append(view.render().el);

        },

        render:function() {
            console.log(this.Tickets);
            console.log("blabla");
            this.$el.html("");
            this.addStickers();
            return this;

        },

    });
})(window);