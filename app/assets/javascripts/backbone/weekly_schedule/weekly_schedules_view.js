(function(app) {

	app.WeeklyCollectionView = Backbone.View.extend({
        
        template : JST["backbone/weekly_schedule/weekly_schedules_template"],
        
        collTemplate :  JST["backbone/weekly_schedule/weekly_schedule_collTemplate"],
        
        collect: new WeeklyCollection(),
        
        events: {
            "click thead td" : "dayPick",
        },
        
        days : {},
        
        initialize : function(){
            
            this.collect.on("add", this.addSchedule, this);
            
            Backbone.Mediator.sub('doctor_selected', this.addHandler, this);
            Backbone.Mediator.sub('doctor_unselected', this.removeSchedule, this)
            
            this.render();
        },
        
        addHandler : function(data){
            var model = [],
                self = this;
            
            this.schedule_data = data;
            
            if(this.collect.length > 0){
                model = this.collect.where({doctor_id : data.id});
            }else{
                this.$el.removeClass('hidden') 
            }
           
            if(model.length === 0){
                this.collect.shiftUrl('search')
                this.collect.fetch({remove : false, update : true, data : {doctor_id: data.id}});  
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
                
                model.setDate(this.days);
                
                
                view = new WeeklyView({model : model});
                this.$el.children('table').append(view.render().$el);

                
            }else{
                console.warn("this doctor don't have schedule list ");
            }
        },
        
        renderDate : function(){
            
            var date = new Date(),
                day = date.getDay(),
                current_date = date.getDate(),
                i=0,
                days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
            
            for(i=0;i<7;i++){
                date.setDate(current_date+(i-day));
                this.renderDay(date, days[i])
            }
            
        },
        
        renderDay : function(date, day) {
            var elem = this.$el.find('thead tr');
            
            this.days[day] = this.dateWithZero(date.getDate()) + '-' + 
                this.dateWithZero((date.getMonth()+1)) + '-' + date.getFullYear();
           
            elem.append(
            
                this.collTemplate(
                    {
                        text : '<p>'+day+'</p> ' + this.days[day],
                        id : day ,
                        class_name : 'table-day'
                    }
                )
            );

        },
        
        dateWithZero : function (val) {
            return (val <= 9) ? '0' + val : val;
        },
        
        render : function() {
            this.$el.append(this.template());
            this.renderDate();

            return this;
        },
        
        hideElem: function() {
            
            if(this.collect.where({selected : true}).length === 0) {
                this.$el.addClass('hidden')
            }
            
        },
        
        removeSchedule : function(data) {
            var model = this.collect.where({doctor_id : data.id})[0];
                if (model != null) { model.set({selected : false}); }
                         
                // if (model) {
                //     model.set({selected : false}) 
                else {
                    console.warn('something wrong with schedule remove function')
                }
            this.hideElem();
        },

        dayPick: function(e) {

            // var massiv = this.collect.where({selected : true});

            //  var schedule = this.model.get('schedule');
            
            // for (day in schedule){
                
            //     if(schedule[day]['selected'] === true){
                    
            //         this.selectItem(day);
            //     }
            // }

            // for (obj in massiv){
                
            // };
                
            // };

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