(function(app) {

app.WeeklyModel = Backbone.Model.extend({
        
        defaults : {
            schedule : {},
            doctor_id : 1,
            doctor_name : '',
            selected : false,
            doctor_duration : 0
        },
        
        urlRoot : '/weekly_schedules',
        

        
        selectDayByRule : function(day, selected) {
            
            if(this.isDay(day) === selected){
                
                this.dayTrigger(day);

            }
        },
        
        isDay : function(day){

            return (day) ? this.attributes.schedule[day]['selected'] : undefined; 
        },

        setSelected : function(trigger){

            if(trigger === true || trigger === false){
                this.set({selected : trigger});
            } else {
                this.set({selected : (this.attributes.selected) ? false : true});
            }
            
        },

        isSelected : function() {
            return this.attributes.selected;
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

        unselectedDays : function () {
            
            for (day in this.attributes.schedule){
                
                this.selectDayByRule(day, true);
                
            }
            
        },
        
        scheduleStart : function(days){
            
            for(day in this.attributes.schedule){
                this.attributes.schedule[day]['data'] = days[day];
                this.dayTrigger(day, false);
            }
                
        },

        getCurrent : function(doctor_id) {

            this.urlRoot = "/weekly_schedules/" + doctor_id +"/getduration.json";
        },

        validate: function(attrs) {

            if ((typeof attrs.doctor_id) === "number") return "Please set doctor id";
        }
        
 });
 
 }(window))