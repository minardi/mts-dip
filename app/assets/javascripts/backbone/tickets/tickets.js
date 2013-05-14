 (function(app) {
  
    app.TicketsCollection = Backbone.Collection.extend({
     url: '/tickets', 
     model: window.TicketModel,
     
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
     }
     
     
    })
    
 })(window);  