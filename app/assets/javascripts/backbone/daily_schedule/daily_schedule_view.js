(function(app) {

	app.DailyScheduleView = Backbone.View.extend({		

		tagName: "tr",
		className: this.model.get("doctor_id") + this.model.get("date"), 
			
		template: JST["backbone/daily_schedule/daily_schedule_template"],
		
		events: {
      		"click td" : "ticketAdd",
      		"dblclick td" : "ticketRemove",
    	},

    	initialize: function() {
    		console.log(this.model);
    	},

    	ticketAdd: function(event) {
    		$(event.target).addClass("selected_ticket");
			var ticket_id = event.target.attr("id");
			Backbone.Mediator.pub("ticket_added", { ticket_id: ticket_id })
		},

		ticketRemove: function(event) {

			if( $(event.target).hasClass("selected_ticket") ) {
				var ticket_id = event.target.attr("id");
				Backbone.Mediator.pub("ticket_removed", { ticket_id: ticket_id });
			}
		},

		//tr with doctor timelines
		render: function() {
			console.log(this.model);		
			this.$el.html(this.template(this.model.toJSON()));

			var session_duration = this.model.get("duration");

			switch (session_duration){
				case 15:
				timelines_num = 32;
				break;
				case 30:
				timelines_num = 16;
				break;
				case 60:
				timelines_num = 8;
				break;
			}

			//adds spans for timelines
			for (var i = 1; i <= timelines_num; i++) {
				this.$el.children(1).append("span");
			}

      		return this;		
		}		
	});	

})(window);

