(function(app) {

  app.WeekDayView  = Backbone.View.extend({

    tagName: "tr",
    template: JST["backbone/week_user_ticket/week_day_template"],
    
  
    initialize: function() {
       this.addTickets();            
    },

    addTickets: function() {

          tickets_hash = {
                          user_id: app.userEx.getId(),   
                          
                          data: this.model.get("date")+"-"+
                                this.model.get("month")+"-"+
                                this.model.get("year"),
                          type: "cw-user"         
                        };
  

          Backbone.Mediator.pub("timeline_render", tickets_hash);  
    },
    
    render: function(attr) {

      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });
  
})(window);