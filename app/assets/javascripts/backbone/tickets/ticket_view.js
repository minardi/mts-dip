(function(app) {

  app.TicketView = Backbone.View.extend({

    tagName: "div",
    template: JST["backbone/tickets/ticket_template"],
    
  
    initialize: function() {
      this.model.bind('change', this.render, this);
    },


    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });
  
})(window);