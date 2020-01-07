
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.TVNavigation = factory());
}(this, (function () { 'use strict';

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  /**
   * The Minkowski distance between two points gets generalized
   * metric distance
   * when p === 1, this becomes same as Manhattan Distance
   * when p === 2, this becomes same as Euclidean Distance
   * when p === Positive or Negative Infinity,
   *  this becomes chebyshev distance
   *
   * @public
   *
   * @example
   * var dist = require('path-to-algorithms/src/others/' +
   * 'minkowski-distance').minkowskiDistance;
   * console.log(dist([0, 1], [1, 1], 2)); // 1
   *
   * @param {Array} x source point
   * @param {Array} y target point
   * @param {Number} p order of Minkowski distance
   * @returns {Number} distance between two points, if distance
   * is NaN, then this returns 0
   */

  var MinkowskiDistance = function () {
    function MinkowskiDistance() {
      _classCallCheck(this, MinkowskiDistance);
    }

    _createClass(MinkowskiDistance, [{
      key: 'chebyshevDistance',
      value: function chebyshevDistance(x, y, lx, p, mathfn) {
        var result = -p;
        var i = void 0;
        for (i = 0; i < lx; i += 1) {
          result = mathfn(result, Math.abs(x[i] - y[i]));
        }return result;
      }
    }, {
      key: 'minkowskiDistance',
      value: function minkowskiDistance(x, lx, y, ly, p) {
        var d = void 0,
            i = void 0;
        if (lx !== ly) throw new Error('Both vectors should have same dimension');

        if (isNaN(p)) throw new Error('The order "p" must be a number');

        if (p === Number.POSITIVE_INFINITY) {
          return this.chebyshevDistance(x, y, lx, p, Math.max);
        } else if (p === Number.NEGATIVE_INFINITY) {
          return this.chebyshevDistance(x, y, lx, p, Math.min);
        } else if (p < 1) {
          throw new Error('Order less than 1 will violate the triangle inequality');
        } else {
          d = 0;
          for (i = 0; i < lx; i += 1) {
            d += Math.pow(Math.abs(x[i] - y[i]), p);
          }return isNaN(d) ? 0 : Math.pow(d, 1 / p);
        }
      }
    }, {
      key: 'calculate',
      value: function calculate(x, y) {
        var p = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

        return this.minkowskiDistance(x, x.length, y, y.length, p);
      }
    }]);

    return MinkowskiDistance;
  }();

  var MinkowskiDistance$1 = new MinkowskiDistance();

  var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var GlobalConfig = {
    selector: '', // can be a valid <extSelector> except "@" syntax.
    straightOnly: false,
    straightOverlapThreshold: 0.35,
    rememberSource: false,
    disabled: false,
    defaultElement: '', // <extSelector> except "@" syntax.
    enterTo: '', // '', 'last-focused', 'default-element'
    leaveFor: null, // {left: <extSelector>, right: <extSelector>, up: <extSelector>, down: <extSelector>}
    restrict: 'self-first', // 'self-first', 'self-only', 'none'
    tabIndexIgnoreList: [],
    navigableFilter: null

    /**
     * Constant Variable
     */
  };var KEYMAPPING = {
    4: 'left',
    21: 'left',
    37: 'left',
    214: 'left',
    205: 'left',
    218: 'left',
    5: 'right',
    22: 'right',
    39: 'right',
    213: 'right',
    206: 'right',
    217: 'right',
    29460: 'up',
    19: 'up',
    38: 'up',
    211: 'up',
    203: 'up',
    215: 'up',
    29461: 'down',
    20: 'down',
    40: 'down',
    212: 'down',
    204: 'down',
    216: 'down',
    29443: 'enter',
    13: 'enter',
    67: 'enter',
    32: 'enter',
    23: 'enter',
    195: 'enter'
  };

  var REVERSE = {
    left: 'right',
    up: 'down',
    right: 'left',
    down: 'up'
  };

  var EVENT_PREFIX = 'sn:';
  var ID_POOL_PREFIX = 'section-';

  /**
   * Private Variable
   */
  var _idPool = 0;
  var _ready = false;
  var _pause = false;
  var _sections = {};
  var _sectionCount = 0;
  var _defaultSectionId = '';
  var _lastSectionId = '';
  var _duringFocusChange = false;

  /**
   * Polyfill
   */
  var elementMatchesSelector = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || function (selector) {
    var matchedNodes = (this.parentNode || this.document).querySelectorAll(selector);
    return [].slice.call(matchedNodes).indexOf(this) >= 0;
  };

  /**
   * Core Function
   */
  var getRect = function getRect(element) {
    var cr = element.getBoundingClientRect();
    var rect = {
      left: cr.left,
      top: cr.top,
      right: cr.right,
      bottom: cr.bottom,
      width: cr.width,
      height: cr.height
    };
    rect.element = element;
    rect.center = {
      x: rect.left + Math.floor(rect.width / 2),
      y: rect.top + Math.floor(rect.height / 2)
    };
    rect.center.left = rect.center.x;
    rect.center.right = rect.center.x;
    rect.center.top = rect.center.y;
    rect.center.bottom = rect.center.y;
    return rect;
  };

  var generateDistanceFunction = function generateDistanceFunction(fromRect) {
    return {
      nearestIsBetter: function nearestIsBetter(toRect) {
        var targetXY = [fromRect.center.x, fromRect.center.y];
        var d = MinkowskiDistance$1.calculate(targetXY, [toRect.center.x, toRect.center.y]);
        // console.log('>>>> nearestIsBetter ', toRect.element.id, d)
        return d;
      },
      nearPlumbLineIsBetter: function nearPlumbLineIsBetter(toRect) {
        var d = void 0;
        if (toRect.center.x < fromRect.center.x) d = fromRect.center.x - toRect.right;else d = toRect.left - fromRect.center.x;
        // console.log('>>>> nearPlumbLineIsBetter ', toRect.element.id, d)
        return d < 0 ? 0 : d;
      },
      nearHorizonIsBetter: function nearHorizonIsBetter(toRect) {
        var d = void 0;
        if (toRect.center.y < fromRect.center.y) d = fromRect.center.y - toRect.bottom;else d = toRect.top - fromRect.center.y;
        // console.log('>>>> nearHorizonIsBetter ', toRect.element.id, d)
        return d < 0 ? 0 : d;
      },
      nearTargetLeftIsBetter: function nearTargetLeftIsBetter(toRect) {
        var d = void 0;
        if (toRect.center.x < fromRect.center.x) d = fromRect.left - toRect.right;else d = toRect.left - fromRect.left;
        // console.log('>>>> nearTargetLeftIsBetter ', toRect.element.id, d)
        return d < 0 ? 0 : d;
      },
      nearTargetTopIsBetter: function nearTargetTopIsBetter(toRect) {
        var d = void 0;
        if (toRect.center.y < fromRect.center.y) d = fromRect.top - toRect.bottom;else d = toRect.top - fromRect.top;
        // console.log('>>>> nearTargetTopIsBetter ', toRect.element.id, d)
        return d < 0 ? 0 : d;
      },
      topIsBetter: function topIsBetter(toRect) {
        return toRect.top;
      },
      bottomIsBetter: function bottomIsBetter(toRect) {
        return -1 * toRect.bottom;
      },
      leftIsBetter: function leftIsBetter(toRect) {
        return toRect.left;
      },
      rightIsBetter: function rightIsBetter(toRect) {
        return -1 * toRect.right;
      }
    };
  };

  var prioritize = function prioritize(priorities) {
    var destPriority = void 0;

    for (var i = 0; i < priorities.length; i++) {
      if (priorities[i].group.length) {
        destPriority = priorities[i];
        break;
      }
    }if (!destPriority) return null;

    var destDistance = destPriority.distance;

    destPriority.group.sort(function (a, b) {
      for (var _i = 0; _i < destDistance.length; _i++) {
        var distance = destDistance[_i];
        var delta = distance(a) - distance(b);
        if (delta) return delta;
      }
      return 0;
    });

    return destPriority.group;
  };

  var navigate = function navigate(target, direction, candidates, config) {
    if (!target || !direction || !candidates || !candidates.length) return null;

    var targetRect = getRect(target);
    if (!targetRect) return null;

    var rects = [];
    candidates.forEach(function (candidate) {
      var rect = getRect(candidate);
      if (rect) rects.push(rect);
    });

    if (!rects.length) return null;

    var distanceFunction = generateDistanceFunction(targetRect);

    var priorities = void 0;

    switch (direction) {
      case 'left':
        rects = rects.filter(function (element) {
          return element.center.x < targetRect.center.x;
        });
        priorities = [{
          group: rects,
          distance: [distanceFunction.nearHorizonIsBetter, distanceFunction.nearestIsBetter, distanceFunction.topIsBetter]
        }];
        break;
      case 'right':
        rects = rects.filter(function (element) {
          return element.center.x > targetRect.center.x;
        });
        priorities = [{
          group: rects,
          distance: [distanceFunction.nearHorizonIsBetter, distanceFunction.nearestIsBetter, distanceFunction.topIsBetter]
        }];
        break;
      case 'up':
        rects = rects.filter(function (element) {
          return element.center.y < targetRect.center.y;
        });
        priorities = [{
          group: rects,
          distance: [distanceFunction.nearestIsBetter, distanceFunction.nearHorizonIsBetter, distanceFunction.leftIsBetter]
        }];
        break;
      case 'down':
        rects = rects.filter(function (element) {
          return element.center.y > targetRect.center.y;
        });
        priorities = [{
          group: rects,
          distance: [distanceFunction.nearestIsBetter, distanceFunction.nearPlumbLineIsBetter, distanceFunction.topIsBetter, distanceFunction.nearTargetLeftIsBetter]
        }];
        break;
      default:
        return null;
    }

    if (config.straightOnly) priorities.pop();

    var destGroup = prioritize(priorities);
    if (!destGroup) return null;

    var dest = void 0;
    if (config.rememberSource && config.previous && config.previous.destination === target && config.previous.reverse === direction) for (var destination in destGroup) {
      if (destination.element === config.previous.target) {
        dest = destination.element;
        break;
      }
    }if (!dest) dest = destGroup[0].element;

    // dest = rects && rects.length && rects[0].element
    // console.log('>>> dest ', dest)

    return dest;
  };

  /**
   * Private Function
   */
  var generateId = function generateId() {
    var id = void 0;
    do {
      id = ID_POOL_PREFIX + String(++_idPool);
    } while (_sections[id]);
    return id;
  };

  var parseSelector = function parseSelector(selector) {
    var result = void 0;
    if (typeof selector === 'string') result = [].slice.call(document.querySelectorAll(selector));else if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object' && selector.length) result = [].slice.call(selector);else if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object' && selector.nodeType === 1) result = [selector];else result = [];
    return result;
  };

  var matchSelector = function matchSelector(element, selector) {
    if (typeof selector === 'string') return elementMatchesSelector.call(element, selector);else if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object' && selector.length) return selector.indexOf(element) >= 0;else if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object' && selector.nodeType === 1) return element === selector;
    return false;
  };

  var getCurrentFocusedElement = function getCurrentFocusedElement() {
    var _document = document,
        activeElement = _document.activeElement;

    if (activeElement && activeElement !== document.body) return activeElement;
  };

  var extend = function extend(config) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var out = config || {};
    for (var i = 1; i < args.length; i++) {
      if (!args[i]) continue;
      for (var key in args[i]) {
        if (Object.prototype.hasOwnProperty.call(args[i], key) && args[i][key] !== undefined) out[key] = args[i][key];
      }
    }
    return out;
  };

  var exclude = function exclude(elemList, excludedElem) {
    for (var element in Array.from(excludedElem)) {
      var index = elemList.indexOf(element);
      if (index >= 0) elemList.splice(index, 1);
    }
    return elemList;
  };

  var isNavigable = function isNavigable(element, sectionId, verifySectionSelector) {
    if (!element || !sectionId || !_sections[sectionId] || _sections[sectionId].disabled) return false;

    if (element.offsetWidth <= 0 && element.offsetHeight <= 0 || element.hasAttribute('disabled')) return false;

    if (verifySectionSelector && !matchSelector(element, _sections[sectionId].selector)) return false;

    if (typeof _sections[sectionId].navigableFilter === 'function') {
      if (_sections[sectionId].navigableFilter(element, sectionId) === false) return false;
    } else if (typeof GlobalConfig.navigableFilter === 'function') {
      if (GlobalConfig.navigableFilter(element, sectionId) === false) return false;
    }
    return true;
  };

  var getSectionId = function getSectionId(element) {
    for (var id in _sections) {
      if (!_sections[id].disabled && element && matchSelector(element, _sections[id].selector)) return id;
    }
  };

  var getSectionNavigableElements = function getSectionNavigableElements(sectionId) {
    return parseSelector(_sections[sectionId].selector).filter(function (element) {
      return isNavigable(element, sectionId);
    });
  };

  var getSectionDefaultElement = function getSectionDefaultElement(sectionId) {
    var defaultElement = _sections[sectionId].defaultElement;

    if (!defaultElement) return null;

    if (typeof defaultElement === 'string') {

      var _parseSelector = parseSelector(defaultElement);

      var _parseSelector2 = _slicedToArray(_parseSelector, 1);

      defaultElement = _parseSelector2[0];
    }if (isNavigable(defaultElement, sectionId, true)) return defaultElement;

    return null;
  };

  var getSectionLastFocusedElement = function getSectionLastFocusedElement(sectionId) {
    var lastFocusedElement = _sections[sectionId] && _sections[sectionId].lastFocusedElement;
    if (!isNavigable(lastFocusedElement, sectionId, true)) return null;

    return lastFocusedElement;
  };

  var fireEvent = function fireEvent(element, type, details) {
    var cancelable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(EVENT_PREFIX + type, true, cancelable, details);
    return element.dispatchEvent(evt);
  };

  var focusChanged = function focusChanged(element, sectionId) {
    var section = sectionId || getSectionId(element);

    if (section) {
      _sections[section].lastFocusedElement = element;
      _lastSectionId = section;
    }
  };

  var focusElement = function focusElement(element, sectionId, direction) {
    if (!element) return false;

    var currentFocusedElement = getCurrentFocusedElement();

    var silentFocus = function silentFocus() {
      if (currentFocusedElement) currentFocusedElement.blur();

      element.focus();
      focusChanged(element, sectionId);
    };

    if (_duringFocusChange) {
      silentFocus();
      return true;
    }

    _duringFocusChange = true;

    if (_pause) {
      silentFocus();
      _duringFocusChange = false;
      return true;
    }

    if (currentFocusedElement) {
      var unfocusProperties = {
        nextElement: element,
        nextSectionId: sectionId,
        direction: direction,
        native: false
      };
      if (!fireEvent(currentFocusedElement, 'willunfocus', unfocusProperties)) {
        _duringFocusChange = false;
        return false;
      }
      currentFocusedElement.blur();
      fireEvent(currentFocusedElement, 'unfocused', unfocusProperties, false);
    }

    var focusProperties = {
      previousElement: currentFocusedElement,
      sectionId: sectionId,
      direction: direction,
      native: false
    };

    if (!fireEvent(element, 'willfocus', focusProperties)) {
      _duringFocusChange = false;
      return false;
    }

    element.focus();
    fireEvent(element, 'focused', focusProperties, false);

    _duringFocusChange = false;

    focusChanged(element, sectionId);
    return true;
  };

  var focusSection = function focusSection(sectionId) {
    var range = [];
    var addRange = function addRange(id) {
      if (id && range.indexOf(id) < 0 && _sections[id] && !_sections[id].disabled) range.push(id);
    };

    if (sectionId) {
      addRange(sectionId);
    } else {
      addRange(_defaultSectionId);
      addRange(_lastSectionId);
      Object.keys(_sections).map(addRange);
    }

    for (var i = 0; i < range.length; i++) {
      var id = range[i];
      var next = void 0;

      if (_sections[id].enterTo === 'last-focused') next = getSectionLastFocusedElement(id) || getSectionDefaultElement(id) || getSectionNavigableElements(id)[0];else next = getSectionDefaultElement(id) || getSectionLastFocusedElement(id) || getSectionNavigableElements(id)[0];

      if (next) return focusElement(next, id);
    }

    return false;
  };

  var focusExtendedSelector = function focusExtendedSelector(selector, direction) {
    if (selector.charAt(0) === '@') {
      if (selector.length === 1) return focusSection();
      var sectionId = selector.substr(1);
      return focusSection(sectionId);
    }

    var _parseSelector3 = parseSelector(selector),
        _parseSelector4 = _slicedToArray(_parseSelector3, 1),
        next = _parseSelector4[0];

    if (next) {
      var nextSectionId = getSectionId(next);
      if (isNavigable(next, nextSectionId)) return focusElement(next, nextSectionId, direction);
    }
    return false;
  };

  var fireNavigateFailed = function fireNavigateFailed(element, direction) {
    return fireEvent(element, 'navigatefailed', { direction: direction }, false);
  };

  var gotoLeaveFor = function gotoLeaveFor(sectionId, direction) {
    if (_sections[sectionId].leaveFor && _sections[sectionId].leaveFor[direction] !== undefined) {
      var next = _sections[sectionId].leaveFor[direction];

      if (typeof next === 'string') {
        if (next === '') return null;

        return focusExtendedSelector(next, direction);
      }

      var nextSectionId = getSectionId(next);
      if (isNavigable(next, nextSectionId)) return focusElement(next, nextSectionId, direction);
    }
    return false;
  };

  var focusNext = function focusNext(direction, currentFocusedElement, currentSectionId) {
    var extSelector = currentFocusedElement.getAttribute('data-sn-' + direction);
    if (typeof extSelector === 'string') {
      if (extSelector === '' || !focusExtendedSelector(extSelector, direction)) {
        fireNavigateFailed(currentFocusedElement, direction);
        return false;
      }
      return true;
    }

    var sectionNavigableElements = {};
    var allNavigableElements = [];
    for (var id in _sections) {
      sectionNavigableElements[id] = getSectionNavigableElements(id);
      allNavigableElements = allNavigableElements.concat(sectionNavigableElements[id]);
    }

    var config = extend({}, GlobalConfig, _sections[currentSectionId]);
    var next = void 0,
        candidates = void 0;

    if (config.restrict === 'self-only' || config.restrict === 'self-first') {
      var currentSectionNavigableElements = sectionNavigableElements[currentSectionId];
      candidates = exclude(currentSectionNavigableElements, currentFocusedElement);
      next = navigate(currentFocusedElement, direction, candidates, config);

      if (!next && config.restrict === 'self-first') {
        candidates = exclude(allNavigableElements, currentSectionNavigableElements);
        next = navigate(currentFocusedElement, direction, candidates, config);
      }
    } else {
      candidates = exclude(allNavigableElements, currentFocusedElement);
      next = navigate(currentFocusedElement, direction, candidates, config);
    }

    if (next) {
      _sections[currentSectionId].previous = {
        target: currentFocusedElement,
        destination: next,
        reverse: REVERSE[direction]
      };

      var nextSectionId = getSectionId(next);

      if (currentSectionId !== nextSectionId) {
        var result = gotoLeaveFor(currentSectionId, direction);
        if (result) {
          return true;
        } else if (result === null) {
          fireNavigateFailed(currentFocusedElement, direction);
          return false;
        }

        var enterToElement = void 0;
        switch (_sections[nextSectionId].enterTo) {
          case 'last-focused':
            enterToElement = getSectionLastFocusedElement(nextSectionId) || getSectionDefaultElement(nextSectionId);
            break;
          case 'default-element':
            enterToElement = getSectionDefaultElement(nextSectionId);
            break;
        }
        if (enterToElement) next = enterToElement;
      }
      return focusElement(next, nextSectionId, direction);
    } else if (gotoLeaveFor(currentSectionId, direction)) {
      return true;
    }

    fireNavigateFailed(currentFocusedElement, direction);
    return false;
  };

  var preventDefault = function preventDefault(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    return false;
  };

  var onMouseOver = function onMouseOver(evt) {
    var target = evt.target;

    if (!target || !target.classList.contains('focusable') && !target.closest('.focusable')) return;

    var element = target.classList.contains('focusable') ? target : target.closest('.focusable');

    focusElement(element, getSectionId(element));

    return preventDefault(evt);
  };

  var onMouseDown = function onMouseDown(evt) {
    var target = evt.target;

    if (!target || !target.classList.contains('focusable') && !target.closest('.focusable')) return;

    var element = target.classList.contains('focusable') ? target : target.closest('.focusable');

    if (!fireEvent(element, 'enter-down')) return preventDefault(evt);
  };

  var onKeyDown = function onKeyDown(evt) {
    if (!_sectionCount || _pause || evt.altKey || evt.ctrlKey || evt.metaKey || evt.shiftKey) return;

    var currentFocusedElement = getCurrentFocusedElement();
    var currentSectionId = getSectionId(currentFocusedElement);
    var keyMappping = KEYMAPPING[evt.keyCode];

    if (!keyMappping) return;

    if (keyMappping === 'enter') if (currentFocusedElement && currentSectionId) if (!fireEvent(currentFocusedElement, 'enter-down')) return preventDefault(evt);

    if (!currentFocusedElement) {
      if (_lastSectionId) currentFocusedElement = getSectionLastFocusedElement(_lastSectionId);

      if (!currentFocusedElement) {
        focusSection();
        return preventDefault(evt);
      }
    }

    if (!currentSectionId) return;

    var willmoveProperties = {
      direction: keyMappping,
      sectionId: currentSectionId,
      cause: 'keydown'
    };

    if (fireEvent(currentFocusedElement, 'willmove', willmoveProperties)) focusNext(keyMappping, currentFocusedElement, currentSectionId);

    return preventDefault(evt);
  };

  var onKeyUp = function onKeyUp(evt) {
    if (evt.altKey || evt.ctrlKey || evt.metaKey || evt.shiftKey) return;

    if (!_pause && _sectionCount && KEYMAPPING[evt.keyCode] === 'center') {
      var currentFocusedElement = getCurrentFocusedElement();
      if (currentFocusedElement && getSectionId(currentFocusedElement)) if (!fireEvent(currentFocusedElement, 'enter-up')) {
        preventDefault(evt);
      }
    }
  };

  var onFocus = function onFocus(evt) {
    var target = evt.target;

    if (target !== window && target !== document && _sectionCount && !_duringFocusChange) {
      var sectionId = getSectionId(target);
      if (sectionId) {
        if (_pause) {
          focusChanged(target, sectionId);
          return;
        }

        var focusProperties = {
          sectionId: sectionId,
          native: true
        };

        var willfocusSuccess = fireEvent(target, 'willfocus', focusProperties);
        if (willfocusSuccess) {
          fireEvent(target, 'focused', focusProperties, false);
          focusChanged(target, sectionId);
        } else {
          _duringFocusChange = true;
          target.blur();
          _duringFocusChange = false;
        }
      }
    }
  };

  var onBlur = function onBlur(evt) {
    var target = evt.target;

    if (target !== window && target !== document && !_pause && _sectionCount && !_duringFocusChange && getSectionId(target)) {
      var unfocusProperties = { native: true };
      var willunfocusSuccess = fireEvent(target, 'willunfocus', unfocusProperties);
      if (willunfocusSuccess) {
        fireEvent(target, 'unfocused', unfocusProperties, false);
      } else {
        _duringFocusChange = true;
        setTimeout(function () {
          target.focus();
          _duringFocusChange = false;
        });
      }
    }
  };

  /**
   * Public Function
   */
  var Navigation = {
    init: function init() {
      if (!_ready) {
        window.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('focus', onFocus, true);
        window.addEventListener('blur', onBlur, true);
        _ready = true;
      }
    },

    uninit: function uninit() {
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('blur', onBlur, true);
      window.removeEventListener('focus', onFocus, true);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('keydown', onKeyDown);
      Navigation.clear();
      _idPool = 0;
      _ready = false;
    },

    clear: function clear() {
      _sections = {};
      _sectionCount = 0;
      _defaultSectionId = '';
      _lastSectionId = '';
      _duringFocusChange = false;
    },

    // set(<config>)
    // set(<sectionId>, <config>)
    set: function set() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var sectionId = void 0,
          config = void 0;

      if (_typeof(args[0]) === 'object') {
        config = args[0];
      } else if (typeof args[0] === 'string' && _typeof(args[1]) === 'object') {
        sectionId = args[0];
        config = args[1];

        if (!_sections[sectionId]) throw new Error('Section ' + sectionId + ' doesn\'t exist!');
      } else {
        return;
      }

      for (var key in config) {
        if (GlobalConfig[key] !== undefined) if (sectionId) _sections[sectionId][key] = config[key];else if (config[key] !== undefined) GlobalConfig[key] = config[key];
      }
    },

    // add(<config>)
    // add(<sectionId>, <config>)
    add: function add() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var sectionId = void 0,
          config = void 0;

      if (_typeof(args[0]) === 'object') {
        config = args[0];
      } else if (typeof args[0] === 'string' && _typeof(args[1]) === 'object') {

        sectionId = args[0];
        config = args[1];
      }if (!sectionId) sectionId = typeof config.id === 'string' ? config.id : generateId();

      if (_sections[sectionId]) throw new Error('Section ' + sectionId + ' has already existed!');

      _sections[sectionId] = {};
      _sectionCount++;

      Navigation.set(sectionId, config);

      return sectionId;
    },

    remove: function remove(sectionId) {
      if (!sectionId || typeof sectionId !== 'string') throw new Error('Please assign the "sectionId"!');

      if (_sections[sectionId]) {
        _sections[sectionId] = undefined;
        _sections = extend({}, _sections);
        _sectionCount--;
        return true;
      }
      return false;
    },

    disable: function disable(sectionId) {
      if (_sections[sectionId]) {
        _sections[sectionId].disabled = true;
        return true;
      }
      return false;
    },

    enable: function enable(sectionId) {
      if (_sections[sectionId]) {
        _sections[sectionId].disabled = false;
        return true;
      }
      return false;
    },

    pause: function pause() {
      _pause = true;
    },

    resume: function resume() {
      _pause = false;
    },

    // focus([silent])
    // focus(<sectionId>, [silent])
    // focus(<extSelector>, [silent])
    // Note: "silent" is optional and default to false
    focus: function focus() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var element = args[0],
          silent = args[1];

      if (typeof element === 'boolean' && silent === undefined) {
        silent = element;
        element = undefined;
      }

      var autoPause = !_pause && silent;

      if (autoPause) Navigation.pause();

      var result = void 0;
      if (element) {
        if (typeof element === 'string') {
          result = _sections[element] ? focusSection(element) : focusExtendedSelector(element);
        } else {
          var nextSectionId = getSectionId(element);
          if (isNavigable(element, nextSectionId)) result = focusElement(element, nextSectionId);
        }
      } else result = focusSection();

      if (autoPause) Navigation.resume();

      return result;
    },

    // move(<direction>)
    // move(<direction>, <selector>)
    move: function move(dir, selector) {
      var direction = dir.toLowerCase();
      if (!REVERSE[direction]) return false;

      var element = selector ? parseSelector(selector)[0] : getCurrentFocusedElement();
      if (!element) return false;

      var sectionId = getSectionId(element);
      if (!sectionId) return false;

      var willmoveProperties = {
        direction: direction,
        sectionId: sectionId,
        cause: 'api'
      };

      if (!fireEvent(element, 'willmove', willmoveProperties)) return false;

      return focusNext(direction, element, sectionId);
    },

    // makeFocusable()
    // makeFocusable(<sectionId>)
    makeFocusable: function makeFocusable(sectionId) {
      var doMakeFocusable = function doMakeFocusable(section) {
        var tabIndexIgnoreList = section.tabIndexIgnoreList || GlobalConfig.tabIndexIgnoreList;
        parseSelector(section.selector).forEach(function (element) {
          if (!matchSelector(element, tabIndexIgnoreList)) if (!element.getAttribute('tabindex')) element.setAttribute('tabindex', '-1');
        });
      };

      if (sectionId) {
        if (_sections[sectionId]) doMakeFocusable(_sections[sectionId]);else throw new Error('Section ' + sectionId + ' doesn\'t exist!');
      } else for (var id in _sections) {
        doMakeFocusable(_sections[id]);
      }
    },

    setDefaultSection: function setDefaultSection(sectionId) {
      if (sectionId) {
        if (_sections[sectionId]) _defaultSectionId = sectionId;else throw new Error('Section ' + sectionId + ' doesn\'t exist!');
      } else _defaultSectionId = '';
    },

    getSectionId: getSectionId
  };

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var TVNavigation = function TVNavigation() {
    var _this = this;

    _classCallCheck$1(this, TVNavigation);

    this.init = function () {
      Navigation.init();
      Navigation.focus();
      _this.bindFocusEvent();
    };

    this.destroy = function () {
      _this.focusedPath = null;

      Navigation.uninit();
      _this.unbindFocusEvent();
    };

    this.bindFocusEvent = function () {
      if (!_this.listening) {
        _this.listening = true;
        document.addEventListener('sn:focused', _this.handleFocused);
      }
    };

    this.unbindFocusEvent = function () {
      document.removeEventListener('sn:focused', _this.handleFocused);
      _this.listening = false;
    };

    this.handleFocused = function (ev) {
      if (_this.focusedPath !== ev.detail.sectionId) _this.setCurrentFocusedPath(ev.detail.sectionId);
    };

    this.getCurrentFocusedPath = function () {
      return _this.focusedPath;
    };

    this.setCurrentFocusedPath = function (focusPath) {
      _this.focusedPath = focusPath;
      Navigation.focus(focusPath);
    };

    this.addEventListener = function (selector, event, fn) {
      document.querySelectorAll(selector).forEach(function (elem) {
        return elem.addEventListener(event, fn);
      });
      return _this;
    };

    this.addFocusable = function (config, onEnterPressHandler) {
      if (!config || Navigation.getSectionId(document.getElementById(config.id))) return;

      _this.removeFocusable(config);

      var sectionId = Navigation.add(config);

      if (onEnterPressHandler) _this.addEventListener(config.selector, 'sn:enter-down', onEnterPressHandler);

      Navigation.makeFocusable(sectionId);
    };

    this.removeFocusable = function (config) {
      var sectionId = Navigation.getSectionId(document.getElementById(config.id));
      if (!sectionId) return;

      Navigation.remove(sectionId);
      document.querySelectorAll(config.selector).removeEventListener('sn:enter-down');
    };

    this.destroy();
  };

  var index = new TVNavigation();

  return index;

})));