(function(app) {

  app.NavigateWeek = Backbone.View.extend({

    tagName: "div",
    template: JST["backbone/navigate_week/navigate_week_template"],
    
    events: {
      "click #user_week_next" : "nextWeek",
      "click #user_week_prev" : "prevWeek"
    },

    initialize: function(callback,context) {
    
      this.context = context; 
      this.callback = callback;

      this.date = new DateEx(); 
      this.render(); 

    },

    nextWeek: function() {

      this.date.nextWeek();
      this.callback.call(this.context);

    },

    prevWeek: function() {
      
      this.date.prevWeek();
      this.callback.call(this.context);
    
    },

    getWeek: function() {
      return this.date.getCurrentWeek({"transport":true});
    },

    getWeekDotte: function() {
      return this.date.getCurrentWeek({"transport":false});
    },    

    render: function() {

       this.$el.addClass("nav_week");
       this.$el.html(this.template());

      return this;
    }

  });
})(window);