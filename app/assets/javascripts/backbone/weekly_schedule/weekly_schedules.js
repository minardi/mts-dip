(function(app) {

	app.WeeklyCollection = Backbone.Collection.extend({
        
        model : app.WeeklyModel,
        
        url : "/weekly_schedules.json",
        
        findByParam : function (parametrs, callback){

            var url = '/weekly_schedules/search.json?',
                params = [];
                 
            for (name in parametrs){
                params.push( name + "=" + encodeURIComponent( parametrs[name] ) )
            }
            
            url += params.join('&');
            
            $.get(url, callback);
            
        }
        
        
    });

})(window);
