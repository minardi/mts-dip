(function(app) {

  app.NavigateWeek = Backbone.View.extend({

    tagName: "div",
    template: JST["backbone/navigate_week/navigate_week_template"],
    
    events: {
      "click #user_week_next" : "nextWeek",
      "click #user_week_prev" : "prevWeek"
    },

    initialize: function(date,nav_view) {
      this.nav_view = nav_view;
      this.date = date; 
      this.render(); 

    },

    nextWeek: function() {

      this.date.nextWeek();
      this.nav_view.refresh();

    },

    prevWeek: function() {
      
      this.date.prevWeek();
      this.nav_view.refresh();
    },

    render: function() {

       this.$el.addClass("nav_week");
       this.$el.html(this.template());

      return this;
    }

  });
})(window);