(function(app) {
    
	app.WeeklyCollection = Backbone.Collection.extend({
        
        model : app.WeeklyModel,
        
        url : "/weekly_schedules",
        
        days : {},

        active_doctors : [],

        removeSchedule : function(data) {
            var model = this.haveModel(data.id);
                if (model) {
                    model.setSelected(false); 
                } else {
                    console.warn('something wrong with schedule remove function');
                }
        },
        
        addHandler : function(data) {

            var model = this.haveModel(data.id);
            
            if(model) {
                model.setSelected(true); 
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
                                        }
            );

            this.add(model);
            
            model.on('sync', this.addModel, this);
            model.on('error', this.errorHandler , this);

            model.switchUrl('getschedule');
                                
            model.fetch({data : {id: data.id, date: '2013-06-17'}});
        },
        
        activeDoctors : function() {
            
            var collection = this.where({selected : true});
             
            return collection;
            
        },
        
        addModel : function(model) {
            model.off('sync');
            model.off('error');
            
            model.scheduleStart(this.days);
            
            model.setSelected(true);
        },

        errorHandler : function(model, request){

            this.trigger('weekly_error', {text : 'server is unavailable please try again later', type : 'error'});
            
            this.remove(model);
        },

        switchUrl: function(type, id) {

            switch (type) {

                case "getbydoc":
                    this.url = "/weekly_schedules/getbydoc/" + id;
                    break;
            }
            
        }
        
    });

})(window);
