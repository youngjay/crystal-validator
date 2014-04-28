var _ = require('lodash');
var mixin = require('mixin-class');
var ko = require('knockout');
var peekObservable = ko.utils.peekObservable;

module.exports = mixin(
    function(model, key, validators) {
        this.model = model;
        this.key = key;
        this.validators = validators;
        this.messages = ko.observableArray();

        var self = this;
        this.isValid = ko.computed(function() {
            return self.messages().length === 0;
        });
    },
    {
        validate: function() {
            var model = this.model;
            var ob = model[this.key];

            if (!ob) {
                return;
            }

            var value = peekObservable(ob);
      
            this.messages(this.validators.reduce(function(msgs, fn) {
                var msg = fn(value, model);
                if (msg) {
                    msgs.push(msg)
                }
                return msgs;
            }, []));
        },

        clear: function() {
            this.messages([]);
        }
    }
);
