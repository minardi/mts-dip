(function(app) {

	app.AdminSchedulesItemView = Backbone.View.extend({

    	className: "accordion-group",

        template: JST["backbone/admin/templates/admin_schedules_item_template_new"],

        events: {
            "click .admin_item_new" : "createItem"
        },

		initialize: function() {
			this.collection = new app.WeeklyCollection();

	    	this.collection.switchUrl(this.model.get("id"));
	    	this.collection.fetch();
	    	this.collection.on("reset", this.render, this);
	    	this.collection.on("add", this.render, this);

	    	Backbone.Mediator.sub("schedule_saved", function(model) {
	    		if ( this.model.get("id") === model.get("doctor_id") )
	    			this.collection.add(model, {merge: true});
	    	}, this);
		},

		renderSchedules: function(collection) {
            
        },

        createItem: function() {
            var create_view = new app.AdminCreateView({model: new this.collection.model(),
                                                       board_type: "schedule"});
            $("#admin_panel").prepend(create_view.render().el);
        },

        addSchedule: function(model) {

            one_schedule_view = new app.DoctorScheduleView({model: model});
            this.$el.find(".accordion-inner").append(one_schedule_view.render().$el);
        },

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.collection.each(this.addSchedule, this);
	        return this; 
	    }
	});


})(window);
