(function(app) {

app.WeeklyModel = Backbone.Model.extend({
        
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
        
        daySelect : function(day) {
            
            console.log(day)
        },
        
        scheduleTrigger : function(day) {
            
            var schedule = this.get('schedule');
            
            schedule[day]['selected'] = (schedule[day]['selected'] === true) ? false :  true; 
            this.set({'schedule' : schedule});
            
            this.trigger('select:schedule_day', day, schedule[day]['selected']);
            
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