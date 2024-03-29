window.ProjectsListView = Backbone.DisposableView.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var projects = this.model.models;
        var len = projects.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html(this.template(this.model.toJSON()));

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new ProjectsListItemView({model: projects[i]}).render().el);
        }

        this.paginator = new Paginator({model: this.model, page: this.options.page});
        $(this.el).append(this.paginator.render().el);

        return this;
    },

    dispose: function(){
      this.paginator.dispose();
    }
});

window.ProjectsListItemView = Backbone.DisposableView.extend({

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

    dispose: function(){
      this.model.unbind("change", this.render);
      this.model.unbind("destroy", this.close);
    }

});
