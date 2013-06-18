(function(app) {

app.WeeklyModel = Backbone.Model.extend({
        
        defaults : {
            schedule : {
                'sun' : {
                    'start' : "8:00",
                    'end' : "17:00",
                    'date' : "01.01.2000"
                },

                'mon' : {
                    'start' : "8:00",
                    'end' : "17:00",
                    'date' : "02.01.2000"
                },

                'tue' : {
                    'start' : "8:00",
                    'end' : "17:00",
                    'date' : "03.01.2000"
                },

                'wed' : {
                    'start' : "8:00",
                    'end' : "17:00",
                    'date' : "04.01.2000"
                },

                'thu' : {
                    'start' : "8:00",
                    'end' : "17:00",
                    'date' : "05.01.2000"
                },

                'fri' : {
                    'start' : "8:00",
                    'end' : "17:00",
                    'date' : "06.01.2000"
                },
                
                'sat' : {
                    'start' : "8:00",
                    'end' : "17:00",
                    'date' : "07.01.2000"                   
                }
            },
            doctor_id : 1,
            doctor_name : '',
            selected : false,
            doctor_duration : 0,
            start : '2000.01.01',
            end : '2000.01.07'
        },
        
        url : '/weekly_schedules',
        
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
            var selected = (selected === true || selected === false) ? selected : ((this.isDay(day) === true) ? false : true);
            if(day){
                this.attributes.schedule[day]['selected'] = selected;
                            
                this.trigger('select:schedule_day', day, this.isDay(day));              
            } else {
                console.error('bad day value in weekly model');
            }
            
            
        },

        unselectDays : function () {
            
            for (day in this.attributes.schedule){
                
                if(this.isDay() === true){
                    this.dayTrigger(day);    
                }
                
            }
            
        },

        switchUrl : function(url, data) {

            switch(url){

                case 'getduration' :

                    this.url = "/weekly_schedules/" + data.doctor_id +"/getduration.json";

                    break;

                case 'getschedule' : 

                    this.url = 'weekly_schedules/get-schedule';

                    break;
                    
                case 'delete' : 

                    this.url = 'weekly_schedules/' + data;

                    break;

                default : 
                    
                    this.url = 'weekly_schedules';  
                    
                    break;
            }


        },

        dateValidate : function(date) {
            
        },
        
        scheduleStart : function(days){
            
            for(day in this.attributes.schedule){
                this.attributes.schedule[day]['data'] = days[day];
                this.dayTrigger(day, false);
            }
                
        },

        getCurrent : function(doctor_id) {

             this.switchUrl('getduration', {doctor_id: doctor_id});
        },

        validate: function(attrs) {

          //  if ((typeof attrs.doctor_id) === "number") return "Please set doctor id";
        }
        
 });
 
 }(window))