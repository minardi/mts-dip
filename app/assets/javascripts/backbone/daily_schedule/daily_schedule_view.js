(function(app) {

	app.DailyScheduleView = Backbone.View.extend({		

		tagName: "tr",
		className: this.model.get("doctor_name") + this.model.get("date"), 
			
		//get template from Sveta
		template: JST["backbone/daily_schedule/daily_schedule_template"],
		
		events: {
      		"click td" : "ticketAdd",
      		"dblclick td" : "ticketRemove",
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
		//need changes due to template
		render: function() {		
			this.$el.html(this.template(this.model.toJSON()));

			var session_duration = this.model.get("duration");

			for (var i = 1; i <= session_duration; i++) {
				var td_id = this.model.get("doctor_name") + "_" + this.model.get("date") + "_" + i; //not finished
				this.$el.append("td").attr("id", td_id);
			}

      		return this;		
		}		
	});	

})(window);

