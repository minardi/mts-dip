(function(app) {

  app.HistoryView = Backbone.View.extend({

    initialize: function() {

      Backbone.Mediator.sub('spec_selected',this.addSpec,this);

      Backbone.Mediator.sub('spec_unselected',this.removeSpec,this);

    },

    createUrl: function() {
      var dotte = ""
          model =  this.model;

      model.url = "home/" 
  
      _.each(model.spec_ids, function(spec_id,i) {

          dotte = i+1 == model.spec_ids.length ? "" : ":";
          model.url = model.url+spec_id+dotte;  
             
      },this)
        
      if (this.model.spec_ids.length == 0)  this.model.url = "home"; 

    },

    navUrl: function() {
      mts.router.navigate(this.model.url, {trigger:true});
    },

    selSpec: function(sel_id) {
      var model =  this.model;
       
       model.spec_ids = sel_id.split(":");
          
      
      _.each(model.spec_ids,function(spec_id) {
          
          Backbone.Mediator.pub("spec_selected",{ 
                                                  id: spec_id,
                                                  history_silent: true
                                                });
      
          
          Backbone.Mediator.pub("check_spec",{
                                               id:spec_id
                                             });
          console.log("check");

      },this)

    },

    removeSpec:function(attrs) {

        this.model.spec_ids = this.model.removeArr(this.model.spec_ids,attrs["id"]);
      
        this.createUrl(); 
        this.navUrl();
        //console.log(this.model.spec_ids);
    },

    addSpec: function(attrs) {
     if (attrs["history_silent"] != null) return;

      this.model.pushArrUniq(this.model.spec_ids,attrs["id"]);
     
      this.createUrl(); 
      this.navUrl();
    }


  });
  
})(window);
