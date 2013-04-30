(function(app) {

  app.WeekTicketView = Backbone.View.extend({

    tagName: "span",
    select_class: "select_ticket",
    unselect_class: "worktime",
    
    events: {      
      "dblclick" : "ticketRemove"
    },
  
    initialize: function() {
      this.model.bind('change', this.render, this);
    },
    
    ticketRemove: function(el) {

      this.model.destroy();
      this.$el.addClass(this.unselect_class);
      this.$el.removeClass(this.select_class);
      
    },

    render: function() {
      this.$el.addClass(this.select_class);
      this.$el.removeClass(this.unselect_class);
    }

  });
  
})(window);