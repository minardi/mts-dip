(function(app) {

    app.NextTicketView = Backbone.View.extend({

        tagName: "ul",
        className: "dropdown-menu drop_menu_block",

        template: JST ["backbone/tickets/next_ticket_template"],

        render: function(model) {

         this.$el.append(this.template(this.model.toJSON()));
         
          return this;
        },


    });
})(window);