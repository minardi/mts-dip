(function(app) {

	app.WeeklyCollectionView = Backbone.View.extend({
        
        template : JST["backbone/weekly_schedule/weekly_schedules_template"],
        
        collTemplate :  JST["backbone/weekly_schedule/weekly_schedule_collTemplate"],
        
        
        
        events: {
            "click thead .weekly-table-day" : "daysSelect",
            "click thead tr td:first-child" : "refresh"
        },
        
        fullOfCell : {},

        days : {},
        
        initialize : function(){
            
            this.collection = new app.WeeklyCollection();
                        
            Backbone.Mediator.sub('doctor_selected', this.collection.addHandler, this.collection);
            Backbone.Mediator.sub('doctor_unselected', this.collection.removeSchedule, this.collection);
            
            this.collection.on('change:selected', this.handlerRenderSchedule, this);
            this.collection.on('select:schedule_day', this.isFullOfCell, this);
            this.collection.on('weekly_error', this.throwError, this);

             this.navigate = new app.NavigateWeek(this.refresh,this);

             this.$el.parent().append(this.navigate.el);
            
            this.render();
        },
        
        isFullOfCell : function(day, selected) {
            //console.log(day, selected);
            // if(fullOfCell['day'] === undefined){
            //     fullOfCell.day = selected;
            // }else{
                
            // }


        },

        refresh : function() {

            var active_doctors = this.collection.activeDoctors();

            for(model in active_doctors){
                active_doctors[model].setSelected(false);
            }

            this.undelegateEvents();

            this.render();
            this.delegateEvents(this.events);

            for(model in active_doctors){
                //this.collection.addHandler({id : active_doctors[model].get('id')});
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
        
        renderDate : function() {
            
            var schedule = this.navigate.getWeekDotte();


            this.collection.days = this.navigate.getWeek();

            return schedule;
            
        },
        
        render : function() {
            
            this.$el.empty().append(this.template({schedule : this.renderDate()}));
            
            return this;
        },
        
        isShow: function() {
            console.log("hi"); 
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