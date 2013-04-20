(function(app) {

	app.WeeklyCollection = Backbone.Collection.extend({
        
        model : app.WeeklyModel,
        
        url : "/weekly_schedules.json"
        
        
    });

})(window);
