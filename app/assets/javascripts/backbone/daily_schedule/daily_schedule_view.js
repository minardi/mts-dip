(function(app) {

	app.DailyScheduleView = Backbone.View.extend({		

		tagName: "tr",
			
		template: JST["backbone/daily_schedule/daily_schedule_template"],
		
		events: {
      		"click td span" : "ticketAdd",
      		"dblclick td span" : "ticketRemove",
    	},

    	initialize: function() {
    		this.model.on("change", this.deleteSchedule, this);
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

		deleteSchedule: function() {
			if (this.model.get("visible") == false) {
				delete this.model;
				this.remove();
			}
		},

		render: function() {
			this.$el.addClass(this.model.get("doctor_id"));	
			this.$el.html(this.template(this.model.toJSON()));

			var session_duration = this.model.get("duration"),
				timelines_num = 0,
				timeline_class = "timeline_32",
				timeline_width = "",
				timeline_start = this.model.get("schedule_start"),
				timeline_end = this.model.get("schedule_end"),
				date = new Date();

			//добавляем нули при необходимости (для совпадения форматов времени сеанса и текущего времени таймлайна)
			if (timeline_start.length == 4) {
				timeline_start = "0" + timeline_start;
			}
			if (timeline_end.length == 4) {
				timeline_end = "0" + timeline_end;
			}

			date.setHours(8, 0);

			//устанавливаем кол-во таймлайнов в зависимости от duration
			switch (session_duration){
				case 15:
					timelines_num = 36;
					timeline_class = "timeline_32";
				break;
				case 30:
					timelines_num = 18;
					timeline_class = "timeline_16";
				break;
				case 60:
					timelines_num = 9;
					timeline_class = "timeline_8";
				break;
			}

			timeline_width = ((parseInt($("#daily_schedules").css("width")) * 0.9 - 2) - timelines_num) / +timelines_num + "px";

			//рисуем спаны-таймлайны
			for (var i = 1; i <= timelines_num; i++) {

				timeline = document.createElement("span");
				time = date.toTimeString();
				timeline_time = time.slice(0, 5);

				if ( (timeline_time >= timeline_start ) && ( timeline_time < timeline_end ) ) {
					$(timeline).css("background-color", "blue");
				};
				
				$(timeline).addClass(timeline_class);
				$(timeline).css("width", timeline_width);
				$(timeline).attr("id", this.model.get("doctor_name") + 
									   "_" + 
									   this.model.get("day") + 
									   "_" + 
									   timeline_time);

				this.$el.find(".timelines").append(timeline);

				date.setMinutes(date.getMinutes() + session_duration);
			}

      		return this;		
		}		
	});	

})(window);

