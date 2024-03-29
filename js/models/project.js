var ls = new Backbone.LocalStorage("Projects");

window.Project = Backbone.Model.extend({
  initialize: function () {
    this.validators = {};

    this.validators.code= function (value) {
      return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a project code"};
    };

    this.validators.name = function (value) {
      return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
    };

    this.validators.budget = function (value) {
      return value > 0 ? {isValid: true} : {isValid: false, message: "You must enter a valid budget"};
    };
  },

validateItem: function (key) {
  return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
},

  // TODO: Implement Backbone's standard validate() method instead.
  validateAll: function () {

    var messages = {};

    for (var key in this.validators) {
      if(this.validators.hasOwnProperty(key)) {
        var check = this.validators[key](this.get(key));
        if (check.isValid === false) {
          messages[key] = check.message;
        }
      }
    }

    return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
  },

  defaults: {
    id: undefined,
    code: "",
    name: "",
    budget: 0,
    description: "",
  },

  localStorage: ls,
});

window.ProjectCollection = Backbone.Collection.extend({
  model: Project,
  localStorage: ls,
});
