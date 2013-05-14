(function(app) {
    app.NextTicketsView = Backbone.View.extend({

        initialize: function() {
            
            this.Tickets = new app.TicketsCollection();
            
            this.Tickets.on("reset", this.render, this);

            Backbone.Mediator.sub("user_login", this.test, this);

        },

        test: function(attr) {

            this.Tickets.updateURL(attr);

        },

        addStickers: function() {

            this.Tickets.each(this.addStick, this);

        },

        addStick: function(model) {

            var view = new NextTicketView({model:model});

            this.$el.append(view.render().el);

        },

        render:function() {

            this.$el.html("");
            this.addStickers();
            return this;

        },

    });
})(window);