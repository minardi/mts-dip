(function(app) {

	app.WeeklyCollectionView = Backbone.View.extend({
        
        template : JST["backbone/weekly_schedule/weekly_schedules_template"],
        
        collect: new WeeklyCollection(),
        
        initialize : function(){
            
            this.collect.on("add", this.addSchedule, this)
            
            Backbone.Mediator.sub('doctor_selected', this.addHandler, this);
            Backbone.Mediator.sub('doctor_unselected', this.removeSchedule, this)
            
            this.render();
        },
        
        getSchedule : function(id){
            var self = this;
            
            this.collect.findByParam({doctor_id: id}, 
                function (model){
                    self.collect.add(model)
                    }
            );
        },
        
        addHandler : function(data){
            var model = [];
            this.schedule_data = data;
            
            if(this.collect.length > 0){
                model = this.collect.where({doctor_id : data.id});
            }else{
                this.$el.removeClass('hidden') 
            }
           
            if(model.length === 0){
                this.getSchedule(data.id);   
            }else{
                this.addSchedule(model[0])
            }
           
        },
        
        addSchedule : function (model) {
            
            var view = {};
            
            if(model){
                
                model.set({
                    'doctor_name' : this.schedule_data.name,
                    'doctor_duration' : this.schedule_data.duration,
                    'selected' : true
                    }
                );
                
                view = new WeeklyView({model : model});
                this.$el.find('table').append(view.render().$el);
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
                text :  ' ' + date.getDate() + ' ' + (date.getMonth()+1) + ' ' + date.getFullYear()
                 
            }).prepend($('<p />', {text : days[date.getDay()]})));

        },
        
        render : function(){
            this.$el.append(this.template());
            //this.$el.show();
            this.renderDate();

            return this;
        },
        
        removeSchedule : function(data) {
            var model = this.collect.where({doctor_id : data.id});
            model = model[0];
            model.set({selected : false})
        },
             events: {
            "click thead td":"dayPick",
        },

        dayPick: function(e) {
            e = event || window.event;

            var work_day = $(e.target).index(),
                tr = this.$el.find("tr");
            
            if($(e.target).hasClass('active')){
                $(e.target).removeClass('active');
            }else{
                $(e.target).addClass('active');
            };

            $(tr).each(function(index) {
                if(index !== 0){

                var n = $(this).find("td").get(work_day);
                
                $(n).trigger("click");}
            });
        },
        
    });
    
    
    
}(window))