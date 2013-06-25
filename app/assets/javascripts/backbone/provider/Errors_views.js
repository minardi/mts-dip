(function(app) {

    app.errorProvider = Backbone.View.extend({

        tagName: "div",

        template: JST["backbone/provider/error_template"],
        fatal_template: JST["backbone/provider/fatal_error_template"],
        

        initialize: function() {
            Backbone.Mediator.sub("error", this.error, this);
            Backbone.Mediator.sub("fatal_error", this.fatalError, this);
            Backbone.Mediator.sub("warning", this.warning, this);
            this.errorEl = $('#app-header'); 
        },

        events: {
            "click #close": "kill",
        },

        error: function(attr) {
            var errorEl = (attr["el"] === undefined) ? this.errorEl : errorEl;
            this.$el.html(this.template({class_type:"alert alert-error", error_type:"Error:", message:attr["message"]}));
            $(errorEl).append(this.$el);
        },

        fatalError: function(attr) {
            var errorEl = $("#under-head");
            this.$el.html(this.fatal_template({error_type:"Fatal ERROR!", message:attr["message"]}));
            $(errorEl).append(this.$el);
        },

        warning: function(attr) {
            var errorEl = (attr["el"] === undefined) ? this.errorEl : errorEl;
            this.$el.html(this.template({class_type:"warningMessage", error_type:"Warning!", message:attr["message"]}));
            $(errorEl).append(this.$el);
        },

        kill: function(event) {
            this.$el.html("");
        },

    });
})(window);