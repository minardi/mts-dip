(function(app) {

	app.CurrentScheduleView = Backbone.View.extend({		

		tagName: "tr",
			
		template: JST["backbone/current_schedule/current_schedule_template"],


		timeFix: function(time) {

			time = (time.length == 4) ? "0" + time :  time;
			return time;
		},

		getTimelineAttrs: function(model) {

			var duration = model.get("duration"),
				date = new app.DateEx(),
				amount = 0,
				tr_width,
				cssclass = "timeline",
				start = this.timeFix(model.get("schedule_start")),
				end = this.timeFix(model.get("schedule_end"));

				date.idToDate(model.get("day"), "t0800");

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

			tr_width = parseInt($("#current_schedules").css("width")) * 0.9 - 2;
			width = ((((tr_width - amount) / +amount)) * 100) / tr_width  + "%";
			//width = (((parseInt($("#daily_schedules").css("width")) * 0.9 - 2) - amount) / +amount).toFixed(3) + "px";

			return {duration: duration,
					date: date,
					amount: amount,
					start: start,
					end: end,
					cssclass: cssclass,
					width: width}
		},

		setTimelineAttrs: function(element, doctor_id, day, time, width, cssclass) {

			time = time.charAt(0) + time.charAt(1) + time.charAt(3) + time.charAt(4);

			$(element).attr("id", "cw-" + "doc" + doctor_id + "_" + day + "_t" + time);
			$(element).css("width", width);
			//$(element).css("height", "40px");
			//$(element).css("float", "left");
			//$(element).css("margin-right", "1px");
			$(element).addClass(cssclass);
		},

		render: function() {

			var i,
				current_time,
				timeline,
				timeline_attrs = this.getTimelineAttrs(this.model);

			this.$el.html(this.template({ doctor_name: this.model.get("doctor_name"), 
										  day: timeline_attrs.date.dateViewFormat() }));

			for (i = 1; i <= timeline_attrs.amount; i++) {

				timeline = document.createElement("div");
				current_time = timeline_attrs.date.timeViewFormat();

				if ( (current_time >= timeline_attrs.start) && (current_time < timeline_attrs.end) ) {
				    $(timeline).addClass("worktime");
				};
				
				this.setTimelineAttrs(timeline, 
									  this.model.get("doctor_id"),
									  this.model.get("day"), 
									  current_time,
									  timeline_attrs.width, 
									  timeline_attrs.cssclass);

				this.$el.children(".timelines").append(timeline);

				timeline_attrs.date.date.setMinutes(timeline_attrs.date.date.getMinutes() + timeline_attrs.duration);
			}

      		return this;		
		}		
	});	

})(window);

