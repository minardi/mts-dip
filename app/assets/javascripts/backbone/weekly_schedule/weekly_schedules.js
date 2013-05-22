(function(app) {
    
	app.WeeklyCollection = Backbone.Collection.extend({
        
        model : app.WeeklyModel,
        
        url : "/weekly_schedules",
        
        days : {},
        
        initialize : function () {
            
            this.on('add', this.updateModel, this);
            
            

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
            this.schedule_data = data;
            
            if(model) {
                model.set({selected : true}); 
            } else {
                this.getByDoctor(data.id);
            }
           
        },
        
        updateModel : function (model){
            model.set(
                        {
                            selected : true,
                            doctor_name : this.schedule_data.name,
                            doctor_duration : this.schedule_data.duration,
                        }
                    );
            model.setDate(this.days);
        },
        
        shiftUrl : function(url, data) {
            
            switch (url){
                case 'search' :
                    this.url = '/weekly_schedules/' + data['id'] + '/doctor.json';
                    break;
                
                default : 
                    this.url = '/weekly_schedules';  
            }
     
        },
        
        haveModel : function (id){

            if(id.constructor.name === 'Number'){ 
                return (this.where({doctor_id : id}).length === 0) ? false : this.where({doctor_id : id})[0];
            } else {
                console.warn('parametr id is not a Number');
            }
        },
        
        getByDoctor : function(id) {
            
            this.shiftUrl('search', {id : id});
            this.fetch({remove : false, update : true});
            this.shiftUrl();
            
        }
        
    });

})(window);
