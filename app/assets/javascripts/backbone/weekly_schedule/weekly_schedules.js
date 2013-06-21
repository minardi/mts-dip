(function(app) {
    
	app.WeeklyCollection = Backbone.Collection.extend({
        
        model : app.WeeklyModel,
        
        url : "/weekly_schedules",
        
        days : {},

        active_doctors : [],

        removeSchedule : function(data) {
            var model = this.haveModel(data.id);
            console.log(model, data.id)
                if (model) {
                    model.setSelected(false); 
                } else {
                    console.warn('something wrong with schedule remove function');
                }
        },
        
        addModelHandler : function(data) {

            var model = this.getCurrentModel(data.id);
            if(model) {

                model.setSelected(true); 
            } else {
                this.getModel(data);
            }
           
        },
        
        getCurrentModel : function () {

        },

        dateValidate : function(model) {
            //if()
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
                                
            model.fetch({data : {id: data.id, date: this.dateConvert(this.days.wed)}});

            model.switchUrl();
        },


        
        activeDoctors : function() {
            
            var collection = this.where({selected : true});
             
            return collection;
            
        },
        
        addModel : function(model) {
            console.log(model)
            model.off('sync');
            model.off('error');
            
            model.scheduleStart(this.days);
            
            model.setSelected(true);
        },
        
        switchUrl: function(id) {
            this.url = "/weekly_schedules/getbydoc/" + id;
        },

        dateCompare : function(str, compare_str) {
            compare_str = (compare_str) ? compare_str : this.current_date.dateTransFormat(true);
            return (compare_str === str) ? true : false; 
        },

        dateConvert : function(str, format) {

            format = (format) ? format : '-'; 
            str = str.split(format);
            return str[2] + format + str[1] + format + str[0];

        }
        
    });

})(window);
