(function(app) {
    
	app.WeeklyCollection = Backbone.Collection.extend({
        
        model : app.WeeklyModel,
        
        url : "/weekly_schedules",
        
        days : {},
        
        initialize : function () {            

        },
        
        removeSchedule : function(data) {
            var model = this.haveModel(data.id);
                if (model) {
                    model.set({selected : false}); 
                } else {
                    console.warn('something wrong with schedule remove function');
                }
        },
        
        addHandler : function(data) {
            
            var model = this.haveModel(data.id);
            
            if(model) {
                model.set({selected : true}); 
            } else {
                this.getModel(data);
            }
           
        },
        
        haveModel : function (id){

            if(id.constructor.name === 'Number'){ 
                return (this.where({doctor_id : id}).length === 0) ? false : this.where({doctor_id : id})[0];
            } else {
                console.warn('parametr id is not a Number');
            }
        },
        
        getModel : function(data) {
            
            var model =  new this.model({
                                            id : data.id,
                                            doctor_name : data.name,
                                            doctor_duration : data.duration,
                                            selected : false 
                                        }
            );
            
            this.add(model);
            
            model.on('sync', this.addModel, this);
            model.on('error', function(model, request){
                                        this.throwError('server is unavailable please try again later', 'fatal_error');
                                    }, this
            );
                                
            model.fetch();

        },
        
        activeDoctors : function() {
            
             var collection = this.where({selected : true});
             
             return collection;
            
        },
        
        addModel : function(model) {
            model.off('sync');
            model.off('error');
            
            model.scheduleStart(this.days);
            
            model.set({
                selected : true
            })
        },
        
        throwError : function (text, type){
            type = type || 'error';
            
            Backbone.Mediator.pub(
                type,    
                {
                    el : this.$el, 
                    message : (text) ? text : 'internal error '
                }
            );
            
            console.warn(text, type);
            
        }
        
    });

})(window);
