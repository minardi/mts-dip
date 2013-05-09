(function(app) {

	app.WeeklyView = Backbone.View.extend({
        
        tagName : 'tr',
        
        collTemplate :  JST["backbone/weekly_schedule/weekly_schedule_collTemplate"],
        
        initialize : function(){
            this.model.on('change:selected', this.selfRemove, this)
        },
        
        events : {
            'click .schedule-item' : 'selectHandler'
        },
        
        render : function(){
            
            var schedule =  this.model.get('schedule');
 
            this.$el.append(
            
                this.collTemplate(
                        {
                            text : this.model.get('doctor_name'),
                            id : 'doc'+ this.model.get('doctor_id') + '-name',
                            class_name : "schedule-name"
                        }
                    )
            );
            
            for(i in schedule){
                
                this.$el.append(
                
                    this.collTemplate(
                        {
                            text : schedule[i].start + ' - ' + schedule[i].end,
                            id : 'doc'+ this.model.get('doctor_id') + '-' + i,
                            class_name : "schedule-item"
                        }
                    )
                );
                            
           }
            
            return this;
        },
        
        activeTrigger : function(elem){
            
            (elem.hasClass('active')) ? elem.removeClass('active') : elem.addClass('active');
                   
        },
        
        selectHandler : function(e){
            
            target = $(e.target);
            
            this.selectItem(target.attr('id').split('-')[1]);
            this.activeTrigger(target) 
        },
        
        selectItem : function(day) {
            
            if(day) {
                
                if(this.model.scheduleTrigger(day)) {
                    
                    Backbone.Mediator.pub('weekly_selectItem', 
                        {
                            name : this.model.get('doctor_name'),
                            id : this.model.get('doctor_id'),
                            duration : this.model.get('doctor_duration'),
                            schedule : $(target).text(),
                            day : this.model.get('schedule')[day]['data']
                        }
                    );
                
                     
                }else{
        
                    Backbone.Mediator.pub('weekly_unselectItem', 
                        {
                            id : this.model.get('id'),
                            day : this.model.get('schedule')[day]['data']                            
                        }
                    );
                    
                }
                
            }else{
                console.warn('wrong parametr day in function selectItem');
            }

        },
        
        unselectedItem : function () {
            
            var schedule = this.model.get('schedule');
            
            for (day in schedule){
                
                if(schedule[day]['selected'] === true){
                    
                    this.selectItem(day);
                    this.activeTrigger(this.$el.find('#doc'+ this.model.get('doctor_id') + '-' + day));
                }
                
            }
            
        },
        
        selfRemove : function (obj, value) {
            
            if(value === false){
                
                this.unselectedItem();
                this.remove();
                
            }
            
        }
        
    });
    
    
    
}(window))