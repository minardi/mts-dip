(function(app) {

	app.WeeklyCollectionView = Backbone.View.extend({
        
        template : JST["backbone/weekly_schedule/weekly_schedules_template"],
        
        collTemplate :  JST["backbone/weekly_schedule/weekly_schedule_collTemplate"],
        
        
        
        events: {
            "click thead .weekly-table-day" : "daysSelect",
        },
        
        days : {},
        
        initialize : function(){
            
            this.collection = new app.WeeklyCollection();
                        
            Backbone.Mediator.sub('doctor_selected', this.collection.addHandler, this.collection);
            Backbone.Mediator.sub('doctor_unselected', this.collection.removeSchedule, this.collection);
            
            this.collection.on('change:selected', this.renderSchedule, this);
            this.collection.on('select:schedule_day', this.isFullOfCell, this);
            this.collection.on('weekly_error', this.throwError, this);
            
            this.render();
        },
        
        isFullOfCell : function(day, selected) {
             //console.log(day, selected);
        },
        
        renderSchedule : function (model, selected){
            
            var view = {};
            
            if(selected === true) {
                view = new WeeklyView({model : model});
                this.$el.children('table').append(view.render().$el);
            }
            
            this.isShow ();
        },
        
        renderDate : function() {
            
            var date = new app.DateEx(),
                schedule = date.getCurrentWeek({transport : false});
            
            date = new app.DateEx();
            this.collection.days = date.getCurrentWeek({transport : true});

            return schedule;
            
        },
        
        render : function() {
            this.$el.append(this.template({schedule : this.renderDate()}));
            

            return this;
        },
        
        isShow: function() {
            
            var collection = this.collection.activeDoctors();

            if(collection.length > 0) {
                this.$el.removeClass('hidden');
            } else {
                this.$el.addClass('hidden');
            }
            
        },
        
        

        daysSelect: function(event) {
            
            var collection = this.collection.activeDoctors(),
                target = ($(event.target).children().length !== 0) ? $(event.target) : $(event.target).parent(),
                day = target.attr('id').split('-')[1],
                id = 0;

            for (id in collection){
                collection[id].selectDayByRule(day, false);
            }

        },
        
        throwError : function (data){
            data.type = data.type || 'error';
            
            Backbone.Mediator.pub(
                data.type,    
                {
                    el : this.$el, 
                    message : (data.text) ? data.text : 'internal error '
                }
            );
            
            console.warn(data.text, data.type);
            
        }
        
    });
    
    
    
}(window))