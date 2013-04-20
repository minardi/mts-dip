(function(app) {

WeeklyModel = Backbone.Model.extend({
        
        defaults : {
            schedule : {},
            doctor_id : 0,
            doctor_name : ''
        },
        
        urlRoot : '/weekly_schedules',
        
        initialize : function (){
            
        }
 });
 
 }(window))