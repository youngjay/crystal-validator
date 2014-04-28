var Validator = require('../');
var ko = require('knockout');
var assert = require('assert');

describe('Validator', function() {
    var model = {
        name: ko.observable(),
        value: ko.observable()
    };

    var validateConfig = {
        name: [function(value) {
                if (value === '') {
                    return '不能为空'
                }
            }, function(value) {
                if (value.length > 10) {
                    return '不能大于10'
                }
            }],
        value: [function(value) {
                if (value === '') {
                    return '不能为空'
                }
            }, function(value) {
            if (value.length < 4) {
                return 'too short'
            }
        }]
    }

    beforeEach(function() {
        model.name('');
        model.value('');
    })

    it('isValid should be true on init', function() {
        var v = Validator.create(model, validateConfig);

        assert.equal(v.isValid(), true)
        assert.equal(v.name.isValid(), true)
    })

    it('isValid should be true if all validators are passed', function() {
        var v = Validator.create(model, validateConfig);

        model.name('jay');
        model.value('xxxxx')

        v.validate();

        assert.equal(v.isValid(), true)
        assert.equal(v.name.isValid(), true)

    });

        it('isValid should be true if any validator is failed', function() {
        var v = Validator.create(model, validateConfig);

        model.name('jay');
        model.value('x')

        v.validate();

        assert.equal(v.isValid(), false)
        assert.equal(v.name.isValid(), true)
        assert.equal(v.value.isValid(), false)

    });

})