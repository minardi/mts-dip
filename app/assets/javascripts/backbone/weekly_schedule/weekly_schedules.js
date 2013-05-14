(function(app) {
    
	app.WeeklyCollection = Backbone.Collection.extend({
        
        model : app.WeeklyModel,
        
        url : "/weekly_schedules",
        
        initialize : function () {
            
        },
        
        shiftUrl : function(url) {
            
            var default_url = "/weekly_schedules";
            
            switch (url){
                case 'search' :
                    this.url = default_url + '/search.json';
                break;
                
                default : 
                    this.url = default_url;
                break;    
            }
            
            
        },
        
        removeSchedule : function(data) {
            var model = this.where({doctor_id : data.id})[0];
                if (model) {
                    model.set({selected : false}) 
                }
                
        },
        
        
    });

})(window);
