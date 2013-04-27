(function(app) {

	app.CurrentScheduleView = Backbone.View.extend({		

		tagName: "tr",
			
		template: JST["backbone/current_schedule/current_schedule_template"],

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));

			var session_duration = this.model.get("duration"),
				timelines_num = 0,
				timeline_class = "timeline",
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

			//начало рабочего дня - 8:00
			date.setHours(8, 0);

			//устанавливаем кол-во таймлайнов в зависимости от duration
			switch (session_duration){
				case 15:
					timelines_num = 36;
				break;
				case 30:
					timelines_num = 18;
				break;
				case 60:
					timelines_num = 9;
				break;
			}

			//вычисляем ширину 1-го таймлайна
			timeline_width = ((parseInt($("#current_schedules").css("width")) * 0.9 - 2) - timelines_num) / +timelines_num + "px";

			//рисуем спаны-таймлайны
			for (var i = 1; i <= timelines_num; i++) {

				timeline = document.createElement("span");
				time = date.toTimeString();
				timeline_time = time.slice(0, 5);

				//меняем стиль рабочих часов
				if ( (timeline_time >= timeline_start ) && ( timeline_time < timeline_end ) ) {
					$(timeline).addClass("worktime");
					$(timeline).css("background-color", "blue");
				};

				//убираем : по просьбе Димы

				timeline_time = timeline_time.charAt(0) +
								timeline_time.charAt(1) +
								timeline_time.charAt(3) +
								timeline_time.charAt(4);
				
				$(timeline).css("width", timeline_width);
				$(timeline).addClass(timeline_class);
				$(timeline).attr("id", this.model.get("doctor_id") + 
									   "_" + 
									   this.model.get("day") + 
									   "_" + 
									   timeline_time);

				this.$el.find(".timelines").append(timeline);

				//увеличиваем время для след. таймлайна
				date.setMinutes(date.getMinutes() + session_duration);
			}

      		return this;		
		}		
	});	

})(window);

