 (function(app) {
  
    app.TicketsCollection = Backbone.Collection.extend({
      url: '/tickets', 
      model: app.TicketModel,
     
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

      fetchByAttr: function(attrs) {
        console.log(attrs);

         this.fetch({remove : false, update : true, data : attrs});  
  
     },

     updateURL: function(attr) {

      var user_id = attr["id"];

      this.url = "/tickets/" + user_id + "/doctor_name.json?";

      this.currentTickets();

     },

     currentTickets: function() {

      this.fetch();

     },

     comparator: function(model) {

      var filtr = model.get('data') + model.get('time');

      return filtr;
     },
     
    });
    
 })(window);  