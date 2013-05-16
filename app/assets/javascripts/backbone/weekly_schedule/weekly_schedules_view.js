(function(app) {

	app.WeeklyCollectionView = Backbone.View.extend({
        
        template : JST["backbone/weekly_schedule/weekly_schedules_template"],
        
        collTemplate :  JST["backbone/weekly_schedule/weekly_schedule_collTemplate"],
        
        events: {
            "click thead td" : "daySelect",
        },
        
        days : {},
        
        initialize : function(){
 
            this.collection = new app.WeeklyCollection();
            
            this.collection.on('change:selected', this.renderSchedule, this);
            
            this.render();
        },
        
        renderSchedule : function (model, param){
            
            var view = {};
            
            if(param) {
                view = new WeeklyView({model : model});
                this.$el.children('table').append(view.render().$el);
            }
            
            this.isShow ();
        },
        
        renderDate : function() {
            
            var date = new Date(),
                day = date.getDay(),
                current_date = date.getDate(),
                i=0,
                days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
            
            for(i=0;i<7;i++) {
                date.setDate(current_date+(i-day));
                            
                this.collection.days[days[date.getDay(i)]] = this.dateWithZero(date.getDate()) + '-' + 
                this.dateWithZero((date.getMonth()+1)) + '-' + date.getFullYear();
                  
            }
            
            return this.collection.days;
            
        },
        
        dateWithZero : function (val) {
            return (val <= 9) ? '0' + val : val;
        },
        
        render : function() {
            this.$el.append(this.template({schedule : this.renderDate()}));
            

            return this;
        },
        
        isShow: function() {
            
            if(this.collection.where({selected : true}).length > 0) {
                this.$el.removeClass('hidden');
            } else {
                this.$el.addClass('hidden');
            }
            
        },

        daySelect: function(event) {
            
            var collection = this.collection.where({selected : true}),
                target = $(event.target),
                day = target.attr('id').split('-')[1],
                id = 0;
                
            for (id in collection){
                collection[id].daySelect(day);
            }

        }
        
    });
    
    
    
}(window))