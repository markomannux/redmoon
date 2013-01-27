window.HomeView = Backbone.DisposableView.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },
 
    close: function(){
      this.remove();
      this.unbind();
    }
});
