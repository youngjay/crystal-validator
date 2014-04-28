var _ = require('lodash');
var mixin = require('mixin-class');
var ko = require('knockout');
var peekObservable = ko.utils.peekObservable;

var Validator = require('./lib/validator')

var nullValidator = new Validator();
nullValidator.validate = function() {};

var Factory = mixin(
        function(model, config) {
            var self = this;
            var validatorsObject = this.validators = {};
            _.each(config, function(validators, key) {
                validatorsObject[key] = self[key] = new self.Validator(model, key, validators);
            });

            this.isValid = ko.computed(function() {
                var isValid = true;
                _.each(validatorsObject, function(validator) {
                    if (!validator.isValid()) {
                        isValid = false;
                    }
                });
                return isValid;
            });
        },
        {
            Validator: Validator,

            validate: function() {
                _.each(this.validators, function(validator) {
                    validator.validate();
                });
            },

            clear: function() {
                _.each(this.validators, function(validator) {
                    validator.clear();
                });
            }
        }
    )

Factory.nullValidator = nullValidator;
Factory.handler = require('./lib/validate-handlers')

module.exports = Factory;