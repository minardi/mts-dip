(function(app) {

    app.AdminSchedulesView = Backbone.View.extend({

        id: "admin_dashboard",

        className: "accordion",

        events: {
            "click .admin_item_new" : "createItem"
        },

        template: JST["backbone/admin/templates/admin_schedules_template_new"],
      
        initialize: function() {
            this.collection = new app.DoctorsCollection();
            this.collection.fetch();
            this.collection.on("reset", this.render, this);
  		},

        addItem: function(model) {

            var item_view = new app.AdminSchedulesItemView({model: model});

            this.$el.append(item_view.render().el);
        },

        createItem: function() {
            var create_view = new app.AdminCreateView({model: new app.WeeklyModel(),
                                                       board_type: "schedule"});
            this.$el.prepend(create_view.render().el);
        },
		
		render: function() {
            $("#admin_panel").html(this.el);
    		this.$el.html(this.template());
    		this.collection.each(this.addItem, this);
    				
    		return this;
		}			
	});

})(window);