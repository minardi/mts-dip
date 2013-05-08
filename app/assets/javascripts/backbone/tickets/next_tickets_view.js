(function(app) {
    app.NextTicketsView = Backbone.View.extend({

        tagName:"ul",
       // template: JST["backbone/tickets/next_tickets_template"],

        initialize: function() {

            this.allTickets = new TicketsCollection();
            this.CurentTickets = new TicketsCollection();
            
            this.CurentTickets.on("reset", this.addStickers, this);
            this.allTickets.on("reset", this.selectStick, this);

            Backbone.Mediator.sub('user_login', this.render, this);

            this.allTickets.fetch();

        },

       selectStick: function(attrs) {  

            var date = new Date(),
                year = 1900 + date.getYear(),
                month = 1 + date.getMonth(),
                day = date.getDate(),
                hours = date.getHours(),
                minutes = date.getMinutes(),
                seconds = date.getSeconds(),
                model = new app.TicketModel();
                console.log(this.allTickets);


            this.allTickets.each(function(model) {
                console.log(model.get("data").split("_"));
                var date = model.get("data").split("_");
                
               /*if (model.get("data") <=??? ) {*/
                    this.CurentTickets.add(model);
                    this.addStick(model);//}
            }, this);

              console.log(this.CurentTickets);

        },

        addStickers: function() {

            this.CurentTickets.each(this.addStick, this);

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