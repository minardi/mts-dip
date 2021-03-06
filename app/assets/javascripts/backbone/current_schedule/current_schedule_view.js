(function(app) {

	app.CurrentScheduleView = Backbone.View.extend({		

		tagName: "tr",
			
		template: JST["backbone/current_schedule/current_schedule_template"],


		timeFix: function(time) {

			time = (time.length == 4) ? "0" + time : time;
			time = time.charAt(0) + time.charAt(1) + time.charAt(3) + time.charAt(4);

			return time;
		},

		getTimelineAttrs: function(model) {

			var duration = model.get("duration"),
				date = new app.DateEx(),
				amount = 540 / duration,
				tr_width,
				cssclass = "timeline",
				start = this.timeFix(model.get("schedule_start")),
				end = this.timeFix(model.get("schedule_end"));

				date.idToDate(model.get("day"), "t0800");

			tr_width = parseInt($("#current_schedules").css("width")) * 0.9 - 2;
			width = (((((tr_width - amount) / +amount)) * 100) / tr_width).toFixed(5) + "%";

			return {duration: duration,
					date: date,
					amount: amount,
					start: start,
					end: end,
					cssclass: cssclass,
					width: width}
		},

		setTimeline: function(doctor_id, t_attrs) {

			var timeline = document.createElement("div"),
				time = t_attrs.date.timeTransFormat().slice(1);

			$(timeline).attr("id", "cw-doc" + doctor_id + "_" + t_attrs.date.dateTransFormat() + "_t" + time);
			$(timeline).css("width", width).addClass(t_attrs.cssclass);

			if ( (time >= t_attrs.start) && (time < t_attrs.end) ) {
				    $(timeline).addClass("worktime");
			}

			this.$el.children(":last-child").append(timeline);
		},

		render: function() {

			var i,
				current_time,
				timeline,
				t_attrs = this.getTimelineAttrs(this.model);

			this.$el.html(this.template({ doctor_name: this.model.get("doctor_name"), 
										  day: t_attrs.date.dateViewFormat() }));

			for (i = 1; i <= t_attrs.amount; i++) {
				
				this.setTimeline(this.model.get("doctor_id"), t_attrs);
				t_attrs.date.date.setMinutes(t_attrs.date.date.getMinutes() + t_attrs.duration);
			}

      		return this;	
		}		
	});	

})(window);

