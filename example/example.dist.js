(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _core = _interopRequireDefault(require("@keyframes/core"));

var _keyframes = _interopRequireDefault(require("../src/keyframes.spritesheet"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

_core.default.plugin(_keyframes.default);

window.onload = function () {
  var ss = _core.default.spriteSheet({
    name: 'gem',
    rows: 6,
    cols: 7,
    width: 210,
    height: 180,
    offsetX: 0,
    offsetY: 0,
    count: 39
  });

  var container = new _core.default(document.querySelectorAll('.spriteContainer')[0]);
  container.playSpriteSheet('gem', '3s', -1, ss);
};

},{"../src/keyframes.spritesheet":3,"@keyframes/core":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Keyframes =
/*#__PURE__*/
function () {
  function Keyframes(elem) {
    _classCallCheck(this, Keyframes);

    this.elem = elem;
  }

  _createClass(Keyframes, [{
    key: "isSupported",
    value: function isSupported() {
      return document.body.style.animationName !== undefined;
    }
  }, {
    key: "reset",
    value: function reset(callback) {
      this.elem.style.animationPlayState = 'running';
      this.elem.style.animation = 'none';

      if (callback) {
        setTimeout(callback, 0);
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      this.elem.style.animationPlayState = 'paused';
    }
  }, {
    key: "resume",
    value: function resume() {
      this.elem.style.animationPlayState = 'running';
    }
  }, {
    key: "play",
    value: function play(frameOptions, callback) {
      var _this = this;

      var animObjToStr = function animObjToStr(obj) {
        var newObj = Object.assign({}, {
          duration: '0s',
          timingFunction: 'ease',
          delay: '0s',
          iterationCount: 1,
          direction: 'normal',
          fillMode: 'forwards'
        }, obj);
        return [newObj.name, newObj.duration, newObj.timingFunction, newObj.delay, newObj.iterationCount, newObj.direction, newObj.fillMode].join(' ');
      };

      var animationcss = '';

      if (frameOptions.constructor === Array) {
        var frameOptionsStrings = [];

        for (var i = 0; i < frameOptions.length; i += 1) {
          frameOptionsStrings.push(typeof frameOptions[i] === 'string' ? frameOptions[i] : animObjToStr(frameOptions[i]));
        }

        animationcss = frameOptionsStrings.join(', ');
      } else if (typeof frameOptions === 'string') {
        animationcss = frameOptions;
      } else {
        animationcss = animObjToStr(frameOptions);
      }

      var addEvent = function addEvent(type, eventCallback) {
        var listenerName = "".concat(type, "Listener");

        _this.elem.removeEventListener(type, _this[listenerName]);

        _this[listenerName] = eventCallback;

        _this.elem.addEventListener(type, _this[listenerName]);
      };

      this.elem.style.animationPlayState = 'running';
      this.elem.style.animation = animationcss;
      this.frameOptions = frameOptions;
      addEvent('animationiteration', callback || frameOptions.complete);
      addEvent('animationend', callback || frameOptions.complete);
    }
  }], [{
    key: "createKeyframeTag",
    value: function createKeyframeTag(id, css) {
      var elem = document.createElement('style');
      elem.innerHTML = css;
      elem.setAttribute('class', 'keyframe-style');
      elem.setAttribute('id', id);
      elem.setAttribute('type', 'text/css');
      document.getElementsByTagName('head')[0].appendChild(elem);
    }
  }, {
    key: "generate",
    value: function generate(frameData) {
      var frameName = frameData.name || '';
      var css = "@keyframes ".concat(frameName, " {");

      for (var key in frameData) {
        if (key !== 'name' && key !== 'media' && key !== 'complete') {
          css += "".concat(key, " {");

          for (var property in frameData[key]) {
            css += "".concat(property, ":").concat(frameData[key][property], ";");
          }

          css += '}';
        }
      }

      if (frameData.media) {
        css = "@media ".concat(frameData.media, "{").concat(css, "}");
      }

      var frameStyle = document.getElementById(frameName);

      if (frameStyle) {
        frameStyle.innerHTML = css;
      } else {
        Keyframes.createKeyframeTag(frameName, css);
      }
    }
  }, {
    key: "define",
    value: function define(frameData) {
      if (frameData.length) {
        for (var i = 0; i < frameData.length; i += 1) {
          this.generate(frameData[i]);
        }
      } else {
        this.generate(frameData);
      }
    }
  }, {
    key: "plugin",
    value: function plugin(pluginFunc) {
      pluginFunc(Keyframes);
    }
  }]);

  return Keyframes;
}();

exports.default = Keyframes;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(Keyframes) {
  Keyframes.spriteSheets = {};

  Keyframes.spriteSheet = function (opts) {
    var defaults = {
      name: '',
      rows: 1,
      cols: 1,
      height: 0,
      width: 0,
      offsetX: 0,
      offsetY: 0,
      count: opts.rows * opts.cols,
      spriteWidth: opts.width / opts.cols,
      spriteHeight: opts.height / opts.rows,
      loop: true
    };
    opts = Object.assign({}, defaults, opts);
    Keyframes.spriteSheets[opts.name] = opts;
    var spriteStep = 100 / opts.count;
    var spriteFrames = {};
    var x = opts.offsetX;
    var y = opts.offsetY;

    for (var i = 0; i < opts.count; i += 1) {
      spriteFrames["".concat(Math.round(spriteStep * i), "%")] = {
        'background-position': "-".concat(x, "px -").concat(y, "px")
      };

      if (x >= opts.width - opts.spriteWidth) {
        y += opts.spriteHeight;
        x = opts.offsetX;
      } else {
        x += opts.spriteWidth;
      }
    }

    return Object.assign({}, {
      name: opts.name
    }, spriteFrames);
  };

  Keyframes.prototype.playSpriteSheet = function (name, time, loops, keyframes) {
    if (keyframes) {
      Keyframes.define(keyframes);
    }

    if (loops) {
      if (loops < 0) {
        loops = 'infinite';
      }
    } else {
      loops = 'infinite';
    }

    var animate = "".concat(name, " ").concat(time, " steps(1) ").concat(loops);
    var existingAnimation = this.elem.style.animation;

    if (existingAnimation && existingAnimation.split(' ')[0] !== 'none') {
      animate = "".concat(existingAnimation, ", ").concat(animate);
    }

    this.elem.style.animation = animate;
    return this;
  };
};

exports.default = _default;

},{}]},{},[1]);
