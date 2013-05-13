 (function(app) {
  
    app.TicketsCollection = Backbone.Collection.extend({
     url: '/tickets', 
     model: window.TicketModel,
     initialize: function() {
       self = this;

       //this.updateURL({user_id:1});
      // this.currentTickets();
     },
       is_there: function(attrs) {
       
           var hesh = {
	                    doctor_id: attrs["doctor_id"],
                        data: attrs["data"],
                        time: attrs["time"] 
                      },
           models = this.where(attrs),
           is_null = false;
	   
	       if (models.length > 0) is_null = true;
           
           return is_null;       
     },
    
  
    fetchByParam: function(parametrs, callback, context) {

        var url = this.url+".json?",
            params = [],
            not_set_attrs = {},
            self = this;

        for (name in parametrs) {
            params.push( name + "=" + encodeURIComponent( parametrs[name] ));
        }
            
         url += params.join('&');
	    
        $.get(url, function(attrs) {

	        $.each(attrs, function(index,attr) { 
		       if (self.where(attr).length == 0) {
		          var model = new TicketModel(attr);
		          self.add(model);
                  not_set_attrs[index] = attr;		     
		        }		  
		    });

            if (callback != null) callback(not_set_attrs, context);
       });   
     },

     updateURL: function(attr) {

      var user_id = attr["user_id"];

      this.url = "/tickets/" + user_id + "/doctor_name.json?";

      console.log(this.url);

      self.currentTickets();

     },

     currentTickets: function() {
      //Проверка даты и времени
      console.log("olololo");
      //Tickets.fetch();
      //console.log(this.Tickets);

     },

     comporator: function(TicketModel) {
      return TicketModel.get('data');

     },
     
    });
    
 })(window);  