(function(app) {
  
  app.HistoryHomeModel = Backbone.Model.extend({
    
    spec_ids: [],
    url: "",


    pushArrUniq: function(arr,el_arr) {
     var m = 0;
      
      _.each(arr,function(el) {
          if (el == el_arr) m++; 
      },this)    

      if (m == 0) arr.push(el_arr);
      return m;
    },

    removeArr: function(arr,el_rem) {
      var new_arr = [];

      _.each(arr,function(el) {
        if (el != el_rem) new_arr.push(el);
      },this);

      return new_arr;
    }

  })

})(window);
  
  
   
   