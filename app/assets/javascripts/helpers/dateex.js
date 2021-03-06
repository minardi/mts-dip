(function(app) {

	function addZero(num) {

		if (num < 10) {
			num = '0' + num;
		}

		return num;
	}

	function setDate(year, month, day, hours, minutes, seconds, ms) {

		this.date = new Date(year, month, day, hours, minutes, seconds, ms);
	}

	function dateTransFormat(compare_flag) {

		var dd = addZero(this.date.getDate()),
			mm = addZero(this.date.getMonth() + 1),
			yyyy = addZero(this.date.getFullYear());

		datestr = (compare_flag) ? 
			yyyy + "-" + mm + "-" +dd :
			dd + "-" + mm + "-" + yyyy;

		return datestr;
	}

	function timeTransFormat() {

		var hh = addZero(this.date.getHours()),
			mm = addZero(this.date.getMinutes());

		return "t" + hh + mm;
	}

	function dateViewFormat() {

		var dd = addZero(this.date.getDate()),
			mm = addZero(this.date.getMonth() + 1),
			yyyy = addZero(this.date.getFullYear());

		return dd + "." + mm + "." + yyyy % 100;
	}

	function timeViewFormat() {

		var hh = addZero(this.date.getHours()),
			mm = addZero(this.date.getMinutes());

		return hh + ":" + mm;
	}

	function idToDate(datestr, timestr) {

		//datestr --> dd-mm-yyyy, timestr --> thhmm

		var day = datestr.slice(0, 2),
			month = datestr.slice(3, 5) - 1,
			year = datestr.slice(6),
			hours = (timestr) ? timestr.slice(1, 3) : 0,
			minutes = (timestr) ? timestr.slice(3) : 0;

			this.date = new Date(year, month, day, hours, minutes, 0, 0);
            
		return this.date;
	}

	function getCurrentWeek(param) {

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
        
        this.date.setDate(this.date.getDate() - this.date.getDay());
        

		for(key in currentWeek) {
            
			currentWeek[key] = (param["transport"] == true) ? this.dateTransFormat() : this.dateViewFormat();
            this.date.setDate(this.date.getDate() + 1);
		}

         this.date.setDate(this.date.getDate() - 1);

		return currentWeek;
	}

	function nextWeek() {
        
        var k = 7 - this.date.getDay();

		this.date.setDate(this.date.getDate()+k);


	}

	function prevWeek() {

        var k =  this.date.getDay()+2;

		this.date.setDate(this.date.getDate()-8);

		
	}

	function DateEx(dateobj) {

		this.date = dateobj || new Date();
		
		this.setDate = setDate;

		this.dateTransFormat = dateTransFormat;

		this.timeTransFormat = timeTransFormat;

		this.dateViewFormat = dateViewFormat;

		this.timeViewFormat = timeViewFormat;

		this.idToDate = idToDate;

		this.getCurrentWeek = getCurrentWeek;

		this.nextWeek = nextWeek;

		this.prevWeek = prevWeek;
		
	}

	app.DateEx = DateEx;

})(window)