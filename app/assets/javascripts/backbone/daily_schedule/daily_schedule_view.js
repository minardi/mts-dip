(function(app) {

	app.DailyScheduleView = Backbone.View.extend({		

		tagName: "tr",
			
		template: JST["backbone/daily_schedule/daily_schedule_template"],
		
		events: {
      		"click td span" : "ticketAdd",
      		"dblclick td span" : "ticketRemove",
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

		render: function() {
			this.$el.addClass(this.model.get("doctor_id"));	
			this.$el.html(this.template(this.model.toJSON()));

			var session_duration = this.model.get("duration"),
				timelines_num = 0,
				timeline_class = "timeline_32";

			switch (session_duration){
				case 15:
					timelines_num = 32;
					timeline_class = "timeline_32";
				break;
				case 30:
					timelines_num = 16;
					timeline_class = "timeline_16";
				break;
				case 60:
					timelines_num = 8;
					timeline_class = "timeline_8";
				break;
			}

			//adds spans for timelines
			for (var i = 1; i <= timelines_num; i++) {
				timeline = document.createElement("span");
				timeline.className = timeline_class;
				timeline.text = "&nbsp";
				this.$el.find(".timelines").append(timeline);
			}

			//paint timelines depending on schedule_start and schedule_end
			//this.model.get("schedule_start"), this.model.get("schedule_end") - начало и конец рабочего дня.

      		return this;		
		}		
	});	

})(window);

