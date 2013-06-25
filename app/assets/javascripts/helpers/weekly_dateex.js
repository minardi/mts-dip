(function(app) {

	function dateCompare(str, compare_str) {
        compare_str = (compare_str) ? compare_str : this.current_date.dateTransFormat(true);
        return (compare_str === str) ? true : false; 
    }

    function dateConvert(str, format) {
        format = (format) ? format : '-'; 
        str = str.split(format);
        return str[2] + format + str[1] + format + str[0];

    }
    
    function updateWeek () {
        this.week_days = this.getCurrentWeek({"transport":true});
        
    }
	
	function WeeklyDateEx(dateobj) {
        this.week_days = {};
		this.dateCompare = dateCompare;
		this.dateConvert = dateConvert;
        this.updateWeek = updateWeek;	
	}

    WeeklyDateEx.prototype = new DateEx ();
	app.WeeklyDateEx = WeeklyDateEx;

})(window)