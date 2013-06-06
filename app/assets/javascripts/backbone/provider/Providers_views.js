(function(app) {

    app.errorProvider = Backbone.View.extend({

        tagName: "div",

        template: JST["backbone/provider/error_template"],
        fatal_template: JST["backbone/provider/fatal_error_template"],
        hint_template: JST["backbone/provider/hint_template"],

        initialize: function() {
            Backbone.Mediator.sub("error", this.error, this);
            Backbone.Mediator.sub("fatal_error", this.fatal_error, this);
            Backbone.Mediator.sub("warning", this.warning, this);
            Backbone.Mediator.sub("hint", this.showHint, this);
        },

        events: {
            "click #close": "kill",
        },

        error: function(attr) {
            var errorEl = attr["el"];
            this.$el.html(this.template({class_type:"alert alert-error", error_type:"Error:", message:attr["message"]}));
            $(errorEl).append(this.$el);
        },

        fatal_error: function(attr) {
            var errorEl = $("#under-head");
            this.$el.html(this.fatal_template({error_type:"Fatal ERROR!", message:attr["message"]}));
            $(errorEl).append(this.$el);
        },

        warning: function(attr) {
            var errorEl = attr["el"];
            this.$el.html(this.template({class_type:"warningMessage", error_type:"Warning!", message:attr["message"]}));
            $(errorEl).append(this.$el);
        },

        kill: function(event) {
            this.$el.html("");
        },

        showHint: function(attr) {
            var hintEl = attr["el"],
                timer;

            $(hintEl).on("mouseover", function() {

                timer = setTimeout(
                    (function(self) {    
                    return function(self) {

                            $(self.el).html(self.hint_template({message: attr["message"]}));
                            $(hintEl).append(self.$el);
                        } 
                    }(this)), 1500);

            });

            $(hintEl).on("mouseout", this.hideHint);
        },

        hideHint: function() {
            this.$el.html("");
            clearTimeout(timer);
        },

    });
})(window);