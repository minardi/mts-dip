(function(app) {

	app.WeeklyView = Backbone.View.extend({
        
        tagName : 'tr',

        className : 'hidden',
        
        template :  JST["backbone/weekly_schedule/weekly_schedule_template"],
        
        initialize : function(){
            this.model.on('schedule:update', this.render, this);
            this.model.on('select:schedule_day', this.activeTrigger, this);
            this.model.on('select:schedule_day', this.publishTrigger, this);
            this.model.on('change:selected', this.showTrigger, this);   

            this.model.updateByDoctorId();
            this.model.setSelected(true);
        },
        
        events : {
            'click .schedule-item' : 'selectDay'
        },
        
        render : function(){

            this.$el.empty().append(this.template(this.model.toJSON()));

            this.renderActive();

            return this;
        },
        
        activeTrigger : function(day, trigger, silence){

            elem = this.$el.find('#doc'+ this.model.get('doctor_id') + '-' + day);

            (!trigger) ? $(elem).removeClass('active') : $(elem).addClass('active');
                   
        },
        
        selectDay : function(e){
            
            target = $(e.target);
            
            this.model.dayTrigger(target.attr('id').split('-')[1]);
        },

        renderActive : function(){
            var day = '';
            
            for(day in this.model.get('schedule')){
                
                if(this.model.isDay(day)){

                    this.$el.find('#doc'+ this.model.get('doctor_id') + '-' + day).addClass('active');
                }

            }
        },
        
        publishTrigger : function(day, trigger, silence) {

            if(!silence){
                if(trigger) {
                    
                    Backbone.Mediator.pub('weekly_selectItem', 
                        {
                            name : this.model.get('doctor_name'),
                            id : this.model.get('doctor_id'),
                            duration : this.model.get('doctor_duration'),
                            schedule : this.model.get('schedule')[day]['start'] + '-' + this.model.get('schedule')[day]['end'],
                            day : this.model.current_date.week_days[day]
                        }
                    );
                
                     
                }else{

                    Backbone.Mediator.pub('weekly_unselectItem', 
                        {
                            id : this.model.get('doctor_id'),
                            day : this.model.current_date.week_days[day]                            
                        }

                        );

                    
                }
            }
        
        },
        

        
        showTrigger : function (obj, selected) {


            if(selected === false){
                
                this.model.unselectDays();

                this.$el.addClass('hidden');
                
            } else {
                
                this.$el.removeClass('hidden');

            }
            
        }
        
    });
    
    
    
}(window))