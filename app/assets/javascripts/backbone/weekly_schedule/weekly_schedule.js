(function(app) {

WeeklyModel = Backbone.Model.extend({
        
        defaults : {
            //schedule : {},
            doctor_id : 0,
            doctor_name : '',
            doctor_duration : 0,
            selected : false
        },
        
        urlRoot : '/weekly_schedules',
        
        initialize : function() {
            
            var schedule = this.get('schedule');
            
            for (day in schedule){
                
                schedule[day]['selected'] = false;
                
            }
            
            this.set({schedule : schedule});
        },
        
        scheduleTrigger :function(day) {
            
            var result = false,
                schedule = this.get('schedule');
            
            if(schedule[day]['selected'] === true){
                schedule[day]['selected'] = false;
                result = false;
            }else{
                schedule[day]['selected'] = true;
                result = true;
            }
            
            this.set({'schedule' : schedule});
            return result;
        },
        
        setDate : function(days){
            
            var schedule = this.get('schedule');
            
            for(day in schedule){
                schedule[day]['data'] = days[day];
            }
            
            this.set({schedule : schedule});
            return false;
        }
        
        
        
        
      
 });
 
 }(window))