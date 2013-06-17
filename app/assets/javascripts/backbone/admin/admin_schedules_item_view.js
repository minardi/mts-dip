(function(app) {

	app.AdminSchedulesItemView = Backbone.View.extend({

    	className: "accordion-group",

        template: JST["backbone/admin/templates/admin_schedules_item_template_new"],

		initialize: function() {
			this.collection = new app.WeeklyCollection();

	    	this.collection.switchUrl(this.model.get("id"));
	    	this.collection.fetch();
	    	this.collection.on("reset", this.renderSchedules, this);
	    	this.collection.on("add", this.addSchedule, this);
		},

		renderSchedules: function(collection) {
            collection.each(this.addSchedule, this);
        },

        addSchedule: function(model) {            
            one_schedule_view = new app.DoctorScheduleView({model: model});
            this.$el.find(".accordion-inner").append(one_schedule_view.render().$el);
        },

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
	        return this; 
	    }
	});


})(window);
