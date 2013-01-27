window.ResourcesListView = Backbone.DisposableView.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var resources = this.model.models;
        var len = resources.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html(this.template(this.model.toJSON()));

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new ResourcesListItemView({model: resources[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.ResourcesListItemView = Backbone.DisposableView.extend({

    tagName: "li",

    className: "span3",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    close: function(){
      this.model.unbind("change", this.render);
      this.model.unbind("destroy", this.close);
    }

});
