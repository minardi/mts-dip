(function(app) {

    app.AdminNavigationView = Backbone.View.extend({
            
        template: JST["backbone/specializations/specializations_template"],

        initialize: function() {

            this.admin_navigation = new app.AdminNavigation([{name: "Users"},
                                                             {name: "Specializations"},
                                                             {name: "Doctors"},
                                                             {name: "Schedule"},
                                                             {name: "Tickets"}]);
            this.render();
        },
        
        addItem: function(model) {
            
            var item_view = new app.AdminNavItemView({model: model});
            this.$el.children(0).append(item_view.render().el);                  
        },
        
        render: function() {

            this.$el.html(this.template());
            this.admin_navigation.each(this.addItem, this);
                
            return this;
        }               
    });

})(window);