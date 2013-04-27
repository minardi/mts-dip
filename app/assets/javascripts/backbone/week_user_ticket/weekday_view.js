(function(app) {

  app.WeekDayView  = Backbone.View.extend({

    tagName: "tr",
    template: JST["backbone/week_user_ticket/week_day_template"],
    
  
    initialize: function() {
       this.addTickets(); 
    },

    addTickets: function() {
      var WeekTickets = new WeekTicketsCollection,
          search_hash = {
                          user_id: 1,    // здесь нужно будет подставить Юзера
                          //дата в формате "год месяц день" 
                          data: this.model.get("year")+" "+
                                this.model.get("month")+" "+
                                this.model.get("date")   
                        };
       
      
      WeekTickets.fetchByParam(search_hash, this.renderTickets, this);

    },

    renderTickets: function(attrs, context) {
          var self = this;
       
             if ( context != null ) {
                self = context;
             }

          $.each(attrs, function(index, attr) {

            var model = new WeekTicketModel(attr),
                // формат год_месяц_дата_час_минуты
                selector_id = self.model.get("year")+"_"+
                              self.model.get("month")+"_"+
                              self.model.get("date")+"_"+
                              model.get("time"),

                view = new WeekTicketView({
                                            model:model,
                                            el: $("#"+selector_id) 
                                         });

                view.render();
          })  
        
      },
    
    
    render: function(attr) {

      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });
  
})(window);