(function(app) {

	app.WeeklyCollectionView = Backbone.View.extend({
        
        template : JST["backbone/weekly_schedule/weekly_schedules_template"],
        
        collTemplate :  JST["backbone/weekly_schedule/weekly_schedule_collTemplate"],
        
        
        
        events: {
            "click thead .weekly-table-day" : "daysSelect",
            "click thead tr td:first-child" : "refresh"
        },
        
        initialize : function(){
            
            this.collection = new app.WeeklyCollection();
                        
            Backbone.Mediator.sub('doctor_selected', this.collection.addHandler, this.collection);
            Backbone.Mediator.sub('doctor_unselected', this.collection.removeSchedule, this.collection);
            
            this.collection.on('change:selected', this.handlerRenderSchedule, this);
            //this.collection.on('select:schedule_day', this.activeWatching, this);
            this.collection.on('weekly_error', this.throwError, this);

            this.navigate = new app.NavigateWeek(this.navigateHandler, this);
            
            this.collection.current_date = this.navigate.date;

            this.render();

            this.$el.append(this.navigate.el);
        },

        navigateHandler : function() {
            this.refresh();
        },

        refresh : function() {

            var active_doctors = this.collection.activeDoctors();

            for(model in active_doctors){
                active_doctors[model].setSelected(false);
            }

            this.render();
            this.delegateEvents(this.events);

            for(model in active_doctors){
                active_doctors[model].setSelected(true);
            }
        },

        handlerRenderSchedule : function(model, selected){
            if(selected === true) {
                this.renderSchedule(model);
            }
        },

        renderSchedule : function (model){
             
            var view = {};
        
            view = new WeeklyView({model : model});
            this.$el.children('table').append(view.render().$el);
            
            this.isShow ();
        },
        
        getDate : function() {
            
            var schedule = this.navigate.getWeekDotte();
            this.collection.days = this.navigate.getWeek();

            return schedule;
            
        },  

        daysSelect: function(event) {

            var collection = this.collection.activeDoctors(),
                target = ($(event.target).children().length !== 0) ? $(event.target) : $(event.target).parent(),
                day = target.attr('id').split('-')[1],
                id = 0;

            for (id in collection){
                collection[id].selectAll(day);
            }

        },
        
        render : function() {
            
            this.$el.children('table').remove();
            this.$el.prepend(this.template({schedule : this.getDate()}));

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