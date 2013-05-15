function DateEx() {

	this.date = null;

	this.setDate = function(year, month, day, hours, minutes, seconds, ms) {

		this.date = new Date(year, month, day, hours, minutes, seconds, ms);
	}

	this.dateTranspFormat = function() {

		var dd = this.date.getDate(),
			mm = this.date.getMonth() + 1,
			yyyy = this.date.getFullYear();

		if (dd < 10) {
			dd = '0' + dd;
		}

		if (mm < 10) {
			mm = '0' + mm;
		}	

		return dd + "-" + mm + "-" + yyyy;
	}

	this.timeTranspFormat = function() {

		var hh = this.date.getHours(),
			mm = this.date.getMinutes();

		if (hh < 10) {
			hh = '0' + hh;
		}

		if (mm < 10) {
			mm = '0' + mm;
		}	

		return "t" + hh + mm;
	}

	this.dateViewFormat = function() {

		var dd = this.date.getDate(),
			mm = this.date.getMonth() + 1,
			yyyy = this.date.getFullYear();

		if (dd < 10) {
			dd = '0' + dd;
		}

		if (mm < 10) {
			mm = '0' + mm;
		}	

		return dd + "." + mm + "." + yyyy % 1000;
	}

	this.timeViewFormat = function() {

		var hh = this.date.getHours(),
			mm = this.date.getMinutes();

		if (hh < 10) {
			hh = '0' + hh;
		}

		if (mm < 10) {
			mm = '0' + mm;
		}	

		return hh + ":" + mm;
	}

	this.idToDate = function(id) {

		//id == doc1_dd-mm-yyyy_thhmm

		var day = id.slice(5, 7),
			month = id.slice(8, 10),
			year = id.slice(11, 15),
			hours = id.slice(17, 19),
			minutes = id.slice(19),
			set_date = new Date(year, month, day, hours, minutes, 0, 0);

		return set_date;
	}

	this.getCurrentWeek = function() {

		this.date.setDate(this.date.getDate() - this.date.getDay());

		var currentWeek = {

			"sun": 0,
			"mon": 0,
			"tue": 0,
			"wed": 0,
			"thu": 0,
			"fri": 0,
			"sat": 0,
		};

		for(key in currentWeek) {

			currentWeek[key] = this.dateTranspFormat();
			this.date.setDate(this.date.getDate() + 1);
		}

		return currentWeek;
	}
	
}