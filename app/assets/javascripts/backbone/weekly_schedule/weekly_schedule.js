(function(app) {

app.WeeklyModel = Backbone.Model.extend({
        
        defaults : {
            schedule : {
                'sun' : {
                    'start' : "8:00",
                    'end' : "17:00",
                },

                'mon' : {
                    'start' : "8:00",
                    'end' : "17:00",
                },

                'tue' : {
                    'start' : "8:00",
                    'end' : "17:00",
                },

                'wed' : {
                    'start' : "8:00",
                    'end' : "17:00",
                },

                'thu' : {
                    'start' : "8:00",
                    'end' : "17:00",
                },

                'fri' : {
                    'start' : "8:00",
                    'end' : "17:00",
                },
                
                'sat' : {
                    'start' : "8:00",
                    'end' : "17:00",               
                }
            },
            doctor_id : 1,
            doctor_name : '',
            selected : false,
            doctor_duration : 0,
            start : '2000.01.01',
            end : '2000.01.07',
        },
        
        urlRoot : '/weekly_schedules',

        isDay : function(day){
            
            var select_value = {};

            if(day){

                select_value = this.attributes.schedule[day]['selected'];
                select_value = (select_value !== undefined) ? select_value : false;
                       
            } else {
                console('param day is not defined');
            }

            return (day) ? select_value : undefined;
        },

        dayTrigger : function(day, selected, silence){
            
            selected = (selected === true || selected === false) ? selected : ((this.isDay(day) === true) ? false : true);
            
            if(day){
                
                this.attributes.schedule[day]['selected'] = selected;

                this.trigger('select:schedule_day', day, this.isDay(day), silence);    
                
                              
            } else {
                console.error('bad day value in weekly model');
            }
         
        },

        setSelected : function(trigger){

            trigger = (trigger === true || trigger === false) ? trigger : ( (this.isSelected ()) ? false : true); 
            
            console.log(trigger, this.attributes.doctor_name);  
            this.set({selected : trigger});
            
        },

        isSelected : function() {
            return this.attributes.selected;
        },

        unselectDays : function () {
            
            for (day in this.attributes.schedule){
               
                if(this.isDay(day) === true){

                    this.dayTrigger(day, false);    
                }
                
            }
            
        },

        selectAll : function(day) {

            if(this.isDay(day) === false){
                this.dayTrigger(day, true);

            }
        },

        updateHandler : function(){

            this.off('sync');
            this.trigger('schedule:update');    
        },

        updateByDoctorId : function(is_show) {

            this.on('sync', this.updateHandler, this);

            if(is_show){
                this.on('sync', this.setSelected, this);    
            }

            this.switchUrl('getschedule');
            this.fetch({
                            data : {
                                        id: this.attributes.doctor_id, 
                                        date: this.current_date.dateTransFormat(true)
                                    }
                        }
            );
            this.switchUrl();

        },

        switchUrl : function(url, data) {

            switch(url){

                case 'getduration' :

                    this.urlRoot = "/weekly_schedules/" + data.doctor_id +"/getduration.json";

                    break;

                case 'getschedule' : 

                    this.url = 'weekly_schedules/get-schedule';

                    break;

                default : 
                    
                    this.urlRoot = 'weekly_schedules';  
                    
                    break;
            }


        },

        isTheDoctor : function (doc_id) {
            return this.attributes.doctor_id === doc_id;
        },

        getCurrent : function(doctor_id) {

             this.switchUrl('getduration', {doctor_id: doctor_id});
        },

        dateValidate : function () {
            
            var result = true;
                current_date = this.current_date.dateTransFormat(true);
            if(this.attributes.start > current_date || current_date > this.attributes.end){
                result = false;
            }

            return result;
        },

        validate: function(attrs) {
            //return (attrs.doctor_id.constructor.name === 'Number') ? true : "Please set doctor id";
        }
        
 });
 
 }(window))