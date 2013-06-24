(function(app) {

	app.WeeklyCollectionView = Backbone.View.extend({
        
        template : JST["backbone/weekly_schedule/weekly_schedules_template"],
        
        coll_template :  JST["backbone/weekly_schedule/weekly_schedule_collTemplate"],
        
        position : 0,

        statement : {},
        
        events: {
            "click thead .weekly-table-day" : "daysSelect",
            "click thead tr td:first-child" : "aaa"
        },
        
        initialize : function(){
            
            this.collection = new app.WeeklyCollection();
                        
            Backbone.Mediator.sub('doctor_selected', this.collection.addModelHandler, this.collection);
            Backbone.Mediator.sub('doctor_unselected', this.collection.removeSchedule, this.collection);
            
            this.collection.on('change:selected', this.selectTrigger, this);
            this.collection.on('weekly_error', this.throwError, this);

            this.navigate = new app.NavigateWeek(this.navigateHandler, this);

            this.navigate.date = new app.WeeklyDateEx();
            this.collection.current_date = this.navigate.date;
            this.collection.current_date.updateWeek();
            
            this.render();
            this.$el.append(this.navigate.el);
        },

        navigateHandler : function(is_next) {
            
            var active_doctors = this.collection.activeDoctors();

            this.statement[this.position] = this.collection.saveStatement();
            
            this.collection.rollUpStatement(this.statement[this.position]);

            this.position += (is_next) ? 1 : (-1);
            
            this.render();
            this.delegateEvents(this.events);

            this.navigate.date.updateWeek();
            this.collection.dateValidate(is_next);

            this.collection.turnUpStatement(this.statement[this.position], active_doctors);

        },

        aaa : function () {
            console.log(this.statement, this.position);
        },

        selectTrigger : function(model, selected){
            if(selected === true) {
                this.renderSchedule(model);
            } 
            
            this.isShow();
        },

        renderSchedule : function (model){
             
            var view = {};
        
            view = new WeeklyView({model : model});
            this.$el.children('table').append(view.render().$el);

        },
        
        getDate : function() {
            
            return this.navigate.date.getCurrentWeek({"transport":false});
            
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