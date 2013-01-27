var ls = new Backbone.LocalStorage("Resources");

window.Resource = Backbone.Model.extend({
  initialize: function () {
    this.validators = {};

    this.validators.code= function (value) {
      return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a resource code"};
    };

    this.validators.firstName= function (value) {
      return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter first name"};
    };

    this.validators.lastName= function (value) {
      return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter last name"};
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

    console.log(messages);
    return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
  },

  defaults: {
    id: undefined,
    code: "",
    firstName: "",
    lastName: "",
  },

  localStorage: ls,
});

window.ResourceCollection = Backbone.Collection.extend({
  model: Resource,
  localStorage: ls,
});
