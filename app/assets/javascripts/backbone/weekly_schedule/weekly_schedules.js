(function(app) {
    
	app.WeeklyCollection = Backbone.Collection.extend({
        
        model : app.WeeklyModel,
        
        url : "/weekly_schedules",

        dateValidate : function() {

            this.each(
                        function(model){
                            if(!model.dateValidate()){
                                model.updateByDoctorId(false);
                            }
                        },
                        
                        this
                )

        },

        createModel : function(data) {

            model = new this.model ({
                        doctor_id : data.id,
                        doctor_name : data.name,
                        doctor_duration : data.duration,
                    }
            );

            this.add(model);
            model.current_date = this.current_date;

            return model;
        },

        haveModel : function (id){

            if(id.constructor.name === 'Number'){ 
                return (this.where({doctor_id : id}).length === 0) ? false : this.where({doctor_id : id})[0];
            }
        },

        activeDoctors : function() {
            
            var collection = this.where({selected : true});
             
            return collection;
            
        },

        saveStatement : function (){
            var statement = {},
                doctors = this.activeDoctors(),
                doc_id = 0,
                model = '',
                day = ''; 

            for(model in doctors) {

                doc_id = doctors[model].get('doctor_id');
                statement[doc_id] = {};

                for(day in doctors[model].get('schedule')){
                    if(doctors[model].isDay(day)){
                        statement[doc_id][day] = this.current_date.week_days[day];    
                    }
                    
                }

            }

            return statement;
        },

        rollUpStatement : function (statement) {

            var doctors = this.activeDoctors(),
                doc_id = 0,
                model = 0,
                day = '';

            for(model in doctors){
                doc_id = doctors[model].get('doctor_id');

                for (day in statement[doc_id]){
                    doctors[model].dayTrigger(day, false, true);                    
                }

                doctors[model].setSelected(false);

            }


        },

        turnUpStatement : function (statement, active_doctors){

            var model = {},
                doc_id = 0,
                day = '';

            for(doc_id in statement){

                model = _.find(active_doctors, function(model){ 
                                                                return model.isTheDoctor(parseInt(doc_id))
                                                            }
                );
                
                if(model){
                   
                    model.setSelected(true);

                    for(day in statement[doc_id]){
                        model.dayTrigger(day, true, true); 
                    }


                } else {
                    model = this.where({'doctor_id' : parseInt(doc_id)})[0];
                    model.unselectDays();
                    model.setSelected(false);
                }

            }

            for(model in active_doctors){
                if(!active_doctors[model].isSelected()){
                    active_doctors[model].setSelected(true);    
                }
                
            }
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
