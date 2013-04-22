(function(app) {

	app.WeeklyCollectionView = Backbone.View.extend({
        
        //el : $('#weekly-table'),
        
        views : {},
        
        collect: new WeeklyCollection(),
        
        initialize : function(){
            
            this.renderDate ();
            
            this.collect.fetch();
            
            Backbone.Mediator.sub('doctor_selected', this.addSchedule, this);
            Backbone.Mediator.sub('doctor_unselected', this.removeSchedule, this)

        },

        
        addSchedule : function(data){

            
            var model = this.collect.where({doctor_id : data.id})[0],
            view = {};
            
            if(model){
            
                model.set({'doctor_name' : data.name});
                model.set({'doctor_duration' : data.duration});
                
                view = new WeeklyView({model : model});
                this.render(view);
                this.views[model.get('doctor_id')] = view;
                
            }else{
                console.warn("this doctor don't have schedule list ");
            }
          
            
        },
        
        renderDate : function(){
            
            var date = new Date(),
            day = date.getDay(),
            current_date = date.getDate(),
            i=0
            ;
            
            for(i;i<7;i++){
                date.setDate(current_date+(i-day));
                this.renderDay(date)
            }
            
        },
        
        renderDay : function(date) {
           var elem = this.$el.find('thead tr'),
           days = ['Sunday', 'Monday','Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday']
           ;
           
           elem.append($('<td>', 
            
            {
                id : days[date.getDay()],
                text : days[date.getDay()] + ' ' + date.getDate() + ' ' + (date.getMonth()+1) + ' ' + date.getFullYear()
                 
            }));

        },
        
        render : function(view){
            
            this.$el.show()
            this.$el.append(view.render().el)
            
            return this;
        },
        
        removeSchedule : function(data) {
            
            var view = this.views[data.id];
            
            if(view){
                
                view.remove();
                delete this.views[data.id];
                
            }else{
                console.warn('schedule list for this doctor is not exist')
            }
        }
        
    });
    
    
    
}(window))