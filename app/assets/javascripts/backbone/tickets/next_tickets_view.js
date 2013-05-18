(function(app) {
    app.NextTicketsView = Backbone.View.extend({

        initialize: function() {
            
            this.Tickets = new app.TicketsCollection();
            this.NeedTickets = new app.TicketsCollection();
            
            this.Tickets.on("reset", this.render, this);

            Backbone.Mediator.sub("user_login", this.getCollection, this);

        },

        getCollection: function(attr) {

            this.Tickets.updateURL(attr);

        },

        addStickers: function() {
            var dateex = new app.DateEx(),
                nowDate = dateex.dateTransFormat(),
                nowTime = dateex.timeTransFormat().slice(1);

            this.Tickets.each(function(model) {
        
            ticketDate = model.get("data");
            ticketTime = model.get("time");

            if (this.NeedTickets.length < 3){
                if (nowDate <= ticketDate){
                    if (nowTime <= ticketTime){

                        this.NeedTickets.push(model);
                    }
                }
            }
        }, this);

            this.NeedTickets.each(this.addStick, this);

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