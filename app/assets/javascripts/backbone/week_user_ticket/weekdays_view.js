(function(app) { 

  app.WeekDaysView = Backbone.View.extend({

    template: JST["backbone/week_user_ticket/week_days_template"],
  
    initialize: function() {
      this.$el.append(this.template);
      this.$el = this.$el.find(":first-child").first();
    
      this.addWeekRows(); 
    },
 
    addWeekRows: function() {
      var date = new Date,
          days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],   
          strDate = "";

      for(var i = 0; i < 7; i++) {
        date.setDate(date.getDate()+(i-date.getDay()));
          
        
        var model = new WeekDayModel({
                                           date: this.pre_nil(date.getDate()),
                                           month: this.pre_nil(date.getMonth()+1),
                                           year:date.getFullYear(),
                                           day:days[date.getDay()],
                                           user_id: 1  // здесь нужно будет подставить Юзера
                                        }),
         
       
        view = new WeekDayView({model:model});

        this.$el.append(view.render().el);

      }

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