'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalHandler = function ModalHandler() {
  var _this = this;

  (0, _classCallCheck3.default)(this, ModalHandler);
  this.callBacks = [];
  this.suggestionCallback = undefined;
  this.editorFlag = false;
  this.suggestionFlag = false;

  this.closeAllModals = function (event) {
    _this.callBacks.forEach(function (callBack) {
      callBack(event);
    });
  };

  this.init = function (wrapperId) {
    var wrapper = document.getElementById(wrapperId); // eslint-disable-line no-undef
    if (wrapper) {
      wrapper.addEventListener('click', function () {
        _this.editorFlag = true;
      });
    }
    if (document) {
      document.addEventListener('click', function () {
        // eslint-disable-line no-undef
        if (!_this.editorFlag) {
          _this.closeAllModals();
          if (_this.suggestionCallback) {
            _this.suggestionCallback();
          }
        } else {
          _this.editorFlag = false;
        }
      });
      document.addEventListener('keydown', function (event) {
        // eslint-disable-line no-undef
        if (event.key === 'Escape') {
          _this.closeAllModals();
        }
      });
    }
  };

  this.onEditorClick = function () {
    _this.closeModals();
    if (!_this.suggestionFlag && _this.suggestionCallback) {
      _this.suggestionCallback();
    } else {
      _this.suggestionFlag = false;
    }
  };

  this.closeModals = function (event) {
    _this.closeAllModals(event);
  };

  this.registerCallBack = function (callBack) {
    _this.callBacks.push(callBack);
  };

  this.deregisterCallBack = function (callBack) {
    _this.callBacks = _this.callBacks.filter(function (cb) {
      return cb !== callBack;
    });
  };

  this.setSuggestionCallback = function (callBack) {
    _this.suggestionCallback = callBack;
  };

  this.removeSuggestionCallback = function () {
    _this.suggestionCallback = undefined;
  };

  this.onSuggestionClick = function () {
    _this.suggestionFlag = true;
  };
};

exports.default = ModalHandler;