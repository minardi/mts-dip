(function(app) {

  app.WeekDayView  = Backbone.View.extend({

    tagName: "tr",
    template: JST["backbone/week_user_ticket/week_day_template"],
    
  
    initialize: function() {
       this.WeekTickets = new WeekTicketsCollection; 
       this.WeekTickets.on("add",this.renderTickets,this)
       this.addTickets();
            
    },

    addTickets: function() {

      
          search_hash = {
                          user_id: 1,    // здесь нужно будет подставить Юзера
                          //дата в формате "год_месяц_день" 
                          data: this.model.get("date")+"-"+
                                this.model.get("month")+"-"+
                                this.model.get("year")   
                        };
 

      this.WeekTickets.fetch({remove : false, update : true, data : search_hash});

    },

    renderTickets: function(ticket) {

                var time = ticket.get("time").split(":"),  
                    selector_id = "user"+1+"_"+  // Здесь вместо 1 нужно будет вставить юзер
                                   ticket.get("data")+"_t"+
                                   time[0]+""+time[1];

                view = new WeekTicketView({
                                              model:ticket,
                                              el: $("#"+selector_id) 
                                          });

                view.render();        
      },
    
    
    render: function(attr) {

      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });
  
})(window);