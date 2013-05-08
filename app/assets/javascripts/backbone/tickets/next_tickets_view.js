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

       selectStick: function(attr) {  

            var date = new Date(),
                year = 1900 + date.getYear(),
                month = 1 + date.getMonth(),
                day = date.getDate(),
                hours = date.getHours(),
                minutes = date.getMinutes(),
                seconds = date.getSeconds(),
                model = new app.TicketModel();
                console.log(this.allTickets);
                console.log(this.CurentTickets);
                //console.log(attr);
                //console.log(model);
 
            this.allTickets.each(function(model) {
                //console.log(this.CurentTickets);
               // if (ticket.get("data") <=??? ) {
                    this.CurentTickets.add(model);//}
            }, this);

              console.log(this.CurentTickets);

        },

        addStickers: function() {
            this.CurentTickets.each(this.addStick, this);
            this.selectStick();


        },

        addStick: function(model) {

            var model = new TicketModel(),
                view = new NextTicketView({model:model});

            this.$el.append(view.render().el);

        },

        render:function() {

            this.$el.html("");
            this.addStickers();
            return this;

        },

    });
})(window);