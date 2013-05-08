(function(app) {

	app.WeeklyView = Backbone.View.extend({
        
        tagName : 'tr',
        
        initialize : function(){
            this.model.on('change:selected', this.selfRemove, this)
        },
        
        events : {
            'click .schedule-item' : 'selectHandler'
        },
        
        render : function(){
            
            var schedule =  this.model.get('schedule');
 
            this.$el.append(
                $('<td />', 
                    {
                        text : this.model.get('doctor_name')
                    }
                )
            );
            
            for(i in schedule){
                
                this.$el.append(
                    $('<td />', 
                        {
                           text : schedule[i].start + ' - ' + schedule[i].end,
                           id : 'doc'+ this.model.get('doctor_id') + '-' + i,
                           "class" : 'schedule-item'
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
            
            console.log(this);
            
        },
        
        selfRemove : function (obj, value) {
            
            if(value === false){
                
                this.unselectedItem();
                this.remove();
                
            }
            
        }
        
    });
    
    
    
}(window))