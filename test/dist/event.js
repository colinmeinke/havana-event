/* global describe before beforeEach it */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _distEventServerWithPolyfill = require('../../dist/event.server.with-polyfill');

var _distEventServerWithPolyfill2 = _interopRequireDefault(_distEventServerWithPolyfill);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var expect = _chai2['default'].expect;

describe('Event', function () {
  var event = undefined,
      callbacks = undefined,
      hello = undefined,
      world = undefined;

  before(function () {
    event = new _distEventServerWithPolyfill2['default']();
  });

  beforeEach(function () {
    callbacks = [];
  });

  describe('_', function () {
    it('should be private', function () {
      expect(event).to.not.have.property('_');
    });
  });

  describe('token', function () {
    it('should be private', function () {
      expect(event).to.not.have.property('token');
    });
  });

  describe('subs', function () {
    it('should be private', function () {
      expect(event).to.not.have.property('subs');
    });
  });

  describe('subscribe()', function () {
    it('should return unique tokens', function () {
      hello = event.subscribe('helloWorld', function () {
        callbacks.push('hello');
      });

      world = event.subscribe('helloWorld', function () {
        callbacks.push('world');
      });

      expect(hello).to.not.equal(world);
    });
  });

  describe('publish()', function () {
    it('should fire subscriber callbacks', function () {
      event.publish('helloWorld');
      expect(callbacks).to.include.members(['hello', 'world']);
    });
  });

  describe('unsubscribe()', function () {
    it('should remove subscriber callbacks', function () {
      event.unsubscribe(hello);
      event.unsubscribe(world);

      event.publish('helloWorld');

      expect(callbacks.length).to.equal(0);
    });
  });
});