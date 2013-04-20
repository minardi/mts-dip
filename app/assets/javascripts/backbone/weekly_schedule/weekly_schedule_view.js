(function(app) {

	app.WeeklyView = Backbone.View.extend({
        
        tagName : 'tr',
        
        initialize : function(){

        },
        
        render : function(){
            
            var schedule =  this.model.get('schedule');
 
            this.$el.append($('<td />', { text : this.model.get('doctor_name')}));
            
            for(i in schedule){
                this.$el.append($('<td />', 
                    {
                       text : schedule[i].start + ' - ' + schedule[i].end,
                       id : this.model.get('doctor_id') + '-' + i
                    }
                
                ));            
           }
            
            return this;
        }
    });
    
    
    
}(window))