(function(app) {

    app.errorProvider = Backbone.View.extend({

        tagName: "div",

        template: JST["backbone/provider/error_template"],
        fatal_template: JST["backbone/provider/fatal_error_template"],
        hint_template: JST["backbone/provider/hint_template"],

        initialize: function() {
            Backbone.Mediator.sub("error", this.error, this);
            Backbone.Mediator.sub("fatal_error", this.fatalError, this);
            Backbone.Mediator.sub("warning", this.warning, this);
            Backbone.Mediator.sub("hint", this.initHint, this);
        },

        events: {
            "click #close": "kill",
        },

        error: function(attr) {
            var errorEl = attr["el"];
            this.$el.html(this.template({class_type:"alert alert-error", error_type:"Error:", message:attr["message"]}));
            $(errorEl).append(this.$el);
        },

        fatalError: function(attr) {
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

        showHint: function(attrs) {
            // console.log(attrs, this);
            // var hintEl = attrs["el"];

            // this.$el.html(this.hint_template({message: attrs["message"]}));
            // $(hintEl).append(this.$el);
                      
        },

        initHint: function(attr) {
            var hintEl = attr["el"],
                self = this,
                timer;

            this.$el.addClass("hide_hint");
            this.$el.html(this.hint_template({message: attr["message"]}));
             $(hintEl).append(this.$el);

                $(hintEl).on("mouseover", function() {

                    self.$el.animate({
                        display: "toggle"
                    }, 1500);

                });
            // $(hintEl).on("mouseover", function() {
            //     var attrs = attr,
            //         me = self;
            // timer = setTimeout((
            //             function (attrs, self){
            //                 console.log(attrs, self)
            //                 return function() {self.showHint.call( attrs, self)}
            //             } (attrs, me)
            //         ), 1500);
 
            // });

            $(hintEl).on("mouseout", this.hideHint);

        },

        hideHint: function() {
            
        },

    });
})(window);