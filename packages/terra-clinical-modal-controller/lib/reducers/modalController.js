'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _disclosureUtils = require('./disclosureUtils');

var _modalController = require('../actions/modalController');

var supportedSizes = {
  tiny: 'tiny',
  small: 'small',
  medium: 'medium',
  large: 'large',
  huge: 'huge'
};

var defaultModalState = _extends({}, _disclosureUtils.defaultState, {
  size: supportedSizes.small
});
var modalController = function modalController() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultModalState;
  var action = arguments[1];

  switch (action.type) {
    case _modalController.DISCLOSE_MODAL:
      return _extends({}, (0, _disclosureUtils.disclose)(state, action), { size: action.data.size || supportedSizes.small });
    case _modalController.DISMISS_MODAL:
      return defaultModalState;
    case _modalController.PUSH_MODAL:
      return (0, _disclosureUtils.push)(state, action);
    case _modalController.POP_MODAL:
      return (0, _disclosureUtils.pop)(state, action);
    case _modalController.MAXIMIZE_MODAL:
      return (0, _disclosureUtils.maximize)(state, action);
    case _modalController.MINIMIZE_MODAL:
      return (0, _disclosureUtils.minimize)(state, action);
    default:
      return state;
  }
};

exports.default = modalController;