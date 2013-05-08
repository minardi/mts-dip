(function(app) {

    app.NextTicketView = Backbone.View.extend({

        tagName: "ul",
        template: JST ["backbone/tickets/next_ticket_template"],

        initialize:function() {

        },

        render: function(model) {
          console.log(this.model);
         this.$el.append(this.template(this.model.toJSON()));
          return this;
        },


    });
})(window);