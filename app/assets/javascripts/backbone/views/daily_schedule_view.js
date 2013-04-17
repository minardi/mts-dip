(function(app) {

	app.DSView = Backbone.View.extend({		

		tagName: "tr",
		className: this.model.get("doctor_name") + this.model.get("date"), //ok?
			
		//get template from Sveta
		template: JST['backbone/templates/daily/daily_schedule'],
		
		events: {
      		"click td" : "ticketAdd",
      		"dblclick td" : "ticketRemove",
    	},

    	ticketSelect: function(event) {
    		$(event.target).addClass("selected_ticket");
			var ticket_id = event.target.attr("id");
			Backbone.Mediator.pub("ticket_added", { ticket_id: ticket_id })	//уточнить	по поводу кликов на ячейках-тикетах
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
				this.$el.append("td").attr("id","????????????????"); //set id as a unique ticket identifier??
			}

      		return this;		
		}		
	});	

})(window);

