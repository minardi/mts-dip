(function(app) { 

  app.WeekDaysView = Backbone.View.extend({

    template: JST["backbone/week_user_ticket/week_days_template"],


  
    initialize: function() {   
      
      this.$el.append(this.template);  

      this.weekDays = new app.WeekDaysCollection();


      this.navigate = new app.NavigateWeek(this.refresh,this);

      this.addWeekRows();
      
      this.$el.parent().append(this.navigate.el);
      
    },
 
    addWeekRows: function() {
      var week = this.navigate.getWeek(),
          parse_date,   
          model,
          view;
      
      _.each(week,function(date,day){

        parse_date = date.split("-");
        
        model = new app.WeekDayModel({
                                           date  :  parse_date[0],
                                           month : parse_date[1],
                                           year  :  parse_date[2],
                                           day   :   day,
                                           user_id: app.userEx.getId()
                                });
        
        this.weekDays.add(model); 
       
        view = new app.WeekDayView({model:model});

        this.$el.children("table").append(view.render().el);

        view.addTickets();
       

      },this);

    },
    
    refresh: function() {

      this.weekDays.reset();
      
      this.$el.html("");
      this.$el.append(this.template);

      this.addWeekRows();
    },


    render: function() {     
      this.$el.children("table").html(this.template());
      return this;
    }
    
  });
})(window);