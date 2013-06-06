(function(app) {

app.WeeklyModel = Backbone.Model.extend({
        
        defaults : {
            schedule : {} ,
            doctor_id : 0 ,
            doctor_name : '' ,
            doctor_duration : 0 ,
        },
        
        urlRoot : '/weekly_schedules',
        
        selected : false,
        
        initialize : function() {
            

        },
        
        isDaySelect : function(day) {
            
            if(this.isDay(day) === false){
                
                this.dayTrigger(day);

            }
        },
        
        isDay : function(day){
            console.log((day)  ? false : true, this.attributes.schedule[day]['selected'] )
            return (day) ? this.attributes.schedule[day]['selected'] : undefined; 
        },
        
        dayTrigger : function(day, selected){
            
            if(day){
                this.attributes.schedule[day]['selected'] = (selected === true || selected === false) 
                        ? 
                            selected 
                        : 
                            ((this.isDay(day) === true) ? false : true);
                            
                this.trigger('select:schedule_day', day, this.isDay(day));              
            } else {
                console.error('bad day value in weekly model');
            }
            
            
        },
        
        scheduleTrigger : function(day) {
            
            this.dayTrigger(day); 
            
            this.trigger('select:schedule_day', day, this.attributes.schedule[day]['selected']);

        },
        
        scheduleStart : function(days){
            
            for(day in this.attributes.schedule){
                this.attributes.schedule[day]['data'] = days[day];
                this.dayTrigger(day, false);
            }
            
            console.log(this.attributes.schedule);
            
        },

        getCurrent : function(doctor_id) {

            this.urlRoot = "/weekly_schedules/" + doctor_id +"/getduration.json";
        }
        
 });
 
 }(window))