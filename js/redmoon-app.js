var AppView = Backbone.View.extend({
    el: $("#content"),

    showView: function(view){
      var closingView = this.view;

      this.view = view;
      this.view.render();
      $(this.view.el).hide();
      $(this.el).html(this.view.el);

      this.openView(this.view);
      this.closeView(closingView);
    },

    openView: function(view){
      $(view.el).fadeIn(500);
    },

    closeView: function(view){
      if (view){
        view.unbind();
        view.dispose();
        $(view.el).fadeOut(500, function(){
          $(this).remove();
        });
      }
    }
  });
var AppRouter = Backbone.Router.extend({

    self: this,

    routes: {
      ""                      :"home",
      "projects"              :"projectsList",
      "projects/new"          :"projectNew",
      "projects/:id"          :"projectDetail",
      "projects/:projectId/resources/assign" :"assignResources",
      "projects/page/:page"   :"projectsList",
      "resources"              :"resourcesList",
      "resources/new"          :"resourceNew",
      "resources/:id"          :"resourceDetail",
      "resources/page/:page"   :"resourcesList",
    },

    initialize: function () {
        this.contentView = new AppView();
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function() {
      if (!this.homeView) {
        this.homeView = new HomeView();
      }
      this.contentView.showView(this.homeView);
      this.headerView.selectMenuItem('home-menu');
    },

    projectsList: function(page) {
      var p = page ? parseInt(page, 10) : 1;
      var projectslist = new ProjectCollection();
      var self = this;
      projectslist.fetch({success: function(){
        self.contentView.showView(new ProjectsListView({model:projectslist, page: p}));
      }});
      this.headerView.selectMenuItem('projects-menu');
    },

    projectNew: function() {
      var project = new Project();
      this.contentView.showView(new ProjectView({model: project}));
      this.headerView.selectMenuItem('projects-menu');
    },

    projectDetail: function(id) {
      var project = new Project({id: id});
      var self = this;
      project.fetch({success: function() {
        self.contentView.showView(new ProjectView({model: project}));
      }
      });
      this.headerView.selectMenuItem('projects-menu');
    },

    resourcesList: function(page) {
      var p = page ? parseInt(page, 10) : 1;
      var resourceslist = new ResourceCollection();
      var self = this;
      resourceslist.fetch({success: function(){
        self.contentView.showView(new ResourcesListView({model:resourceslist, page: p}));
      }});
      this.headerView.selectMenuItem('resources-menu');
    },

    resourceNew: function() {
      var resource = new Resource();
      this.contentView.showView(new ResourceView({model: resource}));
      this.headerView.selectMenuItem('resources-menu');
    },

    resourceDetail: function(id) {
      var resource = new Resource({id: id});
      var self = this;
      resource.fetch({success: function() {
        self.contentView.showView(new ResourceView({model: resource}));
      }
      });
      this.headerView.selectMenuItem('resources-menu');
    },

    assignResources: function(projectId) {
      console.log("add resource to project");
      var project = new Project({id: projectId});
      var self = this;
      project.fetch({success: function() {

        var resourceslist = new ResourceCollection();
        resourceslist.fetch({success: function(){
          self.contentView.showView(new AssignResourcesView({model: {project: project, resources: resourceslist}}));
        }});
      }
      });
    }

});

utils.loadTemplate(['HeaderView', 
                    'HomeView', 
                    'ProjectsListItemView',
                    'ProjectsListView',
                    'ProjectView',
                    'ResourcesListItemView', 
                    'ResourcesListView', 
                    'ResourceView',
                    'AssignResourcesView',
                    'SelectResourceItemView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
