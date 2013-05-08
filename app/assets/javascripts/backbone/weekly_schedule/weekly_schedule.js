(function(app) {

WeeklyModel = Backbone.Model.extend({
        
        defaults : {
            schedule : {} ,
            doctor_id : 0 ,
            doctor_name : '' ,
            doctor_duration : 0 ,
        },
        
        selected : false,
        
        initialize : function() {
            
            var schedule = this.get('schedule');
            
            for (day in schedule){
                
                schedule[day]['selected'] = false;
                
            }
            
            this.set({schedule : schedule});
        },
        
        scheduleTrigger :function(day) {
            
            var schedule = this.get('schedule');
            
            schedule[day]['selected'] = (schedule[day]['selected'] === true) ? false :  true; 
            this.set({'schedule' : schedule});
            
            return schedule[day]['selected'];
        },
        
        setDate : function(days){
            
            var schedule = this.get('schedule');
            
            for(day in schedule){
                schedule[day]['data'] = days[day];
            }
            
            this.set({schedule : schedule});
            
        }
        
 });
 
 }(window))