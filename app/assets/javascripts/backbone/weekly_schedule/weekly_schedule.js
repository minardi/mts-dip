(function(app) {

WeeklyModel = Backbone.Model.extend({
        
        defaults : {
            schedule : {},
            doctor_id : 0,
            doctor_name : '',
            doctor_duration : 0,
            selected : false
        },
        
        urlRoot : '/weekly_schedules',
        
        initialize : function (){
            
        }
        
        
      
 });
 
 }(window))