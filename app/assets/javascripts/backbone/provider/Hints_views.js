(function(app) {

    app.hintProvider = Backbone.View.extend({

    	tagName: "div",

    	hint_template: JST["backbone/provider/hint_template"],

    	initialize: function() {

            Backbone.Mediator.sub("hint", this.showHint, this);
            
        },

        showHint: function(attr) {

            var hintEl = attr["el"],
                self = this;
                
            this.$el.addClass("hint");
            this.$el.html(this.hint_template({message: attr["message"]}));
            $(hintEl).append(this.$el);

            $(hintEl).hover(
                function() {

                self.$el.animate({opacity : 1}, 1500);
                
            },
                function() {

                self.$el.animate({opacity : 0}, 1500)

            });
                
        },
    	    });
})(window);