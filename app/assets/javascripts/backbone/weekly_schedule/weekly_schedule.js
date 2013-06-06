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
            
            var schedule = this.get('schedule');
            
            for (day in schedule){
                
                schedule[day]['selected'] = false;
                
            }
            
            this.set({schedule : schedule});
        },
        
        daySelect : function(day) {
            
            if(!this.attributes.schedule[day]['selected']){

                this.attributes.schedule[day]['selected'] = true;
                this.trigger('select:schedule_day', day, this.attributes.schedule[day]['selected']);

            }
        },
        
        scheduleTrigger : function(day) {
            
            this.attributes.schedule[day]['selected'] = (this.attributes.schedule[day]['selected'] === true)
                                                            ? 
                                                                false 
                                                            :  
                                                                true; 
            
            this.trigger('select:schedule_day', day, this.attributes.schedule[day]['selected']);

        },
        
        setDate : function(days){
            
            var schedule = this.get('schedule');
            
            for(day in schedule){
                schedule[day]['data'] = days[day];
            }
            
            this.set({schedule : schedule});
            
        },

        getCurrent : function(doctor_id) {

            this.urlRoot = "/weekly_schedules/" + doctor_id +"/getduration.json";
        }
        
 });
 
 }(window))