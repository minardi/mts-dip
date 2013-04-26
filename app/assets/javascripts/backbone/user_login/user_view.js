(function(app) {

	app.UserView = Backbone.View.extend({
        
        tagName : 'div',

        norole_template: JST["backbone/user_login/user_template"],
        
        inrole_template: JST["backbone/user_login/role_template"],

        events: {
            
            "click": 
        },

        render: function() {

            this.$el.html(this.)

        }

    }); 
        
})(window);