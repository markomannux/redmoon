window.AssignResourcesView = Backbone.DisposableView.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var resources = this.model.resources.models;

        $(this.el).html(this.template(this.model.project.toJSON()));
        for (var i = 0; i < resources.length; i++) {
            $('.resources', this.el).append(new SelectResourceItemView({model: resources[i]}).render().el);
        }

        return this;
    },

    dispose: function(){
    }
});

window.SelectResourceItemView = Backbone.DisposableView.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    dispose: function(){
      this.model.unbind("change", this.render);
      this.model.unbind("destroy", this.close);
    }

});
