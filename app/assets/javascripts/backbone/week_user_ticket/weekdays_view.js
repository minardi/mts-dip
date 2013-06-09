(function(app) { 

  app.WeekDaysView = Backbone.View.extend({

    template: JST["backbone/week_user_ticket/week_days_template"],

    events: {
      "click #user_week_next" : "nextWeek",
      "click #user_week_prev" : "prevWeek"
    },

  
    initialize: function() {    

      this.$el.append(this.template);  

      this.weekDays = new WeekDaysCollection();

      this.date = new DateEx();


      this.addWeekRows();
    },
 
    addWeekRows: function() {
      
      var week = this.date.getCurrentWeek({"transport":true}),
          parse_date,   
          model,
          view;
      
      _.each(week,function(date,day){

        parse_date = date.split("-");
        
        model = new WeekDayModel({
                                           date  :  parse_date[0],
                                           month : parse_date[1],
                                           year  :  parse_date[2],
                                           day   :   day,
                                           user_id: app.userEx.getId()
                                });
        
        this.weekDays.add(model); 
       
        view = new WeekDayView({model:model});

        this.$el.children("table").append(view.render().el);

        view.addTickets();
       

      },this);

    },
    
    refresh: function() {

      this.weekDays.reset();
      
      $('#week_user_tickets').html("");
      $('#week_user_tickets').append(this.template);
     
      this.addWeekRows();
    },

    nextWeek: function() {

      this.date.nextWeek();
      this.refresh();
    },

    prevWeek: function() {
      this.date.prevWeek();
      this.refresh();
    },

    render: function() {     
      this.$el.children("table").html(this.template());
      return this;
    }
    
  });
})(window);