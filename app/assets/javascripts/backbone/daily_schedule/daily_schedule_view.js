(function(app) {

	app.DailyScheduleView = Backbone.View.extend({		

		tagName: "tr",
			
		template: JST["backbone/daily_schedule/daily_schedule_template"],
		
		events: {
      		"click .worktime" : "timelineSelect",	
    	},

    	initialize: function() {
    		this.model.on("change", this.deleteSchedule, this);
    	},

    	timelineSelect: function(event) {
    		var element = event.target;
    				parsed_id = this.ticketIdParse(element);

			Backbone.Mediator.pub("ticket_added", { doctor_id: parsed_id.doctor_id,
													user_id: window.userEx.getid(),
													data: parsed_id.data,
													time: parsed_id.time,
											        	selector_id: parsed_id.selector_id,
											        	type: "sl-doc" 
											       });	
		},

		deleteSchedule: function() {

			if (this.model.get("visible") == false) {
				delete this.model;
				this.remove();
			}
		},

    	ticketIdParse: function(element) {

    		var ticket_id = $(element).attr("id"),
				doctor_id = ticket_id.slice(6, ticket_id.indexOf("_")),
				data = ticket_id.slice(ticket_id.indexOf("_") + 1, ticket_id.indexOf("t") - 1),
				time = ticket_id.slice(ticket_id.indexOf("t") + 1);

			time = time.charAt(0) + time.charAt(1) + ":" + time.charAt(2) + time.charAt(3);
	
			return {doctor_id: doctor_id,
					data:  data,
					time: time,
			        selector_id: ticket_id}
    	},

		timeFix: function(time) {

			(time.length == 4) ? (time = "0" + time) : time = time;
			return time;
		},

		formateDayStr: function(day_str) {	

				var day_arr = day_str.split("-"),
					dd = day_arr[0],
					mm = day_arr[1];

				if (dd < 10) {
  					dd = '0' + dd;
  				}	
					
				return dd + "." + mm + "." + day_arr[2].slice(2);
		},

		getTimelineAttrs: function(model) {

			var duration = model.get("duration"),
				date = new Date(0, 0, 0, 8, 0, 0, 0),
				date_help = new app.DateEx(date),
				amount = 0,
				cssclass = "timeline",
				start = this.timeFix(model.get("schedule_start")),
				end = this.timeFix(model.get("schedule_end"));

				//console.log(start, end);

			switch (duration) {
				case 15:
					amount = 36;
					break;
				case 30:
					amount = 18;
					break;
				case 45:
					amount = 12;
					break;
				case 60:
					amount = 9;
					break;
			}

			width = (((parseInt($("#daily_schedules").css("width")) * 0.9 - 2) - amount) / +amount).toFixed(3) + "px";

			return {duration: duration,
					date: date_help,
					amount: amount,
					start: start,
					end: end,
					cssclass: cssclass,
					width: width}
		},

		setTimelineAttrs: function(element, doctor_id, day, time, width, cssclass) {

			time = time.charAt(0) + time.charAt(1) + time.charAt(3) + time.charAt(4);

			$(element).attr("id", "sl-doc" + doctor_id + "_" + day + "_t" + time);
			$(element).css("width", width);
			$(element).addClass(cssclass);
		},

		render: function() {

			this.$el.html(this.template({ doctor_name: this.model.get("doctor_name"), 
										  day: this.formateDayStr(this.model.get("day")) }));

			timeline_attrs = this.getTimelineAttrs(this.model);

			for (var i = 1; i <= timeline_attrs.amount; i++) {

				timeline = document.createElement("span");
				current_time = timeline_attrs.date.timeViewFormat();

				if ( (current_time >= timeline_attrs.start) && (current_time < timeline_attrs.end) ) {
				    $(timeline).addClass("worktime");
				};
				
				this.setTimelineAttrs(timeline, 
									  this.model.get("doctor_id"),
									  this.model.get("day"), current_time,
									  timeline_attrs.width, 
									  timeline_attrs.cssclass);

				this.$el.children(".timelines").append(timeline);

				timeline_attrs.date.date.setMinutes(timeline_attrs.date.date.getMinutes() + timeline_attrs.duration);
			}

      		return this;		
		}		
	});	

})(window);

