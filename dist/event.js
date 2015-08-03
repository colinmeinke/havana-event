'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = new WeakMap();

var Event = (function () {
  function Event() {
    _classCallCheck(this, Event);

    var props = {
      'token': 0,
      'subs': []
    };

    _.set(this, props);
  }

  _createClass(Event, [{
    key: 'publish',
    value: function publish(name) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var subs = _.get(this).subs;

      for (var i = 0; i < subs.length; i++) {
        if (name === subs[i].name) {
          subs[i].callback.call(null, data);
        }
      }
    }
  }, {
    key: 'subscribe',
    value: function subscribe(name, callback) {
      var token = _.get(this).token++;

      _.get(this).subs.push({
        'token': token,
        'name': name,
        'callback': callback
      });

      return token;
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(token) {
      var subs = _.get(this).subs;

      for (var i = 0; i < subs.length; i++) {
        if (token === subs[i].token) {
          subs.splice(i, 1);
          i--;
        }
      }
    }
  }]);

  return Event;
})();

exports['default'] = Event;
module.exports = exports['default'];