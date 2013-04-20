(function(app) {

	app.WeeklyCollectionView = Backbone.View.extend({
        
        //el : $('#weekly-table'),
        
        collect: new WeeklyCollection(),
        
        initialize : function(){

            this.collect.fetch();
            
            Backbone.Mediator.sub('doctor_selected', this.addSchedule, this);
        },

        
        addSchedule : function(data){
            
            var model = this.collect.where({doctor_id : data.id})[0],
            view = {};
            if(model){
            
                model.set({'doctor_name' : data.name})
            
                view = new WeeklyView({model : model});
                this.render(view)
                
            }else{
                console.warn("this doctor don't have schedule list ");
            }
          
            
        },
        
        render : function(view){
            
            this.$el.show()
            this.$el.append(view.render().el)
            
            return this;
        }
        
        //removeSchedule
        
    });
    
    
    
}(window))