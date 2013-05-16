function DateEx(dateobj) {

	this.date = dateobj || new Date();

	function addZero(num) {

		if (num < 10) {
			num = '0' + num;
		}

		return num;
	}

	this.setDate = function(year, month, day, hours, minutes, seconds, ms) {

		this.date = new Date(year, month, day, hours, minutes, seconds, ms);
	}

	this.dateTransFormat = function() {

		var dd = addZero(this.date.getDate()),
			mm = addZero(this.date.getMonth() + 1),
			yyyy = addZero(this.date.getFullYear());

		return dd + "-" + mm + "-" + yyyy;
	}

	this.timeTransFormat = function() {

		var hh = addZero(this.date.getHours()),
			mm = addZero(this.date.getMinutes());

		return "t" + hh + mm;
	}

	this.dateViewFormat = function() {

		var dd = addZero(this.date.getDate()),
			mm = addZero(this.date.getMonth() + 1),
			yyyy = addZero(this.date.getFullYear());

		return dd + "." + mm + "." + yyyy % 100;
	}

	this.timeViewFormat = function() {

		var hh = addZero(this.date.getHours()),
			mm = addZero(this.date.getMinutes());

		return hh + ":" + mm;
	}

	this.idToDate = function(datestr, timestr) {

		//id == doc1_dd-mm-yyyy_thhmm

		var day = datestr.slice(0, 2),
			month = datestr.slice(3, 5),
			year = datestr.slice(5),
			hours = timestr.slice(1, 3),
			minutes = timestr.slice(3),
			set_date = new Date(year, month, day, hours, minutes, 0, 0);

		return set_date;
	}

	this.getCurrentWeek = function(param) {

		this.date.setDate(this.date.getDate() - this.date.getDay());

		var key,
			currentWeek = {

			"sun": 0,
			"mon": 0,
			"tue": 0,
			"wed": 0,
			"thu": 0,
			"fri": 0,
			"sat": 0,
		};

		for(key in currentWeek) {

			currentWeek[key] = (param["transport"] == true) ? this.dateTranspFormat() : this.dateViewFormat();
			this.date.setDate(this.date.getDate() + 1);
		}

		return currentWeek;
	}
	
}