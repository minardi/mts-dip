(function(app) { 

  app.WeekDaysView = Backbone.View.extend({

    template: JST["backbone/week_user_ticket/week_days_template"],
  
    initialize: function() {       
      this.$el.append(this.template);
      this.setElement(this.$el.children("table"));
      this.weekDays = new WeekDaysCollection();
      this.addWeekRows();
    },
 
    addWeekRows: function() {
      var date = new Date,
          days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],  
          model,
          view;
      
      _.each(days,function(wd,i){
         
        date.setDate(date.getDate()+(i-date.getDay()));
          
        
        model = new WeekDayModel({
                                           date: this.pre_nil(date.getDate()),
                                           month: this.pre_nil(date.getMonth()+1),
                                           year:date.getFullYear(),
                                           day:days[date.getDay()],
                                           user_id: app.userEx.getId()
                                });
        
        this.weekDays.add(model); 
       
        view = new WeekDayView({model:model});

        this.$el.append(view.render().el);

        view.addTickets();
       

      },this);
      
        

      

    },
    
    refresh: function() {
      this.weekDays.reset();
      $('#week_user_tickets').html("");
      $('#week_user_tickets').append(this.template);
      this.setElement($('#week_user_tickets').children("table"));
      
      this.addWeekRows();
    },

    pre_nil: function (data) {
      
      if (data < 10) {
         data = "0" + data;
      }    
      
      return data; 
    },


    render: function() {     
      this.$el.html(this.template());
      return this;
    }
    
  });
})(window);