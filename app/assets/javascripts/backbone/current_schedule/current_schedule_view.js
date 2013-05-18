(function(app) {

	app.CurrentScheduleView = Backbone.View.extend({		

		tagName: "tr",
			
		template: JST["backbone/current_schedule/current_schedule_template"],

		timeFix: function(time) {

			(time.length == 4) ? (time = "0" + time) : time = time;
			return time;
		},

		formateDayStr: function(day_str) {	

				var day_arr = day_str.split("-"),
					dd = day_arr[0],
					mm = day_arr[1];
					
				return dd + "." + mm + "." + day_arr[2].slice(2);
		},

		getTimelineAttrs: function(model) {

			var duration = model.get("duration"),
				date = new Date(0, 0, 0, 8, 0, 0, 0),
				amount = 0,
				cssclass = "timeline",
				start = this.timeFix(model.get("schedule_start")),
				end = this.timeFix(model.get("schedule_end"));

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

			width = (((parseInt($("#current_schedules").css("width")) * 0.9 - 2) - amount) / +amount).toFixed(2) + "px";


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

			$(element).attr("id", "doc" + doctor_id + "_" + day + "_t" + time);
			$(element).css("width", width);
			$(element).addClass(cssclass);
		},

		render: function() {

			this.$el.html(this.template({ doctor_name: this.model.get("doctor_name"), 
										  day: this.formateDayStr(this.model.get("day")) }));

			timeline_attrs = this.getTimelineAttrs(this.model);

			for (var i = 1; i <= timeline_attrs.amount; i++) {

				timeline = document.createElement("span");
				current_time = timeline_attrs.date.toTimeString();
				current_time = current_time.slice(0, 5);

				if ( (current_time >= timeline_attrs.start) && (current_time < timeline_attrs.end) ) {
				    $(timeline).addClass("worktime");
				};
				
				this.setTimelineAttrs(timeline, 
									  this.model.get("doctor_id"),
									  this.model.get("day"), current_time,
									  timeline_attrs.width, 
									  timeline_attrs.cssclass);

				this.$el.children(".timelines").append(timeline);

				timeline_attrs.date.setMinutes(timeline_attrs.date.getMinutes() + timeline_attrs.duration);
			}

      		return this;		
		}		
	});	

})(window);

