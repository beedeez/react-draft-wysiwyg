"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlePastedText = undefined;

var _draftjsUtils = require("draftjs-utils");

var _draftJs = require("draft-js");

var _htmlToDraftjs = require("html-to-draftjs");

var _htmlToDraftjs2 = _interopRequireDefault(_htmlToDraftjs);

var _immutable = require("immutable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handlePastedText = exports.handlePastedText = function handlePastedText(text, html, editorState, onChange) {
  var selectedBlock = (0, _draftjsUtils.getSelectedBlock)(editorState);
  if (selectedBlock && selectedBlock.type === "code") {
    var contentState = _draftJs.Modifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), text, editorState.getCurrentInlineStyle());
    onChange(_draftJs.EditorState.push(editorState, contentState, "insert-characters"));
    return true;
  } else if (html) {
    var contentBlock = (0, _htmlToDraftjs2.default)(html);
    var _contentState = editorState.getCurrentContent();
    contentBlock.entityMap.forEach(function (value, key) {
      _contentState = _contentState.mergeEntityData(key, value);
    });
    _contentState = _draftJs.Modifier.replaceWithFragment(_contentState, editorState.getSelection(), new _immutable.List(contentBlock.contentBlocks));
    onChange(_draftJs.EditorState.push(editorState, _contentState, "insert-characters"));
    return true;
  }
  return false;
};