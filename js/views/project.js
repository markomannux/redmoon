window.ProjectView = Backbone.DisposableView.extend({

    initialize: function () {
      this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
      "change"        :"change",
      "click .save"   :"beforeSave",
      "click .delete" :"deleteProject"
    },

    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        console.log(change);
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },

    beforeSave: function() {
      var self = this;
      var check = this.model.validateAll();
      if (check.isValid === false) {
        utils.displayValidationErrors(check.messages);
        return false;
      }
      this.saveProject();
      return false;
    },

    saveProject: function () {
        var self = this;
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('projects/' + model.id, false);
                utils.showAlert('Success!', 'Project saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to create this item', 'alert-error');
            }
        });
    },

    deleteProject: function () {
      $('#confirmDelete').modal('hide');
      this.model.destroy({
        success: function () {
          alert('Project deleted successfully');
          window.history.back();
        }
      });
    },
});
