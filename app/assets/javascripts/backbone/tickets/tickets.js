(function(app) {
  
    app.TicketsCollection = Backbone.Collection.extend({
      url: '/tickets', 
      model: app.TicketModel,

      is_set_event: false,
     
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
         
         delete attrs["type"];

         console.log("fetch", attrs)
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
     
     cloneValid : function (attrs){
        
        var tickets = this.where({user_id : attrs.user_id, data : attrs.data}),
            num = 0,
            result = true;
            
        for (num in tickets){
            
            if(parseInt(tickets[num].get('doctor_id')) !== parseInt(attrs.doctor_id)) {
                
                if(tickets[num].get('time') === attrs['time']){
                    console.error('you already have tickets on this time!');
                    Backbone.Mediator.pub('error', 'you already have ticket on this time, check your schedule!');
                    result = false
                }
            }
            
        }

        return result;
     }
     
    });
    
 })(window);  