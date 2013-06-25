(function(app) {

	app.WeeklyCollectionView = Backbone.View.extend({
        
        template : JST["backbone/weekly_schedule/weekly_schedules_template"],
        
        head_template :  JST["backbone/weekly_schedule/weekly_schedules_head-template"],
        
        position : 0,

        statement : {},
        
        events: {
            "click thead .weekly-table-day" : "daysSelect",
        },
        
        initialize : function(){
            
            this.collection = new app.WeeklyCollection();
                        
            Backbone.Mediator.sub('doctor_selected', this.addModelHandler, this);
            Backbone.Mediator.sub('doctor_unselected', this.removeSchedule, this);
            
            this.collection.on('change:selected', this.isShow, this);
            this.collection.on('weekly_error', this.throwError, this);

            this.navigate = new app.NavigateWeek(this.navigateHandler, this);

            this.navigate.date = new app.WeeklyDateEx();
            this.collection.current_date = this.navigate.date;
            this.collection.current_date.updateWeek();
            
            this.render();
            
        },

        navigateHandler : function(direct) {
            
            var active_doctors = this.collection.activeDoctors();

            this.statement[this.position] = this.collection.saveStatement();

            this.collection.rollUpStatement(this.statement[this.position]);

            this.position += (direct) ? 1 : (-1);
            
            this.renderHead();
            this.delegateEvents(this.events);

            this.navigate.date.updateWeek();
            this.collection.dateValidate();

            this.collection.turnUpStatement(this.statement[this.position], active_doctors);

        },

        removeSchedule : function(data) {
            var model = this.collection.haveModel(data.id),
                position = 0,
                doctor_statement = {},
                day = '';

            if (model) {
                model.setSelected(false); 
            } 

            for(position in this.statement){ 
                
                if(parseInt(position) === this.position) {
                    continue;
                }

                doctor_statement = this.statement[position][data.id];

                if(doctor_statement !== undefined) {
                    for(day in doctor_statement){

                        Backbone.Mediator.pub('weekly_unselectItem', 
                            {
                                id : data.id,
                                day : doctor_statement[day]                            
                            }
                        );
                    }

                    delete this.statement[position][data.id];
                }
            }

        },
        

        addModelHandler : function(data) {

            var model = this.collection.haveModel(data.id)
                view = {};

            if(model) {
                model.setSelected(true); 
            } else {
               view = new app.WeeklyView({model : this.collection.createModel(data)});
               this.$el.children('table').append(view.$el);
            }
           
        },
        
        getDate : function() {
            
            return this.navigate.date.getCurrentWeek({'transport' : false});
            
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

        renderHead : function() {
            this.$el.find('.weekly-table-head').remove();
            this.$el.children('table').prepend(this.head_template({schedule : this.getDate()}))
        },
        
        render : function() {
            
            this.$el.prepend(this.template());
            this.renderHead();
            this.$el.append(this.navigate.el);
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
            
        }
        
    });
    
    
    
}(window))