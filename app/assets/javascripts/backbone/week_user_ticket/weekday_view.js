(function(app) {

  app.WeekDayView  = Backbone.View.extend({

    tagName: "tr",
    template: JST["backbone/week_user_ticket/week_day_template"],
    
  
    initialize: function() {
       this.WeekTickets = new WeekTicketsCollection; 

       this.addTickets();       
    },

    addTickets: function() {

          search_hash = {
                          user_id: 1,    // здесь нужно будет подставить Юзера
                          //дата в формате "год_месяц_день" 
                          data: this.model.get("year")+"_"+
                                this.model.get("month")+"_"+
                                this.model.get("date")   
                        };


      this.WeekTickets.fetchByParam(search_hash, this.renderTickets, this);

    },

    renderTickets: function(attrs, context) {
          var self = this;
       
             if ( context != null ) {
                self = context;
             }             

          $.each(attrs, function(index, attr) {

            var model = new WeekTicketModel(attr),
                time = model.get("time").split(":"),  
                // формат userid_год_месяц_дата_часминуты
                selector_id = "user"+1+"_"+  // Здесь вместо 1 нужно будет вставить юзера
                              self.model.get("year")+"_"+
                              self.model.get("month")+"_"+
                              self.model.get("date")+"_t"+
                              time[0]+""+time[1];

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