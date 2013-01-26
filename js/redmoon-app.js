var AppRouter = Backbone.Router.extend({

    routes: {
      ""                      :"home",
      "projects"              :"projectsList",
      "projects/new"          :"projectNew",
      "projects/:id"          :"projectDetail",
      "projects/page/:page"   :"projectsList",
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function() {
      if (!this.homeView) {
        this.homeView = new HomeView();
      }
      $("#content").html(this.homeView.el);
      this.headerView.selectMenuItem('home-menu');
    },

    projectsList: function(page) {
      var p = page ? parseInt(page, 10) : 1;
      var projectslist = new ProjectCollection();
      projectslist.fetch({success: function(){

        console.log('fetching');
        $("#content").html(new ProjectsListView({model:projectslist, page: p}).el);
      }});
      this.headerView.selectMenuItem('projects-menu');
    },

    projectNew: function() {
      console.log("new");
      var project = new Project();
      $("#content").html(new ProjectView({model: project}).el);
      this.headerView.selectMenuItem('projects-menu');
    },

    projectDetail: function(id) {
      var project = new Project({id: id});
      project.fetch({success: function() {
        $("#content").html(new ProjectView({model: project}).el);
      }
      });
      this.headerView.selectMenuItem('projects-menu');
    }

});

utils.loadTemplate(['HeaderView', 'ProjectsListItemView', 'HomeView', 'ProjectsListView', 'ProjectView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
