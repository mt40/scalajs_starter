/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(17);
} else {
  module.exports = __webpack_require__(18);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(1);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = __webpack_require__(19);
  var loggedTypeFailures = {};

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          )

        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var emptyFunction = __webpack_require__(1);

/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function capture(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
      }
      return {
        remove: emptyFunction
      };
    }
  },

  registerDefault: function registerDefault() {}
};

module.exports = EventListener;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = __webpack_require__(22);

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * @param {DOMElement} node input/textarea to focus
 */

function focusNode(node) {
  // IE8 can throw "Can't move focus to the control because it is invisible,
  // not enabled, or of a type that does not accept the focus." for all kinds of
  // reasons that are too expensive and fragile to test.
  try {
    node.focus();
  } catch (e) {}
}

module.exports = focusNode;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var d,ba="object"===typeof __ScalaJSEnv&&__ScalaJSEnv?__ScalaJSEnv:{},g="object"===typeof ba.global&&ba.global?ba.global:"object"===typeof global&&global&&global.Object===Object?global:this;ba.global=g;ba.exportsNamespace=exports;g.Object.freeze(ba);var ca={envInfo:ba,semantics:{asInstanceOfs:2,arrayIndexOutOfBounds:2,moduleInit:2,strictFloats:!1,productionMode:!0},assumingES6:!1,linkerVersion:"0.6.25",globalThis:this};g.Object.freeze(ca);g.Object.freeze(ca.semantics);
var h=g.Math.imul||function(a,b){var c=a&65535,e=b&65535;return c*e+((a>>>16&65535)*e+c*(b>>>16&65535)<<16>>>0)|0},da=g.Math.clz32||function(a){if(0===a)return 32;var b=1;0===(a&4294901760)&&(a<<=16,b+=16);0===(a&4278190080)&&(a<<=8,b+=8);0===(a&4026531840)&&(a<<=4,b+=4);0===(a&3221225472)&&(a<<=2,b+=2);return b+(a>>31)},ea=0,fa=g.WeakMap?new g.WeakMap:null;function ga(a){return function(b,c){return!(!b||!b.$classData||b.$classData.Re!==c||b.$classData.Qe!==a)}}
function ha(a){for(var b in a)return b}function m(a,b){return ia(a,b,0)}function ia(a,b,c){var e=new a.Xh(b[c]);if(c<b.length-1){a=a.yf;c+=1;for(var f=e.d,k=0;k<f.length;k++)f[k]=ia(a,b,c)}return e}function ja(a){return void 0===a?"undefined":a.toString()}
function ka(a){switch(typeof a){case "string":return n(la);case "number":var b=a|0;return b===a?ma(b)?n(na):pa(b)?n(qa):n(ra):"number"===typeof a?n(sa):n(ta);case "boolean":return n(ua);case "undefined":return n(va);default:return null===a?a.ru():wa(a)?n(xa):a&&a.$classData?n(a.$classData):null}}function ya(a,b){return a&&a.$classData||null===a?a.n(b):"number"===typeof a?"number"===typeof b&&(a===b?0!==a||1/a===1/b:a!==a&&b!==b):a===b}
function za(a){switch(typeof a){case "string":return Aa(Ba(),a);case "number":return Ca(Da(),a);case "boolean":return a?1231:1237;case "undefined":return 0;default:return a&&a.$classData||null===a?a.p():null===fa?42:Ea(a)}}function Fa(a){return"string"===typeof a?a.length|0:a.ja()}function Ga(a,b){var c=g.Object.getPrototypeOf,e=g.Object.getOwnPropertyDescriptor;for(a=c(a);null!==a;){var f=e(a,b);if(void 0!==f)return f;a=c(a)}}
function Ha(a,b,c){a=Ga(a,c);if(void 0!==a)return c=a.get,void 0!==c?c.call(b):a.value}function Ia(a,b,c,e){a=Ga(a,c);if(void 0!==a&&(a=a.set,void 0!==a)){a.call(b,e);return}throw new g.TypeError("super has no setter '"+c+"'.");}function Ja(a){var b=[],c;for(c in a)b.push(c);return b}function Ka(a,b,c,e,f){a=a.d;c=c.d;if(a!==c||e<b||(b+f|0)<e)for(var k=0;k<f;k=k+1|0)c[e+k|0]=a[b+k|0];else for(k=f-1|0;0<=k;k=k-1|0)c[e+k|0]=a[b+k|0]}
var Ea=null!==fa?function(a){switch(typeof a){case "string":case "number":case "boolean":case "undefined":return za(a);default:if(null===a)return 0;var b=fa.get(a);void 0===b&&(ea=b=ea+1|0,fa.set(a,b));return b}}:function(a){if(a&&a.$classData){var b=a.$idHashCode$0;if(void 0!==b)return b;if(g.Object.isSealed(a))return 42;ea=b=ea+1|0;return a.$idHashCode$0=b}return null===a?0:za(a)};function ma(a){return"number"===typeof a&&a<<24>>24===a&&1/a!==1/-0}
function pa(a){return"number"===typeof a&&a<<16>>16===a&&1/a!==1/-0}function La(a){return null===a?Ma().tg:a}function Na(){this.Zg=this.Xh=void 0;this.Qe=this.yf=this.m=null;this.Re=0;this.rj=null;this.zg="";this.wc=this.ug=this.vg=void 0;this.name="";this.isRawJSType=this.isArrayClass=this.isInterface=this.isPrimitive=!1;this.isInstance=void 0}
function Oa(a,b,c){var e=new Na;e.m={};e.yf=null;e.rj=a;e.zg=b;e.wc=function(){return!1};e.name=c;e.isPrimitive=!0;e.isInstance=function(){return!1};return e}function p(a,b,c,e,f,k,l,r){var t=new Na,N=ha(a);l=l||function(a){return!!(a&&a.$classData&&a.$classData.m[N])};r=r||function(a,b){return!!(a&&a.$classData&&a.$classData.Re===b&&a.$classData.Qe.m[N])};t.Zg=k;t.m=e;t.zg="L"+c+";";t.wc=r;t.name=c;t.isInterface=b;t.isRawJSType=!!f;t.isInstance=l;return t}
function Pa(a){function b(a){if("number"===typeof a){this.d=Array(a);for(var b=0;b<a;b++)this.d[b]=f}else this.d=a}var c=new Na,e=a.rj,f="longZero"==e?Ma().tg:e;b.prototype=new q;b.prototype.constructor=b;b.prototype.$classData=c;var e="["+a.zg,k=a.Qe||a,l=a.Re+1;c.Xh=b;c.Zg=u;c.m={c:1,xc:1,f:1};c.yf=a;c.Qe=k;c.Re=l;c.rj=null;c.zg=e;c.vg=void 0;c.ug=void 0;c.wc=void 0;c.name=e;c.isPrimitive=!1;c.isInterface=!1;c.isArrayClass=!0;c.isInstance=function(a){return k.wc(a,l)};return c}
function n(a){if(!a.vg){var b=new Qa;b.Ad=a;a.vg=b}return a.vg}function v(a){a.ug||(a.ug=Pa(a));return a.ug}Na.prototype.getFakeInstance=function(){return this===la?"some string":this===ua?!1:this===na||this===qa||this===ra||this===sa||this===ta?0:this===xa?Ma().tg:this===va?void 0:{$classData:this}};Na.prototype.getSuperclass=function(){return this.Zg?n(this.Zg):null};Na.prototype.getComponentType=function(){return this.yf?n(this.yf):null};
Na.prototype.newArrayOfThisClass=function(a){for(var b=this,c=0;c<a.length;c++)b=v(b);return m(b,a)};var Ra=Oa(!1,"Z","boolean"),Sa=Oa(0,"C","char"),Ta=Oa(0,"B","byte"),Ua=Oa(0,"S","short"),Va=Oa(0,"I","int"),Wa=Oa("longZero","J","long"),Xa=Oa(0,"F","float"),Ya=Oa(0,"D","double"),Za=ga(Ra);Ra.wc=Za;var $a=ga(Sa);Sa.wc=$a;var ab=ga(Ta);Ta.wc=ab;var bb=ga(Ua);Ua.wc=bb;var cb=ga(Va);Va.wc=cb;var db=ga(Wa);Wa.wc=db;var eb=ga(Xa);Xa.wc=eb;var fb=ga(Ya);Ya.wc=fb;var gb=__webpack_require__(4),hb=__webpack_require__(20);function ib(a,b){return w(new x,function(a,b){return function(f){return a.e(b.e(f))}}(a,b))}function jb(a,b){return w(new x,function(a,b){return function(f){return b.e(a.e(f))}}(a,b))}function kb(a){return a.ab().mountedImpure}function lb(a){var b=y(),c=mb();return nb(b,ob(c,z(new A,function(a){return function(){return a.Nf}}(a)),pb().Jc),qb(mb(),z(new A,function(a){return function(){a.Nf=B()}}(a))))}
function rb(a,b){return qb(mb(),z(new A,function(a,b){return function(){a.Nf=sb(new tb,(new C).G(b),a.Nf)}}(a,b)))}function ub(a,b){vb();return D(function(a,b){return function(a,c){a.e(b.e(c))}}(a,b))}function wb(a){vb();a.Ut=D(function(){return function(a,c){var e=La(c);c=e.Pa;e=e.Ub;c=xb(Ma(),c,e);a.e(c)}}(a));a.Vt=ub(a,w(new x,function(){return function(a){return a}}(a)))}function yb(){}function q(){}q.prototype=yb.prototype;yb.prototype.b=function(){return this};
yb.prototype.n=function(a){return this===a};yb.prototype.j=function(){var a=zb(ka(this)),b=(+(this.p()>>>0)).toString(16);return a+"@"+b};yb.prototype.p=function(){return Ea(this)};yb.prototype.toString=function(){return this.j()};function Ab(a,b){if(a=a&&a.$classData){var c=a.Re||0;return!(c<b)&&(c>b||!a.Qe.isPrimitive)}return!1}var u=p({c:0},!1,"java.lang.Object",{c:1},void 0,void 0,function(a){return null!==a},Ab);yb.prototype.$classData=u;
function E(a){var b=m(v(u),[a.d.length]);Ka(a,0,b,0,a.d.length);return b}
function Bb(a,b,c){if(32>c)return a.za().d[31&b];if(1024>c)return a.o().d[31&(b>>>5|0)].d[31&b];if(32768>c)return a.q().d[31&(b>>>10|0)].d[31&(b>>>5|0)].d[31&b];if(1048576>c)return a.A().d[31&(b>>>15|0)].d[31&(b>>>10|0)].d[31&(b>>>5|0)].d[31&b];if(33554432>c)return a.ma().d[31&(b>>>20|0)].d[31&(b>>>15|0)].d[31&(b>>>10|0)].d[31&(b>>>5|0)].d[31&b];if(1073741824>c)return a.pb().d[31&(b>>>25|0)].d[31&(b>>>20|0)].d[31&(b>>>15|0)].d[31&(b>>>10|0)].d[31&(b>>>5|0)].d[31&b];throw(new Cb).b();}
function Db(a,b,c,e){if(32<=e)if(1024>e)1===a.Ka()&&(a.C(m(v(u),[32])),a.o().d[31&(b>>>5|0)]=a.za(),a.bc(1+a.Ka()|0)),a.Z(m(v(u),[32]));else if(32768>e)2===a.Ka()&&(a.ba(m(v(u),[32])),a.q().d[31&(b>>>10|0)]=a.o(),a.bc(1+a.Ka()|0)),a.C(a.q().d[31&(c>>>10|0)]),null===a.o()&&a.C(m(v(u),[32])),a.Z(m(v(u),[32]));else if(1048576>e)3===a.Ka()&&(a.Aa(m(v(u),[32])),a.A().d[31&(b>>>15|0)]=a.q(),a.bc(1+a.Ka()|0)),a.ba(a.A().d[31&(c>>>15|0)]),null===a.q()&&a.ba(m(v(u),[32])),a.C(a.q().d[31&(c>>>10|0)]),null===
a.o()&&a.C(m(v(u),[32])),a.Z(m(v(u),[32]));else if(33554432>e)4===a.Ka()&&(a.mb(m(v(u),[32])),a.ma().d[31&(b>>>20|0)]=a.A(),a.bc(1+a.Ka()|0)),a.Aa(a.ma().d[31&(c>>>20|0)]),null===a.A()&&a.Aa(m(v(u),[32])),a.ba(a.A().d[31&(c>>>15|0)]),null===a.q()&&a.ba(m(v(u),[32])),a.C(a.q().d[31&(c>>>10|0)]),null===a.o()&&a.C(m(v(u),[32])),a.Z(m(v(u),[32]));else if(1073741824>e)5===a.Ka()&&(a.Nd(m(v(u),[32])),a.pb().d[31&(b>>>25|0)]=a.ma(),a.bc(1+a.Ka()|0)),a.mb(a.pb().d[31&(c>>>25|0)]),null===a.ma()&&a.mb(m(v(u),
[32])),a.Aa(a.ma().d[31&(c>>>20|0)]),null===a.A()&&a.Aa(m(v(u),[32])),a.ba(a.A().d[31&(c>>>15|0)]),null===a.q()&&a.ba(m(v(u),[32])),a.C(a.q().d[31&(c>>>10|0)]),null===a.o()&&a.C(m(v(u),[32])),a.Z(m(v(u),[32]));else throw(new Cb).b();}
function Eb(a,b,c,e){if(32>e)a.Z(E(a.za()));else if(1024>e)a.C(E(a.o())),a.o().d[31&(b>>>5|0)]=a.za(),a.Z(F(a.o(),31&(c>>>5|0)));else if(32768>e)a.C(E(a.o())),a.ba(E(a.q())),a.o().d[31&(b>>>5|0)]=a.za(),a.q().d[31&(b>>>10|0)]=a.o(),a.C(F(a.q(),31&(c>>>10|0))),a.Z(F(a.o(),31&(c>>>5|0)));else if(1048576>e)a.C(E(a.o())),a.ba(E(a.q())),a.Aa(E(a.A())),a.o().d[31&(b>>>5|0)]=a.za(),a.q().d[31&(b>>>10|0)]=a.o(),a.A().d[31&(b>>>15|0)]=a.q(),a.ba(F(a.A(),31&(c>>>15|0))),a.C(F(a.q(),31&(c>>>10|0))),a.Z(F(a.o(),
31&(c>>>5|0)));else if(33554432>e)a.C(E(a.o())),a.ba(E(a.q())),a.Aa(E(a.A())),a.mb(E(a.ma())),a.o().d[31&(b>>>5|0)]=a.za(),a.q().d[31&(b>>>10|0)]=a.o(),a.A().d[31&(b>>>15|0)]=a.q(),a.ma().d[31&(b>>>20|0)]=a.A(),a.Aa(F(a.ma(),31&(c>>>20|0))),a.ba(F(a.A(),31&(c>>>15|0))),a.C(F(a.q(),31&(c>>>10|0))),a.Z(F(a.o(),31&(c>>>5|0)));else if(1073741824>e)a.C(E(a.o())),a.ba(E(a.q())),a.Aa(E(a.A())),a.mb(E(a.ma())),a.Nd(E(a.pb())),a.o().d[31&(b>>>5|0)]=a.za(),a.q().d[31&(b>>>10|0)]=a.o(),a.A().d[31&(b>>>15|0)]=
a.q(),a.ma().d[31&(b>>>20|0)]=a.A(),a.pb().d[31&(b>>>25|0)]=a.ma(),a.mb(F(a.pb(),31&(c>>>25|0))),a.Aa(F(a.ma(),31&(c>>>20|0))),a.ba(F(a.A(),31&(c>>>15|0))),a.C(F(a.q(),31&(c>>>10|0))),a.Z(F(a.o(),31&(c>>>5|0)));else throw(new Cb).b();}function Fb(a,b){var c=m(v(u),[32]);Ka(a,b,c,0,32-(0>b?0:b)|0);return c}
function Gb(a,b,c){if(32<=c)if(1024>c)a.Z(a.o().d[31&(b>>>5|0)]);else if(32768>c)a.C(a.q().d[31&(b>>>10|0)]),a.Z(a.o().d[31&(b>>>5|0)]);else if(1048576>c)a.ba(a.A().d[31&(b>>>15|0)]),a.C(a.q().d[31&(b>>>10|0)]),a.Z(a.o().d[31&(b>>>5|0)]);else if(33554432>c)a.Aa(a.ma().d[31&(b>>>20|0)]),a.ba(a.A().d[31&(b>>>15|0)]),a.C(a.q().d[31&(b>>>10|0)]),a.Z(a.o().d[31&(b>>>5|0)]);else if(1073741824>c)a.mb(a.pb().d[31&(b>>>25|0)]),a.Aa(a.ma().d[31&(b>>>20|0)]),a.ba(a.A().d[31&(b>>>15|0)]),a.C(a.q().d[31&(b>>>
10|0)]),a.Z(a.o().d[31&(b>>>5|0)]);else throw(new Cb).b();}
function Hb(a,b){var c=-1+a.Ka()|0;switch(c){case 5:a.Nd(E(a.pb()));a.mb(F(a.pb(),31&(b>>>25|0)));a.Aa(F(a.ma(),31&(b>>>20|0)));a.ba(F(a.A(),31&(b>>>15|0)));a.C(F(a.q(),31&(b>>>10|0)));a.Z(F(a.o(),31&(b>>>5|0)));break;case 4:a.mb(E(a.ma()));a.Aa(F(a.ma(),31&(b>>>20|0)));a.ba(F(a.A(),31&(b>>>15|0)));a.C(F(a.q(),31&(b>>>10|0)));a.Z(F(a.o(),31&(b>>>5|0)));break;case 3:a.Aa(E(a.A()));a.ba(F(a.A(),31&(b>>>15|0)));a.C(F(a.q(),31&(b>>>10|0)));a.Z(F(a.o(),31&(b>>>5|0)));break;case 2:a.ba(E(a.q()));a.C(F(a.q(),
31&(b>>>10|0)));a.Z(F(a.o(),31&(b>>>5|0)));break;case 1:a.C(E(a.o()));a.Z(F(a.o(),31&(b>>>5|0)));break;case 0:a.Z(E(a.za()));break;default:throw(new G).l(c);}}
function Ib(a,b){var c=-1+a.Ka()|0;switch(c){case 5:a.Nd(E(a.pb()));a.mb(E(a.ma()));a.Aa(E(a.A()));a.ba(E(a.q()));a.C(E(a.o()));a.pb().d[31&(b>>>25|0)]=a.ma();a.ma().d[31&(b>>>20|0)]=a.A();a.A().d[31&(b>>>15|0)]=a.q();a.q().d[31&(b>>>10|0)]=a.o();a.o().d[31&(b>>>5|0)]=a.za();break;case 4:a.mb(E(a.ma()));a.Aa(E(a.A()));a.ba(E(a.q()));a.C(E(a.o()));a.ma().d[31&(b>>>20|0)]=a.A();a.A().d[31&(b>>>15|0)]=a.q();a.q().d[31&(b>>>10|0)]=a.o();a.o().d[31&(b>>>5|0)]=a.za();break;case 3:a.Aa(E(a.A()));a.ba(E(a.q()));
a.C(E(a.o()));a.A().d[31&(b>>>15|0)]=a.q();a.q().d[31&(b>>>10|0)]=a.o();a.o().d[31&(b>>>5|0)]=a.za();break;case 2:a.ba(E(a.q()));a.C(E(a.o()));a.q().d[31&(b>>>10|0)]=a.o();a.o().d[31&(b>>>5|0)]=a.za();break;case 1:a.C(E(a.o()));a.o().d[31&(b>>>5|0)]=a.za();break;case 0:break;default:throw(new G).l(c);}}function F(a,b){var c=a.d[b];a.d[b]=null;return E(c)}
function Jb(a,b,c){a.bc(c);c=-1+c|0;switch(c){case -1:break;case 0:a.Z(b.za());break;case 1:a.C(b.o());a.Z(b.za());break;case 2:a.ba(b.q());a.C(b.o());a.Z(b.za());break;case 3:a.Aa(b.A());a.ba(b.q());a.C(b.o());a.Z(b.za());break;case 4:a.mb(b.ma());a.Aa(b.A());a.ba(b.q());a.C(b.o());a.Z(b.za());break;case 5:a.Nd(b.pb());a.mb(b.ma());a.Aa(b.A());a.ba(b.q());a.C(b.o());a.Z(b.za());break;default:throw(new G).l(c);}}function Kb(a){return null===a?Lb():a}function Mb(a){return a===Lb()?null:a}
var Nb=p({bj:0},!0,"scala.collection.mutable.HashEntry",{bj:1});function Ob(){this.xf=null}Ob.prototype=new q;Ob.prototype.constructor=Ob;Ob.prototype.b=function(){Pb=this;Qb();Rb();Sb();Rb();var a=[(Rb(),Tb(),(new Ub).si("Hello!"))],a=Vb((new H).Oa(a));this.xf=Wb(Xb("Title",Yb(a)));return this};Ob.prototype.tf=function(){return this.xf.qe.D()};Ob.prototype.$classData=p({pm:0},!1,"components.Title$",{pm:1,c:1});var Pb=void 0;function Zb(){this.Ba=null}Zb.prototype=new q;Zb.prototype.constructor=Zb;
Zb.prototype.b=function(){$b=this;this.Ba=ac(y(),void 0);return this};function qb(a,b){return z(new A,function(a,b){return function(){b.D()}}(a,b))}function ob(a,b,c){return qb(mb(),z(new A,function(a,b,c){return function(){b.D().P(w(new x,function(a,b){return function(a){b.e(a).H.D()}}(a,c)))}}(a,b,c)))}
function bc(a,b){var c=(new H).Oa([]);return qb(mb(),z(new A,function(a,b,c){return function(){var a=cc(),e=a.log,t;dc||(dc=(new ec).b());t=dc;if(c&&c.$classData&&c.$classData.m.$l)t=c.ob;else if(c&&c.$classData&&c.$classData.m.bm)t=c.la;else{var N=[];c.P(w(new x,function(a,b){return function(a){return b.push(a)|0}}(t,N)));t=N}t=[b].concat(t);e.apply(a,t)}}(a,b,c)))}Zb.prototype.$classData=p({qm:0},!1,"japgolly.scalajs.react.Callback$",{qm:1,c:1});var $b=void 0;
function mb(){$b||($b=(new Zb).b());return $b}function C(){this.H=null}C.prototype=new q;C.prototype.constructor=C;C.prototype.G=function(a){this.H=a;return this};C.prototype.n=function(a){y();return a&&a.$classData&&a.$classData.m.Aj?this.H===(null===a?null:a.H):!1};C.prototype.p=function(){return Ea(this.H)};C.prototype.$classData=p({Aj:0},!1,"japgolly.scalajs.react.CallbackTo",{Aj:1,c:1});function fc(){}fc.prototype=new q;fc.prototype.constructor=fc;fc.prototype.b=function(){return this};
function gc(a,b){return b===mb().Ba}function hc(a,b){return function(a){return function(){return a.D()}}(b)}function nb(a,b,c){return gc(y(),b)?c:z(new A,function(a,b,c){return function(){c.D();return b.D()}}(a,c,b))}function ic(a,b,c){return z(new A,function(a,b,c){return function(){return c.e(b.D())}}(a,b,c))}function jc(a,b,c){return z(new A,function(a,b,c){return function(){return c.e(b.D()).H.D()}}(a,b,c))}function ac(a,b){return z(new A,function(a,b){return function(){return b}}(a,b))}
fc.prototype.$classData=p({rm:0},!1,"japgolly.scalajs.react.CallbackTo$",{rm:1,c:1});var kc=void 0;function y(){kc||(kc=(new fc).b());return kc}function lc(){}lc.prototype=new q;lc.prototype.constructor=lc;function mc(){}mc.prototype=lc.prototype;function nc(){}nc.prototype=new q;nc.prototype.constructor=nc;nc.prototype.b=function(){return this};
function oc(){var a;pc||(pc=(new nc).b());a=pc;qc||(qc=(new rc).b());a=w(new x,function(a,c){return function(e){return sc(new tc,gb.createElement(e,c.X),w(new x,function(a,b,c){return function(a){a=a.Ac;return gb.createElement(c,uc(vc(),a,b.el.D()))}}(a,c,e)),void 0)}}(a,qc.wj));wc||(wc=(new xc).b());return yc(a)}nc.prototype.$classData=p({vm:0},!1,"japgolly.scalajs.react.CtorType$Summoner$",{vm:1,c:1});var pc=void 0;function zc(){}zc.prototype=new q;zc.prototype.constructor=zc;zc.prototype.b=function(){return this};
zc.prototype.$classData=p({xm:0},!1,"japgolly.scalajs.react.component.Generic$",{xm:1,c:1});var Ac=void 0;function Bc(){this.sd=null}Bc.prototype=new q;Bc.prototype.constructor=Bc;Bc.prototype.b=function(){Cc=this;Dc||(Dc=(new Ec).b());this.sd=Dc;Fc();return this};Bc.prototype.$classData=p({Tm:0},!1,"japgolly.scalajs.react.component.Scala$",{Tm:1,c:1});var Cc=void 0;function Gc(){Cc||(Cc=(new Bc).b())}function Hc(){}Hc.prototype=new q;Hc.prototype.constructor=Hc;Hc.prototype.b=function(){return this};
Hc.prototype.$classData=p({Ym:0},!1,"japgolly.scalajs.react.component.ScalaFn$",{Ym:1,c:1});var Ic=void 0;function Jc(){this.Ok=null}Jc.prototype=new q;Jc.prototype.constructor=Jc;Jc.prototype.b=function(){Kc=this;this.Ok=w(new x,function(){return function(){return Lc().ke}}(this));return this};
function Mc(a,b,c){Nc();return Oc(Nc(),b,c).$j(w(new x,function(){return function(a){Lc();return{a:a}}}(a))).cl(w(new x,function(a){return function(b){return b.bl(w(new x,function(){return function(a){return a.a}}(a))).$k(w(new x,function(){return function(a){Gc();return Pc(a)}}(a)))}}(a)))}Jc.prototype.$classData=p({an:0},!1,"japgolly.scalajs.react.component.builder.Builder$",{an:1,c:1});var Kc=void 0;function Qc(){Kc||(Kc=(new Jc).b());return Kc}function Rc(){this.Qa=null}Rc.prototype=new q;
Rc.prototype.constructor=Rc;function Sc(a,b){return Tc(a,z(new A,function(a,b){return function(){return b.D()}}(a,b)))}Rc.prototype.h=function(a){this.Qa=a;return this};function Tc(a,b){return Uc(new Vc,a.Qa,w(new x,function(a,b){return function(){Lc();return{a:b.D()}}}(a,b)))}Rc.prototype.$classData=p({bn:0},!1,"japgolly.scalajs.react.component.builder.Builder$Step1",{bn:1,c:1});function Vc(){this.fd=this.Qa=null}Vc.prototype=new q;Vc.prototype.constructor=Vc;
function Wc(a,b){var c=a.fd,e=new Xc;e.Qa=a.Qa;e.fd=c;e.me=b;return e}function Yc(a){return Wc(a,w(new x,function(){return function(){}}(a)))}function Uc(a,b,c){a.Qa=b;a.fd=c;return a}Vc.prototype.$classData=p({cn:0},!1,"japgolly.scalajs.react.component.builder.Builder$Step2",{cn:1,c:1});function Xc(){this.me=this.fd=this.Qa=null}Xc.prototype=new q;Xc.prototype.constructor=Xc;
function Zc(a,b){var c=new $c,e=a.fd,f=a.me,k=ad(new bd,I(),I(),I(),I(),I(),I(),I(),I());c.Qa=a.Qa;c.fd=e;c.me=f;c.Cc=b;c.Nc=k;return c}function cd(a,b){return Zc(a,w(new x,function(a,b){return function(a){a=(new dd).Ca(a.v);return b.e(kb(a).Rb())}}(a,b)))}function ed(a,b){return Zc(a,w(new x,function(a,b){return function(){return b}}(a,b)))}Xc.prototype.$classData=p({dn:0},!1,"japgolly.scalajs.react.component.builder.Builder$Step3",{dn:1,c:1});
function $c(){this.Nc=this.Cc=this.me=this.fd=this.Qa=null}$c.prototype=new q;$c.prototype.constructor=$c;function fd(a){var b=ac(y(),!1),b=w(new x,function(a,b){return function(){return(new C).G(b)}}(a,b));return gd(a,hd(),b,id().sk)}function gd(a,b,c,e){b=jd(a.Nc,b,c,e);c=new $c;e=a.fd;var f=a.me,k=a.Cc;c.Qa=a.Qa;c.fd=e;c.me=f;c.Cc=k;c.Nc=b;return c}function Wb(a){var b=oc();a=kd(ld(),a);return Mc(Qc(),a,b)}
$c.prototype.$classData=p({en:0},!1,"japgolly.scalajs.react.component.builder.Builder$Step4",{en:1,c:1});function Ec(){}Ec.prototype=new q;Ec.prototype.constructor=Ec;Ec.prototype.b=function(){return this};function Xb(a,b){Qc();a=(new Rc).h(a);b=ed(Yc((Qc(),Uc(new Vc,a.Qa,Qc().Ok))),b);return fd(b)}Ec.prototype.$classData=p({fn:0},!1,"japgolly.scalajs.react.component.builder.EntryPoint$",{fn:1,c:1});var Dc=void 0;function md(){}md.prototype=new q;md.prototype.constructor=md;d=md.prototype;d.b=function(){return this};
d.Je=function(a){Fc();var b=nd().Zd(a);a=(new od).Ca(a);return pd(0,"ComponentDidMount(props: "+b+", state: "+kb(a).Rb()+")")};d.Zd=function(a){a=(new od).Ca(a);return kb(a).Bc()};d.re=function(a,b){return b&&b.$classData&&b.$classData.m.Dj?(b=null===b?null:b.v,J(K(),a,b)):!1};d.$classData=p({jn:0},!1,"japgolly.scalajs.react.component.builder.Lifecycle$ComponentDidMount$",{jn:1,c:1});var qd=void 0;function nd(){qd||(qd=(new md).b());return qd}function rd(){}rd.prototype=new q;
rd.prototype.constructor=rd;d=rd.prototype;d.b=function(){return this};d.Je=function(a){Fc();var b=sd().Zd(a);a=(new td).Ca(a);return pd(0,"ComponentWillMount(props: "+b+", state: "+kb(a).Rb()+")")};d.Zd=function(a){a=(new td).Ca(a);return kb(a).Bc()};d.re=function(a,b){return b&&b.$classData&&b.$classData.m.Ej?(b=null===b?null:b.v,J(K(),a,b)):!1};d.$classData=p({ln:0},!1,"japgolly.scalajs.react.component.builder.Lifecycle$ComponentWillMount$",{ln:1,c:1});var ud=void 0;
function sd(){ud||(ud=(new rd).b());return ud}function vd(){}vd.prototype=new q;vd.prototype.constructor=vd;d=vd.prototype;d.b=function(){return this};d.Je=function(a){Fc();var b="ComponentWillUnmount(props: "+wd().Zd(a)+", state: ";wd();a=(new xd).Ca(a);a=kb(a).Rb();return pd(0,b+a+")")};d.Zd=function(a){a=(new xd).Ca(a);return kb(a).Bc()};d.re=function(a,b){return b&&b.$classData&&b.$classData.m.Fj?(b=null===b?null:b.v,J(K(),a,b)):!1};
d.$classData=p({nn:0},!1,"japgolly.scalajs.react.component.builder.Lifecycle$ComponentWillUnmount$",{nn:1,c:1});var yd=void 0;function wd(){yd||(yd=(new vd).b());return yd}function zd(){}zd.prototype=new q;zd.prototype.constructor=zd;d=zd.prototype;d.b=function(){return this};d.Je=function(a){Fc();var b=Ad().Zd(a);a=(new dd).Ca(a);return pd(0,"Render(props: "+b+", state: "+kb(a).Rb()+")")};d.Zd=function(a){a=(new dd).Ca(a);return kb(a).Bc()};
d.re=function(a,b){return b&&b.$classData&&b.$classData.m.Gj?(b=null===b?null:b.v,J(K(),a,b)):!1};d.$classData=p({pn:0},!1,"japgolly.scalajs.react.component.builder.Lifecycle$RenderScope$",{pn:1,c:1});var Bd=void 0;function Ad(){Bd||(Bd=(new zd).b());return Bd}function Cd(){this.Vj=this.vj=this.tj=this.qj=null}Cd.prototype=new q;Cd.prototype.constructor=Cd;function Dd(a,b,c){Ed(a,function(a){return function(b,c){return(0,a.ib)(this,b,c)}}(b),c)}
Cd.prototype.b=function(){Fd=this;var a=g.Object.setPrototypeOf,b=void 0===a?I():(new L).l(a);if(Gd(b))a=w(new x,function(){return function(a){return g.Object.getPrototypeOf(a)}}(this)),b=b.w;else{if(I()!==b)throw(new G).l(b);a=w(new x,function(){return function(a){return a.__proto__}}(this));b=function(a,b){ld();a.__proto__=b}}this.qj=(new M).Q(a,b);this.tj=this.qj.Ia;this.vj=this.qj.Ta;this.Vj=gb.Component;return this};
function Hd(a,b){for(var c=0,e=b.length|0;c<e;){var f=b[c];f.configurable=!0;"value"in f&&(f.writable=!0);g.Object.defineProperty(a,f.key,f);c=1+c|0}}
function kd(a,b){var c=b.fd,e=b.me,f=b.Cc,k=(new Id).l(null);k.F=function(a,b,c){return function(e){ld();var f;ld();f=ld().tj.e(c.F).call(this,e);f=f instanceof g.Object||f instanceof g.Function?f:this;Nc();var k=(new Jd).Ca(f);f.mountedImpure=(Gc(),Pc(k));var k=f.mountedImpure,Y=Kd().Hk;f.mountedPure=k.nm(Y);f.backend=b.e(f.mountedPure);f.state=a.e(e);return f}}(c,e,k);Ld(a,k.F,a.Vj);c=[];Md("render",w(new x,function(a,b){return function(a){return b.e((new dd).Ca(a)).dh}}(a,f)),c);f=b.Nc.td;f.i()||
(f=f.Ja(),Dd("componentDidCatch",Nd(function(a,b){return function(a,c){b.e(Od(a,c)).H.D()}}(a,f)),c));f=b.Nc.ud;f.i()||(f=f.Ja(),Md("componentDidMount",w(new x,function(a,b){return function(a){b.e((new od).Ca(a)).H.D()}}(a,f)),c));f=b.Nc.vd;f.i()||(f=f.Ja(),Dd("componentDidUpdate",Nd(function(a,b){return function(a,c,e){b.e((new Pd).If(a,c.a,e.a)).H.D()}}(a,f)),c));f=b.Nc.wd;f.i()||(f=f.Ja(),Md("componentWillMount",w(new x,function(a,b){return function(a){b.e((new td).Ca(a)).H.D()}}(a,f)),c));f=b.Nc.xd;
f.i()||(f=f.Ja(),Qd(D(function(a,b){return function(a,c){b.e(Rd(a,c.a)).H.D()}}(a,f)),c));f=b.Nc.yd;f.i()||(f=f.Ja(),Md("componentWillUnmount",w(new x,function(a,b){return function(a){b.e((new xd).Ca(a)).H.D()}}(a,f)),c));f=b.Nc.zd;f.i()||(f=f.Ja(),Dd("componentWillUpdate",Nd(function(a,b){return function(a,c,e){b.e((new Sd).If(a,c.a,e.a)).H.D()}}(a,f)),c));f=b.Nc.Hd;f.i()||(f=f.Ja(),Dd("shouldComponentUpdate",Nd(function(a,b){return function(a,c,e){return!!b.e((new Td).If(a,c.a,e.a)).H.D()}}(a,f)),
c));Hd(k.F.prototype,c);a=Ud().wg(b.Qa);a.i()||(a=a.Ja(),k.F.displayName=a);return k.F}function Md(a,b,c){Ed(a,function(a){return function(){return a.e(this)}}(b),c)}function Ed(a,b,c){c.push({key:a,value:b})}function Qd(a,b){Ed("componentWillReceiveProps",function(a){return function(b){return Vd(a,this,b)}}(a),b)}function Ld(a,b,c){b.prototype=g.Object.create(c.prototype,{constructor:{value:b,enumerable:!1,writable:!0,configurable:!0}});(0,a.vj)(b,c)}
Cd.prototype.$classData=p({rn:0},!1,"japgolly.scalajs.react.component.builder.ViaReactComponent$",{rn:1,c:1});var Fd=void 0;function ld(){Fd||(Fd=(new Cd).b());return Fd}function Wd(a,b){return z(new A,function(a,b){return function(){var f=(new M).Q(b,void 0);a.bf=sb(new tb,f,a.bf);return(new C).G(qb(mb(),z(new A,function(a,b){return function(){var c=a.bf;Xd();for(var e=(new Yd).b();!c.i();){var f=c.ra();f!==b!==!1&&Zd(e,f);c=c.Xc()}a.bf=$d(e)}}(a,f))))}}(a,b))}
function ae(a){return ob(mb(),z(new A,function(a){return function(){return a.bf}}(a)),w(new x,function(a,c){return function(a){return(new C).G(a.Ia.e(c).H)}}(a,void 0)))}function be(){}be.prototype=new q;be.prototype.constructor=be;be.prototype.b=function(){return this};function ce(a,b,c,e){return de(ee(),b,w(new x,function(a,b){return function(c){c=b.e(c).H;return w(new x,function(a,b){return function(){return(new C).G(b)}}(a,c))}}(a,c)),e)}
be.prototype.$classData=p({sn:0},!1,"japgolly.scalajs.react.extra.EventListener$",{sn:1,c:1});var fe=void 0;function ge(){fe||(fe=(new be).b());return fe}function he(){}he.prototype=new q;he.prototype.constructor=he;he.prototype.b=function(){return this};
function de(a,b,c,e){return ie().sc(w(new x,function(a,b,c,e,t){return function(N){var aa=w(new x,function(a,b,c,e,f){return function(k){k=k.v;var l=(new od).Ca(k),r=e.e(kb(l)),l=(new od).Ca(k),t=function(a){return function(b){ee();a.e(b).H.D()}}(c.e(l.ab().mountedPure)),l=qb(mb(),z(new A,function(a,b,c,e,f){return function(){b.addEventListener(e,c,f)}}(a,r,t,b,f))),r=qb(mb(),z(new A,function(a,b,c,e,f){return function(){b.removeEventListener(e,c,f)}}(a,r,t,b,f))),t=y();k=(new od).Ca(k);return(new C).G(nb(t,
l,rb(k.ab().backend,r)))}}(a,b,c,e,t));return gd(N,je(),aa,id().Se)}}(a,b,c,e,!1)))}he.prototype.$classData=p({tn:0},!1,"japgolly.scalajs.react.extra.EventListener$OfEventType$",{tn:1,c:1});var ke=void 0;function ee(){ke||(ke=(new he).b());return ke}function le(){}le.prototype=new q;le.prototype.constructor=le;le.prototype.b=function(){return this};
function me(a,b,c){return ne(a,b,w(new x,function(a,b){return function(c){return w(new x,function(a,b,c){return function(){return(new C).G(b.e((new od).Ca(c)).H)}}(a,b,c.v))}}(a,c)))}
function ne(a,b,c){return ie().sc(w(new x,function(a,b,c){return function(l){var r=w(new x,function(a,b,c){return function(e){e=e.v;var f=b.e(nd().Zd(e)),k=c.e((new od).Ca(e)),f=Wd(f,k);e=(new od).Ca(e);e=w(new x,function(a,b){return function(a){return(new C).G(rb(b,a.H))}}(a,e.ab().backend));return(new C).G(jc(y(),f,e))}}(a,b,c));return gd(l,je(),r,id().Se)}}(a,b,c)))}le.prototype.$classData=p({un:0},!1,"japgolly.scalajs.react.extra.Listenable$",{un:1,c:1});var oe=void 0;function pe(){}
pe.prototype=new q;pe.prototype.constructor=pe;pe.prototype.b=function(){return this};function ie(){qe||(qe=(new pe).b());return w(new x,function(a){return function(b){var c=w(new x,function(){return function(a){a=(new xd).Ca(a.v);return(new C).G(lb(a.ab().backend))}}(a));return gd(b,re(),c,id().Se)}}(qe))}pe.prototype.$classData=p({vn:0},!1,"japgolly.scalajs.react.extra.OnUnmount$",{vn:1,c:1});var qe=void 0;function se(){}se.prototype=new q;se.prototype.constructor=se;function te(){}
te.prototype=se.prototype;function ue(){var a=(new ve).h(""),b=a.mh(a);return a.Vg(we(Ba(),b))}function xe(a,b){return a.Vg(""+a.mh(a)+b)}function ye(){}ye.prototype=new q;ye.prototype.constructor=ye;function ze(){}ze.prototype=ye.prototype;function Ae(a,b){a=Be(a)?Ce(a.Ze,a.df):Ce(De().Xj.sg,a);var c=new Ee;c.Ze=a;c.df=b;return c}function Fe(){}Fe.prototype=new q;Fe.prototype.constructor=Fe;Fe.prototype.b=function(){return this};function Ge(a,b){return He(Ie,b,Je(a,b))}
function He(a,b,c){var e=cd(Wc(Sc((Qb(),(new Rc).h("Router")),c.nj),w(new x,function(){return function(){return(new Ke).b()}}(a))),w(new x,function(a,b){return function(a){return Vd(b.ac.Cc,b.zf,a)}}(a,c))),f=w(new x,function(a,b){return function(a){var c=a.v;a=b.Yd;var e=I(),c=(new od).Ca(c);return(new C).G(Vd(a,e,kb(c).Rb().Wb).H)}}(a,b)),e=gd(e,je(),f,id().Se);b=w(new x,function(a,b){return function(a){return(new C).G(Vd(b.Yd,(new L).l(a.Ti.Wb),kb(a).Rb().Wb).H)}}(a,b));var k=gd(e,Le(),b,id().Se);
b=ce(ge(),"popstate",w(new x,function(a,b){return function(){return(new C).G(b.zf.eh())}}(a,c)),w(new x,function(){return function(){return Me(Ne())}}(a)));oe||(oe=(new le).b());b=[b,me(oe,w(new x,function(a,b){return function(){return b}}(a,c)),w(new x,function(a,b){return function(c){c=c.v;return(new C).G(jc(y(),b.nj,w(new x,function(a,b){return function(a){var c=(new od).Ca(b);return(new C).G(c.kf(a,mb().Ba).H)}}(a,c))))}}(a,c)))];var e=b.length|0,f=0,l=k;a:for(;;){if(f!==e){k=1+f|0;l=b[f].e(l);
f=k;continue a}e=l;break}a=[-1!==(Me(Ne()).navigator.userAgent.indexOf("Trident")|0)?ce(ge(),"hashchange",w(new x,function(a,b){return function(){return(new C).G(b.zf.eh())}}(a,c)),w(new x,function(){return function(){return Me(Ne())}}(a))):pb().Jc];c=a.length|0;b=0;f=e;a:for(;;){if(b!==c){e=1+b|0;f=a[b].e(f);b=e;continue a}return f}}Fe.prototype.$classData=p({Fn:0},!1,"japgolly.scalajs.react.extra.router.Router$",{Fn:1,c:1});var Ie=void 0;function Oe(){}Oe.prototype=new q;
Oe.prototype.constructor=Oe;function Pe(a,b,c){return w(new x,function(a,b,c){return function(l){return(new Qe).$e(w(new x,function(a,b){return function(a){a=Re(b,a);if(a.i())return I();a=a.Ja();De();return(new L).l((new Se).l(a))}}(a,b)),w(new x,function(a,b,c){return function(a){return Te(c,a,b)}}(a,c,w(new x,function(a,b){return function(a){return b.Th.e(a)}}(a,b)))),D(function(a,b,c){return function(a,e){return Te(c,e,b)}}(a,c,l)))}}(a,b,c))}Oe.prototype.b=function(){return this};
function Ue(a,b,c){return w(new x,function(a,b,c){return function(){return c.e(b)}}(a,b,c))}function Te(a,b,c){b=c.e(b);return b.i()?I():(new L).l(a.e(b.Ja()))}function Ve(a,b){return w(new x,function(a,b){return function(){return b.D()}}(a,b))}function We(a,b,c){return w(new x,function(a,b,c){return function(a){a=b.e(a);if(a.i())return I();a=a.Ja();return(new L).l(c.e(a))}}(a,b,c))}function Xe(a,b,c){return(new Ye).Gf(w(new x,function(a,b,c){return function(){return c.e(b.D())}}(a,b,c)))}
function Ze(a,b){return $e(af(),We(a,b,w(new x,function(){return function(a){De();return(new bf).l(a)}}(a))))}function cf(a,b){return w(new x,function(a,b){return function(f){return Ze(a,w(new x,function(a,b,c){return function(a){a=Re(b,a);if(a.i())return I();a.Ja();return(new L).l(c.D())}}(a,b,f)))}}(a,b))}
function df(a,b){var c=ef(),e=ff().Cl;b=gf(b,w(new x,function(a,b){return function(){return b}}(b,c)),w(new x,function(){return function(){}}(b,e)));c=Pe(a,b,hf(new jf,kf(c)));return w(new x,function(a,b){return function(c){c=Ve(a,c);return b.e(c)}}(a,c))}Oe.prototype.$classData=p({Hn:0},!1,"japgolly.scalajs.react.extra.router.RouterConfigDsl",{Hn:1,c:1});function lf(){}lf.prototype=new q;lf.prototype.constructor=lf;lf.prototype.b=function(){return this};
lf.prototype.$classData=p({Jn:0},!1,"japgolly.scalajs.react.extra.router.RouterConfigDsl$BuildInterface",{Jn:1,c:1});function mf(){}mf.prototype=new q;mf.prototype.constructor=mf;function nf(){}nf.prototype=mf.prototype;function of(){this.tl=this.sl=null}of.prototype=new q;of.prototype.constructor=of;of.prototype.b=function(){pf=this;var a=(new qf).h("([-()\\[\\]{}+?*.$\\^|,:#\x3c!\\\\])");B();this.sl=rf(a.cb);a=(new qf).h("\\x08");B();this.tl=rf(a.cb);return this};
function sf(a){var b=pf;a=tf(uf(new vf,b.sl.$g,a,Fa(a)),"\\\\$1");return a=tf(uf(new vf,b.tl.$g,a,Fa(a)),"\\\\x08")}of.prototype.$classData=p({Nn:0},!1,"japgolly.scalajs.react.extra.router.StaticDsl$",{Nn:1,c:1});var pf=void 0;function wf(){this.dm=null}wf.prototype=new q;wf.prototype.constructor=wf;wf.prototype.b=function(){xf=this;this.dm=(new L).l(void 0);yf(this,"/");return this};
function yf(a,b){var c=new zf;pf||(pf=(new of).b());return Af(c,sf(b),0,w(new x,function(){return function(){return Bf().dm}}(a)),w(new x,function(a,b){return function(){return b}}(a,b)))}wf.prototype.$classData=p({Qn:0},!1,"japgolly.scalajs.react.extra.router.StaticDsl$RouteB$",{Qn:1,c:1});var xf=void 0;function Bf(){xf||(xf=(new wf).b());return xf}function Cf(){}Cf.prototype=new q;Cf.prototype.constructor=Cf;function Df(){}Df.prototype=Cf.prototype;
function gf(a,b,c){return a.ml(w(new x,function(a,b){return function(a){return(new L).l(b.e(a))}}(a,b)),c)}function Ef(){}Ef.prototype=new q;Ef.prototype.constructor=Ef;Ef.prototype.b=function(){return this};function Ff(a,b){return D(function(a,b,f){return function(a,c){var r=Vd(b,a,c);return r.i()?Vd(f,a,c):r.Ja()}}(Gf,a,b))}Ef.prototype.$classData=p({Tn:0},!1,"japgolly.scalajs.react.extra.router.package$OptionFn2Ext$",{Tn:1,c:1});var Gf=void 0;function Hf(){}Hf.prototype=new q;
Hf.prototype.constructor=Hf;Hf.prototype.b=function(){return this};function If(a,b,c){return w(new x,function(a,b,c){return function(a){var e=b.e(a);return e.i()?c.e(a):e}}(a,b,c))}function Jf(a,b,c){return w(new x,function(a,b,c){return function(a){var e=b.e(a);return e.i()?c.e(a):e.Ja()}}(a,b,c))}Hf.prototype.$classData=p({Un:0},!1,"japgolly.scalajs.react.extra.router.package$OptionFnExt$",{Un:1,c:1});var Kf=void 0;function Lf(){Kf||(Kf=(new Hf).b());return Kf}function Mf(){this.ke=null}
Mf.prototype=new q;Mf.prototype.constructor=Mf;Mf.prototype.b=function(){Nf=this;this.ke=(Lc(),{a:void 0});return this};Mf.prototype.$classData=p({Vn:0},!1,"japgolly.scalajs.react.internal.Box$",{Vn:1,c:1});var Nf=void 0;function Lc(){Nf||(Nf=(new Mf).b());return Nf}function Of(){}Of.prototype=new q;Of.prototype.constructor=Of;function Pf(){}Pf.prototype=Of.prototype;function Qf(){this.Uh=this.ue=null}Qf.prototype=new q;Qf.prototype.constructor=Qf;
Qf.prototype.b=function(){Rf=this;this.ue=(new Sf).b();this.Uh=(new Tf).b();return this};Qf.prototype.$classData=p({Xn:0},!1,"japgolly.scalajs.react.internal.Effect$",{Xn:1,c:1});var Rf=void 0;function Uf(){Rf||(Rf=(new Qf).b());return Rf}function Vf(){this.rh=this.ed=null}Vf.prototype=new q;Vf.prototype.constructor=Vf;function Wf(){}Wf.prototype=Vf.prototype;Vf.prototype.sf=function(a){a=this.ed.zk(a);return this.rh.nl(a)};Vf.prototype.Ng=function(a,b){this.ed=a;this.rh=b;return this};
Vf.prototype.$classData=p({Sj:0},!1,"japgolly.scalajs.react.internal.Effect$Trans",{Sj:1,c:1});function Xf(){this.Hk=this.gi=null}Xf.prototype=new q;Xf.prototype.constructor=Xf;Xf.prototype.b=function(){Yf=this;Kd();var a=Uf().ue;this.gi=Zf(a);Kd();Uf();this.Hk=$f(Kd(),Uf().ue,Uf().Uh);$f(Kd(),Uf().Uh,Uf().ue);return this};function $f(a,b,c){return null===(Kd(),null)?(new Vf).Ng(b,c):Zf(b)}Xf.prototype.$classData=p({$n:0},!1,"japgolly.scalajs.react.internal.Effect$Trans$",{$n:1,c:1});var Yf=void 0;
function Kd(){Yf||(Yf=(new Xf).b());return Yf}function ag(){}ag.prototype=new q;ag.prototype.constructor=ag;ag.prototype.b=function(){return this};function bg(a){var b=cg,c=Ja(a),c=(new dg).Oa(c),c=eg(new O,c,c.ob.length|0);return(new fg).af(c,w(new x,function(a,b){return function(a){try{var c=b[a]}catch(e){if(c=gg(P(),e),null!==c)c=c.j();else throw e;}return(new M).Q(a,c)}}(b,a)))}ag.prototype.$classData=p({bo:0},!1,"japgolly.scalajs.react.internal.JsUtil$",{bo:1,c:1});var cg=void 0;
function hg(){this.Ac=this.hj=this.hi=null}hg.prototype=new q;hg.prototype.constructor=hg;function ig(a,b,c){a.hi=b;a.hj=c;a.Ac=w(new x,function(a){return function(b){return w(new x,function(a,b){return function(c){return a.hj.e(b.e(a.hi.e(c))).e(c)}}(a,b))}}(a));return a}hg.prototype.$classData=p({co:0},!1,"japgolly.scalajs.react.internal.Lens",{co:1,c:1});function jg(){this.ue=null}jg.prototype=new q;jg.prototype.constructor=jg;jg.prototype.b=function(){kg=this;this.ue=lg(this);return this};
function lg(a){return ig(new hg,w(new x,function(){return function(a){return a}}(a)),w(new x,function(a){return function(c){return w(new x,function(a,b){return function(){return b}}(a,c))}}(a)))}jg.prototype.$classData=p({eo:0},!1,"japgolly.scalajs.react.internal.Lens$",{eo:1,c:1});var kg=void 0;function mg(){kg||(kg=(new jg).b());return kg}function ng(){this.gq=this.Pd=null}ng.prototype=new q;ng.prototype.constructor=ng;
ng.prototype.$classData=p({fo:0},!1,"japgolly.scalajs.react.internal.Profunctor$Ops",{fo:1,c:1});function og(){this.el=this.X=null}og.prototype=new q;og.prototype.constructor=og;function pg(a,b,c,e){a.X=b;a.el=e;return a}og.prototype.$classData=p({ho:0},!1,"japgolly.scalajs.react.internal.Singleton",{ho:1,c:1});function rc(){this.wj=this.ke=null}rc.prototype=new q;rc.prototype.constructor=rc;
rc.prototype.b=function(){qc=this;this.ke=pg(new og,void 0,z(new A,function(){return function(){}}(this)),z(new A,function(){return function(){return{}}}(this)));this.wj=pg(new og,Lc().ke,z(new A,function(){return function(){Lc();return{a:void 0}}}(this)),z(new A,function(){return function(){Lc();return{a:void 0}}}(this)));return this};rc.prototype.$classData=p({io:0},!1,"japgolly.scalajs.react.internal.Singleton$",{io:1,c:1});var qc=void 0;function qg(){this.Jc=null}qg.prototype=new q;
qg.prototype.constructor=qg;qg.prototype.b=function(){rg=this;this.Jc=w(new x,function(){return function(a){return a}}(this));return this};qg.prototype.$classData=p({jo:0},!1,"japgolly.scalajs.react.internal.package$",{jo:1,c:1});var rg=void 0;function pb(){rg||(rg=(new qg).b());return rg}function sg(){this.Qa=null}sg.prototype=new q;sg.prototype.constructor=sg;function tg(){}tg.prototype=sg.prototype;sg.prototype.n=function(a){return a&&a.$classData&&a.$classData.m.Jh?this.Qa===a.Qa:!1};
sg.prototype.j=function(){return"VdomAttr{name\x3d"+this.Qa+"}"};sg.prototype.h=function(a){this.Qa=a;return this};sg.prototype.p=function(){return ug(vg(),this.Qa)};function wg(){}wg.prototype=new q;wg.prototype.constructor=wg;wg.prototype.b=function(){return this};wg.prototype.$classData=p({lo:0},!1,"japgolly.scalajs.react.vdom.Attr$",{lo:1,c:1});var xg=void 0;function yg(){this.gm=this.fk=null}yg.prototype=new q;yg.prototype.constructor=yg;
yg.prototype.b=function(){zg=this;this.fk=D(function(){return function(a,b){a.e(b)}}(this));this.gm=D(function(){return function(a,b){a.e(b)}}(this));return this};function Ag(a,b){return D(function(a,b){return function(a,c){a.e(b.e(c))}}(a,b))}yg.prototype.$classData=p({oo:0},!1,"japgolly.scalajs.react.vdom.Attr$ValueType$",{oo:1,c:1});var zg=void 0;function vb(){zg||(zg=(new yg).b());return zg}function Bg(){}Bg.prototype=new q;Bg.prototype.constructor=Bg;Bg.prototype.b=function(){return this};
Bg.prototype.$classData=p({po:0},!1,"japgolly.scalajs.react.vdom.Builder$",{po:1,c:1});var Cg=void 0;function Dg(){Cg||(Cg=(new Bg).b())}
function Eg(a){a.$f={};a.kj={};a.Vh=[];a.wa=void 0;a.Yg=void 0;a.$o=D(function(a){return function(c,e){Dg();a.$f[c]=e}}(a));a.ap=w(new x,function(a){return function(c){var e=a.Yg;void 0!==e&&(Fg||(Fg=(new Gg).b()),c=""+(""+e+" ")+c);a.Yg=c}}(a));a.Yj=D(function(a){return function(c,e){Dg();a.kj[c]=e}}(a));a.bp=w(new x,function(a){return function(c){cg||(cg=(new ag).b());c=bg(c);for(c=(new Hg).af(c,w(new x,function(){return function(a){return null!==a}}(a)));c.x();){var e=c.s();if(null!==e)Vd(a.Yj,
e.Ia,e.Ta);else throw(new G).l(e);}}}(a));a.Mh=w(new x,function(a){return function(c){a.Vh.push(c)}}(a));a.ut=w(new x,function(a){return function(c){a.wa=c}}(a))}function Ig(){this.Zj=null}Ig.prototype=new q;Ig.prototype.constructor=Ig;
Ig.prototype.b=function(){Jg=this;var a;try{a=g.Symbol["for"]("react.element")}catch(b){if(null!==gg(P(),b))a=60103;else throw b;}this.Zj=Kg(function(a,c){return function(a,b,k,l){if(void 0!==b.ref)return gb.createElement.apply(gb,[a,b].concat(l));var r=l.length|0;0!==r&&(l=1===r?l[0]:l,Dg(),b.children=l);return{$$typeof:c,type:a,key:void 0===k?null:""+k,ref:null,props:b,_owner:null}}}(this,a));return this};
Ig.prototype.$classData=p({qo:0},!1,"japgolly.scalajs.react.vdom.Builder$ToRawReactElement$",{qo:1,c:1});var Jg=void 0;function Lg(){}Lg.prototype=new q;Lg.prototype.constructor=Lg;function Mg(){}Mg.prototype=Lg.prototype;Lg.prototype.b=function(){Tb();Ng||(Ng=(new Og).b());Pg||(Pg=(new Qg).b());Rg||(Rg=(new Sg).b());Sb();Tg||(Tg=(new Ug).b());Vg||(Vg=(new Wg).b());Tb();xg||(xg=(new wg).b());Xg||(Xg=(new Yg).b());Zg||(Zg=(new $g).b());return this};
function ah(a){a.Rt=Ag(vb(),w(new x,function(){return function(a){return!!a}}(a)));a.Wt=vb().gm;a.St=Ag(vb(),w(new x,function(){return function(a){return a|0}}(a)));a.Tt=vb().fk}function Qg(){}Qg.prototype=new q;Qg.prototype.constructor=Qg;Qg.prototype.b=function(){return this};Qg.prototype.$classData=p({Fo:0},!1,"japgolly.scalajs.react.vdom.ReactFragment$",{Fo:1,c:1});var Pg=void 0;function Sg(){}Sg.prototype=new q;Sg.prototype.constructor=Sg;Sg.prototype.b=function(){return this};
Sg.prototype.$classData=p({Go:0},!1,"japgolly.scalajs.react.vdom.ReactPortal$",{Go:1,c:1});var Rg=void 0;function Yg(){}Yg.prototype=new q;Yg.prototype.constructor=Yg;Yg.prototype.b=function(){return this};Yg.prototype.$classData=p({Ho:0},!1,"japgolly.scalajs.react.vdom.Style$",{Ho:1,c:1});var Xg=void 0;function Wg(){this.Ba=null}Wg.prototype=new q;Wg.prototype.constructor=Wg;Wg.prototype.b=function(){Vg=this;this.Ba=(new bh).b();return this};
Wg.prototype.$classData=p({Jo:0},!1,"japgolly.scalajs.react.vdom.TagMod$",{Jo:1,c:1});var Vg=void 0;function $g(){}$g.prototype=new q;$g.prototype.constructor=$g;$g.prototype.b=function(){return this};$g.prototype.$classData=p({Mo:0},!1,"japgolly.scalajs.react.vdom.VdomArray$",{Mo:1,c:1});var Zg=void 0;function Og(){}Og.prototype=new q;Og.prototype.constructor=Og;Og.prototype.b=function(){return this};Og.prototype.$classData=p({Oo:0},!1,"japgolly.scalajs.react.vdom.VdomElement$",{Oo:1,c:1});
var Ng=void 0;function ch(){this.Ba=null}ch.prototype=new q;ch.prototype.constructor=ch;ch.prototype.b=function(){dh=this;this.Ba=(new Ub).si(null);return this};ch.prototype.$classData=p({Po:0},!1,"japgolly.scalajs.react.vdom.VdomNode$",{Po:1,c:1});var dh=void 0;function Tb(){dh||(dh=(new ch).b())}function eh(){this.bk=this.ai=this.mm=null;this.Y=0}eh.prototype=new q;eh.prototype.constructor=eh;eh.prototype.b=function(){return this};
function Me(a){0===(134217728&a.Y)&&0===(134217728&a.Y)&&(a.mm=g.window,a.Y|=134217728);return a.mm}function fh(){var a=gh;0===(268435456&a.Y)&&(a.ai=Me(a).document,a.Y|=268435456);return a.ai}function cc(){var a=Ne();0===(536870912&a.Y)&&0===(536870912&a.Y)&&(a.bk=Me(a).console,a.Y|=536870912);return a.bk}eh.prototype.$classData=p({Uo:0},!1,"org.scalajs.dom.package$",{Uo:1,c:1});var hh=void 0;function Ne(){hh||(hh=(new eh).b());return hh}function ih(){this.xf=null}ih.prototype=new q;
ih.prototype.constructor=ih;ih.prototype.b=function(){jh=this;Qb();Rb();Sb();Rb();Rb();Pb||(Pb=(new Ob).b());var a=[Pb.tf().th()],a=Vb((new H).Oa(a));this.xf=Wb(Xb("HomePage",Yb(a)));return this};ih.prototype.tf=function(){return this.xf.qe.D()};ih.prototype.$classData=p({Vo:0},!1,"pages.HomePage$",{Vo:1,c:1});var jh=void 0;function kh(){this.Ui=null}kh.prototype=new q;kh.prototype.constructor=kh;
kh.prototype.b=function(){lh=this;(new lf).b();var a=(new Oe).b(),b=mh().te("PUBLIC_URL",z(new A,function(){return function(){return""}}(this))),c=xe(ue(),b),b=nh(),c=df(a,oh(yf(Bf(),c.w))),b=ph(b,c.e(z(new A,function(a,b){return function(){return Xe(b,z(new A,function(){return function(){jh||(jh=(new ih).b());return jh.tf()}}(a)),w(new x,function(){return function(a){Rb();return a.th()}}(a)))}}(this,a)))),c=(new ve).h(""),c=cf(a,oh(yf(Bf(),c.w))),b=qh(ph(b,c.e(z(new A,function(){return function(){var a=
ef(),b=rh();return sh(a,b)}}(this,a))))),c=ef(),e=rh();this.Ui=th(b,Ue(a,sh(c,e),w(new x,function(){return function(a){De();return(new bf).l(a)}}(this,a))));return this};
kh.prototype.tf=function(){var a=this.Ui,b=uh(),c=new vh,e=a.Ra,f=a.Ya,k=a.Cc,l=a.Yd;c.$a=a.$a;c.Ra=e;c.Ya=f;c.Cc=k;c.Yd=l;c.fc=b;wh||(wh=(new xh).b());a=Me(Ne()).location;b=a.protocol+"//"+a.hostname;c=a.port;if(null===c)throw(new yh).b();e=zh();e=Ah(e,"^(?:80)?$");Bh(uf(new vf,e,c,Fa(c)))||(b=b+":"+a.port);a=(new Ch).h(b);Ie||(Ie=(new Fe).b());return Wb(Ge(a,this.Ui)).qe.D()};kh.prototype.$classData=p({Wo:0},!1,"webapp.AppRouter$",{Wo:1,c:1});var lh=void 0;function Dh(){}Dh.prototype=new q;
Dh.prototype.constructor=Dh;Dh.prototype.b=function(){return this};Dh.prototype.$classData=p({Yo:0},!1,"webapp.ScalaJsApp$",{Yo:1,c:1});var Eh=void 0;function Qa(){this.Ad=null}Qa.prototype=new q;Qa.prototype.constructor=Qa;function zb(a){return a.Ad.name}Qa.prototype.j=function(){return(this.Ad.isInterface?"interface ":this.Ad.isPrimitive?"":"class ")+zb(this)};Qa.prototype.$classData=p({pp:0},!1,"java.lang.Class",{pp:1,c:1});function Fh(){}Fh.prototype=new q;Fh.prototype.constructor=Fh;
Fh.prototype.b=function(){Gh=this;Hh();Hh();return this};Fh.prototype.$classData=p({Gp:0},!1,"java.lang.System$",{Gp:1,c:1});var Gh=void 0;function Ih(){}Ih.prototype=new q;Ih.prototype.constructor=Ih;Ih.prototype.b=function(){return this};function Jh(a,b){a=null===b.wa?0:za(b.wa);b=null===b.X?0:za(b.X);return a^b}function Kh(a,b,c){if(c&&c.$classData&&c.$classData.m.aq){a=b.wa;var e=c.wa;if(null===a?null===e:ya(a,e))return b=b.X,c=c.X,null===b?null===c:ya(b,c)}return!1}
Ih.prototype.$classData=p({Jp:0},!1,"java.util.AbstractMap$",{Jp:1,c:1});var Lh=void 0;function Mh(){Lh||(Lh=(new Ih).b());return Lh}function Nh(){}Nh.prototype=new q;Nh.prototype.constructor=Nh;Nh.prototype.b=function(){return this};function Oh(a,b){a=b.d.length;for(var c=0;c!==a;)b.d[c]=0,c=1+c|0}Nh.prototype.$classData=p({Kp:0},!1,"java.util.Arrays$",{Kp:1,c:1});var Ph=void 0;function Qh(){Ph||(Ph=(new Nh).b());return Ph}function Rh(){this.xj=this.yj=this.zj=null;this.Y=0}Rh.prototype=new q;
Rh.prototype.constructor=Rh;Rh.prototype.b=function(){return this};Rh.prototype.$classData=p({Lp:0},!1,"java.util.Collections$",{Lp:1,c:1});var Sh=void 0;function Th(){Sh||(Sh=(new Rh).b());return Sh}function Uh(){}Uh.prototype=new q;Uh.prototype.constructor=Uh;function Vh(){}Vh.prototype=Uh.prototype;function Wh(){}Wh.prototype=new q;Wh.prototype.constructor=Wh;function Xh(){}Xh.prototype=Wh.prototype;function Yh(a,b,c){return a.Vb(b)?a.e(b):c.e(b)}function Zh(){this.vk=this.ef=null}
Zh.prototype=new q;Zh.prototype.constructor=Zh;Zh.prototype.b=function(){$h=this;this.ef=(new ai).b();this.vk=(new bi).b();return this};Zh.prototype.$classData=p({mq:0},!1,"scala.PartialFunction$",{mq:1,c:1});var $h=void 0;function ci(){$h||($h=(new Zh).b());return $h}function Gg(){}Gg.prototype=new q;Gg.prototype.constructor=Gg;Gg.prototype.b=function(){return this};Gg.prototype.$classData=p({vq:0},!1,"scala.Predef$any2stringadd$",{vq:1,c:1});var Fg=void 0;function di(){}di.prototype=new q;
di.prototype.constructor=di;di.prototype.b=function(){return this};di.prototype.$classData=p({Aq:0},!1,"scala.math.Ordered$",{Aq:1,c:1});var ei=void 0;function fi(){this.Xj=null;this.Y=0}fi.prototype=new q;fi.prototype.constructor=fi;
fi.prototype.b=function(){gi=this;(new hi).b();ii||(ii=(new ji).b());ki||(ki=(new li).b());mi();ni();oi();Xd();B();pi||(pi=(new qi).b());ri||(ri=(new si).b());ti||(ti=(new ui).b());vi();wi||(wi=(new xi).b());this.Xj=yi();zi||(zi=(new Ai).b());Bi||(Bi=(new Ci).b());Di||(Di=(new Ei).b());Fi||(Fi=(new Gi).b());Hi||(Hi=(new Ii).b());Ji||(Ji=(new Ki).b());ei||(ei=(new di).b());Li||(Li=(new Mi).b());Ni||(Ni=(new Oi).b());Pi||(Pi=(new Qi).b());Ri||(Ri=(new Si).b());return this};
fi.prototype.$classData=p({Dq:0},!1,"scala.package$",{Dq:1,c:1});var gi=void 0;function De(){gi||(gi=(new fi).b());return gi}function Ti(){this.ke=null}Ti.prototype=new q;Ti.prototype.constructor=Ti;
Ti.prototype.b=function(){Ui=this;Vi||(Vi=(new Wi).b());Xi||(Xi=(new Yi).b());Zi||(Zi=(new $i).b());aj||(aj=(new bj).b());cj||(cj=(new dj).b());ej||(ej=(new fj).b());gj||(gj=(new hj).b());ij||(ij=(new jj).b());kj||(kj=(new lj).b());this.ke=kj;mj||(mj=(new nj).b());oj||(oj=(new pj).b());qj||(qj=(new rj).b());sj||(sj=(new tj).b());uj||(uj=(new vj).b());return this};Ti.prototype.$classData=p({Fq:0},!1,"scala.reflect.ClassManifestFactory$",{Fq:1,c:1});var Ui=void 0;function wj(){}wj.prototype=new q;
wj.prototype.constructor=wj;wj.prototype.b=function(){return this};wj.prototype.$classData=p({Gq:0},!1,"scala.reflect.ManifestFactory$",{Gq:1,c:1});var xj=void 0;function yj(){}yj.prototype=new q;yj.prototype.constructor=yj;yj.prototype.b=function(){zj=this;Ui||(Ui=(new Ti).b());xj||(xj=(new wj).b());return this};yj.prototype.$classData=p({Wq:0},!1,"scala.reflect.package$",{Wq:1,c:1});var zj=void 0;function Aj(){}Aj.prototype=new q;Aj.prototype.constructor=Aj;Aj.prototype.b=function(){return this};
function mh(){Bj();var a=Cj(),b=Dj();Gh||(Gh=(new Fh).b());var c=Th();0===(4&c.Y)<<24>>24&&0===(4&c.Y)<<24>>24&&(c.yj=(new Ej).qi((new Fj).b()),c.Y=(4|c.Y)<<24>>24);b=Gj(Hj(b,c.yj));b=Ij(b);return a.da().Xa(b).Sa()}Aj.prototype.$classData=p({Xq:0},!1,"scala.sys.package$",{Xq:1,c:1});var Jj=void 0;function Bj(){Jj||(Jj=(new Aj).b())}function Kj(){}Kj.prototype=new q;Kj.prototype.constructor=Kj;Kj.prototype.b=function(){(new Lj).b();return this};
Kj.prototype.$classData=p({cr:0},!1,"scala.util.control.Breaks",{cr:1,c:1});function Mj(){}Mj.prototype=new q;Mj.prototype.constructor=Mj;function Nj(){}Nj.prototype=Mj.prototype;function Oj(a,b){b=h(-862048943,b);b=h(461845907,b<<15|b>>>17|0);return a^b}function Pj(a,b){a=Oj(a,b);return-430675100+h(5,a<<13|a>>>19|0)|0}function Qj(a){a=h(-2048144789,a^(a>>>16|0));a=h(-1028477387,a^(a>>>13|0));return a^(a>>>16|0)}
function Q(a){Rj();var b=a.fa();if(0===b)return a=a.ha(),Aa(Ba(),a);for(var c=-889275714,e=0;e<b;)c=Pj(c,ug(vg(),a.ga(e))),e=1+e|0;return Qj(c^b)}function Sj(a,b,c){var e=(new Tj).vc(0),f=(new Tj).vc(0),k=(new Tj).vc(0),l=(new Tj).vc(1);b.P(w(new x,function(a,b,c,e,f){return function(a){a=ug(vg(),a);b.F=b.F+a|0;c.F^=a;0!==a&&(f.F=h(f.F,a));e.F=1+e.F|0}}(a,e,f,k,l)));a=Pj(c,e.F);a=Pj(a,f.F);a=Oj(a,l.F);return Qj(a^k.F)}
function Uj(a,b,c){var e=(new Tj).vc(0);c=(new Tj).vc(c);b.P(w(new x,function(a,b,c){return function(a){c.F=Pj(c.F,ug(vg(),a));b.F=1+b.F|0}}(a,e,c)));return Qj(c.F^e.F)}function Vj(){}Vj.prototype=new q;Vj.prototype.constructor=Vj;Vj.prototype.b=function(){return this};function Wj(a,b){a=h(-1640532531,b);Xj();return h(-1640532531,a<<24|16711680&a<<8|65280&(a>>>8|0)|a>>>24|0)}Vj.prototype.$classData=p({fr:0},!1,"scala.util.hashing.package$",{fr:1,c:1});var Yj=void 0;
function Zj(){Yj||(Yj=(new Vj).b());return Yj}function ui(){}ui.prototype=new q;ui.prototype.constructor=ui;ui.prototype.b=function(){return this};ui.prototype.$classData=p({hr:0},!1,"scala.collection.$colon$plus$",{hr:1,c:1});var ti=void 0;function si(){}si.prototype=new q;si.prototype.constructor=si;si.prototype.b=function(){return this};si.prototype.$classData=p({ir:0},!1,"scala.collection.$plus$colon$",{ir:1,c:1});var ri=void 0;function ak(){this.Ba=null}ak.prototype=new q;
ak.prototype.constructor=ak;ak.prototype.b=function(){bk=this;this.Ba=(new ck).b();return this};ak.prototype.$classData=p({nr:0},!1,"scala.collection.Iterator$",{nr:1,c:1});var bk=void 0;function oi(){bk||(bk=(new ak).b());return bk}function dk(a,b,c,e){return a.le((new ek).b(),b,c,e).oa.Ua}function fk(a,b,c){b=(new Id).l(b);a.P(w(new x,function(a,b,c){return function(a){c.F=Vd(b,c.F,a)}}(a,c,b)));return b.F}
function gk(a,b,c,e,f){var k=hk();kk(b,c);a.P(w(new x,function(a,b,c,e){return function(a){if(e.F)lk(b,a),e.F=!1;else return kk(b,c),lk(b,a)}}(a,b,e,k)));kk(b,f);return b}function mk(a,b){return(new nk).G(z(new A,function(a,b){return function(){return null===b?null:b&&b.$classData&&b.$classData.m.Zu&&b.av()===ok()?b.pv():pk(new qk,ok(),b)}}(a,b)))}
function rk(a,b){return(new nk).G(z(new A,function(a,b){return function(){return null===b?null:b&&b.$classData&&b.$classData.m.Ar&&b.Er()===ok()?b.Qt():sk(new tk,ok(),b)}}(a,b)))}function Hj(a,b){return(new nk).G(z(new A,function(a,b){return function(){return null===b?null:b&&b.$classData&&b.$classData.m.Yu&&b.$u()===ok()?b.ov():uk(new vk,ok(),b)}}(a,b)))}function nk(){this.il=null}nk.prototype=new q;nk.prototype.constructor=nk;nk.prototype.G=function(a){this.il=a;return this};
function Gj(a){return a.il.D()}nk.prototype.$classData=p({xr:0},!1,"scala.collection.convert.Decorators$AsScala",{xr:1,c:1});function wk(){}wk.prototype=new q;wk.prototype.constructor=wk;function xk(){}xk.prototype=wk.prototype;wk.prototype.da=function(){return yk(new zk,this.wk())};function Ak(){}Ak.prototype=new q;Ak.prototype.constructor=Ak;function Bk(){}Bk.prototype=Ak.prototype;Ak.prototype.Hc=function(){return this.da().Sa()};
function Ck(a,b){a:for(;;){if(!b.i()){a.gb(b.ra());b=b.ia();continue a}break}}function Dk(a,b){b&&b.$classData&&b.$classData.m.dg?Ck(a,b):b.P(w(new x,function(a){return function(b){return a.gb(b)}}(a)));return a}function Ek(){}Ek.prototype=new q;Ek.prototype.constructor=Ek;function Fk(){}Fk.prototype=Ek.prototype;function xi(){}xi.prototype=new q;xi.prototype.constructor=xi;xi.prototype.b=function(){return this};
xi.prototype.$classData=p({zs:0},!1,"scala.collection.immutable.Stream$$hash$colon$colon$",{zs:1,c:1});var wi=void 0;function Gk(){this.jj=this.km=null;this.Y=!1;this.fb=null}Gk.prototype=new q;Gk.prototype.constructor=Gk;function Hk(a,b,c){a.jj=c;if(null===b)throw R(P(),null);a.fb=b;return a}function Ik(a){a.Y||(a.Y||(a.km=a.jj.D(),a.Y=!0),a.jj=null);return a.km}Gk.prototype.$classData=p({Ds:0},!1,"scala.collection.immutable.StreamIterator$LazyCell",{Ds:1,c:1});function Jk(){}Jk.prototype=new q;
Jk.prototype.constructor=Jk;Jk.prototype.b=function(){return this};Jk.prototype.$classData=p({Es:0},!1,"scala.collection.immutable.StringOps$",{Es:1,c:1});var Kk=void 0;function Lk(){}Lk.prototype=new q;Lk.prototype.constructor=Lk;Lk.prototype.b=function(){return this};Lk.prototype.da=function(){var a=(new ek).b();return Mk(new Nk,a,w(new x,function(){return function(a){return(new Ok).h(a)}}(this)))};Lk.prototype.$classData=p({Ms:0},!1,"scala.collection.immutable.WrappedString$",{Ms:1,c:1});
var Pk=void 0;function Qk(a){return Rk(Xj(),-1+a.W.d.length|0)}function Sk(a,b){b=Kb(b);return Tk(a,b)}function Uk(a,b){var c=a.Vc;b=Wj(Zj(),b);a=-1+a.W.d.length|0;return((b>>>c|0|b<<(-c|0))>>>(32-Rk(Xj(),a)|0)|0)&a}
function Tk(a,b){for(var c=za(b),c=Uk(a,c),e=a.W.d[c];null!==e;){if(J(K(),e,b))return!1;c=(1+c|0)%a.W.d.length|0;e=a.W.d[c]}a.W.d[c]=b;a.wb=1+a.wb|0;null!==a.jb&&(b=c>>5,c=a.jb,c.d[b]=1+c.d[b]|0);if(a.wb>=a.Yc)for(b=a.W,a.W=m(v(u),[a.W.d.length<<1]),a.wb=0,null!==a.jb&&(c=1+(a.W.d.length>>5)|0,a.jb.d.length!==c?a.jb=m(v(Va),[c]):Oh(Qh(),a.jb)),a.Vc=Qk(a),a.Yc=Vk().Wf(a.ad,a.W.d.length),c=0;c<b.d.length;)e=b.d[c],null!==e&&Tk(a,e),c=1+c|0;return!0}
function Wk(a,b){b=Kb(b);for(var c=za(b),c=Uk(a,c),e=a.W.d[c];null!==e&&!J(K(),e,b);)c=(1+c|0)%a.W.d.length|0,e=a.W.d[c];return e}function Xk(){}Xk.prototype=new q;Xk.prototype.constructor=Xk;Xk.prototype.b=function(){return this};
Xk.prototype.Wf=function(a,b){if(!(500>a))throw(new Yk).l("assertion failed: loadFactor too large; must be \x3c 0.5");var c=b>>31,e=a>>31,f=65535&b,k=b>>>16|0,l=65535&a,r=a>>>16|0,t=h(f,l),l=h(k,l),N=h(f,r),f=t+((l+N|0)<<16)|0,t=(t>>>16|0)+N|0;a=(((h(b,e)+h(c,a)|0)+h(k,r)|0)+(t>>>16|0)|0)+(((65535&t)+l|0)>>>16|0)|0;return Zk(Ma(),f,a)};Xk.prototype.$classData=p({Ts:0},!1,"scala.collection.mutable.FlatHashTable$",{Ts:1,c:1});var $k=void 0;function Vk(){$k||($k=(new Xk).b());return $k}
function al(){}al.prototype=new q;al.prototype.constructor=al;al.prototype.b=function(){return this};al.prototype.j=function(){return"NullSentinel"};al.prototype.p=function(){return 0};al.prototype.$classData=p({Vs:0},!1,"scala.collection.mutable.FlatHashTable$NullSentinel$",{Vs:1,c:1});var bl=void 0;function Lb(){bl||(bl=(new al).b());return bl}function cl(a){return Rk(Xj(),-1+a.W.d.length|0)}
function dl(a,b,c){for(a=a.W.d[c];;)if(null!==a?(c=a.Lc(),c=!J(K(),c,b)):c=!1,c)a=a.s();else break;return a}function el(a,b){var c=-1+a.W.d.length|0,e=da(c);a=a.Vc;b=Wj(Zj(),b);return((b>>>a|0|b<<(-a|0))>>>e|0)&c}function fl(a){a.wh(750);gl();a.nh(m(v(Nb),[hl(0,16)]));a.oh(0);var b=a.ad,c=gl();gl();a.ph(c.Wf(b,hl(0,16)));a.lh(null);a.fj(cl(a))}function il(a){for(var b=-1+a.W.d.length|0;null===a.W.d[b]&&0<b;)b=-1+b|0;return b}function jl(a,b){var c=ug(vg(),b),c=el(a,c);return dl(a,b,c)}
function kl(a,b,c){var e=ug(vg(),b),e=el(a,e),f=dl(a,b,e);if(null!==f)return f;b=a.dk(b,c);b.Oi(a.W.d[e]);a.W.d[e]=b;a.oh(1+a.wb|0);ll(a,e);if(a.wb>a.Yc){b=a.W.d.length<<1;c=a.W;a.nh(m(v(Nb),[b]));null!==a.jb&&(e=1+(a.W.d.length>>5)|0,a.jb.d.length!==e?a.lh(m(v(Va),[e])):Oh(Qh(),a.jb));for(e=-1+c.d.length|0;0<=e;){for(f=c.d[e];null!==f;){var k=f.Lc(),k=ug(vg(),k),k=el(a,k),l=f.s();f.Oi(a.W.d[k]);a.W.d[k]=f;f=l;ll(a,k)}e=-1+e|0}a.ph(gl().Wf(a.ad,b))}return null}
function ll(a,b){null!==a.jb&&(a=a.jb,b>>=5,a.d[b]=1+a.d[b]|0)}function ml(){}ml.prototype=new q;ml.prototype.constructor=ml;ml.prototype.b=function(){return this};function hl(a,b){return 1<<(-da(-1+b|0)|0)}ml.prototype.Wf=function(a,b){var c=b>>31,e=a>>31,f=65535&b,k=b>>>16|0,l=65535&a,r=a>>>16|0,t=h(f,l),l=h(k,l),N=h(f,r),f=t+((l+N|0)<<16)|0,t=(t>>>16|0)+N|0;a=(((h(b,e)+h(c,a)|0)+h(k,r)|0)+(t>>>16|0)|0)+(((65535&t)+l|0)>>>16|0)|0;return Zk(Ma(),f,a)};
ml.prototype.$classData=p({ct:0},!1,"scala.collection.mutable.HashTable$",{ct:1,c:1});var nl=void 0;function gl(){nl||(nl=(new ml).b());return nl}function ol(){this.Ge=!1;this.Ck=this.Qg=this.uf=null;this.Qh=!1;this.Zk=this.Gk=0}ol.prototype=new q;ol.prototype.constructor=ol;
ol.prototype.b=function(){pl=this;this.uf=(this.Ge=!!(g.ArrayBuffer&&g.Int32Array&&g.Float32Array&&g.Float64Array))?new g.ArrayBuffer(8):null;this.Qg=this.Ge?new g.Int32Array(this.uf,0,2):null;this.Ge&&new g.Float32Array(this.uf,0,2);this.Ck=this.Ge?new g.Float64Array(this.uf,0,1):null;if(this.Ge)this.Qg[0]=16909060,a=1===((new g.Int8Array(this.uf,0,8))[0]|0);else var a=!0;this.Gk=(this.Qh=a)?0:1;this.Zk=this.Qh?1:0;return this};
function Ca(a,b){var c=b|0;if(c===b&&-Infinity!==1/b)return c;if(a.Ge)a.Ck[0]=b,a=(new ql).Ed(a.Qg[a.Zk]|0,a.Qg[a.Gk]|0);else{if(b!==b)a=!1,b=2047,c=+g.Math.pow(2,51);else if(Infinity===b||-Infinity===b)a=0>b,b=2047,c=0;else if(0===b)a=-Infinity===1/b,c=b=0;else{var e=(a=0>b)?-b:b;if(e>=+g.Math.pow(2,-1022)){b=+g.Math.pow(2,52);var c=+g.Math.log(e)/.6931471805599453,c=+g.Math.floor(c)|0,c=1023>c?c:1023,f=+g.Math.pow(2,c);f>e&&(c=-1+c|0,f/=2);f=e/f*b;e=+g.Math.floor(f);f-=e;e=.5>f?e:.5<f?1+e:0!==e%
2?1+e:e;2<=e/b&&(c=1+c|0,e=1);1023<c?(c=2047,e=0):(c=1023+c|0,e-=b);b=c;c=e}else b=e/+g.Math.pow(2,-1074),c=+g.Math.floor(b),e=b-c,b=0,c=.5>e?c:.5<e?1+c:0!==c%2?1+c:c}c=+c;a=(new ql).Ed(c|0,(a?-2147483648:0)|(b|0)<<20|c/4294967296|0)}return a.Pa^a.Ub}ol.prototype.$classData=p({Bt:0},!1,"scala.scalajs.runtime.Bits$",{Bt:1,c:1});var pl=void 0;function Da(){pl||(pl=(new ol).b());return pl}function ec(){}ec.prototype=new q;ec.prototype.constructor=ec;ec.prototype.b=function(){return this};
ec.prototype.$classData=p({Ct:0},!1,"scala.scalajs.runtime.Compat$",{Ct:1,c:1});var dc=void 0;function rl(){this.Y=!1}rl.prototype=new q;rl.prototype.constructor=rl;rl.prototype.b=function(){return this};function we(a,b){if(null===b)throw(new yh).b();a=Ah(zh(),"/*$");b=uf(new vf,a,b,b.length|0);sl(b);tl(b)?(a=(new ul).b(),vl(b,a,"/"),wl(b,a),b=a.j()):b=b.ve;return b}function Aa(a,b){a=0;for(var c=1,e=-1+(b.length|0)|0;0<=e;)a=a+h(65535&(b.charCodeAt(e)|0),c)|0,c=h(31,c),e=-1+e|0;return a}
rl.prototype.$classData=p({Et:0},!1,"scala.scalajs.runtime.RuntimeString$",{Et:1,c:1});var xl=void 0;function Ba(){xl||(xl=(new rl).b());return xl}function yl(){}yl.prototype=new q;yl.prototype.constructor=yl;yl.prototype.b=function(){return this};function R(a,b){return zl(b)?b.Od:b}function gg(a,b){return b&&b.$classData&&b.$classData.m.Ib?b:(new Al).l(b)}yl.prototype.$classData=p({Ft:0},!1,"scala.scalajs.runtime.package$",{Ft:1,c:1});var Bl=void 0;function P(){Bl||(Bl=(new yl).b());return Bl}
function Cl(){}Cl.prototype=new q;Cl.prototype.constructor=Cl;Cl.prototype.b=function(){return this};function Dl(a,b){if(El(b))return a.X===b.X;if(Fl(b)){if("number"===typeof b)return+b===a.X;if(wa(b)){b=La(b);var c=b.Ub;a=a.X;return b.Pa===a&&c===a>>31}return null===b?null===a:ya(b,a)}return null===a&&null===b}
function J(a,b,c){if(b===c)c=!0;else if(Fl(b))a:if(Fl(c))c=Gl(b,c);else{if(El(c)){if("number"===typeof b){c=+b===c.X;break a}if(wa(b)){a=La(b);b=a.Ub;c=c.X;c=a.Pa===c&&b===c>>31;break a}}c=null===b?null===c:ya(b,c)}else c=El(b)?Dl(b,c):null===b?null===c:ya(b,c);return c}
function Gl(a,b){if("number"===typeof a){a=+a;if("number"===typeof b)return a===+b;if(wa(b)){var c=La(b);b=c.Pa;c=c.Ub;return a===Hl(Ma(),b,c)}return b&&b.$classData&&b.$classData.m.Cq?b.n(a):!1}if(wa(a)){c=La(a);a=c.Pa;c=c.Ub;if(wa(b)){b=La(b);var e=b.Ub;return a===b.Pa&&c===e}return"number"===typeof b?(b=+b,Hl(Ma(),a,c)===b):b&&b.$classData&&b.$classData.m.Cq?b.n((new ql).Ed(a,c)):!1}return null===a?null===b:ya(a,b)}Cl.prototype.$classData=p({It:0},!1,"scala.runtime.BoxesRunTime$",{It:1,c:1});
var Il=void 0;function K(){Il||(Il=(new Cl).b());return Il}var Jl=p({Lt:0},!1,"scala.runtime.Null$",{Lt:1,c:1});function Kl(){}Kl.prototype=new q;Kl.prototype.constructor=Kl;Kl.prototype.b=function(){return this};function Ll(a,b){if(Ab(b,1)||cb(b,1)||fb(b,1)||db(b,1)||eb(b,1)||$a(b,1)||ab(b,1)||bb(b,1)||Za(b,1)||Ml(b))return b.d.length;if(null===b)throw(new yh).b();throw(new G).l(b);}
function Nl(a,b,c,e){if(Ab(b,1))b.d[c]=e;else if(cb(b,1))b.d[c]=e|0;else if(fb(b,1))b.d[c]=+e;else if(db(b,1))b.d[c]=La(e);else if(eb(b,1))b.d[c]=+e;else if($a(b,1))b.d[c]=null===e?0:e.X;else if(ab(b,1))b.d[c]=e|0;else if(bb(b,1))b.d[c]=e|0;else if(Za(b,1))b.d[c]=!!e;else if(Ml(b))b.d[c]=void 0;else{if(null===b)throw(new yh).b();throw(new G).l(b);}}function S(a,b){a=b.ka();return dk(a,b.ha()+"(",",",")")}Kl.prototype.$classData=p({Nt:0},!1,"scala.runtime.ScalaRunTime$",{Nt:1,c:1});var Ol=void 0;
function T(){Ol||(Ol=(new Kl).b());return Ol}function Pl(){}Pl.prototype=new q;Pl.prototype.constructor=Pl;Pl.prototype.b=function(){return this};
function ug(a,b){if(null===b)return 0;if("number"===typeof b){a=+b;b=2147483647<a?2147483647:-2147483648>a?-2147483648:a|0;if(b===a)a=b;else{b=Ma();var c;if(-9223372036854775808>a)b.id=-2147483648,c=0;else if(0x7fffffffffffffff<=a)b.id=2147483647,c=-1;else{c=a|0;var e=a/4294967296|0;b.id=0>a&&0!==c?-1+e|0:e}b=b.id;a=Hl(Ma(),c,b)===a?c^b:Ca(Da(),a)}return a}return wa(b)?(a=La(b),b=(new ql).Ed(a.Pa,a.Ub),a=b.Pa,b=b.Ub,b===a>>31?a:a^b):za(b)}
Pl.prototype.$classData=p({Pt:0},!1,"scala.runtime.Statics$",{Pt:1,c:1});var Ql=void 0;function vg(){Ql||(Ql=(new Pl).b());return Ql}function tc(){this.Wg=this.Bg=this.sh=null}tc.prototype=new mc;tc.prototype.constructor=tc;function sc(a,b,c,e){a.sh=b;a.Bg=c;a.Wg=e;return a}tc.prototype.D=function(){var a=this.Wg,b=this.Bg;return void 0===a?this.sh:b.e(a)};tc.prototype.$classData=p({tm:0},!1,"japgolly.scalajs.react.CtorType$Nullary",{tm:1,au:1,c:1});function xc(){}xc.prototype=new q;
xc.prototype.constructor=xc;xc.prototype.b=function(){return this};function Rl(a,b){var c=b.e(a.sh);return sc(new tc,c,ib(b,a.Bg),a.Wg)}xc.prototype.$classData=p({um:0},!1,"japgolly.scalajs.react.CtorType$ProfunctorN$",{um:1,c:1,hu:1});var wc=void 0;function Sl(){this.De=this.hm=null}Sl.prototype=new q;Sl.prototype.constructor=Sl;function yc(a){var b=wc,c=new Sl;c.hm=a;c.De=b;return c}Sl.prototype.$classData=p({wm:0},!1,"japgolly.scalajs.react.CtorType$Summoner$$anon$1",{wm:1,c:1,bu:1});
function Tl(){}Tl.prototype=new q;Tl.prototype.constructor=Tl;Tl.prototype.b=function(){Ul=this;return this};function Oc(a,b,c){var e=c.hm.e(b),e=Rl(e,w(new x,function(){return function(a){return Vl(Nc(),a)}}(a)));return Wl(a,b,e,c.De)}function Vl(a,b){return Xl(new Yl,b,w(new x,function(){return function(a){Nc();return(new Jd).Ca(a)}}(a)))}Tl.prototype.$classData=p({Em:0},!1,"japgolly.scalajs.react.component.Js$",{Em:1,c:1,Nm:1});var Ul=void 0;function Nc(){Ul||(Ul=(new Tl).b());return Ul}
function Zl(){}Zl.prototype=new q;Zl.prototype.constructor=Zl;Zl.prototype.b=function(){$l=this;return this};Zl.prototype.$classData=p({Sm:0},!1,"japgolly.scalajs.react.component.JsFn$",{Sm:1,c:1,Nm:1});var $l=void 0;function xd(){this.v=null}xd.prototype=new q;xd.prototype.constructor=xd;d=xd.prototype;d.n=function(a){return wd().re(this.v,a)};d.j=function(){return wd().Je(this.v)};d.Ca=function(a){this.v=a;return this};d.p=function(){return za(this.v)};d.ab=function(){return this.v};
d.$classData=p({Fj:0},!1,"japgolly.scalajs.react.component.builder.Lifecycle$ComponentWillUnmount",{Fj:1,c:1,Kd:1});function Sd(){this.Xf=this.Wd=this.v=null}Sd.prototype=new q;Sd.prototype.constructor=Sd;Sd.prototype.j=function(){return pd(Fc(),"ComponentWillUpdate(props: "+kb(this).Bc()+" \u2192 "+this.Wd+", state: "+kb(this).Rb()+" \u2192 "+this.Xf+")")};Sd.prototype.If=function(a,b,c){this.v=a;this.Wd=b;this.Xf=c;return this};Sd.prototype.ab=function(){return this.v};
Sd.prototype.$classData=p({on:0},!1,"japgolly.scalajs.react.component.builder.Lifecycle$ComponentWillUpdate",{on:1,c:1,Kd:1});function Td(){this.Xf=this.Wd=this.v=null}Td.prototype=new q;Td.prototype.constructor=Td;Td.prototype.j=function(){return pd(Fc(),"ShouldComponentUpdate(props: "+kb(this).Bc()+" \u2192 "+this.Wd+", state: "+kb(this).Rb()+" \u2192 "+this.Xf+")")};Td.prototype.If=function(a,b,c){this.v=a;this.Wd=b;this.Xf=c;return this};Td.prototype.ab=function(){return this.v};
Td.prototype.$classData=p({qn:0},!1,"japgolly.scalajs.react.component.builder.Lifecycle$ShouldComponentUpdate",{qn:1,c:1,Kd:1});function Ke(){this.Nf=null}Ke.prototype=new q;Ke.prototype.constructor=Ke;Ke.prototype.b=function(){this.Nf=B();return this};Ke.prototype.$classData=p({wn:0},!1,"japgolly.scalajs.react.extra.OnUnmount$Backend",{wn:1,c:1,fu:1});function am(){this.pa=this.rl=null}am.prototype=new nf;am.prototype.constructor=am;
function bm(a){var b=new am;if(null===a)throw R(P(),null);b.pa=a;b.rl=cm(a,dm());return b}am.prototype.eh=function(){return this.rl};am.prototype.$classData=p({Mn:0},!1,"japgolly.scalajs.react.extra.router.RouterLogic$$anon$1",{Mn:1,Kn:1,c:1});function em(){this.Th=this.Ri=this.ah=null}em.prototype=new Df;em.prototype.constructor=em;em.prototype.j=function(){return"Route("+this.ah+")"};function fm(a,b,c,e){a.ah=b;a.Ri=c;a.Th=e;return a}
function gm(a,b,c){return fm(new em,a.ah,w(new x,function(a,b){return function(c){c=a.Ri.e(c);return c.i()?I():b.e(c.Ja())}}(a,b)),ib(a.Th,c))}em.prototype.ml=function(a,b){return gm(this,a,b)};function Re(a,b){b=b.w;b=uf(new vf,a.ah,b,b.length|0);return Bh(b)?a.Ri.e(b):I()}em.prototype.$classData=p({On:0},!1,"japgolly.scalajs.react.extra.router.StaticDsl$Route",{On:1,Rn:1,c:1});function zf(){this.fh=null;this.dl=0;this.Sh=this.Qi=null}zf.prototype=new Df;zf.prototype.constructor=zf;
zf.prototype.j=function(){return"RouteB("+this.fh+")"};function hm(a,b,c){return Af(new zf,a.fh,a.dl,w(new x,function(a,b){return function(c){c=a.Qi.e(c);return c.i()?I():b.e(c.Ja())}}(a,b)),ib(a.Sh,c))}zf.prototype.ml=function(a,b){return hm(this,a,b)};
function oh(a){var b=Ah(zh(),"^"+a.fh+"$");return fm(new em,b,w(new x,function(a){return function(b){return a.Qi.e(w(new x,function(a,b){return function(a){return im(b,1+(a|0)|0)}}(a,b)))}}(a)),w(new x,function(a){return function(b){return(new ve).h(a.Sh.e(b))}}(a)))}function Af(a,b,c,e,f){a.fh=b;a.dl=c;a.Qi=e;a.Sh=f;return a}zf.prototype.$classData=p({Pn:0},!1,"japgolly.scalajs.react.extra.router.StaticDsl$RouteB",{Pn:1,Rn:1,c:1});function Sf(){}Sf.prototype=new Pf;Sf.prototype.constructor=Sf;
Sf.prototype.b=function(){return this};Sf.prototype.zk=function(a){return a};Sf.prototype.nl=function(a){return a.D()};Sf.prototype.$classData=p({Yn:0},!1,"japgolly.scalajs.react.internal.Effect$$anon$1",{Yn:1,Wn:1,c:1});function Tf(){}Tf.prototype=new Pf;Tf.prototype.constructor=Tf;Tf.prototype.b=function(){return this};Tf.prototype.zk=function(a){return a.D().H};Tf.prototype.nl=function(a){return(new C).G(a)};
Tf.prototype.$classData=p({Zn:0},!1,"japgolly.scalajs.react.internal.Effect$$anon$2",{Zn:1,Wn:1,c:1});function jm(){Vf.call(this)}jm.prototype=new Wf;jm.prototype.constructor=jm;jm.prototype.sf=function(a){return a.D()};function Zf(a){var b=new jm;Vf.prototype.Ng.call(b,a,a);return b}jm.prototype.$classData=p({ao:0},!1,"japgolly.scalajs.react.internal.Effect$Trans$Id",{ao:1,Sj:1,c:1});function km(){}km.prototype=new q;km.prototype.constructor=km;
km.prototype.b=function(){lm=this;Ac||(Ac=(new zc).b());Nc();$l||($l=(new Zl).b());Gc();Ic||(Ic=(new Hc).b());return this};km.prototype.$classData=p({ko:0},!1,"japgolly.scalajs.react.package$",{ko:1,c:1,cu:1});var lm=void 0;function Qb(){lm||(lm=(new km).b())}function mm(){this.Qa=null}mm.prototype=new tg;mm.prototype.constructor=mm;function nm(){}nm.prototype=mm.prototype;mm.prototype.h=function(a){sg.prototype.h.call(this,a);return this};
mm.prototype.$classData=p({Tj:0},!1,"japgolly.scalajs.react.vdom.Attr$Generic",{Tj:1,Jh:1,c:1});function om(){this.Qa=null}om.prototype=new tg;om.prototype.constructor=om;om.prototype.b=function(){sg.prototype.h.call(this,"key");return this};om.prototype.$classData=p({no:0},!1,"japgolly.scalajs.react.vdom.Attr$Key$",{no:1,Jh:1,c:1});var pm=void 0;function qm(){}qm.prototype=new q;qm.prototype.constructor=qm;qm.prototype.b=function(){return this};
qm.prototype.$classData=p({vo:0},!1,"japgolly.scalajs.react.vdom.HtmlTags$",{vo:1,c:1,nu:1});var rm=void 0;function bh(){}bh.prototype=new q;bh.prototype.constructor=bh;bh.prototype.b=function(){return this};bh.prototype.Nh=function(){};bh.prototype.$classData=p({Ko:0},!1,"japgolly.scalajs.react.vdom.TagMod$$anon$3",{Ko:1,c:1,Kh:1});function sm(){this.Ki=this.im=this.$d=null;this.Y=!1}sm.prototype=new q;sm.prototype.constructor=sm;sm.prototype.j=function(){return Yb(this).j()};
sm.prototype.Nh=function(a){a=a.Mh;var b=Yb(this).ql;a.e(b)};
function Yb(a){if(!a.Y&&!a.Y){for(var b=(new tm).b(),c=a.Ki,e=a.Ki,e=m(v(um),[vm(e)]),f=0;;){var k=c,l=B();if(null!==k&&k.n(l))break;else e.d[f]=c.ra(),c=c.Xc(),f=1+f|0}for(c=e.d.length;0<c;)for(c=-1+c|0,f=e.d[c],k=0;k<f.ja();)f.Za(k).Nh(b),k=1+k|0;e=a.im;c=b.Yg;void 0!==c&&(Dg(),b.$f.className=c);Dg();c=b.kj;c=0===(g.Object.keys(c).length|0)?void 0:c;void 0!==c&&(Dg(),b.$f.style=c);Jg||(Jg=(new Ig).b());c=Jg.Zj;f=b.$f;k=b.wa;b=b.Vh;b=(0,c.ib)(e,f,k,b);b=wm(b);a.$d=b;a.Y=!0}return a.$d}
sm.prototype.$classData=p({Lo:0},!1,"japgolly.scalajs.react.vdom.TagOf",{Lo:1,c:1,Kh:1});function Ub(){this.dh=null}Ub.prototype=new q;Ub.prototype.constructor=Ub;function xm(){}xm.prototype=Ub.prototype;Ub.prototype.Nh=function(a){a.Mh.e(this.dh)};Ub.prototype.si=function(a){this.dh=a;return this};Ub.prototype.$classData=p({Uj:0},!1,"japgolly.scalajs.react.vdom.VdomNode",{Uj:1,c:1,Kh:1});function ym(){}ym.prototype=new q;ym.prototype.constructor=ym;function zm(){}zm.prototype=ym.prototype;
function Fl(a){return!!(a&&a.$classData&&a.$classData.m.xe||"number"===typeof a)}function U(){this.sb=null}U.prototype=new q;U.prototype.constructor=U;function Am(){}Am.prototype=U.prototype;U.prototype.Kg=function(){if(void 0===g.Error.captureStackTrace){try{var a={}.undef()}catch(b){if(a=gg(P(),b),null!==a)if(zl(a))a=a.Od;else throw R(P(),a);else throw b;}this.stackdata=a}else g.Error.captureStackTrace(this),this.stackdata=this;return this};U.prototype.ii=function(){return this.sb};
U.prototype.j=function(){var a=zb(ka(this)),b=this.ii();return null===b?a:a+": "+b};U.prototype.yb=function(a,b,c,e){this.sb=a;e&&this.Kg();return this};function Bm(){}Bm.prototype=new q;Bm.prototype.constructor=Bm;function Cm(){}d=Cm.prototype=Bm.prototype;d.ch=function(){throw(new Dm).b();};
d.n=function(a){if(a===this)return!0;if(a&&a.$classData&&a.$classData.m.Bi&&this.r()===a.r()){var b=Dj(),c=this.dd();return Gj(mk(b,c)).Fb(w(new x,function(a,b){return function(a){var c=b.Ff(a.wa);a=a.X;return null===c?null===a:ya(c,a)}}(this,a)))}return!1};d.j=function(){var a=Dj(),b=this.dd().Hb(),a=Gj(rk(a,b)),a=(new fg).af(a,w(new x,function(){return function(a){return a.wa+"\x3d"+a.X}}(this)));return dk(a,"{",", ","}")};
d.Cg=function(a){for(var b=Dj(),c=this.dd().Hb(),b=Gj(rk(b,c)),c=!1;!c&&b.x();)c=b.s(),c=null===c?null===a:Kh(Mh(),c,a);return c};d.Ff=function(a){var b=Dj(),c=this.dd().Hb(),b=Gj(rk(b,c));a:{for(;b.x();){var c=b.s(),e=c.wa;if(null===e?null===a:ya(e,a)){a=(new L).l(c);break a}}a=I()}return a.i()?null:a.Ja().X};d.r=function(){return this.dd().r()};d.p=function(){var a=Dj(),b=this.dd();return Gj(mk(a,b)).dc(0,D(function(){return function(a,b){a|=0;return Jh(Mh(),b)+a|0}}(this)))|0};function Em(){}
Em.prototype=new q;Em.prototype.constructor=Em;Em.prototype.b=function(){return this};Em.prototype.s=function(){throw(new V).b();};Em.prototype.x=function(){return!1};Em.prototype.$classData=p({Op:0},!1,"java.util.Collections$EmptyIterator",{Op:1,c:1,Ai:1});function Fm(){this.fb=this.Fi=this.ui=null}Fm.prototype=new q;Fm.prototype.constructor=Fm;function Gm(){}Gm.prototype=Fm.prototype;
Fm.prototype.s=function(){this.Fi=(new L).l(this.ui.s());var a=this.Fi.Ja(),b=new Hm;if(null===this)throw R(P(),null);b.pa=this;Im.prototype.Q.call(b,a.sa,this.pa.og.Td.e(a));return b};Fm.prototype.x=function(){return this.ui.x()};Fm.prototype.pi=function(a){if(null===a)throw R(P(),null);this.fb=a;this.ui=a.Td.Yk().z();this.Fi=I();return this};function Jm(){this.fb=this.Ei=this.vi=null}Jm.prototype=new q;Jm.prototype.constructor=Jm;Jm.prototype.s=function(){this.Ei=(new L).l(this.vi.s().sa);return this.Ei.Ja()};
Jm.prototype.x=function(){return this.vi.x()};Jm.prototype.$classData=p({Zp:0},!1,"java.util.HashSet$$anon$1",{Zp:1,c:1,Ai:1});function vf(){this.Nk=this.kl=null;this.ul=this.vl=0;this.gd=this.ve=this.gh=null;this.Ag=!1;this.Pe=0}vf.prototype=new q;vf.prototype.constructor=vf;
function tl(a){if(a.Ag){a.gd=a.gh.exec(a.ve);if(null!==a.gd){var b=a.gd[0];if(void 0===b)throw(new V).h("undefined.get");if(null===b)throw(new yh).b();""===b&&(b=a.gh,b.lastIndex=1+(b.lastIndex|0)|0)}else a.Ag=!1;I();return null!==a.gd}return!1}function Km(a){if(null===a.gd)throw(new Lm).h("No match available");return a.gd}function im(a,b){a=Km(a)[b];return void 0===a?null:a}function Bh(a){sl(a);tl(a);null===a.gd||0===(Km(a).index|0)&&Nm(a)===(a.ve.length|0)||sl(a);return null!==a.gd}
function wl(a,b){Om(b,a.ve.substring(a.Pe));a.Pe=a.ve.length|0}function Nm(a){var b=Km(a).index|0;a=Km(a)[0];if(void 0===a)throw(new V).h("undefined.get");return b+(a.length|0)|0}function uf(a,b,c,e){a.kl=b;a.Nk=c;a.vl=0;a.ul=e;b=a.kl;c=new g.RegExp(b.ye);b=c!==b.ye?c:new g.RegExp(b.ye.source,(b.ye.global?"g":"")+(b.ye.ignoreCase?"i":"")+(b.ye.multiline?"m":""));a.gh=b;b=a.Nk;c=a.vl;e=a.ul;b="string"===typeof b?b.substring(c,e):b.lj(c,e);a.ve=ja(b);a.gd=null;a.Ag=!0;a.Pe=0;I();return a}
function vl(a,b,c){var e=a.ve,f=a.Pe,k=Km(a).index|0;Om(b,e.substring(f,k));e=c.length|0;for(f=0;f<e;)switch(k=65535&(c.charCodeAt(f)|0),k){case 36:for(k=f=1+f|0;;){if(f<e)var l=65535&(c.charCodeAt(f)|0),l=48<=l&&57>=l;else l=!1;if(l)f=1+f|0;else break}Xj();k=c.substring(k,f);l=null===k?0:k.length|0;0===l&&Pm(k);var r=65535&(k.charCodeAt(0)|0),t=45===r,N=t?2147483648:2147483647,r=t||43===r?1:0;r>=(k.length|0)&&Pm(k);for(var aa=0;r!==l;){Qm||(Qm=(new Rm).b());var X;X=Qm;var Y=65535&(k.charCodeAt(r)|
0);if(256>Y)X=48<=Y&&57>=Y?-48+Y|0:65<=Y&&90>=Y?-55+Y|0:97<=Y&&122>=Y?-87+Y|0:-1;else if(65313<=Y&&65338>=Y)X=-65303+Y|0;else if(65345<=Y&&65370>=Y)X=-65335+Y|0;else{var oa;a:{Qh();oa=Sm(X);var Cq=Y,ik=0,Mm=oa.d.length;for(;;){if(ik===Mm){oa=-1-ik|0;break a}var jk=(ik+Mm|0)>>>1|0,Dq=oa.d[jk];if(Cq<Dq)Mm=jk;else{if(J(K(),Cq,Dq)){oa=jk;break a}ik=1+jk|0}}}oa=0>oa?-2-oa|0:oa;0>oa?X=-1:(X=Y-Sm(X).d[oa]|0,X=9<X?-1:X)}X=10>X?X:-1;aa=10*aa+X;(-1===X||aa>N)&&Pm(k);r=1+r|0}Om(b,im(a,t?-aa|0:aa|0));break;case 92:f=
1+f|0;f<e&&(k=65535&(c.charCodeAt(f)|0),Tm(b.sd,k));f=1+f|0;break;default:Tm(b.sd,k),f=1+f|0}a.Pe=Nm(a)}function tf(a,b){sl(a);for(var c=(new ul).b();tl(a);)vl(a,c,b);wl(a,c);return c.j()}function sl(a){a.gh.lastIndex=0;a.gd=null;a.Ag=!0;a.Pe=0;I()}vf.prototype.$classData=p({cq:0},!1,"java.util.regex.Matcher",{cq:1,c:1,zu:1});function Um(){}Um.prototype=new q;Um.prototype.constructor=Um;Um.prototype.b=function(){return this};Um.prototype.yg=function(){return(new ek).b()};Um.prototype.xg=function(){return(new ek).b()};
Um.prototype.$classData=p({uq:0},!1,"scala.Predef$$anon$3",{uq:1,c:1,Yi:1});function hi(){}hi.prototype=new q;hi.prototype.constructor=hi;hi.prototype.b=function(){return this};hi.prototype.j=function(){return"object AnyRef"};hi.prototype.$classData=p({Eq:0},!1,"scala.package$$anon$1",{Eq:1,c:1,Ju:1});function Vm(){this.ij=this.al=this.gj=0}Vm.prototype=new Nj;Vm.prototype.constructor=Vm;Vm.prototype.b=function(){Wm=this;this.gj=Aa(Ba(),"Seq");this.al=Aa(Ba(),"Map");this.ij=Aa(Ba(),"Set");return this};
function Xm(a,b){var c;if(b&&b.$classData&&b.$classData.m.Kl){c=0;a=a.gj;for(var e=b;!e.i();)b=e.ra(),e=e.Xc(),a=Pj(a,ug(vg(),b)),c=1+c|0;c=Qj(a^c)}else c=Uj(a,b,a.gj);return c}Vm.prototype.$classData=p({er:0},!1,"scala.util.hashing.MurmurHash3$",{er:1,Ou:1,c:1});var Wm=void 0;function Rj(){Wm||(Wm=(new Vm).b());return Wm}function Ym(a,b){for(var c=!0;c&&a.x();)c=!!b.e(a.s());return c}function Zm(a,b){for(;a.x();)b.e(a.s())}
function $m(a){if(a.x()){var b=a.s();return(new an).Jf(b,z(new A,function(a){return function(){return a.Db()}}(a)))}vi();return bn()}function cn(){}cn.prototype=new Bk;cn.prototype.constructor=cn;function dn(){}dn.prototype=cn.prototype;function en(){this.Ma=null}en.prototype=new Bk;en.prototype.constructor=en;function fn(){}fn.prototype=en.prototype;en.prototype.b=function(){this.Ma=(new gn).Lf(this);return this};function hn(){this.fb=null}hn.prototype=new q;hn.prototype.constructor=hn;
function jn(){}jn.prototype=hn.prototype;hn.prototype.yg=function(){return this.fb.da()};hn.prototype.xg=function(a){return a.Na().da()};hn.prototype.Lf=function(a){if(null===a)throw R(P(),null);this.fb=a;return this};function kn(){}kn.prototype=new xk;kn.prototype.constructor=kn;function ln(){}ln.prototype=kn.prototype;function mn(){this.Hi=null}mn.prototype=new Fk;mn.prototype.constructor=mn;function nn(a,b){a.Hi=b;b=new on;if(null===a)throw R(P(),null);b.pa=a}
mn.prototype.Ph=function(a,b){return Vd(this.Hi,a,b)};mn.prototype.$classData=p({Mr:0},!1,"scala.collection.immutable.HashMap$$anon$2",{Mr:1,Rr:1,c:1});function on(){this.pa=null}on.prototype=new Fk;on.prototype.constructor=on;on.prototype.Ph=function(a,b){return Vd(this.pa.Hi,b,a)};on.prototype.$classData=p({Nr:0},!1,"scala.collection.immutable.HashMap$$anon$2$$anon$3",{Nr:1,Rr:1,c:1});function pn(){}pn.prototype=new q;pn.prototype.constructor=pn;d=pn.prototype;d.b=function(){return this};d.e=function(){return this};
d.j=function(){return"\x3cfunction1\x3e"};d.sc=function(a){return jb(this,a)};d.$classData=p({as:0},!1,"scala.collection.immutable.List$$anon$1",{as:1,c:1,y:1});function qn(a,b,c){c=c.Id();switch(c){case -1:break;default:a.Qb(b<c?b:c)}}function rn(){}rn.prototype=new q;rn.prototype.constructor=rn;function sn(){}sn.prototype=rn.prototype;rn.prototype.j=function(){return"\x3cfunction0\x3e"};function tn(){}tn.prototype=new q;tn.prototype.constructor=tn;function un(){}un.prototype=tn.prototype;
tn.prototype.j=function(){return"\x3cfunction1\x3e"};tn.prototype.sc=function(a){return jb(this,a)};function vn(){}vn.prototype=new q;vn.prototype.constructor=vn;function wn(){}wn.prototype=vn.prototype;vn.prototype.j=function(){return"\x3cfunction2\x3e"};function xn(){}xn.prototype=new q;xn.prototype.constructor=xn;function yn(){}yn.prototype=xn.prototype;xn.prototype.j=function(){return"\x3cfunction3\x3e"};function zn(){}zn.prototype=new q;zn.prototype.constructor=zn;function An(){}
An.prototype=zn.prototype;zn.prototype.j=function(){return"\x3cfunction4\x3e"};function Bn(){this.F=!1}Bn.prototype=new q;Bn.prototype.constructor=Bn;Bn.prototype.j=function(){return""+this.F};function hk(){var a=new Bn;a.F=!0;return a}Bn.prototype.$classData=p({Ht:0},!1,"scala.runtime.BooleanRef",{Ht:1,c:1,f:1});function Ml(a){return!!(a&&a.$classData&&1===a.$classData.Re&&a.$classData.Qe.m.fm)}
var va=p({fm:0},!1,"scala.runtime.BoxedUnit",{fm:1,c:1,f:1},void 0,void 0,function(a){return void 0===a});function Tj(){this.F=0}Tj.prototype=new q;Tj.prototype.constructor=Tj;Tj.prototype.j=function(){return""+this.F};Tj.prototype.vc=function(a){this.F=a;return this};Tj.prototype.$classData=p({Jt:0},!1,"scala.runtime.IntRef",{Jt:1,c:1,f:1});function Id(){this.F=null}Id.prototype=new q;Id.prototype.constructor=Id;Id.prototype.j=function(){return""+this.F};Id.prototype.l=function(a){this.F=a;return this};
Id.prototype.$classData=p({Mt:0},!1,"scala.runtime.ObjectRef",{Mt:1,c:1,f:1});function Cn(){}Cn.prototype=new q;Cn.prototype.constructor=Cn;Cn.prototype.b=function(){return this};function hd(){var a=Fc();mg();return ig(new hg,w(new x,function(){return function(a){return a.Hd}}(a)),w(new x,function(a){return function(c){return w(new x,function(a,b){return function(a){return ad(new bd,a.ud,a.vd,a.wd,a.xd,a.yd,a.zd,b,a.td)}}(a,c))}}(a)))}
function Le(){var a=Fc();mg();return ig(new hg,w(new x,function(){return function(a){return a.vd}}(a)),w(new x,function(a){return function(c){return w(new x,function(a,b){return function(a){return ad(new bd,a.ud,b,a.wd,a.xd,a.yd,a.zd,a.Hd,a.td)}}(a,c))}}(a)))}
function re(){var a=Fc();mg();return ig(new hg,w(new x,function(){return function(a){return a.yd}}(a)),w(new x,function(a){return function(c){return w(new x,function(a,b){return function(a){return ad(new bd,a.ud,a.vd,a.wd,a.xd,b,a.zd,a.Hd,a.td)}}(a,c))}}(a)))}function pd(a,b){Ba();if(null===b)throw(new yh).b();a=Ah(zh(),"undefined \u2192 undefined");return tf(uf(new vf,a,b,b.length|0),"undefined").split("props: undefined, ").join("").split("state: undefined)").join(")").split(", )").join(")")}
function je(){var a=Fc();mg();return ig(new hg,w(new x,function(){return function(a){return a.ud}}(a)),w(new x,function(a){return function(c){return w(new x,function(a,b){return function(a){return ad(new bd,b,a.vd,a.wd,a.xd,a.yd,a.zd,a.Hd,a.td)}}(a,c))}}(a)))}Cn.prototype.$classData=p({gn:0},!1,"japgolly.scalajs.react.component.builder.Lifecycle$",{gn:1,c:1,g:1,f:1});var Dn=void 0;function Fc(){Dn||(Dn=(new Cn).b());return Dn}function En(){}En.prototype=new q;En.prototype.constructor=En;
En.prototype.b=function(){return this};En.prototype.$classData=p({xn:0},!1,"japgolly.scalajs.react.extra.router.AbsUrl$",{xn:1,c:1,g:1,f:1});var Fn=void 0;function xh(){}xh.prototype=new q;xh.prototype.constructor=xh;xh.prototype.b=function(){return this};xh.prototype.$classData=p({zn:0},!1,"japgolly.scalajs.react.extra.router.BaseUrl$",{zn:1,c:1,g:1,f:1});var wh=void 0;function Gn(){this.gl=null}Gn.prototype=new q;Gn.prototype.constructor=Gn;
Gn.prototype.b=function(){Hn=this;this.gl=w(new x,function(){return function(){var a=(new C).G(mb().Ba);return(new C).G(a.H)}}(this));return this};function In(a){var b=qb(mb(),z(new A,function(){return function(){Me(Ne()).scrollTo(0,0)}}(a)));return D(function(a,b){return function(){return(new C).G(b)}}(a,b))}function Jn(a){return D(function(){return function(a,c){return c.$d.D()}}(a))}
function uh(){var a=Kn();return w(new x,function(){return function(a){var c=mb();a="[Router] "+a.D();return(new C).G(bc(c,a))}}(a))}Gn.prototype.$classData=p({Gn:0},!1,"japgolly.scalajs.react.extra.router.RouterConfig$",{Gn:1,c:1,g:1,f:1});var Hn=void 0;function Kn(){Hn||(Hn=(new Gn).b());return Hn}function Ln(){this.bf=this.zf=this.ek=this.nj=this.ac=this.ne=null}Ln.prototype=new q;Ln.prototype.constructor=Ln;
function Je(a,b){var c=new Ln;c.ne=a;c.ac=b;c.bf=(Xd(),B());c.nj=jc(y(),z(new A,function(){return function(){Fn||(Fn=(new En).b());return(new Mn).h(Me(Ne()).location.href)}}(c)),w(new x,function(a){return function(b){return(new C).G(jc(y(),a.ac.fc.e(z(new A,function(a,b){return function(){return"Syncing to "+b+"."}}(a,b))).H,w(new x,function(a,b){return function(){return(new C).G(jc(y(),cm(a,Nn(a,b)),w(new x,function(a){return function(b){return(new C).G(jc(y(),a.ac.fc.e(z(new A,function(a,b){return function(){return"Resolved to page "+
b.Wb+"."}}(a,b))).H,w(new x,function(a,b){return function(){return(new C).G(ic(y(),a.ac.fc.e(z(new A,function(){return function(){return""}}(a))).H,w(new x,function(a,b){return function(){return b}}(a,b))))}}(a,b))))}}(a))))}}(a,b))))}}(c)));c.ek=bm(c);c.zf=On(c.ek,b.Ra);return c}function Pn(a,b,c){return Ae(Ae((new Qn).G(z(new A,function(a,b,c){return function(){return"Redirecting to "+Rn(a.ne,b)+" via "+c+"."}}(a,b,c))),Sn(a,b,c)),Nn(a,Rn(a.ne,b)))}
function Nn(a,b){var c;c=b.w;var e=a.ne.w;c=0<=(c.length|0)&&c.substring(0,e.length|0)===e?(new L).l((new ve).h(b.w.substring(a.ne.w.length|0))):I();if(Gd(c))return Tn(a,c.w);if(I()===c)return Un(a,b);throw(new G).l(c);}
function cm(a,b){if(b&&b.$classData&&b.$classData.m.Fh){var c=b.xb;b=z(new A,function(a,b){return function(){Me(Ne()).history.pushState({},"",b.w)}}(a,c));a=a.ac.fc.e(z(new A,function(a,b){return function(){return"PushState: ["+b.w+"]"}}(a,c))).H;return(new C).G(nb(y(),a,b)).H}if(b&&b.$classData&&b.$classData.m.Gh)return c=b.xb,b=z(new A,function(a,b){return function(){Me(Ne()).history.replaceState({},"",b.w)}}(a,c)),a=a.ac.fc.e(z(new A,function(a,b){return function(){return"ReplaceState: ["+b.w+
"]"}}(a,c))).H,(new C).G(nb(y(),a,b)).H;if(b&&b.$classData&&b.$classData.m.Ih)return c=b.xb,b=z(new A,function(a,b){return function(){Me(Ne()).location.href=b.w}}(a,c)),a=a.ac.fc.e(z(new A,function(a,b){return function(){return"SetWindowLocation: ["+b.w+"]"}}(a,c))).H,(new C).G(nb(y(),a,b)).H;if(dm()===b)return b=ae(a),a=a.ac.fc.e(z(new A,function(){return function(){return"Broadcasting sync request."}}(a))).H,(new C).G(nb(y(),a,b)).H;if(b&&b.$classData&&b.$classData.m.Hh)return a=b.rf,ac(y(),a);
if(b&&b.$classData&&b.$classData.m.Eh)return a=a.ac.fc.e(b.Vf),null===a?null:a.H;if(Be(b)){var e=b.Ze;b=b.df;for(var c=y(),f=null,f=(new C).G(mb().Ba),e=Vn(e);e.pf;)var k=e.s(),f=f.H,f=(new C).G(nb(y(),f,cm(a,k)));return nb(c,f.H,cm(a,b))}throw(new G).l(b);}function Un(a,b){var c=(new ve).h("");return Ae((new Qn).G(z(new A,function(a,b,c){return function(){return"Wrong base: "+b+" is outside of "+Rn(a.ne,c)+"."}}(a,b,c))),Pn(a,c,Wn()))}
function Xn(a){var b=pb().Jc;if(Yn(a))return(new Zn).l(a.w);if(!$n(a))throw(new G).l(a);return b.e(a.w)}function Sn(a,b,c){a=Rn(a.ne,b);if(Wn()===c)return(new ao).Hf(a);if(rh()===c)return(new bo).Hf(a);co||(co=(new eo).b());if(co===c)return(new fo).Hf(a);throw(new G).l(c);}
function Tn(a,b){var c=a.ac.$a.e(b);if(Yn(c))var e=c.w,f=Vd(a.ac.Ya,b,e),e=Ae((new Qn).G(z(new A,function(a,b,c,e){return function(){return"Action for page "+c+" at "+b+" is "+e+"."}}(a,b,e,f))),go(a,e,f));else{if(!$n(c))throw(new G).l(c);e=ho(a,c.w)}return Ae((new Qn).G(z(new A,function(a,b,c){return function(){return"Parsed "+b+" to "+c+"."}}(a,b,c))),e)}
function ho(a,b){if(b&&b.$classData&&b.$classData.m.Ch){var c=b.Sf;return Pn(a,a.ac.Ra.e(b.Wb),c)}if(b&&b.$classData&&b.$classData.m.gu)return c=b.Bu(),b=b.Au(),Pn(a,c,b);throw(new G).l(b);}function io(a,b){if(b&&b.$classData&&b.$classData.m.Dh)return De(),(new Se).l(b);if(b&&b.$classData&&b.$classData.m.An)return De(),a=ho(a,b),(new bf).l(a);throw(new G).l(b);}
function go(a,b,c){c=io(a,c);a=Yn(c)?(new Se).l((new jo).Jf(b,z(new A,function(a,b){return function(){return b.Pd.e(a.zf)}}(a,c.w)))):c;return Xn(a)}Ln.prototype.$classData=p({Ln:0},!1,"japgolly.scalajs.react.extra.router.RouterLogic",{Ln:1,c:1,du:1,eu:1});function ko(){}ko.prototype=new q;ko.prototype.constructor=ko;ko.prototype.b=function(){return this};
function nh(){var a=af();return(new Qe).$e(w(new x,function(){return function(){return I()}}(a)),w(new x,function(){return function(){return I()}}(a)),D(function(){return function(){return I()}}(a)))}function $e(a,b){return(new Qe).$e(b,w(new x,function(){return function(){return I()}}(a)),D(function(){return function(){return I()}}(a)))}ko.prototype.$classData=p({Sn:0},!1,"japgolly.scalajs.react.extra.router.StaticDsl$Rule$",{Sn:1,c:1,g:1,f:1});var lo=void 0;
function af(){lo||(lo=(new ko).b());return lo}function mo(){this.sk=this.Se=null}mo.prototype=new q;mo.prototype.constructor=mo;
mo.prototype.b=function(){no=this;this.Se=D(function(){return function(a,b){a=a.H;return(new C).G(nb(y(),a,b.D().H))}}(this));this.sk=D(function(){return function(a,b){a=a.H;var c=y();b=b.D().H;var e=y();return(new C).G(z(new A,function(a,b,c,e){return function(){return!!Vd(e,b,c)}}(e,(new C).G(a).H,b,D(function(){return function(a,b){return!!a.D()||!!b.D()}}(c)))))}}(this));return this};mo.prototype.$classData=p({go:0},!1,"japgolly.scalajs.react.internal.Semigroup$",{go:1,c:1,g:1,f:1});var no=void 0;
function id(){no||(no=(new mo).b());return no}function oo(){this.Qa=null}oo.prototype=new nm;oo.prototype.constructor=oo;oo.prototype.h=function(a){sg.prototype.h.call(this,a);return this};oo.prototype.$classData=p({mo:0},!1,"japgolly.scalajs.react.vdom.Attr$Event",{mo:1,Tj:1,Jh:1,c:1});function tm(){this.ut=this.Mh=this.bp=this.Yj=this.ap=this.$o=this.Yg=this.wa=this.Vh=this.kj=this.$f=null}tm.prototype=new q;tm.prototype.constructor=tm;tm.prototype.b=function(){Eg(this);return this};
tm.prototype.$classData=p({ro:0},!1,"japgolly.scalajs.react.vdom.Builder$ToVdomElement",{ro:1,c:1,ju:1,iu:1});function po(){}po.prototype=new q;po.prototype.constructor=po;po.prototype.b=function(){return this};function Vb(a){var b=B(),c=new sm;a=sb(new tb,a,b);qo||(qo=(new ro).b());c.im="div";c.Ki=a;return c}po.prototype.$classData=p({uo:0},!1,"japgolly.scalajs.react.vdom.HtmlTagOf$",{uo:1,c:1,g:1,f:1});var so=void 0;function Sb(){so||(so=(new po).b())}function ro(){}ro.prototype=new q;
ro.prototype.constructor=ro;ro.prototype.b=function(){return this};ro.prototype.$classData=p({Co:0},!1,"japgolly.scalajs.react.vdom.Namespace$",{Co:1,c:1,g:1,f:1});var qo=void 0;function Ug(){}Ug.prototype=new q;Ug.prototype.constructor=Ug;Ug.prototype.b=function(){return this};Ug.prototype.$classData=p({Io:0},!1,"japgolly.scalajs.react.vdom.SvgTagOf$",{Io:1,c:1,g:1,f:1});var Tg=void 0;function to(){this.ql=this.dh=null}to.prototype=new xm;to.prototype.constructor=to;
function wm(a){var b=new to;b.ql=a;Ub.prototype.si.call(b,a);return b}to.prototype.$classData=p({No:0},!1,"japgolly.scalajs.react.vdom.VdomElement",{No:1,Uj:1,c:1,Kh:1});var ua=p({mp:0},!1,"java.lang.Boolean",{mp:1,c:1,f:1,yc:1},void 0,void 0,function(a){return"boolean"===typeof a});function uo(){this.X=0}uo.prototype=new q;uo.prototype.constructor=uo;uo.prototype.n=function(a){return El(a)?this.X===a.X:!1};uo.prototype.j=function(){return g.String.fromCharCode(this.X)};
function vo(a){var b=new uo;b.X=a;return b}uo.prototype.p=function(){return this.X};function El(a){return!!(a&&a.$classData&&a.$classData.m.Sk)}uo.prototype.$classData=p({Sk:0},!1,"java.lang.Character",{Sk:1,c:1,f:1,yc:1});function Rm(){this.fl=null;this.Y=0}Rm.prototype=new q;Rm.prototype.constructor=Rm;Rm.prototype.b=function(){return this};
function Sm(a){if(0===(16&a.Y)<<24>>24&&0===(16&a.Y)<<24>>24){var b=(new H).Oa([1632,1776,1984,2406,2534,2662,2790,2918,3046,3174,3302,3430,3664,3792,3872,4160,4240,6112,6160,6470,6608,6784,6800,6992,7088,7232,7248,42528,43216,43264,43472,43600,44016,65296,66720,69734,69872,69942,70096,71360,120782,120792,120802,120812,120822]),c=b.la.length|0,c=m(v(Va),[c]),e;e=0;for(b=eg(new O,b,b.la.length|0);b.x();){var f=b.s();c.d[e]=f|0;e=1+e|0}a.fl=c;a.Y=(16|a.Y)<<24>>24}return a.fl}
Rm.prototype.$classData=p({op:0},!1,"java.lang.Character$",{op:1,c:1,g:1,f:1});var Qm=void 0;function wo(){this.sb=null}wo.prototype=new Am;wo.prototype.constructor=wo;function xo(){}xo.prototype=wo.prototype;function yo(){this.sb=null}yo.prototype=new Am;yo.prototype.constructor=yo;function zo(){}zo.prototype=yo.prototype;function Ao(){}Ao.prototype=new q;Ao.prototype.constructor=Ao;Ao.prototype.b=function(){return this};function Pm(a){throw(new Bo).h('For input string: "'+a+'"');}
function Rk(a,b){a=b-(1431655765&b>>1)|0;a=(858993459&a)+(858993459&a>>2)|0;return h(16843009,252645135&(a+(a>>4)|0))>>24}Ao.prototype.$classData=p({wp:0},!1,"java.lang.Integer$",{wp:1,c:1,g:1,f:1});var Co=void 0;function Xj(){Co||(Co=(new Ao).b());return Co}function Do(){}Do.prototype=new q;Do.prototype.constructor=Do;function Eo(){}Eo.prototype=Do.prototype;Do.prototype.ck=function(a){var b=Dj();a=a.Hb();b=Gj(rk(b,a));for(a=!0;a&&b.x();)a=b.s(),a=this.E(a);return a};
Do.prototype.j=function(){var a=Dj(),b=this.Hb();return Gj(rk(a,b)).Be("[",",","]")};Do.prototype.E=function(a){for(var b=Dj(),c=this.Hb(),b=Gj(rk(b,c)),c=!1;!c&&b.x();)c=b.s(),c=null===a?null===c:ya(a,c);return c};Do.prototype.bd=function(){throw(new Dm).b();};function Fo(){this.sa=null}Fo.prototype=new q;Fo.prototype.constructor=Fo;Fo.prototype.s=function(){return this.sa.s()};Fo.prototype.x=function(){return this.sa.x()};
Fo.prototype.$classData=p({Sp:0},!1,"java.util.Collections$UnmodifiableIterator",{Sp:1,c:1,vu:1,Ai:1});function Go(){Fm.call(this);this.pa=null}Go.prototype=new Gm;Go.prototype.constructor=Go;Go.prototype.$classData=p({Xp:0},!1,"java.util.HashMap$EntrySet$$anon$2",{Xp:1,yu:1,c:1,Ai:1});function Ho(){this.xh=this.ye=null}Ho.prototype=new q;Ho.prototype.constructor=Ho;Ho.prototype.j=function(){return this.xh};Ho.prototype.$classData=p({dq:0},!1,"java.util.regex.Pattern",{dq:1,c:1,g:1,f:1});
function Io(){this.Pk=this.Qk=null}Io.prototype=new q;Io.prototype.constructor=Io;Io.prototype.b=function(){Jo=this;this.Qk=new g.RegExp("^\\\\Q(.|\\n|\\r)\\\\E$");this.Pk=new g.RegExp("^\\(\\?([idmsuxU]*)(?:-([idmsuxU]*))?\\)");return this};
function Ah(a,b){a=a.Qk.exec(b);if(null!==a){a=a[1];if(void 0===a)throw(new V).h("undefined.get");a=(new L).l((new M).Q(Ko(a),0))}else a=I();if(a.i()){var c=zh().Pk.exec(b);if(null!==c){a=c[0];if(void 0===a)throw(new V).h("undefined.get");a=b.substring(a.length|0);var e=c[1];if(void 0===e)var f=0;else{var e=(new qf).h(e),f=e.cb.length|0,k=0,l=0;a:for(;;){if(k!==f){var r=1+k|0,k=e.Za(k),k=null===k?0:k.X,l=l|0|Lo(zh(),k),k=r;continue a}break}f=l|0}c=c[2];if(void 0===c)c=f;else{c=(new qf).h(c);e=c.cb.length|
0;r=0;k=f;a:for(;;){if(r!==e){f=1+r|0;r=c.Za(r);r=null===r?0:r.X;k=(k|0)&~Lo(zh(),r);r=f;continue a}break}c=k|0}a=(new L).l((new M).Q(a,c))}else a=I()}a=a.i()?(new M).Q(b,0):a.Ja();if(null===a)throw(new G).l(a);c=a.Ta|0;a=new g.RegExp(a.Ia,"g"+(0!==(2&c)?"i":"")+(0!==(8&c)?"m":""));c=new Ho;c.ye=a;c.xh=b;return c}
function Ko(a){for(var b="",c=0;c<(a.length|0);){var e=65535&(a.charCodeAt(c)|0);switch(e){case 92:case 46:case 40:case 41:case 91:case 93:case 123:case 125:case 124:case 63:case 42:case 43:case 94:case 36:e="\\"+vo(e);break;default:e=vo(e)}b=""+b+e;c=1+c|0}return b}function Lo(a,b){switch(b){case 105:return 2;case 100:return 1;case 109:return 8;case 115:return 32;case 117:return 64;case 120:return 4;case 85:return 256;default:throw(new Cb).h("bad in-pattern flag");}}
Io.prototype.$classData=p({eq:0},!1,"java.util.regex.Pattern$",{eq:1,c:1,g:1,f:1});var Jo=void 0;function zh(){Jo||(Jo=(new Io).b());return Jo}function Mo(){}Mo.prototype=new q;Mo.prototype.constructor=Mo;Mo.prototype.b=function(){return this};Mo.prototype.wg=function(a){return null===a?I():(new L).l(a)};Mo.prototype.$classData=p({lq:0},!1,"scala.Option$",{lq:1,c:1,g:1,f:1});var No=void 0;function Ud(){No||(No=(new Mo).b());return No}function Oo(){this.Cl=null}Oo.prototype=new Xh;
Oo.prototype.constructor=Oo;Oo.prototype.b=function(){Po=this;De();Xd();Cj();Qo();zj||(zj=(new yj).b());zj||(zj=(new yj).b());Ro||(Ro=(new So).b());(new Um).b();(new To).b();this.Cl=(new Uo).b();return this};Oo.prototype.$classData=p({rq:0},!1,"scala.Predef$",{rq:1,Eu:1,c:1,Cu:1});var Po=void 0;function ff(){Po||(Po=(new Oo).b());return Po}function Gi(){}Gi.prototype=new q;Gi.prototype.constructor=Gi;Gi.prototype.b=function(){return this};
Gi.prototype.$classData=p({xq:0},!1,"scala.math.Fractional$",{xq:1,c:1,g:1,f:1});var Fi=void 0;function Ii(){}Ii.prototype=new q;Ii.prototype.constructor=Ii;Ii.prototype.b=function(){return this};Ii.prototype.$classData=p({yq:0},!1,"scala.math.Integral$",{yq:1,c:1,g:1,f:1});var Hi=void 0;function Ki(){}Ki.prototype=new q;Ki.prototype.constructor=Ki;Ki.prototype.b=function(){return this};Ki.prototype.$classData=p({zq:0},!1,"scala.math.Numeric$",{zq:1,c:1,g:1,f:1});var Ji=void 0;function Oi(){}
Oi.prototype=new q;Oi.prototype.constructor=Oi;Oi.prototype.b=function(){return this};Oi.prototype.$classData=p({Zq:0},!1,"scala.util.Either$",{Zq:1,c:1,g:1,f:1});var Ni=void 0;function Qi(){}Qi.prototype=new q;Qi.prototype.constructor=Qi;Qi.prototype.b=function(){return this};Qi.prototype.j=function(){return"Left"};Qi.prototype.$classData=p({$q:0},!1,"scala.util.Left$",{$q:1,c:1,g:1,f:1});var Pi=void 0;function Si(){}Si.prototype=new q;Si.prototype.constructor=Si;Si.prototype.b=function(){return this};
Si.prototype.j=function(){return"Right"};Si.prototype.$classData=p({ar:0},!1,"scala.util.Right$",{ar:1,c:1,g:1,f:1});var Ri=void 0;function Vo(){this.uj=!1}Vo.prototype=new q;Vo.prototype.constructor=Vo;Vo.prototype.b=function(){this.uj=!1;return this};Vo.prototype.$classData=p({dr:0},!1,"scala.util.control.NoStackTrace$",{dr:1,c:1,g:1,f:1});var Wo=void 0;function Xo(){this.$g=null}Xo.prototype=new q;Xo.prototype.constructor=Xo;
function rf(a){var b=new Xo,c=zh();Xo.prototype.fp.call(b,Ah(c,a));return b}Xo.prototype.fp=function(a){this.$g=a;return this};Xo.prototype.j=function(){return this.$g.xh};Xo.prototype.$classData=p({gr:0},!1,"scala.util.matching.Regex",{gr:1,c:1,g:1,f:1});function Yo(){this.fb=null}Yo.prototype=new jn;Yo.prototype.constructor=Yo;Yo.prototype.b=function(){hn.prototype.Lf.call(this,ni());return this};Yo.prototype.yg=function(){ni();Zo();yi();return(new $o).b()};
Yo.prototype.$classData=p({kr:0},!1,"scala.collection.IndexedSeq$$anon$1",{kr:1,Dl:1,c:1,Yi:1});function ap(){}ap.prototype=new q;ap.prototype.constructor=ap;ap.prototype.b=function(){return this};ap.prototype.$classData=p({yr:0},!1,"scala.collection.convert.WrapAsScala$",{yr:1,c:1,Vu:1,Uu:1});var bp=void 0;function cp(){this.Ma=null}cp.prototype=new fn;cp.prototype.constructor=cp;function dp(){}dp.prototype=cp.prototype;function gn(){this.pa=this.fb=null}gn.prototype=new jn;
gn.prototype.constructor=gn;gn.prototype.yg=function(){return this.pa.da()};gn.prototype.Lf=function(a){if(null===a)throw R(P(),null);this.pa=a;hn.prototype.Lf.call(this,a);return this};gn.prototype.$classData=p({Gr:0},!1,"scala.collection.generic.GenTraversableFactory$$anon$1",{Gr:1,Dl:1,c:1,Yi:1});function ep(){}ep.prototype=new ln;ep.prototype.constructor=ep;function fp(){}fp.prototype=ep.prototype;function qi(){}qi.prototype=new q;qi.prototype.constructor=qi;qi.prototype.b=function(){return this};
qi.prototype.j=function(){return"::"};qi.prototype.$classData=p({Kr:0},!1,"scala.collection.immutable.$colon$colon$",{Kr:1,c:1,g:1,f:1});var pi=void 0;function Ci(){}Ci.prototype=new q;Ci.prototype.constructor=Ci;Ci.prototype.b=function(){return this};Ci.prototype.$classData=p({ps:0},!1,"scala.collection.immutable.Range$",{ps:1,c:1,g:1,f:1});var Bi=void 0;function gp(){this.fb=null}gp.prototype=new jn;gp.prototype.constructor=gp;gp.prototype.b=function(){hn.prototype.Lf.call(this,vi());return this};
gp.prototype.$classData=p({Bs:0},!1,"scala.collection.immutable.Stream$StreamCanBuildFrom",{Bs:1,Dl:1,c:1,Yi:1});function Ai(){}Ai.prototype=new q;Ai.prototype.constructor=Ai;Ai.prototype.b=function(){return this};Ai.prototype.$classData=p({tt:0},!1,"scala.collection.mutable.StringBuilder$",{tt:1,c:1,g:1,f:1});var zi=void 0;function A(){this.ib=null}A.prototype=new sn;A.prototype.constructor=A;A.prototype.D=function(){return(0,this.ib)()};function z(a,b){a.ib=b;return a}
A.prototype.$classData=p({wt:0},!1,"scala.scalajs.runtime.AnonFunction0",{wt:1,jv:1,c:1,Xt:1});function x(){this.ib=null}x.prototype=new un;x.prototype.constructor=x;x.prototype.e=function(a){return(0,this.ib)(a)};function w(a,b){a.ib=b;return a}x.prototype.$classData=p({xt:0},!1,"scala.scalajs.runtime.AnonFunction1",{xt:1,em:1,c:1,y:1});function hp(){this.ib=null}hp.prototype=new wn;hp.prototype.constructor=hp;function D(a){var b=new hp;b.ib=a;return b}function Vd(a,b,c){return(0,a.ib)(b,c)}
hp.prototype.$classData=p({yt:0},!1,"scala.scalajs.runtime.AnonFunction2",{yt:1,kv:1,c:1,Yt:1});function ip(){this.ib=null}ip.prototype=new yn;ip.prototype.constructor=ip;function Nd(a){var b=new ip;b.ib=a;return b}ip.prototype.$classData=p({zt:0},!1,"scala.scalajs.runtime.AnonFunction3",{zt:1,lv:1,c:1,Zt:1});function jp(){this.ib=null}jp.prototype=new An;jp.prototype.constructor=jp;function Kg(a){var b=new jp;b.ib=a;return b}
jp.prototype.$classData=p({At:0},!1,"scala.scalajs.runtime.AnonFunction4",{At:1,mv:1,c:1,$t:1});function kp(){this.id=0;this.tg=null}kp.prototype=new q;kp.prototype.constructor=kp;kp.prototype.b=function(){lp=this;this.tg=(new ql).Ed(0,0);return this};function mp(a,b,c){return 0===(-2097152&c)?""+(4294967296*c+ +(b>>>0)):np(a,b,c,1E9,2)}
function Zk(a,b,c){if(c===b>>31){var e=b/1E3|0;a.id=e>>31;return e}if(e=0>c){var f=-b|0;b=0!==b?~c:-c|0}else f=b,b=c;0===(-2097152&b)?(f=(4294967296*b+ +(f>>>0))/1E3,a.id=f/4294967296|0,f|=0):f=np(a,f,b,1E3,0)|0;if(!1===e)return f;e=a.id;a.id=0!==f?~e:-e|0;return-f|0}function Hl(a,b,c){return 0>c?-(4294967296*+((0!==b?~c:-c|0)>>>0)+ +((-b|0)>>>0)):4294967296*c+ +(b>>>0)}function xb(a,b,c){return c===b>>31?""+b:0>c?"-"+mp(a,-b|0,0!==b?~c:-c|0):mp(a,b,c)}
function np(a,b,c,e,f){var k=(32+da(e)|0)-(0!==c?da(c):32+da(b)|0)|0,l=k,r=0===(32&l)?e<<l:0,t=0===(32&l)?(e>>>1|0)>>>(31-l|0)|0|0<<l:e<<l,l=b,N=c;for(b=c=0;0<=k&&0!==(-2097152&N);){var aa=l,X=N,Y=r,oa=t;if(X===oa?(-2147483648^aa)>=(-2147483648^Y):(-2147483648^X)>=(-2147483648^oa))aa=N,X=t,N=l-r|0,aa=(-2147483648^N)>(-2147483648^l)?-1+(aa-X|0)|0:aa-X|0,l=N,N=aa,32>k?c|=1<<k:b|=1<<k;k=-1+k|0;aa=t>>>1|0;r=r>>>1|0|t<<31;t=aa}k=N;if(0===k?(-2147483648^l)>=(-2147483648^e):-2147483648<=(-2147483648^k))k=
4294967296*N+ +(l>>>0),e=0+ +(e>>>0),1!==f&&(aa=k/e,r=aa/4294967296|0,t=c,c=aa=t+(aa|0)|0,b=(-2147483648^aa)<(-2147483648^t)?1+(b+r|0)|0:b+r|0),0!==f&&(e=k%e,l=e|0,N=e/4294967296|0);if(0===f)return a.id=b,c;if(1===f)return a.id=N,l;a=""+l;return""+(4294967296*b+ +(c>>>0))+"000000000".substring(a.length|0)+a}kp.prototype.$classData=p({Dt:0},!1,"scala.scalajs.runtime.RuntimeLong$",{Dt:1,c:1,g:1,f:1});var lp=void 0;function Ma(){lp||(lp=(new kp).b());return lp}function op(){}op.prototype=new q;
op.prototype.constructor=op;function pp(){}pp.prototype=op.prototype;op.prototype.e=function(a){return this.Ld(a,ci().vk)};op.prototype.j=function(){return"\x3cfunction1\x3e"};op.prototype.sc=function(a){return qp(this,a)};var rp=p({Kt:0},!1,"scala.runtime.Nothing$",{Kt:1,Ib:1,c:1,f:1});function sp(){this.X=this.wa=null}sp.prototype=new q;sp.prototype.constructor=sp;
sp.prototype.b=function(){tp=this;pm||(pm=(new om).b());this.wa=pm;(new oo).h("onChange");(new oo).h("onClick");(new oo).h("onClickCapture");up();(new mm).h("src");up();(new mm).h("title");up();(new mm).h("type");this.X=(up(),(new mm).h("value"));return this};sp.prototype.$classData=p({to:0},!1,"japgolly.scalajs.react.vdom.HtmlAttrAndStyles$",{to:1,c:1,ku:1,lu:1,mu:1});var tp=void 0;function vp(){}vp.prototype=new q;vp.prototype.constructor=vp;function wp(){}wp.prototype=vp.prototype;
var la=p({Zo:0},!1,"java.lang.String",{Zo:1,c:1,f:1,xi:1,yc:1},void 0,void 0,function(a){return"string"===typeof a});function Yk(){this.sb=null}Yk.prototype=new xo;Yk.prototype.constructor=Yk;Yk.prototype.l=function(a){U.prototype.yb.call(this,""+a,0,0,!0);return this};Yk.prototype.$classData=p({kp:0},!1,"java.lang.AssertionError",{kp:1,su:1,Ib:1,c:1,f:1});
var na=p({np:0},!1,"java.lang.Byte",{np:1,xe:1,c:1,f:1,yc:1},void 0,void 0,function(a){return ma(a)}),ta=p({rp:0},!1,"java.lang.Double",{rp:1,xe:1,c:1,f:1,yc:1},void 0,void 0,function(a){return"number"===typeof a}),sa=p({sp:0},!1,"java.lang.Float",{sp:1,xe:1,c:1,f:1,yc:1},void 0,void 0,function(a){return"number"===typeof a}),ra=p({vp:0},!1,"java.lang.Integer",{vp:1,xe:1,c:1,f:1,yc:1},void 0,void 0,function(a){return"number"===typeof a&&(a|0)===a&&1/a!==1/-0}),xa=p({zp:0},!1,"java.lang.Long",{zp:1,
xe:1,c:1,f:1,yc:1},void 0,void 0,function(a){return wa(a)});function xp(){this.sb=null}xp.prototype=new zo;xp.prototype.constructor=xp;function yp(){}yp.prototype=xp.prototype;xp.prototype.h=function(a){U.prototype.yb.call(this,a,0,0,!0);return this};xp.prototype.$classData=p({zc:0},!1,"java.lang.RuntimeException",{zc:1,Kc:1,Ib:1,c:1,f:1});var qa=p({Dp:0},!1,"java.lang.Short",{Dp:1,xe:1,c:1,f:1,yc:1},void 0,void 0,function(a){return pa(a)});function ul(){this.sd=null}ul.prototype=new q;
ul.prototype.constructor=ul;d=ul.prototype;d.b=function(){ul.prototype.ni.call(this,(new zp).b());return this};d.lj=function(a,b){return this.sd.Ua.substring(a,b)};d.j=function(){return this.sd.Ua};function Om(a,b){a=a.sd;a.Ua=""+a.Ua+b}d.ja=function(){return this.sd.ja()};d.ni=function(a){this.sd=a;return this};d.$classData=p({Ep:0},!1,"java.lang.StringBuffer",{Ep:1,c:1,xi:1,Rk:1,f:1});function zp(){this.Ua=null}zp.prototype=new q;zp.prototype.constructor=zp;d=zp.prototype;
d.b=function(){this.Ua="";return this};d.lj=function(a,b){return this.Ua.substring(a,b)};d.j=function(){return this.Ua};d.vc=function(a){zp.prototype.b.call(this);if(0>a)throw(new Ap).b();return this};d.ja=function(){return this.Ua.length|0};function Tm(a,b){b=g.String.fromCharCode(b);a.Ua=""+a.Ua+b}d.$classData=p({Fp:0},!1,"java.lang.StringBuilder",{Fp:1,c:1,xi:1,Rk:1,f:1});function Im(){this.X=this.wa=null}Im.prototype=new q;Im.prototype.constructor=Im;function Bp(){}Bp.prototype=Im.prototype;
Im.prototype.n=function(a){return Kh(Mh(),this,a)};Im.prototype.Q=function(a,b){this.wa=a;this.X=b;return this};Im.prototype.j=function(){return this.wa+"\x3d"+this.X};Im.prototype.p=function(){return Jh(Mh(),this)};function Fj(){}Fj.prototype=new Cm;Fj.prototype.constructor=Fj;Fj.prototype.b=function(){return this};Fj.prototype.dd=function(){var a=Th();0===(1&a.Y)<<24>>24&&0===(1&a.Y)<<24>>24&&(a.zj=(new Cp).Og((new Dp).b()),a.Y=(1|a.Y)<<24>>24);return a.zj};
Fj.prototype.$classData=p({Np:0},!1,"java.util.Collections$$anon$17",{Np:1,Ip:1,c:1,Bi:1,f:1});function Ep(){this.sa=null}Ep.prototype=new q;Ep.prototype.constructor=Ep;function Fp(){}d=Fp.prototype=Ep.prototype;d.ch=function(){throw(new Dm).b();};d.n=function(a){return this.sa.n(a)};d.j=function(){return this.sa.j()};d.Ff=function(a){return this.sa.Ff(a)};d.Cg=function(a){return this.sa.Cg(a)};d.dd=function(){var a=this.sa.dd();return(new Gp).Og(a)};d.r=function(){return this.sa.r()};
d.qi=function(a){this.sa=a;return this};d.p=function(){return this.sa.p()};function Hp(){}Hp.prototype=new Vh;Hp.prototype.constructor=Hp;Hp.prototype.b=function(){return this};
function Ip(a,b,c,e,f,k){a=ka(b);var l;if(l=!!a.Ad.isArrayClass)l=ka(e),l.Ad.isPrimitive||a.Ad.isPrimitive?a=l===a||(l===n(Ua)?a===n(Ta):l===n(Va)?a===n(Ta)||a===n(Ua):l===n(Xa)?a===n(Ta)||a===n(Ua)||a===n(Va):l===n(Ya)&&(a===n(Ta)||a===n(Ua)||a===n(Va)||a===n(Xa))):(a=a.Ad.getFakeInstance(),a=!!l.Ad.isInstance(a)),l=a;if(l)Ka(b,c,e,f,k);else for(a=c,c=c+k|0;a<c;){T();k=f;T();l=b;var r=a;if(Ab(l,1)||cb(l,1)||fb(l,1)||db(l,1)||eb(l,1))l=l.d[r];else if($a(l,1))l=vo(l.d[r]);else if(ab(l,1)||bb(l,1)||
Za(l,1)||Ml(l))l=l.d[r];else{if(null===l)throw(new yh).b();throw(new G).l(l);}Nl(0,e,k,l);a=1+a|0;f=1+f|0}}Hp.prototype.$classData=p({hq:0},!1,"scala.Array$",{hq:1,Du:1,c:1,g:1,f:1});var Jp=void 0;function Kp(){Jp||(Jp=(new Hp).b());return Jp}function Lp(){}Lp.prototype=new q;Lp.prototype.constructor=Lp;function Mp(){}Mp.prototype=Lp.prototype;Lp.prototype.j=function(){return"\x3cfunction1\x3e"};
Lp.prototype.sc=function(a){return w(new x,function(a,c){return function(e){return c.e(a.e(e))}}(this,a))};function Np(){}Np.prototype=new q;Np.prototype.constructor=Np;function Op(){}Op.prototype=Np.prototype;Np.prototype.j=function(){return"\x3cfunction1\x3e"};Np.prototype.sc=function(a){return w(new x,function(a,c){return function(e){return c.e(a.e(e))}}(this,a))};function Ei(){}Ei.prototype=new q;Ei.prototype.constructor=Ei;Ei.prototype.b=function(){return this};
Ei.prototype.$classData=p({wq:0},!1,"scala.math.Equiv$",{wq:1,c:1,Ku:1,g:1,f:1});var Di=void 0;function Mi(){}Mi.prototype=new q;Mi.prototype.constructor=Mi;Mi.prototype.b=function(){return this};Mi.prototype.$classData=p({Bq:0},!1,"scala.math.Ordering$",{Bq:1,c:1,Lu:1,g:1,f:1});var Li=void 0;function So(){}So.prototype=new q;So.prototype.constructor=So;So.prototype.b=function(){return this};So.prototype.j=function(){return"\x3c?\x3e"};
So.prototype.$classData=p({Vq:0},!1,"scala.reflect.NoManifest$",{Vq:1,c:1,Xb:1,g:1,f:1});var Ro=void 0;function Pp(){}Pp.prototype=new q;Pp.prototype.constructor=Pp;function Qp(){}d=Qp.prototype=Pp.prototype;d.xa=function(){return this};d.i=function(){return!this.x()};d.Be=function(a,b,c){return dk(this,a,b,c)};d.j=function(){return(this.x()?"non-empty":"empty")+" iterator"};d.P=function(a){Zm(this,a)};d.dc=function(a,b){return fk(this,a,b)};d.Db=function(){return $m(this)};
d.le=function(a,b,c,e){return gk(this,a,b,c,e)};d.Le=function(a,b){return fk(this,a,b)};function Rp(){}Rp.prototype=new q;Rp.prototype.constructor=Rp;Rp.prototype.b=function(){return this};Rp.prototype.$classData=p({zr:0},!1,"scala.collection.convert.Wrappers$",{zr:1,c:1,Wu:1,g:1,f:1});var Sp=void 0;function ok(){Sp||(Sp=(new Rp).b());return Sp}function Tp(){}Tp.prototype=new dn;Tp.prototype.constructor=Tp;function Up(){}Up.prototype=Tp.prototype;function Vp(){}Vp.prototype=new fp;
Vp.prototype.constructor=Vp;Vp.prototype.b=function(){return this};Vp.prototype.wk=function(){return Wp()};Vp.prototype.$classData=p({is:0},!1,"scala.collection.immutable.Map$",{is:1,Hr:1,Ir:1,Fr:1,c:1});var Xp=void 0;function Cj(){Xp||(Xp=(new Vp).b());return Xp}function Yp(){this.Ce=this.X=this.wa=null}Yp.prototype=new q;Yp.prototype.constructor=Yp;d=Yp.prototype;d.s=function(){return this.Ce};function Zp(a){return"(kv: "+a.wa+", "+a.X+")"+(null!==a.Ce?" -\x3e "+Zp(a.Ce):"")}
d.Q=function(a,b){this.wa=a;this.X=b;return this};d.j=function(){return Zp(this)};d.Lc=function(){return this.wa};d.Oi=function(a){this.Ce=a};d.$classData=p({Ss:0},!1,"scala.collection.mutable.DefaultEntry",{Ss:1,c:1,bj:1,g:1,f:1});function $p(){this.Tb=this.Ba=null}$p.prototype=new q;$p.prototype.constructor=$p;function aq(a,b){a.Ba=b;a.Tb=b;return a}d=$p.prototype;d.gb=function(a){this.Tb.gb(a);return this};d.Sa=function(){return this.Tb};d.Zb=function(a,b){qn(this,a,b)};
d.hb=function(a){this.Tb.gb(a);return this};d.Qb=function(){};d.Xa=function(a){return Dk(this,a)};d.$classData=p({Ws:0},!1,"scala.collection.mutable.GrowingBuilder",{Ws:1,c:1,Pb:1,Nb:1,Lb:1});function bq(){this.Ce=this.Ug=this.rk=this.wa=null}bq.prototype=new q;bq.prototype.constructor=bq;d=bq.prototype;d.s=function(){return this.Ce};d.l=function(a){this.wa=a;this.Ug=this.rk=null;return this};d.Lc=function(){return this.wa};d.Oi=function(a){this.Ce=a};
d.$classData=p({kt:0},!1,"scala.collection.mutable.LinkedHashSet$Entry",{kt:1,c:1,bj:1,g:1,f:1});function ql(){this.Ub=this.Pa=0}ql.prototype=new zm;ql.prototype.constructor=ql;d=ql.prototype;d.n=function(a){return wa(a)?this.Pa===a.Pa&&this.Ub===a.Ub:!1};d.Sd=function(a,b,c){ql.prototype.Ed.call(this,a|b<<22,b>>10|c<<12);return this};d.j=function(){return xb(Ma(),this.Pa,this.Ub)};d.Ed=function(a,b){this.Pa=a;this.Ub=b;return this};d.vc=function(a){ql.prototype.Ed.call(this,a,a>>31);return this};
d.p=function(){return this.Pa^this.Ub};function wa(a){return!!(a&&a.$classData&&a.$classData.m.cm)}d.$classData=p({cm:0},!1,"scala.scalajs.runtime.RuntimeLong",{cm:1,xe:1,c:1,f:1,yc:1});function cq(){this.Ac=null}cq.prototype=new q;cq.prototype.constructor=cq;d=cq.prototype;d.ha=function(){return"Mod"};d.fa=function(){return 1};d.n=function(a){var b;vc();b=this.Ac;a&&a.$classData&&a.$classData.m.Bj?(a=null===a?null:a.Ac,b=null===b?null===a:b.n(a)):b=!1;return b};
d.ga=function(a){a:switch(vc(),a){case 0:a=this.Ac;break a;default:throw(new W).h(""+a);}return a};d.j=function(){vc();var a=this.Ac;return S(T(),(new cq).Gf(a))};d.Gf=function(a){this.Ac=a;return this};d.p=function(){return this.Ac.p()};d.ka=function(){vc();return Z((new cq).Gf(this.Ac))};d.$classData=p({Bj:0},!1,"japgolly.scalajs.react.CtorType$Mod",{Bj:1,c:1,na:1,k:1,g:1,f:1});function dq(){}dq.prototype=new un;dq.prototype.constructor=dq;dq.prototype.b=function(){return this};dq.prototype.e=function(a){return(new cq).Gf(a)};
dq.prototype.j=function(){return"Mod"};function uc(a,b,c){b.e(c);return c}dq.prototype.$classData=p({sm:0},!1,"japgolly.scalajs.react.CtorType$Mod$",{sm:1,em:1,c:1,y:1,g:1,f:1});var eq=void 0;function vc(){eq||(eq=(new dq).b());return eq}function bd(){this.td=this.Hd=this.zd=this.yd=this.xd=this.wd=this.vd=this.ud=null}bd.prototype=new q;bd.prototype.constructor=bd;d=bd.prototype;d.ha=function(){return"Lifecycle"};d.fa=function(){return 8};
d.n=function(a){if(this===a)return!0;if(a&&a.$classData&&a.$classData.m.Cj){var b=this.ud,c=a.ud;(null===b?null===c:b.n(c))?(b=this.vd,c=a.vd,b=null===b?null===c:b.n(c)):b=!1;b?(b=this.wd,c=a.wd,b=null===b?null===c:b.n(c)):b=!1;b?(b=this.xd,c=a.xd,b=null===b?null===c:b.n(c)):b=!1;b?(b=this.yd,c=a.yd,b=null===b?null===c:b.n(c)):b=!1;b?(b=this.zd,c=a.zd,b=null===b?null===c:b.n(c)):b=!1;b?(b=this.Hd,c=a.Hd,b=null===b?null===c:b.n(c)):b=!1;if(b)return b=this.td,a=a.td,null===b?null===a:b.n(a)}return!1};
d.ga=function(a){switch(a){case 0:return this.ud;case 1:return this.vd;case 2:return this.wd;case 3:return this.xd;case 4:return this.yd;case 5:return this.zd;case 6:return this.Hd;case 7:return this.td;default:throw(new W).h(""+a);}};d.j=function(){return S(T(),this)};function ad(a,b,c,e,f,k,l,r,t){a.ud=b;a.vd=c;a.wd=e;a.xd=f;a.yd=k;a.zd=l;a.Hd=r;a.td=t;return a}
function jd(a,b,c,e){return b.Ac.e(w(new x,function(a,b,c){return function(e){e.i()?e=b:(e=e.Ja(),e=w(new x,function(a,b,c,e){return function(f){return Vd(c,e.e(f),z(new A,function(a,b,c){return function(){return b.e(c)}}(a,b,f)))}}(a,b,c,e)));return(new L).l(e)}}(a,c,e))).e(a)}d.p=function(){return Q(this)};d.ka=function(){return Z(this)};d.$classData=p({Cj:0},!1,"japgolly.scalajs.react.component.builder.Lifecycle",{Cj:1,c:1,na:1,k:1,g:1,f:1});function jo(){this.$d=this.Wb=null}jo.prototype=new q;
jo.prototype.constructor=jo;d=jo.prototype;d.ha=function(){return"Resolution"};d.fa=function(){return 2};d.n=function(a){return this===a?!0:a&&a.$classData&&a.$classData.m.Mj?J(K(),this.Wb,a.Wb)?this.$d===a.$d:!1:!1};d.ga=function(a){switch(a){case 0:return this.Wb;case 1:return this.$d;default:throw(new W).h(""+a);}};d.j=function(){return S(T(),this)};d.p=function(){return Q(this)};d.ka=function(){return Z(this)};d.Jf=function(a,b){this.Wb=a;this.$d=b;return this};
d.$classData=p({Mj:0},!1,"japgolly.scalajs.react.extra.router.Resolution",{Mj:1,c:1,na:1,k:1,g:1,f:1});function vh(){this.fc=this.Yd=this.Cc=this.Ya=this.Ra=this.$a=null}vh.prototype=new q;vh.prototype.constructor=vh;d=vh.prototype;d.ha=function(){return"RouterConfig"};d.fa=function(){return 6};
d.n=function(a){if(this===a)return!0;if(a&&a.$classData&&a.$classData.m.Oj){var b=this.$a,c=a.$a;(null===b?null===c:b.n(c))?(b=this.Ra,c=a.Ra,b=null===b?null===c:b.n(c)):b=!1;if(b&&this.Ya===a.Ya&&this.Cc===a.Cc&&this.Yd===a.Yd)return b=this.fc,a=a.fc,null===b?null===a:b.n(a)}return!1};d.ga=function(a){switch(a){case 0:return this.$a;case 1:return this.Ra;case 2:return this.Ya;case 3:return this.Cc;case 4:return this.Yd;case 5:return this.fc;default:throw(new W).h(""+a);}};
d.j=function(){return S(T(),this)};d.p=function(){return Q(this)};d.ka=function(){return Z(this)};d.$classData=p({Oj:0},!1,"japgolly.scalajs.react.extra.router.RouterConfig",{Oj:1,c:1,na:1,k:1,g:1,f:1});function Qe(){this.Ya=this.Ra=this.$a=null}Qe.prototype=new q;Qe.prototype.constructor=Qe;d=Qe.prototype;d.$e=function(a,b,c){this.$a=a;this.Ra=b;this.Ya=c;return this};d.ha=function(){return"Rule"};d.fa=function(){return 3};
d.n=function(a){if(this===a)return!0;if(a&&a.$classData&&a.$classData.m.Qj){var b=this.$a,c=a.$a;(null===b?null===c:b.n(c))?(b=this.Ra,c=a.Ra,b=null===b?null===c:b.n(c)):b=!1;return b?this.Ya===a.Ya:!1}return!1};d.ga=function(a){switch(a){case 0:return this.$a;case 1:return this.Ra;case 2:return this.Ya;default:throw(new W).h(""+a);}};
function qh(a){return fq(a,w(new x,function(){return function(a){Bj();a="Unspecified path for page "+a+".";throw R(P(),(new xp).h(a));}}(a)),D(function(){return function(a,c){Bj();a="Unspecified action for page "+c+" at "+a+".";throw R(P(),(new xp).h(a));}}(a)))}d.j=function(){return S(T(),this)};function fq(a,b,c){var e=a.$a;b=Jf(Lf(),a.Ra,b);Gf||(Gf=(new Ef).b());return(new gq).$e(e,b,Ff(a.Ya,c))}
function ph(a,b){var c=If(Lf(),a.$a,b.$a),e=Lf();return(new Qe).$e(c,If(e,a.Ra,b.Ra),D(function(a,b){return function(c,e){return Vd(a.Ra.e(e).i()?b.Ya:a.Ya,c,e)}}(a,b)))}d.p=function(){return Q(this)};d.ka=function(){return Z(this)};d.$classData=p({Qj:0},!1,"japgolly.scalajs.react.extra.router.StaticDsl$Rule",{Qj:1,c:1,na:1,k:1,g:1,f:1});function gq(){this.Ya=this.Ra=this.$a=null}gq.prototype=new q;gq.prototype.constructor=gq;d=gq.prototype;d.$e=function(a,b,c){this.$a=a;this.Ra=b;this.Ya=c;return this};
d.ha=function(){return"Rules"};d.fa=function(){return 3};d.n=function(a){if(this===a)return!0;if(a&&a.$classData&&a.$classData.m.Rj){var b=this.$a,c=a.$a;(null===b?null===c:b.n(c))?(b=this.Ra,c=a.Ra,b=null===b?null===c:b.n(c)):b=!1;return b?this.Ya===a.Ya:!1}return!1};d.ga=function(a){switch(a){case 0:return this.$a;case 1:return this.Ra;case 2:return this.Ya;default:throw(new W).h(""+a);}};d.j=function(){return S(T(),this)};
function th(a,b){var c=Kn();b=Jf(Lf(),a.$a,b);var e=new vh,f=a.Ra;a=a.Ya;var k=Jn(c),l=In(c),c=c.gl;e.$a=b;e.Ra=f;e.Ya=a;e.Cc=k;e.Yd=l;e.fc=c;return e}d.p=function(){return Q(this)};d.ka=function(){return Z(this)};d.$classData=p({Rj:0},!1,"japgolly.scalajs.react.extra.router.StaticDsl$Rules",{Rj:1,c:1,na:1,k:1,g:1,f:1});function hq(){}hq.prototype=new wp;hq.prototype.constructor=hq;function iq(){}iq.prototype=hq.prototype;hq.prototype.dp=function(){return this};
p({jp:0},!1,"java.lang.ArithmeticException",{jp:1,zc:1,Kc:1,Ib:1,c:1,f:1});function Cb(){this.sb=null}Cb.prototype=new yp;Cb.prototype.constructor=Cb;function jq(){}jq.prototype=Cb.prototype;Cb.prototype.b=function(){U.prototype.yb.call(this,null,0,0,!0);return this};Cb.prototype.h=function(a){U.prototype.yb.call(this,a,0,0,!0);return this};Cb.prototype.$classData=p({Tk:0},!1,"java.lang.IllegalArgumentException",{Tk:1,zc:1,Kc:1,Ib:1,c:1,f:1});function Lm(){this.sb=null}Lm.prototype=new yp;
Lm.prototype.constructor=Lm;Lm.prototype.h=function(a){U.prototype.yb.call(this,a,0,0,!0);return this};Lm.prototype.$classData=p({tp:0},!1,"java.lang.IllegalStateException",{tp:1,zc:1,Kc:1,Ib:1,c:1,f:1});function W(){this.sb=null}W.prototype=new yp;W.prototype.constructor=W;W.prototype.h=function(a){U.prototype.yb.call(this,a,0,0,!0);return this};W.prototype.$classData=p({up:0},!1,"java.lang.IndexOutOfBoundsException",{up:1,zc:1,Kc:1,Ib:1,c:1,f:1});function kq(){}kq.prototype=new wp;
kq.prototype.constructor=kq;kq.prototype.b=function(){return this};kq.prototype.$classData=p({yp:0},!1,"java.lang.JSConsoleBasedPrintStream$DummyOutputStream",{yp:1,To:1,c:1,Ro:1,lp:1,So:1});function Ap(){this.sb=null}Ap.prototype=new yp;Ap.prototype.constructor=Ap;Ap.prototype.b=function(){U.prototype.yb.call(this,null,0,0,!0);return this};Ap.prototype.$classData=p({Ap:0},!1,"java.lang.NegativeArraySizeException",{Ap:1,zc:1,Kc:1,Ib:1,c:1,f:1});function yh(){this.sb=null}yh.prototype=new yp;
yh.prototype.constructor=yh;yh.prototype.b=function(){U.prototype.yb.call(this,null,0,0,!0);return this};yh.prototype.$classData=p({Bp:0},!1,"java.lang.NullPointerException",{Bp:1,zc:1,Kc:1,Ib:1,c:1,f:1});function Dm(){this.sb=null}Dm.prototype=new yp;Dm.prototype.constructor=Dm;Dm.prototype.b=function(){U.prototype.yb.call(this,null,0,0,!0);return this};Dm.prototype.h=function(a){U.prototype.yb.call(this,a,0,0,!0);return this};
Dm.prototype.$classData=p({Hp:0},!1,"java.lang.UnsupportedOperationException",{Hp:1,zc:1,Kc:1,Ib:1,c:1,f:1});function lq(){}lq.prototype=new Eo;lq.prototype.constructor=lq;function mq(){}mq.prototype=lq.prototype;lq.prototype.n=function(a){return a===this?!0:a&&a.$classData&&a.$classData.m.cf?a.r()===this.r()&&this.ck(a):!1};lq.prototype.p=function(){var a=Dj(),b=this.Hb();return Gj(rk(a,b)).dc(0,D(function(){return function(a,b){a|=0;return za(b)+a|0}}(this)))|0};function Ej(){this.sa=null}
Ej.prototype=new Fp;Ej.prototype.constructor=Ej;Ej.prototype.qi=function(a){Ep.prototype.qi.call(this,a);return this};Ej.prototype.$classData=p({Pp:0},!1,"java.util.Collections$ImmutableMap",{Pp:1,uu:1,c:1,wu:1,Vk:1,Bi:1});function nq(){this.sa=null}nq.prototype=new q;nq.prototype.constructor=nq;function oq(){}d=oq.prototype=nq.prototype;d.j=function(){return this.sa.j()};d.r=function(){return this.sa.r()};d.E=function(a){return this.sa.E(a)};d.oi=function(a){this.sa=a;return this};
d.bd=function(){throw(new Dm).b();};d.Hb=function(){var a=new Fo,b=this.sa.Hb();a.sa=b;return a};function Hm(){Im.call(this);this.pa=null}Hm.prototype=new Bp;Hm.prototype.constructor=Hm;Hm.prototype.$classData=p({Yp:0},!1,"java.util.HashMap$EntrySet$$anon$2$$anon$1",{Yp:1,tu:1,c:1,aq:1,g:1,f:1});function V(){this.sb=null}V.prototype=new yp;V.prototype.constructor=V;V.prototype.b=function(){U.prototype.yb.call(this,null,0,0,!0);return this};
V.prototype.h=function(a){U.prototype.yb.call(this,a,0,0,!0);return this};V.prototype.$classData=p({bq:0},!1,"java.util.NoSuchElementException",{bq:1,zc:1,Kc:1,Ib:1,c:1,f:1});function pq(){this.sa=null}pq.prototype=new q;pq.prototype.constructor=pq;d=pq.prototype;d.ha=function(){return"Box"};d.fa=function(){return 1};d.n=function(a){if(a&&a.$classData&&a.$classData.m.Xk){var b=this.sa;a=a.sa;return null===b?null===a:ya(b,a)}return!1};
d.ga=function(a){switch(a){case 0:return this.sa;default:throw(new W).h(""+a);}};d.j=function(){return S(T(),this)};d.l=function(a){this.sa=a;return this};d.p=function(){return null===this.sa?0:za(this.sa)};d.ka=function(){return Z(this)};d.$classData=p({Xk:0},!1,"java.util.package$Box",{Xk:1,c:1,na:1,k:1,g:1,f:1});function G(){this.Yf=this.hl=this.sb=null;this.Rh=!1}G.prototype=new yp;G.prototype.constructor=G;
G.prototype.ii=function(){if(!this.Rh&&!this.Rh){var a;if(null===this.Yf)a="null";else try{a=ja(this.Yf)+" ("+("of class "+zb(ka(this.Yf)))+")"}catch(b){if(null!==gg(P(),b))a="an instance of class "+zb(ka(this.Yf));else throw b;}this.hl=a;this.Rh=!0}return this.hl};G.prototype.l=function(a){this.Yf=a;U.prototype.yb.call(this,null,0,0,!0);return this};G.prototype.$classData=p({iq:0},!1,"scala.MatchError",{iq:1,zc:1,Kc:1,Ib:1,c:1,f:1});function qq(){}qq.prototype=new q;qq.prototype.constructor=qq;
function rq(){}rq.prototype=qq.prototype;function bi(){}bi.prototype=new q;bi.prototype.constructor=bi;d=bi.prototype;d.b=function(){return this};d.e=function(a){this.Oh(a)};d.j=function(){return"\x3cfunction1\x3e"};d.Vb=function(){return!1};d.Ld=function(a,b){return Yh(this,a,b)};d.Oh=function(a){throw(new G).l(a);};d.sc=function(){return this};d.$classData=p({nq:0},!1,"scala.PartialFunction$$anon$1",{nq:1,c:1,Da:1,y:1,g:1,f:1});function sq(){this.Ci=this.De=null}sq.prototype=new q;
sq.prototype.constructor=sq;function qp(a,b){var c=new sq;c.De=a;c.Ci=b;return c}d=sq.prototype;d.e=function(a){return this.Ci.e(this.De.e(a))};d.j=function(){return"\x3cfunction1\x3e"};d.Vb=function(a){return this.De.Vb(a)};d.Ld=function(a,b){var c=this.De.Ld(a,ci().ef);return ci().ef===c?b.e(a):this.Ci.e(c)};d.sc=function(a){return qp(this,a)};d.$classData=p({pq:0},!1,"scala.PartialFunction$AndThen",{pq:1,c:1,Da:1,y:1,g:1,f:1});function jf(){this.ll=null}jf.prototype=new un;
jf.prototype.constructor=jf;jf.prototype.e=function(a){return this.wg(a)};function hf(a,b){a.ll=b;return a}jf.prototype.wg=function(a){a=this.ll.Ld(a,ci().ef);return ci().ef===a?I():(new L).l(a)};jf.prototype.$classData=p({qq:0},!1,"scala.PartialFunction$Lifted",{qq:1,em:1,c:1,y:1,g:1,f:1});function To(){}To.prototype=new Op;To.prototype.constructor=To;To.prototype.b=function(){return this};To.prototype.e=function(a){return a};
To.prototype.$classData=p({sq:0},!1,"scala.Predef$$anon$1",{sq:1,Gu:1,c:1,y:1,g:1,f:1});function Uo(){}Uo.prototype=new Mp;Uo.prototype.constructor=Uo;Uo.prototype.b=function(){return this};Uo.prototype.e=function(a){return a};Uo.prototype.$classData=p({tq:0},!1,"scala.Predef$$anon$2",{tq:1,Fu:1,c:1,y:1,g:1,f:1});function tq(){}tq.prototype=new q;tq.prototype.constructor=tq;function uq(){}uq.prototype=tq.prototype;function Lj(){this.sb=null}Lj.prototype=new Am;Lj.prototype.constructor=Lj;
Lj.prototype.b=function(){U.prototype.yb.call(this,null,0,0,!0);return this};Lj.prototype.Kg=function(){Wo||(Wo=(new Vo).b());return Wo.uj?U.prototype.Kg.call(this):this};Lj.prototype.$classData=p({br:0},!1,"scala.util.control.BreakControl",{br:1,Ib:1,c:1,f:1,Mu:1,Nu:1});function vq(a,b){return 0<=b&&b<a.ja()}function li(){this.Ma=null}li.prototype=new fn;li.prototype.constructor=li;li.prototype.b=function(){en.prototype.b.call(this);return this};li.prototype.da=function(){wq();return(new Yd).b()};
li.prototype.$classData=p({mr:0},!1,"scala.collection.Iterable$",{mr:1,Mb:1,Va:1,c:1,Ob:1,Wa:1});var ki=void 0;function fg(){this.Bk=this.pa=null}fg.prototype=new Qp;fg.prototype.constructor=fg;fg.prototype.s=function(){return this.Bk.e(this.pa.s())};fg.prototype.af=function(a,b){if(null===a)throw R(P(),null);this.pa=a;this.Bk=b;return this};fg.prototype.x=function(){return this.pa.x()};fg.prototype.$classData=p({or:0},!1,"scala.collection.Iterator$$anon$10",{or:1,tb:1,c:1,vb:1,u:1,t:1});
function Hg(){this.ji=null;this.Mg=!1;this.jl=this.pa=null}Hg.prototype=new Qp;Hg.prototype.constructor=Hg;Hg.prototype.s=function(){return this.x()?(this.Mg=!1,this.ji):oi().Ba.s()};Hg.prototype.af=function(a,b){if(null===a)throw R(P(),null);this.pa=a;this.jl=b;this.Mg=!1;return this};Hg.prototype.x=function(){if(!this.Mg){do{if(!this.pa.x())return!1;this.ji=this.pa.s()}while(!this.jl.e(this.ji));this.Mg=!0}return!0};
Hg.prototype.$classData=p({pr:0},!1,"scala.collection.Iterator$$anon$12",{pr:1,tb:1,c:1,vb:1,u:1,t:1});function ck(){}ck.prototype=new Qp;ck.prototype.constructor=ck;ck.prototype.b=function(){return this};ck.prototype.s=function(){throw(new V).h("next on empty iterator");};ck.prototype.x=function(){return!1};ck.prototype.$classData=p({qr:0},!1,"scala.collection.Iterator$$anon$2",{qr:1,tb:1,c:1,vb:1,u:1,t:1});function xq(){}xq.prototype=new q;xq.prototype.constructor=xq;xq.prototype.b=function(){return this};
xq.prototype.$classData=p({rr:0},!1,"scala.collection.JavaConverters$",{rr:1,c:1,Su:1,Qu:1,Tu:1,Ru:1});var yq=void 0;function Dj(){yq||(yq=(new xq).b());return yq}function zq(){this.Fc=null}zq.prototype=new Qp;zq.prototype.constructor=zq;function Aq(a){var b=new zq;b.Fc=a;return b}zq.prototype.s=function(){if(this.x()){var a=this.Fc.ra();this.Fc=this.Fc.ia();return a}return oi().Ba.s()};zq.prototype.x=function(){return!this.Fc.i()};
zq.prototype.$classData=p({sr:0},!1,"scala.collection.LinearSeqLike$$anon$1",{sr:1,tb:1,c:1,vb:1,u:1,t:1});function Bq(){this.we=null}Bq.prototype=new Qp;Bq.prototype.constructor=Bq;Bq.prototype.s=function(){return this.we.s().Ia};Bq.prototype.x=function(){return this.we.x()};Bq.prototype.Pg=function(a){this.we=a.z();return this};Bq.prototype.$classData=p({tr:0},!1,"scala.collection.MapLike$$anon$1",{tr:1,tb:1,c:1,vb:1,u:1,t:1});function Eq(){}Eq.prototype=new Up;Eq.prototype.constructor=Eq;
Eq.prototype.b=function(){return this};Eq.prototype.Hc=function(){return Fq()};Eq.prototype.da=function(){return Gq(new Hq,Fq())};Eq.prototype.$classData=p({vr:0},!1,"scala.collection.Set$",{vr:1,hf:1,gf:1,Va:1,c:1,Wa:1});var Iq=void 0;function Jq(){Iq||(Iq=(new Eq).b());return Iq}function ji(){this.Ma=null}ji.prototype=new fn;ji.prototype.constructor=ji;ji.prototype.b=function(){en.prototype.b.call(this);ii=this;(new Kj).b();return this};ji.prototype.da=function(){Kq||(Kq=(new Lq).b());return(new Yd).b()};
ji.prototype.$classData=p({wr:0},!1,"scala.collection.Traversable$",{wr:1,Mb:1,Va:1,c:1,Ob:1,Wa:1});var ii=void 0;function Mq(){this.oj=null}Mq.prototype=new Qp;Mq.prototype.constructor=Mq;Mq.prototype.s=function(){var a=this.oj.s();return(new M).Q(a.wa,a.X)};Mq.prototype.x=function(){return this.oj.x()};Mq.prototype.$classData=p({Cr:0},!1,"scala.collection.convert.Wrappers$JMapWrapperLike$$anon$2",{Cr:1,tb:1,c:1,vb:1,u:1,t:1});function Nq(){}Nq.prototype=new Up;Nq.prototype.constructor=Nq;
function Oq(){}Oq.prototype=Nq.prototype;Nq.prototype.Hc=function(){return this.Ig()};Nq.prototype.da=function(){return Gq(new Hq,this.Ig())};function Pq(){}Pq.prototype=new Up;Pq.prototype.constructor=Pq;function Qq(){}Qq.prototype=Pq.prototype;Pq.prototype.da=function(){return aq(new $p,this.Hc())};function Rq(){this.Ma=null}Rq.prototype=new fn;Rq.prototype.constructor=Rq;Rq.prototype.b=function(){en.prototype.b.call(this);return this};Rq.prototype.da=function(){return(new Yd).b()};
Rq.prototype.$classData=p({Zr:0},!1,"scala.collection.immutable.Iterable$",{Zr:1,Mb:1,Va:1,c:1,Ob:1,Wa:1});var Sq=void 0;function wq(){Sq||(Sq=(new Rq).b());return Sq}function Tq(){this.Fc=null}Tq.prototype=new Qp;Tq.prototype.constructor=Tq;Tq.prototype.s=function(){if(!this.x())return oi().Ba.s();var a=Ik(this.Fc),b=a.ra();this.Fc=Hk(new Gk,this,z(new A,function(a,b){return function(){return b.ia()}}(this,a)));return b};
function Uq(a){var b=new Tq;b.Fc=Hk(new Gk,b,z(new A,function(a,b){return function(){return b}}(b,a)));return b}Tq.prototype.x=function(){return!Ik(this.Fc).i()};Tq.prototype.Db=function(){var a=Ik(this.Fc);this.Fc=Hk(new Gk,this,z(new A,function(){return function(){vi();return bn()}}(this)));return a};Tq.prototype.$classData=p({Cs:0},!1,"scala.collection.immutable.StreamIterator",{Cs:1,tb:1,c:1,vb:1,u:1,t:1});function Lq(){this.Ma=null}Lq.prototype=new fn;Lq.prototype.constructor=Lq;
Lq.prototype.b=function(){en.prototype.b.call(this);return this};Lq.prototype.da=function(){return(new Yd).b()};Lq.prototype.$classData=p({Fs:0},!1,"scala.collection.immutable.Traversable$",{Fs:1,Mb:1,Va:1,c:1,Ob:1,Wa:1});var Kq=void 0;function Vq(){this.uk=null;this.pc=0;this.ff=this.Xi=this.jh=null;this.ce=0;this.Fe=null}Vq.prototype=new Qp;Vq.prototype.constructor=Vq;function Wq(){}Wq.prototype=Vq.prototype;
Vq.prototype.s=function(){if(null!==this.Fe){var a=this.Fe.s();this.Fe.x()||(this.Fe=null);return a}a:{var a=this.ff,b=this.ce;for(;;){b===(-1+a.d.length|0)?(this.pc=-1+this.pc|0,0<=this.pc?(this.ff=this.jh.d[this.pc],this.ce=this.Xi.d[this.pc],this.jh.d[this.pc]=null):(this.ff=null,this.ce=0)):this.ce=1+this.ce|0;if((a=a.d[b])&&a.$classData&&a.$classData.m.Hl||a&&a.$classData&&a.$classData.m.Il){a=this.Fk(a);break a}if(a&&a.$classData&&a.$classData.m.Zi||Xq(a))0<=this.pc&&(this.jh.d[this.pc]=this.ff,
this.Xi.d[this.pc]=this.ce),this.pc=1+this.pc|0,this.ff=Yq(a),this.ce=0,a=Yq(a),b=0;else{this.Fe=a.z();a=this.s();break a}}}return a};Vq.prototype.x=function(){return null!==this.Fe||0<=this.pc};function Yq(a){if(a&&a.$classData&&a.$classData.m.Zi)return a.rb;if(!Xq(a))throw(new G).l(a);return a.qb}Vq.prototype.Ik=function(a){this.uk=a;this.pc=0;this.jh=m(v(v(Zq)),[6]);this.Xi=m(v(Va),[6]);this.ff=this.uk;this.ce=0;this.Fe=null;return this};function Nk(){this.Ak=this.Wc=null}Nk.prototype=new q;
Nk.prototype.constructor=Nk;function Mk(a,b,c){a.Ak=c;a.Wc=b;return a}d=Nk.prototype;d.n=function(a){return null!==a&&(a===this||a===this.Wc||ya(a,this.Wc))};d.gb=function(a){this.Wc.hb(a);return this};d.j=function(){return""+this.Wc};d.Sa=function(){return this.Ak.e(this.Wc.Sa())};d.Zb=function(a,b){this.Wc.Zb(a,b)};d.hb=function(a){this.Wc.hb(a);return this};d.p=function(){return this.Wc.p()};d.Qb=function(a){this.Wc.Qb(a)};d.Xa=function(a){this.Wc.Xa(a);return this};
d.$classData=p({Rs:0},!1,"scala.collection.mutable.Builder$$anon$1",{Rs:1,c:1,Pb:1,Nb:1,Lb:1,Iu:1});function $q(){this.Dd=0;this.pa=null}$q.prototype=new Qp;$q.prototype.constructor=$q;$q.prototype.s=function(){return this.x()?(this.Dd=1+this.Dd|0,Mb(this.pa.W.d[-1+this.Dd|0])):oi().Ba.s()};$q.prototype.x=function(){for(;this.Dd<this.pa.W.d.length&&null===this.pa.W.d[this.Dd];)this.Dd=1+this.Dd|0;return this.Dd<this.pa.W.d.length};
$q.prototype.$classData=p({Us:0},!1,"scala.collection.mutable.FlatHashTable$$anon$1",{Us:1,tb:1,c:1,vb:1,u:1,t:1});function ar(){this.we=null}ar.prototype=new Qp;ar.prototype.constructor=ar;ar.prototype.s=function(){return this.we.s().wa};ar.prototype.ri=function(a){this.we=br(a);return this};ar.prototype.x=function(){return this.we.x()};ar.prototype.$classData=p({Zs:0},!1,"scala.collection.mutable.HashMap$$anon$3",{Zs:1,tb:1,c:1,vb:1,u:1,t:1});function cr(){this.wi=null;this.Xe=0;this.se=null}
cr.prototype=new Qp;cr.prototype.constructor=cr;cr.prototype.s=function(){var a=this.se;for(this.se=this.se.s();null===this.se&&0<this.Xe;)this.Xe=-1+this.Xe|0,this.se=this.wi.d[this.Xe];return a};function br(a){var b=new cr;b.wi=a.W;b.Xe=il(a);b.se=b.wi.d[b.Xe];return b}cr.prototype.x=function(){return null!==this.se};cr.prototype.$classData=p({dt:0},!1,"scala.collection.mutable.HashTable$$anon$1",{dt:1,tb:1,c:1,vb:1,u:1,t:1});function dr(){this.Ma=null}dr.prototype=new fn;
dr.prototype.constructor=dr;dr.prototype.b=function(){en.prototype.b.call(this);return this};dr.prototype.da=function(){return(new er).b()};dr.prototype.$classData=p({gt:0},!1,"scala.collection.mutable.Iterable$",{gt:1,Mb:1,Va:1,c:1,Ob:1,Wa:1});var fr=void 0;function gr(){this.Zf=null}gr.prototype=new q;gr.prototype.constructor=gr;function hr(){}d=hr.prototype=gr.prototype;d.b=function(){this.Zf=(new Yd).b();return this};d.gb=function(a){return ir(this,a)};
function ir(a,b){var c=a.Zf;Xd();b=(new H).Oa([b]);var e=Xd().Ma.yg(),f=b.Id();switch(f){case -1:break;default:e.Qb(f)}e.Xa(b.Ha());b=e.Sa();Zd(c,b);return a}d.Zb=function(a,b){qn(this,a,b)};d.hb=function(a){return ir(this,a)};d.Qb=function(){};d.Xa=function(a){Zd(this.Zf,a);return this};function jr(){this.Af=null}jr.prototype=new Qp;jr.prototype.constructor=jr;jr.prototype.s=function(){if(this.x()){var a=this.Af.wa;this.Af=this.Af.Ug;return a}return oi().Ba.s()};
jr.prototype.x=function(){return null!==this.Af};jr.prototype.$classData=p({jt:0},!1,"scala.collection.mutable.LinkedHashSet$$anon$1",{jt:1,tb:1,c:1,vb:1,u:1,t:1});function kr(){this.Bf=null}kr.prototype=new Qp;kr.prototype.constructor=kr;kr.prototype.s=function(){if(this.x()){var a=this.Bf.ra();this.Bf=this.Bf.Xc();return a}throw(new V).h("next on empty Iterator");};kr.prototype.x=function(){return this.Bf!==B()};
kr.prototype.$classData=p({mt:0},!1,"scala.collection.mutable.ListBuffer$$anon$1",{mt:1,tb:1,c:1,vb:1,u:1,t:1});function zk(){this.Tb=this.Ba=null}zk.prototype=new q;zk.prototype.constructor=zk;function lr(a,b){a.Tb=a.Tb.$c(b);return a}d=zk.prototype;d.gb=function(a){return lr(this,a)};d.Sa=function(){return this.Tb};d.Zb=function(a,b){qn(this,a,b)};function yk(a,b){a.Ba=b;a.Tb=b;return a}d.hb=function(a){return lr(this,a)};d.Qb=function(){};d.Xa=function(a){return Dk(this,a)};
d.$classData=p({ot:0},!1,"scala.collection.mutable.MapBuilder",{ot:1,c:1,hg:1,Pb:1,Nb:1,Lb:1});function Hq(){this.Tb=this.Ba=null}Hq.prototype=new q;Hq.prototype.constructor=Hq;d=Hq.prototype;d.gb=function(a){return mr(this,a)};d.Sa=function(){return this.Tb};d.Zb=function(a,b){qn(this,a,b)};function mr(a,b){a.Tb=a.Tb.Sb(b);return a}function Gq(a,b){a.Ba=b;a.Tb=b;return a}d.hb=function(a){return mr(this,a)};d.Qb=function(){};d.Xa=function(a){return Dk(this,a)};
d.$classData=p({rt:0},!1,"scala.collection.mutable.SetBuilder",{rt:1,c:1,hg:1,Pb:1,Nb:1,Lb:1});function nr(){this.ak=this.wf=0;this.om=null}nr.prototype=new Qp;nr.prototype.constructor=nr;nr.prototype.s=function(){var a=this.om.ga(this.wf);this.wf=1+this.wf|0;return a};function Z(a){var b=new nr;b.om=a;b.wf=0;b.ak=a.fa();return b}nr.prototype.x=function(){return this.wf<this.ak};nr.prototype.$classData=p({Ot:0},!1,"scala.runtime.ScalaRunTime$$anon$1",{Ot:1,tb:1,c:1,vb:1,u:1,t:1});
function Yl(){this.lm=this.Uf=this.v=null}Yl.prototype=new q;Yl.prototype.constructor=Yl;Yl.prototype.th=function(){return this.lm};Yl.prototype.$k=function(a){Nc();var b=pb().Jc;return or(this,b,a)};Yl.prototype.bl=function(a){Nc();var b=pb().Jc;return or(this,a,b)};function Xl(a,b,c){a.v=b;a.Uf=c;a.lm=wm(a.v);return a}Yl.prototype.$classData=p({Hm:0},!1,"japgolly.scalajs.react.component.Js$$anon$3",{Hm:1,c:1,Mm:1,Lm:1,Cm:1,Bm:1,Dm:1});function pr(){this.Ii=this.Mi=this.Qd=this.Uf=this.v=null}
pr.prototype=new q;pr.prototype.constructor=pr;pr.prototype.th=function(){return this.Qd.th()};pr.prototype.$k=function(a){Nc();var b=this.Qd,c=this.Mi;a=ib(a,this.Ii);return or(b,c,a)};function or(a,b,c){var e=new pr;e.Qd=a;e.Mi=b;e.Ii=c;e.v=a.v;e.Uf=ib(c,a.Uf);return e}pr.prototype.bl=function(a){Nc();var b=this.Qd;a=ib(a,this.Mi);return or(b,a,this.Ii)};pr.prototype.$classData=p({Im:0},!1,"japgolly.scalajs.react.component.Js$$anon$4",{Im:1,c:1,Mm:1,Lm:1,Cm:1,Bm:1,Dm:1});
function qr(){this.Si=this.fb=this.qe=this.v=null}qr.prototype=new q;qr.prototype.constructor=qr;function Wl(a,b,c,e){var f=new qr;if(null===a)throw R(P(),null);f.fb=a;f.Si=e;f.v=b;f.qe=c;return f}qr.prototype.$j=function(a){var b=this.fb,c=pb().Jc,e=pb().Jc;return rr(b,this,a,c,e,this.Si)};qr.prototype.cl=function(a){var b=this.fb,c=pb().Jc,e=pb().Jc;return rr(b,this,c,e,a,this.Si)};
qr.prototype.$classData=p({Om:0},!1,"japgolly.scalajs.react.component.JsBaseComponentTemplate$$anon$1",{Om:1,c:1,Rm:1,Qm:1,zm:1,ym:1,Am:1});function sr(){this.bh=this.Ni=this.Gi=this.Yh=this.Qd=this.fb=this.qe=this.v=null}sr.prototype=new q;sr.prototype.constructor=sr;sr.prototype.$j=function(a){var b=this.fb,c=this.Qd;a=ib(this.Yh,a);return rr(b,c,a,this.Gi,this.Ni,this.bh)};
function rr(a,b,c,e,f,k){var l=new sr;if(null===a)throw R(P(),null);l.fb=a;l.Qd=b;l.Yh=c;l.Gi=e;l.Ni=f;l.bh=k;l.v=b.v;pb();a=e.e(b.qe);b=l.bh;c=new ng;c.Pd=a;c.gq=b;a=c.Pd;b=f.e(a.sh);f=sc(new tc,b,ib(f,a.Bg),a.Wg);l.qe=f;return l}sr.prototype.cl=function(a){var b=this.fb,c=this.Qd,e=this.Yh,f=this.Gi;a=ib(a,this.Ni);return rr(b,c,e,f,a,this.bh)};sr.prototype.$classData=p({Pm:0},!1,"japgolly.scalajs.react.component.JsBaseComponentTemplate$$anon$2",{Pm:1,c:1,Rm:1,Qm:1,zm:1,ym:1,Am:1});
function Mn(){this.w=null}Mn.prototype=new te;Mn.prototype.constructor=Mn;d=Mn.prototype;d.ha=function(){return"AbsUrl"};d.fa=function(){return 1};d.n=function(a){return this===a?!0:a&&a.$classData&&a.$classData.m.Hj?this.w===a.w:!1};d.ga=function(a){switch(a){case 0:return this.w;default:throw(new W).h(""+a);}};d.mh=function(a){return a.w};d.j=function(){return S(T(),this)};d.p=function(){return Q(this)};
d.h=function(a){this.w=a;-1===(this.w.indexOf("://")|0)&&(a=this+" doesn't seem to be a valid URL. It's missing '://'. Consider using AbsUrl.fromWindow.",cc().warn(a));return this};d.ka=function(){return Z(this)};d.Vg=function(a){return(new Mn).h(a)};d.$classData=p({Hj:0},!1,"japgolly.scalajs.react.extra.router.AbsUrl",{Hj:1,Kj:1,c:1,na:1,k:1,g:1,f:1});function Ch(){this.w=null}Ch.prototype=new te;Ch.prototype.constructor=Ch;d=Ch.prototype;d.ha=function(){return"BaseUrl"};d.fa=function(){return 1};
d.n=function(a){return this===a?!0:a&&a.$classData&&a.$classData.m.Ij?this.w===a.w:!1};d.ga=function(a){switch(a){case 0:return this.w;default:throw(new W).h(""+a);}};d.mh=function(a){return a.w};d.j=function(){return S(T(),this)};d.p=function(){return Q(this)};d.h=function(a){this.w=a;-1===(this.w.indexOf("://")|0)&&(a=this+" doesn't seem to be a valid URL. It's missing '://'. Consider using BaseUrl.fromWindowOrigin.",cc().warn(a));return this};d.ka=function(){return Z(this)};d.Vg=function(a){return(new Ch).h(a)};
function Rn(a,b){return(new Mn).h(""+a.w+b.w)}d.$classData=p({Ij:0},!1,"japgolly.scalajs.react.extra.router.BaseUrl",{Ij:1,Kj:1,c:1,na:1,k:1,g:1,f:1});function ve(){this.w=null}ve.prototype=new te;ve.prototype.constructor=ve;d=ve.prototype;d.ha=function(){return"Path"};d.fa=function(){return 1};d.n=function(a){return this===a?!0:a&&a.$classData&&a.$classData.m.Jj?this.w===a.w:!1};d.ga=function(a){switch(a){case 0:return this.w;default:throw(new W).h(""+a);}};d.j=function(){return S(T(),this)};
d.mh=function(a){return a.w};d.p=function(){return Q(this)};d.h=function(a){this.w=a;return this};d.ka=function(){return Z(this)};d.Vg=function(a){return(new ve).h(a)};d.$classData=p({Jj:0},!1,"japgolly.scalajs.react.extra.router.Path",{Jj:1,Kj:1,c:1,na:1,k:1,g:1,f:1});function eo(){}eo.prototype=new q;eo.prototype.constructor=eo;d=eo.prototype;d.b=function(){return this};d.ha=function(){return"Force"};d.fa=function(){return 0};d.ga=function(a){throw(new W).h(""+a);};d.j=function(){return"Force"};
d.p=function(){return 68065995};d.ka=function(){return Z(this)};d.$classData=p({Bn:0},!1,"japgolly.scalajs.react.extra.router.Redirect$Force$",{Bn:1,c:1,Lj:1,na:1,k:1,g:1,f:1});var co=void 0;function tr(){}tr.prototype=new q;tr.prototype.constructor=tr;d=tr.prototype;d.b=function(){return this};d.ha=function(){return"Push"};d.fa=function(){return 0};d.ga=function(a){throw(new W).h(""+a);};d.j=function(){return"Push"};d.p=function(){return 2499386};d.ka=function(){return Z(this)};
d.$classData=p({Cn:0},!1,"japgolly.scalajs.react.extra.router.Redirect$Push$",{Cn:1,c:1,Lj:1,na:1,k:1,g:1,f:1});var ur=void 0;function Wn(){ur||(ur=(new tr).b());return ur}function vr(){}vr.prototype=new q;vr.prototype.constructor=vr;d=vr.prototype;d.b=function(){return this};d.ha=function(){return"Replace"};d.fa=function(){return 0};d.ga=function(a){throw(new W).h(""+a);};d.j=function(){return"Replace"};d.p=function(){return-1535817068};d.ka=function(){return Z(this)};
d.$classData=p({Dn:0},!1,"japgolly.scalajs.react.extra.router.Redirect$Replace$",{Dn:1,c:1,Lj:1,na:1,k:1,g:1,f:1});var wr=void 0;function rh(){wr||(wr=(new vr).b());return wr}function Ye(){this.Pd=null}Ye.prototype=new q;Ye.prototype.constructor=Ye;d=Ye.prototype;d.ha=function(){return"Renderer"};d.fa=function(){return 1};d.n=function(a){if(this===a)return!0;if(a&&a.$classData&&a.$classData.m.Dh){var b=this.Pd;a=a.Pd;return null===b?null===a:b.n(a)}return!1};
d.ga=function(a){switch(a){case 0:return this.Pd;default:throw(new W).h(""+a);}};d.j=function(){return S(T(),this)};d.Gf=function(a){this.Pd=a;return this};d.p=function(){return Q(this)};d.ka=function(){return Z(this)};d.$classData=p({Dh:0},!1,"japgolly.scalajs.react.extra.router.Renderer",{Dh:1,c:1,yn:1,na:1,k:1,g:1,f:1});function xr(){}xr.prototype=new ze;xr.prototype.constructor=xr;d=xr.prototype;d.b=function(){return this};d.ha=function(){return"BroadcastSync"};d.fa=function(){return 0};
d.ga=function(a){throw(new W).h(""+a);};d.j=function(){return"BroadcastSync"};d.p=function(){return-155951396};d.ka=function(){return Z(this)};d.$classData=p({En:0},!1,"japgolly.scalajs.react.extra.router.RouteCmd$BroadcastSync$",{En:1,Oe:1,c:1,na:1,k:1,g:1,f:1});var yr=void 0;function dm(){yr||(yr=(new xr).b());return yr}function Qn(){this.Vf=null}Qn.prototype=new ze;Qn.prototype.constructor=Qn;d=Qn.prototype;d.G=function(a){this.Vf=a;return this};d.ha=function(){return"Log"};d.fa=function(){return 1};
d.n=function(a){return this===a?!0:a&&a.$classData&&a.$classData.m.Eh?this.Vf===a.Vf:!1};d.ga=function(a){switch(a){case 0:return this.Vf;default:throw(new W).h(""+a);}};d.j=function(){return S(T(),this)};d.p=function(){return Q(this)};d.ka=function(){return Z(this)};d.$classData=p({Eh:0},!1,"japgolly.scalajs.react.extra.router.RouteCmd$Log",{Eh:1,Oe:1,c:1,na:1,k:1,g:1,f:1});function ao(){this.xb=null}ao.prototype=new ze;ao.prototype.constructor=ao;d=ao.prototype;d.ha=function(){return"PushState"};
d.fa=function(){return 1};d.n=function(a){if(this===a)return!0;if(a&&a.$classData&&a.$classData.m.Fh){var b=this.xb;a=a.xb;return null===b?null===a:b.n(a)}return!1};d.ga=function(a){switch(a){case 0:return this.xb;default:throw(new W).h(""+a);}};d.j=function(){return S(T(),this)};d.p=function(){return Q(this)};d.Hf=function(a){this.xb=a;return this};d.ka=function(){return Z(this)};d.$classData=p({Fh:0},!1,"japgolly.scalajs.react.extra.router.RouteCmd$PushState",{Fh:1,Oe:1,c:1,na:1,k:1,g:1,f:1});
function bo(){this.xb=null}bo.prototype=new ze;bo.prototype.constructor=bo;d=bo.prototype;d.ha=function(){return"ReplaceState"};d.fa=function(){return 1};d.n=function(a){if(this===a)return!0;if(a&&a.$classData&&a.$classData.m.Gh){var b=this.xb;a=a.xb;return null===b?null===a:b.n(a)}return!1};d.ga=function(a){switch(a){case 0:return this.xb;default:throw(new W).h(""+a);}};d.j=function(){return S(T(),this)};d.p=function(){return Q(this)};d.Hf=function(a){this.xb=a;return this};d.ka=function(){return Z(this)};
d.$classData=p({Gh:0},!1,"japgolly.scalajs.react.extra.router.RouteCmd$ReplaceState",{Gh:1,Oe:1,c:1,na:1,k:1,g:1,f:1});function Zn(){this.rf=null}Zn.prototype=new ze;Zn.prototype.constructor=Zn;d=Zn.prototype;d.ha=function(){return"Return"};d.fa=function(){return 1};d.n=function(a){return this===a?!0:a&&a.$classData&&a.$classData.m.Hh?J(K(),this.rf,a.rf):!1};d.ga=function(a){switch(a){case 0:return this.rf;default:throw(new W).h(""+a);}};d.j=function(){return S(T(),this)};
d.l=function(a){this.rf=a;return this};d.p=function(){return Q(this)};d.ka=function(){return Z(this)};d.$classData=p({Hh:0},!1,"japgolly.scalajs.react.extra.router.RouteCmd$Return",{Hh:1,Oe:1,c:1,na:1,k:1,g:1,f:1});function Ee(){this.df=this.Ze=null}Ee.prototype=new ze;Ee.prototype.constructor=Ee;d=Ee.prototype;d.ha=function(){return"Sequence"};d.fa=function(){return 2};
d.n=function(a){if(this===a)return!0;if(Be(a)){var b=this.Ze,c=a.Ze;if(null===b?null===c:zr(c)&&b.Kb(c))return b=this.df,a=a.df,null===b?null===a:b.n(a)}return!1};d.ga=function(a){switch(a){case 0:return this.Ze;case 1:return this.df;default:throw(new W).h(""+a);}};d.j=function(){return S(T(),this)};d.p=function(){return Q(this)};d.ka=function(){return Z(this)};function Be(a){return!!(a&&a.$classData&&a.$classData.m.Nj)}
d.$classData=p({Nj:0},!1,"japgolly.scalajs.react.extra.router.RouteCmd$Sequence",{Nj:1,Oe:1,c:1,na:1,k:1,g:1,f:1});function fo(){this.xb=null}fo.prototype=new ze;fo.prototype.constructor=fo;d=fo.prototype;d.ha=function(){return"SetWindowLocation"};d.fa=function(){return 1};d.n=function(a){if(this===a)return!0;if(a&&a.$classData&&a.$classData.m.Ih){var b=this.xb;a=a.xb;return null===b?null===a:b.n(a)}return!1};d.ga=function(a){switch(a){case 0:return this.xb;default:throw(new W).h(""+a);}};
d.j=function(){return S(T(),this)};d.p=function(){return Q(this)};d.Hf=function(a){this.xb=a;return this};d.ka=function(){return Z(this)};d.$classData=p({Ih:0},!1,"japgolly.scalajs.react.extra.router.RouteCmd$SetWindowLocation",{Ih:1,Oe:1,c:1,na:1,k:1,g:1,f:1});function Ar(){this.Pi=null}Ar.prototype=new pp;Ar.prototype.constructor=Ar;function kf(a){var b=new Ar;b.Pi=a;return b}Ar.prototype.Vb=function(a){return J(K(),this.Pi,a)};Ar.prototype.Ld=function(a,b){return J(K(),this.Pi,a)?a:b.e(a)};
Ar.prototype.$classData=p({In:0},!1,"japgolly.scalajs.react.extra.router.RouterConfigDsl$$anonfun$1",{In:1,Gt:1,c:1,y:1,Da:1,g:1,f:1});function Br(){this.ib=this.kg=null}Br.prototype=new nf;Br.prototype.constructor=Br;d=Br.prototype;d.ha=function(){return"Contramap"};function On(a,b){var c=new Br;c.kg=a;c.ib=b;return c}d.fa=function(){return 2};
d.n=function(a){if(this===a)return!0;if(a&&a.$classData&&a.$classData.m.Pj){var b=this.kg,c=a.kg;if(null===b?null===c:b.n(c))return b=this.ib,a=a.ib,null===b?null===a:b.n(a)}return!1};d.ga=function(a){switch(a){case 0:return this.kg;case 1:return this.ib;default:throw(new W).h(""+a);}};d.j=function(){return S(T(),this)};d.eh=function(){return this.kg.eh()};d.p=function(){return Q(this)};d.ka=function(){return Z(this)};
d.$classData=p({Pj:0},!1,"japgolly.scalajs.react.extra.router.RouterCtl$Contramap",{Pj:1,Kn:1,c:1,na:1,k:1,g:1,f:1});function Cr(){}Cr.prototype=new q;Cr.prototype.constructor=Cr;d=Cr.prototype;d.b=function(){return this};d.ha=function(){return"Home"};d.fa=function(){return 0};d.ga=function(a){throw(new W).h(""+a);};d.j=function(){return"Home"};d.p=function(){return 2255103};d.ka=function(){return Z(this)};d.$classData=p({Xo:0},!1,"webapp.AppRouter$Home$",{Xo:1,c:1,qu:1,na:1,k:1,g:1,f:1});
var Dr=void 0;function ef(){Dr||(Dr=(new Cr).b());return Dr}function M(){this.Ta=this.Ia=null}M.prototype=new q;M.prototype.constructor=M;d=M.prototype;d.ha=function(){return"Tuple2"};d.fa=function(){return 2};d.n=function(a){return this===a?!0:a&&a.$classData&&a.$classData.m.Wj?J(K(),this.Ia,a.Ia)&&J(K(),this.Ta,a.Ta):!1};d.Q=function(a,b){this.Ia=a;this.Ta=b;return this};d.ga=function(a){a:switch(a){case 0:a=this.Ia;break a;case 1:a=this.Ta;break a;default:throw(new W).h(""+a);}return a};
d.j=function(){return"("+this.Ia+","+this.Ta+")"};d.p=function(){return Q(this)};d.ka=function(){return Z(this)};d.$classData=p({Wj:0},!1,"scala.Tuple2",{Wj:1,c:1,Hu:1,na:1,k:1,g:1,f:1});function Bo(){this.sb=null}Bo.prototype=new jq;Bo.prototype.constructor=Bo;Bo.prototype.h=function(a){U.prototype.yb.call(this,a,0,0,!0);return this};Bo.prototype.$classData=p({Cp:0},!1,"java.lang.NumberFormatException",{Cp:1,Tk:1,zc:1,Kc:1,Ib:1,c:1,f:1});function Er(){}Er.prototype=new rq;
Er.prototype.constructor=Er;d=Er.prototype;d.b=function(){return this};d.ha=function(){return"None"};d.fa=function(){return 0};d.i=function(){return!0};d.Ja=function(){throw(new V).h("None.get");};d.ga=function(a){throw(new W).h(""+a);};d.j=function(){return"None"};d.p=function(){return 2433880};d.ka=function(){return Z(this)};d.$classData=p({jq:0},!1,"scala.None$",{jq:1,kq:1,c:1,na:1,k:1,g:1,f:1});var Fr=void 0;function I(){Fr||(Fr=(new Er).b());return Fr}function ai(){}ai.prototype=new pp;
ai.prototype.constructor=ai;ai.prototype.b=function(){return this};ai.prototype.Vb=function(){return!0};ai.prototype.Ld=function(){return ci().ef};ai.prototype.$classData=p({oq:0},!1,"scala.PartialFunction$$anonfun$1",{oq:1,Gt:1,c:1,y:1,Da:1,g:1,f:1});function L(){this.w=null}L.prototype=new rq;L.prototype.constructor=L;d=L.prototype;d.ha=function(){return"Some"};d.fa=function(){return 1};d.n=function(a){return this===a?!0:Gd(a)?J(K(),this.w,a.w):!1};d.i=function(){return!1};
d.ga=function(a){switch(a){case 0:return this.w;default:throw(new W).h(""+a);}};d.Ja=function(){return this.w};d.j=function(){return S(T(),this)};d.l=function(a){this.w=a;return this};d.p=function(){return Q(this)};d.ka=function(){return Z(this)};function Gd(a){return!!(a&&a.$classData&&a.$classData.m.wl)}d.$classData=p({wl:0},!1,"scala.Some",{wl:1,kq:1,c:1,na:1,k:1,g:1,f:1});function bf(){this.w=null}bf.prototype=new uq;bf.prototype.constructor=bf;d=bf.prototype;d.ha=function(){return"Left"};
d.fa=function(){return 1};d.n=function(a){return this===a?!0:$n(a)?J(K(),this.w,a.w):!1};d.ga=function(a){switch(a){case 0:return this.w;default:throw(new W).h(""+a);}};d.j=function(){return S(T(),this)};d.l=function(a){this.w=a;return this};d.p=function(){return Q(this)};d.ka=function(){return Z(this)};function $n(a){return!!(a&&a.$classData&&a.$classData.m.yl)}d.$classData=p({yl:0},!1,"scala.util.Left",{yl:1,Yq:1,c:1,na:1,k:1,g:1,f:1});function Se(){this.w=null}Se.prototype=new uq;
Se.prototype.constructor=Se;d=Se.prototype;d.ha=function(){return"Right"};d.fa=function(){return 1};d.n=function(a){return this===a?!0:Yn(a)?J(K(),this.w,a.w):!1};d.ga=function(a){switch(a){case 0:return this.w;default:throw(new W).h(""+a);}};d.j=function(){return S(T(),this)};d.l=function(a){this.w=a;return this};d.p=function(){return Q(this)};d.ka=function(){return Z(this)};function Yn(a){return!!(a&&a.$classData&&a.$classData.m.zl)}
d.$classData=p({zl:0},!1,"scala.util.Right",{zl:1,Yq:1,c:1,na:1,k:1,g:1,f:1});function Gr(a,b){if(b&&b.$classData&&b.$classData.m.ub){var c;if(!(c=a===b)&&(c=a.r()===b.r()))try{c=a.mj(b)}catch(e){if(e&&e.$classData&&e.$classData.m.qp)c=!1;else throw e;}a=c}else a=!1;return a}function Hr(a,b,c){c=c.xg(a.ag());a.P(w(new x,function(a,b,c){return function(a){return c.Xa(b.e(a).xa())}}(a,b,c)));return c.Sa()}function Ir(a){return a.Be(a.rc()+"(",", ",")")}
function Jr(a){a=zb(ka(a.ag()));for(var b=-1+(a.length|0)|0;;)if(-1!==b&&36===(65535&(a.charCodeAt(b)|0)))b=-1+b|0;else break;if(-1===b||46===(65535&(a.charCodeAt(b)|0)))return"";for(var c="";;){for(var e=1+b|0;;)if(-1!==b&&57>=(65535&(a.charCodeAt(b)|0))&&48<=(65535&(a.charCodeAt(b)|0)))b=-1+b|0;else break;for(var f=b;;)if(-1!==b&&36!==(65535&(a.charCodeAt(b)|0))&&46!==(65535&(a.charCodeAt(b)|0)))b=-1+b|0;else break;var k=1+b|0;if(b===f&&e!==(a.length|0))return c;for(;;)if(-1!==b&&36===(65535&(a.charCodeAt(b)|
0)))b=-1+b|0;else break;var f=-1===b?!0:46===(65535&(a.charCodeAt(b)|0)),l;(l=f)||(l=65535&(a.charCodeAt(k)|0),l=!(90<l&&127>l||65>l));if(l){e=a.substring(k,e);k=c;if(null===k)throw(new yh).b();c=""===k?e:""+e+vo(46)+c;if(f)return c}}}function Kr(){this.Ma=null}Kr.prototype=new dp;Kr.prototype.constructor=Kr;function Lr(){}Lr.prototype=Kr.prototype;function Mr(){Vq.call(this)}Mr.prototype=new Wq;Mr.prototype.constructor=Mr;Mr.prototype.Fk=function(a){return Nr(a)};
Mr.prototype.$classData=p({Qr:0},!1,"scala.collection.immutable.HashMap$HashTrieMap$$anon$1",{Qr:1,Gs:1,tb:1,c:1,vb:1,u:1,t:1});function Or(){Vq.call(this)}Or.prototype=new Wq;Or.prototype.constructor=Or;Or.prototype.Fk=function(a){return a.nb};Or.prototype.$classData=p({Vr:0},!1,"scala.collection.immutable.HashSet$HashTrieSet$$anon$1",{Vr:1,Gs:1,tb:1,c:1,vb:1,u:1,t:1});function Pr(){}Pr.prototype=new Oq;Pr.prototype.constructor=Pr;Pr.prototype.b=function(){return this};Pr.prototype.Ig=function(){return Fq()};
Pr.prototype.$classData=p({rs:0},!1,"scala.collection.immutable.Set$",{rs:1,El:1,hf:1,gf:1,Va:1,c:1,Wa:1});var Qr=void 0;function Qo(){Qr||(Qr=(new Pr).b());return Qr}function Rr(){this.Zf=null}Rr.prototype=new hr;Rr.prototype.constructor=Rr;Rr.prototype.b=function(){gr.prototype.b.call(this);return this};Rr.prototype.Sa=function(){return Sr(this)};function Sr(a){return Tr(a.Zf.db.Db(),w(new x,function(){return function(a){return a.Db()}}(a)))}
function Ur(a){return!!(a&&a.$classData&&a.$classData.m.Ml)}Rr.prototype.$classData=p({Ml:0},!1,"scala.collection.immutable.Stream$StreamBuilder",{Ml:1,hv:1,c:1,hg:1,Pb:1,Nb:1,Lb:1});function $o(){this.Cf=this.Ae=this.vf=0;this.ok=this.mk=this.kk=this.ik=this.gk=this.Df=null}$o.prototype=new q;$o.prototype.constructor=$o;d=$o.prototype;d.A=function(){return this.kk};d.b=function(){this.Df=m(v(u),[32]);this.Cf=1;this.Ae=this.vf=0;return this};d.Ka=function(){return this.Cf};
d.gb=function(a){return Vr(this,a)};d.Nd=function(a){this.ok=a};d.za=function(){return this.Df};d.ba=function(a){this.ik=a};d.ma=function(){return this.mk};
function Vr(a,b){if(a.Ae>=a.Df.d.length){var c=32+a.vf|0,e=a.vf^c;if(1024>e)1===a.Ka()&&(a.C(m(v(u),[32])),a.o().d[0]=a.za(),a.bc(1+a.Ka()|0)),a.Z(m(v(u),[32])),a.o().d[31&(c>>>5|0)]=a.za();else if(32768>e)2===a.Ka()&&(a.ba(m(v(u),[32])),a.q().d[0]=a.o(),a.bc(1+a.Ka()|0)),a.Z(m(v(u),[32])),a.C(m(v(u),[32])),a.o().d[31&(c>>>5|0)]=a.za(),a.q().d[31&(c>>>10|0)]=a.o();else if(1048576>e)3===a.Ka()&&(a.Aa(m(v(u),[32])),a.A().d[0]=a.q(),a.bc(1+a.Ka()|0)),a.Z(m(v(u),[32])),a.C(m(v(u),[32])),a.ba(m(v(u),[32])),
a.o().d[31&(c>>>5|0)]=a.za(),a.q().d[31&(c>>>10|0)]=a.o(),a.A().d[31&(c>>>15|0)]=a.q();else if(33554432>e)4===a.Ka()&&(a.mb(m(v(u),[32])),a.ma().d[0]=a.A(),a.bc(1+a.Ka()|0)),a.Z(m(v(u),[32])),a.C(m(v(u),[32])),a.ba(m(v(u),[32])),a.Aa(m(v(u),[32])),a.o().d[31&(c>>>5|0)]=a.za(),a.q().d[31&(c>>>10|0)]=a.o(),a.A().d[31&(c>>>15|0)]=a.q(),a.ma().d[31&(c>>>20|0)]=a.A();else if(1073741824>e)5===a.Ka()&&(a.Nd(m(v(u),[32])),a.pb().d[0]=a.ma(),a.bc(1+a.Ka()|0)),a.Z(m(v(u),[32])),a.C(m(v(u),[32])),a.ba(m(v(u),
[32])),a.Aa(m(v(u),[32])),a.mb(m(v(u),[32])),a.o().d[31&(c>>>5|0)]=a.za(),a.q().d[31&(c>>>10|0)]=a.o(),a.A().d[31&(c>>>15|0)]=a.q(),a.ma().d[31&(c>>>20|0)]=a.A(),a.pb().d[31&(c>>>25|0)]=a.ma();else throw(new Cb).b();a.vf=c;a.Ae=0}a.Df.d[a.Ae]=b;a.Ae=1+a.Ae|0;return a}d.Sa=function(){var a;a=this.vf+this.Ae|0;if(0===a)a=yi().sg;else{var b=(new Wr).Sd(0,a,0);Jb(b,this,this.Cf);1<this.Cf&&Gb(b,0,-1+a|0);a=b}return a};d.Zb=function(a,b){qn(this,a,b)};d.C=function(a){this.gk=a};
d.mb=function(a){this.mk=a};d.o=function(){return this.gk};d.pb=function(){return this.ok};d.hb=function(a){return Vr(this,a)};d.Qb=function(){};d.bc=function(a){this.Cf=a};d.q=function(){return this.ik};d.Z=function(a){this.Df=a};d.Xa=function(a){return Dk(this,a)};d.Aa=function(a){this.kk=a};d.$classData=p({Js:0},!1,"scala.collection.immutable.VectorBuilder",{Js:1,c:1,hg:1,Pb:1,Nb:1,Lb:1,Pl:1});
function Xr(){this.fi=this.Pa=this.Md=this.ei=0;this.pf=!1;this.Zh=0;this.pk=this.nk=this.lk=this.jk=this.hk=this.$h=null}Xr.prototype=new Qp;Xr.prototype.constructor=Xr;d=Xr.prototype;
d.s=function(){if(!this.pf)throw(new V).h("reached iterator end");var a=this.$h.d[this.Pa];this.Pa=1+this.Pa|0;if(this.Pa===this.fi)if((this.Md+this.Pa|0)<this.ei){var b=32+this.Md|0,c=this.Md^b;if(1024>c)this.Z(this.o().d[31&(b>>>5|0)]);else if(32768>c)this.C(this.q().d[31&(b>>>10|0)]),this.Z(this.o().d[0]);else if(1048576>c)this.ba(this.A().d[31&(b>>>15|0)]),this.C(this.q().d[0]),this.Z(this.o().d[0]);else if(33554432>c)this.Aa(this.ma().d[31&(b>>>20|0)]),this.ba(this.A().d[0]),this.C(this.q().d[0]),
this.Z(this.o().d[0]);else if(1073741824>c)this.mb(this.pb().d[31&(b>>>25|0)]),this.Aa(this.ma().d[0]),this.ba(this.A().d[0]),this.C(this.q().d[0]),this.Z(this.o().d[0]);else throw(new Cb).b();this.Md=b;b=this.ei-this.Md|0;this.fi=32>b?b:32;this.Pa=0}else this.pf=!1;return a};d.A=function(){return this.lk};d.Ka=function(){return this.Zh};d.Nd=function(a){this.pk=a};d.Ed=function(a,b){this.ei=b;this.Md=-32&a;this.Pa=31&a;a=b-this.Md|0;this.fi=32>a?a:32;this.pf=(this.Md+this.Pa|0)<b;return this};
d.za=function(){return this.$h};d.ba=function(a){this.jk=a};d.ma=function(){return this.nk};d.C=function(a){this.hk=a};d.x=function(){return this.pf};d.mb=function(a){this.nk=a};d.o=function(){return this.hk};d.pb=function(){return this.pk};d.bc=function(a){this.Zh=a};d.q=function(){return this.jk};d.Z=function(a){this.$h=a};d.Aa=function(a){this.lk=a};d.$classData=p({Ks:0},!1,"scala.collection.immutable.VectorIterator",{Ks:1,tb:1,c:1,vb:1,u:1,t:1,Pl:1});function Yr(){}Yr.prototype=new Qq;
Yr.prototype.constructor=Yr;Yr.prototype.b=function(){return this};Yr.prototype.Hc=function(){return(new Zr).b()};Yr.prototype.$classData=p({qt:0},!1,"scala.collection.mutable.Set$",{qt:1,Gl:1,hf:1,gf:1,Va:1,c:1,Wa:1});var $r=void 0;function as(){this.Sf=this.Wb=null}as.prototype=new q;as.prototype.constructor=as;d=as.prototype;d.ha=function(){return"RedirectToPage"};d.fa=function(){return 2};
d.n=function(a){return this===a?!0:a&&a.$classData&&a.$classData.m.Ch?J(K(),this.Wb,a.Wb)?this.Sf===a.Sf:!1:!1};d.ga=function(a){switch(a){case 0:return this.Wb;case 1:return this.Sf;default:throw(new W).h(""+a);}};d.j=function(){return S(T(),this)};d.p=function(){return Q(this)};function sh(a,b){var c=new as;c.Wb=a;c.Sf=b;return c}d.ka=function(){return Z(this)};d.$classData=p({Ch:0},!1,"japgolly.scalajs.react.extra.router.RedirectToPage",{Ch:1,c:1,An:1,yn:1,na:1,k:1,g:1,f:1});function bs(){}
bs.prototype=new iq;bs.prototype.constructor=bs;function cs(){}cs.prototype=bs.prototype;bs.prototype.ep=function(){hq.prototype.dp.call(this);return this};function Dp(){}Dp.prototype=new mq;Dp.prototype.constructor=Dp;Dp.prototype.b=function(){return this};Dp.prototype.r=function(){return 0};Dp.prototype.Hb=function(){var a=Th();0===(8&a.Y)<<24>>24&&0===(8&a.Y)<<24>>24&&(a.xj=(new Em).b(),a.Y=(8|a.Y)<<24>>24);return a.xj};
Dp.prototype.$classData=p({Mp:0},!1,"java.util.Collections$$anon$11",{Mp:1,zi:1,yi:1,c:1,cf:1,Of:1,Pf:1,f:1});function ds(){this.Td=null}ds.prototype=new Cm;ds.prototype.constructor=ds;d=ds.prototype;d.b=function(){ds.prototype.ip.call(this,(new es).b());return this};d.ch=function(a,b){a=this.Td.pl((new pq).l(a),b);return a.i()?null:a.Ja()};d.ip=function(a){this.Td=a;return this};d.Ff=function(a){a=this.Td.Gb((new pq).l(a));return a.i()?null:a.Ja()};d.Cg=function(a){return this.Td.E((new pq).l(a))};
d.r=function(){return this.Td.r()};d.dd=function(){return(new fs).pi(this)};d.$classData=p({Vp:0},!1,"java.util.HashMap",{Vp:1,Ip:1,c:1,Bi:1,g:1,f:1,Oc:1,xc:1});function fs(){this.og=null}fs.prototype=new mq;fs.prototype.constructor=fs;fs.prototype.r=function(){return this.og.Td.r()};fs.prototype.pi=function(a){if(null===a)throw R(P(),null);this.og=a;return this};fs.prototype.Hb=function(){var a=new Go;if(null===this)throw R(P(),null);a.pa=this;Fm.prototype.pi.call(a,this.og);return a};
fs.prototype.$classData=p({Wp:0},!1,"java.util.HashMap$EntrySet",{Wp:1,zi:1,yi:1,c:1,cf:1,Of:1,Pf:1,xu:1});function gs(){this.Ma=null}gs.prototype=new Lr;gs.prototype.constructor=gs;gs.prototype.b=function(){en.prototype.b.call(this);return this};gs.prototype.da=function(){hs();return(new Yd).b()};gs.prototype.$classData=p({ur:0},!1,"scala.collection.Seq$",{ur:1,kd:1,jd:1,Mb:1,Va:1,c:1,Ob:1,Wa:1});var is=void 0;function mi(){is||(is=(new gs).b());return is}function js(){this.Ma=null}
js.prototype=new Lr;js.prototype.constructor=js;function ks(){}ks.prototype=js.prototype;function ls(){}ls.prototype=new fp;ls.prototype.constructor=ls;ls.prototype.b=function(){ms=this;nn(new mn,D(function(){return function(a){return a}}(this)));return this};function ns(a,b,c,e,f,k,l){var r=31&(b>>>k|0),t=31&(e>>>k|0);if(r!==t)return a=1<<r|1<<t,b=m(v(os),[2]),r<t?(b.d[0]=c,b.d[1]=f):(b.d[0]=f,b.d[1]=c),ps(new qs,a,b,l);t=m(v(os),[1]);r=1<<r;t.d[0]=ns(a,b,c,e,f,5+k|0,l);return ps(new qs,r,t,l)}
ls.prototype.wk=function(){return rs()};ls.prototype.$classData=p({Lr:0},!1,"scala.collection.immutable.HashMap$",{Lr:1,Hr:1,Ir:1,Fr:1,c:1,bv:1,g:1,f:1});var ms=void 0;function ss(){ms||(ms=(new ls).b());return ms}function ts(){this.Ma=null}ts.prototype=new Lr;ts.prototype.constructor=ts;ts.prototype.b=function(){en.prototype.b.call(this);return this};ts.prototype.da=function(){return(new Yd).b()};
ts.prototype.$classData=p({qs:0},!1,"scala.collection.immutable.Seq$",{qs:1,kd:1,jd:1,Mb:1,Va:1,c:1,Ob:1,Wa:1});var us=void 0;function hs(){us||(us=(new ts).b());return us}function vs(){this.Ma=null}vs.prototype=new Lr;vs.prototype.constructor=vs;vs.prototype.b=function(){en.prototype.b.call(this);return this};vs.prototype.da=function(){return(new er).b()};vs.prototype.$classData=p({ft:0},!1,"scala.collection.mutable.IndexedSeq$",{ft:1,kd:1,jd:1,Mb:1,Va:1,c:1,Ob:1,Wa:1});var ws=void 0;
function xs(){this.Ma=null}xs.prototype=new Lr;xs.prototype.constructor=xs;xs.prototype.b=function(){en.prototype.b.call(this);return this};xs.prototype.da=function(){return(new H).b()};xs.prototype.$classData=p({vt:0},!1,"scala.scalajs.js.WrappedArray$",{vt:1,kd:1,jd:1,Mb:1,Va:1,c:1,Ob:1,Wa:1});var ys=void 0;function zs(){this.Vt=this.Ut=this.Tt=this.St=this.Wt=this.Rt=null}zs.prototype=new Mg;zs.prototype.constructor=zs;function As(){}As.prototype=zs.prototype;function Bs(){}Bs.prototype=new cs;
Bs.prototype.constructor=Bs;function Hh(){var a=new Bs;(new kq).b();bs.prototype.ep.call(a)}Bs.prototype.$classData=p({xp:0},!1,"java.lang.JSConsoleBasedPrintStream",{xp:1,pu:1,ou:1,To:1,c:1,Ro:1,lp:1,So:1,Rk:1});function Cs(){this.kb=null}Cs.prototype=new q;Cs.prototype.constructor=Cs;function Ds(){}Ds.prototype=Cs.prototype;Cs.prototype.n=function(a){return this===a};Cs.prototype.j=function(){return this.kb};Cs.prototype.p=function(){return Ea(this)};function Es(){}Es.prototype=new q;
Es.prototype.constructor=Es;function Fs(){}Fs.prototype=Es.prototype;function Gs(){this.Lh=this.Ma=null}Gs.prototype=new ks;Gs.prototype.constructor=Gs;Gs.prototype.b=function(){en.prototype.b.call(this);Hs=this;this.Lh=(new Yo).b();return this};Gs.prototype.da=function(){Zo();yi();return(new $o).b()};Gs.prototype.$classData=p({jr:0},!1,"scala.collection.IndexedSeq$",{jr:1,Fl:1,kd:1,jd:1,Mb:1,Va:1,c:1,Ob:1,Wa:1});var Hs=void 0;function ni(){Hs||(Hs=(new Gs).b());return Hs}
function O(){this.Ye=this.di=0;this.pa=null}O.prototype=new Qp;O.prototype.constructor=O;O.prototype.s=function(){this.Ye>=this.di&&oi().Ba.s();var a=this.pa.Za(this.Ye);this.Ye=1+this.Ye|0;return a};function eg(a,b,c){a.di=c;if(null===b)throw R(P(),null);a.pa=b;a.Ye=0;return a}O.prototype.x=function(){return this.Ye<this.di};O.prototype.$classData=p({lr:0},!1,"scala.collection.IndexedSeqLike$Elements",{lr:1,tb:1,c:1,vb:1,u:1,t:1,Pu:1,g:1,f:1});function Is(){}Is.prototype=new Oq;
Is.prototype.constructor=Is;Is.prototype.b=function(){return this};function Js(a,b,c,e,f,k){var l=31&(b>>>k|0),r=31&(e>>>k|0);if(l!==r)return a=1<<l|1<<r,b=m(v(Ks),[2]),l<r?(b.d[0]=c,b.d[1]=f):(b.d[0]=f,b.d[1]=c),Ls(new Ms,a,b,c.r()+f.r()|0);r=m(v(Ks),[1]);l=1<<l;c=Js(a,b,c,e,f,5+k|0);r.d[0]=c;return Ls(new Ms,l,r,c.Ie)}Is.prototype.Ig=function(){return Ns()};Is.prototype.$classData=p({Sr:0},!1,"scala.collection.immutable.HashSet$",{Sr:1,El:1,hf:1,gf:1,Va:1,c:1,Wa:1,g:1,f:1});var Os=void 0;
function Ps(){Os||(Os=(new Is).b());return Os}function Qs(){this.Ma=null}Qs.prototype=new ks;Qs.prototype.constructor=Qs;Qs.prototype.b=function(){en.prototype.b.call(this);return this};Qs.prototype.da=function(){yi();return(new $o).b()};Qs.prototype.$classData=p({Yr:0},!1,"scala.collection.immutable.IndexedSeq$",{Yr:1,Fl:1,kd:1,jd:1,Mb:1,Va:1,c:1,Ob:1,Wa:1});var Rs=void 0;function Zo(){Rs||(Rs=(new Qs).b());return Rs}function Ss(){}Ss.prototype=new Oq;Ss.prototype.constructor=Ss;Ss.prototype.b=function(){return this};
Ss.prototype.Ig=function(){return Ts()};Ss.prototype.$classData=p({fs:0},!1,"scala.collection.immutable.ListSet$",{fs:1,El:1,hf:1,gf:1,Va:1,c:1,Wa:1,g:1,f:1});var Us=void 0;function Vs(){}Vs.prototype=new Qq;Vs.prototype.constructor=Vs;Vs.prototype.b=function(){return this};Vs.prototype.Hc=function(){return(new Zr).b()};Vs.prototype.$classData=p({at:0},!1,"scala.collection.mutable.HashSet$",{at:1,Gl:1,hf:1,gf:1,Va:1,c:1,Wa:1,g:1,f:1});var Ws=void 0;function Xs(){}Xs.prototype=new Qq;
Xs.prototype.constructor=Xs;Xs.prototype.b=function(){return this};Xs.prototype.Hc=function(){return(new Ys).b()};Xs.prototype.$classData=p({it:0},!1,"scala.collection.mutable.LinkedHashSet$",{it:1,Gl:1,hf:1,gf:1,Va:1,c:1,Wa:1,g:1,f:1});var Zs=void 0;function Al(){this.Od=this.sb=null}Al.prototype=new yp;Al.prototype.constructor=Al;d=Al.prototype;d.ha=function(){return"JavaScriptException"};d.fa=function(){return 1};d.Kg=function(){this.stackdata=this.Od;return this};
d.n=function(a){return this===a?!0:zl(a)?J(K(),this.Od,a.Od):!1};d.ga=function(a){switch(a){case 0:return this.Od;default:throw(new W).h(""+a);}};d.ii=function(){return ja(this.Od)};d.l=function(a){this.Od=a;U.prototype.yb.call(this,null,0,0,!0);return this};d.p=function(){return Q(this)};d.ka=function(){return Z(this)};function zl(a){return!!(a&&a.$classData&&a.$classData.m.am)}d.$classData=p({am:0},!1,"scala.scalajs.js.JavaScriptException",{am:1,zc:1,Kc:1,Ib:1,c:1,f:1,na:1,k:1,g:1});
function Pd(){this.Ti=this.ol=this.v=null}Pd.prototype=new q;Pd.prototype.constructor=Pd;Pd.prototype.j=function(){return pd(Fc(),"ComponentDidUpdate(props: "+this.ol+" \u2192 "+kb(this).Bc()+", state: "+this.Ti+" \u2192 "+kb(this).Rb()+")")};Pd.prototype.If=function(a,b,c){this.v=a;this.ol=b;this.Ti=c;return this};Pd.prototype.ab=function(){return this.v};
Pd.prototype.$classData=p({kn:0},!1,"japgolly.scalajs.react.component.builder.Lifecycle$ComponentDidUpdate",{kn:1,c:1,qf:1,Kd:1,rd:1,qd:1,pd:1,nd:1,od:1,qg:1});function td(){this.v=null}td.prototype=new q;td.prototype.constructor=td;d=td.prototype;d.n=function(a){return sd().re(this.v,a)};d.j=function(){return sd().Je(this.v)};d.Ca=function(a){this.v=a;return this};d.p=function(){return za(this.v)};d.ab=function(){return this.v};
d.$classData=p({Ej:0},!1,"japgolly.scalajs.react.component.builder.Lifecycle$ComponentWillMount",{Ej:1,c:1,rg:1,qf:1,Kd:1,rd:1,qd:1,pd:1,nd:1,od:1});function $s(){zs.call(this)}$s.prototype=new As;$s.prototype.constructor=$s;$s.prototype.b=function(){Lg.prototype.b.call(this);wb(this);ah(this);return this};$s.prototype.$classData=p({Eo:0},!1,"japgolly.scalajs.react.vdom.PackageBase$",{Eo:1,Do:1,so:1,c:1,wo:1,xo:1,yo:1,zo:1,Bo:1,Ao:1});var at=void 0;function up(){at||(at=(new $s).b())}
function bt(){zs.call(this)}bt.prototype=new As;bt.prototype.constructor=bt;bt.prototype.b=function(){Lg.prototype.b.call(this);wb(this);ah(this);ct=this;rm||(rm=(new qm).b());tp||(tp=(new sp).b());return this};bt.prototype.$classData=p({Qo:0},!1,"japgolly.scalajs.react.vdom.html_$less$up$",{Qo:1,Do:1,so:1,c:1,wo:1,xo:1,yo:1,zo:1,Bo:1,Ao:1});var ct=void 0;function Rb(){ct||(ct=(new bt).b())}function Gp(){this.sa=null}Gp.prototype=new oq;Gp.prototype.constructor=Gp;function dt(){}dt.prototype=Gp.prototype;
Gp.prototype.n=function(a){return this.sa.n(a)};Gp.prototype.p=function(){return this.sa.p()};Gp.prototype.Og=function(a){nq.prototype.oi.call(this,a);return this};Gp.prototype.$classData=p({Uk:0},!1,"java.util.Collections$UnmodifiableSet",{Uk:1,Rp:1,c:1,Tp:1,cf:1,Of:1,f:1,Up:1,Vk:1,Pf:1});function jj(){this.kb=null}jj.prototype=new Ds;jj.prototype.constructor=jj;jj.prototype.b=function(){this.kb="Boolean";return this};
jj.prototype.$classData=p({Jq:0},!1,"scala.reflect.ManifestFactory$BooleanManifest$",{Jq:1,be:1,c:1,ic:1,hc:1,gc:1,Xb:1,g:1,f:1,k:1});var ij=void 0;function Wi(){this.kb=null}Wi.prototype=new Ds;Wi.prototype.constructor=Wi;Wi.prototype.b=function(){this.kb="Byte";return this};Wi.prototype.$classData=p({Kq:0},!1,"scala.reflect.ManifestFactory$ByteManifest$",{Kq:1,be:1,c:1,ic:1,hc:1,gc:1,Xb:1,g:1,f:1,k:1});var Vi=void 0;function $i(){this.kb=null}$i.prototype=new Ds;$i.prototype.constructor=$i;
$i.prototype.b=function(){this.kb="Char";return this};$i.prototype.$classData=p({Lq:0},!1,"scala.reflect.ManifestFactory$CharManifest$",{Lq:1,be:1,c:1,ic:1,hc:1,gc:1,Xb:1,g:1,f:1,k:1});var Zi=void 0;function hj(){this.kb=null}hj.prototype=new Ds;hj.prototype.constructor=hj;hj.prototype.b=function(){this.kb="Double";return this};hj.prototype.$classData=p({Mq:0},!1,"scala.reflect.ManifestFactory$DoubleManifest$",{Mq:1,be:1,c:1,ic:1,hc:1,gc:1,Xb:1,g:1,f:1,k:1});var gj=void 0;
function fj(){this.kb=null}fj.prototype=new Ds;fj.prototype.constructor=fj;fj.prototype.b=function(){this.kb="Float";return this};fj.prototype.$classData=p({Nq:0},!1,"scala.reflect.ManifestFactory$FloatManifest$",{Nq:1,be:1,c:1,ic:1,hc:1,gc:1,Xb:1,g:1,f:1,k:1});var ej=void 0;function bj(){this.kb=null}bj.prototype=new Ds;bj.prototype.constructor=bj;bj.prototype.b=function(){this.kb="Int";return this};
bj.prototype.$classData=p({Oq:0},!1,"scala.reflect.ManifestFactory$IntManifest$",{Oq:1,be:1,c:1,ic:1,hc:1,gc:1,Xb:1,g:1,f:1,k:1});var aj=void 0;function dj(){this.kb=null}dj.prototype=new Ds;dj.prototype.constructor=dj;dj.prototype.b=function(){this.kb="Long";return this};dj.prototype.$classData=p({Pq:0},!1,"scala.reflect.ManifestFactory$LongManifest$",{Pq:1,be:1,c:1,ic:1,hc:1,gc:1,Xb:1,g:1,f:1,k:1});var cj=void 0;function et(){this.Zc=null}et.prototype=new Fs;et.prototype.constructor=et;
function ft(){}ft.prototype=et.prototype;et.prototype.n=function(a){return this===a};et.prototype.j=function(){return this.Zc};et.prototype.p=function(){return Ea(this)};function Yi(){this.kb=null}Yi.prototype=new Ds;Yi.prototype.constructor=Yi;Yi.prototype.b=function(){this.kb="Short";return this};Yi.prototype.$classData=p({Tq:0},!1,"scala.reflect.ManifestFactory$ShortManifest$",{Tq:1,be:1,c:1,ic:1,hc:1,gc:1,Xb:1,g:1,f:1,k:1});var Xi=void 0;function lj(){this.kb=null}lj.prototype=new Ds;
lj.prototype.constructor=lj;lj.prototype.b=function(){this.kb="Unit";return this};lj.prototype.$classData=p({Uq:0},!1,"scala.reflect.ManifestFactory$UnitManifest$",{Uq:1,be:1,c:1,ic:1,hc:1,gc:1,Xb:1,g:1,f:1,k:1});var kj=void 0;function gt(a,b){a=a.z();for(b=b.z();a.x()&&b.x();)if(!J(K(),a.s(),b.s()))return!1;return!a.x()&&!b.x()}function tk(){this.pa=this.mf=null}tk.prototype=new Qp;tk.prototype.constructor=tk;d=tk.prototype;d.s=function(){return this.mf.s()};d.ha=function(){return"JIteratorWrapper"};
d.fa=function(){return 1};d.n=function(a){return this===a?!0:a&&a.$classData&&a.$classData.m.Bl&&a.pa===this.pa?this.mf===a.mf:!1};d.ga=function(a){switch(a){case 0:return this.mf;default:throw(new W).h(""+a);}};function sk(a,b,c){a.mf=c;if(null===b)throw R(P(),null);a.pa=b;return a}d.x=function(){return this.mf.x()};d.p=function(){return Q(this)};d.ka=function(){return Z(this)};
d.$classData=p({Bl:0},!1,"scala.collection.convert.Wrappers$JIteratorWrapper",{Bl:1,tb:1,c:1,vb:1,u:1,t:1,na:1,k:1,g:1,f:1});function ht(){this.Ma=null}ht.prototype=new Lr;ht.prototype.constructor=ht;ht.prototype.b=function(){en.prototype.b.call(this);it=this;(new pn).b();return this};ht.prototype.Hc=function(){return B()};ht.prototype.da=function(){return(new Yd).b()};ht.prototype.$classData=p({$r:0},!1,"scala.collection.immutable.List$",{$r:1,kd:1,jd:1,Mb:1,Va:1,c:1,Ob:1,Wa:1,g:1,f:1});var it=void 0;
function Xd(){it||(it=(new ht).b());return it}function jt(){this.Ma=null}jt.prototype=new Lr;jt.prototype.constructor=jt;jt.prototype.b=function(){en.prototype.b.call(this);return this};jt.prototype.Hc=function(){return bn()};jt.prototype.da=function(){return(new Rr).b()};jt.prototype.$classData=p({ys:0},!1,"scala.collection.immutable.Stream$",{ys:1,kd:1,jd:1,Mb:1,Va:1,c:1,Ob:1,Wa:1,g:1,f:1});var kt=void 0;function vi(){kt||(kt=(new jt).b());return kt}function lt(){this.Ma=null}lt.prototype=new Lr;
lt.prototype.constructor=lt;lt.prototype.b=function(){en.prototype.b.call(this);return this};lt.prototype.da=function(){return(new er).b()};lt.prototype.$classData=p({Ps:0},!1,"scala.collection.mutable.ArrayBuffer$",{Ps:1,kd:1,jd:1,Mb:1,Va:1,c:1,Ob:1,Wa:1,g:1,f:1});var mt=void 0;function nt(){this.Ma=null}nt.prototype=new Lr;nt.prototype.constructor=nt;nt.prototype.b=function(){en.prototype.b.call(this);return this};nt.prototype.da=function(){return aq(new $p,(new Yd).b())};
nt.prototype.$classData=p({lt:0},!1,"scala.collection.mutable.ListBuffer$",{lt:1,kd:1,jd:1,Mb:1,Va:1,c:1,Ob:1,Wa:1,g:1,f:1});var ot=void 0;function pt(){this.Ic=this.Qf=this.Li=this.ed=null}pt.prototype=new q;pt.prototype.constructor=pt;function qt(){}d=qt.prototype=pt.prototype;d.nm=function(a){return this.Rf(this.Li,this.Qf,(new Vf).Ng(this.Ic.ed,a.rh))};d.Bc=function(){return this.Ic.sf(z(new A,function(a){return function(){return a.Li.e(a.ed.Bc())}}(this)))};
d.Tf=function(a,b){return this.Ic.sf(z(new A,function(a,b,f){return function(){a.ed.Tf(a.Qf.Ac.e(b),f)}}(this,a,b)))};d.kf=function(a,b){return this.Ic.sf(z(new A,function(a,b,f){return function(){a.ed.Tf(a.Qf.hj.e(b),f)}}(this,a,b)))};d.Jk=function(a,b,c,e){this.ed=a;this.Li=b;this.Qf=c;this.Ic=e;return this};d.Rb=function(){return this.Ic.sf(z(new A,function(a){return function(){return a.Qf.hi.e(a.ed.Rb())}}(this)))};function rt(){this.Ic=null}rt.prototype=new q;rt.prototype.constructor=rt;
function st(){}st.prototype=rt.prototype;rt.prototype.nm=function(a){var b=pb().Jc,c=mg();return this.Rf(b,c.ue,(new Vf).Ng(this.Ic.ed,a.rh))};rt.prototype.Kk=function(a){this.Ic=a;return this};function tt(){this.yk=this.v=null}tt.prototype=new q;tt.prototype.constructor=tt;tt.prototype.j=function(){return pd(Fc(),"ComponentDidCatch("+this.yk+")")};function Od(a,b){var c=new tt;c.v=a;c.yk=b;return c}tt.prototype.ab=function(){return this.v};
tt.prototype.$classData=p({hn:0},!1,"japgolly.scalajs.react.component.builder.Lifecycle$ComponentDidCatch",{hn:1,c:1,rg:1,qf:1,Kd:1,rd:1,qd:1,pd:1,nd:1,od:1,qg:1});function od(){this.v=null}od.prototype=new q;od.prototype.constructor=od;d=od.prototype;d.n=function(a){return nd().re(this.v,a)};d.j=function(){return nd().Je(this.v)};d.Ca=function(a){this.v=a;return this};d.kf=function(a,b){return(new C).G(this.ab().mountedPure.kf(a,b).H)};d.p=function(){return za(this.v)};d.ab=function(){return this.v};
d.$classData=p({Dj:0},!1,"japgolly.scalajs.react.component.builder.Lifecycle$ComponentDidMount",{Dj:1,c:1,rg:1,qf:1,Kd:1,rd:1,qd:1,pd:1,nd:1,od:1,qg:1});function ut(){this.Wd=this.v=null}ut.prototype=new q;ut.prototype.constructor=ut;function Rd(a,b){var c=new ut;c.v=a;c.Wd=b;return c}ut.prototype.j=function(){return pd(Fc(),"ComponentWillReceiveProps(props: "+kb(this).Bc()+" \u2192 "+this.Wd+", state: "+kb(this).Rb()+")")};ut.prototype.ab=function(){return this.v};
ut.prototype.$classData=p({mn:0},!1,"japgolly.scalajs.react.component.builder.Lifecycle$ComponentWillReceiveProps",{mn:1,c:1,rg:1,qf:1,Kd:1,rd:1,qd:1,pd:1,nd:1,od:1,qg:1});function dd(){this.v=null}dd.prototype=new q;dd.prototype.constructor=dd;d=dd.prototype;d.n=function(a){return Ad().re(this.v,a)};d.j=function(){return Ad().Je(this.v)};d.Ca=function(a){this.v=a;return this};d.p=function(){return za(this.v)};d.ab=function(){return this.v};
d.$classData=p({Gj:0},!1,"japgolly.scalajs.react.component.builder.Lifecycle$RenderScope",{Gj:1,c:1,rg:1,qf:1,Kd:1,rd:1,qd:1,pd:1,nd:1,od:1,qg:1});function Cp(){this.sa=null}Cp.prototype=new dt;Cp.prototype.constructor=Cp;Cp.prototype.Og=function(a){Gp.prototype.Og.call(this,a);return this};Cp.prototype.$classData=p({Qp:0},!1,"java.util.Collections$ImmutableSet",{Qp:1,Uk:1,Rp:1,c:1,Tp:1,cf:1,Of:1,f:1,Up:1,Vk:1,Pf:1});function vt(){this.ti=null}vt.prototype=new mq;vt.prototype.constructor=vt;
function wt(){}d=wt.prototype=vt.prototype;d.b=function(){this.ti=(new Zr).b();return this};d.ck=function(a){var b=Dj();a=a.Hb();b=Gj(rk(b,a));for(a=!0;a&&b.x();)a=b.s(),a=this.E(a);return a};d.r=function(){return this.Mf().r()};d.E=function(a){return this.Mf().E((new pq).l(a))};d.Mf=function(){return this.ti};d.bd=function(a){return this.Mf().bd((new pq).l(a))};d.Hb=function(){var a=new Jm;if(null===this)throw R(P(),null);a.fb=this;a.vi=this.Mf().Wh().z();a.Ei=I();return a};
d.$classData=p({Wk:0},!1,"java.util.HashSet",{Wk:1,zi:1,yi:1,c:1,cf:1,Of:1,Pf:1,Oc:1,xc:1,g:1,f:1});function nj(){this.Zc=null}nj.prototype=new ft;nj.prototype.constructor=nj;nj.prototype.b=function(){this.Zc="Any";I();B();n(u);return this};nj.prototype.$classData=p({Hq:0},!1,"scala.reflect.ManifestFactory$AnyManifest$",{Hq:1,ih:1,hh:1,c:1,ic:1,hc:1,gc:1,Xb:1,g:1,f:1,k:1});var mj=void 0;function rj(){this.Zc=null}rj.prototype=new ft;rj.prototype.constructor=rj;
rj.prototype.b=function(){this.Zc="AnyVal";I();B();n(u);return this};rj.prototype.$classData=p({Iq:0},!1,"scala.reflect.ManifestFactory$AnyValManifest$",{Iq:1,ih:1,hh:1,c:1,ic:1,hc:1,gc:1,Xb:1,g:1,f:1,k:1});var qj=void 0;function tj(){this.Zc=null}tj.prototype=new ft;tj.prototype.constructor=tj;tj.prototype.b=function(){this.Zc="Nothing";I();B();n(rp);return this};tj.prototype.$classData=p({Qq:0},!1,"scala.reflect.ManifestFactory$NothingManifest$",{Qq:1,ih:1,hh:1,c:1,ic:1,hc:1,gc:1,Xb:1,g:1,f:1,k:1});
var sj=void 0;function vj(){this.Zc=null}vj.prototype=new ft;vj.prototype.constructor=vj;vj.prototype.b=function(){this.Zc="Null";I();B();n(Jl);return this};vj.prototype.$classData=p({Rq:0},!1,"scala.reflect.ManifestFactory$NullManifest$",{Rq:1,ih:1,hh:1,c:1,ic:1,hc:1,gc:1,Xb:1,g:1,f:1,k:1});var uj=void 0;function pj(){this.Zc=null}pj.prototype=new ft;pj.prototype.constructor=pj;pj.prototype.b=function(){this.Zc="Object";I();B();n(u);return this};
pj.prototype.$classData=p({Sq:0},!1,"scala.reflect.ManifestFactory$ObjectManifest$",{Sq:1,ih:1,hh:1,c:1,ic:1,hc:1,gc:1,Xb:1,g:1,f:1,k:1});var oj=void 0;function zr(a){return!!(a&&a.$classData&&a.$classData.m.Pc)}function xt(){this.sg=this.Ma=null}xt.prototype=new ks;xt.prototype.constructor=xt;xt.prototype.b=function(){en.prototype.b.call(this);yt=this;this.sg=(new Wr).Sd(0,0,0);return this};xt.prototype.Hc=function(){return this.sg};xt.prototype.da=function(){return(new $o).b()};
xt.prototype.$classData=p({Is:0},!1,"scala.collection.immutable.Vector$",{Is:1,Fl:1,kd:1,jd:1,Mb:1,Va:1,c:1,Ob:1,Wa:1,g:1,f:1});var yt=void 0;function yi(){yt||(yt=(new xt).b());return yt}function zt(){this.Mk=this.ti=null}zt.prototype=new wt;zt.prototype.constructor=zt;zt.prototype.b=function(){vt.prototype.b.call(this);this.Mk=(new Ys).b();return this};zt.prototype.oi=function(a){zt.prototype.b.call(this);a=a.Hb();for(var b=!1;a.x();)b=this.bd(a.s())||b;return this};zt.prototype.Mf=function(){return this.Mk};
zt.prototype.$classData=p({$p:0},!1,"java.util.LinkedHashSet",{$p:1,Wk:1,zi:1,yi:1,c:1,cf:1,Of:1,Pf:1,Oc:1,xc:1,g:1,f:1});function At(){}At.prototype=new q;At.prototype.constructor=At;function Bt(){}d=Bt.prototype=At.prototype;d.Be=function(a,b,c){return dk(this,a,b,c)};d.dc=function(a,b){return fk(this,a,b)};d.Id=function(){return-1};d.le=function(a,b,c,e){return gk(this,a,b,c,e)};d.Le=function(a,b){return this.dc(a,b)};d.ag=function(){return this};d.da=function(){return this.Na().da()};d.rc=function(){return Jr(this)};
function Jd(){this.Jb=this.Ic=null}Jd.prototype=new st;Jd.prototype.constructor=Jd;d=Jd.prototype;d.Ji=function(a,b){this.Jb.setState(function(a){return function(b){return a.e(b)}}(a),hc(y(),b))};d.Rf=function(a,b,c){Nc();return Ct(this,a,b,c)};d.Bc=function(){return this.Jb.props};d.Tf=function(a,b){this.Ji(a,b)};d.kf=function(a,b){this.Jb.setState(a,hc(y(),b))};d.Ca=function(a){rt.prototype.Kk.call(this,Kd().gi);this.Jb=a;return this};d.Rb=function(){return this.Jb.state};d.ab=function(){return this.Jb};
d.$classData=p({Fm:0},!1,"japgolly.scalajs.react.component.Js$$anon$1",{Fm:1,$m:1,c:1,Bh:1,Ah:1,zh:1,yh:1,qd:1,pd:1,nd:1,rd:1,od:1,Km:1,Jm:1});function Dt(){pt.call(this);this.Ek=this.Jb=null}Dt.prototype=new qt;Dt.prototype.constructor=Dt;Dt.prototype.Rf=function(a,b,c){Nc();return Ct(this.Ek,a,b,c)};function Ct(a,b,c,e){var f=new Dt;f.Ek=a;pt.prototype.Jk.call(f,a,b,c,e);f.Jb=a.ab();return f}Dt.prototype.ab=function(){return this.Jb};
Dt.prototype.$classData=p({Gm:0},!1,"japgolly.scalajs.react.component.Js$$anon$2",{Gm:1,Zm:1,c:1,Bh:1,Ah:1,zh:1,yh:1,qd:1,pd:1,nd:1,rd:1,od:1,Km:1,Jm:1});function Et(){this.ng=this.Jb=this.Rg=this.Ic=null}Et.prototype=new st;Et.prototype.constructor=Et;d=Et.prototype;d.Ji=function(a,b){this.ng.Tf(w(new x,function(a,b){return function(a){Lc();return{a:b.e(a.a)}}}(this,a)),b)};d.Rf=function(a,b,c){Gc();return Ft(this,a,b,c)};d.Bc=function(){return this.ng.Bc().a};d.Tf=function(a,b){this.Ji(a,b)};
d.kf=function(a,b){this.ng.kf((Lc(),{a:a}),b)};d.Rb=function(){return this.ng.Rb().a};function Pc(a){var b=new Et;b.ng=a;rt.prototype.Kk.call(b,Kd().gi);b.Rg=a;b.Jb=a.ab();return b}d.ab=function(){return this.Jb};d.$classData=p({Um:0},!1,"japgolly.scalajs.react.component.Scala$$anon$1",{Um:1,$m:1,c:1,Bh:1,Ah:1,zh:1,yh:1,qd:1,pd:1,nd:1,rd:1,od:1,Xm:1,Wm:1});function Gt(){pt.call(this);this.Dk=this.Jb=this.Rg=null}Gt.prototype=new qt;Gt.prototype.constructor=Gt;
function Ft(a,b,c,e){var f=new Gt;f.Dk=a;pt.prototype.Jk.call(f,a,b,c,e);f.Rg=a.Rg;f.Jb=a.ab();return f}Gt.prototype.Rf=function(a,b,c){Gc();return Ft(this.Dk,a,b,c)};Gt.prototype.ab=function(){return this.Jb};Gt.prototype.$classData=p({Vm:0},!1,"japgolly.scalajs.react.component.Scala$$anon$2",{Vm:1,Zm:1,c:1,Bh:1,Ah:1,zh:1,yh:1,qd:1,pd:1,nd:1,rd:1,od:1,Xm:1,Wm:1});function Ht(a,b){return a.ja()-b|0}
function It(a,b){if(b&&b.$classData&&b.$classData.m.bg){var c=a.ja();if(c===b.ja()){for(var e=0;e<c&&J(K(),a.Za(e),b.Za(e));)e=1+e|0;return e===c}return!1}return gt(a,b)}function Jt(a,b){for(var c=0;c<a.ja()&&!0===!!b.e(a.Za(c));)c=1+c|0;return c===a.ja()}function Kt(a,b){for(var c=0,e=a.ja();c<e;)b.e(a.Za(c)),c=1+c|0}function Lt(a,b,c,e){var f=0;for(;;){if(f===b)return c;var k=1+f|0;c=Vd(e,c,a.Za(f));f=k}}
function Mt(a,b,c,e){var f=0,k=c,l=a.ja();e=l<e?l:e;c=Ll(T(),b)-c|0;for(c=e<c?e:c;f<c;)Nl(T(),b,k,a.Za(f)),f=1+f|0,k=1+k|0}function Nt(a,b){if(b&&b.$classData&&b.$classData.m.dg){if(a===b)return!0;for(;!a.i()&&!b.i()&&J(K(),a.ra(),b.ra());)a=a.ia(),b=b.ia();return a.i()&&b.i()}return gt(a,b)}function Ot(a,b){a=a.qk(b);if(0>b||a.i())throw(new W).h(""+b);return a.ra()}function Pt(a,b){for(;!a.i();){if(!b.e(a.ra()))return!1;a=a.ia()}return!0}
function Qt(a,b,c){for(;!a.i();)b=Vd(c,b,a.ra()),a=a.ia();return b}function vm(a){for(var b=0;!a.i();)b=1+b|0,a=a.ia();return b}function Rt(a,b){return 0<=b&&0<(0>b?1:St(a,b))}function St(a,b){var c=0;for(;;){if(c===b)return a.i()?0:1;if(a.i())return-1;c=1+c|0;a=a.ia()}}function Tt(a,b){return b.xa().Le(a,D(function(){return function(a,b){return a.Sb(b)}}(a)))}function Ut(a){throw(new V).h("key not found: "+a);}
function Vt(a,b,c,e,f){var k=a.z();a=(new fg).af(k,w(new x,function(){return function(a){if(null!==a){var b=a.Ia;a=a.Ta;Fg||(Fg=(new Gg).b());return""+(""+b+" -\x3e ")+a}throw(new G).l(a);}}(a)));return gk(a,b,c,e,f)}function Wt(a,b,c){return a.te(b,z(new A,function(a,b,c){return function(){return c.e(b)}}(a,b,c)))}function Xt(){}Xt.prototype=new Bt;Xt.prototype.constructor=Xt;function Yt(){}d=Yt.prototype=Xt.prototype;d.Kb=function(a){return gt(this,a)};
d.Fb=function(a){var b=this.z();return Ym(b,a)};d.P=function(a){var b=this.z();Zm(b,a)};d.Db=function(){return this.z().Db()};d.pe=function(a,b,c){var e=b;b=b+c|0;c=Ll(T(),a);b=b<c?b:c;for(c=this.z();e<b&&c.x();)Nl(T(),a,e,c.s()),e=1+e|0};var Zq=p({ta:0},!0,"scala.collection.immutable.Iterable",{ta:1,va:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,ua:1,T:1,R:1,I:1,K:1,k:1});function qf(){this.cb=null}qf.prototype=new q;qf.prototype.constructor=qf;d=qf.prototype;d.xa=function(){return(new Ok).h(this.cb)};
d.Za=function(a){a=65535&(this.cb.charCodeAt(a)|0);return vo(a)};d.hd=function(a){return Ht(this,a)};d.Kb=function(a){return It(this,a)};d.i=function(){return 0===this.ja()};d.Ha=function(){return(new Ok).h(this.cb)};d.n=function(a){Kk||(Kk=(new Jk).b());return a&&a.$classData&&a.$classData.m.Ol?this.cb===(null===a?null:a.cb):!1};d.Be=function(a,b,c){return dk(this,a,b,c)};d.Fb=function(a){return Jt(this,a)};d.j=function(){return this.cb};d.P=function(a){Kt(this,a)};
d.dc=function(a,b){return Lt(this,this.cb.length|0,a,b)};d.z=function(){return eg(new O,this,this.cb.length|0)};d.ja=function(){return this.cb.length|0};d.Id=function(){return this.cb.length|0};d.Db=function(){var a=eg(new O,this,this.cb.length|0);return $m(a)};d.ld=function(){return(new Ok).h(this.cb)};d.le=function(a,b,c,e){return gk(this,a,b,c,e)};d.Le=function(a,b){return Lt(this,this.cb.length|0,a,b)};d.ag=function(){return this.cb};d.pe=function(a,b,c){Mt(this,a,b,c)};
d.p=function(){var a=this.cb;return Aa(Ba(),a)};d.h=function(a){this.cb=a;return this};d.da=function(){return(new ek).b()};d.rc=function(){return Jr(this)};d.$classData=p({Ol:0},!1,"scala.collection.immutable.StringOps",{Ol:1,c:1,Nl:1,cg:1,Ee:1,Ec:1,K:1,k:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,I:1,Dc:1,xl:1,yc:1});var um=p({Qc:0},!0,"scala.collection.Seq",{Qc:1,Da:1,y:1,T:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,R:1,I:1,K:1,k:1,Pc:1,Dc:1,Ec:1});function Zt(){}Zt.prototype=new Yt;
Zt.prototype.constructor=Zt;function $t(){}$t.prototype=Zt.prototype;function dg(){this.ob=null}dg.prototype=new q;dg.prototype.constructor=dg;d=dg.prototype;d.xa=function(){return(new H).Oa(this.ob)};d.b=function(){dg.prototype.Oa.call(this,[]);return this};d.Za=function(a){return this.ob[a]};d.hd=function(a){return Ht(this,a)};d.Kb=function(a){return It(this,a)};d.i=function(){return 0===this.ja()};d.Ha=function(){return(new H).Oa(this.ob)};d.n=function(a){return zr(a)?this.Kb(a):!1};
d.Be=function(a,b,c){return dk(this,a,b,c)};d.gb=function(a){this.ob.push(a);return this};d.Fb=function(a){return Jt(this,a)};d.j=function(){return Ir(this)};d.P=function(a){Kt(this,a)};d.dc=function(a,b){return Lt(this,this.ob.length|0,a,b)};d.Sa=function(){return this.ob};d.z=function(){return eg(new O,this,this.ob.length|0)};d.Zb=function(a,b){qn(this,a,b)};d.ja=function(){return this.ob.length|0};d.Id=function(){return this.ob.length|0};d.Db=function(){var a=eg(new O,this,this.ob.length|0);return $m(a)};
d.ld=function(){return(new H).Oa(this.ob)};d.le=function(a,b,c,e){return gk(this,a,b,c,e)};d.ag=function(){return this.ob};d.Le=function(a,b){return Lt(this,this.ob.length|0,a,b)};d.hb=function(a){this.ob.push(a);return this};d.Qb=function(){};d.pe=function(a,b,c){Mt(this,a,b,c)};d.p=function(){return Xm(Rj(),(new H).Oa(this.ob))};d.Oa=function(a){this.ob=a;return this};d.da=function(){return(new dg).b()};d.Xa=function(a){return Dk(this,a)};d.rc=function(){return Jr(this)};
d.$classData=p({$l:0},!1,"scala.scalajs.js.ArrayOps",{$l:1,c:1,Qs:1,Wl:1,cj:1,Ee:1,Ec:1,K:1,k:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,I:1,Dc:1,cg:1,Pb:1,Nb:1,Lb:1});function Ij(a){var b=(new er).vc(a.r());a.P(w(new x,function(a,b){return function(a){return au(b,a)}}(a,b)));return b}function bu(){}bu.prototype=new Yt;bu.prototype.constructor=bu;function cu(){}d=cu.prototype=bu.prototype;d.i=function(){return 0===this.hd(0)};d.n=function(a){return zr(a)?this.Kb(a):!1};d.j=function(){return Ir(this)};d.ld=function(){return this};
d.p=function(){return Xm(Rj(),this.he())};d.Ld=function(a,b){return Yh(this,a,b)};d.sc=function(a){return qp(this,a)};function du(){}du.prototype=new Yt;du.prototype.constructor=du;function eu(){}d=eu.prototype=du.prototype;d.e=function(a){var b=this.Gb(a);if(I()===b)a=Ut(a);else if(Gd(b))a=b.w;else throw(new G).l(b);return a};d.i=function(){return 0===this.r()};
d.n=function(a){if(a&&a.$classData&&a.$classData.m.Yb){var b;if(!(b=this===a)&&(b=this.r()===a.r()))try{for(var c=this.z(),e=!0;e&&c.x();){var f=c.s();if(null===f)throw(new G).l(f);var k=f.Ta,l=a.Gb(f.Ia);b:{if(Gd(l)){var r=l.w;if(J(K(),k,r)){e=!0;break b}}e=!1}}b=e}catch(t){if(t&&t.$classData&&t.$classData.m.qp)b=!1;else throw t;}a=b}else a=!1;return a};d.te=function(a,b){a=this.Gb(a);if(Gd(a))b=a.w;else if(I()===a)b=b.D();else throw(new G).l(a);return b};d.j=function(){return Ir(this)};d.Di=function(){return(new Bq).Pg(this)};
d.E=function(a){return!this.Gb(a).i()};d.le=function(a,b,c,e){return Vt(this,a,b,c,e)};d.Vb=function(a){return this.E(a)};d.Yk=function(){return(new fu).Pg(this)};d.Ld=function(a,b){return Wt(this,a,b)};d.p=function(){var a=Rj();return Sj(a,this.ig(),a.al)};d.sc=function(a){return qp(this,a)};d.da=function(){return yk(new zk,this.Ve())};d.rc=function(){return"Map"};function gu(){}gu.prototype=new Yt;gu.prototype.constructor=gu;function hu(){}d=hu.prototype=gu.prototype;d.xa=function(){return this.Gd()};
d.e=function(a){return this.E(a)};d.Ha=function(){return this};d.i=function(){return 0===this.r()};d.n=function(a){return Gr(this,a)};d.j=function(){return Ir(this)};d.Na=function(){return Jq()};d.mj=function(a){return this.Fb(a)};d.Eb=function(){return this.xk()};d.Gd=function(){return this};d.xk=function(){return this.Na().Hc()};d.p=function(){var a=Rj();return Sj(a,this.Gd(),a.ij)};d.sc=function(a){return jb(this,a)};d.of=function(a){return Tt(this,a)};d.da=function(){return Gq(new Hq,this.Eb())};
d.rc=function(){return"Set"};function fu(){this.Me=null}fu.prototype=new hu;fu.prototype.constructor=fu;function iu(){}d=iu.prototype=fu.prototype;d.P=function(a){var b=this.Me.Di();Zm(b,a)};d.r=function(){return this.Me.r()};d.z=function(){return this.Me.Di()};d.E=function(a){return this.Me.E(a)};d.Pg=function(a){if(null===a)throw R(P(),null);this.Me=a;return this};d.Sb=function(a){var b;var c=Jq();b=B();b.i()?b=c.Hc():(c=c.da(),c.Xa(b),b=c.Sa());return b.of(this).Sb(a)};
d.$classData=p({Al:0},!1,"scala.collection.MapLike$DefaultKeySet",{Al:1,kc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,g:1,f:1});function ju(){this.$b=this.Me=null}ju.prototype=new iu;ju.prototype.constructor=ju;ju.prototype.P=function(a){for(var b=this.$b,c=b.W,b=il(b),e=c.d[b];null!==e;){var f=e.s();a.e(e.wa);for(e=f;null===e&&0<b;)b=-1+b|0,e=c.d[b]}};
ju.prototype.ri=function(a){if(null===a)throw R(P(),null);this.$b=a;fu.prototype.Pg.call(this,a);return this};ju.prototype.$classData=p({Ys:0},!1,"scala.collection.mutable.HashMap$$anon$1",{Ys:1,Al:1,kc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,g:1,f:1});function ku(){}ku.prototype=new eu;ku.prototype.constructor=ku;function lu(){}d=lu.prototype=ku.prototype;d.xa=function(){return this};d.Ha=function(){return this};d.Na=function(){return wq()};
d.Ve=function(){return this.ci()};d.ci=function(){return Wp()};d.ig=function(){return this};function mu(){}mu.prototype=new hu;mu.prototype.constructor=mu;function nu(){}d=nu.prototype=mu.prototype;d.xa=function(){return this};d.Xg=function(){throw(new V).h("next of empty set");};d.e=function(a){return this.E(a)};d.i=function(){return!0};d.Ha=function(){return this};d.Na=function(){Us||(Us=(new Ss).b());return Us};d.Ne=function(a){return ou(this,a)};d.r=function(){return 0};
d.z=function(){var a=pu(this);return Aq(a)};d.Eb=function(){return Ts()};function pu(a){for(var b=B();!a.i();){var c=a.bi(),b=sb(new tb,c,b);a=a.Xg()}return b}d.Gd=function(){return this};d.E=function(){return!1};d.bi=function(){throw(new V).h("elem of empty set");};function qu(a,b){return b.i()?a:b.Le(a,D(function(){return function(a,b){return a.Ne(b)}}(a)))}d.Sb=function(a){return this.Ne(a)};d.of=function(a){return qu(this,a)};d.rc=function(){return"ListSet"};function ru(){}ru.prototype=new hu;
ru.prototype.constructor=ru;d=ru.prototype;d.xa=function(){return this};d.b=function(){return this};d.e=function(){return!1};d.Ha=function(){return this};d.Na=function(){return Qo()};d.P=function(){};d.r=function(){return 0};d.z=function(){return oi().Ba};d.Eb=function(){return Fq()};d.Gd=function(){return this};d.E=function(){return!1};d.Sb=function(a){return(new su).l(a)};
d.$classData=p({ss:0},!1,"scala.collection.immutable.Set$EmptySet$",{ss:1,kc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,Uc:1,ta:1,va:1,ua:1,g:1,f:1});var tu=void 0;function Fq(){tu||(tu=(new ru).b());return tu}function su(){this.Ea=null}su.prototype=new hu;su.prototype.constructor=su;d=su.prototype;d.xa=function(){return this};d.e=function(a){return this.E(a)};d.Ha=function(){return this};d.Fb=function(a){return!!a.e(this.Ea)};
d.Na=function(){return Qo()};d.P=function(a){a.e(this.Ea)};d.r=function(){return 1};d.z=function(){oi();var a=(new H).Oa([this.Ea]);return eg(new O,a,a.la.length|0)};d.l=function(a){this.Ea=a;return this};d.Eb=function(){return Fq()};d.je=function(a){return this.E(a)?this:(new uu).Q(this.Ea,a)};d.Gd=function(){return this};d.E=function(a){return J(K(),a,this.Ea)};d.Sb=function(a){return this.je(a)};
d.$classData=p({ts:0},!1,"scala.collection.immutable.Set$Set1",{ts:1,kc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,Uc:1,ta:1,va:1,ua:1,g:1,f:1});function uu(){this.bb=this.Ea=null}uu.prototype=new hu;uu.prototype.constructor=uu;d=uu.prototype;d.xa=function(){return this};d.e=function(a){return this.E(a)};d.Ha=function(){return this};d.Q=function(a,b){this.Ea=a;this.bb=b;return this};d.Fb=function(a){return!!a.e(this.Ea)&&!!a.e(this.bb)};
d.Na=function(){return Qo()};d.P=function(a){a.e(this.Ea);a.e(this.bb)};d.r=function(){return 2};d.z=function(){oi();var a=(new H).Oa([this.Ea,this.bb]);return eg(new O,a,a.la.length|0)};d.Eb=function(){return Fq()};d.je=function(a){if(this.E(a))a=this;else{var b=this.bb,c=new vu;c.Ea=this.Ea;c.bb=b;c.cc=a;a=c}return a};d.Gd=function(){return this};d.E=function(a){return J(K(),a,this.Ea)||J(K(),a,this.bb)};d.Sb=function(a){return this.je(a)};
d.$classData=p({us:0},!1,"scala.collection.immutable.Set$Set2",{us:1,kc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,Uc:1,ta:1,va:1,ua:1,g:1,f:1});function vu(){this.cc=this.bb=this.Ea=null}vu.prototype=new hu;vu.prototype.constructor=vu;d=vu.prototype;d.xa=function(){return this};d.e=function(a){return this.E(a)};d.Ha=function(){return this};d.Fb=function(a){return!!a.e(this.Ea)&&!!a.e(this.bb)&&!!a.e(this.cc)};d.Na=function(){return Qo()};
d.P=function(a){a.e(this.Ea);a.e(this.bb);a.e(this.cc)};d.r=function(){return 3};d.z=function(){oi();var a=(new H).Oa([this.Ea,this.bb,this.cc]);return eg(new O,a,a.la.length|0)};d.Eb=function(){return Fq()};d.je=function(a){return this.E(a)?this:(new wu).Kf(this.Ea,this.bb,this.cc,a)};d.Gd=function(){return this};d.E=function(a){return J(K(),a,this.Ea)||J(K(),a,this.bb)||J(K(),a,this.cc)};d.Sb=function(a){return this.je(a)};
d.$classData=p({vs:0},!1,"scala.collection.immutable.Set$Set3",{vs:1,kc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,Uc:1,ta:1,va:1,ua:1,g:1,f:1});function wu(){this.Ue=this.cc=this.bb=this.Ea=null}wu.prototype=new hu;wu.prototype.constructor=wu;d=wu.prototype;d.xa=function(){return this};d.e=function(a){return this.E(a)};d.Ha=function(){return this};d.Fb=function(a){return!!a.e(this.Ea)&&!!a.e(this.bb)&&!!a.e(this.cc)&&!!a.e(this.Ue)};
d.Na=function(){return Qo()};d.P=function(a){a.e(this.Ea);a.e(this.bb);a.e(this.cc);a.e(this.Ue)};d.r=function(){return 4};d.z=function(){oi();var a=(new H).Oa([this.Ea,this.bb,this.cc,this.Ue]);return eg(new O,a,a.la.length|0)};d.Eb=function(){return Fq()};d.je=function(a){return this.E(a)?this:xu(xu(xu(xu(xu((new yu).b(),this.Ea),this.bb),this.cc),this.Ue),a)};d.Gd=function(){return this};d.E=function(a){return J(K(),a,this.Ea)||J(K(),a,this.bb)||J(K(),a,this.cc)||J(K(),a,this.Ue)};
d.Kf=function(a,b,c,e){this.Ea=a;this.bb=b;this.cc=c;this.Ue=e;return this};d.Sb=function(a){return this.je(a)};d.$classData=p({ws:0},!1,"scala.collection.immutable.Set$Set4",{ws:1,kc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,Uc:1,ta:1,va:1,ua:1,g:1,f:1});function yu(){}yu.prototype=new hu;yu.prototype.constructor=yu;function zu(){}d=zu.prototype=yu.prototype;d.lg=function(a,b){return Au(a,b)};
d.oe=function(a){return this.mi(ug(vg(),a))};d.xa=function(){return this};d.b=function(){return this};d.e=function(a){return this.E(a)};function xu(a,b){return a.lg(b,a.oe(b),0)}d.Ha=function(){return this};d.Na=function(){return Ps()};d.P=function(){};d.mj=function(a){if(a&&a.$classData&&a.$classData.m.jf)return this.jg(a,0);var b=this.z();return Ym(b,a)};d.r=function(){return 0};d.z=function(){return oi().Ba};d.Eb=function(){return Ns()};
d.mi=function(a){a=a+~(a<<9)|0;a^=a>>>14|0;a=a+(a<<4)|0;return a^(a>>>10|0)};d.Gd=function(){return this};d.E=function(a){return this.Rd(a,this.oe(a),0)};d.xk=function(){return Ns()};d.Rd=function(){return!1};d.Sb=function(a){return xu(this,a)};d.jg=function(){return!0};var Ks=p({jf:0},!1,"scala.collection.immutable.HashSet",{jf:1,kc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,Uc:1,ta:1,va:1,ua:1,lc:1,g:1,f:1});
yu.prototype.$classData=Ks;function Bu(){}Bu.prototype=new nu;Bu.prototype.constructor=Bu;Bu.prototype.b=function(){return this};Bu.prototype.$classData=p({gs:0},!1,"scala.collection.immutable.ListSet$EmptyListSet$",{gs:1,es:1,kc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,Uc:1,ta:1,va:1,ua:1,g:1,f:1});var Cu=void 0;function Ts(){Cu||(Cu=(new Bu).b());return Cu}function Du(){this.$b=this.tk=null}Du.prototype=new nu;
Du.prototype.constructor=Du;d=Du.prototype;d.Xg=function(){return this.$b};d.i=function(){return!1};d.Ne=function(a){return Eu(this,a)?this:ou(this,a)};d.r=function(){a:{var a=this,b=0;for(;;){if(a.i())break a;a=a.Xg();b=1+b|0}}return b};function ou(a,b){var c=new Du;c.tk=b;if(null===a)throw R(P(),null);c.$b=a;return c}d.bi=function(){return this.tk};d.E=function(a){return Eu(this,a)};function Eu(a,b){for(;;){if(a.i())return!1;if(J(K(),a.bi(),b))return!0;a=a.Xg()}}d.Sb=function(a){return this.Ne(a)};
d.$classData=p({hs:0},!1,"scala.collection.immutable.ListSet$Node",{hs:1,es:1,kc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,Uc:1,ta:1,va:1,ua:1,g:1,f:1});function Fu(){}Fu.prototype=new cu;Fu.prototype.constructor=Fu;function Gu(){}Gu.prototype=Fu.prototype;Fu.prototype.xa=function(){return this.kh()};Fu.prototype.kh=function(){return this};function Hu(a,b){a.oa.ch(b.Ia,b.Ta);return a}function Iu(){}Iu.prototype=new zu;
Iu.prototype.constructor=Iu;Iu.prototype.b=function(){return this};Iu.prototype.$classData=p({Tr:0},!1,"scala.collection.immutable.HashSet$EmptyHashSet$",{Tr:1,jf:1,kc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,Uc:1,ta:1,va:1,ua:1,lc:1,g:1,f:1});var Ju=void 0;function Ns(){Ju||(Ju=(new Iu).b());return Ju}function Ms(){this.cd=0;this.qb=null;this.Ie=0}Ms.prototype=new zu;Ms.prototype.constructor=Ms;d=Ms.prototype;
d.lg=function(a,b,c){var e=1<<(31&(b>>>c|0)),f=Rk(Xj(),this.cd&(-1+e|0));if(0!==(this.cd&e)){e=this.qb.d[f];a=e.lg(a,b,5+c|0);if(e===a)return this;b=m(v(Ks),[this.qb.d.length]);Ip(Kp(),this.qb,0,b,0,this.qb.d.length);b.d[f]=a;return Ls(new Ms,this.cd,b,this.Ie+(a.r()-e.r()|0)|0)}c=m(v(Ks),[1+this.qb.d.length|0]);Ip(Kp(),this.qb,0,c,0,f);c.d[f]=Au(a,b);Ip(Kp(),this.qb,f,c,1+f|0,this.qb.d.length-f|0);return Ls(new Ms,this.cd|e,c,1+this.Ie|0)};
d.P=function(a){for(var b=0;b<this.qb.d.length;)this.qb.d[b].P(a),b=1+b|0};d.r=function(){return this.Ie};d.z=function(){var a=new Or;Vq.prototype.Ik.call(a,this.qb);return a};function Ls(a,b,c,e){a.cd=b;a.qb=c;a.Ie=e;ff();if(Rk(Xj(),b)!==c.d.length)throw(new Yk).l("assertion failed");return a}d.Rd=function(a,b,c){var e=31&(b>>>c|0),f=1<<e;return-1===this.cd?this.qb.d[31&e].Rd(a,b,5+c|0):0!==(this.cd&f)?(e=Rk(Xj(),this.cd&(-1+f|0)),this.qb.d[e].Rd(a,b,5+c|0)):!1};
d.jg=function(a,b){if(a===this)return!0;if(Xq(a)&&this.Ie<=a.Ie){var c=this.cd,e=this.qb,f=0,k=a.qb;a=a.cd;var l=0;if((c&a)===c){for(;0!==c;){var r=c^c&(-1+c|0),t=a^a&(-1+a|0);if(r===t){if(!e.d[f].jg(k.d[l],5+b|0))return!1;c&=~r;f=1+f|0}a&=~t;l=1+l|0}return!0}}return!1};function Xq(a){return!!(a&&a.$classData&&a.$classData.m.Jl)}
d.$classData=p({Jl:0},!1,"scala.collection.immutable.HashSet$HashTrieSet",{Jl:1,jf:1,kc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,Uc:1,ta:1,va:1,ua:1,lc:1,g:1,f:1});function Ku(){}Ku.prototype=new zu;Ku.prototype.constructor=Ku;function Lu(){}Lu.prototype=Ku.prototype;function Mu(){}Mu.prototype=new lu;Mu.prototype.constructor=Mu;function Nu(){}d=Nu.prototype=Mu.prototype;d.mg=function(){throw(new V).h("value of empty map");};
d.i=function(){return!0};d.Ha=function(){return this};d.Ve=function(){return Ou()};d.ci=function(){return Ou()};d.r=function(){return 0};d.ig=function(){return this};d.pg=function(a){return Pu(new Qu,this,a.Ia,a.Ta)};d.z=function(){var a=Ru(this);return Aq(a)};d.Lc=function(){throw(new V).h("key of empty map");};d.pj=function(a,b){return Pu(new Qu,this,a,b)};d.Gb=function(){return I()};function Ru(a){for(var b=B();!a.i();){var c=(new M).Q(a.Lc(),a.mg()),b=sb(new tb,c,b);a=a.Xd()}return b}
d.Xd=function(){throw(new V).h("next of empty map");};d.$c=function(a){return this.pg(a)};d.rc=function(){return"ListMap"};function Su(){}Su.prototype=new lu;Su.prototype.constructor=Su;d=Su.prototype;d.b=function(){return this};d.e=function(a){this.Oh(a)};d.te=function(a,b){return b.D()};d.r=function(){return 0};d.z=function(){return oi().Ba};d.Gb=function(){return I()};d.E=function(){return!1};d.Oh=function(a){throw(new V).h("key not found: "+a);};d.$c=function(a){return(new Tu).Q(a.Ia,a.Ta)};
d.$classData=p({js:0},!1,"scala.collection.immutable.Map$EmptyMap$",{js:1,Rc:1,jc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,nc:1,Yb:1,mc:1,oc:1,Da:1,y:1,qa:1,Sc:1,ta:1,va:1,ua:1,Tc:1,g:1,f:1});var Uu=void 0;function Wp(){Uu||(Uu=(new Su).b());return Uu}function Tu(){this.ea=this.B=null}Tu.prototype=new lu;Tu.prototype.constructor=Tu;d=Tu.prototype;d.e=function(a){if(J(K(),a,this.B))return this.ea;throw(new V).h("key not found: "+a);};
d.te=function(a,b){return J(K(),a,this.B)?this.ea:b.D()};d.Q=function(a,b){this.B=a;this.ea=b;return this};d.P=function(a){a.e((new M).Q(this.B,this.ea))};d.r=function(){return 1};d.z=function(){oi();var a=(new H).Oa([(new M).Q(this.B,this.ea)]);return eg(new O,a,a.la.length|0)};d.Ke=function(a,b){return J(K(),a,this.B)?(new Tu).Q(this.B,b):(new Vu).Kf(this.B,this.ea,a,b)};d.Gb=function(a){return J(K(),a,this.B)?(new L).l(this.ea):I()};d.E=function(a){return J(K(),a,this.B)};
d.$c=function(a){return this.Ke(a.Ia,a.Ta)};d.$classData=p({ks:0},!1,"scala.collection.immutable.Map$Map1",{ks:1,Rc:1,jc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,nc:1,Yb:1,mc:1,oc:1,Da:1,y:1,qa:1,Sc:1,ta:1,va:1,ua:1,Tc:1,g:1,f:1});function Vu(){this.ya=this.ca=this.ea=this.B=null}Vu.prototype=new lu;Vu.prototype.constructor=Vu;d=Vu.prototype;d.e=function(a){if(J(K(),a,this.B))return this.ea;if(J(K(),a,this.ca))return this.ya;throw(new V).h("key not found: "+a);};
d.te=function(a,b){return J(K(),a,this.B)?this.ea:J(K(),a,this.ca)?this.ya:b.D()};d.P=function(a){a.e((new M).Q(this.B,this.ea));a.e((new M).Q(this.ca,this.ya))};d.r=function(){return 2};d.z=function(){oi();var a=(new H).Oa([(new M).Q(this.B,this.ea),(new M).Q(this.ca,this.ya)]);return eg(new O,a,a.la.length|0)};d.Ke=function(a,b){return J(K(),a,this.B)?(new Vu).Kf(this.B,b,this.ca,this.ya):J(K(),a,this.ca)?(new Vu).Kf(this.B,this.ea,this.ca,b):Wu(this.B,this.ea,this.ca,this.ya,a,b)};
d.Gb=function(a){return J(K(),a,this.B)?(new L).l(this.ea):J(K(),a,this.ca)?(new L).l(this.ya):I()};d.E=function(a){return J(K(),a,this.B)||J(K(),a,this.ca)};d.Kf=function(a,b,c,e){this.B=a;this.ea=b;this.ca=c;this.ya=e;return this};d.$c=function(a){return this.Ke(a.Ia,a.Ta)};d.$classData=p({ls:0},!1,"scala.collection.immutable.Map$Map2",{ls:1,Rc:1,jc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,nc:1,Yb:1,mc:1,oc:1,Da:1,y:1,qa:1,Sc:1,ta:1,va:1,ua:1,Tc:1,g:1,f:1});
function Xu(){this.eb=this.Ga=this.ya=this.ca=this.ea=this.B=null}Xu.prototype=new lu;Xu.prototype.constructor=Xu;d=Xu.prototype;d.e=function(a){if(J(K(),a,this.B))return this.ea;if(J(K(),a,this.ca))return this.ya;if(J(K(),a,this.Ga))return this.eb;throw(new V).h("key not found: "+a);};d.te=function(a,b){return J(K(),a,this.B)?this.ea:J(K(),a,this.ca)?this.ya:J(K(),a,this.Ga)?this.eb:b.D()};d.P=function(a){a.e((new M).Q(this.B,this.ea));a.e((new M).Q(this.ca,this.ya));a.e((new M).Q(this.Ga,this.eb))};
function Wu(a,b,c,e,f,k){var l=new Xu;l.B=a;l.ea=b;l.ca=c;l.ya=e;l.Ga=f;l.eb=k;return l}d.r=function(){return 3};d.z=function(){oi();var a=(new H).Oa([(new M).Q(this.B,this.ea),(new M).Q(this.ca,this.ya),(new M).Q(this.Ga,this.eb)]);return eg(new O,a,a.la.length|0)};
d.Ke=function(a,b){return J(K(),a,this.B)?Wu(this.B,b,this.ca,this.ya,this.Ga,this.eb):J(K(),a,this.ca)?Wu(this.B,this.ea,this.ca,b,this.Ga,this.eb):J(K(),a,this.Ga)?Wu(this.B,this.ea,this.ca,this.ya,this.Ga,b):Yu(this.B,this.ea,this.ca,this.ya,this.Ga,this.eb,a,b)};d.Gb=function(a){return J(K(),a,this.B)?(new L).l(this.ea):J(K(),a,this.ca)?(new L).l(this.ya):J(K(),a,this.Ga)?(new L).l(this.eb):I()};d.E=function(a){return J(K(),a,this.B)||J(K(),a,this.ca)||J(K(),a,this.Ga)};
d.$c=function(a){return this.Ke(a.Ia,a.Ta)};d.$classData=p({ms:0},!1,"scala.collection.immutable.Map$Map3",{ms:1,Rc:1,jc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,nc:1,Yb:1,mc:1,oc:1,Da:1,y:1,qa:1,Sc:1,ta:1,va:1,ua:1,Tc:1,g:1,f:1});function Zu(){this.md=this.ec=this.eb=this.Ga=this.ya=this.ca=this.ea=this.B=null}Zu.prototype=new lu;Zu.prototype.constructor=Zu;d=Zu.prototype;
d.e=function(a){if(J(K(),a,this.B))return this.ea;if(J(K(),a,this.ca))return this.ya;if(J(K(),a,this.Ga))return this.eb;if(J(K(),a,this.ec))return this.md;throw(new V).h("key not found: "+a);};d.te=function(a,b){return J(K(),a,this.B)?this.ea:J(K(),a,this.ca)?this.ya:J(K(),a,this.Ga)?this.eb:J(K(),a,this.ec)?this.md:b.D()};d.P=function(a){a.e((new M).Q(this.B,this.ea));a.e((new M).Q(this.ca,this.ya));a.e((new M).Q(this.Ga,this.eb));a.e((new M).Q(this.ec,this.md))};d.r=function(){return 4};
d.z=function(){oi();var a=(new H).Oa([(new M).Q(this.B,this.ea),(new M).Q(this.ca,this.ya),(new M).Q(this.Ga,this.eb),(new M).Q(this.ec,this.md)]);return eg(new O,a,a.la.length|0)};
d.Ke=function(a,b){return J(K(),a,this.B)?Yu(this.B,b,this.ca,this.ya,this.Ga,this.eb,this.ec,this.md):J(K(),a,this.ca)?Yu(this.B,this.ea,this.ca,b,this.Ga,this.eb,this.ec,this.md):J(K(),a,this.Ga)?Yu(this.B,this.ea,this.ca,this.ya,this.Ga,b,this.ec,this.md):J(K(),a,this.ec)?Yu(this.B,this.ea,this.ca,this.ya,this.Ga,this.eb,this.ec,b):$u($u($u($u($u((new av).b(),this.B,this.ea),this.ca,this.ya),this.Ga,this.eb),this.ec,this.md),a,b)};
function Yu(a,b,c,e,f,k,l,r){var t=new Zu;t.B=a;t.ea=b;t.ca=c;t.ya=e;t.Ga=f;t.eb=k;t.ec=l;t.md=r;return t}d.Gb=function(a){return J(K(),a,this.B)?(new L).l(this.ea):J(K(),a,this.ca)?(new L).l(this.ya):J(K(),a,this.Ga)?(new L).l(this.eb):J(K(),a,this.ec)?(new L).l(this.md):I()};d.E=function(a){return J(K(),a,this.B)||J(K(),a,this.ca)||J(K(),a,this.Ga)||J(K(),a,this.ec)};d.$c=function(a){return this.Ke(a.Ia,a.Ta)};
d.$classData=p({ns:0},!1,"scala.collection.immutable.Map$Map4",{ns:1,Rc:1,jc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,nc:1,Yb:1,mc:1,oc:1,Da:1,y:1,qa:1,Sc:1,ta:1,va:1,ua:1,Tc:1,g:1,f:1});function av(){}av.prototype=new lu;av.prototype.constructor=av;function bv(){}d=bv.prototype=av.prototype;d.oe=function(a){return this.mi(ug(vg(),a))};d.xa=function(){return this};d.b=function(){return this};d.Ha=function(){return this};d.nf=function(a,b,c,e,f){return cv(a,b,e,f)};
d.We=function(){return I()};d.P=function(){};function $u(a,b,c){return a.nf(b,a.oe(b),0,c,null,null)}d.Ve=function(){ss();return rs()};d.ci=function(){ss();return rs()};d.r=function(){return 0};d.ig=function(){return this};d.z=function(){return oi().Ba};d.mi=function(a){a=a+~(a<<9)|0;a^=a>>>14|0;a=a+(a<<4)|0;return a^(a>>>10|0)};d.Gb=function(a){return this.We(a,this.oe(a),0)};d.Te=function(){return!1};d.E=function(a){return this.Te(a,this.oe(a),0)};
d.$c=function(a){return this.nf(a.Ia,this.oe(a.Ia),0,a.Ta,a,null)};var os=p({fg:0},!1,"scala.collection.immutable.HashMap",{fg:1,Rc:1,jc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,nc:1,Yb:1,mc:1,oc:1,Da:1,y:1,qa:1,Sc:1,ta:1,va:1,ua:1,Tc:1,g:1,f:1,lc:1});av.prototype.$classData=os;function dv(){this.nb=null;this.Fa=0}dv.prototype=new Lu;dv.prototype.constructor=dv;d=dv.prototype;
d.lg=function(a,b,c){if(b===this.Fa&&J(K(),a,this.nb))return this;if(b!==this.Fa)return Js(Ps(),this.Fa,this,b,Au(a,b),c);var e=Ts();c=new ev;a=ou(e,this.nb).Ne(a);c.Fa=b;c.Ud=a;return c};d.P=function(a){a.e(this.nb)};function Au(a,b){var c=new dv;c.nb=a;c.Fa=b;return c}d.r=function(){return 1};d.z=function(){oi();var a=(new H).Oa([this.nb]);return eg(new O,a,a.la.length|0)};d.Rd=function(a,b){return b===this.Fa&&J(K(),a,this.nb)};d.jg=function(a,b){return a.Rd(this.nb,this.Fa,b)};
d.$classData=p({Il:0},!1,"scala.collection.immutable.HashSet$HashSet1",{Il:1,Wr:1,jf:1,kc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,Uc:1,ta:1,va:1,ua:1,lc:1,g:1,f:1});function ev(){this.Fa=0;this.Ud=null}ev.prototype=new Lu;ev.prototype.constructor=ev;d=ev.prototype;d.lg=function(a,b,c){b===this.Fa?(c=new ev,a=this.Ud.Ne(a),c.Fa=b,c.Ud=a,b=c):b=Js(Ps(),this.Fa,this,b,Au(a,b),c);return b};
d.P=function(a){var b=pu(this.Ud);Zm(Aq(b),a)};d.r=function(){return this.Ud.r()};d.z=function(){var a=pu(this.Ud);return Aq(a)};d.Rd=function(a,b){return b===this.Fa&&this.Ud.E(a)};d.jg=function(a,b){for(var c=pu(this.Ud),c=Aq(c),e=!0;e&&c.x();)e=c.s(),e=a.Rd(e,this.Fa,b);return e};
d.$classData=p({Ur:0},!1,"scala.collection.immutable.HashSet$HashSetCollision1",{Ur:1,Wr:1,jf:1,kc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,Uc:1,ta:1,va:1,ua:1,lc:1,g:1,f:1});function fv(){}fv.prototype=new Nu;fv.prototype.constructor=fv;fv.prototype.b=function(){return this};
fv.prototype.$classData=p({cs:0},!1,"scala.collection.immutable.ListMap$EmptyListMap$",{cs:1,bs:1,Rc:1,jc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,nc:1,Yb:1,mc:1,oc:1,Da:1,y:1,qa:1,Sc:1,ta:1,va:1,ua:1,Tc:1,g:1,f:1});var gv=void 0;function Ou(){gv||(gv=(new fv).b());return gv}function Qu(){this.sj=this.ie=this.nb=null}Qu.prototype=new Nu;Qu.prototype.constructor=Qu;
function hv(a,b){var c=B();for(;;){if(b.i()){a=c;if(a.i())throw(new V).b();for(b=a.ia();!b.i();)a=b,b=b.ia();return a.ra()}if(J(K(),a,b.Lc())){b=b.Xd();for(a=c;!a.i();)c=a.ra(),b=Pu(new Qu,b,c.Lc(),c.mg()),a=a.ia();return b}var e=b.Xd(),c=sb(new tb,b,c);b=e}}d=Qu.prototype;d.e=function(a){a:{var b=this;for(;;){if(b.i())throw(new V).h("key not found: "+a);if(J(K(),a,b.Lc())){a=b.mg();break a}b=b.Xd()}}return a};d.mg=function(){return this.ie};d.i=function(){return!1};
d.r=function(){a:{var a=this,b=0;for(;;){if(a.i())break a;a=a.Xd();b=1+b|0}}return b};d.Lc=function(){return this.nb};d.pg=function(a){var b=hv(a.Ia,this);return Pu(new Qu,b,a.Ia,a.Ta)};d.pj=function(a,b){var c=hv(a,this);return Pu(new Qu,c,a,b)};d.Gb=function(a){a:{var b=this;for(;;){if(b.i()){a=I();break a}if(J(K(),a,b.Lc())){a=(new L).l(b.mg());break a}b=b.Xd()}}return a};d.E=function(a){a:{var b=this;for(;;){if(b.i()){a=!1;break a}if(J(K(),a,b.Lc())){a=!0;break a}b=b.Xd()}}return a};
function Pu(a,b,c,e){a.nb=c;a.ie=e;if(null===b)throw R(P(),null);a.sj=b;return a}d.Xd=function(){return this.sj};d.$c=function(a){return this.pg(a)};d.$classData=p({ds:0},!1,"scala.collection.immutable.ListMap$Node",{ds:1,bs:1,Rc:1,jc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,nc:1,Yb:1,mc:1,oc:1,Da:1,y:1,qa:1,Sc:1,ta:1,va:1,ua:1,Tc:1,g:1,f:1});function iv(){}iv.prototype=new cu;iv.prototype.constructor=iv;function jv(){}d=jv.prototype=iv.prototype;d.xa=function(){return this};
d.Za=function(a){return Ot(this,a)};d.hd=function(a){return 0>a?1:St(this,a)};d.e=function(a){return Ot(this,a|0)};d.Kb=function(a){return Nt(this,a)};d.Ha=function(){return this};d.n=function(a){return this===a||(zr(a)?this.Kb(a):!1)};
function Tr(a,b){var c=(vi(),(new gp).b());if(Ur(c.xg(a))){if(a.i())a=bn();else{for(var c=(new Id).l(a),e=b.e(c.F.ra()).Db();!c.F.i()&&e.i();)c.F=c.F.ia(),c.F.i()||(e=b.e(c.F.ra()).Db());a=c.F.i()?(vi(),bn()):kv(e,z(new A,function(a,b,c){return function(){return Tr(c.F.ia(),b)}}(a,b,c)))}return a}return Hr(a,b,c)}d.qk=function(a){a:{var b=this;for(;;){if(0>=a||b.i())break a;b=b.ia();a=-1+a|0}}return b};
d.Be=function(a,b,c){var e=this,f=this;for(e.i()||(e=e.ia());f!==e&&!e.i();){e=e.ia();if(e.i())break;e=e.ia();if(e===f)break;f=f.ia()}return dk(this,a,b,c)};d.Fb=function(a){return Pt(this,a)};d.Na=function(){return vi()};d.j=function(){return dk(this,"Stream(",", ",")")};d.P=function(a){var b=this;a:for(;;){if(!b.i()){a.e(b.ra());b=b.ia();continue a}break}};d.dc=function(a,b){var c=this;for(;;){if(c.i())return a;var e=c.ia();a=Vd(b,a,c.ra());c=e}};d.z=function(){return Uq(this)};d.he=function(){return this};
d.ja=function(){for(var a=0,b=this;!b.i();)a=1+a|0,b=b.ia();return a};d.Db=function(){return this};d.ld=function(){return this};
d.le=function(a,b,c,e){kk(a,b);if(!this.i()){lk(a,this.ra());b=this;if(b.Jd()){var f=this.ia();if(f.i())return kk(a,e),a;if(b!==f&&(b=f,f.Jd()))for(f=f.ia();b!==f&&f.Jd();)lk(kk(a,c),b.ra()),b=b.ia(),f=f.ia(),f.Jd()&&(f=f.ia());if(f.Jd()){for(var k=this,l=0;k!==f;)k=k.ia(),f=f.ia(),l=1+l|0;b===f&&0<l&&(lk(kk(a,c),b.ra()),b=b.ia());for(;b!==f;)lk(kk(a,c),b.ra()),b=b.ia()}else{for(;b!==f;)lk(kk(a,c),b.ra()),b=b.ia();!b.i()&&lk(kk(a,c),b.ra())}}b.i()||(b.Jd()?kk(kk(a,c),"..."):kk(kk(a,c),"?"))}kk(a,
e);return a};d.Vb=function(a){return Rt(this,a|0)};d.p=function(){return Xm(Rj(),this)};function kv(a,b){if(a.i())return b.D().Db();var c=a.ra();return(new an).Jf(c,z(new A,function(a,b){return function(){return kv(a.ia(),b)}}(a,b)))}d.rc=function(){return"Stream"};function lv(a,b){if(b>=a.La)throw(new W).h(""+b);return a.la.d[b]}
function mv(a,b){var c=a.la.d.length,e=c>>31,f=b>>31;if(f===e?(-2147483648^b)>(-2147483648^c):f>e){f=c<<1;for(c=c>>>31|0|e<<1;;){var e=b>>31,k=f,l=c;if(e===l?(-2147483648^b)>(-2147483648^k):e>l)c=f>>>31|0|c<<1,f<<=1;else break}b=c;if(0===b?-1<(-2147483648^f):0<b)f=2147483647;b=f;b=m(v(u),[b]);Ka(a.la,0,b,0,a.La);a.la=b}}function nv(){}nv.prototype=new bv;nv.prototype.constructor=nv;nv.prototype.b=function(){return this};
nv.prototype.$classData=p({Or:0},!1,"scala.collection.immutable.HashMap$EmptyHashMap$",{Or:1,fg:1,Rc:1,jc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,nc:1,Yb:1,mc:1,oc:1,Da:1,y:1,qa:1,Sc:1,ta:1,va:1,ua:1,Tc:1,g:1,f:1,lc:1});var ov=void 0;function rs(){ov||(ov=(new nv).b());return ov}function pv(){this.nb=null;this.Fa=0;this.Sg=this.ie=null}pv.prototype=new bv;pv.prototype.constructor=pv;function Nr(a){null===a.Sg&&(a.Sg=(new M).Q(a.nb,a.ie));return a.Sg}
function cv(a,b,c,e){var f=new pv;f.nb=a;f.Fa=b;f.ie=c;f.Sg=e;return f}d=pv.prototype;d.nf=function(a,b,c,e,f,k){if(b===this.Fa&&J(K(),a,this.nb)){if(null===k)return this.ie===e?this:cv(a,b,e,f);a=k.Ph(Nr(this),null!==f?f:(new M).Q(a,e));return cv(a.Ia,b,a.Ta,a)}if(b!==this.Fa)return a=cv(a,b,e,f),ns(ss(),this.Fa,this,b,a,c,2);c=Ou();return qv(new rv,b,Pu(new Qu,c,this.nb,this.ie).pj(a,e))};d.We=function(a,b){return b===this.Fa&&J(K(),a,this.nb)?(new L).l(this.ie):I()};d.P=function(a){a.e(Nr(this))};
d.r=function(){return 1};d.z=function(){oi();var a=[Nr(this)],a=(new H).Oa(a);return eg(new O,a,a.la.length|0)};d.Te=function(a,b){return b===this.Fa&&J(K(),a,this.nb)};d.$classData=p({Hl:0},!1,"scala.collection.immutable.HashMap$HashMap1",{Hl:1,fg:1,Rc:1,jc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,nc:1,Yb:1,mc:1,oc:1,Da:1,y:1,qa:1,Sc:1,ta:1,va:1,ua:1,Tc:1,g:1,f:1,lc:1});function rv(){this.Fa=0;this.Mc=null}rv.prototype=new bv;rv.prototype.constructor=rv;d=rv.prototype;
d.nf=function(a,b,c,e,f,k){if(b===this.Fa)return null!==k&&this.Mc.E(a)?qv(new rv,b,this.Mc.pg(k.Ph((new M).Q(a,this.Mc.e(a)),f))):qv(new rv,b,this.Mc.pj(a,e));a=cv(a,b,e,f);return ns(ss(),this.Fa,this,b,a,c,1+this.Mc.r()|0)};d.We=function(a,b){return b===this.Fa?this.Mc.Gb(a):I()};d.P=function(a){var b=Ru(this.Mc);Zm(Aq(b),a)};d.z=function(){var a=Ru(this.Mc);return Aq(a)};d.r=function(){return this.Mc.r()};function qv(a,b,c){a.Fa=b;a.Mc=c;return a}d.Te=function(a,b){return b===this.Fa&&this.Mc.E(a)};
d.$classData=p({Pr:0},!1,"scala.collection.immutable.HashMap$HashMapCollision1",{Pr:1,fg:1,Rc:1,jc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,nc:1,Yb:1,mc:1,oc:1,Da:1,y:1,qa:1,Sc:1,ta:1,va:1,ua:1,Tc:1,g:1,f:1,lc:1});function qs(){this.Gc=0;this.rb=null;this.La=0}qs.prototype=new bv;qs.prototype.constructor=qs;d=qs.prototype;
d.nf=function(a,b,c,e,f,k){var l=1<<(31&(b>>>c|0)),r=Rk(Xj(),this.Gc&(-1+l|0));if(0!==(this.Gc&l)){l=this.rb.d[r];a=l.nf(a,b,5+c|0,e,f,k);if(a===l)return this;b=m(v(os),[this.rb.d.length]);Ip(Kp(),this.rb,0,b,0,this.rb.d.length);b.d[r]=a;return ps(new qs,this.Gc,b,this.La+(a.r()-l.r()|0)|0)}c=m(v(os),[1+this.rb.d.length|0]);Ip(Kp(),this.rb,0,c,0,r);c.d[r]=cv(a,b,e,f);Ip(Kp(),this.rb,r,c,1+r|0,this.rb.d.length-r|0);return ps(new qs,this.Gc|l,c,1+this.La|0)};
d.We=function(a,b,c){var e=31&(b>>>c|0);if(-1===this.Gc)return this.rb.d[e].We(a,b,5+c|0);e=1<<e;return 0!==(this.Gc&e)?(e=Rk(Xj(),this.Gc&(-1+e|0)),this.rb.d[e].We(a,b,5+c|0)):I()};d.P=function(a){for(var b=0;b<this.rb.d.length;)this.rb.d[b].P(a),b=1+b|0};d.z=function(){var a=new Mr;Vq.prototype.Ik.call(a,this.rb);return a};d.r=function(){return this.La};function ps(a,b,c,e){a.Gc=b;a.rb=c;a.La=e;return a}
d.Te=function(a,b,c){var e=31&(b>>>c|0);if(-1===this.Gc)return this.rb.d[e].Te(a,b,5+c|0);e=1<<e;return 0!==(this.Gc&e)?(e=Rk(Xj(),this.Gc&(-1+e|0)),this.rb.d[e].Te(a,b,5+c|0)):!1};d.$classData=p({Zi:0},!1,"scala.collection.immutable.HashMap$HashTrieMap",{Zi:1,fg:1,Rc:1,jc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,nc:1,Yb:1,mc:1,oc:1,Da:1,y:1,qa:1,Sc:1,ta:1,va:1,ua:1,Tc:1,g:1,f:1,lc:1});function sv(){}sv.prototype=new cu;sv.prototype.constructor=sv;
function tv(){}d=tv.prototype=sv.prototype;d.xa=function(){return this};d.Za=function(a){return Ot(this,a)};d.hd=function(a){return 0>a?1:St(this,a)};d.e=function(a){return Ot(this,a|0)};d.Kb=function(a){return Nt(this,a)};d.Ha=function(){return this};d.qk=function(a){for(var b=this;!b.i()&&0<a;)b=b.Xc(),a=-1+a|0;return b};d.Fb=function(a){return Pt(this,a)};d.Na=function(){return Xd()};d.P=function(a){for(var b=this;!b.i();)a.e(b.ra()),b=b.Xc()};d.dc=function(a,b){return Qt(this,a,b)};d.z=function(){return Aq(this)};
d.ja=function(){return vm(this)};d.he=function(){return this};d.Db=function(){return this.i()?bn():(new an).Jf(this.ra(),z(new A,function(a){return function(){return a.Xc().Db()}}(this)))};d.ld=function(){return this};d.Vb=function(a){return Rt(this,a|0)};d.p=function(){return Xm(Rj(),this)};d.rc=function(){return"List"};function an(){this.qh=this.jm=this.Lg=null}an.prototype=new jv;an.prototype.constructor=an;d=an.prototype;d.ra=function(){return this.Lg};
function uv(a){a.Jd()||a.Jd()||(a.jm=a.qh.D(),a.qh=null);return a.jm}d.Kb=function(a){return vv(a)?wv(this,a):Nt(this,a)};d.i=function(){return!1};d.Jd=function(){return null===this.qh};function wv(a,b){for(;;)if(J(K(),a.Lg,b.Lg))if(a=uv(a),vv(a))if(b=uv(b),vv(b)){if(a===b)return!0}else return!1;else return uv(b).i();else return!1}d.ia=function(){return uv(this)};d.Jf=function(a,b){this.Lg=a;this.qh=b;return this};function vv(a){return!!(a&&a.$classData&&a.$classData.m.Ll)}
d.$classData=p({Ll:0},!1,"scala.collection.immutable.Stream$Cons",{Ll:1,xs:1,Fd:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Qc:1,Da:1,y:1,Pc:1,Dc:1,Ec:1,$i:1,gg:1,ta:1,va:1,ua:1,dg:1,Vi:1,Wi:1,g:1,f:1});function xv(){}xv.prototype=new jv;xv.prototype.constructor=xv;d=xv.prototype;d.ra=function(){this.li()};d.b=function(){return this};d.i=function(){return!0};d.Jd=function(){return!1};d.li=function(){throw(new V).h("head of empty stream");};
d.ia=function(){throw(new Dm).h("tail of empty stream");};d.$classData=p({As:0},!1,"scala.collection.immutable.Stream$Empty$",{As:1,xs:1,Fd:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Qc:1,Da:1,y:1,Pc:1,Dc:1,Ec:1,$i:1,gg:1,ta:1,va:1,ua:1,dg:1,Vi:1,Wi:1,g:1,f:1});var yv=void 0;function bn(){yv||(yv=(new xv).b());return yv}function Wr(){this.Cd=this.uc=this.qc=0;this.lb=!1;this.tc=0;this.Hg=this.Gg=this.Fg=this.Eg=this.Dg=this.Bd=null}Wr.prototype=new cu;
Wr.prototype.constructor=Wr;d=Wr.prototype;d.xa=function(){return this};d.A=function(){return this.Fg};d.Za=function(a){var b=a+this.qc|0;if(0<=a&&b<this.uc)a=b;else throw(new W).h(""+a);return Bb(this,a,a^this.Cd)};d.Ka=function(){return this.tc};d.hd=function(a){return this.ja()-a|0};d.e=function(a){return this.Za(a|0)};d.Ha=function(){return this};d.Sd=function(a,b,c){this.qc=a;this.uc=b;this.Cd=c;this.lb=!1;return this};d.Nd=function(a){this.Hg=a};
function Ce(a,b){var c=(yi(),ni().Lh);c===(Zo(),ni().Lh)||c===hs().Ma||c===mi().Ma?a=zv(a,b):(c=c.xg(a.ag()),c.Xa(a.ld()),c.hb(b),a=c.Sa());return a}d.Na=function(){return yi()};d.za=function(){return this.Bd};d.ba=function(a){this.Eg=a};d.ma=function(){return this.Gg};
function Av(a,b){var c=-1+a.tc|0;switch(c){case 0:a.Bd=Fb(a.Bd,b);break;case 1:a.Dg=Fb(a.Dg,b);break;case 2:a.Eg=Fb(a.Eg,b);break;case 3:a.Fg=Fb(a.Fg,b);break;case 4:a.Gg=Fb(a.Gg,b);break;case 5:a.Hg=Fb(a.Hg,b);break;default:throw(new G).l(c);}}
function zv(a,b){if(a.uc!==a.qc){var c=-32&a.uc,e=31&a.uc;if(a.uc!==c){var f=(new Wr).Sd(a.qc,1+a.uc|0,c);Jb(f,a,a.tc);f.lb=a.lb;f.lb?Eb(f,a.Cd,c,a.Cd^c):(Hb(f,c),f.lb=!0);f.Bd.d[e]=b;return f}var k=a.qc&~(-1+(1<<h(5,-1+a.tc|0))|0),f=a.qc>>>h(5,-1+a.tc|0)|0;if(0!==k){if(1<a.tc){var c=c-k|0,l=a.Cd-k|0,k=(new Wr).Sd(a.qc-k|0,(1+a.uc|0)-k|0,c);Jb(k,a,a.tc);k.lb=a.lb;Av(k,f);a=l^c;k.lb?(Ib(k,l),Db(k,l,c,a)):(Db(k,l,c,a),k.lb=!0);k.Bd.d[e]=b;return k}e=-32+c|0;c=a.Cd;l=(new Wr).Sd(a.qc-k|0,(1+a.uc|0)-
k|0,e);Jb(l,a,a.tc);l.lb=a.lb;Av(l,f);l.lb?Eb(l,c,e,c^e):(Hb(l,e),l.lb=!0);l.Bd.d[32-k|0]=b;return l}f=a.Cd;k=(new Wr).Sd(a.qc,1+a.uc|0,c);Jb(k,a,a.tc);k.lb=a.lb;a=f^c;k.lb?(Ib(k,f),Db(k,f,c,a)):(Db(k,f,c,a),k.lb=!0);k.Bd.d[e]=b;return k}a=m(v(u),[32]);a.d[0]=b;b=(new Wr).Sd(0,1,0);b.tc=1;b.Bd=a;return b}d.z=function(){return Vn(this)};d.C=function(a){this.Dg=a};d.ja=function(){return this.uc-this.qc|0};d.he=function(){return this};d.mb=function(a){this.Gg=a};d.Id=function(){return this.ja()};
d.o=function(){return this.Dg};d.pb=function(){return this.Hg};d.ld=function(){return this};function Vn(a){var b=(new Xr).Ed(a.qc,a.uc);Jb(b,a,a.tc);a.lb&&Ib(b,a.Cd);1<b.Zh&&Gb(b,a.qc,a.qc^a.Cd);return b}d.Vb=function(a){return vq(this,a|0)};d.p=function(){return Xm(Rj(),this)};d.bc=function(a){this.tc=a};d.q=function(){return this.Eg};d.Z=function(a){this.Bd=a};d.Aa=function(a){this.Fg=a};
d.$classData=p({Hs:0},!1,"scala.collection.immutable.Vector",{Hs:1,Fd:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Qc:1,Da:1,y:1,Pc:1,Dc:1,Ec:1,Xr:1,gg:1,ta:1,va:1,ua:1,bg:1,Ee:1,Pl:1,g:1,f:1,lc:1});function Ok(){this.ge=null}Ok.prototype=new cu;Ok.prototype.constructor=Ok;d=Ok.prototype;d.xa=function(){return this};d.Za=function(a){a=65535&(this.ge.charCodeAt(a)|0);return vo(a)};d.hd=function(a){return Ht(this,a)};d.Kb=function(a){return It(this,a)};
d.e=function(a){a=65535&(this.ge.charCodeAt(a|0)|0);return vo(a)};d.i=function(){return 0===this.ja()};d.Ha=function(){return this};d.Fb=function(a){return Jt(this,a)};d.Na=function(){return Zo()};d.j=function(){return this.ge};d.P=function(a){Kt(this,a)};d.dc=function(a,b){return Lt(this,this.ge.length|0,a,b)};d.z=function(){return eg(new O,this,this.ge.length|0)};d.ja=function(){return this.ge.length|0};d.he=function(){return this};d.Id=function(){return this.ge.length|0};d.ld=function(){return this};
d.Vb=function(a){return vq(this,a|0)};d.p=function(){return Xm(Rj(),this)};d.pe=function(a,b,c){Mt(this,a,b,c)};d.h=function(a){this.ge=a;return this};d.da=function(){Pk||(Pk=(new Lk).b());return Pk.da()};d.$classData=p({Ls:0},!1,"scala.collection.immutable.WrappedString",{Ls:1,Fd:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Qc:1,Da:1,y:1,Pc:1,Dc:1,Ec:1,Xr:1,gg:1,ta:1,va:1,ua:1,bg:1,Ee:1,Nl:1,cg:1,xl:1,yc:1});function tb(){this.lf=this.ki=null}tb.prototype=new tv;
tb.prototype.constructor=tb;d=tb.prototype;d.ra=function(){return this.ki};d.ha=function(){return"::"};d.fa=function(){return 2};d.Xc=function(){return this.lf};d.i=function(){return!1};d.ga=function(a){switch(a){case 0:return this.ki;case 1:return this.lf;default:throw(new W).h(""+a);}};d.ia=function(){return this.lf};function sb(a,b,c){a.ki=b;a.lf=c;return a}d.ka=function(){return Z(this)};
d.$classData=p({Jr:0},!1,"scala.collection.immutable.$colon$colon",{Jr:1,Kl:1,Fd:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Qc:1,Da:1,y:1,Pc:1,Dc:1,Ec:1,$i:1,gg:1,ta:1,va:1,ua:1,dg:1,Vi:1,na:1,Wi:1,g:1,f:1});function Bv(){}Bv.prototype=new tv;Bv.prototype.constructor=Bv;d=Bv.prototype;d.ha=function(){return"Nil"};d.ra=function(){this.li()};d.b=function(){return this};d.fa=function(){return 0};d.i=function(){return!0};
d.Xc=function(){throw(new Dm).h("tail of empty list");};d.n=function(a){return zr(a)?a.i():!1};d.ga=function(a){throw(new W).h(""+a);};d.li=function(){throw(new V).h("head of empty list");};d.ia=function(){return this.Xc()};d.ka=function(){return Z(this)};d.$classData=p({os:0},!1,"scala.collection.immutable.Nil$",{os:1,Kl:1,Fd:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Qc:1,Da:1,y:1,Pc:1,Dc:1,Ec:1,$i:1,gg:1,ta:1,va:1,ua:1,dg:1,Vi:1,na:1,Wi:1,g:1,f:1});var Cv=void 0;
function B(){Cv||(Cv=(new Bv).b());return Cv}function Dv(){}Dv.prototype=new eu;Dv.prototype.constructor=Dv;function Ev(){}d=Ev.prototype=Dv.prototype;d.xa=function(){return this};d.Na=function(){fr||(fr=(new dr).b());return fr};d.Zb=function(a,b){qn(this,a,b)};d.Qb=function(){};d.da=function(){return this.Ve()};d.Xa=function(a){return Dk(this,a)};function Fv(){}Fv.prototype=new $t;Fv.prototype.constructor=Fv;function Gv(){}d=Gv.prototype=Fv.prototype;d.xa=function(){return this};
d.i=function(){return 0===this.r()};d.n=function(a){return Gr(this,a)};d.j=function(){return Ir(this)};d.Na=function(){$r||($r=(new Yr).b());return $r};d.mj=function(a){var b=this.z();return Ym(b,a)};d.Zb=function(a,b){qn(this,a,b)};d.Wh=function(){return this.Eb().Xa(this)};d.p=function(){var a=Rj();return Sj(a,this,a.ij)};d.Qb=function(){};d.sc=function(a){return jb(this,a)};d.da=function(){return this.Eb()};d.Xa=function(a){return Dk(this,a)};d.rc=function(){return"Set"};function Hv(){}
Hv.prototype=new Gu;Hv.prototype.constructor=Hv;function Iv(){}Iv.prototype=Hv.prototype;Hv.prototype.Xa=function(a){return Dk(this,a)};function vk(){this.$b=this.oa=null}vk.prototype=new Ev;vk.prototype.constructor=vk;d=vk.prototype;d.ha=function(){return"JMapWrapper"};d.pl=function(a,b){return Ud().wg(this.oa.ch(a,b))};d.fa=function(){return 1};d.Ha=function(){return this};d.ga=function(a){switch(a){case 0:return this.oa;default:throw(new W).h(""+a);}};d.gb=function(a){return Hu(this,a)};
d.Ve=function(){return uk(new vk,this.$b,(new ds).b())};function uk(a,b,c){a.oa=c;if(null===b)throw R(P(),null);a.$b=b;return a}d.r=function(){return this.oa.r()};d.Sa=function(){return this};d.ig=function(){return this};d.z=function(){var a=new Mq;a.oj=this.oa.dd().Hb();return a};d.Gb=function(a){var b=this.oa.Ff(a);return null!==b?(new L).l(b):this.oa.Cg(a)?(new L).l(null):I()};d.vh=function(a){return Hu(this,a)};d.hb=function(a){return Hu(this,a)};d.ka=function(){return Z(this)};
d.$c=function(a){var b=uk(new vk,this.$b,(new ds).b());return Dk(b,this).vh(a)};d.$classData=p({Br:0},!1,"scala.collection.convert.Wrappers$JMapWrapper",{Br:1,Ns:1,jc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,nc:1,Yb:1,mc:1,oc:1,Da:1,y:1,qa:1,nt:1,ee:1,fe:1,ae:1,pt:1,Pb:1,Nb:1,Lb:1,He:1,de:1,Oc:1,xc:1,Xu:1,na:1,g:1,f:1});function qk(){this.$b=this.oa=null}qk.prototype=new Gv;qk.prototype.constructor=qk;d=qk.prototype;d.ha=function(){return"JSetWrapper"};d.fa=function(){return 1};
d.e=function(a){return this.oa.E(a)};d.Ha=function(){return this};function Jv(a,b){a.oa.bd(b);return a}d.ga=function(a){switch(a){case 0:return this.oa;default:throw(new W).h(""+a);}};d.gb=function(a){return Jv(this,a)};d.uh=function(a){return Jv(this,a)};d.r=function(){return this.oa.r()};d.Sa=function(){return this};d.z=function(){bp||(bp=(new ap).b());var a=this.oa.Hb();return null===a?null:a&&a.$classData&&a.$classData.m.Ar&&a.Er()===ok()?a.Qt():sk(new tk,ok(),a)};
d.Eb=function(){return pk(new qk,this.$b,(new vt).b())};d.Wh=function(){return Kv(this)};function pk(a,b,c){a.oa=c;if(null===b)throw R(P(),null);a.$b=b;return a}d.E=function(a){return this.oa.E(a)};d.hb=function(a){return Jv(this,a)};d.ka=function(){return Z(this)};d.bd=function(a){return this.oa.bd(a)};d.Sb=function(a){return Jv(Kv(this),a)};d.of=function(a){var b=Kv(this);a=a.xa();return Dk(b,a)};function Kv(a){return pk(new qk,a.$b,(new zt).oi(a.oa))}
d.$classData=p({Dr:0},!1,"scala.collection.convert.Wrappers$JSetWrapper",{Dr:1,Sl:1,Rl:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,ee:1,fe:1,ae:1,Yl:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,Zl:1,eg:1,Pb:1,Nb:1,Lb:1,He:1,de:1,Oc:1,xc:1,na:1,g:1,f:1});function es(){this.ad=0;this.W=null;this.Yc=this.wb=0;this.jb=null;this.Vc=0}es.prototype=new Ev;es.prototype.constructor=es;d=es.prototype;d.xa=function(){return this};
d.pl=function(a,b){a=kl(this,a,b);if(null===a)return I();var c=a.X;a.X=b;return(new L).l(c)};d.b=function(){es.prototype.hp.call(this,null);return this};d.fj=function(a){this.Vc=a};d.e=function(a){var b=jl(this,a);return null===b?Ut(a):b.X};d.Ha=function(){return this};function Lv(a,b){var c=kl(a,b.Ia,b.Ta);null!==c&&(c.X=b.Ta);return a}d.gb=function(a){return Lv(this,a)};
d.P=function(a){for(var b=this.W,c=il(this),e=b.d[c];null!==e;){var f=e.s();a.e((new M).Q(e.wa,e.X));for(e=f;null===e&&0<c;)c=-1+c|0,e=b.d[c]}};d.Ve=function(){return(new es).b()};d.Di=function(){return(new ar).ri(this)};d.r=function(){return this.wb};d.ig=function(){return this};d.Sa=function(){return this};d.z=function(){return(new fg).af(br(this),w(new x,function(){return function(a){return(new M).Q(a.wa,a.X)}}(this)))};
d.hp=function(a){fl(this);null!==a&&(this.wh(a.fq()),this.nh(a.W),this.oh(a.wb),this.ph(a.Yc),this.fj(a.Vc),this.lh(a.jb));return this};d.dk=function(a,b){return(new Yp).Q(a,b)};d.Gb=function(a){a=jl(this,a);return null===a?I():(new L).l(a.X)};d.vh=function(a){return Lv(this,a)};d.lh=function(a){this.jb=a};d.E=function(a){return null!==jl(this,a)};d.nh=function(a){this.W=a};d.hb=function(a){return Lv(this,a)};d.Yk=function(){return(new ju).ri(this)};d.wh=function(a){this.ad=a};
d.ph=function(a){this.Yc=a};d.$c=function(a){var b=(new es).b();return Dk(b,this).vh(a)};d.oh=function(a){this.wb=a};d.$classData=p({Xs:0},!1,"scala.collection.mutable.HashMap",{Xs:1,Ns:1,jc:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,nc:1,Yb:1,mc:1,oc:1,Da:1,y:1,qa:1,nt:1,ee:1,fe:1,ae:1,pt:1,Pb:1,Nb:1,Lb:1,He:1,de:1,Oc:1,xc:1,bt:1,et:1,lc:1,g:1,f:1});function Ys(){this.Tg=this.Ef=null;this.ad=0;this.W=null;this.Yc=this.wb=0;this.jb=null;this.Vc=0}Ys.prototype=new Gv;
Ys.prototype.constructor=Ys;d=Ys.prototype;d.b=function(){fl(this);this.Tg=this.Ef=null;return this};d.fj=function(a){this.Vc=a};d.e=function(a){return this.E(a)};d.Ha=function(){return this};d.gb=function(a){return Mv(this,a)};d.Na=function(){Zs||(Zs=(new Xs).b());return Zs};d.P=function(a){for(var b=this.Ef;null!==b;)a.e(b.wa),b=b.Ug};function Mv(a,b){a.bd(b);return a}d.uh=function(a){return Mv(this,a)};d.r=function(){return this.wb};d.Sa=function(){return this};
d.z=function(){var a=new jr;a.Af=this.Ef;return a};d.Eb=function(){return(new Ys).b()};d.dk=function(a){a=(new bq).l(a);null===this.Ef?this.Ef=a:(this.Tg.Ug=a,a.rk=this.Tg);return this.Tg=a};d.lh=function(a){this.jb=a};d.E=function(a){return null!==jl(this,a)};d.nh=function(a){this.W=a};d.hb=function(a){return Mv(this,a)};d.bd=function(a){return null===kl(this,a,null)};d.Sb=function(a){return this.Eb().Xa(this).uh(a)};d.of=function(a){var b=this.Eb().Xa(this);a=a.xa();return Dk(b,a)};
d.wh=function(a){this.ad=a};d.ph=function(a){this.Yc=a};d.oh=function(a){this.wb=a};d.$classData=p({ht:0},!1,"scala.collection.mutable.LinkedHashSet",{ht:1,Sl:1,Rl:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,ee:1,fe:1,ae:1,Yl:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,Zl:1,eg:1,Pb:1,Nb:1,Lb:1,He:1,de:1,Oc:1,xc:1,bt:1,et:1,g:1,f:1});function Zr(){this.ad=0;this.W=null;this.Yc=this.wb=0;this.jb=null;this.Vc=0}Zr.prototype=new Gv;Zr.prototype.constructor=Zr;d=Zr.prototype;
d.xa=function(){return this};d.b=function(){Zr.prototype.gp.call(this,null);return this};d.e=function(a){return null!==Wk(this,a)};d.Ha=function(){return this};d.gb=function(a){return Nv(this,a)};d.Na=function(){Ws||(Ws=(new Vs).b());return Ws};d.P=function(a){for(var b=0,c=this.W.d.length;b<c;){var e=this.W.d[b];null!==e&&a.e(Mb(e));b=1+b|0}};d.uh=function(a){return Nv(this,a)};d.r=function(){return this.wb};d.Sa=function(){return this};
d.z=function(){var a=new $q;if(null===this)throw R(P(),null);a.pa=this;a.Dd=0;return a};d.Eb=function(){return(new Zr).b()};d.Wh=function(){var a=(new Zr).b();return Dk(a,this)};d.gp=function(a){this.ad=450;this.W=m(v(u),[hl(gl(),32)]);this.wb=0;this.Yc=Vk().Wf(this.ad,hl(gl(),32));this.jb=null;this.Vc=Qk(this);null!==a&&(this.ad=a.fq(),this.W=a.nv(),this.wb=a.wb,this.Yc=a.Yc,this.Vc=a.Vc,this.jb=a.jb);return this};d.E=function(a){return null!==Wk(this,a)};d.hb=function(a){return Nv(this,a)};
d.bd=function(a){return Sk(this,a)};d.Sb=function(a){var b=(new Zr).b();return Nv(Dk(b,this),a)};d.of=function(a){var b=(new Zr).b(),b=Dk(b,this);a=a.xa();return Dk(b,a)};function Nv(a,b){Sk(a,b);return a}d.$classData=p({$s:0},!1,"scala.collection.mutable.HashSet",{$s:1,Sl:1,Rl:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,ee:1,fe:1,ae:1,Yl:1,Ab:1,y:1,ub:1,zb:1,Cb:1,Bb:1,qa:1,Zl:1,eg:1,Pb:1,Nb:1,Lb:1,He:1,de:1,Oc:1,xc:1,fv:1,gv:1,lc:1,g:1,f:1});
function Yd(){this.ze=this.db=null;this.Jg=!1;this.Vd=0}Yd.prototype=new Iv;Yd.prototype.constructor=Yd;d=Yd.prototype;d.b=function(){this.db=B();this.Jg=!1;this.Vd=0;return this};d.Za=function(a){if(0>a||a>=this.Vd)throw(new W).h(""+a);return Ot(this.db,a)};d.hd=function(a){return 0>a?1:St(this.db,a)};d.Kb=function(a){return Nt(this.db,a)};d.e=function(a){return this.Za(a|0)};d.i=function(){return 0===this.Vd};function $d(a){a.Jg=!a.i();return a.db}d.Ha=function(){return this};
d.n=function(a){return a&&a.$classData&&a.$classData.m.Xl?this.db.n(a.db):zr(a)?this.Kb(a):!1};d.Be=function(a,b,c){return dk(this.db,a,b,c)};d.gb=function(a){return Zd(this,a)};d.Fb=function(a){return Pt(this.db,a)};d.Na=function(){ot||(ot=(new nt).b());return ot};d.P=function(a){for(var b=this.db;!b.i();)a.e(b.ra()),b=b.Xc()};d.dc=function(a,b){return Qt(this.db,a,b)};d.Sa=function(){return $d(this)};d.z=function(){var a=new kr;a.Bf=this.i()?B():this.db;return a};d.Zb=function(a,b){qn(this,a,b)};
d.ja=function(){return this.Vd};d.he=function(){return this};d.Db=function(){return this.db.Db()};d.le=function(a,b,c,e){return gk(this.db,a,b,c,e)};function Zd(a,b){if(a.Jg&&!a.i()){var c=a.db,e=a.ze.lf;a.db=B();a.ze=null;a.Jg=!1;for(a.Vd=0;c!==e;)Zd(a,c.ra()),c=c.Xc()}a.i()?(a.ze=sb(new tb,b,B()),a.db=a.ze):(c=a.ze,a.ze=sb(new tb,b,B()),c.lf=a.ze);a.Vd=1+a.Vd|0;return a}d.Vb=function(a){return Rt(this.db,a|0)};d.Le=function(a,b){return Qt(this.db,a,b)};d.hb=function(a){return Zd(this,a)};d.Qb=function(){};
d.Xa=function(a){a:b:for(;;){var b=a;if(null!==b&&b===this){a=this.Vd;b=this.da();if(!(0>=a)){b.Zb(a,this);for(var c=0,e=this.z();c<a&&e.x();)b.hb(e.s()),c=1+c|0}a=b.Sa();continue b}a=Dk(this,a);break a}return a};d.rc=function(){return"ListBuffer"};
d.$classData=p({Xl:0},!1,"scala.collection.mutable.ListBuffer",{Xl:1,Ql:1,aj:1,Fd:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Qc:1,Da:1,y:1,Pc:1,Dc:1,Ec:1,dj:1,ee:1,fe:1,ae:1,ej:1,de:1,Oc:1,xc:1,Tl:1,Ul:1,Nb:1,Lb:1,He:1,eg:1,qa:1,hg:1,Pb:1,dv:1,cv:1,ev:1,g:1,f:1});function ek(){this.oa=null}ek.prototype=new Gu;ek.prototype.constructor=ek;d=ek.prototype;d.xa=function(){return this};d.b=function(){ek.prototype.cp.call(this,16,"");return this};
d.Za=function(a){a=65535&(this.oa.Ua.charCodeAt(a)|0);return vo(a)};d.hd=function(a){return Ht(this,a)};d.Kb=function(a){return It(this,a)};d.e=function(a){a=65535&(this.oa.Ua.charCodeAt(a|0)|0);return vo(a)};d.i=function(){return 0===this.ja()};d.Ha=function(){return this};d.lj=function(a,b){return this.oa.Ua.substring(a,b)};d.gb=function(a){Tm(this.oa,null===a?0:a.X);return this};d.Fb=function(a){return Jt(this,a)};d.Na=function(){ws||(ws=(new vs).b());return ws};d.j=function(){return this.oa.Ua};
d.P=function(a){Kt(this,a)};d.dc=function(a,b){var c=this.oa.ja();return Lt(this,c,a,b)};d.Sa=function(){return this.oa.Ua};function kk(a,b){var c=a.oa;c.Ua=""+c.Ua+b;return a}d.z=function(){return eg(new O,this,this.oa.ja())};d.kh=function(){return this};d.Zb=function(a,b){qn(this,a,b)};d.cp=function(a,b){a=(new zp).vc((b.length|0)+a|0);a.Ua=""+a.Ua+b;ek.prototype.ni.call(this,a);return this};d.ja=function(){return this.oa.ja()};d.he=function(){return this};d.Id=function(){return this.oa.ja()};
d.ld=function(){return this};d.ni=function(a){this.oa=a;return this};function lk(a,b){var c=a.oa;c.Ua+=""+b;return a}d.Vb=function(a){return vq(this,a|0)};d.hb=function(a){Tm(this.oa,null===a?0:a.X);return this};d.Qb=function(){};d.pe=function(a,b,c){Mt(this,a,b,c)};d.p=function(){return Xm(Rj(),this)};d.da=function(){return aq(new $p,(new ek).b())};d.Xa=function(a){return Dk(this,a)};
d.$classData=p({st:0},!1,"scala.collection.mutable.StringBuilder",{st:1,aj:1,Fd:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Qc:1,Da:1,y:1,Pc:1,Dc:1,Ec:1,dj:1,ee:1,fe:1,ae:1,ej:1,de:1,Oc:1,xc:1,xi:1,Vl:1,bg:1,Ee:1,cj:1,Nl:1,cg:1,xl:1,yc:1,hg:1,Pb:1,Nb:1,Lb:1,g:1,f:1});function H(){this.la=null}H.prototype=new Iv;H.prototype.constructor=H;d=H.prototype;d.xa=function(){return this};d.b=function(){H.prototype.Oa.call(this,[]);return this};d.Za=function(a){return this.la[a]};
d.hd=function(a){return Ht(this,a)};d.Kb=function(a){return It(this,a)};d.e=function(a){return this.la[a|0]};d.i=function(){return 0===this.ja()};d.Ha=function(){return this};d.gb=function(a){this.la.push(a);return this};d.Fb=function(a){return Jt(this,a)};d.Na=function(){ys||(ys=(new xs).b());return ys};d.P=function(a){Kt(this,a)};d.dc=function(a,b){return Lt(this,this.la.length|0,a,b)};d.Sa=function(){return this};d.z=function(){return eg(new O,this,this.la.length|0)};d.kh=function(){return this};
d.Zb=function(a,b){qn(this,a,b)};d.ja=function(){return this.la.length|0};d.he=function(){return this};d.Id=function(){return this.la.length|0};d.ld=function(){return this};d.Vb=function(a){return vq(this,a|0)};d.hb=function(a){this.la.push(a);return this};d.Qb=function(){};d.pe=function(a,b,c){Mt(this,a,b,c)};d.p=function(){return Xm(Rj(),this)};d.Oa=function(a){this.la=a;return this};d.rc=function(){return"WrappedArray"};
d.$classData=p({bm:0},!1,"scala.scalajs.js.WrappedArray",{bm:1,Ql:1,aj:1,Fd:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Qc:1,Da:1,y:1,Pc:1,Dc:1,Ec:1,dj:1,ee:1,fe:1,ae:1,ej:1,de:1,Oc:1,xc:1,Tl:1,Ul:1,Nb:1,Lb:1,He:1,eg:1,qa:1,Vl:1,bg:1,Ee:1,cj:1,Qs:1,Wl:1,cg:1,Pb:1});function er(){this.Lk=0;this.la=null;this.La=0}er.prototype=new Iv;er.prototype.constructor=er;d=er.prototype;d.xa=function(){return this};
function au(a,b){mv(a,1+a.La|0);a.la.d[a.La]=b;a.La=1+a.La|0;return a}d.b=function(){er.prototype.vc.call(this,16);return this};d.Za=function(a){return lv(this,a)};d.hd=function(a){return Ht(this,a)};d.Kb=function(a){return It(this,a)};d.e=function(a){return lv(this,a|0)};d.i=function(){return 0===this.ja()};d.Ha=function(){return this};d.gb=function(a){return au(this,a)};d.Fb=function(a){return Jt(this,a)};d.Na=function(){mt||(mt=(new lt).b());return mt};
d.P=function(a){for(var b=0,c=this.La;b<c;)a.e(this.la.d[b]),b=1+b|0};d.dc=function(a,b){return Lt(this,this.La,a,b)};d.Sa=function(){return this};d.z=function(){return eg(new O,this,this.La)};d.kh=function(){return this};d.Zb=function(a,b){qn(this,a,b)};d.vc=function(a){a=this.Lk=a;this.la=m(v(u),[1<a?a:1]);this.La=0;return this};d.ja=function(){return this.La};d.he=function(){return this};d.Id=function(){return this.La};d.ld=function(){return this};d.Vb=function(a){return vq(this,a|0)};
d.hb=function(a){return au(this,a)};d.Qb=function(a){a>this.La&&1<=a&&(a=m(v(u),[a]),Ka(this.la,0,a,0,this.La),this.la=a)};d.pe=function(a,b,c){var e=Ll(T(),a)-b|0;c=c<e?c:e;e=this.La;c=c<e?c:e;0<c&&Ip(Kp(),this.la,0,a,b,c)};d.p=function(){return Xm(Rj(),this)};d.Xa=function(a){if(a&&a.$classData&&a.$classData.m.Ee){var b=a.ja();mv(this,this.La+b|0);a.pe(this.la,this.La,b);this.La=this.La+b|0;a=this}else a=Dk(this,a);return a};d.rc=function(){return"ArrayBuffer"};
d.$classData=p({Os:0},!1,"scala.collection.mutable.ArrayBuffer",{Os:1,Ql:1,aj:1,Fd:1,$:1,aa:1,c:1,U:1,M:1,O:1,N:1,u:1,t:1,J:1,L:1,S:1,V:1,T:1,R:1,I:1,K:1,k:1,Qc:1,Da:1,y:1,Pc:1,Dc:1,Ec:1,dj:1,ee:1,fe:1,ae:1,ej:1,de:1,Oc:1,xc:1,Tl:1,Ul:1,Nb:1,Lb:1,He:1,eg:1,qa:1,Wl:1,cj:1,Ee:1,cg:1,Pb:1,iv:1,Vl:1,bg:1,lc:1,g:1,f:1});Eh||(Eh=(new Dh).b());new (v(la).Xh)([]);lh||(lh=(new kh).b());var Ov=lh.tf(),gh=Ne(),Pv=(0===(268435456&gh.Y)?fh():gh.ai).getElementById("container"),Qv=mb().Ba;
Ov.Uf.e(hb.render(Ov.v,Pv,hc(y(),Qv)));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var m=__webpack_require__(2),n=__webpack_require__(3),p=__webpack_require__(1),q="function"===typeof Symbol&&Symbol["for"],r=q?Symbol["for"]("react.element"):60103,t=q?Symbol["for"]("react.call"):60104,u=q?Symbol["for"]("react.return"):60105,v=q?Symbol["for"]("react.portal"):60106,w=q?Symbol["for"]("react.fragment"):60107,x="function"===typeof Symbol&&Symbol.iterator;
function y(a){for(var b=arguments.length-1,e="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,c=0;c<b;c++)e+="\x26args[]\x3d"+encodeURIComponent(arguments[c+1]);b=Error(e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}
var z={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function A(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}A.prototype.isReactComponent={};A.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?y("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};A.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function B(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}function C(){}C.prototype=A.prototype;var D=B.prototype=new C;D.constructor=B;m(D,A.prototype);D.isPureReactComponent=!0;function E(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}var F=E.prototype=new C;F.constructor=E;m(F,A.prototype);F.unstable_isAsyncReactComponent=!0;F.render=function(){return this.props.children};var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
function J(a,b,e){var c,d={},g=null,k=null;if(null!=b)for(c in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)H.call(b,c)&&!I.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var h=Array(f),l=0;l<f;l++)h[l]=arguments[l+2];d.children=h}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return{$$typeof:r,type:a,key:g,ref:k,props:d,_owner:G.current}}function K(a){return"object"===typeof a&&null!==a&&a.$$typeof===r}
function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var L=/\/+/g,M=[];function N(a,b,e,c){if(M.length){var d=M.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return{result:a,keyPrefix:b,func:e,context:c,count:0}}function O(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>M.length&&M.push(a)}
function P(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case r:case t:case u:case v:g=!0}}if(g)return e(c,a,""===b?"."+Q(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+Q(d,k);g+=P(d,f,e,c)}else if(null===a||"undefined"===typeof a?f=null:(f=x&&a[x]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=
f.call(a),k=0;!(d=a.next()).done;)d=d.value,f=b+Q(d,k++),g+=P(d,f,e,c);else"object"===d&&(e=""+a,y("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function R(a,b){a.func.call(a.context,b,a.count++)}
function S(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?T(a,c,e,p.thatReturnsArgument):null!=a&&(K(a)&&(b=d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(L,"$\x26/")+"/")+e,a={$$typeof:r,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}),c.push(a))}function T(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(L,"$\x26/")+"/");b=N(b,g,c,d);null==a||P(a,"",S,b);O(b)}
var U={Children:{map:function(a,b,e){if(null==a)return a;var c=[];T(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=N(null,null,b,e);null==a||P(a,"",R,b);O(b)},count:function(a){return null==a?0:P(a,"",p.thatReturnsNull,null)},toArray:function(a){var b=[];T(a,b,null,p.thatReturnsArgument);return b},only:function(a){K(a)?void 0:y("143");return a}},Component:A,PureComponent:B,unstable_AsyncComponent:E,Fragment:w,createElement:J,cloneElement:function(a,b,e){var c=m({},a.props),
d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)H.call(b,h)&&!I.hasOwnProperty(h)&&(c[h]=void 0===b[h]&&void 0!==f?f[h]:b[h])}var h=arguments.length-2;if(1===h)c.children=e;else if(1<h){f=Array(h);for(var l=0;l<h;l++)f[l]=arguments[l+2];c.children=f}return{$$typeof:r,type:a.type,key:d,ref:g,props:c,_owner:k}},createFactory:function(a){var b=J.bind(null,a);b.type=a;return b},
isValidElement:K,version:"16.2.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:G,assign:m}},V=Object.freeze({default:U}),W=V&&U||V;module.exports=W["default"]?W["default"]:W;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.2.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

var _assign = __webpack_require__(2);
var emptyObject = __webpack_require__(3);
var invariant = __webpack_require__(5);
var warning = __webpack_require__(6);
var emptyFunction = __webpack_require__(1);
var checkPropTypes = __webpack_require__(7);

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.2.0';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function PureComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

function AsyncComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
asyncComponentPrototype.constructor = AsyncComponent;
// Avoid an extra prototype jump for these methods.
_assign(asyncComponentPrototype, Component.prototype);
asyncComponentPrototype.unstable_isAsyncReactComponent = true;
asyncComponentPrototype.render = function () {
  return this.props.children;
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown;
var specialPropRefWarningShown;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var ReactDebugCurrentFrame = {};

{
  // Component that is being worked on
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      return impl();
    }
    return null;
  };
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_CALL_TYPE:
          case REACT_RETURN_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

function getComponentName(fiber) {
  var type = fiber.type;

  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function') {
    return type.displayName || type.name;
  }
  return null;
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

{
  var currentlyValidatingElement = null;

  var propTypesMisspellWarningShown = false;

  var getDisplayName = function (element) {
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else if (element.type === REACT_FRAGMENT_TYPE) {
      return 'React.Fragment';
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  };

  var getStackAddendum = function () {
    var stack = '';
    if (currentlyValidatingElement) {
      var name = getDisplayName(currentlyValidatingElement);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
    }
    stack += ReactDebugCurrentFrame.getStackAddendum() || '';
    return stack;
  };

  var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
  }

  currentlyValidatingElement = element;
  {
    warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
  }
  currentlyValidatingElement = null;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  var propTypes = componentClass.propTypes;
  if (propTypes) {
    currentlyValidatingElement = element;
    checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
    currentlyValidatingElement = null;
  } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  currentlyValidatingElement = fragment;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (!VALID_FRAGMENT_PROPS.has(key)) {
        warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (fragment.ref !== null) {
    warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
  }

  currentlyValidatingElement = null;
}

function createElementWithValidation(type, props, children) {
  var validType = typeof type === 'string' || typeof type === 'function' || typeof type === 'symbol' || typeof type === 'number';
  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    info += getStackAddendum() || '';

    warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (typeof type === 'symbol' && type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  // Legacy hook TODO: Warn if this is accessed
  validatedFactory.type = type;

  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  Component: Component,
  PureComponent: PureComponent,
  unstable_AsyncComponent: AsyncComponent,

  Fragment: REACT_FRAGMENT_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: _assign
  }
};

{
  _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3['default'] ? React$3['default'] : React$3;

module.exports = react;
  })();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (process.env.NODE_ENV !== 'production') {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (process.env.NODE_ENV === 'production') {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(21);
} else {
  module.exports = __webpack_require__(24);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react-dom.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(4),l=__webpack_require__(8),B=__webpack_require__(2),C=__webpack_require__(1),ba=__webpack_require__(9),da=__webpack_require__(10),ea=__webpack_require__(11),fa=__webpack_require__(12),ia=__webpack_require__(13),D=__webpack_require__(3);
function E(a){for(var b=arguments.length-1,c="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,d=0;d<b;d++)c+="\x26args[]\x3d"+encodeURIComponent(arguments[d+1]);b=Error(c+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}aa?void 0:E("227");
var oa={children:!0,dangerouslySetInnerHTML:!0,defaultValue:!0,defaultChecked:!0,innerHTML:!0,suppressContentEditableWarning:!0,suppressHydrationWarning:!0,style:!0};function pa(a,b){return(a&b)===b}
var ta={MUST_USE_PROPERTY:1,HAS_BOOLEAN_VALUE:4,HAS_NUMERIC_VALUE:8,HAS_POSITIVE_NUMERIC_VALUE:24,HAS_OVERLOADED_BOOLEAN_VALUE:32,HAS_STRING_BOOLEAN_VALUE:64,injectDOMPropertyConfig:function(a){var b=ta,c=a.Properties||{},d=a.DOMAttributeNamespaces||{},e=a.DOMAttributeNames||{};a=a.DOMMutationMethods||{};for(var f in c){ua.hasOwnProperty(f)?E("48",f):void 0;var g=f.toLowerCase(),h=c[f];g={attributeName:g,attributeNamespace:null,propertyName:f,mutationMethod:null,mustUseProperty:pa(h,b.MUST_USE_PROPERTY),
hasBooleanValue:pa(h,b.HAS_BOOLEAN_VALUE),hasNumericValue:pa(h,b.HAS_NUMERIC_VALUE),hasPositiveNumericValue:pa(h,b.HAS_POSITIVE_NUMERIC_VALUE),hasOverloadedBooleanValue:pa(h,b.HAS_OVERLOADED_BOOLEAN_VALUE),hasStringBooleanValue:pa(h,b.HAS_STRING_BOOLEAN_VALUE)};1>=g.hasBooleanValue+g.hasNumericValue+g.hasOverloadedBooleanValue?void 0:E("50",f);e.hasOwnProperty(f)&&(g.attributeName=e[f]);d.hasOwnProperty(f)&&(g.attributeNamespace=d[f]);a.hasOwnProperty(f)&&(g.mutationMethod=a[f]);ua[f]=g}}},ua={};
function va(a,b){if(oa.hasOwnProperty(a)||2<a.length&&("o"===a[0]||"O"===a[0])&&("n"===a[1]||"N"===a[1]))return!1;if(null===b)return!0;switch(typeof b){case "boolean":return oa.hasOwnProperty(a)?a=!0:(b=wa(a))?a=b.hasBooleanValue||b.hasStringBooleanValue||b.hasOverloadedBooleanValue:(a=a.toLowerCase().slice(0,5),a="data-"===a||"aria-"===a),a;case "undefined":case "number":case "string":case "object":return!0;default:return!1}}function wa(a){return ua.hasOwnProperty(a)?ua[a]:null}
var xa=ta,ya=xa.MUST_USE_PROPERTY,K=xa.HAS_BOOLEAN_VALUE,za=xa.HAS_NUMERIC_VALUE,Aa=xa.HAS_POSITIVE_NUMERIC_VALUE,Ba=xa.HAS_OVERLOADED_BOOLEAN_VALUE,Ca=xa.HAS_STRING_BOOLEAN_VALUE,Da={Properties:{allowFullScreen:K,async:K,autoFocus:K,autoPlay:K,capture:Ba,checked:ya|K,cols:Aa,contentEditable:Ca,controls:K,"default":K,defer:K,disabled:K,download:Ba,draggable:Ca,formNoValidate:K,hidden:K,loop:K,multiple:ya|K,muted:ya|K,noValidate:K,open:K,playsInline:K,readOnly:K,required:K,reversed:K,rows:Aa,rowSpan:za,
scoped:K,seamless:K,selected:ya|K,size:Aa,start:za,span:Aa,spellCheck:Ca,style:0,tabIndex:0,itemScope:K,acceptCharset:0,className:0,htmlFor:0,httpEquiv:0,value:Ca},DOMAttributeNames:{acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv"},DOMMutationMethods:{value:function(a,b){if(null==b)return a.removeAttribute("value");"number"!==a.type||!1===a.hasAttribute("value")?a.setAttribute("value",""+b):a.validity&&!a.validity.badInput&&a.ownerDocument.activeElement!==a&&
a.setAttribute("value",""+b)}}},Ea=xa.HAS_STRING_BOOLEAN_VALUE,M={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},Ga={Properties:{autoReverse:Ea,externalResourcesRequired:Ea,preserveAlpha:Ea},DOMAttributeNames:{autoReverse:"autoReverse",externalResourcesRequired:"externalResourcesRequired",preserveAlpha:"preserveAlpha"},DOMAttributeNamespaces:{xlinkActuate:M.xlink,xlinkArcrole:M.xlink,xlinkHref:M.xlink,xlinkRole:M.xlink,xlinkShow:M.xlink,xlinkTitle:M.xlink,xlinkType:M.xlink,
xmlBase:M.xml,xmlLang:M.xml,xmlSpace:M.xml}},Ha=/[\-\:]([a-z])/g;function Ia(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode x-height xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xmlns:xlink xml:lang xml:space".split(" ").forEach(function(a){var b=a.replace(Ha,
Ia);Ga.Properties[b]=0;Ga.DOMAttributeNames[b]=a});xa.injectDOMPropertyConfig(Da);xa.injectDOMPropertyConfig(Ga);
var P={_caughtError:null,_hasCaughtError:!1,_rethrowError:null,_hasRethrowError:!1,injection:{injectErrorUtils:function(a){"function"!==typeof a.invokeGuardedCallback?E("197"):void 0;Ja=a.invokeGuardedCallback}},invokeGuardedCallback:function(a,b,c,d,e,f,g,h,k){Ja.apply(P,arguments)},invokeGuardedCallbackAndCatchFirstError:function(a,b,c,d,e,f,g,h,k){P.invokeGuardedCallback.apply(this,arguments);if(P.hasCaughtError()){var q=P.clearCaughtError();P._hasRethrowError||(P._hasRethrowError=!0,P._rethrowError=
q)}},rethrowCaughtError:function(){return Ka.apply(P,arguments)},hasCaughtError:function(){return P._hasCaughtError},clearCaughtError:function(){if(P._hasCaughtError){var a=P._caughtError;P._caughtError=null;P._hasCaughtError=!1;return a}E("198")}};function Ja(a,b,c,d,e,f,g,h,k){P._hasCaughtError=!1;P._caughtError=null;var q=Array.prototype.slice.call(arguments,3);try{b.apply(c,q)}catch(v){P._caughtError=v,P._hasCaughtError=!0}}
function Ka(){if(P._hasRethrowError){var a=P._rethrowError;P._rethrowError=null;P._hasRethrowError=!1;throw a;}}var La=null,Ma={};
function Na(){if(La)for(var a in Ma){var b=Ma[a],c=La.indexOf(a);-1<c?void 0:E("96",a);if(!Oa[c]){b.extractEvents?void 0:E("97",a);Oa[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;Pa.hasOwnProperty(h)?E("99",h):void 0;Pa[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&Qa(k[e],g,h);e=!0}else f.registrationName?(Qa(f.registrationName,g,h),e=!0):e=!1;e?void 0:E("98",d,a)}}}}
function Qa(a,b,c){Ra[a]?E("100",a):void 0;Ra[a]=b;Sa[a]=b.eventTypes[c].dependencies}var Oa=[],Pa={},Ra={},Sa={};function Ta(a){La?E("101"):void 0;La=Array.prototype.slice.call(a);Na()}function Ua(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];Ma.hasOwnProperty(c)&&Ma[c]===d||(Ma[c]?E("102",c):void 0,Ma[c]=d,b=!0)}b&&Na()}
var Va=Object.freeze({plugins:Oa,eventNameDispatchConfigs:Pa,registrationNameModules:Ra,registrationNameDependencies:Sa,possibleRegistrationNames:null,injectEventPluginOrder:Ta,injectEventPluginsByName:Ua}),Wa=null,Xa=null,Ya=null;function Za(a,b,c,d){b=a.type||"unknown-event";a.currentTarget=Ya(d);P.invokeGuardedCallbackAndCatchFirstError(b,c,void 0,a);a.currentTarget=null}
function $a(a,b){null==b?E("30"):void 0;if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}function ab(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a)}var bb=null;
function cb(a,b){if(a){var c=a._dispatchListeners,d=a._dispatchInstances;if(Array.isArray(c))for(var e=0;e<c.length&&!a.isPropagationStopped();e++)Za(a,b,c[e],d[e]);else c&&Za(a,b,c,d);a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a)}}function db(a){return cb(a,!0)}function gb(a){return cb(a,!1)}var hb={injectEventPluginOrder:Ta,injectEventPluginsByName:Ua};
function ib(a,b){var c=a.stateNode;if(!c)return null;var d=Wa(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;c&&"function"!==typeof c?E("231",b,typeof c):void 0;
return c}function jb(a,b,c,d){for(var e,f=0;f<Oa.length;f++){var g=Oa[f];g&&(g=g.extractEvents(a,b,c,d))&&(e=$a(e,g))}return e}function kb(a){a&&(bb=$a(bb,a))}function lb(a){var b=bb;bb=null;b&&(a?ab(b,db):ab(b,gb),bb?E("95"):void 0,P.rethrowCaughtError())}var mb=Object.freeze({injection:hb,getListener:ib,extractEvents:jb,enqueueEvents:kb,processEventQueue:lb}),nb=Math.random().toString(36).slice(2),Q="__reactInternalInstance$"+nb,ob="__reactEventHandlers$"+nb;
function pb(a){if(a[Q])return a[Q];for(var b=[];!a[Q];)if(b.push(a),a.parentNode)a=a.parentNode;else return null;var c=void 0,d=a[Q];if(5===d.tag||6===d.tag)return d;for(;a&&(d=a[Q]);a=b.pop())c=d;return c}function qb(a){if(5===a.tag||6===a.tag)return a.stateNode;E("33")}function rb(a){return a[ob]||null}
var sb=Object.freeze({precacheFiberNode:function(a,b){b[Q]=a},getClosestInstanceFromNode:pb,getInstanceFromNode:function(a){a=a[Q];return!a||5!==a.tag&&6!==a.tag?null:a},getNodeFromInstance:qb,getFiberCurrentPropsFromNode:rb,updateFiberProps:function(a,b){a[ob]=b}});function tb(a){do a=a["return"];while(a&&5!==a.tag);return a?a:null}function ub(a,b,c){for(var d=[];a;)d.push(a),a=tb(a);for(a=d.length;0<a--;)b(d[a],"captured",c);for(a=0;a<d.length;a++)b(d[a],"bubbled",c)}
function vb(a,b,c){if(b=ib(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=$a(c._dispatchListeners,b),c._dispatchInstances=$a(c._dispatchInstances,a)}function wb(a){a&&a.dispatchConfig.phasedRegistrationNames&&ub(a._targetInst,vb,a)}function xb(a){if(a&&a.dispatchConfig.phasedRegistrationNames){var b=a._targetInst;b=b?tb(b):null;ub(b,vb,a)}}
function yb(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=ib(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=$a(c._dispatchListeners,b),c._dispatchInstances=$a(c._dispatchInstances,a))}function zb(a){a&&a.dispatchConfig.registrationName&&yb(a._targetInst,null,a)}function Ab(a){ab(a,wb)}
function Bb(a,b,c,d){if(c&&d)a:{var e=c;for(var f=d,g=0,h=e;h;h=tb(h))g++;h=0;for(var k=f;k;k=tb(k))h++;for(;0<g-h;)e=tb(e),g--;for(;0<h-g;)f=tb(f),h--;for(;g--;){if(e===f||e===f.alternate)break a;e=tb(e);f=tb(f)}e=null}else e=null;f=e;for(e=[];c&&c!==f;){g=c.alternate;if(null!==g&&g===f)break;e.push(c);c=tb(c)}for(c=[];d&&d!==f;){g=d.alternate;if(null!==g&&g===f)break;c.push(d);d=tb(d)}for(d=0;d<e.length;d++)yb(e[d],"bubbled",a);for(a=c.length;0<a--;)yb(c[a],"captured",b)}
var Cb=Object.freeze({accumulateTwoPhaseDispatches:Ab,accumulateTwoPhaseDispatchesSkipTarget:function(a){ab(a,xb)},accumulateEnterLeaveDispatches:Bb,accumulateDirectDispatches:function(a){ab(a,zb)}}),Db=null;function Eb(){!Db&&l.canUseDOM&&(Db="textContent"in document.documentElement?"textContent":"innerText");return Db}var S={_root:null,_startText:null,_fallbackText:null};
function Fb(){if(S._fallbackText)return S._fallbackText;var a,b=S._startText,c=b.length,d,e=Gb(),f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);S._fallbackText=e.slice(a,1<d?1-d:void 0);return S._fallbackText}function Gb(){return"value"in S._root?S._root.value:S._root[Eb()]}
var Hb="dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),Ib={type:null,target:null,currentTarget:C.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
function T(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?C.thatReturnsTrue:C.thatReturnsFalse;this.isPropagationStopped=C.thatReturnsFalse;return this}
B(T.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=C.thatReturnsTrue)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=C.thatReturnsTrue)},persist:function(){this.isPersistent=C.thatReturnsTrue},isPersistent:C.thatReturnsFalse,
destructor:function(){var a=this.constructor.Interface,b;for(b in a)this[b]=null;for(a=0;a<Hb.length;a++)this[Hb[a]]=null}});T.Interface=Ib;T.augmentClass=function(a,b){function c(){}c.prototype=this.prototype;var d=new c;B(d,a.prototype);a.prototype=d;a.prototype.constructor=a;a.Interface=B({},this.Interface,b);a.augmentClass=this.augmentClass;Jb(a)};Jb(T);function Kb(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}
function Lb(a){a instanceof this?void 0:E("223");a.destructor();10>this.eventPool.length&&this.eventPool.push(a)}function Jb(a){a.eventPool=[];a.getPooled=Kb;a.release=Lb}function Mb(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(Mb,{data:null});function Nb(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(Nb,{data:null});var Pb=[9,13,27,32],Vb=l.canUseDOM&&"CompositionEvent"in window,Wb=null;l.canUseDOM&&"documentMode"in document&&(Wb=document.documentMode);var Xb;
if(Xb=l.canUseDOM&&"TextEvent"in window&&!Wb){var Yb=window.opera;Xb=!("object"===typeof Yb&&"function"===typeof Yb.version&&12>=parseInt(Yb.version(),10))}
var Zb=Xb,$b=l.canUseDOM&&(!Vb||Wb&&8<Wb&&11>=Wb),ac=String.fromCharCode(32),bc={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["topCompositionEnd","topKeyPress","topTextInput","topPaste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"topBlur topCompositionEnd topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
captured:"onCompositionStartCapture"},dependencies:"topBlur topCompositionStart topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"topBlur topCompositionUpdate topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")}},cc=!1;
function dc(a,b){switch(a){case "topKeyUp":return-1!==Pb.indexOf(b.keyCode);case "topKeyDown":return 229!==b.keyCode;case "topKeyPress":case "topMouseDown":case "topBlur":return!0;default:return!1}}function ec(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var fc=!1;function gc(a,b){switch(a){case "topCompositionEnd":return ec(b);case "topKeyPress":if(32!==b.which)return null;cc=!0;return ac;case "topTextInput":return a=b.data,a===ac&&cc?null:a;default:return null}}
function hc(a,b){if(fc)return"topCompositionEnd"===a||!Vb&&dc(a,b)?(a=Fb(),S._root=null,S._startText=null,S._fallbackText=null,fc=!1,a):null;switch(a){case "topPaste":return null;case "topKeyPress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "topCompositionEnd":return $b?null:b.data;default:return null}}
var ic={eventTypes:bc,extractEvents:function(a,b,c,d){var e;if(Vb)b:{switch(a){case "topCompositionStart":var f=bc.compositionStart;break b;case "topCompositionEnd":f=bc.compositionEnd;break b;case "topCompositionUpdate":f=bc.compositionUpdate;break b}f=void 0}else fc?dc(a,c)&&(f=bc.compositionEnd):"topKeyDown"===a&&229===c.keyCode&&(f=bc.compositionStart);f?($b&&(fc||f!==bc.compositionStart?f===bc.compositionEnd&&fc&&(e=Fb()):(S._root=d,S._startText=Gb(),fc=!0)),f=Mb.getPooled(f,b,c,d),e?f.data=
e:(e=ec(c),null!==e&&(f.data=e)),Ab(f),e=f):e=null;(a=Zb?gc(a,c):hc(a,c))?(b=Nb.getPooled(bc.beforeInput,b,c,d),b.data=a,Ab(b)):b=null;return[e,b]}},jc=null,kc=null,lc=null;function mc(a){if(a=Xa(a)){jc&&"function"===typeof jc.restoreControlledState?void 0:E("194");var b=Wa(a.stateNode);jc.restoreControlledState(a.stateNode,a.type,b)}}var nc={injectFiberControlledHostComponent:function(a){jc=a}};function oc(a){kc?lc?lc.push(a):lc=[a]:kc=a}
function pc(){if(kc){var a=kc,b=lc;lc=kc=null;mc(a);if(b)for(a=0;a<b.length;a++)mc(b[a])}}var qc=Object.freeze({injection:nc,enqueueStateRestore:oc,restoreStateIfNeeded:pc});function rc(a,b){return a(b)}var sc=!1;function tc(a,b){if(sc)return rc(a,b);sc=!0;try{return rc(a,b)}finally{sc=!1,pc()}}var uc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};
function vc(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!uc[a.type]:"textarea"===b?!0:!1}function wc(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var xc;l.canUseDOM&&(xc=document.implementation&&document.implementation.hasFeature&&!0!==document.implementation.hasFeature("",""));
function yc(a,b){if(!l.canUseDOM||b&&!("addEventListener"in document))return!1;b="on"+a;var c=b in document;c||(c=document.createElement("div"),c.setAttribute(b,"return;"),c="function"===typeof c[b]);!c&&xc&&"wheel"===a&&(c=document.implementation.hasFeature("Events.wheel","3.0"));return c}function zc(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ac(a){var b=zc(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"function"===typeof c.get&&"function"===typeof c.set)return Object.defineProperty(a,b,{enumerable:c.enumerable,configurable:!0,get:function(){return c.get.call(this)},set:function(a){d=""+a;c.set.call(this,a)}}),{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=null;delete a[b]}}}
function Bc(a){a._valueTracker||(a._valueTracker=Ac(a))}function Cc(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=zc(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}var Dc={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"topBlur topChange topClick topFocus topInput topKeyDown topKeyUp topSelectionChange".split(" ")}};
function Ec(a,b,c){a=T.getPooled(Dc.change,a,b,c);a.type="change";oc(c);Ab(a);return a}var Fc=null,Gc=null;function Hc(a){kb(a);lb(!1)}function Ic(a){var b=qb(a);if(Cc(b))return a}function Jc(a,b){if("topChange"===a)return b}var Kc=!1;l.canUseDOM&&(Kc=yc("input")&&(!document.documentMode||9<document.documentMode));function Lc(){Fc&&(Fc.detachEvent("onpropertychange",Mc),Gc=Fc=null)}function Mc(a){"value"===a.propertyName&&Ic(Gc)&&(a=Ec(Gc,a,wc(a)),tc(Hc,a))}
function Nc(a,b,c){"topFocus"===a?(Lc(),Fc=b,Gc=c,Fc.attachEvent("onpropertychange",Mc)):"topBlur"===a&&Lc()}function Oc(a){if("topSelectionChange"===a||"topKeyUp"===a||"topKeyDown"===a)return Ic(Gc)}function Pc(a,b){if("topClick"===a)return Ic(b)}function $c(a,b){if("topInput"===a||"topChange"===a)return Ic(b)}
var ad={eventTypes:Dc,_isInputEventSupported:Kc,extractEvents:function(a,b,c,d){var e=b?qb(b):window,f=e.nodeName&&e.nodeName.toLowerCase();if("select"===f||"input"===f&&"file"===e.type)var g=Jc;else if(vc(e))if(Kc)g=$c;else{g=Oc;var h=Nc}else f=e.nodeName,!f||"input"!==f.toLowerCase()||"checkbox"!==e.type&&"radio"!==e.type||(g=Pc);if(g&&(g=g(a,b)))return Ec(g,c,d);h&&h(a,e,b);"topBlur"===a&&null!=b&&(a=b._wrapperState||e._wrapperState)&&a.controlled&&"number"===e.type&&(a=""+e.value,e.getAttribute("value")!==
a&&e.setAttribute("value",a))}};function bd(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(bd,{view:null,detail:null});var cd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function dd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=cd[a])?!!b[a]:!1}function ed(){return dd}function fd(a,b,c,d){return T.call(this,a,b,c,d)}
bd.augmentClass(fd,{screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:ed,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)}});
var gd={mouseEnter:{registrationName:"onMouseEnter",dependencies:["topMouseOut","topMouseOver"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["topMouseOut","topMouseOver"]}},hd={eventTypes:gd,extractEvents:function(a,b,c,d){if("topMouseOver"===a&&(c.relatedTarget||c.fromElement)||"topMouseOut"!==a&&"topMouseOver"!==a)return null;var e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||e.parentWindow:window;"topMouseOut"===a?(a=b,b=(b=c.relatedTarget||c.toElement)?pb(b):null):a=null;if(a===
b)return null;var f=null==a?e:qb(a);e=null==b?e:qb(b);var g=fd.getPooled(gd.mouseLeave,a,c,d);g.type="mouseleave";g.target=f;g.relatedTarget=e;c=fd.getPooled(gd.mouseEnter,b,c,d);c.type="mouseenter";c.target=e;c.relatedTarget=f;Bb(g,c,a,b);return[g,c]}},id=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;function jd(a){a=a.type;return"string"===typeof a?a:"function"===typeof a?a.displayName||a.name:null}
function kd(a){var b=a;if(a.alternate)for(;b["return"];)b=b["return"];else{if(0!==(b.effectTag&2))return 1;for(;b["return"];)if(b=b["return"],0!==(b.effectTag&2))return 1}return 3===b.tag?2:3}function ld(a){return(a=a._reactInternalFiber)?2===kd(a):!1}function md(a){2!==kd(a)?E("188"):void 0}
function nd(a){var b=a.alternate;if(!b)return b=kd(a),3===b?E("188"):void 0,1===b?null:a;for(var c=a,d=b;;){var e=c["return"],f=e?e.alternate:null;if(!e||!f)break;if(e.child===f.child){for(var g=e.child;g;){if(g===c)return md(e),a;if(g===d)return md(e),b;g=g.sibling}E("188")}if(c["return"]!==d["return"])c=e,d=f;else{g=!1;for(var h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}g?
void 0:E("189")}}c.alternate!==d?E("190"):void 0}3!==c.tag?E("188"):void 0;return c.stateNode.current===c?a:b}function od(a){a=nd(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b["return"]||b["return"]===a)return null;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}return null}
function pd(a){a=nd(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child&&4!==b.tag)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b["return"]||b["return"]===a)return null;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}return null}var qd=[];
function rd(a){var b=a.targetInst;do{if(!b){a.ancestors.push(b);break}var c;for(c=b;c["return"];)c=c["return"];c=3!==c.tag?null:c.stateNode.containerInfo;if(!c)break;a.ancestors.push(b);b=pb(c)}while(b);for(c=0;c<a.ancestors.length;c++)b=a.ancestors[c],sd(a.topLevelType,b,a.nativeEvent,wc(a.nativeEvent))}var td=!0,sd=void 0;function ud(a){td=!!a}function U(a,b,c){return c?ba.listen(c,b,vd.bind(null,a)):null}function wd(a,b,c){return c?ba.capture(c,b,vd.bind(null,a)):null}
function vd(a,b){if(td){var c=wc(b);c=pb(c);null===c||"number"!==typeof c.tag||2===kd(c)||(c=null);if(qd.length){var d=qd.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d}else a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]};try{tc(rd,a)}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>qd.length&&qd.push(a)}}}
var xd=Object.freeze({get _enabled(){return td},get _handleTopLevel(){return sd},setHandleTopLevel:function(a){sd=a},setEnabled:ud,isEnabled:function(){return td},trapBubbledEvent:U,trapCapturedEvent:wd,dispatchEvent:vd});function yd(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;c["ms"+a]="MS"+b;c["O"+a]="o"+b.toLowerCase();return c}
var zd={animationend:yd("Animation","AnimationEnd"),animationiteration:yd("Animation","AnimationIteration"),animationstart:yd("Animation","AnimationStart"),transitionend:yd("Transition","TransitionEnd")},Ad={},Bd={};l.canUseDOM&&(Bd=document.createElement("div").style,"AnimationEvent"in window||(delete zd.animationend.animation,delete zd.animationiteration.animation,delete zd.animationstart.animation),"TransitionEvent"in window||delete zd.transitionend.transition);
function Cd(a){if(Ad[a])return Ad[a];if(!zd[a])return a;var b=zd[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Bd)return Ad[a]=b[c];return""}
var Dd={topAbort:"abort",topAnimationEnd:Cd("animationend")||"animationend",topAnimationIteration:Cd("animationiteration")||"animationiteration",topAnimationStart:Cd("animationstart")||"animationstart",topBlur:"blur",topCancel:"cancel",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topChange:"change",topClick:"click",topClose:"close",topCompositionEnd:"compositionend",topCompositionStart:"compositionstart",topCompositionUpdate:"compositionupdate",topContextMenu:"contextmenu",topCopy:"copy",
topCut:"cut",topDoubleClick:"dblclick",topDrag:"drag",topDragEnd:"dragend",topDragEnter:"dragenter",topDragExit:"dragexit",topDragLeave:"dragleave",topDragOver:"dragover",topDragStart:"dragstart",topDrop:"drop",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topFocus:"focus",topInput:"input",topKeyDown:"keydown",topKeyPress:"keypress",topKeyUp:"keyup",topLoadedData:"loadeddata",topLoad:"load",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",
topMouseDown:"mousedown",topMouseMove:"mousemove",topMouseOut:"mouseout",topMouseOver:"mouseover",topMouseUp:"mouseup",topPaste:"paste",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topScroll:"scroll",topSeeked:"seeked",topSeeking:"seeking",topSelectionChange:"selectionchange",topStalled:"stalled",topSuspend:"suspend",topTextInput:"textInput",topTimeUpdate:"timeupdate",topToggle:"toggle",topTouchCancel:"touchcancel",topTouchEnd:"touchend",topTouchMove:"touchmove",
topTouchStart:"touchstart",topTransitionEnd:Cd("transitionend")||"transitionend",topVolumeChange:"volumechange",topWaiting:"waiting",topWheel:"wheel"},Ed={},Fd=0,Gd="_reactListenersID"+(""+Math.random()).slice(2);function Hd(a){Object.prototype.hasOwnProperty.call(a,Gd)||(a[Gd]=Fd++,Ed[a[Gd]]={});return Ed[a[Gd]]}function Id(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Jd(a,b){var c=Id(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Id(c)}}function Kd(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&"text"===a.type||"textarea"===b||"true"===a.contentEditable)}
var Ld=l.canUseDOM&&"documentMode"in document&&11>=document.documentMode,Md={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"topBlur topContextMenu topFocus topKeyDown topKeyUp topMouseDown topMouseUp topSelectionChange".split(" ")}},Nd=null,Od=null,Pd=null,Qd=!1;
function Rd(a,b){if(Qd||null==Nd||Nd!==da())return null;var c=Nd;"selectionStart"in c&&Kd(c)?c={start:c.selectionStart,end:c.selectionEnd}:window.getSelection?(c=window.getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}):c=void 0;return Pd&&ea(Pd,c)?null:(Pd=c,a=T.getPooled(Md.select,Od,a,b),a.type="select",a.target=Nd,Ab(a),a)}
var Sd={eventTypes:Md,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:9===d.nodeType?d:d.ownerDocument,f;if(!(f=!e)){a:{e=Hd(e);f=Sa.onSelect;for(var g=0;g<f.length;g++){var h=f[g];if(!e.hasOwnProperty(h)||!e[h]){e=!1;break a}}e=!0}f=!e}if(f)return null;e=b?qb(b):window;switch(a){case "topFocus":if(vc(e)||"true"===e.contentEditable)Nd=e,Od=b,Pd=null;break;case "topBlur":Pd=Od=Nd=null;break;case "topMouseDown":Qd=!0;break;case "topContextMenu":case "topMouseUp":return Qd=!1,Rd(c,d);case "topSelectionChange":if(Ld)break;
case "topKeyDown":case "topKeyUp":return Rd(c,d)}return null}};function Td(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(Td,{animationName:null,elapsedTime:null,pseudoElement:null});function Ud(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(Ud,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}});function Vd(a,b,c,d){return T.call(this,a,b,c,d)}bd.augmentClass(Vd,{relatedTarget:null});
function Wd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;return 32<=a||13===a?a:0}
var Xd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Yd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"};function Zd(a,b,c,d){return T.call(this,a,b,c,d)}
bd.augmentClass(Zd,{key:function(a){if(a.key){var b=Xd[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=Wd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Yd[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:ed,charCode:function(a){return"keypress"===a.type?Wd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?Wd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}});function $d(a,b,c,d){return T.call(this,a,b,c,d)}fd.augmentClass($d,{dataTransfer:null});function ae(a,b,c,d){return T.call(this,a,b,c,d)}bd.augmentClass(ae,{touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:ed});function be(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(be,{propertyName:null,elapsedTime:null,pseudoElement:null});
function ce(a,b,c,d){return T.call(this,a,b,c,d)}fd.augmentClass(ce,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null});var de={},ee={};
"abort animationEnd animationIteration animationStart blur cancel canPlay canPlayThrough click close contextMenu copy cut doubleClick drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error focus input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing progress rateChange reset scroll seeked seeking stalled submit suspend timeUpdate toggle touchCancel touchEnd touchMove touchStart transitionEnd volumeChange waiting wheel".split(" ").forEach(function(a){var b=a[0].toUpperCase()+
a.slice(1),c="on"+b;b="top"+b;c={phasedRegistrationNames:{bubbled:c,captured:c+"Capture"},dependencies:[b]};de[a]=c;ee[b]=c});
var fe={eventTypes:de,extractEvents:function(a,b,c,d){var e=ee[a];if(!e)return null;switch(a){case "topKeyPress":if(0===Wd(c))return null;case "topKeyDown":case "topKeyUp":a=Zd;break;case "topBlur":case "topFocus":a=Vd;break;case "topClick":if(2===c.button)return null;case "topDoubleClick":case "topMouseDown":case "topMouseMove":case "topMouseUp":case "topMouseOut":case "topMouseOver":case "topContextMenu":a=fd;break;case "topDrag":case "topDragEnd":case "topDragEnter":case "topDragExit":case "topDragLeave":case "topDragOver":case "topDragStart":case "topDrop":a=
$d;break;case "topTouchCancel":case "topTouchEnd":case "topTouchMove":case "topTouchStart":a=ae;break;case "topAnimationEnd":case "topAnimationIteration":case "topAnimationStart":a=Td;break;case "topTransitionEnd":a=be;break;case "topScroll":a=bd;break;case "topWheel":a=ce;break;case "topCopy":case "topCut":case "topPaste":a=Ud;break;default:a=T}b=a.getPooled(e,b,c,d);Ab(b);return b}};sd=function(a,b,c,d){a=jb(a,b,c,d);kb(a);lb(!1)};hb.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));
Wa=sb.getFiberCurrentPropsFromNode;Xa=sb.getInstanceFromNode;Ya=sb.getNodeFromInstance;hb.injectEventPluginsByName({SimpleEventPlugin:fe,EnterLeaveEventPlugin:hd,ChangeEventPlugin:ad,SelectEventPlugin:Sd,BeforeInputEventPlugin:ic});var ge=[],he=-1;function V(a){0>he||(a.current=ge[he],ge[he]=null,he--)}function W(a,b){he++;ge[he]=a.current;a.current=b}new Set;var ie={current:D},X={current:!1},je=D;function ke(a){return le(a)?je:ie.current}
function me(a,b){var c=a.type.contextTypes;if(!c)return D;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function le(a){return 2===a.tag&&null!=a.type.childContextTypes}function ne(a){le(a)&&(V(X,a),V(ie,a))}
function oe(a,b,c){null!=ie.cursor?E("168"):void 0;W(ie,b,a);W(X,c,a)}function pe(a,b){var c=a.stateNode,d=a.type.childContextTypes;if("function"!==typeof c.getChildContext)return b;c=c.getChildContext();for(var e in c)e in d?void 0:E("108",jd(a)||"Unknown",e);return B({},b,c)}function qe(a){if(!le(a))return!1;var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||D;je=ie.current;W(ie,b,a);W(X,X.current,a);return!0}
function re(a,b){var c=a.stateNode;c?void 0:E("169");if(b){var d=pe(a,je);c.__reactInternalMemoizedMergedChildContext=d;V(X,a);V(ie,a);W(ie,d,a)}else V(X,a);W(X,b,a)}
function Y(a,b,c){this.tag=a;this.key=b;this.stateNode=this.type=null;this.sibling=this.child=this["return"]=null;this.index=0;this.memoizedState=this.updateQueue=this.memoizedProps=this.pendingProps=this.ref=null;this.internalContextTag=c;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.expirationTime=0;this.alternate=null}
function se(a,b,c){var d=a.alternate;null===d?(d=new Y(a.tag,a.key,a.internalContextTag),d.type=a.type,d.stateNode=a.stateNode,d.alternate=a,a.alternate=d):(d.effectTag=0,d.nextEffect=null,d.firstEffect=null,d.lastEffect=null);d.expirationTime=c;d.pendingProps=b;d.child=a.child;d.memoizedProps=a.memoizedProps;d.memoizedState=a.memoizedState;d.updateQueue=a.updateQueue;d.sibling=a.sibling;d.index=a.index;d.ref=a.ref;return d}
function te(a,b,c){var d=void 0,e=a.type,f=a.key;"function"===typeof e?(d=e.prototype&&e.prototype.isReactComponent?new Y(2,f,b):new Y(0,f,b),d.type=e,d.pendingProps=a.props):"string"===typeof e?(d=new Y(5,f,b),d.type=e,d.pendingProps=a.props):"object"===typeof e&&null!==e&&"number"===typeof e.tag?(d=e,d.pendingProps=a.props):E("130",null==e?e:typeof e,"");d.expirationTime=c;return d}function ue(a,b,c,d){b=new Y(10,d,b);b.pendingProps=a;b.expirationTime=c;return b}
function ve(a,b,c){b=new Y(6,null,b);b.pendingProps=a;b.expirationTime=c;return b}function we(a,b,c){b=new Y(7,a.key,b);b.type=a.handler;b.pendingProps=a;b.expirationTime=c;return b}function xe(a,b,c){a=new Y(9,null,b);a.expirationTime=c;return a}function ye(a,b,c){b=new Y(4,a.key,b);b.pendingProps=a.children||[];b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}var ze=null,Ae=null;
function Be(a){return function(b){try{return a(b)}catch(c){}}}function Ce(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return!0;try{var c=b.inject(a);ze=Be(function(a){return b.onCommitFiberRoot(c,a)});Ae=Be(function(a){return b.onCommitFiberUnmount(c,a)})}catch(d){}return!0}function De(a){"function"===typeof ze&&ze(a)}function Ee(a){"function"===typeof Ae&&Ae(a)}
function Fe(a){return{baseState:a,expirationTime:0,first:null,last:null,callbackList:null,hasForceUpdate:!1,isInitialized:!1}}function Ge(a,b){null===a.last?a.first=a.last=b:(a.last.next=b,a.last=b);if(0===a.expirationTime||a.expirationTime>b.expirationTime)a.expirationTime=b.expirationTime}
function He(a,b){var c=a.alternate,d=a.updateQueue;null===d&&(d=a.updateQueue=Fe(null));null!==c?(a=c.updateQueue,null===a&&(a=c.updateQueue=Fe(null))):a=null;a=a!==d?a:null;null===a?Ge(d,b):null===d.last||null===a.last?(Ge(d,b),Ge(a,b)):(Ge(d,b),a.last=b)}function Ie(a,b,c,d){a=a.partialState;return"function"===typeof a?a.call(b,c,d):a}
function Je(a,b,c,d,e,f){null!==a&&a.updateQueue===c&&(c=b.updateQueue={baseState:c.baseState,expirationTime:c.expirationTime,first:c.first,last:c.last,isInitialized:c.isInitialized,callbackList:null,hasForceUpdate:!1});c.expirationTime=0;c.isInitialized?a=c.baseState:(a=c.baseState=b.memoizedState,c.isInitialized=!0);for(var g=!0,h=c.first,k=!1;null!==h;){var q=h.expirationTime;if(q>f){var v=c.expirationTime;if(0===v||v>q)c.expirationTime=q;k||(k=!0,c.baseState=a)}else{k||(c.first=h.next,null===
c.first&&(c.last=null));if(h.isReplace)a=Ie(h,d,a,e),g=!0;else if(q=Ie(h,d,a,e))a=g?B({},a,q):B(a,q),g=!1;h.isForced&&(c.hasForceUpdate=!0);null!==h.callback&&(q=c.callbackList,null===q&&(q=c.callbackList=[]),q.push(h))}h=h.next}null!==c.callbackList?b.effectTag|=32:null!==c.first||c.hasForceUpdate||(b.updateQueue=null);k||(c.baseState=a);return a}
function Ke(a,b){var c=a.callbackList;if(null!==c)for(a.callbackList=null,a=0;a<c.length;a++){var d=c[a],e=d.callback;d.callback=null;"function"!==typeof e?E("191",e):void 0;e.call(b)}}
function Le(a,b,c,d){function e(a,b){b.updater=f;a.stateNode=b;b._reactInternalFiber=a}var f={isMounted:ld,enqueueSetState:function(c,d,e){c=c._reactInternalFiber;e=void 0===e?null:e;var g=b(c);He(c,{expirationTime:g,partialState:d,callback:e,isReplace:!1,isForced:!1,nextCallback:null,next:null});a(c,g)},enqueueReplaceState:function(c,d,e){c=c._reactInternalFiber;e=void 0===e?null:e;var g=b(c);He(c,{expirationTime:g,partialState:d,callback:e,isReplace:!0,isForced:!1,nextCallback:null,next:null});
a(c,g)},enqueueForceUpdate:function(c,d){c=c._reactInternalFiber;d=void 0===d?null:d;var e=b(c);He(c,{expirationTime:e,partialState:null,callback:d,isReplace:!1,isForced:!0,nextCallback:null,next:null});a(c,e)}};return{adoptClassInstance:e,constructClassInstance:function(a,b){var c=a.type,d=ke(a),f=2===a.tag&&null!=a.type.contextTypes,g=f?me(a,d):D;b=new c(b,g);e(a,b);f&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=d,a.__reactInternalMemoizedMaskedChildContext=g);return b},mountClassInstance:function(a,
b){var c=a.alternate,d=a.stateNode,e=d.state||null,g=a.pendingProps;g?void 0:E("158");var h=ke(a);d.props=g;d.state=a.memoizedState=e;d.refs=D;d.context=me(a,h);null!=a.type&&null!=a.type.prototype&&!0===a.type.prototype.unstable_isAsyncReactComponent&&(a.internalContextTag|=1);"function"===typeof d.componentWillMount&&(e=d.state,d.componentWillMount(),e!==d.state&&f.enqueueReplaceState(d,d.state,null),e=a.updateQueue,null!==e&&(d.state=Je(c,a,e,d,g,b)));"function"===typeof d.componentDidMount&&(a.effectTag|=
4)},updateClassInstance:function(a,b,e){var g=b.stateNode;g.props=b.memoizedProps;g.state=b.memoizedState;var h=b.memoizedProps,k=b.pendingProps;k||(k=h,null==k?E("159"):void 0);var u=g.context,z=ke(b);z=me(b,z);"function"!==typeof g.componentWillReceiveProps||h===k&&u===z||(u=g.state,g.componentWillReceiveProps(k,z),g.state!==u&&f.enqueueReplaceState(g,g.state,null));u=b.memoizedState;e=null!==b.updateQueue?Je(a,b,b.updateQueue,g,k,e):u;if(!(h!==k||u!==e||X.current||null!==b.updateQueue&&b.updateQueue.hasForceUpdate))return"function"!==
typeof g.componentDidUpdate||h===a.memoizedProps&&u===a.memoizedState||(b.effectTag|=4),!1;var G=k;if(null===h||null!==b.updateQueue&&b.updateQueue.hasForceUpdate)G=!0;else{var I=b.stateNode,L=b.type;G="function"===typeof I.shouldComponentUpdate?I.shouldComponentUpdate(G,e,z):L.prototype&&L.prototype.isPureReactComponent?!ea(h,G)||!ea(u,e):!0}G?("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(k,e,z),"function"===typeof g.componentDidUpdate&&(b.effectTag|=4)):("function"!==typeof g.componentDidUpdate||
h===a.memoizedProps&&u===a.memoizedState||(b.effectTag|=4),c(b,k),d(b,e));g.props=k;g.state=e;g.context=z;return G}}}var Qe="function"===typeof Symbol&&Symbol["for"],Re=Qe?Symbol["for"]("react.element"):60103,Se=Qe?Symbol["for"]("react.call"):60104,Te=Qe?Symbol["for"]("react.return"):60105,Ue=Qe?Symbol["for"]("react.portal"):60106,Ve=Qe?Symbol["for"]("react.fragment"):60107,We="function"===typeof Symbol&&Symbol.iterator;
function Xe(a){if(null===a||"undefined"===typeof a)return null;a=We&&a[We]||a["@@iterator"];return"function"===typeof a?a:null}var Ye=Array.isArray;
function Ze(a,b){var c=b.ref;if(null!==c&&"function"!==typeof c){if(b._owner){b=b._owner;var d=void 0;b&&(2!==b.tag?E("110"):void 0,d=b.stateNode);d?void 0:E("147",c);var e=""+c;if(null!==a&&null!==a.ref&&a.ref._stringRef===e)return a.ref;a=function(a){var b=d.refs===D?d.refs={}:d.refs;null===a?delete b[e]:b[e]=a};a._stringRef=e;return a}"string"!==typeof c?E("148"):void 0;b._owner?void 0:E("149",c)}return c}
function $e(a,b){"textarea"!==a.type&&E("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,"")}
function af(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b,c){a=se(a,b,c);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
2,c):d;b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=ve(c,a.internalContextTag,d),b["return"]=a,b;b=e(b,c,d);b["return"]=a;return b}function k(a,b,c,d){if(null!==b&&b.type===c.type)return d=e(b,c.props,d),d.ref=Ze(b,c),d["return"]=a,d;d=te(c,a.internalContextTag,d);d.ref=Ze(b,c);d["return"]=a;return d}function q(a,b,c,d){if(null===b||7!==b.tag)return b=we(c,a.internalContextTag,d),b["return"]=a,b;b=e(b,c,d);
b["return"]=a;return b}function v(a,b,c,d){if(null===b||9!==b.tag)return b=xe(c,a.internalContextTag,d),b.type=c.value,b["return"]=a,b;b=e(b,null,d);b.type=c.value;b["return"]=a;return b}function y(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=ye(c,a.internalContextTag,d),b["return"]=a,b;b=e(b,c.children||[],d);b["return"]=a;return b}function u(a,b,c,d,f){if(null===b||10!==b.tag)return b=ue(c,a.internalContextTag,
d,f),b["return"]=a,b;b=e(b,c,d);b["return"]=a;return b}function z(a,b,c){if("string"===typeof b||"number"===typeof b)return b=ve(""+b,a.internalContextTag,c),b["return"]=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case Re:if(b.type===Ve)return b=ue(b.props.children,a.internalContextTag,c,b.key),b["return"]=a,b;c=te(b,a.internalContextTag,c);c.ref=Ze(null,b);c["return"]=a;return c;case Se:return b=we(b,a.internalContextTag,c),b["return"]=a,b;case Te:return c=xe(b,a.internalContextTag,
c),c.type=b.value,c["return"]=a,c;case Ue:return b=ye(b,a.internalContextTag,c),b["return"]=a,b}if(Ye(b)||Xe(b))return b=ue(b,a.internalContextTag,c,null),b["return"]=a,b;$e(a,b)}return null}function G(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case Re:return c.key===e?c.type===Ve?u(a,b,c.props.children,d,e):k(a,b,c,d):null;case Se:return c.key===e?q(a,b,c,d):null;case Te:return null===
e?v(a,b,c,d):null;case Ue:return c.key===e?y(a,b,c,d):null}if(Ye(c)||Xe(c))return null!==e?null:u(a,b,c,d,null);$e(a,c)}return null}function I(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case Re:return a=a.get(null===d.key?c:d.key)||null,d.type===Ve?u(b,a,d.props.children,e,d.key):k(b,a,d,e);case Se:return a=a.get(null===d.key?c:d.key)||null,q(b,a,d,e);case Te:return a=a.get(c)||null,v(b,a,d,e);case Ue:return a=
a.get(null===d.key?c:d.key)||null,y(b,a,d,e)}if(Ye(d)||Xe(d))return a=a.get(c)||null,u(b,a,d,e,null);$e(b,d)}return null}function L(e,g,m,A){for(var h=null,r=null,n=g,w=g=0,k=null;null!==n&&w<m.length;w++){n.index>w?(k=n,n=null):k=n.sibling;var x=G(e,n,m[w],A);if(null===x){null===n&&(n=k);break}a&&n&&null===x.alternate&&b(e,n);g=f(x,g,w);null===r?h=x:r.sibling=x;r=x;n=k}if(w===m.length)return c(e,n),h;if(null===n){for(;w<m.length;w++)if(n=z(e,m[w],A))g=f(n,g,w),null===r?h=n:r.sibling=n,r=n;return h}for(n=
d(e,n);w<m.length;w++)if(k=I(n,e,w,m[w],A)){if(a&&null!==k.alternate)n["delete"](null===k.key?w:k.key);g=f(k,g,w);null===r?h=k:r.sibling=k;r=k}a&&n.forEach(function(a){return b(e,a)});return h}function N(e,g,m,A){var h=Xe(m);"function"!==typeof h?E("150"):void 0;m=h.call(m);null==m?E("151"):void 0;for(var r=h=null,n=g,w=g=0,k=null,x=m.next();null!==n&&!x.done;w++,x=m.next()){n.index>w?(k=n,n=null):k=n.sibling;var J=G(e,n,x.value,A);if(null===J){n||(n=k);break}a&&n&&null===J.alternate&&b(e,n);g=f(J,
g,w);null===r?h=J:r.sibling=J;r=J;n=k}if(x.done)return c(e,n),h;if(null===n){for(;!x.done;w++,x=m.next())x=z(e,x.value,A),null!==x&&(g=f(x,g,w),null===r?h=x:r.sibling=x,r=x);return h}for(n=d(e,n);!x.done;w++,x=m.next())if(x=I(n,e,w,x.value,A),null!==x){if(a&&null!==x.alternate)n["delete"](null===x.key?w:x.key);g=f(x,g,w);null===r?h=x:r.sibling=x;r=x}a&&n.forEach(function(a){return b(e,a)});return h}return function(a,d,f,h){"object"===typeof f&&null!==f&&f.type===Ve&&null===f.key&&(f=f.props.children);
var m="object"===typeof f&&null!==f;if(m)switch(f.$$typeof){case Re:a:{var r=f.key;for(m=d;null!==m;){if(m.key===r)if(10===m.tag?f.type===Ve:m.type===f.type){c(a,m.sibling);d=e(m,f.type===Ve?f.props.children:f.props,h);d.ref=Ze(m,f);d["return"]=a;a=d;break a}else{c(a,m);break}else b(a,m);m=m.sibling}f.type===Ve?(d=ue(f.props.children,a.internalContextTag,h,f.key),d["return"]=a,a=d):(h=te(f,a.internalContextTag,h),h.ref=Ze(d,f),h["return"]=a,a=h)}return g(a);case Se:a:{for(m=f.key;null!==d;){if(d.key===
m)if(7===d.tag){c(a,d.sibling);d=e(d,f,h);d["return"]=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=we(f,a.internalContextTag,h);d["return"]=a;a=d}return g(a);case Te:a:{if(null!==d)if(9===d.tag){c(a,d.sibling);d=e(d,null,h);d.type=f.value;d["return"]=a;a=d;break a}else c(a,d);d=xe(f,a.internalContextTag,h);d.type=f.value;d["return"]=a;a=d}return g(a);case Ue:a:{for(m=f.key;null!==d;){if(d.key===m)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===
f.implementation){c(a,d.sibling);d=e(d,f.children||[],h);d["return"]=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=ye(f,a.internalContextTag,h);d["return"]=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f,h)):(c(a,d),d=ve(f,a.internalContextTag,h)),d["return"]=a,a=d,g(a);if(Ye(f))return L(a,d,f,h);if(Xe(f))return N(a,d,f,h);m&&$e(a,f);if("undefined"===typeof f)switch(a.tag){case 2:case 1:h=a.type,E("152",h.displayName||
h.name||"Component")}return c(a,d)}}var bf=af(!0),cf=af(!1);
function df(a,b,c,d,e){function f(a,b,c){var d=b.expirationTime;b.child=null===a?cf(b,null,c,d):bf(b,a.child,c,d)}function g(a,b){var c=b.ref;null===c||a&&a.ref===c||(b.effectTag|=128)}function h(a,b,c,d){g(a,b);if(!c)return d&&re(b,!1),q(a,b);c=b.stateNode;id.current=b;var e=c.render();b.effectTag|=1;f(a,b,e);b.memoizedState=c.state;b.memoizedProps=c.props;d&&re(b,!0);return b.child}function k(a){var b=a.stateNode;b.pendingContext?oe(a,b.pendingContext,b.pendingContext!==b.context):b.context&&oe(a,
b.context,!1);I(a,b.containerInfo)}function q(a,b){null!==a&&b.child!==a.child?E("153"):void 0;if(null!==b.child){a=b.child;var c=se(a,a.pendingProps,a.expirationTime);b.child=c;for(c["return"]=b;null!==a.sibling;)a=a.sibling,c=c.sibling=se(a,a.pendingProps,a.expirationTime),c["return"]=b;c.sibling=null}return b.child}function v(a,b){switch(b.tag){case 3:k(b);break;case 2:qe(b);break;case 4:I(b,b.stateNode.containerInfo)}return null}var y=a.shouldSetTextContent,u=a.useSyncScheduling,z=a.shouldDeprioritizeSubtree,
G=b.pushHostContext,I=b.pushHostContainer,L=c.enterHydrationState,N=c.resetHydrationState,J=c.tryToClaimNextHydratableInstance;a=Le(d,e,function(a,b){a.memoizedProps=b},function(a,b){a.memoizedState=b});var w=a.adoptClassInstance,m=a.constructClassInstance,A=a.mountClassInstance,Ob=a.updateClassInstance;return{beginWork:function(a,b,c){if(0===b.expirationTime||b.expirationTime>c)return v(a,b);switch(b.tag){case 0:null!==a?E("155"):void 0;var d=b.type,e=b.pendingProps,r=ke(b);r=me(b,r);d=d(e,r);b.effectTag|=
1;"object"===typeof d&&null!==d&&"function"===typeof d.render?(b.tag=2,e=qe(b),w(b,d),A(b,c),b=h(a,b,!0,e)):(b.tag=1,f(a,b,d),b.memoizedProps=e,b=b.child);return b;case 1:a:{e=b.type;c=b.pendingProps;d=b.memoizedProps;if(X.current)null===c&&(c=d);else if(null===c||d===c){b=q(a,b);break a}d=ke(b);d=me(b,d);e=e(c,d);b.effectTag|=1;f(a,b,e);b.memoizedProps=c;b=b.child}return b;case 2:return e=qe(b),d=void 0,null===a?b.stateNode?E("153"):(m(b,b.pendingProps),A(b,c),d=!0):d=Ob(a,b,c),h(a,b,d,e);case 3:return k(b),
e=b.updateQueue,null!==e?(d=b.memoizedState,e=Je(a,b,e,null,null,c),d===e?(N(),b=q(a,b)):(d=e.element,r=b.stateNode,(null===a||null===a.child)&&r.hydrate&&L(b)?(b.effectTag|=2,b.child=cf(b,null,d,c)):(N(),f(a,b,d)),b.memoizedState=e,b=b.child)):(N(),b=q(a,b)),b;case 5:G(b);null===a&&J(b);e=b.type;var n=b.memoizedProps;d=b.pendingProps;null===d&&(d=n,null===d?E("154"):void 0);r=null!==a?a.memoizedProps:null;X.current||null!==d&&n!==d?(n=d.children,y(e,d)?n=null:r&&y(e,r)&&(b.effectTag|=16),g(a,b),
2147483647!==c&&!u&&z(e,d)?(b.expirationTime=2147483647,b=null):(f(a,b,n),b.memoizedProps=d,b=b.child)):b=q(a,b);return b;case 6:return null===a&&J(b),a=b.pendingProps,null===a&&(a=b.memoizedProps),b.memoizedProps=a,null;case 8:b.tag=7;case 7:e=b.pendingProps;if(X.current)null===e&&(e=a&&a.memoizedProps,null===e?E("154"):void 0);else if(null===e||b.memoizedProps===e)e=b.memoizedProps;d=e.children;b.stateNode=null===a?cf(b,b.stateNode,d,c):bf(b,b.stateNode,d,c);b.memoizedProps=e;return b.stateNode;
case 9:return null;case 4:a:{I(b,b.stateNode.containerInfo);e=b.pendingProps;if(X.current)null===e&&(e=a&&a.memoizedProps,null==e?E("154"):void 0);else if(null===e||b.memoizedProps===e){b=q(a,b);break a}null===a?b.child=bf(b,null,e,c):f(a,b,e);b.memoizedProps=e;b=b.child}return b;case 10:a:{c=b.pendingProps;if(X.current)null===c&&(c=b.memoizedProps);else if(null===c||b.memoizedProps===c){b=q(a,b);break a}f(a,b,c);b.memoizedProps=c;b=b.child}return b;default:E("156")}},beginFailedWork:function(a,b,
c){switch(b.tag){case 2:qe(b);break;case 3:k(b);break;default:E("157")}b.effectTag|=64;null===a?b.child=null:b.child!==a.child&&(b.child=a.child);if(0===b.expirationTime||b.expirationTime>c)return v(a,b);b.firstEffect=null;b.lastEffect=null;b.child=null===a?cf(b,null,null,c):bf(b,a.child,null,c);2===b.tag&&(a=b.stateNode,b.memoizedProps=a.props,b.memoizedState=a.state);return b.child}}}
function ef(a,b,c){function d(a){a.effectTag|=4}var e=a.createInstance,f=a.createTextInstance,g=a.appendInitialChild,h=a.finalizeInitialChildren,k=a.prepareUpdate,q=a.persistence,v=b.getRootHostContainer,y=b.popHostContext,u=b.getHostContext,z=b.popHostContainer,G=c.prepareToHydrateHostInstance,I=c.prepareToHydrateHostTextInstance,L=c.popHydrationState,N=void 0,J=void 0,w=void 0;a.mutation?(N=function(){},J=function(a,b,c){(b.updateQueue=c)&&d(b)},w=function(a,b,c,e){c!==e&&d(b)}):q?E("235"):E("236");
return{completeWork:function(a,b,c){var m=b.pendingProps;if(null===m)m=b.memoizedProps;else if(2147483647!==b.expirationTime||2147483647===c)b.pendingProps=null;switch(b.tag){case 1:return null;case 2:return ne(b),null;case 3:z(b);V(X,b);V(ie,b);m=b.stateNode;m.pendingContext&&(m.context=m.pendingContext,m.pendingContext=null);if(null===a||null===a.child)L(b),b.effectTag&=-3;N(b);return null;case 5:y(b);c=v();var A=b.type;if(null!==a&&null!=b.stateNode){var p=a.memoizedProps,q=b.stateNode,x=u();q=
k(q,A,p,m,c,x);J(a,b,q,A,p,m,c);a.ref!==b.ref&&(b.effectTag|=128)}else{if(!m)return null===b.stateNode?E("166"):void 0,null;a=u();if(L(b))G(b,c,a)&&d(b);else{a=e(A,m,c,a,b);a:for(p=b.child;null!==p;){if(5===p.tag||6===p.tag)g(a,p.stateNode);else if(4!==p.tag&&null!==p.child){p.child["return"]=p;p=p.child;continue}if(p===b)break;for(;null===p.sibling;){if(null===p["return"]||p["return"]===b)break a;p=p["return"]}p.sibling["return"]=p["return"];p=p.sibling}h(a,A,m,c)&&d(b);b.stateNode=a}null!==b.ref&&
(b.effectTag|=128)}return null;case 6:if(a&&null!=b.stateNode)w(a,b,a.memoizedProps,m);else{if("string"!==typeof m)return null===b.stateNode?E("166"):void 0,null;a=v();c=u();L(b)?I(b)&&d(b):b.stateNode=f(m,a,c,b)}return null;case 7:(m=b.memoizedProps)?void 0:E("165");b.tag=8;A=[];a:for((p=b.stateNode)&&(p["return"]=b);null!==p;){if(5===p.tag||6===p.tag||4===p.tag)E("247");else if(9===p.tag)A.push(p.type);else if(null!==p.child){p.child["return"]=p;p=p.child;continue}for(;null===p.sibling;){if(null===
p["return"]||p["return"]===b)break a;p=p["return"]}p.sibling["return"]=p["return"];p=p.sibling}p=m.handler;m=p(m.props,A);b.child=bf(b,null!==a?a.child:null,m,c);return b.child;case 8:return b.tag=7,null;case 9:return null;case 10:return null;case 4:return z(b),N(b),null;case 0:E("167");default:E("156")}}}}
function ff(a,b){function c(a){var c=a.ref;if(null!==c)try{c(null)}catch(A){b(a,A)}}function d(a){"function"===typeof Ee&&Ee(a);switch(a.tag){case 2:c(a);var d=a.stateNode;if("function"===typeof d.componentWillUnmount)try{d.props=a.memoizedProps,d.state=a.memoizedState,d.componentWillUnmount()}catch(A){b(a,A)}break;case 5:c(a);break;case 7:e(a.stateNode);break;case 4:k&&g(a)}}function e(a){for(var b=a;;)if(d(b),null===b.child||k&&4===b.tag){if(b===a)break;for(;null===b.sibling;){if(null===b["return"]||
b["return"]===a)return;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}else b.child["return"]=b,b=b.child}function f(a){return 5===a.tag||3===a.tag||4===a.tag}function g(a){for(var b=a,c=!1,f=void 0,g=void 0;;){if(!c){c=b["return"];a:for(;;){null===c?E("160"):void 0;switch(c.tag){case 5:f=c.stateNode;g=!1;break a;case 3:f=c.stateNode.containerInfo;g=!0;break a;case 4:f=c.stateNode.containerInfo;g=!0;break a}c=c["return"]}c=!0}if(5===b.tag||6===b.tag)e(b),g?J(f,b.stateNode):N(f,b.stateNode);
else if(4===b.tag?f=b.stateNode.containerInfo:d(b),null!==b.child){b.child["return"]=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b["return"]||b["return"]===a)return;b=b["return"];4===b.tag&&(c=!1)}b.sibling["return"]=b["return"];b=b.sibling}}var h=a.getPublicInstance,k=a.mutation;a=a.persistence;k||(a?E("235"):E("236"));var q=k.commitMount,v=k.commitUpdate,y=k.resetTextContent,u=k.commitTextUpdate,z=k.appendChild,G=k.appendChildToContainer,I=k.insertBefore,L=k.insertInContainerBefore,
N=k.removeChild,J=k.removeChildFromContainer;return{commitResetTextContent:function(a){y(a.stateNode)},commitPlacement:function(a){a:{for(var b=a["return"];null!==b;){if(f(b)){var c=b;break a}b=b["return"]}E("160");c=void 0}var d=b=void 0;switch(c.tag){case 5:b=c.stateNode;d=!1;break;case 3:b=c.stateNode.containerInfo;d=!0;break;case 4:b=c.stateNode.containerInfo;d=!0;break;default:E("161")}c.effectTag&16&&(y(b),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c["return"]||f(c["return"])){c=
null;break a}c=c["return"]}c.sibling["return"]=c["return"];for(c=c.sibling;5!==c.tag&&6!==c.tag;){if(c.effectTag&2)continue b;if(null===c.child||4===c.tag)continue b;else c.child["return"]=c,c=c.child}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var e=a;;){if(5===e.tag||6===e.tag)c?d?L(b,e.stateNode,c):I(b,e.stateNode,c):d?G(b,e.stateNode):z(b,e.stateNode);else if(4!==e.tag&&null!==e.child){e.child["return"]=e;e=e.child;continue}if(e===a)break;for(;null===e.sibling;){if(null===e["return"]||e["return"]===
a)return;e=e["return"]}e.sibling["return"]=e["return"];e=e.sibling}},commitDeletion:function(a){g(a);a["return"]=null;a.child=null;a.alternate&&(a.alternate.child=null,a.alternate["return"]=null)},commitWork:function(a,b){switch(b.tag){case 2:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&v(c,f,e,a,d,b)}break;case 6:null===b.stateNode?E("162"):void 0;c=b.memoizedProps;u(b.stateNode,null!==a?a.memoizedProps:
c,c);break;case 3:break;default:E("163")}},commitLifeCycles:function(a,b){switch(b.tag){case 2:var c=b.stateNode;if(b.effectTag&4)if(null===a)c.props=b.memoizedProps,c.state=b.memoizedState,c.componentDidMount();else{var d=a.memoizedProps;a=a.memoizedState;c.props=b.memoizedProps;c.state=b.memoizedState;c.componentDidUpdate(d,a)}b=b.updateQueue;null!==b&&Ke(b,c);break;case 3:c=b.updateQueue;null!==c&&Ke(c,null!==b.child?b.child.stateNode:null);break;case 5:c=b.stateNode;null===a&&b.effectTag&4&&q(c,
b.type,b.memoizedProps,b);break;case 6:break;case 4:break;default:E("163")}},commitAttachRef:function(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:b(h(c));break;default:b(c)}}},commitDetachRef:function(a){a=a.ref;null!==a&&a(null)}}}var gf={};
function hf(a){function b(a){a===gf?E("174"):void 0;return a}var c=a.getChildHostContext,d=a.getRootHostContext,e={current:gf},f={current:gf},g={current:gf};return{getHostContext:function(){return b(e.current)},getRootHostContainer:function(){return b(g.current)},popHostContainer:function(a){V(e,a);V(f,a);V(g,a)},popHostContext:function(a){f.current===a&&(V(e,a),V(f,a))},pushHostContainer:function(a,b){W(g,b,a);b=d(b);W(f,a,a);W(e,b,a)},pushHostContext:function(a){var d=b(g.current),h=b(e.current);
d=c(h,a.type,d);h!==d&&(W(f,a,a),W(e,d,a))},resetHostContainer:function(){e.current=gf;g.current=gf}}}
function jf(a){function b(a,b){var c=new Y(5,null,0);c.type="DELETED";c.stateNode=b;c["return"]=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}function c(a,b){switch(a.tag){case 5:return b=f(b,a.type,a.pendingProps),null!==b?(a.stateNode=b,!0):!1;case 6:return b=g(b,a.pendingProps),null!==b?(a.stateNode=b,!0):!1;default:return!1}}function d(a){for(a=a["return"];null!==a&&5!==a.tag&&3!==a.tag;)a=a["return"];y=a}var e=a.shouldSetTextContent;
a=a.hydration;if(!a)return{enterHydrationState:function(){return!1},resetHydrationState:function(){},tryToClaimNextHydratableInstance:function(){},prepareToHydrateHostInstance:function(){E("175")},prepareToHydrateHostTextInstance:function(){E("176")},popHydrationState:function(){return!1}};var f=a.canHydrateInstance,g=a.canHydrateTextInstance,h=a.getNextHydratableSibling,k=a.getFirstHydratableChild,q=a.hydrateInstance,v=a.hydrateTextInstance,y=null,u=null,z=!1;return{enterHydrationState:function(a){u=
k(a.stateNode.containerInfo);y=a;return z=!0},resetHydrationState:function(){u=y=null;z=!1},tryToClaimNextHydratableInstance:function(a){if(z){var d=u;if(d){if(!c(a,d)){d=h(d);if(!d||!c(a,d)){a.effectTag|=2;z=!1;y=a;return}b(y,u)}y=a;u=k(d)}else a.effectTag|=2,z=!1,y=a}},prepareToHydrateHostInstance:function(a,b,c){b=q(a.stateNode,a.type,a.memoizedProps,b,c,a);a.updateQueue=b;return null!==b?!0:!1},prepareToHydrateHostTextInstance:function(a){return v(a.stateNode,a.memoizedProps,a)},popHydrationState:function(a){if(a!==
y)return!1;if(!z)return d(a),z=!0,!1;var c=a.type;if(5!==a.tag||"head"!==c&&"body"!==c&&!e(c,a.memoizedProps))for(c=u;c;)b(a,c),c=h(c);d(a);u=y?h(a.stateNode):null;return!0}}}
function kf(a){function b(a){Qb=ja=!0;var b=a.stateNode;b.current===a?E("177"):void 0;b.isReadyForCommit=!1;id.current=null;if(1<a.effectTag)if(null!==a.lastEffect){a.lastEffect.nextEffect=a;var c=a.firstEffect}else c=a;else c=a.firstEffect;yg();for(t=c;null!==t;){var d=!1,e=void 0;try{for(;null!==t;){var f=t.effectTag;f&16&&zg(t);if(f&128){var g=t.alternate;null!==g&&Ag(g)}switch(f&-242){case 2:Ne(t);t.effectTag&=-3;break;case 6:Ne(t);t.effectTag&=-3;Oe(t.alternate,t);break;case 4:Oe(t.alternate,
t);break;case 8:Sc=!0,Bg(t),Sc=!1}t=t.nextEffect}}catch(Tc){d=!0,e=Tc}d&&(null===t?E("178"):void 0,h(t,e),null!==t&&(t=t.nextEffect))}Cg();b.current=a;for(t=c;null!==t;){c=!1;d=void 0;try{for(;null!==t;){var k=t.effectTag;k&36&&Dg(t.alternate,t);k&128&&Eg(t);if(k&64)switch(e=t,f=void 0,null!==R&&(f=R.get(e),R["delete"](e),null==f&&null!==e.alternate&&(e=e.alternate,f=R.get(e),R["delete"](e))),null==f?E("184"):void 0,e.tag){case 2:e.stateNode.componentDidCatch(f.error,{componentStack:f.componentStack});
break;case 3:null===ca&&(ca=f.error);break;default:E("157")}var Qc=t.nextEffect;t.nextEffect=null;t=Qc}}catch(Tc){c=!0,d=Tc}c&&(null===t?E("178"):void 0,h(t,d),null!==t&&(t=t.nextEffect))}ja=Qb=!1;"function"===typeof De&&De(a.stateNode);ha&&(ha.forEach(G),ha=null);null!==ca&&(a=ca,ca=null,Ob(a));b=b.current.expirationTime;0===b&&(qa=R=null);return b}function c(a){for(;;){var b=Fg(a.alternate,a,H),c=a["return"],d=a.sibling;var e=a;if(2147483647===H||2147483647!==e.expirationTime){if(2!==e.tag&&3!==
e.tag)var f=0;else f=e.updateQueue,f=null===f?0:f.expirationTime;for(var g=e.child;null!==g;)0!==g.expirationTime&&(0===f||f>g.expirationTime)&&(f=g.expirationTime),g=g.sibling;e.expirationTime=f}if(null!==b)return b;null!==c&&(null===c.firstEffect&&(c.firstEffect=a.firstEffect),null!==a.lastEffect&&(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),1<a.effectTag&&(null!==c.lastEffect?c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a));if(null!==d)return d;
if(null!==c)a=c;else{a.stateNode.isReadyForCommit=!0;break}}return null}function d(a){var b=rg(a.alternate,a,H);null===b&&(b=c(a));id.current=null;return b}function e(a){var b=Gg(a.alternate,a,H);null===b&&(b=c(a));id.current=null;return b}function f(a){if(null!==R){if(!(0===H||H>a))if(H<=Uc)for(;null!==F;)F=k(F)?e(F):d(F);else for(;null!==F&&!A();)F=k(F)?e(F):d(F)}else if(!(0===H||H>a))if(H<=Uc)for(;null!==F;)F=d(F);else for(;null!==F&&!A();)F=d(F)}function g(a,b){ja?E("243"):void 0;ja=!0;a.isReadyForCommit=
!1;if(a!==ra||b!==H||null===F){for(;-1<he;)ge[he]=null,he--;je=D;ie.current=D;X.current=!1;x();ra=a;H=b;F=se(ra.current,null,b)}var c=!1,d=null;try{f(b)}catch(Rc){c=!0,d=Rc}for(;c;){if(eb){ca=d;break}var g=F;if(null===g)eb=!0;else{var k=h(g,d);null===k?E("183"):void 0;if(!eb){try{c=k;d=b;for(k=c;null!==g;){switch(g.tag){case 2:ne(g);break;case 5:qg(g);break;case 3:p(g);break;case 4:p(g)}if(g===k||g.alternate===k)break;g=g["return"]}F=e(c);f(d)}catch(Rc){c=!0;d=Rc;continue}break}}}b=ca;eb=ja=!1;ca=
null;null!==b&&Ob(b);return a.isReadyForCommit?a.current.alternate:null}function h(a,b){var c=id.current=null,d=!1,e=!1,f=null;if(3===a.tag)c=a,q(a)&&(eb=!0);else for(var g=a["return"];null!==g&&null===c;){2===g.tag?"function"===typeof g.stateNode.componentDidCatch&&(d=!0,f=jd(g),c=g,e=!0):3===g.tag&&(c=g);if(q(g)){if(Sc||null!==ha&&(ha.has(g)||null!==g.alternate&&ha.has(g.alternate)))return null;c=null;e=!1}g=g["return"]}if(null!==c){null===qa&&(qa=new Set);qa.add(c);var h="";g=a;do{a:switch(g.tag){case 0:case 1:case 2:case 5:var k=
g._debugOwner,Qc=g._debugSource;var m=jd(g);var n=null;k&&(n=jd(k));k=Qc;m="\n    in "+(m||"Unknown")+(k?" (at "+k.fileName.replace(/^.*[\\\/]/,"")+":"+k.lineNumber+")":n?" (created by "+n+")":"");break a;default:m=""}h+=m;g=g["return"]}while(g);g=h;a=jd(a);null===R&&(R=new Map);b={componentName:a,componentStack:g,error:b,errorBoundary:d?c.stateNode:null,errorBoundaryFound:d,errorBoundaryName:f,willRetry:e};R.set(c,b);try{var p=b.error;p&&p.suppressReactErrorLogging||console.error(p)}catch(Vc){Vc&&
Vc.suppressReactErrorLogging||console.error(Vc)}Qb?(null===ha&&(ha=new Set),ha.add(c)):G(c);return c}null===ca&&(ca=b);return null}function k(a){return null!==R&&(R.has(a)||null!==a.alternate&&R.has(a.alternate))}function q(a){return null!==qa&&(qa.has(a)||null!==a.alternate&&qa.has(a.alternate))}function v(){return 20*(((I()+100)/20|0)+1)}function y(a){return 0!==ka?ka:ja?Qb?1:H:!Hg||a.internalContextTag&1?v():1}function u(a,b){return z(a,b,!1)}function z(a,b){for(;null!==a;){if(0===a.expirationTime||
a.expirationTime>b)a.expirationTime=b;null!==a.alternate&&(0===a.alternate.expirationTime||a.alternate.expirationTime>b)&&(a.alternate.expirationTime=b);if(null===a["return"])if(3===a.tag){var c=a.stateNode;!ja&&c===ra&&b<H&&(F=ra=null,H=0);var d=c,e=b;Rb>Ig&&E("185");if(null===d.nextScheduledRoot)d.remainingExpirationTime=e,null===O?(sa=O=d,d.nextScheduledRoot=d):(O=O.nextScheduledRoot=d,O.nextScheduledRoot=sa);else{var f=d.remainingExpirationTime;if(0===f||e<f)d.remainingExpirationTime=e}Fa||(la?
Sb&&(ma=d,na=1,m(ma,na)):1===e?w(1,null):L(e));!ja&&c===ra&&b<H&&(F=ra=null,H=0)}else break;a=a["return"]}}function G(a){z(a,1,!0)}function I(){return Uc=((Wc()-Pe)/10|0)+2}function L(a){if(0!==Tb){if(a>Tb)return;Jg(Xc)}var b=Wc()-Pe;Tb=a;Xc=Kg(J,{timeout:10*(a-2)-b})}function N(){var a=0,b=null;if(null!==O)for(var c=O,d=sa;null!==d;){var e=d.remainingExpirationTime;if(0===e){null===c||null===O?E("244"):void 0;if(d===d.nextScheduledRoot){sa=O=d.nextScheduledRoot=null;break}else if(d===sa)sa=e=d.nextScheduledRoot,
O.nextScheduledRoot=e,d.nextScheduledRoot=null;else if(d===O){O=c;O.nextScheduledRoot=sa;d.nextScheduledRoot=null;break}else c.nextScheduledRoot=d.nextScheduledRoot,d.nextScheduledRoot=null;d=c.nextScheduledRoot}else{if(0===a||e<a)a=e,b=d;if(d===O)break;c=d;d=d.nextScheduledRoot}}c=ma;null!==c&&c===b?Rb++:Rb=0;ma=b;na=a}function J(a){w(0,a)}function w(a,b){fb=b;for(N();null!==ma&&0!==na&&(0===a||na<=a)&&!Yc;)m(ma,na),N();null!==fb&&(Tb=0,Xc=-1);0!==na&&L(na);fb=null;Yc=!1;Rb=0;if(Ub)throw a=Zc,Zc=
null,Ub=!1,a;}function m(a,c){Fa?E("245"):void 0;Fa=!0;if(c<=I()){var d=a.finishedWork;null!==d?(a.finishedWork=null,a.remainingExpirationTime=b(d)):(a.finishedWork=null,d=g(a,c),null!==d&&(a.remainingExpirationTime=b(d)))}else d=a.finishedWork,null!==d?(a.finishedWork=null,a.remainingExpirationTime=b(d)):(a.finishedWork=null,d=g(a,c),null!==d&&(A()?a.finishedWork=d:a.remainingExpirationTime=b(d)));Fa=!1}function A(){return null===fb||fb.timeRemaining()>Lg?!1:Yc=!0}function Ob(a){null===ma?E("246"):
void 0;ma.remainingExpirationTime=0;Ub||(Ub=!0,Zc=a)}var r=hf(a),n=jf(a),p=r.popHostContainer,qg=r.popHostContext,x=r.resetHostContainer,Me=df(a,r,n,u,y),rg=Me.beginWork,Gg=Me.beginFailedWork,Fg=ef(a,r,n).completeWork;r=ff(a,h);var zg=r.commitResetTextContent,Ne=r.commitPlacement,Bg=r.commitDeletion,Oe=r.commitWork,Dg=r.commitLifeCycles,Eg=r.commitAttachRef,Ag=r.commitDetachRef,Wc=a.now,Kg=a.scheduleDeferredCallback,Jg=a.cancelDeferredCallback,Hg=a.useSyncScheduling,yg=a.prepareForCommit,Cg=a.resetAfterCommit,
Pe=Wc(),Uc=2,ka=0,ja=!1,F=null,ra=null,H=0,t=null,R=null,qa=null,ha=null,ca=null,eb=!1,Qb=!1,Sc=!1,sa=null,O=null,Tb=0,Xc=-1,Fa=!1,ma=null,na=0,Yc=!1,Ub=!1,Zc=null,fb=null,la=!1,Sb=!1,Ig=1E3,Rb=0,Lg=1;return{computeAsyncExpiration:v,computeExpirationForFiber:y,scheduleWork:u,batchedUpdates:function(a,b){var c=la;la=!0;try{return a(b)}finally{(la=c)||Fa||w(1,null)}},unbatchedUpdates:function(a){if(la&&!Sb){Sb=!0;try{return a()}finally{Sb=!1}}return a()},flushSync:function(a){var b=la;la=!0;try{a:{var c=
ka;ka=1;try{var d=a();break a}finally{ka=c}d=void 0}return d}finally{la=b,Fa?E("187"):void 0,w(1,null)}},deferredUpdates:function(a){var b=ka;ka=v();try{return a()}finally{ka=b}}}}
function lf(a){function b(a){a=od(a);return null===a?null:a.stateNode}var c=a.getPublicInstance;a=kf(a);var d=a.computeAsyncExpiration,e=a.computeExpirationForFiber,f=a.scheduleWork;return{createContainer:function(a,b){var c=new Y(3,null,0);a={current:c,containerInfo:a,pendingChildren:null,remainingExpirationTime:0,isReadyForCommit:!1,finishedWork:null,context:null,pendingContext:null,hydrate:b,nextScheduledRoot:null};return c.stateNode=a},updateContainer:function(a,b,c,q){var g=b.current;if(c){c=
c._reactInternalFiber;var h;b:{2===kd(c)&&2===c.tag?void 0:E("170");for(h=c;3!==h.tag;){if(le(h)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break b}(h=h["return"])?void 0:E("171")}h=h.stateNode.context}c=le(c)?pe(c,h):h}else c=D;null===b.context?b.context=c:b.pendingContext=c;b=q;b=void 0===b?null:b;q=null!=a&&null!=a.type&&null!=a.type.prototype&&!0===a.type.prototype.unstable_isAsyncReactComponent?d():e(g);He(g,{expirationTime:q,partialState:{element:a},callback:b,isReplace:!1,isForced:!1,
nextCallback:null,next:null});f(g,q)},batchedUpdates:a.batchedUpdates,unbatchedUpdates:a.unbatchedUpdates,deferredUpdates:a.deferredUpdates,flushSync:a.flushSync,getPublicRootInstance:function(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return c(a.child.stateNode);default:return a.child.stateNode}},findHostInstance:b,findHostInstanceWithNoPortals:function(a){a=pd(a);return null===a?null:a.stateNode},injectIntoDevTools:function(a){var c=a.findFiberByHostInstance;return Ce(B({},
a,{findHostInstanceByFiber:function(a){return b(a)},findFiberByHostInstance:function(a){return c?c(a):null}}))}}}var mf=Object.freeze({default:lf}),nf=mf&&lf||mf,of=nf["default"]?nf["default"]:nf;function pf(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:Ue,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}var qf="object"===typeof performance&&"function"===typeof performance.now,rf=void 0;rf=qf?function(){return performance.now()}:function(){return Date.now()};
var sf=void 0,tf=void 0;
if(l.canUseDOM)if("function"!==typeof requestIdleCallback||"function"!==typeof cancelIdleCallback){var uf=null,vf=!1,wf=-1,xf=!1,yf=0,zf=33,Af=33,Bf;Bf=qf?{didTimeout:!1,timeRemaining:function(){var a=yf-performance.now();return 0<a?a:0}}:{didTimeout:!1,timeRemaining:function(){var a=yf-Date.now();return 0<a?a:0}};var Cf="__reactIdleCallback$"+Math.random().toString(36).slice(2);window.addEventListener("message",function(a){if(a.source===window&&a.data===Cf){vf=!1;a=rf();if(0>=yf-a)if(-1!==wf&&wf<=
a)Bf.didTimeout=!0;else{xf||(xf=!0,requestAnimationFrame(Df));return}else Bf.didTimeout=!1;wf=-1;a=uf;uf=null;null!==a&&a(Bf)}},!1);var Df=function(a){xf=!1;var b=a-yf+Af;b<Af&&zf<Af?(8>b&&(b=8),Af=b<zf?zf:b):zf=b;yf=a+Af;vf||(vf=!0,window.postMessage(Cf,"*"))};sf=function(a,b){uf=a;null!=b&&"number"===typeof b.timeout&&(wf=rf()+b.timeout);xf||(xf=!0,requestAnimationFrame(Df));return 0};tf=function(){uf=null;vf=!1;wf=-1}}else sf=window.requestIdleCallback,tf=window.cancelIdleCallback;else sf=function(a){return setTimeout(function(){a({timeRemaining:function(){return Infinity}})})},
tf=function(a){clearTimeout(a)};var Ef=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ff={},Gf={};
function Hf(a){if(Gf.hasOwnProperty(a))return!0;if(Ff.hasOwnProperty(a))return!1;if(Ef.test(a))return Gf[a]=!0;Ff[a]=!0;return!1}
function If(a,b,c){var d=wa(b);if(d&&va(b,c)){var e=d.mutationMethod;e?e(a,c):null==c||d.hasBooleanValue&&!c||d.hasNumericValue&&isNaN(c)||d.hasPositiveNumericValue&&1>c||d.hasOverloadedBooleanValue&&!1===c?Jf(a,b):d.mustUseProperty?a[d.propertyName]=c:(b=d.attributeName,(e=d.attributeNamespace)?a.setAttributeNS(e,b,""+c):d.hasBooleanValue||d.hasOverloadedBooleanValue&&!0===c?a.setAttribute(b,""):a.setAttribute(b,""+c))}else Kf(a,b,va(b,c)?c:null)}
function Kf(a,b,c){Hf(b)&&(null==c?a.removeAttribute(b):a.setAttribute(b,""+c))}function Jf(a,b){var c=wa(b);c?(b=c.mutationMethod)?b(a,void 0):c.mustUseProperty?a[c.propertyName]=c.hasBooleanValue?!1:"":a.removeAttribute(c.attributeName):a.removeAttribute(b)}
function Lf(a,b){var c=b.value,d=b.checked;return B({type:void 0,step:void 0,min:void 0,max:void 0},b,{defaultChecked:void 0,defaultValue:void 0,value:null!=c?c:a._wrapperState.initialValue,checked:null!=d?d:a._wrapperState.initialChecked})}function Mf(a,b){var c=b.defaultValue;a._wrapperState={initialChecked:null!=b.checked?b.checked:b.defaultChecked,initialValue:null!=b.value?b.value:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}
function Nf(a,b){b=b.checked;null!=b&&If(a,"checked",b)}function Of(a,b){Nf(a,b);var c=b.value;if(null!=c)if(0===c&&""===a.value)a.value="0";else if("number"===b.type){if(b=parseFloat(a.value)||0,c!=b||c==b&&a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else null==b.value&&null!=b.defaultValue&&a.defaultValue!==""+b.defaultValue&&(a.defaultValue=""+b.defaultValue),null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function Pf(a,b){switch(b.type){case "submit":case "reset":break;case "color":case "date":case "datetime":case "datetime-local":case "month":case "time":case "week":a.value="";a.value=a.defaultValue;break;default:a.value=a.value}b=a.name;""!==b&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!a.defaultChecked;""!==b&&(a.name=b)}function Qf(a){var b="";aa.Children.forEach(a,function(a){null==a||"string"!==typeof a&&"number"!==typeof a||(b+=a)});return b}
function Rf(a,b){a=B({children:void 0},b);if(b=Qf(b.children))a.children=b;return a}function Sf(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+c;b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function Tf(a,b){var c=b.value;a._wrapperState={initialValue:null!=c?c:b.defaultValue,wasMultiple:!!b.multiple}}function Uf(a,b){null!=b.dangerouslySetInnerHTML?E("91"):void 0;return B({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function Vf(a,b){var c=b.value;null==c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?E("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:E("93"),b=b[0]),c=""+b),null==c&&(c=""));a._wrapperState={initialValue:""+c}}
function Wf(a,b){var c=b.value;null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&(a.defaultValue=c));null!=b.defaultValue&&(a.defaultValue=b.defaultValue)}function Xf(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b)}var Yf={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function Zf(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function $f(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?Zf(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var ag=void 0,bg=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==Yf.svg||"innerHTML"in a)a.innerHTML=b;else{ag=ag||document.createElement("div");ag.innerHTML="\x3csvg\x3e"+b+"\x3c/svg\x3e";for(b=ag.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function cg(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var dg={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,
stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},eg=["Webkit","ms","Moz","O"];Object.keys(dg).forEach(function(a){eg.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);dg[b]=dg[a]})});
function fg(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--");var e=c;var f=b[c];e=null==f||"boolean"===typeof f||""===f?"":d||"number"!==typeof f||0===f||dg.hasOwnProperty(e)&&dg[e]?(""+f).trim():f+"px";"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var gg=B({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function hg(a,b,c){b&&(gg[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?E("137",a,c()):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?E("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?void 0:E("61")),null!=b.style&&"object"!==typeof b.style?E("62",c()):void 0)}
function ig(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var jg=Yf.html,kg=C.thatReturns("");
function lg(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=Hd(a);b=Sa[b];for(var d=0;d<b.length;d++){var e=b[d];c.hasOwnProperty(e)&&c[e]||("topScroll"===e?wd("topScroll","scroll",a):"topFocus"===e||"topBlur"===e?(wd("topFocus","focus",a),wd("topBlur","blur",a),c.topBlur=!0,c.topFocus=!0):"topCancel"===e?(yc("cancel",!0)&&wd("topCancel","cancel",a),c.topCancel=!0):"topClose"===e?(yc("close",!0)&&wd("topClose","close",a),c.topClose=!0):Dd.hasOwnProperty(e)&&U(e,Dd[e],a),c[e]=!0)}}
var mg={topAbort:"abort",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topSeeked:"seeked",topSeeking:"seeking",topStalled:"stalled",topSuspend:"suspend",topTimeUpdate:"timeupdate",topVolumeChange:"volumechange",
topWaiting:"waiting"};function ng(a,b,c,d){c=9===c.nodeType?c:c.ownerDocument;d===jg&&(d=Zf(a));d===jg?"script"===a?(a=c.createElement("div"),a.innerHTML="\x3cscript\x3e\x3c/script\x3e",a=a.removeChild(a.firstChild)):a="string"===typeof b.is?c.createElement(a,{is:b.is}):c.createElement(a):a=c.createElementNS(d,a);return a}function og(a,b){return(9===b.nodeType?b:b.ownerDocument).createTextNode(a)}
function pg(a,b,c,d){var e=ig(b,c);switch(b){case "iframe":case "object":U("topLoad","load",a);var f=c;break;case "video":case "audio":for(f in mg)mg.hasOwnProperty(f)&&U(f,mg[f],a);f=c;break;case "source":U("topError","error",a);f=c;break;case "img":case "image":U("topError","error",a);U("topLoad","load",a);f=c;break;case "form":U("topReset","reset",a);U("topSubmit","submit",a);f=c;break;case "details":U("topToggle","toggle",a);f=c;break;case "input":Mf(a,c);f=Lf(a,c);U("topInvalid","invalid",a);
lg(d,"onChange");break;case "option":f=Rf(a,c);break;case "select":Tf(a,c);f=B({},c,{value:void 0});U("topInvalid","invalid",a);lg(d,"onChange");break;case "textarea":Vf(a,c);f=Uf(a,c);U("topInvalid","invalid",a);lg(d,"onChange");break;default:f=c}hg(b,f,kg);var g=f,h;for(h in g)if(g.hasOwnProperty(h)){var k=g[h];"style"===h?fg(a,k,kg):"dangerouslySetInnerHTML"===h?(k=k?k.__html:void 0,null!=k&&bg(a,k)):"children"===h?"string"===typeof k?("textarea"!==b||""!==k)&&cg(a,k):"number"===typeof k&&cg(a,
""+k):"suppressContentEditableWarning"!==h&&"suppressHydrationWarning"!==h&&"autoFocus"!==h&&(Ra.hasOwnProperty(h)?null!=k&&lg(d,h):e?Kf(a,h,k):null!=k&&If(a,h,k))}switch(b){case "input":Bc(a);Pf(a,c);break;case "textarea":Bc(a);Xf(a,c);break;case "option":null!=c.value&&a.setAttribute("value",c.value);break;case "select":a.multiple=!!c.multiple;b=c.value;null!=b?Sf(a,!!c.multiple,b,!1):null!=c.defaultValue&&Sf(a,!!c.multiple,c.defaultValue,!0);break;default:"function"===typeof f.onClick&&(a.onclick=
C)}}
function sg(a,b,c,d,e){var f=null;switch(b){case "input":c=Lf(a,c);d=Lf(a,d);f=[];break;case "option":c=Rf(a,c);d=Rf(a,d);f=[];break;case "select":c=B({},c,{value:void 0});d=B({},d,{value:void 0});f=[];break;case "textarea":c=Uf(a,c);d=Uf(a,d);f=[];break;default:"function"!==typeof c.onClick&&"function"===typeof d.onClick&&(a.onclick=C)}hg(b,d,kg);var g,h;a=null;for(g in c)if(!d.hasOwnProperty(g)&&c.hasOwnProperty(g)&&null!=c[g])if("style"===g)for(h in b=c[g],b)b.hasOwnProperty(h)&&(a||(a={}),a[h]=
"");else"dangerouslySetInnerHTML"!==g&&"children"!==g&&"suppressContentEditableWarning"!==g&&"suppressHydrationWarning"!==g&&"autoFocus"!==g&&(Ra.hasOwnProperty(g)?f||(f=[]):(f=f||[]).push(g,null));for(g in d){var k=d[g];b=null!=c?c[g]:void 0;if(d.hasOwnProperty(g)&&k!==b&&(null!=k||null!=b))if("style"===g)if(b){for(h in b)!b.hasOwnProperty(h)||k&&k.hasOwnProperty(h)||(a||(a={}),a[h]="");for(h in k)k.hasOwnProperty(h)&&b[h]!==k[h]&&(a||(a={}),a[h]=k[h])}else a||(f||(f=[]),f.push(g,a)),a=k;else"dangerouslySetInnerHTML"===
g?(k=k?k.__html:void 0,b=b?b.__html:void 0,null!=k&&b!==k&&(f=f||[]).push(g,""+k)):"children"===g?b===k||"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(g,""+k):"suppressContentEditableWarning"!==g&&"suppressHydrationWarning"!==g&&(Ra.hasOwnProperty(g)?(null!=k&&lg(e,g),f||b===k||(f=[])):(f=f||[]).push(g,k))}a&&(f=f||[]).push("style",a);return f}
function tg(a,b,c,d,e){"input"===c&&"radio"===e.type&&null!=e.name&&Nf(a,e);ig(c,d);d=ig(c,e);for(var f=0;f<b.length;f+=2){var g=b[f],h=b[f+1];"style"===g?fg(a,h,kg):"dangerouslySetInnerHTML"===g?bg(a,h):"children"===g?cg(a,h):d?null!=h?Kf(a,g,h):a.removeAttribute(g):null!=h?If(a,g,h):Jf(a,g)}switch(c){case "input":Of(a,e);break;case "textarea":Wf(a,e);break;case "select":a._wrapperState.initialValue=void 0,b=a._wrapperState.wasMultiple,a._wrapperState.wasMultiple=!!e.multiple,c=e.value,null!=c?Sf(a,
!!e.multiple,c,!1):b!==!!e.multiple&&(null!=e.defaultValue?Sf(a,!!e.multiple,e.defaultValue,!0):Sf(a,!!e.multiple,e.multiple?[]:"",!1))}}
function ug(a,b,c,d,e){switch(b){case "iframe":case "object":U("topLoad","load",a);break;case "video":case "audio":for(var f in mg)mg.hasOwnProperty(f)&&U(f,mg[f],a);break;case "source":U("topError","error",a);break;case "img":case "image":U("topError","error",a);U("topLoad","load",a);break;case "form":U("topReset","reset",a);U("topSubmit","submit",a);break;case "details":U("topToggle","toggle",a);break;case "input":Mf(a,c);U("topInvalid","invalid",a);lg(e,"onChange");break;case "select":Tf(a,c);
U("topInvalid","invalid",a);lg(e,"onChange");break;case "textarea":Vf(a,c),U("topInvalid","invalid",a),lg(e,"onChange")}hg(b,c,kg);d=null;for(var g in c)c.hasOwnProperty(g)&&(f=c[g],"children"===g?"string"===typeof f?a.textContent!==f&&(d=["children",f]):"number"===typeof f&&a.textContent!==""+f&&(d=["children",""+f]):Ra.hasOwnProperty(g)&&null!=f&&lg(e,g));switch(b){case "input":Bc(a);Pf(a,c);break;case "textarea":Bc(a);Xf(a,c);break;case "select":case "option":break;default:"function"===typeof c.onClick&&
(a.onclick=C)}return d}function vg(a,b){return a.nodeValue!==b}
var wg=Object.freeze({createElement:ng,createTextNode:og,setInitialProperties:pg,diffProperties:sg,updateProperties:tg,diffHydratedProperties:ug,diffHydratedText:vg,warnForUnmatchedText:function(){},warnForDeletedHydratableElement:function(){},warnForDeletedHydratableText:function(){},warnForInsertedHydratedElement:function(){},warnForInsertedHydratedText:function(){},restoreControlledState:function(a,b,c){switch(b){case "input":Of(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=
c.parentNode;c=c.querySelectorAll("input[name\x3d"+JSON.stringify(""+b)+'][type\x3d"radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=rb(d);e?void 0:E("90");Cc(d);Of(d,e)}}}break;case "textarea":Wf(a,c);break;case "select":b=c.value,null!=b&&Sf(a,!!c.multiple,b,!1)}}});nc.injectFiberControlledHostComponent(wg);var xg=null,Mg=null;function Ng(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}
function Og(a){a=a?9===a.nodeType?a.documentElement:a.firstChild:null;return!(!a||1!==a.nodeType||!a.hasAttribute("data-reactroot"))}
var Z=of({getRootHostContext:function(a){var b=a.nodeType;switch(b){case 9:case 11:a=(a=a.documentElement)?a.namespaceURI:$f(null,"");break;default:b=8===b?a.parentNode:a,a=b.namespaceURI||null,b=b.tagName,a=$f(a,b)}return a},getChildHostContext:function(a,b){return $f(a,b)},getPublicInstance:function(a){return a},prepareForCommit:function(){xg=td;var a=da();if(Kd(a)){if("selectionStart"in a)var b={start:a.selectionStart,end:a.selectionEnd};else a:{var c=window.getSelection&&window.getSelection();
if(c&&0!==c.rangeCount){b=c.anchorNode;var d=c.anchorOffset,e=c.focusNode;c=c.focusOffset;try{b.nodeType,e.nodeType}catch(z){b=null;break a}var f=0,g=-1,h=-1,k=0,q=0,v=a,y=null;b:for(;;){for(var u;;){v!==b||0!==d&&3!==v.nodeType||(g=f+d);v!==e||0!==c&&3!==v.nodeType||(h=f+c);3===v.nodeType&&(f+=v.nodeValue.length);if(null===(u=v.firstChild))break;y=v;v=u}for(;;){if(v===a)break b;y===b&&++k===d&&(g=f);y===e&&++q===c&&(h=f);if(null!==(u=v.nextSibling))break;v=y;y=v.parentNode}v=u}b=-1===g||-1===h?null:
{start:g,end:h}}else b=null}b=b||{start:0,end:0}}else b=null;Mg={focusedElem:a,selectionRange:b};ud(!1)},resetAfterCommit:function(){var a=Mg,b=da(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&fa(document.documentElement,c)){if(Kd(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);else if(window.getSelection){b=window.getSelection();var e=c[Eb()].length;a=Math.min(d.start,e);d=void 0===d.end?a:Math.min(d.end,e);!b.extend&&a>
d&&(e=d,d=a,a=e);e=Jd(c,a);var f=Jd(c,d);if(e&&f&&(1!==b.rangeCount||b.anchorNode!==e.node||b.anchorOffset!==e.offset||b.focusNode!==f.node||b.focusOffset!==f.offset)){var g=document.createRange();g.setStart(e.node,e.offset);b.removeAllRanges();a>d?(b.addRange(g),b.extend(f.node,f.offset)):(g.setEnd(f.node,f.offset),b.addRange(g))}}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});ia(c);for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=
a.top}Mg=null;ud(xg);xg=null},createInstance:function(a,b,c,d,e){a=ng(a,b,c,d);a[Q]=e;a[ob]=b;return a},appendInitialChild:function(a,b){a.appendChild(b)},finalizeInitialChildren:function(a,b,c,d){pg(a,b,c,d);a:{switch(b){case "button":case "input":case "select":case "textarea":a=!!c.autoFocus;break a}a=!1}return a},prepareUpdate:function(a,b,c,d,e){return sg(a,b,c,d,e)},shouldSetTextContent:function(a,b){return"textarea"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===
typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&"string"===typeof b.dangerouslySetInnerHTML.__html},shouldDeprioritizeSubtree:function(a,b){return!!b.hidden},createTextInstance:function(a,b,c,d){a=og(a,b);a[Q]=d;return a},now:rf,mutation:{commitMount:function(a){a.focus()},commitUpdate:function(a,b,c,d,e){a[ob]=e;tg(a,b,c,d,e)},resetTextContent:function(a){a.textContent=""},commitTextUpdate:function(a,b,c){a.nodeValue=c},appendChild:function(a,b){a.appendChild(b)},appendChildToContainer:function(a,
b){8===a.nodeType?a.parentNode.insertBefore(b,a):a.appendChild(b)},insertBefore:function(a,b,c){a.insertBefore(b,c)},insertInContainerBefore:function(a,b,c){8===a.nodeType?a.parentNode.insertBefore(b,c):a.insertBefore(b,c)},removeChild:function(a,b){a.removeChild(b)},removeChildFromContainer:function(a,b){8===a.nodeType?a.parentNode.removeChild(b):a.removeChild(b)}},hydration:{canHydrateInstance:function(a,b){return 1!==a.nodeType||b.toLowerCase()!==a.nodeName.toLowerCase()?null:a},canHydrateTextInstance:function(a,
b){return""===b||3!==a.nodeType?null:a},getNextHydratableSibling:function(a){for(a=a.nextSibling;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a},getFirstHydratableChild:function(a){for(a=a.firstChild;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a},hydrateInstance:function(a,b,c,d,e,f){a[Q]=f;a[ob]=c;return ug(a,b,c,e,d)},hydrateTextInstance:function(a,b,c){a[Q]=c;return vg(a,b)},didNotMatchHydratedContainerTextInstance:function(){},didNotMatchHydratedTextInstance:function(){},
didNotHydrateContainerInstance:function(){},didNotHydrateInstance:function(){},didNotFindHydratableContainerInstance:function(){},didNotFindHydratableContainerTextInstance:function(){},didNotFindHydratableInstance:function(){},didNotFindHydratableTextInstance:function(){}},scheduleDeferredCallback:sf,cancelDeferredCallback:tf,useSyncScheduling:!0});rc=Z.batchedUpdates;
function Pg(a,b,c,d,e){Ng(c)?void 0:E("200");var f=c._reactRootContainer;if(f)Z.updateContainer(b,f,a,e);else{d=d||Og(c);if(!d)for(f=void 0;f=c.lastChild;)c.removeChild(f);var g=Z.createContainer(c,d);f=c._reactRootContainer=g;Z.unbatchedUpdates(function(){Z.updateContainer(b,g,a,e)})}return Z.getPublicRootInstance(f)}function Qg(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;Ng(b)?void 0:E("200");return pf(a,b,null,c)}
function Rg(a,b){this._reactRootContainer=Z.createContainer(a,b)}Rg.prototype.render=function(a,b){Z.updateContainer(a,this._reactRootContainer,null,b)};Rg.prototype.unmount=function(a){Z.updateContainer(null,this._reactRootContainer,null,a)};
var Sg={createPortal:Qg,findDOMNode:function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternalFiber;if(b)return Z.findHostInstance(b);"function"===typeof a.render?E("188"):E("213",Object.keys(a))},hydrate:function(a,b,c){return Pg(null,a,b,!0,c)},render:function(a,b,c){return Pg(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){null==a||void 0===a._reactInternalFiber?E("38"):void 0;return Pg(a,b,c,!1,d)},unmountComponentAtNode:function(a){Ng(a)?void 0:
E("40");return a._reactRootContainer?(Z.unbatchedUpdates(function(){Pg(null,null,a,!1,function(){a._reactRootContainer=null})}),!0):!1},unstable_createPortal:Qg,unstable_batchedUpdates:tc,unstable_deferredUpdates:Z.deferredUpdates,flushSync:Z.flushSync,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{EventPluginHub:mb,EventPluginRegistry:Va,EventPropagators:Cb,ReactControlledComponent:qc,ReactDOMComponentTree:sb,ReactDOMEventListener:xd}};
Z.injectIntoDevTools({findFiberByHostInstance:pb,bundleType:0,version:"16.2.0",rendererPackageName:"react-dom"});var Tg=Object.freeze({default:Sg}),Ug=Tg&&Sg||Tg;module.exports=Ug["default"]?Ug["default"]:Ug;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = __webpack_require__(23);

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.2.0
 * react-dom.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

var React = __webpack_require__(4);
var invariant = __webpack_require__(5);
var warning = __webpack_require__(6);
var ExecutionEnvironment = __webpack_require__(8);
var _assign = __webpack_require__(2);
var emptyFunction = __webpack_require__(1);
var EventListener = __webpack_require__(9);
var getActiveElement = __webpack_require__(10);
var shallowEqual = __webpack_require__(11);
var containsNode = __webpack_require__(12);
var focusNode = __webpack_require__(13);
var emptyObject = __webpack_require__(3);
var checkPropTypes = __webpack_require__(7);
var hyphenateStyleName = __webpack_require__(25);
var camelizeStyleName = __webpack_require__(27);

/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

!React ? invariant(false, 'ReactDOM was loaded before React. Make sure you load the React package before loading ReactDOM.') : void 0;

// These attributes should be all lowercase to allow for
// case insensitive checks
var RESERVED_PROPS = {
  children: true,
  dangerouslySetInnerHTML: true,
  defaultValue: true,
  defaultChecked: true,
  innerHTML: true,
  suppressContentEditableWarning: true,
  suppressHydrationWarning: true,
  style: true
};

function checkMask(value, bitmask) {
  return (value & bitmask) === bitmask;
}

var DOMPropertyInjection = {
  /**
   * Mapping from normalized, camelcased property names to a configuration that
   * specifies how the associated DOM property should be accessed or rendered.
   */
  MUST_USE_PROPERTY: 0x1,
  HAS_BOOLEAN_VALUE: 0x4,
  HAS_NUMERIC_VALUE: 0x8,
  HAS_POSITIVE_NUMERIC_VALUE: 0x10 | 0x8,
  HAS_OVERLOADED_BOOLEAN_VALUE: 0x20,
  HAS_STRING_BOOLEAN_VALUE: 0x40,

  /**
   * Inject some specialized knowledge about the DOM. This takes a config object
   * with the following properties:
   *
   * Properties: object mapping DOM property name to one of the
   * DOMPropertyInjection constants or null. If your attribute isn't in here,
   * it won't get written to the DOM.
   *
   * DOMAttributeNames: object mapping React attribute name to the DOM
   * attribute name. Attribute names not specified use the **lowercase**
   * normalized name.
   *
   * DOMAttributeNamespaces: object mapping React attribute name to the DOM
   * attribute namespace URL. (Attribute names not specified use no namespace.)
   *
   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
   * Property names not specified use the normalized name.
   *
   * DOMMutationMethods: Properties that require special mutation methods. If
   * `value` is undefined, the mutation method should unset the property.
   *
   * @param {object} domPropertyConfig the config as described above.
   */
  injectDOMPropertyConfig: function (domPropertyConfig) {
    var Injection = DOMPropertyInjection;
    var Properties = domPropertyConfig.Properties || {};
    var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

    for (var propName in Properties) {
      !!properties.hasOwnProperty(propName) ? invariant(false, "injectDOMPropertyConfig(...): You're trying to inject DOM property '%s' which has already been injected. You may be accidentally injecting the same DOM property config twice, or you may be injecting two configs that have conflicting property names.", propName) : void 0;

      var lowerCased = propName.toLowerCase();
      var propConfig = Properties[propName];

      var propertyInfo = {
        attributeName: lowerCased,
        attributeNamespace: null,
        propertyName: propName,
        mutationMethod: null,

        mustUseProperty: checkMask(propConfig, Injection.MUST_USE_PROPERTY),
        hasBooleanValue: checkMask(propConfig, Injection.HAS_BOOLEAN_VALUE),
        hasNumericValue: checkMask(propConfig, Injection.HAS_NUMERIC_VALUE),
        hasPositiveNumericValue: checkMask(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
        hasOverloadedBooleanValue: checkMask(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE),
        hasStringBooleanValue: checkMask(propConfig, Injection.HAS_STRING_BOOLEAN_VALUE)
      };
      !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? invariant(false, "DOMProperty: Value can be one of boolean, overloaded boolean, or numeric value, but not a combination: %s", propName) : void 0;

      if (DOMAttributeNames.hasOwnProperty(propName)) {
        var attributeName = DOMAttributeNames[propName];

        propertyInfo.attributeName = attributeName;
      }

      if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
        propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
      }

      if (DOMMutationMethods.hasOwnProperty(propName)) {
        propertyInfo.mutationMethod = DOMMutationMethods[propName];
      }

      // Downcase references to whitelist properties to check for membership
      // without case-sensitivity. This allows the whitelist to pick up
      // `allowfullscreen`, which should be written using the property configuration
      // for `allowFullscreen`
      properties[propName] = propertyInfo;
    }
  }
};

/* eslint-disable max-len */
var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
/* eslint-enable max-len */
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";


var ROOT_ATTRIBUTE_NAME = 'data-reactroot';

/**
 * Map from property "standard name" to an object with info about how to set
 * the property in the DOM. Each object contains:
 *
 * attributeName:
 *   Used when rendering markup or with `*Attribute()`.
 * attributeNamespace
 * propertyName:
 *   Used on DOM node instances. (This includes properties that mutate due to
 *   external factors.)
 * mutationMethod:
 *   If non-null, used instead of the property or `setAttribute()` after
 *   initial render.
 * mustUseProperty:
 *   Whether the property must be accessed and mutated as an object property.
 * hasBooleanValue:
 *   Whether the property should be removed when set to a falsey value.
 * hasNumericValue:
 *   Whether the property must be numeric or parse as a numeric and should be
 *   removed when set to a falsey value.
 * hasPositiveNumericValue:
 *   Whether the property must be positive numeric or parse as a positive
 *   numeric and should be removed when set to a falsey value.
 * hasOverloadedBooleanValue:
 *   Whether the property can be used as a flag as well as with a value.
 *   Removed when strictly equal to false; present without a value when
 *   strictly equal to true; present with a value otherwise.
 */
var properties = {};

/**
 * Checks whether a property name is a writeable attribute.
 * @method
 */
function shouldSetAttribute(name, value) {
  if (isReservedProp(name)) {
    return false;
  }
  if (name.length > 2 && (name[0] === 'o' || name[0] === 'O') && (name[1] === 'n' || name[1] === 'N')) {
    return false;
  }
  if (value === null) {
    return true;
  }
  switch (typeof value) {
    case 'boolean':
      return shouldAttributeAcceptBooleanValue(name);
    case 'undefined':
    case 'number':
    case 'string':
    case 'object':
      return true;
    default:
      // function, symbol
      return false;
  }
}

function getPropertyInfo(name) {
  return properties.hasOwnProperty(name) ? properties[name] : null;
}

function shouldAttributeAcceptBooleanValue(name) {
  if (isReservedProp(name)) {
    return true;
  }
  var propertyInfo = getPropertyInfo(name);
  if (propertyInfo) {
    return propertyInfo.hasBooleanValue || propertyInfo.hasStringBooleanValue || propertyInfo.hasOverloadedBooleanValue;
  }
  var prefix = name.toLowerCase().slice(0, 5);
  return prefix === 'data-' || prefix === 'aria-';
}

/**
 * Checks to see if a property name is within the list of properties
 * reserved for internal React operations. These properties should
 * not be set on an HTML element.
 *
 * @private
 * @param {string} name
 * @return {boolean} If the name is within reserved props
 */
function isReservedProp(name) {
  return RESERVED_PROPS.hasOwnProperty(name);
}

var injection = DOMPropertyInjection;

var MUST_USE_PROPERTY = injection.MUST_USE_PROPERTY;
var HAS_BOOLEAN_VALUE = injection.HAS_BOOLEAN_VALUE;
var HAS_NUMERIC_VALUE = injection.HAS_NUMERIC_VALUE;
var HAS_POSITIVE_NUMERIC_VALUE = injection.HAS_POSITIVE_NUMERIC_VALUE;
var HAS_OVERLOADED_BOOLEAN_VALUE = injection.HAS_OVERLOADED_BOOLEAN_VALUE;
var HAS_STRING_BOOLEAN_VALUE = injection.HAS_STRING_BOOLEAN_VALUE;

var HTMLDOMPropertyConfig = {
  // When adding attributes to this list, be sure to also add them to
  // the `possibleStandardNames` module to ensure casing and incorrect
  // name warnings.
  Properties: {
    allowFullScreen: HAS_BOOLEAN_VALUE,
    // specifies target context for links with `preload` type
    async: HAS_BOOLEAN_VALUE,
    // Note: there is a special case that prevents it from being written to the DOM
    // on the client side because the browsers are inconsistent. Instead we call focus().
    autoFocus: HAS_BOOLEAN_VALUE,
    autoPlay: HAS_BOOLEAN_VALUE,
    capture: HAS_OVERLOADED_BOOLEAN_VALUE,
    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    cols: HAS_POSITIVE_NUMERIC_VALUE,
    contentEditable: HAS_STRING_BOOLEAN_VALUE,
    controls: HAS_BOOLEAN_VALUE,
    'default': HAS_BOOLEAN_VALUE,
    defer: HAS_BOOLEAN_VALUE,
    disabled: HAS_BOOLEAN_VALUE,
    download: HAS_OVERLOADED_BOOLEAN_VALUE,
    draggable: HAS_STRING_BOOLEAN_VALUE,
    formNoValidate: HAS_BOOLEAN_VALUE,
    hidden: HAS_BOOLEAN_VALUE,
    loop: HAS_BOOLEAN_VALUE,
    // Caution; `option.selected` is not updated if `select.multiple` is
    // disabled with `removeAttribute`.
    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    noValidate: HAS_BOOLEAN_VALUE,
    open: HAS_BOOLEAN_VALUE,
    playsInline: HAS_BOOLEAN_VALUE,
    readOnly: HAS_BOOLEAN_VALUE,
    required: HAS_BOOLEAN_VALUE,
    reversed: HAS_BOOLEAN_VALUE,
    rows: HAS_POSITIVE_NUMERIC_VALUE,
    rowSpan: HAS_NUMERIC_VALUE,
    scoped: HAS_BOOLEAN_VALUE,
    seamless: HAS_BOOLEAN_VALUE,
    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    size: HAS_POSITIVE_NUMERIC_VALUE,
    start: HAS_NUMERIC_VALUE,
    // support for projecting regular DOM Elements via V1 named slots ( shadow dom )
    span: HAS_POSITIVE_NUMERIC_VALUE,
    spellCheck: HAS_STRING_BOOLEAN_VALUE,
    // Style must be explicitly set in the attribute list. React components
    // expect a style object
    style: 0,
    // Keep it in the whitelist because it is case-sensitive for SVG.
    tabIndex: 0,
    // itemScope is for for Microdata support.
    // See http://schema.org/docs/gs.html
    itemScope: HAS_BOOLEAN_VALUE,
    // These attributes must stay in the white-list because they have
    // different attribute names (see DOMAttributeNames below)
    acceptCharset: 0,
    className: 0,
    htmlFor: 0,
    httpEquiv: 0,
    // Attributes with mutation methods must be specified in the whitelist
    // Set the string boolean flag to allow the behavior
    value: HAS_STRING_BOOLEAN_VALUE
  },
  DOMAttributeNames: {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv'
  },
  DOMMutationMethods: {
    value: function (node, value) {
      if (value == null) {
        return node.removeAttribute('value');
      }

      // Number inputs get special treatment due to some edge cases in
      // Chrome. Let everything else assign the value attribute as normal.
      // https://github.com/facebook/react/issues/7253#issuecomment-236074326
      if (node.type !== 'number' || node.hasAttribute('value') === false) {
        node.setAttribute('value', '' + value);
      } else if (node.validity && !node.validity.badInput && node.ownerDocument.activeElement !== node) {
        // Don't assign an attribute if validation reports bad
        // input. Chrome will clear the value. Additionally, don't
        // operate on inputs that have focus, otherwise Chrome might
        // strip off trailing decimal places and cause the user's
        // cursor position to jump to the beginning of the input.
        //
        // In ReactDOMInput, we have an onBlur event that will trigger
        // this function again when focus is lost.
        node.setAttribute('value', '' + value);
      }
    }
  }
};

var HAS_STRING_BOOLEAN_VALUE$1 = injection.HAS_STRING_BOOLEAN_VALUE;


var NS = {
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace'
};

/**
 * This is a list of all SVG attributes that need special casing,
 * namespacing, or boolean value assignment.
 *
 * When adding attributes to this list, be sure to also add them to
 * the `possibleStandardNames` module to ensure casing and incorrect
 * name warnings.
 *
 * SVG Attributes List:
 * https://www.w3.org/TR/SVG/attindex.html
 * SMIL Spec:
 * https://www.w3.org/TR/smil
 */
var ATTRS = ['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'x-height', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xmlns:xlink', 'xml:lang', 'xml:space'];

var SVGDOMPropertyConfig = {
  Properties: {
    autoReverse: HAS_STRING_BOOLEAN_VALUE$1,
    externalResourcesRequired: HAS_STRING_BOOLEAN_VALUE$1,
    preserveAlpha: HAS_STRING_BOOLEAN_VALUE$1
  },
  DOMAttributeNames: {
    autoReverse: 'autoReverse',
    externalResourcesRequired: 'externalResourcesRequired',
    preserveAlpha: 'preserveAlpha'
  },
  DOMAttributeNamespaces: {
    xlinkActuate: NS.xlink,
    xlinkArcrole: NS.xlink,
    xlinkHref: NS.xlink,
    xlinkRole: NS.xlink,
    xlinkShow: NS.xlink,
    xlinkTitle: NS.xlink,
    xlinkType: NS.xlink,
    xmlBase: NS.xml,
    xmlLang: NS.xml,
    xmlSpace: NS.xml
  }
};

var CAMELIZE = /[\-\:]([a-z])/g;
var capitalize = function (token) {
  return token[1].toUpperCase();
};

ATTRS.forEach(function (original) {
  var reactName = original.replace(CAMELIZE, capitalize);

  SVGDOMPropertyConfig.Properties[reactName] = 0;
  SVGDOMPropertyConfig.DOMAttributeNames[reactName] = original;
});

injection.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
injection.injectDOMPropertyConfig(SVGDOMPropertyConfig);

var ReactErrorUtils = {
  // Used by Fiber to simulate a try-catch.
  _caughtError: null,
  _hasCaughtError: false,

  // Used by event system to capture/rethrow the first error.
  _rethrowError: null,
  _hasRethrowError: false,

  injection: {
    injectErrorUtils: function (injectedErrorUtils) {
      !(typeof injectedErrorUtils.invokeGuardedCallback === 'function') ? invariant(false, 'Injected invokeGuardedCallback() must be a function.') : void 0;
      invokeGuardedCallback = injectedErrorUtils.invokeGuardedCallback;
    }
  },

  /**
   * Call a function while guarding against errors that happens within it.
   * Returns an error if it throws, otherwise null.
   *
   * In production, this is implemented using a try-catch. The reason we don't
   * use a try-catch directly is so that we can swap out a different
   * implementation in DEV mode.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */
  invokeGuardedCallback: function (name, func, context, a, b, c, d, e, f) {
    invokeGuardedCallback.apply(ReactErrorUtils, arguments);
  },

  /**
   * Same as invokeGuardedCallback, but instead of returning an error, it stores
   * it in a global so it can be rethrown by `rethrowCaughtError` later.
   * TODO: See if _caughtError and _rethrowError can be unified.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */
  invokeGuardedCallbackAndCatchFirstError: function (name, func, context, a, b, c, d, e, f) {
    ReactErrorUtils.invokeGuardedCallback.apply(this, arguments);
    if (ReactErrorUtils.hasCaughtError()) {
      var error = ReactErrorUtils.clearCaughtError();
      if (!ReactErrorUtils._hasRethrowError) {
        ReactErrorUtils._hasRethrowError = true;
        ReactErrorUtils._rethrowError = error;
      }
    }
  },

  /**
   * During execution of guarded functions we will capture the first error which
   * we will rethrow to be handled by the top level error handler.
   */
  rethrowCaughtError: function () {
    return rethrowCaughtError.apply(ReactErrorUtils, arguments);
  },

  hasCaughtError: function () {
    return ReactErrorUtils._hasCaughtError;
  },

  clearCaughtError: function () {
    if (ReactErrorUtils._hasCaughtError) {
      var error = ReactErrorUtils._caughtError;
      ReactErrorUtils._caughtError = null;
      ReactErrorUtils._hasCaughtError = false;
      return error;
    } else {
      invariant(false, 'clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.');
    }
  }
};

var invokeGuardedCallback = function (name, func, context, a, b, c, d, e, f) {
  ReactErrorUtils._hasCaughtError = false;
  ReactErrorUtils._caughtError = null;
  var funcArgs = Array.prototype.slice.call(arguments, 3);
  try {
    func.apply(context, funcArgs);
  } catch (error) {
    ReactErrorUtils._caughtError = error;
    ReactErrorUtils._hasCaughtError = true;
  }
};

{
  // In DEV mode, we swap out invokeGuardedCallback for a special version
  // that plays more nicely with the browser's DevTools. The idea is to preserve
  // "Pause on exceptions" behavior. Because React wraps all user-provided
  // functions in invokeGuardedCallback, and the production version of
  // invokeGuardedCallback uses a try-catch, all user exceptions are treated
  // like caught exceptions, and the DevTools won't pause unless the developer
  // takes the extra step of enabling pause on caught exceptions. This is
  // untintuitive, though, because even though React has caught the error, from
  // the developer's perspective, the error is uncaught.
  //
  // To preserve the expected "Pause on exceptions" behavior, we don't use a
  // try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
  // DOM node, and call the user-provided callback from inside an event handler
  // for that fake event. If the callback throws, the error is "captured" using
  // a global event handler. But because the error happens in a different
  // event loop context, it does not interrupt the normal program flow.
  // Effectively, this gives us try-catch behavior without actually using
  // try-catch. Neat!

  // Check that the browser supports the APIs we need to implement our special
  // DEV version of invokeGuardedCallback
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
    var fakeNode = document.createElement('react');

    var invokeGuardedCallbackDev = function (name, func, context, a, b, c, d, e, f) {
      // Keeps track of whether the user-provided callback threw an error. We
      // set this to true at the beginning, then set it to false right after
      // calling the function. If the function errors, `didError` will never be
      // set to false. This strategy works even if the browser is flaky and
      // fails to call our global error handler, because it doesn't rely on
      // the error event at all.
      var didError = true;

      // Create an event handler for our fake event. We will synchronously
      // dispatch our fake event using `dispatchEvent`. Inside the handler, we
      // call the user-provided callback.
      var funcArgs = Array.prototype.slice.call(arguments, 3);
      function callCallback() {
        // We immediately remove the callback from event listeners so that
        // nested `invokeGuardedCallback` calls do not clash. Otherwise, a
        // nested call would trigger the fake event handlers of any call higher
        // in the stack.
        fakeNode.removeEventListener(evtType, callCallback, false);
        func.apply(context, funcArgs);
        didError = false;
      }

      // Create a global error event handler. We use this to capture the value
      // that was thrown. It's possible that this error handler will fire more
      // than once; for example, if non-React code also calls `dispatchEvent`
      // and a handler for that event throws. We should be resilient to most of
      // those cases. Even if our error event handler fires more than once, the
      // last error event is always used. If the callback actually does error,
      // we know that the last error event is the correct one, because it's not
      // possible for anything else to have happened in between our callback
      // erroring and the code that follows the `dispatchEvent` call below. If
      // the callback doesn't error, but the error event was fired, we know to
      // ignore it because `didError` will be false, as described above.
      var error = void 0;
      // Use this to track whether the error event is ever called.
      var didSetError = false;
      var isCrossOriginError = false;

      function onError(event) {
        error = event.error;
        didSetError = true;
        if (error === null && event.colno === 0 && event.lineno === 0) {
          isCrossOriginError = true;
        }
      }

      // Create a fake event type.
      var evtType = 'react-' + (name ? name : 'invokeguardedcallback');

      // Attach our event handlers
      window.addEventListener('error', onError);
      fakeNode.addEventListener(evtType, callCallback, false);

      // Synchronously dispatch our fake event. If the user-provided function
      // errors, it will trigger our global error handler.
      var evt = document.createEvent('Event');
      evt.initEvent(evtType, false, false);
      fakeNode.dispatchEvent(evt);

      if (didError) {
        if (!didSetError) {
          // The callback errored, but the error event never fired.
          error = new Error('An error was thrown inside one of your components, but React ' + "doesn't know what it was. This is likely due to browser " + 'flakiness. React does its best to preserve the "Pause on ' + 'exceptions" behavior of the DevTools, which requires some ' + "DEV-mode only tricks. It's possible that these don't work in " + 'your browser. Try triggering the error in production mode, ' + 'or switching to a modern browser. If you suspect that this is ' + 'actually an issue with React, please file an issue.');
        } else if (isCrossOriginError) {
          error = new Error("A cross-origin error was thrown. React doesn't have access to " + 'the actual error object in development. ' + 'See https://fb.me/react-crossorigin-error for more information.');
        }
        ReactErrorUtils._hasCaughtError = true;
        ReactErrorUtils._caughtError = error;
      } else {
        ReactErrorUtils._hasCaughtError = false;
        ReactErrorUtils._caughtError = null;
      }

      // Remove our event listeners
      window.removeEventListener('error', onError);
    };

    invokeGuardedCallback = invokeGuardedCallbackDev;
  }
}

var rethrowCaughtError = function () {
  if (ReactErrorUtils._hasRethrowError) {
    var error = ReactErrorUtils._rethrowError;
    ReactErrorUtils._rethrowError = null;
    ReactErrorUtils._hasRethrowError = false;
    throw error;
  }
};

/**
 * Injectable ordering of event plugins.
 */
var eventPluginOrder = null;

/**
 * Injectable mapping from names to event plugin modules.
 */
var namesToPlugins = {};

/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */
function recomputePluginOrdering() {
  if (!eventPluginOrder) {
    // Wait until an `eventPluginOrder` is injected.
    return;
  }
  for (var pluginName in namesToPlugins) {
    var pluginModule = namesToPlugins[pluginName];
    var pluginIndex = eventPluginOrder.indexOf(pluginName);
    !(pluginIndex > -1) ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.', pluginName) : void 0;
    if (plugins[pluginIndex]) {
      continue;
    }
    !pluginModule.extractEvents ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.', pluginName) : void 0;
    plugins[pluginIndex] = pluginModule;
    var publishedEvents = pluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      !publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName) ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : void 0;
    }
  }
}

/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */
function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
  !!eventNameDispatchConfigs.hasOwnProperty(eventName) ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.', eventName) : void 0;
  eventNameDispatchConfigs[eventName] = dispatchConfig;

  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
    return true;
  }
  return false;
}

/**
 * Publishes a registration name that is used to identify dispatched events.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */
function publishRegistrationName(registrationName, pluginModule, eventName) {
  !!registrationNameModules[registrationName] ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.', registrationName) : void 0;
  registrationNameModules[registrationName] = pluginModule;
  registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;

  {
    var lowerCasedName = registrationName.toLowerCase();
    possibleRegistrationNames[lowerCasedName] = registrationName;

    if (registrationName === 'onDoubleClick') {
      possibleRegistrationNames.ondblclick = registrationName;
    }
  }
}

/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */

/**
 * Ordered list of injected plugins.
 */
var plugins = [];

/**
 * Mapping from event name to dispatch config
 */
var eventNameDispatchConfigs = {};

/**
 * Mapping from registration name to plugin module
 */
var registrationNameModules = {};

/**
 * Mapping from registration name to event name
 */
var registrationNameDependencies = {};

/**
 * Mapping from lowercase registration names to the properly cased version,
 * used to warn in the case of missing event handlers. Available
 * only in true.
 * @type {Object}
 */
var possibleRegistrationNames = {};
// Trust the developer to only use possibleRegistrationNames in true

/**
 * Injects an ordering of plugins (by plugin name). This allows the ordering
 * to be decoupled from injection of the actual plugins so that ordering is
 * always deterministic regardless of packaging, on-the-fly injection, etc.
 *
 * @param {array} InjectedEventPluginOrder
 * @internal
 * @see {EventPluginHub.injection.injectEventPluginOrder}
 */
function injectEventPluginOrder(injectedEventPluginOrder) {
  !!eventPluginOrder ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.') : void 0;
  // Clone the ordering so it cannot be dynamically mutated.
  eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
  recomputePluginOrdering();
}

/**
 * Injects plugins to be used by `EventPluginHub`. The plugin names must be
 * in the ordering injected by `injectEventPluginOrder`.
 *
 * Plugins can be injected as part of page initialization or on-the-fly.
 *
 * @param {object} injectedNamesToPlugins Map from names to plugin modules.
 * @internal
 * @see {EventPluginHub.injection.injectEventPluginsByName}
 */
function injectEventPluginsByName(injectedNamesToPlugins) {
  var isOrderingDirty = false;
  for (var pluginName in injectedNamesToPlugins) {
    if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
      continue;
    }
    var pluginModule = injectedNamesToPlugins[pluginName];
    if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
      !!namesToPlugins[pluginName] ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.', pluginName) : void 0;
      namesToPlugins[pluginName] = pluginModule;
      isOrderingDirty = true;
    }
  }
  if (isOrderingDirty) {
    recomputePluginOrdering();
  }
}

var EventPluginRegistry = Object.freeze({
	plugins: plugins,
	eventNameDispatchConfigs: eventNameDispatchConfigs,
	registrationNameModules: registrationNameModules,
	registrationNameDependencies: registrationNameDependencies,
	possibleRegistrationNames: possibleRegistrationNames,
	injectEventPluginOrder: injectEventPluginOrder,
	injectEventPluginsByName: injectEventPluginsByName
});

var getFiberCurrentPropsFromNode = null;
var getInstanceFromNode = null;
var getNodeFromInstance = null;

var injection$2 = {
  injectComponentTree: function (Injected) {
    getFiberCurrentPropsFromNode = Injected.getFiberCurrentPropsFromNode;
    getInstanceFromNode = Injected.getInstanceFromNode;
    getNodeFromInstance = Injected.getNodeFromInstance;

    {
      warning(getNodeFromInstance && getInstanceFromNode, 'EventPluginUtils.injection.injectComponentTree(...): Injected ' + 'module is missing getNodeFromInstance or getInstanceFromNode.');
    }
  }
};






var validateEventDispatches;
{
  validateEventDispatches = function (event) {
    var dispatchListeners = event._dispatchListeners;
    var dispatchInstances = event._dispatchInstances;

    var listenersIsArr = Array.isArray(dispatchListeners);
    var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;

    var instancesIsArr = Array.isArray(dispatchInstances);
    var instancesLen = instancesIsArr ? dispatchInstances.length : dispatchInstances ? 1 : 0;

    warning(instancesIsArr === listenersIsArr && instancesLen === listenersLen, 'EventPluginUtils: Invalid `event`.');
  };
}

/**
 * Dispatch the event to the listener.
 * @param {SyntheticEvent} event SyntheticEvent to handle
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @param {function} listener Application-level callback
 * @param {*} inst Internal component instance
 */
function executeDispatch(event, simulated, listener, inst) {
  var type = event.type || 'unknown-event';
  event.currentTarget = getNodeFromInstance(inst);
  ReactErrorUtils.invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
  event.currentTarget = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches.
 */
function executeDispatchesInOrder(event, simulated) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchInstances = event._dispatchInstances;
  {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and Instances are two parallel arrays that are always in sync.
      executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);
    }
  } else if (dispatchListeners) {
    executeDispatch(event, simulated, dispatchListeners, dispatchInstances);
  }
  event._dispatchListeners = null;
  event._dispatchInstances = null;
}

/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 */


/**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return {*} The return value of executing the single dispatch.
 */


/**
 * @param {SyntheticEvent} event
 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
 */

/**
 * Accumulates items that must not be null or undefined into the first one. This
 * is used to conserve memory by avoiding array allocations, and thus sacrifices
 * API cleanness. Since `current` can be null before being passed in and not
 * null after this function, make sure to assign it back to `current`:
 *
 * `a = accumulateInto(a, b);`
 *
 * This API should be sparingly used. Try `accumulate` for something cleaner.
 *
 * @return {*|array<*>} An accumulation of items.
 */

function accumulateInto(current, next) {
  !(next != null) ? invariant(false, 'accumulateInto(...): Accumulated items must not be null or undefined.') : void 0;

  if (current == null) {
    return next;
  }

  // Both are not empty. Warning: Never call x.concat(y) when you are not
  // certain that x is an Array (x could be a string with concat method).
  if (Array.isArray(current)) {
    if (Array.isArray(next)) {
      current.push.apply(current, next);
      return current;
    }
    current.push(next);
    return current;
  }

  if (Array.isArray(next)) {
    // A bit too dangerous to mutate `next`.
    return [current].concat(next);
  }

  return [current, next];
}

/**
 * @param {array} arr an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 * @param {function} cb Callback invoked with each element or a collection.
 * @param {?} [scope] Scope used as `this` in a callback.
 */
function forEachAccumulated(arr, cb, scope) {
  if (Array.isArray(arr)) {
    arr.forEach(cb, scope);
  } else if (arr) {
    cb.call(scope, arr);
  }
}

/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */
var eventQueue = null;

/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @private
 */
var executeDispatchesAndRelease = function (event, simulated) {
  if (event) {
    executeDispatchesInOrder(event, simulated);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};
var executeDispatchesAndReleaseSimulated = function (e) {
  return executeDispatchesAndRelease(e, true);
};
var executeDispatchesAndReleaseTopLevel = function (e) {
  return executeDispatchesAndRelease(e, false);
};

function isInteractive(tag) {
  return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
}

function shouldPreventMouseEvent(name, type, props) {
  switch (name) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
      return !!(props.disabled && isInteractive(type));
    default:
      return false;
  }
}

/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */

/**
 * Methods for injecting dependencies.
 */
var injection$1 = {
  /**
   * @param {array} InjectedEventPluginOrder
   * @public
   */
  injectEventPluginOrder: injectEventPluginOrder,

  /**
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   */
  injectEventPluginsByName: injectEventPluginsByName
};

/**
 * @param {object} inst The instance, which is the source of events.
 * @param {string} registrationName Name of listener (e.g. `onClick`).
 * @return {?function} The stored callback.
 */
function getListener(inst, registrationName) {
  var listener;

  // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
  // live here; needs to be moved to a better place soon
  var stateNode = inst.stateNode;
  if (!stateNode) {
    // Work in progress (ex: onload events in incremental mode).
    return null;
  }
  var props = getFiberCurrentPropsFromNode(stateNode);
  if (!props) {
    // Work in progress.
    return null;
  }
  listener = props[registrationName];
  if (shouldPreventMouseEvent(registrationName, inst.type, props)) {
    return null;
  }
  !(!listener || typeof listener === 'function') ? invariant(false, 'Expected `%s` listener to be a function, instead got a value of `%s` type.', registrationName, typeof listener) : void 0;
  return listener;
}

/**
 * Allows registered plugins an opportunity to extract events from top-level
 * native browser events.
 *
 * @return {*} An accumulation of synthetic events.
 * @internal
 */
function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var events;
  for (var i = 0; i < plugins.length; i++) {
    // Not every plugin in the ordering may be loaded at runtime.
    var possiblePlugin = plugins[i];
    if (possiblePlugin) {
      var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
      if (extractedEvents) {
        events = accumulateInto(events, extractedEvents);
      }
    }
  }
  return events;
}

/**
 * Enqueues a synthetic event that should be dispatched when
 * `processEventQueue` is invoked.
 *
 * @param {*} events An accumulation of synthetic events.
 * @internal
 */
function enqueueEvents(events) {
  if (events) {
    eventQueue = accumulateInto(eventQueue, events);
  }
}

/**
 * Dispatches all synthetic events on the event queue.
 *
 * @internal
 */
function processEventQueue(simulated) {
  // Set `eventQueue` to null before processing it so that we can tell if more
  // events get enqueued while processing.
  var processingEventQueue = eventQueue;
  eventQueue = null;

  if (!processingEventQueue) {
    return;
  }

  if (simulated) {
    forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseSimulated);
  } else {
    forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
  }
  !!eventQueue ? invariant(false, 'processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.') : void 0;
  // This would be a good time to rethrow if any of the event handlers threw.
  ReactErrorUtils.rethrowCaughtError();
}

var EventPluginHub = Object.freeze({
	injection: injection$1,
	getListener: getListener,
	extractEvents: extractEvents,
	enqueueEvents: enqueueEvents,
	processEventQueue: processEventQueue
});

var IndeterminateComponent = 0; // Before we know whether it is functional or class
var FunctionalComponent = 1;
var ClassComponent = 2;
var HostRoot = 3; // Root of a host tree. Could be nested inside another node.
var HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
var HostComponent = 5;
var HostText = 6;
var CallComponent = 7;
var CallHandlerPhase = 8;
var ReturnComponent = 9;
var Fragment = 10;

var randomKey = Math.random().toString(36).slice(2);
var internalInstanceKey = '__reactInternalInstance$' + randomKey;
var internalEventHandlersKey = '__reactEventHandlers$' + randomKey;

function precacheFiberNode$1(hostInst, node) {
  node[internalInstanceKey] = hostInst;
}

/**
 * Given a DOM node, return the closest ReactDOMComponent or
 * ReactDOMTextComponent instance ancestor.
 */
function getClosestInstanceFromNode(node) {
  if (node[internalInstanceKey]) {
    return node[internalInstanceKey];
  }

  // Walk up the tree until we find an ancestor whose instance we have cached.
  var parents = [];
  while (!node[internalInstanceKey]) {
    parents.push(node);
    if (node.parentNode) {
      node = node.parentNode;
    } else {
      // Top of the tree. This node must not be part of a React tree (or is
      // unmounted, potentially).
      return null;
    }
  }

  var closest = void 0;
  var inst = node[internalInstanceKey];
  if (inst.tag === HostComponent || inst.tag === HostText) {
    // In Fiber, this will always be the deepest root.
    return inst;
  }
  for (; node && (inst = node[internalInstanceKey]); node = parents.pop()) {
    closest = inst;
  }

  return closest;
}

/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 */
function getInstanceFromNode$1(node) {
  var inst = node[internalInstanceKey];
  if (inst) {
    if (inst.tag === HostComponent || inst.tag === HostText) {
      return inst;
    } else {
      return null;
    }
  }
  return null;
}

/**
 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
 * DOM node.
 */
function getNodeFromInstance$1(inst) {
  if (inst.tag === HostComponent || inst.tag === HostText) {
    // In Fiber this, is just the state node right now. We assume it will be
    // a host component or host text.
    return inst.stateNode;
  }

  // Without this first invariant, passing a non-DOM-component triggers the next
  // invariant for a missing parent, which is super confusing.
  invariant(false, 'getNodeFromInstance: Invalid argument.');
}

function getFiberCurrentPropsFromNode$1(node) {
  return node[internalEventHandlersKey] || null;
}

function updateFiberProps$1(node, props) {
  node[internalEventHandlersKey] = props;
}

var ReactDOMComponentTree = Object.freeze({
	precacheFiberNode: precacheFiberNode$1,
	getClosestInstanceFromNode: getClosestInstanceFromNode,
	getInstanceFromNode: getInstanceFromNode$1,
	getNodeFromInstance: getNodeFromInstance$1,
	getFiberCurrentPropsFromNode: getFiberCurrentPropsFromNode$1,
	updateFiberProps: updateFiberProps$1
});

function getParent(inst) {
  do {
    inst = inst['return'];
    // TODO: If this is a HostRoot we might want to bail out.
    // That is depending on if we want nested subtrees (layers) to bubble
    // events to their parent. We could also go through parentNode on the
    // host node but that wouldn't work for React Native and doesn't let us
    // do the portal feature.
  } while (inst && inst.tag !== HostComponent);
  if (inst) {
    return inst;
  }
  return null;
}

/**
 * Return the lowest common ancestor of A and B, or null if they are in
 * different trees.
 */
function getLowestCommonAncestor(instA, instB) {
  var depthA = 0;
  for (var tempA = instA; tempA; tempA = getParent(tempA)) {
    depthA++;
  }
  var depthB = 0;
  for (var tempB = instB; tempB; tempB = getParent(tempB)) {
    depthB++;
  }

  // If A is deeper, crawl up.
  while (depthA - depthB > 0) {
    instA = getParent(instA);
    depthA--;
  }

  // If B is deeper, crawl up.
  while (depthB - depthA > 0) {
    instB = getParent(instB);
    depthB--;
  }

  // Walk in lockstep until we find a match.
  var depth = depthA;
  while (depth--) {
    if (instA === instB || instA === instB.alternate) {
      return instA;
    }
    instA = getParent(instA);
    instB = getParent(instB);
  }
  return null;
}

/**
 * Return if A is an ancestor of B.
 */


/**
 * Return the parent instance of the passed-in instance.
 */
function getParentInstance(inst) {
  return getParent(inst);
}

/**
 * Simulates the traversal of a two-phase, capture/bubble event dispatch.
 */
function traverseTwoPhase(inst, fn, arg) {
  var path = [];
  while (inst) {
    path.push(inst);
    inst = getParent(inst);
  }
  var i;
  for (i = path.length; i-- > 0;) {
    fn(path[i], 'captured', arg);
  }
  for (i = 0; i < path.length; i++) {
    fn(path[i], 'bubbled', arg);
  }
}

/**
 * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
 * should would receive a `mouseEnter` or `mouseLeave` event.
 *
 * Does not invoke the callback on the nearest common ancestor because nothing
 * "entered" or "left" that element.
 */
function traverseEnterLeave(from, to, fn, argFrom, argTo) {
  var common = from && to ? getLowestCommonAncestor(from, to) : null;
  var pathFrom = [];
  while (true) {
    if (!from) {
      break;
    }
    if (from === common) {
      break;
    }
    var alternate = from.alternate;
    if (alternate !== null && alternate === common) {
      break;
    }
    pathFrom.push(from);
    from = getParent(from);
  }
  var pathTo = [];
  while (true) {
    if (!to) {
      break;
    }
    if (to === common) {
      break;
    }
    var _alternate = to.alternate;
    if (_alternate !== null && _alternate === common) {
      break;
    }
    pathTo.push(to);
    to = getParent(to);
  }
  for (var i = 0; i < pathFrom.length; i++) {
    fn(pathFrom[i], 'bubbled', argFrom);
  }
  for (var _i = pathTo.length; _i-- > 0;) {
    fn(pathTo[_i], 'captured', argTo);
  }
}

/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */
function listenerAtPhase(inst, event, propagationPhase) {
  var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return getListener(inst, registrationName);
}

/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing even a
 * single one.
 */

/**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */
function accumulateDirectionalDispatches(inst, phase, event) {
  {
    warning(inst, 'Dispatching inst must not be null');
  }
  var listener = listenerAtPhase(inst, event, phase);
  if (listener) {
    event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
    event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
  }
}

/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We cannot perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
  }
}

/**
 * Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
 */
function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    var targetInst = event._targetInst;
    var parentInst = targetInst ? getParentInstance(targetInst) : null;
    traverseTwoPhase(parentInst, accumulateDirectionalDispatches, event);
  }
}

/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */
function accumulateDispatches(inst, ignoredDirection, event) {
  if (inst && event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = getListener(inst, registrationName);
    if (listener) {
      event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
      event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
    }
  }
}

/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */
function accumulateDirectDispatchesSingle(event) {
  if (event && event.dispatchConfig.registrationName) {
    accumulateDispatches(event._targetInst, null, event);
  }
}

function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}

function accumulateTwoPhaseDispatchesSkipTarget(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
}

function accumulateEnterLeaveDispatches(leave, enter, from, to) {
  traverseEnterLeave(from, to, accumulateDispatches, leave, enter);
}

function accumulateDirectDispatches(events) {
  forEachAccumulated(events, accumulateDirectDispatchesSingle);
}

var EventPropagators = Object.freeze({
	accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
	accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
	accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches,
	accumulateDirectDispatches: accumulateDirectDispatches
});

var contentKey = null;

/**
 * Gets the key used to access text content on a DOM node.
 *
 * @return {?string} Key used to access text content.
 * @internal
 */
function getTextContentAccessor() {
  if (!contentKey && ExecutionEnvironment.canUseDOM) {
    // Prefer textContent to innerText because many browsers support both but
    // SVG <text> elements don't support innerText even when <div> does.
    contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
  }
  return contentKey;
}

/**
 * This helper object stores information about text content of a target node,
 * allowing comparison of content before and after a given event.
 *
 * Identify the node where selection currently begins, then observe
 * both its text content and its current position in the DOM. Since the
 * browser may natively replace the target node during composition, we can
 * use its position to find its replacement.
 *
 *
 */
var compositionState = {
  _root: null,
  _startText: null,
  _fallbackText: null
};

function initialize(nativeEventTarget) {
  compositionState._root = nativeEventTarget;
  compositionState._startText = getText();
  return true;
}

function reset() {
  compositionState._root = null;
  compositionState._startText = null;
  compositionState._fallbackText = null;
}

function getData() {
  if (compositionState._fallbackText) {
    return compositionState._fallbackText;
  }

  var start;
  var startValue = compositionState._startText;
  var startLength = startValue.length;
  var end;
  var endValue = getText();
  var endLength = endValue.length;

  for (start = 0; start < startLength; start++) {
    if (startValue[start] !== endValue[start]) {
      break;
    }
  }

  var minEnd = startLength - start;
  for (end = 1; end <= minEnd; end++) {
    if (startValue[startLength - end] !== endValue[endLength - end]) {
      break;
    }
  }

  var sliceTail = end > 1 ? 1 - end : undefined;
  compositionState._fallbackText = endValue.slice(start, sliceTail);
  return compositionState._fallbackText;
}

function getText() {
  if ('value' in compositionState._root) {
    return compositionState._root.value;
  }
  return compositionState._root[getTextContentAccessor()];
}

/* eslint valid-typeof: 0 */

var didWarnForAddedNewProperty = false;
var isProxySupported = typeof Proxy === 'function';
var EVENT_POOL_SIZE = 10;

var shouldBeReleasedProperties = ['dispatchConfig', '_targetInst', 'nativeEvent', 'isDefaultPrevented', 'isPropagationStopped', '_dispatchListeners', '_dispatchInstances'];

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var EventInterface = {
  type: null,
  target: null,
  // currentTarget is set when dispatching; no use in copying it here
  currentTarget: emptyFunction.thatReturnsNull,
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function (event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {*} targetInst Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @param {DOMEventTarget} nativeEventTarget Target node.
 */
function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
  {
    // these have a getter/setter for warnings
    delete this.nativeEvent;
    delete this.preventDefault;
    delete this.stopPropagation;
  }

  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;

  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    if (!Interface.hasOwnProperty(propName)) {
      continue;
    }
    {
      delete this[propName]; // this has a getter/setter for warnings
    }
    var normalize = Interface[propName];
    if (normalize) {
      this[propName] = normalize(nativeEvent);
    } else {
      if (propName === 'target') {
        this.target = nativeEventTarget;
      } else {
        this[propName] = nativeEvent[propName];
      }
    }
  }

  var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
  if (defaultPrevented) {
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  } else {
    this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
  }
  this.isPropagationStopped = emptyFunction.thatReturnsFalse;
  return this;
}

_assign(SyntheticEvent.prototype, {
  preventDefault: function () {
    this.defaultPrevented = true;
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.preventDefault) {
      event.preventDefault();
    } else if (typeof event.returnValue !== 'unknown') {
      event.returnValue = false;
    }
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  },

  stopPropagation: function () {
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.stopPropagation) {
      event.stopPropagation();
    } else if (typeof event.cancelBubble !== 'unknown') {
      // The ChangeEventPlugin registers a "propertychange" event for
      // IE. This event does not support bubbling or cancelling, and
      // any references to cancelBubble throw "Member not found".  A
      // typeof check of "unknown" circumvents this issue (and is also
      // IE specific).
      event.cancelBubble = true;
    }

    this.isPropagationStopped = emptyFunction.thatReturnsTrue;
  },

  /**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */
  persist: function () {
    this.isPersistent = emptyFunction.thatReturnsTrue;
  },

  /**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */
  isPersistent: emptyFunction.thatReturnsFalse,

  /**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */
  destructor: function () {
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      {
        Object.defineProperty(this, propName, getPooledWarningPropertyDefinition(propName, Interface[propName]));
      }
    }
    for (var i = 0; i < shouldBeReleasedProperties.length; i++) {
      this[shouldBeReleasedProperties[i]] = null;
    }
    {
      Object.defineProperty(this, 'nativeEvent', getPooledWarningPropertyDefinition('nativeEvent', null));
      Object.defineProperty(this, 'preventDefault', getPooledWarningPropertyDefinition('preventDefault', emptyFunction));
      Object.defineProperty(this, 'stopPropagation', getPooledWarningPropertyDefinition('stopPropagation', emptyFunction));
    }
  }
});

SyntheticEvent.Interface = EventInterface;

/**
 * Helper to reduce boilerplate when creating subclasses.
 *
 * @param {function} Class
 * @param {?object} Interface
 */
SyntheticEvent.augmentClass = function (Class, Interface) {
  var Super = this;

  var E = function () {};
  E.prototype = Super.prototype;
  var prototype = new E();

  _assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  Class.Interface = _assign({}, Super.Interface, Interface);
  Class.augmentClass = Super.augmentClass;
  addEventPoolingTo(Class);
};

/** Proxying after everything set on SyntheticEvent
 * to resolve Proxy issue on some WebKit browsers
 * in which some Event properties are set to undefined (GH#10010)
 */
{
  if (isProxySupported) {
    /*eslint-disable no-func-assign */
    SyntheticEvent = new Proxy(SyntheticEvent, {
      construct: function (target, args) {
        return this.apply(target, Object.create(target.prototype), args);
      },
      apply: function (constructor, that, args) {
        return new Proxy(constructor.apply(that, args), {
          set: function (target, prop, value) {
            if (prop !== 'isPersistent' && !target.constructor.Interface.hasOwnProperty(prop) && shouldBeReleasedProperties.indexOf(prop) === -1) {
              warning(didWarnForAddedNewProperty || target.isPersistent(), "This synthetic event is reused for performance reasons. If you're " + "seeing this, you're adding a new property in the synthetic event object. " + 'The property is never released. See ' + 'https://fb.me/react-event-pooling for more information.');
              didWarnForAddedNewProperty = true;
            }
            target[prop] = value;
            return true;
          }
        });
      }
    });
    /*eslint-enable no-func-assign */
  }
}

addEventPoolingTo(SyntheticEvent);

/**
 * Helper to nullify syntheticEvent instance properties when destructing
 *
 * @param {String} propName
 * @param {?object} getVal
 * @return {object} defineProperty object
 */
function getPooledWarningPropertyDefinition(propName, getVal) {
  var isFunction = typeof getVal === 'function';
  return {
    configurable: true,
    set: set,
    get: get
  };

  function set(val) {
    var action = isFunction ? 'setting the method' : 'setting the property';
    warn(action, 'This is effectively a no-op');
    return val;
  }

  function get() {
    var action = isFunction ? 'accessing the method' : 'accessing the property';
    var result = isFunction ? 'This is a no-op function' : 'This is set to null';
    warn(action, result);
    return getVal;
  }

  function warn(action, result) {
    var warningCondition = false;
    warning(warningCondition, "This synthetic event is reused for performance reasons. If you're seeing this, " + "you're %s `%s` on a released/nullified synthetic event. %s. " + 'If you must keep the original synthetic event around, use event.persist(). ' + 'See https://fb.me/react-event-pooling for more information.', action, propName, result);
  }
}

function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
  var EventConstructor = this;
  if (EventConstructor.eventPool.length) {
    var instance = EventConstructor.eventPool.pop();
    EventConstructor.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
    return instance;
  }
  return new EventConstructor(dispatchConfig, targetInst, nativeEvent, nativeInst);
}

function releasePooledEvent(event) {
  var EventConstructor = this;
  !(event instanceof EventConstructor) ? invariant(false, 'Trying to release an event instance  into a pool of a different type.') : void 0;
  event.destructor();
  if (EventConstructor.eventPool.length < EVENT_POOL_SIZE) {
    EventConstructor.eventPool.push(event);
  }
}

function addEventPoolingTo(EventConstructor) {
  EventConstructor.eventPool = [];
  EventConstructor.getPooled = getPooledEvent;
  EventConstructor.release = releasePooledEvent;
}

var SyntheticEvent$1 = SyntheticEvent;

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */
var CompositionEventInterface = {
  data: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticCompositionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$1.augmentClass(SyntheticCompositionEvent, CompositionEventInterface);

/**
 * @interface Event
 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
 *      /#events-inputevents
 */
var InputEventInterface = {
  data: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticInputEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$1.augmentClass(SyntheticInputEvent, InputEventInterface);

var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
var START_KEYCODE = 229;

var canUseCompositionEvent = ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window;

var documentMode = null;
if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
  documentMode = document.documentMode;
}

// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
var canUseTextInputEvent = ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !documentMode && !isPresto();

// In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. Japanese ideographic
// spaces, for instance (\u3000) are not recorded correctly.
var useFallbackCompositionData = ExecutionEnvironment.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);

/**
 * Opera <= 12 includes TextEvent in window, but does not fire
 * text input events. Rely on keypress instead.
 */
function isPresto() {
  var opera = window.opera;
  return typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
}

var SPACEBAR_CODE = 32;
var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);

// Events and their corresponding property names.
var eventTypes = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: 'onBeforeInput',
      captured: 'onBeforeInputCapture'
    },
    dependencies: ['topCompositionEnd', 'topKeyPress', 'topTextInput', 'topPaste']
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionEnd',
      captured: 'onCompositionEndCapture'
    },
    dependencies: ['topBlur', 'topCompositionEnd', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionStart',
      captured: 'onCompositionStartCapture'
    },
    dependencies: ['topBlur', 'topCompositionStart', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionUpdate',
      captured: 'onCompositionUpdateCapture'
    },
    dependencies: ['topBlur', 'topCompositionUpdate', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
  }
};

// Track whether we've ever handled a keypress on the space key.
var hasSpaceKeypress = false;

/**
 * Return whether a native keypress event is assumed to be a command.
 * This is required because Firefox fires `keypress` events for key commands
 * (cut, copy, select-all, etc.) even though no character is inserted.
 */
function isKeypressCommand(nativeEvent) {
  return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
  // ctrlKey && altKey is equivalent to AltGr, and is not a command.
  !(nativeEvent.ctrlKey && nativeEvent.altKey);
}

/**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */
function getCompositionEventType(topLevelType) {
  switch (topLevelType) {
    case 'topCompositionStart':
      return eventTypes.compositionStart;
    case 'topCompositionEnd':
      return eventTypes.compositionEnd;
    case 'topCompositionUpdate':
      return eventTypes.compositionUpdate;
  }
}

/**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionStart(topLevelType, nativeEvent) {
  return topLevelType === 'topKeyDown' && nativeEvent.keyCode === START_KEYCODE;
}

/**
 * Does our fallback mode think that this event is the end of composition?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case 'topKeyUp':
      // Command keys insert or clear IME input.
      return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
    case 'topKeyDown':
      // Expect IME keyCode on each keydown. If we get any other
      // code we must have exited earlier.
      return nativeEvent.keyCode !== START_KEYCODE;
    case 'topKeyPress':
    case 'topMouseDown':
    case 'topBlur':
      // Events are not possible without cancelling IME.
      return true;
    default:
      return false;
  }
}

/**
 * Google Input Tools provides composition data via a CustomEvent,
 * with the `data` property populated in the `detail` object. If this
 * is available on the event object, use it. If not, this is a plain
 * composition event and we have nothing special to extract.
 *
 * @param {object} nativeEvent
 * @return {?string}
 */
function getDataFromCustomEvent(nativeEvent) {
  var detail = nativeEvent.detail;
  if (typeof detail === 'object' && 'data' in detail) {
    return detail.data;
  }
  return null;
}

// Track the current IME composition status, if any.
var isComposing = false;

/**
 * @return {?object} A SyntheticCompositionEvent.
 */
function extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var eventType;
  var fallbackData;

  if (canUseCompositionEvent) {
    eventType = getCompositionEventType(topLevelType);
  } else if (!isComposing) {
    if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
      eventType = eventTypes.compositionStart;
    }
  } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
    eventType = eventTypes.compositionEnd;
  }

  if (!eventType) {
    return null;
  }

  if (useFallbackCompositionData) {
    // The current composition is stored statically and must not be
    // overwritten while composition continues.
    if (!isComposing && eventType === eventTypes.compositionStart) {
      isComposing = initialize(nativeEventTarget);
    } else if (eventType === eventTypes.compositionEnd) {
      if (isComposing) {
        fallbackData = getData();
      }
    }
  }

  var event = SyntheticCompositionEvent.getPooled(eventType, targetInst, nativeEvent, nativeEventTarget);

  if (fallbackData) {
    // Inject data generated from fallback path into the synthetic event.
    // This matches the property of native CompositionEventInterface.
    event.data = fallbackData;
  } else {
    var customData = getDataFromCustomEvent(nativeEvent);
    if (customData !== null) {
      event.data = customData;
    }
  }

  accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * @param {TopLevelTypes} topLevelType Record from `BrowserEventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The string corresponding to this `beforeInput` event.
 */
function getNativeBeforeInputChars(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case 'topCompositionEnd':
      return getDataFromCustomEvent(nativeEvent);
    case 'topKeyPress':
      /**
       * If native `textInput` events are available, our goal is to make
       * use of them. However, there is a special case: the spacebar key.
       * In Webkit, preventing default on a spacebar `textInput` event
       * cancels character insertion, but it *also* causes the browser
       * to fall back to its default spacebar behavior of scrolling the
       * page.
       *
       * Tracking at:
       * https://code.google.com/p/chromium/issues/detail?id=355103
       *
       * To avoid this issue, use the keypress event as if no `textInput`
       * event is available.
       */
      var which = nativeEvent.which;
      if (which !== SPACEBAR_CODE) {
        return null;
      }

      hasSpaceKeypress = true;
      return SPACEBAR_CHAR;

    case 'topTextInput':
      // Record the characters to be added to the DOM.
      var chars = nativeEvent.data;

      // If it's a spacebar character, assume that we have already handled
      // it at the keypress level and bail immediately. Android Chrome
      // doesn't give us keycodes, so we need to blacklist it.
      if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
        return null;
      }

      return chars;

    default:
      // For other native event types, do nothing.
      return null;
  }
}

/**
 * For browsers that do not provide the `textInput` event, extract the
 * appropriate string to use for SyntheticInputEvent.
 *
 * @param {string} topLevelType Record from `BrowserEventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The fallback string for this `beforeInput` event.
 */
function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
  // If we are currently composing (IME) and using a fallback to do so,
  // try to extract the composed characters from the fallback object.
  // If composition event is available, we extract a string only at
  // compositionevent, otherwise extract it at fallback events.
  if (isComposing) {
    if (topLevelType === 'topCompositionEnd' || !canUseCompositionEvent && isFallbackCompositionEnd(topLevelType, nativeEvent)) {
      var chars = getData();
      reset();
      isComposing = false;
      return chars;
    }
    return null;
  }

  switch (topLevelType) {
    case 'topPaste':
      // If a paste event occurs after a keypress, throw out the input
      // chars. Paste events should not lead to BeforeInput events.
      return null;
    case 'topKeyPress':
      /**
       * As of v27, Firefox may fire keypress events even when no character
       * will be inserted. A few possibilities:
       *
       * - `which` is `0`. Arrow keys, Esc key, etc.
       *
       * - `which` is the pressed key code, but no char is available.
       *   Ex: 'AltGr + d` in Polish. There is no modified character for
       *   this key combination and no character is inserted into the
       *   document, but FF fires the keypress for char code `100` anyway.
       *   No `input` event will occur.
       *
       * - `which` is the pressed key code, but a command combination is
       *   being used. Ex: `Cmd+C`. No character is inserted, and no
       *   `input` event will occur.
       */
      if (!isKeypressCommand(nativeEvent)) {
        // IE fires the `keypress` event when a user types an emoji via
        // Touch keyboard of Windows.  In such a case, the `char` property
        // holds an emoji character like `\uD83D\uDE0A`.  Because its length
        // is 2, the property `which` does not represent an emoji correctly.
        // In such a case, we directly return the `char` property instead of
        // using `which`.
        if (nativeEvent.char && nativeEvent.char.length > 1) {
          return nativeEvent.char;
        } else if (nativeEvent.which) {
          return String.fromCharCode(nativeEvent.which);
        }
      }
      return null;
    case 'topCompositionEnd':
      return useFallbackCompositionData ? null : nativeEvent.data;
    default:
      return null;
  }
}

/**
 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
 * `textInput` or fallback behavior.
 *
 * @return {?object} A SyntheticInputEvent.
 */
function extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var chars;

  if (canUseTextInputEvent) {
    chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
  } else {
    chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
  }

  // If no characters are being inserted, no BeforeInput event should
  // be fired.
  if (!chars) {
    return null;
  }

  var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, targetInst, nativeEvent, nativeEventTarget);

  event.data = chars;
  accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * Create an `onBeforeInput` event to match
 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
 *
 * This event plugin is based on the native `textInput` event
 * available in Chrome, Safari, Opera, and IE. This event fires after
 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
 *
 * `beforeInput` is spec'd but not implemented in any browsers, and
 * the `input` event does not provide any useful information about what has
 * actually been added, contrary to the spec. Thus, `textInput` is the best
 * available event to identify the characters that have actually been inserted
 * into the target node.
 *
 * This plugin is also responsible for emitting `composition` events, thus
 * allowing us to share composition fallback code for both `beforeInput` and
 * `composition` event types.
 */
var BeforeInputEventPlugin = {
  eventTypes: eventTypes,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    return [extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget), extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget)];
  }
};

// Use to restore controlled state after a change event has fired.

var fiberHostComponent = null;

var ReactControlledComponentInjection = {
  injectFiberControlledHostComponent: function (hostComponentImpl) {
    // The fiber implementation doesn't use dynamic dispatch so we need to
    // inject the implementation.
    fiberHostComponent = hostComponentImpl;
  }
};

var restoreTarget = null;
var restoreQueue = null;

function restoreStateOfTarget(target) {
  // We perform this translation at the end of the event loop so that we
  // always receive the correct fiber here
  var internalInstance = getInstanceFromNode(target);
  if (!internalInstance) {
    // Unmounted
    return;
  }
  !(fiberHostComponent && typeof fiberHostComponent.restoreControlledState === 'function') ? invariant(false, 'Fiber needs to be injected to handle a fiber target for controlled events. This error is likely caused by a bug in React. Please file an issue.') : void 0;
  var props = getFiberCurrentPropsFromNode(internalInstance.stateNode);
  fiberHostComponent.restoreControlledState(internalInstance.stateNode, internalInstance.type, props);
}

var injection$3 = ReactControlledComponentInjection;

function enqueueStateRestore(target) {
  if (restoreTarget) {
    if (restoreQueue) {
      restoreQueue.push(target);
    } else {
      restoreQueue = [target];
    }
  } else {
    restoreTarget = target;
  }
}

function restoreStateIfNeeded() {
  if (!restoreTarget) {
    return;
  }
  var target = restoreTarget;
  var queuedTargets = restoreQueue;
  restoreTarget = null;
  restoreQueue = null;

  restoreStateOfTarget(target);
  if (queuedTargets) {
    for (var i = 0; i < queuedTargets.length; i++) {
      restoreStateOfTarget(queuedTargets[i]);
    }
  }
}

var ReactControlledComponent = Object.freeze({
	injection: injection$3,
	enqueueStateRestore: enqueueStateRestore,
	restoreStateIfNeeded: restoreStateIfNeeded
});

// Used as a way to call batchedUpdates when we don't have a reference to
// the renderer. Such as when we're dispatching events or if third party
// libraries need to call batchedUpdates. Eventually, this API will go away when
// everything is batched by default. We'll then have a similar API to opt-out of
// scheduled work and instead do synchronous work.

// Defaults
var fiberBatchedUpdates = function (fn, bookkeeping) {
  return fn(bookkeeping);
};

var isNestingBatched = false;
function batchedUpdates(fn, bookkeeping) {
  if (isNestingBatched) {
    // If we are currently inside another batch, we need to wait until it
    // fully completes before restoring state. Therefore, we add the target to
    // a queue of work.
    return fiberBatchedUpdates(fn, bookkeeping);
  }
  isNestingBatched = true;
  try {
    return fiberBatchedUpdates(fn, bookkeeping);
  } finally {
    // Here we wait until all updates have propagated, which is important
    // when using controlled components within layers:
    // https://github.com/facebook/react/issues/1698
    // Then we restore state of any controlled component.
    isNestingBatched = false;
    restoreStateIfNeeded();
  }
}

var ReactGenericBatchingInjection = {
  injectFiberBatchedUpdates: function (_batchedUpdates) {
    fiberBatchedUpdates = _batchedUpdates;
  }
};

var injection$4 = ReactGenericBatchingInjection;

/**
 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
 */
var supportedInputTypes = {
  color: true,
  date: true,
  datetime: true,
  'datetime-local': true,
  email: true,
  month: true,
  number: true,
  password: true,
  range: true,
  search: true,
  tel: true,
  text: true,
  time: true,
  url: true,
  week: true
};

function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();

  if (nodeName === 'input') {
    return !!supportedInputTypes[elem.type];
  }

  if (nodeName === 'textarea') {
    return true;
  }

  return false;
}

/**
 * HTML nodeType values that represent the type of the node
 */

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;

/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */
function getEventTarget(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;

  // Normalize SVG <use> element events #4963
  if (target.correspondingUseElement) {
    target = target.correspondingUseElement;
  }

  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
  // @see http://www.quirksmode.org/js/events_properties.html
  return target.nodeType === TEXT_NODE ? target.parentNode : target;
}

var useHasFeature;
if (ExecutionEnvironment.canUseDOM) {
  useHasFeature = document.implementation && document.implementation.hasFeature &&
  // always returns true in newer browsers as per the standard.
  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
  document.implementation.hasFeature('', '') !== true;
}

/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported(eventNameSuffix, capture) {
  if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
    return false;
  }

  var eventName = 'on' + eventNameSuffix;
  var isSupported = eventName in document;

  if (!isSupported) {
    var element = document.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}

function isCheckable(elem) {
  var type = elem.type;
  var nodeName = elem.nodeName;
  return nodeName && nodeName.toLowerCase() === 'input' && (type === 'checkbox' || type === 'radio');
}

function getTracker(node) {
  return node._valueTracker;
}

function detachTracker(node) {
  node._valueTracker = null;
}

function getValueFromNode(node) {
  var value = '';
  if (!node) {
    return value;
  }

  if (isCheckable(node)) {
    value = node.checked ? 'true' : 'false';
  } else {
    value = node.value;
  }

  return value;
}

function trackValueOnNode(node) {
  var valueField = isCheckable(node) ? 'checked' : 'value';
  var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);

  var currentValue = '' + node[valueField];

  // if someone has already defined a value or Safari, then bail
  // and don't track value will cause over reporting of changes,
  // but it's better then a hard failure
  // (needed for certain tests that spyOn input values and Safari)
  if (node.hasOwnProperty(valueField) || typeof descriptor.get !== 'function' || typeof descriptor.set !== 'function') {
    return;
  }

  Object.defineProperty(node, valueField, {
    enumerable: descriptor.enumerable,
    configurable: true,
    get: function () {
      return descriptor.get.call(this);
    },
    set: function (value) {
      currentValue = '' + value;
      descriptor.set.call(this, value);
    }
  });

  var tracker = {
    getValue: function () {
      return currentValue;
    },
    setValue: function (value) {
      currentValue = '' + value;
    },
    stopTracking: function () {
      detachTracker(node);
      delete node[valueField];
    }
  };
  return tracker;
}

function track(node) {
  if (getTracker(node)) {
    return;
  }

  // TODO: Once it's just Fiber we can move this to node._wrapperState
  node._valueTracker = trackValueOnNode(node);
}

function updateValueIfChanged(node) {
  if (!node) {
    return false;
  }

  var tracker = getTracker(node);
  // if there is no tracker at this point it's unlikely
  // that trying again will succeed
  if (!tracker) {
    return true;
  }

  var lastValue = tracker.getValue();
  var nextValue = getValueFromNode(node);
  if (nextValue !== lastValue) {
    tracker.setValue(nextValue);
    return true;
  }
  return false;
}

var eventTypes$1 = {
  change: {
    phasedRegistrationNames: {
      bubbled: 'onChange',
      captured: 'onChangeCapture'
    },
    dependencies: ['topBlur', 'topChange', 'topClick', 'topFocus', 'topInput', 'topKeyDown', 'topKeyUp', 'topSelectionChange']
  }
};

function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
  var event = SyntheticEvent$1.getPooled(eventTypes$1.change, inst, nativeEvent, target);
  event.type = 'change';
  // Flag this event loop as needing state restore.
  enqueueStateRestore(target);
  accumulateTwoPhaseDispatches(event);
  return event;
}
/**
 * For IE shims
 */
var activeElement = null;
var activeElementInst = null;

/**
 * SECTION: handle `change` event
 */
function shouldUseChangeEvent(elem) {
  var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
}

function manualDispatchChangeEvent(nativeEvent) {
  var event = createAndAccumulateChangeEvent(activeElementInst, nativeEvent, getEventTarget(nativeEvent));

  // If change and propertychange bubbled, we'd just bind to it like all the
  // other events and have it go through ReactBrowserEventEmitter. Since it
  // doesn't, we manually listen for the events and so we have to enqueue and
  // process the abstract event manually.
  //
  // Batching is necessary here in order to ensure that all event handlers run
  // before the next rerender (including event handlers attached to ancestor
  // elements instead of directly on the input). Without this, controlled
  // components don't work properly in conjunction with event bubbling because
  // the component is rerendered and the value reverted before all the event
  // handlers can run. See https://github.com/facebook/react/issues/708.
  batchedUpdates(runEventInBatch, event);
}

function runEventInBatch(event) {
  enqueueEvents(event);
  processEventQueue(false);
}

function getInstIfValueChanged(targetInst) {
  var targetNode = getNodeFromInstance$1(targetInst);
  if (updateValueIfChanged(targetNode)) {
    return targetInst;
  }
}

function getTargetInstForChangeEvent(topLevelType, targetInst) {
  if (topLevelType === 'topChange') {
    return targetInst;
  }
}

/**
 * SECTION: handle `input` event
 */
var isInputEventSupported = false;
if (ExecutionEnvironment.canUseDOM) {
  // IE9 claims to support the input event but fails to trigger it when
  // deleting text, so we ignore its input events.
  isInputEventSupported = isEventSupported('input') && (!document.documentMode || document.documentMode > 9);
}

/**
 * (For IE <=9) Starts tracking propertychange events on the passed-in element
 * and override the value property so that we can distinguish user events from
 * value changes in JS.
 */
function startWatchingForValueChange(target, targetInst) {
  activeElement = target;
  activeElementInst = targetInst;
  activeElement.attachEvent('onpropertychange', handlePropertyChange);
}

/**
 * (For IE <=9) Removes the event listeners from the currently-tracked element,
 * if any exists.
 */
function stopWatchingForValueChange() {
  if (!activeElement) {
    return;
  }
  activeElement.detachEvent('onpropertychange', handlePropertyChange);
  activeElement = null;
  activeElementInst = null;
}

/**
 * (For IE <=9) Handles a propertychange event, sending a `change` event if
 * the value of the active element has changed.
 */
function handlePropertyChange(nativeEvent) {
  if (nativeEvent.propertyName !== 'value') {
    return;
  }
  if (getInstIfValueChanged(activeElementInst)) {
    manualDispatchChangeEvent(nativeEvent);
  }
}

function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
  if (topLevelType === 'topFocus') {
    // In IE9, propertychange fires for most input events but is buggy and
    // doesn't fire when text is deleted, but conveniently, selectionchange
    // appears to fire in all of the remaining cases so we catch those and
    // forward the event if the value has changed
    // In either case, we don't want to call the event handler if the value
    // is changed from JS so we redefine a setter for `.value` that updates
    // our activeElementValue variable, allowing us to ignore those changes
    //
    // stopWatching() should be a noop here but we call it just in case we
    // missed a blur event somehow.
    stopWatchingForValueChange();
    startWatchingForValueChange(target, targetInst);
  } else if (topLevelType === 'topBlur') {
    stopWatchingForValueChange();
  }
}

// For IE8 and IE9.
function getTargetInstForInputEventPolyfill(topLevelType, targetInst) {
  if (topLevelType === 'topSelectionChange' || topLevelType === 'topKeyUp' || topLevelType === 'topKeyDown') {
    // On the selectionchange event, the target is just document which isn't
    // helpful for us so just check activeElement instead.
    //
    // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
    // propertychange on the first input event after setting `value` from a
    // script and fires only keydown, keypress, keyup. Catching keyup usually
    // gets it and catching keydown lets us fire an event for the first
    // keystroke if user does a key repeat (it'll be a little delayed: right
    // before the second keystroke). Other input methods (e.g., paste) seem to
    // fire selectionchange normally.
    return getInstIfValueChanged(activeElementInst);
  }
}

/**
 * SECTION: handle `click` event
 */
function shouldUseClickEvent(elem) {
  // Use the `click` event to detect changes to checkbox and radio inputs.
  // This approach works across all browsers, whereas `change` does not fire
  // until `blur` in IE8.
  var nodeName = elem.nodeName;
  return nodeName && nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
}

function getTargetInstForClickEvent(topLevelType, targetInst) {
  if (topLevelType === 'topClick') {
    return getInstIfValueChanged(targetInst);
  }
}

function getTargetInstForInputOrChangeEvent(topLevelType, targetInst) {
  if (topLevelType === 'topInput' || topLevelType === 'topChange') {
    return getInstIfValueChanged(targetInst);
  }
}

function handleControlledInputBlur(inst, node) {
  // TODO: In IE, inst is occasionally null. Why?
  if (inst == null) {
    return;
  }

  // Fiber and ReactDOM keep wrapper state in separate places
  var state = inst._wrapperState || node._wrapperState;

  if (!state || !state.controlled || node.type !== 'number') {
    return;
  }

  // If controlled, assign the value attribute to the current value on blur
  var value = '' + node.value;
  if (node.getAttribute('value') !== value) {
    node.setAttribute('value', value);
  }
}

/**
 * This plugin creates an `onChange` event that normalizes change events
 * across form elements. This event fires at a time when it's possible to
 * change the element's value without seeing a flicker.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - select
 */
var ChangeEventPlugin = {
  eventTypes: eventTypes$1,

  _isInputEventSupported: isInputEventSupported,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window;

    var getTargetInstFunc, handleEventFunc;
    if (shouldUseChangeEvent(targetNode)) {
      getTargetInstFunc = getTargetInstForChangeEvent;
    } else if (isTextInputElement(targetNode)) {
      if (isInputEventSupported) {
        getTargetInstFunc = getTargetInstForInputOrChangeEvent;
      } else {
        getTargetInstFunc = getTargetInstForInputEventPolyfill;
        handleEventFunc = handleEventsForInputEventPolyfill;
      }
    } else if (shouldUseClickEvent(targetNode)) {
      getTargetInstFunc = getTargetInstForClickEvent;
    }

    if (getTargetInstFunc) {
      var inst = getTargetInstFunc(topLevelType, targetInst);
      if (inst) {
        var event = createAndAccumulateChangeEvent(inst, nativeEvent, nativeEventTarget);
        return event;
      }
    }

    if (handleEventFunc) {
      handleEventFunc(topLevelType, targetNode, targetInst);
    }

    // When blurring, set the value attribute for number inputs
    if (topLevelType === 'topBlur') {
      handleControlledInputBlur(targetInst, targetNode);
    }
  }
};

/**
 * Module that is injectable into `EventPluginHub`, that specifies a
 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
 * plugins, without having to package every one of them. This is better than
 * having plugins be ordered in the same order that they are injected because
 * that ordering would be influenced by the packaging order.
 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
 */
var DOMEventPluginOrder = ['ResponderEventPlugin', 'SimpleEventPlugin', 'TapEventPlugin', 'EnterLeaveEventPlugin', 'ChangeEventPlugin', 'SelectEventPlugin', 'BeforeInputEventPlugin'];

/**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var UIEventInterface = {
  view: null,
  detail: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$1.augmentClass(SyntheticUIEvent, UIEventInterface);

/**
 * Translation from modifier key to the associated property in the event.
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
 */

var modifierKeyToProp = {
  Alt: 'altKey',
  Control: 'ctrlKey',
  Meta: 'metaKey',
  Shift: 'shiftKey'
};

// IE8 does not implement getModifierState so we simply map it to the only
// modifier keys exposed by the event itself, does not support Lock-keys.
// Currently, all major browsers except Chrome seems to support Lock-keys.
function modifierStateGetter(keyArg) {
  var syntheticEvent = this;
  var nativeEvent = syntheticEvent.nativeEvent;
  if (nativeEvent.getModifierState) {
    return nativeEvent.getModifierState(keyArg);
  }
  var keyProp = modifierKeyToProp[keyArg];
  return keyProp ? !!nativeEvent[keyProp] : false;
}

function getEventModifierState(nativeEvent) {
  return modifierStateGetter;
}

/**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var MouseEventInterface = {
  screenX: null,
  screenY: null,
  clientX: null,
  clientY: null,
  pageX: null,
  pageY: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  getModifierState: getEventModifierState,
  button: null,
  buttons: null,
  relatedTarget: function (event) {
    return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);

var eventTypes$2 = {
  mouseEnter: {
    registrationName: 'onMouseEnter',
    dependencies: ['topMouseOut', 'topMouseOver']
  },
  mouseLeave: {
    registrationName: 'onMouseLeave',
    dependencies: ['topMouseOut', 'topMouseOver']
  }
};

var EnterLeaveEventPlugin = {
  eventTypes: eventTypes$2,

  /**
   * For almost every interaction we care about, there will be both a top-level
   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
   * we do not extract duplicate events. However, moving the mouse into the
   * browser from outside will not fire a `mouseout` event. In this case, we use
   * the `mouseover` top-level event.
   */
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    if (topLevelType === 'topMouseOver' && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
      return null;
    }
    if (topLevelType !== 'topMouseOut' && topLevelType !== 'topMouseOver') {
      // Must not be a mouse in or mouse out - ignoring.
      return null;
    }

    var win;
    if (nativeEventTarget.window === nativeEventTarget) {
      // `nativeEventTarget` is probably a window object.
      win = nativeEventTarget;
    } else {
      // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
      var doc = nativeEventTarget.ownerDocument;
      if (doc) {
        win = doc.defaultView || doc.parentWindow;
      } else {
        win = window;
      }
    }

    var from;
    var to;
    if (topLevelType === 'topMouseOut') {
      from = targetInst;
      var related = nativeEvent.relatedTarget || nativeEvent.toElement;
      to = related ? getClosestInstanceFromNode(related) : null;
    } else {
      // Moving to a node from outside the window.
      from = null;
      to = targetInst;
    }

    if (from === to) {
      // Nothing pertains to our managed components.
      return null;
    }

    var fromNode = from == null ? win : getNodeFromInstance$1(from);
    var toNode = to == null ? win : getNodeFromInstance$1(to);

    var leave = SyntheticMouseEvent.getPooled(eventTypes$2.mouseLeave, from, nativeEvent, nativeEventTarget);
    leave.type = 'mouseleave';
    leave.target = fromNode;
    leave.relatedTarget = toNode;

    var enter = SyntheticMouseEvent.getPooled(eventTypes$2.mouseEnter, to, nativeEvent, nativeEventTarget);
    enter.type = 'mouseenter';
    enter.target = toNode;
    enter.relatedTarget = fromNode;

    accumulateEnterLeaveDispatches(leave, enter, from, to);

    return [leave, enter];
  }
};

/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 *
 * Note that this module is currently shared and assumed to be stateless.
 * If this becomes an actual Map, that will break.
 */

/**
 * This API should be called `delete` but we'd have to make sure to always
 * transform these to strings for IE support. When this transform is fully
 * supported we can rename it.
 */


function get(key) {
  return key._reactInternalFiber;
}

function has(key) {
  return key._reactInternalFiber !== undefined;
}

function set(key, value) {
  key._reactInternalFiber = value;
}

var ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

var ReactCurrentOwner = ReactInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame = ReactInternals.ReactDebugCurrentFrame;

function getComponentName(fiber) {
  var type = fiber.type;

  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function') {
    return type.displayName || type.name;
  }
  return null;
}

// Don't change these two values:
var NoEffect = 0; //           0b00000000
var PerformedWork = 1; //      0b00000001

// You can change the rest (and add more).
var Placement = 2; //          0b00000010
var Update = 4; //             0b00000100
var PlacementAndUpdate = 6; // 0b00000110
var Deletion = 8; //           0b00001000
var ContentReset = 16; //      0b00010000
var Callback = 32; //          0b00100000
var Err = 64; //               0b01000000
var Ref = 128; //              0b10000000

var MOUNTING = 1;
var MOUNTED = 2;
var UNMOUNTED = 3;

function isFiberMountedImpl(fiber) {
  var node = fiber;
  if (!fiber.alternate) {
    // If there is no alternate, this might be a new tree that isn't inserted
    // yet. If it is, then it will have a pending insertion effect on it.
    if ((node.effectTag & Placement) !== NoEffect) {
      return MOUNTING;
    }
    while (node['return']) {
      node = node['return'];
      if ((node.effectTag & Placement) !== NoEffect) {
        return MOUNTING;
      }
    }
  } else {
    while (node['return']) {
      node = node['return'];
    }
  }
  if (node.tag === HostRoot) {
    // TODO: Check if this was a nested HostRoot when used with
    // renderContainerIntoSubtree.
    return MOUNTED;
  }
  // If we didn't hit the root, that means that we're in an disconnected tree
  // that has been unmounted.
  return UNMOUNTED;
}

function isFiberMounted(fiber) {
  return isFiberMountedImpl(fiber) === MOUNTED;
}

function isMounted(component) {
  {
    var owner = ReactCurrentOwner.current;
    if (owner !== null && owner.tag === ClassComponent) {
      var ownerFiber = owner;
      var instance = ownerFiber.stateNode;
      warning(instance._warnedAboutRefsInRender, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', getComponentName(ownerFiber) || 'A component');
      instance._warnedAboutRefsInRender = true;
    }
  }

  var fiber = get(component);
  if (!fiber) {
    return false;
  }
  return isFiberMountedImpl(fiber) === MOUNTED;
}

function assertIsMounted(fiber) {
  !(isFiberMountedImpl(fiber) === MOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
}

function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate) {
    // If there is no alternate, then we only need to check if it is mounted.
    var state = isFiberMountedImpl(fiber);
    !(state !== UNMOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
    if (state === MOUNTING) {
      return null;
    }
    return fiber;
  }
  // If we have two possible branches, we'll walk backwards up to the root
  // to see what path the root points to. On the way we may hit one of the
  // special cases and we'll deal with them.
  var a = fiber;
  var b = alternate;
  while (true) {
    var parentA = a['return'];
    var parentB = parentA ? parentA.alternate : null;
    if (!parentA || !parentB) {
      // We're at the root.
      break;
    }

    // If both copies of the parent fiber point to the same child, we can
    // assume that the child is current. This happens when we bailout on low
    // priority: the bailed out fiber's child reuses the current child.
    if (parentA.child === parentB.child) {
      var child = parentA.child;
      while (child) {
        if (child === a) {
          // We've determined that A is the current branch.
          assertIsMounted(parentA);
          return fiber;
        }
        if (child === b) {
          // We've determined that B is the current branch.
          assertIsMounted(parentA);
          return alternate;
        }
        child = child.sibling;
      }
      // We should never have an alternate for any mounting node. So the only
      // way this could possibly happen is if this was unmounted, if at all.
      invariant(false, 'Unable to find node on an unmounted component.');
    }

    if (a['return'] !== b['return']) {
      // The return pointer of A and the return pointer of B point to different
      // fibers. We assume that return pointers never criss-cross, so A must
      // belong to the child set of A.return, and B must belong to the child
      // set of B.return.
      a = parentA;
      b = parentB;
    } else {
      // The return pointers point to the same fiber. We'll have to use the
      // default, slow path: scan the child sets of each parent alternate to see
      // which child belongs to which set.
      //
      // Search parent A's child set
      var didFindChild = false;
      var _child = parentA.child;
      while (_child) {
        if (_child === a) {
          didFindChild = true;
          a = parentA;
          b = parentB;
          break;
        }
        if (_child === b) {
          didFindChild = true;
          b = parentA;
          a = parentB;
          break;
        }
        _child = _child.sibling;
      }
      if (!didFindChild) {
        // Search parent B's child set
        _child = parentB.child;
        while (_child) {
          if (_child === a) {
            didFindChild = true;
            a = parentB;
            b = parentA;
            break;
          }
          if (_child === b) {
            didFindChild = true;
            b = parentB;
            a = parentA;
            break;
          }
          _child = _child.sibling;
        }
        !didFindChild ? invariant(false, 'Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.') : void 0;
      }
    }

    !(a.alternate === b) ? invariant(false, 'Return fibers should always be each others\' alternates. This error is likely caused by a bug in React. Please file an issue.') : void 0;
  }
  // If the root is not a host container, we're in a disconnected tree. I.e.
  // unmounted.
  !(a.tag === HostRoot) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
  if (a.stateNode.current === a) {
    // We've determined that A is the current branch.
    return fiber;
  }
  // Otherwise B has to be current branch.
  return alternate;
}

function findCurrentHostFiber(parent) {
  var currentParent = findCurrentFiberUsingSlowPath(parent);
  if (!currentParent) {
    return null;
  }

  // Next we'll drill down this component to find the first HostComponent/Text.
  var node = currentParent;
  while (true) {
    if (node.tag === HostComponent || node.tag === HostText) {
      return node;
    } else if (node.child) {
      node.child['return'] = node;
      node = node.child;
      continue;
    }
    if (node === currentParent) {
      return null;
    }
    while (!node.sibling) {
      if (!node['return'] || node['return'] === currentParent) {
        return null;
      }
      node = node['return'];
    }
    node.sibling['return'] = node['return'];
    node = node.sibling;
  }
  // Flow needs the return null here, but ESLint complains about it.
  // eslint-disable-next-line no-unreachable
  return null;
}

function findCurrentHostFiberWithNoPortals(parent) {
  var currentParent = findCurrentFiberUsingSlowPath(parent);
  if (!currentParent) {
    return null;
  }

  // Next we'll drill down this component to find the first HostComponent/Text.
  var node = currentParent;
  while (true) {
    if (node.tag === HostComponent || node.tag === HostText) {
      return node;
    } else if (node.child && node.tag !== HostPortal) {
      node.child['return'] = node;
      node = node.child;
      continue;
    }
    if (node === currentParent) {
      return null;
    }
    while (!node.sibling) {
      if (!node['return'] || node['return'] === currentParent) {
        return null;
      }
      node = node['return'];
    }
    node.sibling['return'] = node['return'];
    node = node.sibling;
  }
  // Flow needs the return null here, but ESLint complains about it.
  // eslint-disable-next-line no-unreachable
  return null;
}

var CALLBACK_BOOKKEEPING_POOL_SIZE = 10;
var callbackBookkeepingPool = [];

/**
 * Find the deepest React component completely containing the root of the
 * passed-in instance (for use when entire React trees are nested within each
 * other). If React trees are not nested, returns null.
 */
function findRootContainerNode(inst) {
  // TODO: It may be a good idea to cache this to prevent unnecessary DOM
  // traversal, but caching is difficult to do correctly without using a
  // mutation observer to listen for all DOM changes.
  while (inst['return']) {
    inst = inst['return'];
  }
  if (inst.tag !== HostRoot) {
    // This can happen if we're in a detached tree.
    return null;
  }
  return inst.stateNode.containerInfo;
}

// Used to store ancestor hierarchy in top level callback
function getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst) {
  if (callbackBookkeepingPool.length) {
    var instance = callbackBookkeepingPool.pop();
    instance.topLevelType = topLevelType;
    instance.nativeEvent = nativeEvent;
    instance.targetInst = targetInst;
    return instance;
  }
  return {
    topLevelType: topLevelType,
    nativeEvent: nativeEvent,
    targetInst: targetInst,
    ancestors: []
  };
}

function releaseTopLevelCallbackBookKeeping(instance) {
  instance.topLevelType = null;
  instance.nativeEvent = null;
  instance.targetInst = null;
  instance.ancestors.length = 0;
  if (callbackBookkeepingPool.length < CALLBACK_BOOKKEEPING_POOL_SIZE) {
    callbackBookkeepingPool.push(instance);
  }
}

function handleTopLevelImpl(bookKeeping) {
  var targetInst = bookKeeping.targetInst;

  // Loop through the hierarchy, in case there's any nested components.
  // It's important that we build the array of ancestors before calling any
  // event handlers, because event handlers can modify the DOM, leading to
  // inconsistencies with ReactMount's node cache. See #1105.
  var ancestor = targetInst;
  do {
    if (!ancestor) {
      bookKeeping.ancestors.push(ancestor);
      break;
    }
    var root = findRootContainerNode(ancestor);
    if (!root) {
      break;
    }
    bookKeeping.ancestors.push(ancestor);
    ancestor = getClosestInstanceFromNode(root);
  } while (ancestor);

  for (var i = 0; i < bookKeeping.ancestors.length; i++) {
    targetInst = bookKeeping.ancestors[i];
    _handleTopLevel(bookKeeping.topLevelType, targetInst, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
  }
}

// TODO: can we stop exporting these?
var _enabled = true;
var _handleTopLevel = void 0;

function setHandleTopLevel(handleTopLevel) {
  _handleTopLevel = handleTopLevel;
}

function setEnabled(enabled) {
  _enabled = !!enabled;
}

function isEnabled() {
  return _enabled;
}

/**
 * Traps top-level events by using event bubbling.
 *
 * @param {string} topLevelType Record from `BrowserEventConstants`.
 * @param {string} handlerBaseName Event name (e.g. "click").
 * @param {object} element Element on which to attach listener.
 * @return {?object} An object with a remove function which will forcefully
 *                  remove the listener.
 * @internal
 */
function trapBubbledEvent(topLevelType, handlerBaseName, element) {
  if (!element) {
    return null;
  }
  return EventListener.listen(element, handlerBaseName, dispatchEvent.bind(null, topLevelType));
}

/**
 * Traps a top-level event by using event capturing.
 *
 * @param {string} topLevelType Record from `BrowserEventConstants`.
 * @param {string} handlerBaseName Event name (e.g. "click").
 * @param {object} element Element on which to attach listener.
 * @return {?object} An object with a remove function which will forcefully
 *                  remove the listener.
 * @internal
 */
function trapCapturedEvent(topLevelType, handlerBaseName, element) {
  if (!element) {
    return null;
  }
  return EventListener.capture(element, handlerBaseName, dispatchEvent.bind(null, topLevelType));
}

function dispatchEvent(topLevelType, nativeEvent) {
  if (!_enabled) {
    return;
  }

  var nativeEventTarget = getEventTarget(nativeEvent);
  var targetInst = getClosestInstanceFromNode(nativeEventTarget);
  if (targetInst !== null && typeof targetInst.tag === 'number' && !isFiberMounted(targetInst)) {
    // If we get an event (ex: img onload) before committing that
    // component's mount, ignore it for now (that is, treat it as if it was an
    // event on a non-React tree). We might also consider queueing events and
    // dispatching them after the mount.
    targetInst = null;
  }

  var bookKeeping = getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst);

  try {
    // Event queue being processed in the same cycle allows
    // `preventDefault`.
    batchedUpdates(handleTopLevelImpl, bookKeeping);
  } finally {
    releaseTopLevelCallbackBookKeeping(bookKeeping);
  }
}

var ReactDOMEventListener = Object.freeze({
	get _enabled () { return _enabled; },
	get _handleTopLevel () { return _handleTopLevel; },
	setHandleTopLevel: setHandleTopLevel,
	setEnabled: setEnabled,
	isEnabled: isEnabled,
	trapBubbledEvent: trapBubbledEvent,
	trapCapturedEvent: trapCapturedEvent,
	dispatchEvent: dispatchEvent
});

/**
 * Generate a mapping of standard vendor prefixes using the defined style property and event name.
 *
 * @param {string} styleProp
 * @param {string} eventName
 * @returns {object}
 */
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};

  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes['Webkit' + styleProp] = 'webkit' + eventName;
  prefixes['Moz' + styleProp] = 'moz' + eventName;
  prefixes['ms' + styleProp] = 'MS' + eventName;
  prefixes['O' + styleProp] = 'o' + eventName.toLowerCase();

  return prefixes;
}

/**
 * A list of event names to a configurable list of vendor prefixes.
 */
var vendorPrefixes = {
  animationend: makePrefixMap('Animation', 'AnimationEnd'),
  animationiteration: makePrefixMap('Animation', 'AnimationIteration'),
  animationstart: makePrefixMap('Animation', 'AnimationStart'),
  transitionend: makePrefixMap('Transition', 'TransitionEnd')
};

/**
 * Event names that have already been detected and prefixed (if applicable).
 */
var prefixedEventNames = {};

/**
 * Element to check for prefixes on.
 */
var style = {};

/**
 * Bootstrap if a DOM exists.
 */
if (ExecutionEnvironment.canUseDOM) {
  style = document.createElement('div').style;

  // On some platforms, in particular some releases of Android 4.x,
  // the un-prefixed "animation" and "transition" properties are defined on the
  // style object but the events that fire will still be prefixed, so we need
  // to check if the un-prefixed events are usable, and if not remove them from the map.
  if (!('AnimationEvent' in window)) {
    delete vendorPrefixes.animationend.animation;
    delete vendorPrefixes.animationiteration.animation;
    delete vendorPrefixes.animationstart.animation;
  }

  // Same as above
  if (!('TransitionEvent' in window)) {
    delete vendorPrefixes.transitionend.transition;
  }
}

/**
 * Attempts to determine the correct vendor prefixed event name.
 *
 * @param {string} eventName
 * @returns {string}
 */
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) {
    return prefixedEventNames[eventName];
  } else if (!vendorPrefixes[eventName]) {
    return eventName;
  }

  var prefixMap = vendorPrefixes[eventName];

  for (var styleProp in prefixMap) {
    if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) {
      return prefixedEventNames[eventName] = prefixMap[styleProp];
    }
  }

  return '';
}

/**
 * Types of raw signals from the browser caught at the top level.
 *
 * For events like 'submit' which don't consistently bubble (which we
 * trap at a lower node than `document`), binding at `document` would
 * cause duplicate events so we don't include them here.
 */
var topLevelTypes$1 = {
  topAbort: 'abort',
  topAnimationEnd: getVendorPrefixedEventName('animationend') || 'animationend',
  topAnimationIteration: getVendorPrefixedEventName('animationiteration') || 'animationiteration',
  topAnimationStart: getVendorPrefixedEventName('animationstart') || 'animationstart',
  topBlur: 'blur',
  topCancel: 'cancel',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topChange: 'change',
  topClick: 'click',
  topClose: 'close',
  topCompositionEnd: 'compositionend',
  topCompositionStart: 'compositionstart',
  topCompositionUpdate: 'compositionupdate',
  topContextMenu: 'contextmenu',
  topCopy: 'copy',
  topCut: 'cut',
  topDoubleClick: 'dblclick',
  topDrag: 'drag',
  topDragEnd: 'dragend',
  topDragEnter: 'dragenter',
  topDragExit: 'dragexit',
  topDragLeave: 'dragleave',
  topDragOver: 'dragover',
  topDragStart: 'dragstart',
  topDrop: 'drop',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topFocus: 'focus',
  topInput: 'input',
  topKeyDown: 'keydown',
  topKeyPress: 'keypress',
  topKeyUp: 'keyup',
  topLoadedData: 'loadeddata',
  topLoad: 'load',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topMouseDown: 'mousedown',
  topMouseMove: 'mousemove',
  topMouseOut: 'mouseout',
  topMouseOver: 'mouseover',
  topMouseUp: 'mouseup',
  topPaste: 'paste',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topScroll: 'scroll',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topSelectionChange: 'selectionchange',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTextInput: 'textInput',
  topTimeUpdate: 'timeupdate',
  topToggle: 'toggle',
  topTouchCancel: 'touchcancel',
  topTouchEnd: 'touchend',
  topTouchMove: 'touchmove',
  topTouchStart: 'touchstart',
  topTransitionEnd: getVendorPrefixedEventName('transitionend') || 'transitionend',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting',
  topWheel: 'wheel'
};

var BrowserEventConstants = {
  topLevelTypes: topLevelTypes$1
};

function runEventQueueInBatch(events) {
  enqueueEvents(events);
  processEventQueue(false);
}

/**
 * Streams a fired top-level event to `EventPluginHub` where plugins have the
 * opportunity to create `ReactEvent`s to be dispatched.
 */
function handleTopLevel(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var events = extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
  runEventQueueInBatch(events);
}

var topLevelTypes = BrowserEventConstants.topLevelTypes;

/**
 * Summary of `ReactBrowserEventEmitter` event handling:
 *
 *  - Top-level delegation is used to trap most native browser events. This
 *    may only occur in the main thread and is the responsibility of
 *    ReactDOMEventListener, which is injected and can therefore support
 *    pluggable event sources. This is the only work that occurs in the main
 *    thread.
 *
 *  - We normalize and de-duplicate events to account for browser quirks. This
 *    may be done in the worker thread.
 *
 *  - Forward these native events (with the associated top-level type used to
 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
 *    to extract any synthetic events.
 *
 *  - The `EventPluginHub` will then process each event by annotating them with
 *    "dispatches", a sequence of listeners and IDs that care about that event.
 *
 *  - The `EventPluginHub` then dispatches the events.
 *
 * Overview of React and the event system:
 *
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .
 *       |           .
 *       v           .
 * +------------+    .
 * | ReactEvent |    .
 * |  Listener  |    .
 * +------------+    .                         +-----------+
 *       |           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */

var alreadyListeningTo = {};
var reactTopListenersCounter = 0;

/**
 * To ensure no conflicts with other potential React instances on the page
 */
var topListenersIDKey = '_reactListenersID' + ('' + Math.random()).slice(2);

function getListeningForDocument(mountAt) {
  // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
  // directly.
  if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
    mountAt[topListenersIDKey] = reactTopListenersCounter++;
    alreadyListeningTo[mountAt[topListenersIDKey]] = {};
  }
  return alreadyListeningTo[mountAt[topListenersIDKey]];
}

/**
 * We listen for bubbled touch events on the document object.
 *
 * Firefox v8.01 (and possibly others) exhibited strange behavior when
 * mounting `onmousemove` events at some node that was not the document
 * element. The symptoms were that if your mouse is not moving over something
 * contained within that mount point (for example on the background) the
 * top-level listeners for `onmousemove` won't be called. However, if you
 * register the `mousemove` on the document object, then it will of course
 * catch all `mousemove`s. This along with iOS quirks, justifies restricting
 * top-level listeners to the document object only, at least for these
 * movement types of events and possibly all events.
 *
 * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
 *
 * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
 * they bubble to document.
 *
 * @param {string} registrationName Name of listener (e.g. `onClick`).
 * @param {object} contentDocumentHandle Document which owns the container
 */
function listenTo(registrationName, contentDocumentHandle) {
  var mountAt = contentDocumentHandle;
  var isListening = getListeningForDocument(mountAt);
  var dependencies = registrationNameDependencies[registrationName];

  for (var i = 0; i < dependencies.length; i++) {
    var dependency = dependencies[i];
    if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
      if (dependency === 'topScroll') {
        trapCapturedEvent('topScroll', 'scroll', mountAt);
      } else if (dependency === 'topFocus' || dependency === 'topBlur') {
        trapCapturedEvent('topFocus', 'focus', mountAt);
        trapCapturedEvent('topBlur', 'blur', mountAt);

        // to make sure blur and focus event listeners are only attached once
        isListening.topBlur = true;
        isListening.topFocus = true;
      } else if (dependency === 'topCancel') {
        if (isEventSupported('cancel', true)) {
          trapCapturedEvent('topCancel', 'cancel', mountAt);
        }
        isListening.topCancel = true;
      } else if (dependency === 'topClose') {
        if (isEventSupported('close', true)) {
          trapCapturedEvent('topClose', 'close', mountAt);
        }
        isListening.topClose = true;
      } else if (topLevelTypes.hasOwnProperty(dependency)) {
        trapBubbledEvent(dependency, topLevelTypes[dependency], mountAt);
      }

      isListening[dependency] = true;
    }
  }
}

function isListeningToAllDependencies(registrationName, mountAt) {
  var isListening = getListeningForDocument(mountAt);
  var dependencies = registrationNameDependencies[registrationName];
  for (var i = 0; i < dependencies.length; i++) {
    var dependency = dependencies[i];
    if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
      return false;
    }
  }
  return true;
}

/**
 * Given any node return the first leaf node without children.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {DOMElement|DOMTextNode}
 */
function getLeafNode(node) {
  while (node && node.firstChild) {
    node = node.firstChild;
  }
  return node;
}

/**
 * Get the next sibling within a container. This will walk up the
 * DOM if a node's siblings have been exhausted.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {?DOMElement|DOMTextNode}
 */
function getSiblingNode(node) {
  while (node) {
    if (node.nextSibling) {
      return node.nextSibling;
    }
    node = node.parentNode;
  }
}

/**
 * Get object describing the nodes which contain characters at offset.
 *
 * @param {DOMElement|DOMTextNode} root
 * @param {number} offset
 * @return {?object}
 */
function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  var nodeStart = 0;
  var nodeEnd = 0;

  while (node) {
    if (node.nodeType === TEXT_NODE) {
      nodeEnd = nodeStart + node.textContent.length;

      if (nodeStart <= offset && nodeEnd >= offset) {
        return {
          node: node,
          offset: offset - nodeStart
        };
      }

      nodeStart = nodeEnd;
    }

    node = getLeafNode(getSiblingNode(node));
  }
}

/**
 * @param {DOMElement} outerNode
 * @return {?object}
 */
function getOffsets(outerNode) {
  var selection = window.getSelection && window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  var anchorNode = selection.anchorNode,
      anchorOffset = selection.anchorOffset,
      focusNode$$1 = selection.focusNode,
      focusOffset = selection.focusOffset;

  // In Firefox, anchorNode and focusNode can be "anonymous divs", e.g. the
  // up/down buttons on an <input type="number">. Anonymous divs do not seem to
  // expose properties, triggering a "Permission denied error" if any of its
  // properties are accessed. The only seemingly possible way to avoid erroring
  // is to access a property that typically works for non-anonymous divs and
  // catch any error that may otherwise arise. See
  // https://bugzilla.mozilla.org/show_bug.cgi?id=208427

  try {
    /* eslint-disable no-unused-expressions */
    anchorNode.nodeType;
    focusNode$$1.nodeType;
    /* eslint-enable no-unused-expressions */
  } catch (e) {
    return null;
  }

  return getModernOffsetsFromPoints(outerNode, anchorNode, anchorOffset, focusNode$$1, focusOffset);
}

/**
 * Returns {start, end} where `start` is the character/codepoint index of
 * (anchorNode, anchorOffset) within the textContent of `outerNode`, and
 * `end` is the index of (focusNode, focusOffset).
 *
 * Returns null if you pass in garbage input but we should probably just crash.
 *
 * Exported only for testing.
 */
function getModernOffsetsFromPoints(outerNode, anchorNode, anchorOffset, focusNode$$1, focusOffset) {
  var length = 0;
  var start = -1;
  var end = -1;
  var indexWithinAnchor = 0;
  var indexWithinFocus = 0;
  var node = outerNode;
  var parentNode = null;

  outer: while (true) {
    var next = null;

    while (true) {
      if (node === anchorNode && (anchorOffset === 0 || node.nodeType === TEXT_NODE)) {
        start = length + anchorOffset;
      }
      if (node === focusNode$$1 && (focusOffset === 0 || node.nodeType === TEXT_NODE)) {
        end = length + focusOffset;
      }

      if (node.nodeType === TEXT_NODE) {
        length += node.nodeValue.length;
      }

      if ((next = node.firstChild) === null) {
        break;
      }
      // Moving from `node` to its first child `next`.
      parentNode = node;
      node = next;
    }

    while (true) {
      if (node === outerNode) {
        // If `outerNode` has children, this is always the second time visiting
        // it. If it has no children, this is still the first loop, and the only
        // valid selection is anchorNode and focusNode both equal to this node
        // and both offsets 0, in which case we will have handled above.
        break outer;
      }
      if (parentNode === anchorNode && ++indexWithinAnchor === anchorOffset) {
        start = length;
      }
      if (parentNode === focusNode$$1 && ++indexWithinFocus === focusOffset) {
        end = length;
      }
      if ((next = node.nextSibling) !== null) {
        break;
      }
      node = parentNode;
      parentNode = node.parentNode;
    }

    // Moving from `node` to its next sibling `next`.
    node = next;
  }

  if (start === -1 || end === -1) {
    // This should never happen. (Would happen if the anchor/focus nodes aren't
    // actually inside the passed-in node.)
    return null;
  }

  return {
    start: start,
    end: end
  };
}

/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programmatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 *
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */
function setOffsets(node, offsets) {
  if (!window.getSelection) {
    return;
  }

  var selection = window.getSelection();
  var length = node[getTextContentAccessor()].length;
  var start = Math.min(offsets.start, length);
  var end = offsets.end === undefined ? start : Math.min(offsets.end, length);

  // IE 11 uses modern selection, but doesn't support the extend method.
  // Flip backward selections, so we can set with a single range.
  if (!selection.extend && start > end) {
    var temp = end;
    end = start;
    start = temp;
  }

  var startMarker = getNodeForCharacterOffset(node, start);
  var endMarker = getNodeForCharacterOffset(node, end);

  if (startMarker && endMarker) {
    if (selection.rangeCount === 1 && selection.anchorNode === startMarker.node && selection.anchorOffset === startMarker.offset && selection.focusNode === endMarker.node && selection.focusOffset === endMarker.offset) {
      return;
    }
    var range = document.createRange();
    range.setStart(startMarker.node, startMarker.offset);
    selection.removeAllRanges();

    if (start > end) {
      selection.addRange(range);
      selection.extend(endMarker.node, endMarker.offset);
    } else {
      range.setEnd(endMarker.node, endMarker.offset);
      selection.addRange(range);
    }
  }
}

function isInDocument(node) {
  return containsNode(document.documentElement, node);
}

/**
 * @ReactInputSelection: React input selection module. Based on Selection.js,
 * but modified to be suitable for react and has a couple of bug fixes (doesn't
 * assume buttons have range selections allowed).
 * Input selection module for React.
 */

function hasSelectionCapabilities(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName && (nodeName === 'input' && elem.type === 'text' || nodeName === 'textarea' || elem.contentEditable === 'true');
}

function getSelectionInformation() {
  var focusedElem = getActiveElement();
  return {
    focusedElem: focusedElem,
    selectionRange: hasSelectionCapabilities(focusedElem) ? getSelection$1(focusedElem) : null
  };
}

/**
 * @restoreSelection: If any selection information was potentially lost,
 * restore it. This is useful when performing operations that could remove dom
 * nodes and place them back in, resulting in focus being lost.
 */
function restoreSelection(priorSelectionInformation) {
  var curFocusedElem = getActiveElement();
  var priorFocusedElem = priorSelectionInformation.focusedElem;
  var priorSelectionRange = priorSelectionInformation.selectionRange;
  if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
    if (hasSelectionCapabilities(priorFocusedElem)) {
      setSelection(priorFocusedElem, priorSelectionRange);
    }

    // Focusing a node can change the scroll position, which is undesirable
    var ancestors = [];
    var ancestor = priorFocusedElem;
    while (ancestor = ancestor.parentNode) {
      if (ancestor.nodeType === ELEMENT_NODE) {
        ancestors.push({
          element: ancestor,
          left: ancestor.scrollLeft,
          top: ancestor.scrollTop
        });
      }
    }

    focusNode(priorFocusedElem);

    for (var i = 0; i < ancestors.length; i++) {
      var info = ancestors[i];
      info.element.scrollLeft = info.left;
      info.element.scrollTop = info.top;
    }
  }
}

/**
 * @getSelection: Gets the selection bounds of a focused textarea, input or
 * contentEditable node.
 * -@input: Look up selection bounds of this input
 * -@return {start: selectionStart, end: selectionEnd}
 */
function getSelection$1(input) {
  var selection = void 0;

  if ('selectionStart' in input) {
    // Modern browser with input or textarea.
    selection = {
      start: input.selectionStart,
      end: input.selectionEnd
    };
  } else {
    // Content editable or old IE textarea.
    selection = getOffsets(input);
  }

  return selection || { start: 0, end: 0 };
}

/**
 * @setSelection: Sets the selection bounds of a textarea or input and focuses
 * the input.
 * -@input     Set selection bounds of this input or textarea
 * -@offsets   Object of same form that is returned from get*
 */
function setSelection(input, offsets) {
  var start = offsets.start,
      end = offsets.end;

  if (end === undefined) {
    end = start;
  }

  if ('selectionStart' in input) {
    input.selectionStart = start;
    input.selectionEnd = Math.min(end, input.value.length);
  } else {
    setOffsets(input, offsets);
  }
}

var skipSelectionChangeEvent = ExecutionEnvironment.canUseDOM && 'documentMode' in document && document.documentMode <= 11;

var eventTypes$3 = {
  select: {
    phasedRegistrationNames: {
      bubbled: 'onSelect',
      captured: 'onSelectCapture'
    },
    dependencies: ['topBlur', 'topContextMenu', 'topFocus', 'topKeyDown', 'topKeyUp', 'topMouseDown', 'topMouseUp', 'topSelectionChange']
  }
};

var activeElement$1 = null;
var activeElementInst$1 = null;
var lastSelection = null;
var mouseDown = false;

/**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 *
 * @param {DOMElement} node
 * @return {object}
 */
function getSelection(node) {
  if ('selectionStart' in node && hasSelectionCapabilities(node)) {
    return {
      start: node.selectionStart,
      end: node.selectionEnd
    };
  } else if (window.getSelection) {
    var selection = window.getSelection();
    return {
      anchorNode: selection.anchorNode,
      anchorOffset: selection.anchorOffset,
      focusNode: selection.focusNode,
      focusOffset: selection.focusOffset
    };
  }
}

/**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @return {?SyntheticEvent}
 */
function constructSelectEvent(nativeEvent, nativeEventTarget) {
  // Ensure we have the right element, and that the user is not dragging a
  // selection (this matches native `select` event behavior). In HTML5, select
  // fires only on input and textarea thus if there's no focused element we
  // won't dispatch.
  if (mouseDown || activeElement$1 == null || activeElement$1 !== getActiveElement()) {
    return null;
  }

  // Only fire when selection has actually changed.
  var currentSelection = getSelection(activeElement$1);
  if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
    lastSelection = currentSelection;

    var syntheticEvent = SyntheticEvent$1.getPooled(eventTypes$3.select, activeElementInst$1, nativeEvent, nativeEventTarget);

    syntheticEvent.type = 'select';
    syntheticEvent.target = activeElement$1;

    accumulateTwoPhaseDispatches(syntheticEvent);

    return syntheticEvent;
  }

  return null;
}

/**
 * This plugin creates an `onSelect` event that normalizes select events
 * across form elements.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - contentEditable
 *
 * This differs from native browser implementations in the following ways:
 * - Fires on contentEditable fields as well as inputs.
 * - Fires for collapsed selection.
 * - Fires after user input.
 */
var SelectEventPlugin = {
  eventTypes: eventTypes$3,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : nativeEventTarget.nodeType === DOCUMENT_NODE ? nativeEventTarget : nativeEventTarget.ownerDocument;
    // Track whether all listeners exists for this plugin. If none exist, we do
    // not extract events. See #3639.
    if (!doc || !isListeningToAllDependencies('onSelect', doc)) {
      return null;
    }

    var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window;

    switch (topLevelType) {
      // Track the input node that has focus.
      case 'topFocus':
        if (isTextInputElement(targetNode) || targetNode.contentEditable === 'true') {
          activeElement$1 = targetNode;
          activeElementInst$1 = targetInst;
          lastSelection = null;
        }
        break;
      case 'topBlur':
        activeElement$1 = null;
        activeElementInst$1 = null;
        lastSelection = null;
        break;
      // Don't fire the event while the user is dragging. This matches the
      // semantics of the native select event.
      case 'topMouseDown':
        mouseDown = true;
        break;
      case 'topContextMenu':
      case 'topMouseUp':
        mouseDown = false;
        return constructSelectEvent(nativeEvent, nativeEventTarget);
      // Chrome and IE fire non-standard event when selection is changed (and
      // sometimes when it hasn't). IE's event fires out of order with respect
      // to key and input events on deletion, so we discard it.
      //
      // Firefox doesn't support selectionchange, so check selection status
      // after each key entry. The selection changes after keydown and before
      // keyup, but we check on keydown as well in the case of holding down a
      // key, when multiple keydown events are fired but only one keyup is.
      // This is also our approach for IE handling, for the reason above.
      case 'topSelectionChange':
        if (skipSelectionChangeEvent) {
          break;
        }
      // falls through
      case 'topKeyDown':
      case 'topKeyUp':
        return constructSelectEvent(nativeEvent, nativeEventTarget);
    }

    return null;
  }
};

/**
 * @interface Event
 * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
 */
var AnimationEventInterface = {
  animationName: null,
  elapsedTime: null,
  pseudoElement: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticAnimationEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$1.augmentClass(SyntheticAnimationEvent, AnimationEventInterface);

/**
 * @interface Event
 * @see http://www.w3.org/TR/clipboard-apis/
 */
var ClipboardEventInterface = {
  clipboardData: function (event) {
    return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$1.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);

/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var FocusEventInterface = {
  relatedTarget: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);

/**
 * `charCode` represents the actual "character code" and is safe to use with
 * `String.fromCharCode`. As such, only keys that correspond to printable
 * characters produce a valid `charCode`, the only exception to this is Enter.
 * The Tab-key is considered non-printable and does not have a `charCode`,
 * presumably because it does not produce a tab-character in browsers.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {number} Normalized `charCode` property.
 */
function getEventCharCode(nativeEvent) {
  var charCode;
  var keyCode = nativeEvent.keyCode;

  if ('charCode' in nativeEvent) {
    charCode = nativeEvent.charCode;

    // FF does not set `charCode` for the Enter-key, check against `keyCode`.
    if (charCode === 0 && keyCode === 13) {
      charCode = 13;
    }
  } else {
    // IE8 does not implement `charCode`, but `keyCode` has the correct value.
    charCode = keyCode;
  }

  // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
  // Must not discard the (non-)printable Enter-key.
  if (charCode >= 32 || charCode === 13) {
    return charCode;
  }

  return 0;
}

/**
 * Normalization of deprecated HTML5 `key` values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */
var normalizeKey = {
  Esc: 'Escape',
  Spacebar: ' ',
  Left: 'ArrowLeft',
  Up: 'ArrowUp',
  Right: 'ArrowRight',
  Down: 'ArrowDown',
  Del: 'Delete',
  Win: 'OS',
  Menu: 'ContextMenu',
  Apps: 'ContextMenu',
  Scroll: 'ScrollLock',
  MozPrintableKey: 'Unidentified'
};

/**
 * Translation from legacy `keyCode` to HTML5 `key`
 * Only special keys supported, all others depend on keyboard layout or browser
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */
var translateToKey = {
  '8': 'Backspace',
  '9': 'Tab',
  '12': 'Clear',
  '13': 'Enter',
  '16': 'Shift',
  '17': 'Control',
  '18': 'Alt',
  '19': 'Pause',
  '20': 'CapsLock',
  '27': 'Escape',
  '32': ' ',
  '33': 'PageUp',
  '34': 'PageDown',
  '35': 'End',
  '36': 'Home',
  '37': 'ArrowLeft',
  '38': 'ArrowUp',
  '39': 'ArrowRight',
  '40': 'ArrowDown',
  '45': 'Insert',
  '46': 'Delete',
  '112': 'F1',
  '113': 'F2',
  '114': 'F3',
  '115': 'F4',
  '116': 'F5',
  '117': 'F6',
  '118': 'F7',
  '119': 'F8',
  '120': 'F9',
  '121': 'F10',
  '122': 'F11',
  '123': 'F12',
  '144': 'NumLock',
  '145': 'ScrollLock',
  '224': 'Meta'
};

/**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */
function getEventKey(nativeEvent) {
  if (nativeEvent.key) {
    // Normalize inconsistent values reported by browsers due to
    // implementations of a working draft specification.

    // FireFox implements `key` but returns `MozPrintableKey` for all
    // printable characters (normalized to `Unidentified`), ignore it.
    var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
    if (key !== 'Unidentified') {
      return key;
    }
  }

  // Browser does not implement `key`, polyfill as much of it as we can.
  if (nativeEvent.type === 'keypress') {
    var charCode = getEventCharCode(nativeEvent);

    // The enter-key is technically both printable and non-printable and can
    // thus be captured by `keypress`, no other non-printable key should.
    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
  }
  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
    // While user keyboard layout determines the actual meaning of each
    // `keyCode` value, almost all function keys have a universal value.
    return translateToKey[nativeEvent.keyCode] || 'Unidentified';
  }
  return '';
}

/**
 * @interface KeyboardEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var KeyboardEventInterface = {
  key: getEventKey,
  location: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  repeat: null,
  locale: null,
  getModifierState: getEventModifierState,
  // Legacy Interface
  charCode: function (event) {
    // `charCode` is the result of a KeyPress event and represents the value of
    // the actual printable character.

    // KeyPress is deprecated, but its replacement is not yet final and not
    // implemented in any major browser. Only KeyPress has charCode.
    if (event.type === 'keypress') {
      return getEventCharCode(event);
    }
    return 0;
  },
  keyCode: function (event) {
    // `keyCode` is the result of a KeyDown/Up event and represents the value of
    // physical keyboard key.

    // The actual meaning of the value depends on the users' keyboard layout
    // which cannot be detected. Assuming that it is a US keyboard layout
    // provides a surprisingly accurate mapping for US and European users.
    // Due to this, it is left to the user to implement at this time.
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }
    return 0;
  },
  which: function (event) {
    // `which` is an alias for either `keyCode` or `charCode` depending on the
    // type of the event.
    if (event.type === 'keypress') {
      return getEventCharCode(event);
    }
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }
    return 0;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);

/**
 * @interface DragEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var DragEventInterface = {
  dataTransfer: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticMouseEvent}
 */
function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent.augmentClass(SyntheticDragEvent, DragEventInterface);

/**
 * @interface TouchEvent
 * @see http://www.w3.org/TR/touch-events/
 */
var TouchEventInterface = {
  touches: null,
  targetTouches: null,
  changedTouches: null,
  altKey: null,
  metaKey: null,
  ctrlKey: null,
  shiftKey: null,
  getModifierState: getEventModifierState
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);

/**
 * @interface Event
 * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
 */
var TransitionEventInterface = {
  propertyName: null,
  elapsedTime: null,
  pseudoElement: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticTransitionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$1.augmentClass(SyntheticTransitionEvent, TransitionEventInterface);

/**
 * @interface WheelEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var WheelEventInterface = {
  deltaX: function (event) {
    return 'deltaX' in event ? event.deltaX : // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
    'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
  },
  deltaY: function (event) {
    return 'deltaY' in event ? event.deltaY : // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
    'wheelDeltaY' in event ? -event.wheelDeltaY : // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
    'wheelDelta' in event ? -event.wheelDelta : 0;
  },
  deltaZ: null,

  // Browsers without "deltaMode" is reporting in raw wheel delta where one
  // notch on the scroll is always +/- 120, roughly equivalent to pixels.
  // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
  // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
  deltaMode: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticMouseEvent}
 */
function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);

/**
 * Turns
 * ['abort', ...]
 * into
 * eventTypes = {
 *   'abort': {
 *     phasedRegistrationNames: {
 *       bubbled: 'onAbort',
 *       captured: 'onAbortCapture',
 *     },
 *     dependencies: ['topAbort'],
 *   },
 *   ...
 * };
 * topLevelEventsToDispatchConfig = {
 *   'topAbort': { sameConfig }
 * };
 */
var eventTypes$4 = {};
var topLevelEventsToDispatchConfig = {};
['abort', 'animationEnd', 'animationIteration', 'animationStart', 'blur', 'cancel', 'canPlay', 'canPlayThrough', 'click', 'close', 'contextMenu', 'copy', 'cut', 'doubleClick', 'drag', 'dragEnd', 'dragEnter', 'dragExit', 'dragLeave', 'dragOver', 'dragStart', 'drop', 'durationChange', 'emptied', 'encrypted', 'ended', 'error', 'focus', 'input', 'invalid', 'keyDown', 'keyPress', 'keyUp', 'load', 'loadedData', 'loadedMetadata', 'loadStart', 'mouseDown', 'mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'paste', 'pause', 'play', 'playing', 'progress', 'rateChange', 'reset', 'scroll', 'seeked', 'seeking', 'stalled', 'submit', 'suspend', 'timeUpdate', 'toggle', 'touchCancel', 'touchEnd', 'touchMove', 'touchStart', 'transitionEnd', 'volumeChange', 'waiting', 'wheel'].forEach(function (event) {
  var capitalizedEvent = event[0].toUpperCase() + event.slice(1);
  var onEvent = 'on' + capitalizedEvent;
  var topEvent = 'top' + capitalizedEvent;

  var type = {
    phasedRegistrationNames: {
      bubbled: onEvent,
      captured: onEvent + 'Capture'
    },
    dependencies: [topEvent]
  };
  eventTypes$4[event] = type;
  topLevelEventsToDispatchConfig[topEvent] = type;
});

// Only used in DEV for exhaustiveness validation.
var knownHTMLTopLevelTypes = ['topAbort', 'topCancel', 'topCanPlay', 'topCanPlayThrough', 'topClose', 'topDurationChange', 'topEmptied', 'topEncrypted', 'topEnded', 'topError', 'topInput', 'topInvalid', 'topLoad', 'topLoadedData', 'topLoadedMetadata', 'topLoadStart', 'topPause', 'topPlay', 'topPlaying', 'topProgress', 'topRateChange', 'topReset', 'topSeeked', 'topSeeking', 'topStalled', 'topSubmit', 'topSuspend', 'topTimeUpdate', 'topToggle', 'topVolumeChange', 'topWaiting'];

var SimpleEventPlugin = {
  eventTypes: eventTypes$4,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
    if (!dispatchConfig) {
      return null;
    }
    var EventConstructor;
    switch (topLevelType) {
      case 'topKeyPress':
        // Firefox creates a keypress event for function keys too. This removes
        // the unwanted keypress events. Enter is however both printable and
        // non-printable. One would expect Tab to be as well (but it isn't).
        if (getEventCharCode(nativeEvent) === 0) {
          return null;
        }
      /* falls through */
      case 'topKeyDown':
      case 'topKeyUp':
        EventConstructor = SyntheticKeyboardEvent;
        break;
      case 'topBlur':
      case 'topFocus':
        EventConstructor = SyntheticFocusEvent;
        break;
      case 'topClick':
        // Firefox creates a click event on right mouse clicks. This removes the
        // unwanted click events.
        if (nativeEvent.button === 2) {
          return null;
        }
      /* falls through */
      case 'topDoubleClick':
      case 'topMouseDown':
      case 'topMouseMove':
      case 'topMouseUp':
      // TODO: Disabled elements should not respond to mouse events
      /* falls through */
      case 'topMouseOut':
      case 'topMouseOver':
      case 'topContextMenu':
        EventConstructor = SyntheticMouseEvent;
        break;
      case 'topDrag':
      case 'topDragEnd':
      case 'topDragEnter':
      case 'topDragExit':
      case 'topDragLeave':
      case 'topDragOver':
      case 'topDragStart':
      case 'topDrop':
        EventConstructor = SyntheticDragEvent;
        break;
      case 'topTouchCancel':
      case 'topTouchEnd':
      case 'topTouchMove':
      case 'topTouchStart':
        EventConstructor = SyntheticTouchEvent;
        break;
      case 'topAnimationEnd':
      case 'topAnimationIteration':
      case 'topAnimationStart':
        EventConstructor = SyntheticAnimationEvent;
        break;
      case 'topTransitionEnd':
        EventConstructor = SyntheticTransitionEvent;
        break;
      case 'topScroll':
        EventConstructor = SyntheticUIEvent;
        break;
      case 'topWheel':
        EventConstructor = SyntheticWheelEvent;
        break;
      case 'topCopy':
      case 'topCut':
      case 'topPaste':
        EventConstructor = SyntheticClipboardEvent;
        break;
      default:
        {
          if (knownHTMLTopLevelTypes.indexOf(topLevelType) === -1) {
            warning(false, 'SimpleEventPlugin: Unhandled event type, `%s`. This warning ' + 'is likely caused by a bug in React. Please file an issue.', topLevelType);
          }
        }
        // HTML Events
        // @see http://www.w3.org/TR/html5/index.html#events-0
        EventConstructor = SyntheticEvent$1;
        break;
    }
    var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
    accumulateTwoPhaseDispatches(event);
    return event;
  }
};

setHandleTopLevel(handleTopLevel);

/**
 * Inject modules for resolving DOM hierarchy and plugin ordering.
 */
injection$1.injectEventPluginOrder(DOMEventPluginOrder);
injection$2.injectComponentTree(ReactDOMComponentTree);

/**
 * Some important event plugins included by default (without having to require
 * them).
 */
injection$1.injectEventPluginsByName({
  SimpleEventPlugin: SimpleEventPlugin,
  EnterLeaveEventPlugin: EnterLeaveEventPlugin,
  ChangeEventPlugin: ChangeEventPlugin,
  SelectEventPlugin: SelectEventPlugin,
  BeforeInputEventPlugin: BeforeInputEventPlugin
});

var enableAsyncSubtreeAPI = true;
var enableAsyncSchedulingByDefaultInReactDOM = false;
// Exports ReactDOM.createRoot
var enableCreateRoot = false;
var enableUserTimingAPI = true;

// Mutating mode (React DOM, React ART, React Native):
var enableMutatingReconciler = true;
// Experimental noop mode (currently unused):
var enableNoopReconciler = false;
// Experimental persistent mode (CS):
var enablePersistentReconciler = false;

// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:
var debugRenderPhaseSideEffects = false;

// Only used in www builds.

var valueStack = [];

{
  var fiberStack = [];
}

var index = -1;

function createCursor(defaultValue) {
  return {
    current: defaultValue
  };
}



function pop(cursor, fiber) {
  if (index < 0) {
    {
      warning(false, 'Unexpected pop.');
    }
    return;
  }

  {
    if (fiber !== fiberStack[index]) {
      warning(false, 'Unexpected Fiber popped.');
    }
  }

  cursor.current = valueStack[index];

  valueStack[index] = null;

  {
    fiberStack[index] = null;
  }

  index--;
}

function push(cursor, value, fiber) {
  index++;

  valueStack[index] = cursor.current;

  {
    fiberStack[index] = fiber;
  }

  cursor.current = value;
}

function reset$1() {
  while (index > -1) {
    valueStack[index] = null;

    {
      fiberStack[index] = null;
    }

    index--;
  }
}

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

function describeFiber(fiber) {
  switch (fiber.tag) {
    case IndeterminateComponent:
    case FunctionalComponent:
    case ClassComponent:
    case HostComponent:
      var owner = fiber._debugOwner;
      var source = fiber._debugSource;
      var name = getComponentName(fiber);
      var ownerName = null;
      if (owner) {
        ownerName = getComponentName(owner);
      }
      return describeComponentFrame(name, source, ownerName);
    default:
      return '';
  }
}

// This function can only be called with a work-in-progress fiber and
// only during begin or complete phase. Do not call it under any other
// circumstances.
function getStackAddendumByWorkInProgressFiber(workInProgress) {
  var info = '';
  var node = workInProgress;
  do {
    info += describeFiber(node);
    // Otherwise this return pointer might point to the wrong tree:
    node = node['return'];
  } while (node);
  return info;
}

function getCurrentFiberOwnerName() {
  {
    var fiber = ReactDebugCurrentFiber.current;
    if (fiber === null) {
      return null;
    }
    var owner = fiber._debugOwner;
    if (owner !== null && typeof owner !== 'undefined') {
      return getComponentName(owner);
    }
  }
  return null;
}

function getCurrentFiberStackAddendum() {
  {
    var fiber = ReactDebugCurrentFiber.current;
    if (fiber === null) {
      return null;
    }
    // Safe because if current fiber exists, we are reconciling,
    // and it is guaranteed to be the work-in-progress version.
    return getStackAddendumByWorkInProgressFiber(fiber);
  }
  return null;
}

function resetCurrentFiber() {
  ReactDebugCurrentFrame.getCurrentStack = null;
  ReactDebugCurrentFiber.current = null;
  ReactDebugCurrentFiber.phase = null;
}

function setCurrentFiber(fiber) {
  ReactDebugCurrentFrame.getCurrentStack = getCurrentFiberStackAddendum;
  ReactDebugCurrentFiber.current = fiber;
  ReactDebugCurrentFiber.phase = null;
}

function setCurrentPhase(phase) {
  ReactDebugCurrentFiber.phase = phase;
}

var ReactDebugCurrentFiber = {
  current: null,
  phase: null,
  resetCurrentFiber: resetCurrentFiber,
  setCurrentFiber: setCurrentFiber,
  setCurrentPhase: setCurrentPhase,
  getCurrentFiberOwnerName: getCurrentFiberOwnerName,
  getCurrentFiberStackAddendum: getCurrentFiberStackAddendum
};

// Prefix measurements so that it's possible to filter them.
// Longer prefixes are hard to read in DevTools.
var reactEmoji = '\u269B';
var warningEmoji = '\u26D4';
var supportsUserTiming = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

// Keep track of current fiber so that we know the path to unwind on pause.
// TODO: this looks the same as nextUnitOfWork in scheduler. Can we unify them?
var currentFiber = null;
// If we're in the middle of user code, which fiber and method is it?
// Reusing `currentFiber` would be confusing for this because user code fiber
// can change during commit phase too, but we don't need to unwind it (since
// lifecycles in the commit phase don't resemble a tree).
var currentPhase = null;
var currentPhaseFiber = null;
// Did lifecycle hook schedule an update? This is often a performance problem,
// so we will keep track of it, and include it in the report.
// Track commits caused by cascading updates.
var isCommitting = false;
var hasScheduledUpdateInCurrentCommit = false;
var hasScheduledUpdateInCurrentPhase = false;
var commitCountInCurrentWorkLoop = 0;
var effectCountInCurrentCommit = 0;
var isWaitingForCallback = false;
// During commits, we only show a measurement once per method name
// to avoid stretch the commit phase with measurement overhead.
var labelsInCurrentCommit = new Set();

var formatMarkName = function (markName) {
  return reactEmoji + ' ' + markName;
};

var formatLabel = function (label, warning$$1) {
  var prefix = warning$$1 ? warningEmoji + ' ' : reactEmoji + ' ';
  var suffix = warning$$1 ? ' Warning: ' + warning$$1 : '';
  return '' + prefix + label + suffix;
};

var beginMark = function (markName) {
  performance.mark(formatMarkName(markName));
};

var clearMark = function (markName) {
  performance.clearMarks(formatMarkName(markName));
};

var endMark = function (label, markName, warning$$1) {
  var formattedMarkName = formatMarkName(markName);
  var formattedLabel = formatLabel(label, warning$$1);
  try {
    performance.measure(formattedLabel, formattedMarkName);
  } catch (err) {}
  // If previous mark was missing for some reason, this will throw.
  // This could only happen if React crashed in an unexpected place earlier.
  // Don't pile on with more errors.

  // Clear marks immediately to avoid growing buffer.
  performance.clearMarks(formattedMarkName);
  performance.clearMeasures(formattedLabel);
};

var getFiberMarkName = function (label, debugID) {
  return label + ' (#' + debugID + ')';
};

var getFiberLabel = function (componentName, isMounted, phase) {
  if (phase === null) {
    // These are composite component total time measurements.
    return componentName + ' [' + (isMounted ? 'update' : 'mount') + ']';
  } else {
    // Composite component methods.
    return componentName + '.' + phase;
  }
};

var beginFiberMark = function (fiber, phase) {
  var componentName = getComponentName(fiber) || 'Unknown';
  var debugID = fiber._debugID;
  var isMounted = fiber.alternate !== null;
  var label = getFiberLabel(componentName, isMounted, phase);

  if (isCommitting && labelsInCurrentCommit.has(label)) {
    // During the commit phase, we don't show duplicate labels because
    // there is a fixed overhead for every measurement, and we don't
    // want to stretch the commit phase beyond necessary.
    return false;
  }
  labelsInCurrentCommit.add(label);

  var markName = getFiberMarkName(label, debugID);
  beginMark(markName);
  return true;
};

var clearFiberMark = function (fiber, phase) {
  var componentName = getComponentName(fiber) || 'Unknown';
  var debugID = fiber._debugID;
  var isMounted = fiber.alternate !== null;
  var label = getFiberLabel(componentName, isMounted, phase);
  var markName = getFiberMarkName(label, debugID);
  clearMark(markName);
};

var endFiberMark = function (fiber, phase, warning$$1) {
  var componentName = getComponentName(fiber) || 'Unknown';
  var debugID = fiber._debugID;
  var isMounted = fiber.alternate !== null;
  var label = getFiberLabel(componentName, isMounted, phase);
  var markName = getFiberMarkName(label, debugID);
  endMark(label, markName, warning$$1);
};

var shouldIgnoreFiber = function (fiber) {
  // Host components should be skipped in the timeline.
  // We could check typeof fiber.type, but does this work with RN?
  switch (fiber.tag) {
    case HostRoot:
    case HostComponent:
    case HostText:
    case HostPortal:
    case ReturnComponent:
    case Fragment:
      return true;
    default:
      return false;
  }
};

var clearPendingPhaseMeasurement = function () {
  if (currentPhase !== null && currentPhaseFiber !== null) {
    clearFiberMark(currentPhaseFiber, currentPhase);
  }
  currentPhaseFiber = null;
  currentPhase = null;
  hasScheduledUpdateInCurrentPhase = false;
};

var pauseTimers = function () {
  // Stops all currently active measurements so that they can be resumed
  // if we continue in a later deferred loop from the same unit of work.
  var fiber = currentFiber;
  while (fiber) {
    if (fiber._debugIsCurrentlyTiming) {
      endFiberMark(fiber, null, null);
    }
    fiber = fiber['return'];
  }
};

var resumeTimersRecursively = function (fiber) {
  if (fiber['return'] !== null) {
    resumeTimersRecursively(fiber['return']);
  }
  if (fiber._debugIsCurrentlyTiming) {
    beginFiberMark(fiber, null);
  }
};

var resumeTimers = function () {
  // Resumes all measurements that were active during the last deferred loop.
  if (currentFiber !== null) {
    resumeTimersRecursively(currentFiber);
  }
};

function recordEffect() {
  if (enableUserTimingAPI) {
    effectCountInCurrentCommit++;
  }
}

function recordScheduleUpdate() {
  if (enableUserTimingAPI) {
    if (isCommitting) {
      hasScheduledUpdateInCurrentCommit = true;
    }
    if (currentPhase !== null && currentPhase !== 'componentWillMount' && currentPhase !== 'componentWillReceiveProps') {
      hasScheduledUpdateInCurrentPhase = true;
    }
  }
}

function startRequestCallbackTimer() {
  if (enableUserTimingAPI) {
    if (supportsUserTiming && !isWaitingForCallback) {
      isWaitingForCallback = true;
      beginMark('(Waiting for async callback...)');
    }
  }
}

function stopRequestCallbackTimer(didExpire) {
  if (enableUserTimingAPI) {
    if (supportsUserTiming) {
      isWaitingForCallback = false;
      var warning$$1 = didExpire ? 'React was blocked by main thread' : null;
      endMark('(Waiting for async callback...)', '(Waiting for async callback...)', warning$$1);
    }
  }
}

function startWorkTimer(fiber) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
      return;
    }
    // If we pause, this is the fiber to unwind from.
    currentFiber = fiber;
    if (!beginFiberMark(fiber, null)) {
      return;
    }
    fiber._debugIsCurrentlyTiming = true;
  }
}

function cancelWorkTimer(fiber) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
      return;
    }
    // Remember we shouldn't complete measurement for this fiber.
    // Otherwise flamechart will be deep even for small updates.
    fiber._debugIsCurrentlyTiming = false;
    clearFiberMark(fiber, null);
  }
}

function stopWorkTimer(fiber) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
      return;
    }
    // If we pause, its parent is the fiber to unwind from.
    currentFiber = fiber['return'];
    if (!fiber._debugIsCurrentlyTiming) {
      return;
    }
    fiber._debugIsCurrentlyTiming = false;
    endFiberMark(fiber, null, null);
  }
}

function stopFailedWorkTimer(fiber) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
      return;
    }
    // If we pause, its parent is the fiber to unwind from.
    currentFiber = fiber['return'];
    if (!fiber._debugIsCurrentlyTiming) {
      return;
    }
    fiber._debugIsCurrentlyTiming = false;
    var warning$$1 = 'An error was thrown inside this error boundary';
    endFiberMark(fiber, null, warning$$1);
  }
}

function startPhaseTimer(fiber, phase) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    clearPendingPhaseMeasurement();
    if (!beginFiberMark(fiber, phase)) {
      return;
    }
    currentPhaseFiber = fiber;
    currentPhase = phase;
  }
}

function stopPhaseTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    if (currentPhase !== null && currentPhaseFiber !== null) {
      var warning$$1 = hasScheduledUpdateInCurrentPhase ? 'Scheduled a cascading update' : null;
      endFiberMark(currentPhaseFiber, currentPhase, warning$$1);
    }
    currentPhase = null;
    currentPhaseFiber = null;
  }
}

function startWorkLoopTimer(nextUnitOfWork) {
  if (enableUserTimingAPI) {
    currentFiber = nextUnitOfWork;
    if (!supportsUserTiming) {
      return;
    }
    commitCountInCurrentWorkLoop = 0;
    // This is top level call.
    // Any other measurements are performed within.
    beginMark('(React Tree Reconciliation)');
    // Resume any measurements that were in progress during the last loop.
    resumeTimers();
  }
}

function stopWorkLoopTimer(interruptedBy) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    var warning$$1 = null;
    if (interruptedBy !== null) {
      if (interruptedBy.tag === HostRoot) {
        warning$$1 = 'A top-level update interrupted the previous render';
      } else {
        var componentName = getComponentName(interruptedBy) || 'Unknown';
        warning$$1 = 'An update to ' + componentName + ' interrupted the previous render';
      }
    } else if (commitCountInCurrentWorkLoop > 1) {
      warning$$1 = 'There were cascading updates';
    }
    commitCountInCurrentWorkLoop = 0;
    // Pause any measurements until the next loop.
    pauseTimers();
    endMark('(React Tree Reconciliation)', '(React Tree Reconciliation)', warning$$1);
  }
}

function startCommitTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    isCommitting = true;
    hasScheduledUpdateInCurrentCommit = false;
    labelsInCurrentCommit.clear();
    beginMark('(Committing Changes)');
  }
}

function stopCommitTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }

    var warning$$1 = null;
    if (hasScheduledUpdateInCurrentCommit) {
      warning$$1 = 'Lifecycle hook scheduled a cascading update';
    } else if (commitCountInCurrentWorkLoop > 0) {
      warning$$1 = 'Caused by a cascading update in earlier commit';
    }
    hasScheduledUpdateInCurrentCommit = false;
    commitCountInCurrentWorkLoop++;
    isCommitting = false;
    labelsInCurrentCommit.clear();

    endMark('(Committing Changes)', '(Committing Changes)', warning$$1);
  }
}

function startCommitHostEffectsTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    effectCountInCurrentCommit = 0;
    beginMark('(Committing Host Effects)');
  }
}

function stopCommitHostEffectsTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark('(Committing Host Effects: ' + count + ' Total)', '(Committing Host Effects)', null);
  }
}

function startCommitLifeCyclesTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    effectCountInCurrentCommit = 0;
    beginMark('(Calling Lifecycle Methods)');
  }
}

function stopCommitLifeCyclesTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark('(Calling Lifecycle Methods: ' + count + ' Total)', '(Calling Lifecycle Methods)', null);
  }
}

{
  var warnedAboutMissingGetChildContext = {};
}

// A cursor to the current merged context object on the stack.
var contextStackCursor = createCursor(emptyObject);
// A cursor to a boolean indicating whether the context has changed.
var didPerformWorkStackCursor = createCursor(false);
// Keep track of the previous context object that was on the stack.
// We use this to get access to the parent context after we have already
// pushed the next context provider, and now need to merge their contexts.
var previousContext = emptyObject;

function getUnmaskedContext(workInProgress) {
  var hasOwnContext = isContextProvider(workInProgress);
  if (hasOwnContext) {
    // If the fiber is a context provider itself, when we read its context
    // we have already pushed its own child context on the stack. A context
    // provider should not "see" its own child context. Therefore we read the
    // previous (parent) context instead for a context provider.
    return previousContext;
  }
  return contextStackCursor.current;
}

function cacheContext(workInProgress, unmaskedContext, maskedContext) {
  var instance = workInProgress.stateNode;
  instance.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext;
  instance.__reactInternalMemoizedMaskedChildContext = maskedContext;
}

function getMaskedContext(workInProgress, unmaskedContext) {
  var type = workInProgress.type;
  var contextTypes = type.contextTypes;
  if (!contextTypes) {
    return emptyObject;
  }

  // Avoid recreating masked context unless unmasked context has changed.
  // Failing to do this will result in unnecessary calls to componentWillReceiveProps.
  // This may trigger infinite loops if componentWillReceiveProps calls setState.
  var instance = workInProgress.stateNode;
  if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) {
    return instance.__reactInternalMemoizedMaskedChildContext;
  }

  var context = {};
  for (var key in contextTypes) {
    context[key] = unmaskedContext[key];
  }

  {
    var name = getComponentName(workInProgress) || 'Unknown';
    checkPropTypes(contextTypes, context, 'context', name, ReactDebugCurrentFiber.getCurrentFiberStackAddendum);
  }

  // Cache unmasked context so we can avoid recreating masked context unless necessary.
  // Context is created before the class component is instantiated so check for instance.
  if (instance) {
    cacheContext(workInProgress, unmaskedContext, context);
  }

  return context;
}

function hasContextChanged() {
  return didPerformWorkStackCursor.current;
}

function isContextConsumer(fiber) {
  return fiber.tag === ClassComponent && fiber.type.contextTypes != null;
}

function isContextProvider(fiber) {
  return fiber.tag === ClassComponent && fiber.type.childContextTypes != null;
}

function popContextProvider(fiber) {
  if (!isContextProvider(fiber)) {
    return;
  }

  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}

function popTopLevelContextObject(fiber) {
  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}

function pushTopLevelContextObject(fiber, context, didChange) {
  !(contextStackCursor.cursor == null) ? invariant(false, 'Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  push(contextStackCursor, context, fiber);
  push(didPerformWorkStackCursor, didChange, fiber);
}

function processChildContext(fiber, parentContext) {
  var instance = fiber.stateNode;
  var childContextTypes = fiber.type.childContextTypes;

  // TODO (bvaughn) Replace this behavior with an invariant() in the future.
  // It has only been added in Fiber to match the (unintentional) behavior in Stack.
  if (typeof instance.getChildContext !== 'function') {
    {
      var componentName = getComponentName(fiber) || 'Unknown';

      if (!warnedAboutMissingGetChildContext[componentName]) {
        warnedAboutMissingGetChildContext[componentName] = true;
        warning(false, '%s.childContextTypes is specified but there is no getChildContext() method ' + 'on the instance. You can either define getChildContext() on %s or remove ' + 'childContextTypes from it.', componentName, componentName);
      }
    }
    return parentContext;
  }

  var childContext = void 0;
  {
    ReactDebugCurrentFiber.setCurrentPhase('getChildContext');
  }
  startPhaseTimer(fiber, 'getChildContext');
  childContext = instance.getChildContext();
  stopPhaseTimer();
  {
    ReactDebugCurrentFiber.setCurrentPhase(null);
  }
  for (var contextKey in childContext) {
    !(contextKey in childContextTypes) ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', getComponentName(fiber) || 'Unknown', contextKey) : void 0;
  }
  {
    var name = getComponentName(fiber) || 'Unknown';
    checkPropTypes(childContextTypes, childContext, 'child context', name,
    // In practice, there is one case in which we won't get a stack. It's when
    // somebody calls unstable_renderSubtreeIntoContainer() and we process
    // context from the parent component instance. The stack will be missing
    // because it's outside of the reconciliation, and so the pointer has not
    // been set. This is rare and doesn't matter. We'll also remove that API.
    ReactDebugCurrentFiber.getCurrentFiberStackAddendum);
  }

  return _assign({}, parentContext, childContext);
}

function pushContextProvider(workInProgress) {
  if (!isContextProvider(workInProgress)) {
    return false;
  }

  var instance = workInProgress.stateNode;
  // We push the context as early as possible to ensure stack integrity.
  // If the instance does not exist yet, we will push null at first,
  // and replace it on the stack later when invalidating the context.
  var memoizedMergedChildContext = instance && instance.__reactInternalMemoizedMergedChildContext || emptyObject;

  // Remember the parent context so we can merge with it later.
  // Inherit the parent's did-perform-work value to avoid inadvertently blocking updates.
  previousContext = contextStackCursor.current;
  push(contextStackCursor, memoizedMergedChildContext, workInProgress);
  push(didPerformWorkStackCursor, didPerformWorkStackCursor.current, workInProgress);

  return true;
}

function invalidateContextProvider(workInProgress, didChange) {
  var instance = workInProgress.stateNode;
  !instance ? invariant(false, 'Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  if (didChange) {
    // Merge parent and own context.
    // Skip this if we're not updating due to sCU.
    // This avoids unnecessarily recomputing memoized values.
    var mergedContext = processChildContext(workInProgress, previousContext);
    instance.__reactInternalMemoizedMergedChildContext = mergedContext;

    // Replace the old (or empty) context with the new one.
    // It is important to unwind the context in the reverse order.
    pop(didPerformWorkStackCursor, workInProgress);
    pop(contextStackCursor, workInProgress);
    // Now push the new context and mark that it has changed.
    push(contextStackCursor, mergedContext, workInProgress);
    push(didPerformWorkStackCursor, didChange, workInProgress);
  } else {
    pop(didPerformWorkStackCursor, workInProgress);
    push(didPerformWorkStackCursor, didChange, workInProgress);
  }
}

function resetContext() {
  previousContext = emptyObject;
  contextStackCursor.current = emptyObject;
  didPerformWorkStackCursor.current = false;
}

function findCurrentUnmaskedContext(fiber) {
  // Currently this is only used with renderSubtreeIntoContainer; not sure if it
  // makes sense elsewhere
  !(isFiberMounted(fiber) && fiber.tag === ClassComponent) ? invariant(false, 'Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  var node = fiber;
  while (node.tag !== HostRoot) {
    if (isContextProvider(node)) {
      return node.stateNode.__reactInternalMemoizedMergedChildContext;
    }
    var parent = node['return'];
    !parent ? invariant(false, 'Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    node = parent;
  }
  return node.stateNode.context;
}

var NoWork = 0; // TODO: Use an opaque type once ESLint et al support the syntax

var Sync = 1;
var Never = 2147483647; // Max int32: Math.pow(2, 31) - 1

var UNIT_SIZE = 10;
var MAGIC_NUMBER_OFFSET = 2;

// 1 unit of expiration time represents 10ms.
function msToExpirationTime(ms) {
  // Always add an offset so that we don't clash with the magic number for NoWork.
  return (ms / UNIT_SIZE | 0) + MAGIC_NUMBER_OFFSET;
}

function expirationTimeToMs(expirationTime) {
  return (expirationTime - MAGIC_NUMBER_OFFSET) * UNIT_SIZE;
}

function ceiling(num, precision) {
  return ((num / precision | 0) + 1) * precision;
}

function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
  return ceiling(currentTime + expirationInMs / UNIT_SIZE, bucketSizeMs / UNIT_SIZE);
}

var NoContext = 0;
var AsyncUpdates = 1;

{
  var hasBadMapPolyfill = false;
  try {
    var nonExtensibleObject = Object.preventExtensions({});
    /* eslint-disable no-new */
    
    /* eslint-enable no-new */
  } catch (e) {
    // TODO: Consider warning about bad polyfills
    hasBadMapPolyfill = true;
  }
}

// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.


{
  var debugCounter = 1;
}

function FiberNode(tag, key, internalContextTag) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this['return'] = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = null;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;

  this.internalContextTag = internalContextTag;

  // Effects
  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  this.expirationTime = NoWork;

  this.alternate = null;

  {
    this._debugID = debugCounter++;
    this._debugSource = null;
    this._debugOwner = null;
    this._debugIsCurrentlyTiming = false;
    if (!hasBadMapPolyfill && typeof Object.preventExtensions === 'function') {
      Object.preventExtensions(this);
    }
  }
}

// This is a constructor function, rather than a POJO constructor, still
// please ensure we do the following:
// 1) Nobody should add any instance methods on this. Instance methods can be
//    more difficult to predict when they get optimized and they are almost
//    never inlined properly in static compilers.
// 2) Nobody should rely on `instanceof Fiber` for type testing. We should
//    always know when it is a fiber.
// 3) We might want to experiment with using numeric keys since they are easier
//    to optimize in a non-JIT environment.
// 4) We can easily go from a constructor to a createFiber object literal if that
//    is faster.
// 5) It should be easy to port this to a C struct and keep a C implementation
//    compatible.
var createFiber = function (tag, key, internalContextTag) {
  // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
  return new FiberNode(tag, key, internalContextTag);
};

function shouldConstruct(Component) {
  return !!(Component.prototype && Component.prototype.isReactComponent);
}

// This is used to create an alternate fiber to do work on.
function createWorkInProgress(current, pendingProps, expirationTime) {
  var workInProgress = current.alternate;
  if (workInProgress === null) {
    // We use a double buffering pooling technique because we know that we'll
    // only ever need at most two versions of a tree. We pool the "other" unused
    // node that we're free to reuse. This is lazily created to avoid allocating
    // extra objects for things that are never updated. It also allow us to
    // reclaim the extra memory if needed.
    workInProgress = createFiber(current.tag, current.key, current.internalContextTag);
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;

    {
      // DEV-only fields
      workInProgress._debugID = current._debugID;
      workInProgress._debugSource = current._debugSource;
      workInProgress._debugOwner = current._debugOwner;
    }

    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    // We already have an alternate.
    // Reset the effect tag.
    workInProgress.effectTag = NoEffect;

    // The effect list is no longer valid.
    workInProgress.nextEffect = null;
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;
  }

  workInProgress.expirationTime = expirationTime;
  workInProgress.pendingProps = pendingProps;

  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;

  // These will be overridden during the parent's reconciliation
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;

  return workInProgress;
}

function createHostRootFiber() {
  var fiber = createFiber(HostRoot, null, NoContext);
  return fiber;
}

function createFiberFromElement(element, internalContextTag, expirationTime) {
  var owner = null;
  {
    owner = element._owner;
  }

  var fiber = void 0;
  var type = element.type,
      key = element.key;

  if (typeof type === 'function') {
    fiber = shouldConstruct(type) ? createFiber(ClassComponent, key, internalContextTag) : createFiber(IndeterminateComponent, key, internalContextTag);
    fiber.type = type;
    fiber.pendingProps = element.props;
  } else if (typeof type === 'string') {
    fiber = createFiber(HostComponent, key, internalContextTag);
    fiber.type = type;
    fiber.pendingProps = element.props;
  } else if (typeof type === 'object' && type !== null && typeof type.tag === 'number') {
    // Currently assumed to be a continuation and therefore is a fiber already.
    // TODO: The yield system is currently broken for updates in some cases.
    // The reified yield stores a fiber, but we don't know which fiber that is;
    // the current or a workInProgress? When the continuation gets rendered here
    // we don't know if we can reuse that fiber or if we need to clone it.
    // There is probably a clever way to restructure this.
    fiber = type;
    fiber.pendingProps = element.props;
  } else {
    var info = '';
    {
      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }
      var ownerName = owner ? getComponentName(owner) : null;
      if (ownerName) {
        info += '\n\nCheck the render method of `' + ownerName + '`.';
      }
    }
    invariant(false, 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s', type == null ? type : typeof type, info);
  }

  {
    fiber._debugSource = element._source;
    fiber._debugOwner = element._owner;
  }

  fiber.expirationTime = expirationTime;

  return fiber;
}

function createFiberFromFragment(elements, internalContextTag, expirationTime, key) {
  var fiber = createFiber(Fragment, key, internalContextTag);
  fiber.pendingProps = elements;
  fiber.expirationTime = expirationTime;
  return fiber;
}

function createFiberFromText(content, internalContextTag, expirationTime) {
  var fiber = createFiber(HostText, null, internalContextTag);
  fiber.pendingProps = content;
  fiber.expirationTime = expirationTime;
  return fiber;
}

function createFiberFromHostInstanceForDeletion() {
  var fiber = createFiber(HostComponent, null, NoContext);
  fiber.type = 'DELETED';
  return fiber;
}

function createFiberFromCall(call, internalContextTag, expirationTime) {
  var fiber = createFiber(CallComponent, call.key, internalContextTag);
  fiber.type = call.handler;
  fiber.pendingProps = call;
  fiber.expirationTime = expirationTime;
  return fiber;
}

function createFiberFromReturn(returnNode, internalContextTag, expirationTime) {
  var fiber = createFiber(ReturnComponent, null, internalContextTag);
  fiber.expirationTime = expirationTime;
  return fiber;
}

function createFiberFromPortal(portal, internalContextTag, expirationTime) {
  var fiber = createFiber(HostPortal, portal.key, internalContextTag);
  fiber.pendingProps = portal.children || [];
  fiber.expirationTime = expirationTime;
  fiber.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null, // Used by persistent updates
    implementation: portal.implementation
  };
  return fiber;
}

function createFiberRoot(containerInfo, hydrate) {
  // Cyclic construction. This cheats the type system right now because
  // stateNode is any.
  var uninitializedFiber = createHostRootFiber();
  var root = {
    current: uninitializedFiber,
    containerInfo: containerInfo,
    pendingChildren: null,
    remainingExpirationTime: NoWork,
    isReadyForCommit: false,
    finishedWork: null,
    context: null,
    pendingContext: null,
    hydrate: hydrate,
    nextScheduledRoot: null
  };
  uninitializedFiber.stateNode = root;
  return root;
}

var onCommitFiberRoot = null;
var onCommitFiberUnmount = null;
var hasLoggedError = false;

function catchErrors(fn) {
  return function (arg) {
    try {
      return fn(arg);
    } catch (err) {
      if (true && !hasLoggedError) {
        hasLoggedError = true;
        warning(false, 'React DevTools encountered an error: %s', err);
      }
    }
  };
}

function injectInternals(internals) {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
    // No DevTools
    return false;
  }
  var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (hook.isDisabled) {
    // This isn't a real property on the hook, but it can be set to opt out
    // of DevTools integration and associated warnings and logs.
    // https://github.com/facebook/react/issues/3877
    return true;
  }
  if (!hook.supportsFiber) {
    {
      warning(false, 'The installed version of React DevTools is too old and will not work ' + 'with the current version of React. Please update React DevTools. ' + 'https://fb.me/react-devtools');
    }
    // DevTools exists, even though it doesn't support Fiber.
    return true;
  }
  try {
    var rendererID = hook.inject(internals);
    // We have successfully injected, so now it is safe to set up hooks.
    onCommitFiberRoot = catchErrors(function (root) {
      return hook.onCommitFiberRoot(rendererID, root);
    });
    onCommitFiberUnmount = catchErrors(function (fiber) {
      return hook.onCommitFiberUnmount(rendererID, fiber);
    });
  } catch (err) {
    // Catch all errors because it is unsafe to throw during initialization.
    {
      warning(false, 'React DevTools encountered an error: %s.', err);
    }
  }
  // DevTools exists
  return true;
}

function onCommitRoot(root) {
  if (typeof onCommitFiberRoot === 'function') {
    onCommitFiberRoot(root);
  }
}

function onCommitUnmount(fiber) {
  if (typeof onCommitFiberUnmount === 'function') {
    onCommitFiberUnmount(fiber);
  }
}

{
  var didWarnUpdateInsideUpdate = false;
}

// Callbacks are not validated until invocation


// Singly linked-list of updates. When an update is scheduled, it is added to
// the queue of the current fiber and the work-in-progress fiber. The two queues
// are separate but they share a persistent structure.
//
// During reconciliation, updates are removed from the work-in-progress fiber,
// but they remain on the current fiber. That ensures that if a work-in-progress
// is aborted, the aborted updates are recovered by cloning from current.
//
// The work-in-progress queue is always a subset of the current queue.
//
// When the tree is committed, the work-in-progress becomes the current.


function createUpdateQueue(baseState) {
  var queue = {
    baseState: baseState,
    expirationTime: NoWork,
    first: null,
    last: null,
    callbackList: null,
    hasForceUpdate: false,
    isInitialized: false
  };
  {
    queue.isProcessing = false;
  }
  return queue;
}

function insertUpdateIntoQueue(queue, update) {
  // Append the update to the end of the list.
  if (queue.last === null) {
    // Queue is empty
    queue.first = queue.last = update;
  } else {
    queue.last.next = update;
    queue.last = update;
  }
  if (queue.expirationTime === NoWork || queue.expirationTime > update.expirationTime) {
    queue.expirationTime = update.expirationTime;
  }
}

function insertUpdateIntoFiber(fiber, update) {
  // We'll have at least one and at most two distinct update queues.
  var alternateFiber = fiber.alternate;
  var queue1 = fiber.updateQueue;
  if (queue1 === null) {
    // TODO: We don't know what the base state will be until we begin work.
    // It depends on which fiber is the next current. Initialize with an empty
    // base state, then set to the memoizedState when rendering. Not super
    // happy with this approach.
    queue1 = fiber.updateQueue = createUpdateQueue(null);
  }

  var queue2 = void 0;
  if (alternateFiber !== null) {
    queue2 = alternateFiber.updateQueue;
    if (queue2 === null) {
      queue2 = alternateFiber.updateQueue = createUpdateQueue(null);
    }
  } else {
    queue2 = null;
  }
  queue2 = queue2 !== queue1 ? queue2 : null;

  // Warn if an update is scheduled from inside an updater function.
  {
    if ((queue1.isProcessing || queue2 !== null && queue2.isProcessing) && !didWarnUpdateInsideUpdate) {
      warning(false, 'An update (setState, replaceState, or forceUpdate) was scheduled ' + 'from inside an update function. Update functions should be pure, ' + 'with zero side-effects. Consider using componentDidUpdate or a ' + 'callback.');
      didWarnUpdateInsideUpdate = true;
    }
  }

  // If there's only one queue, add the update to that queue and exit.
  if (queue2 === null) {
    insertUpdateIntoQueue(queue1, update);
    return;
  }

  // If either queue is empty, we need to add to both queues.
  if (queue1.last === null || queue2.last === null) {
    insertUpdateIntoQueue(queue1, update);
    insertUpdateIntoQueue(queue2, update);
    return;
  }

  // If both lists are not empty, the last update is the same for both lists
  // because of structural sharing. So, we should only append to one of
  // the lists.
  insertUpdateIntoQueue(queue1, update);
  // But we still need to update the `last` pointer of queue2.
  queue2.last = update;
}

function getUpdateExpirationTime(fiber) {
  if (fiber.tag !== ClassComponent && fiber.tag !== HostRoot) {
    return NoWork;
  }
  var updateQueue = fiber.updateQueue;
  if (updateQueue === null) {
    return NoWork;
  }
  return updateQueue.expirationTime;
}

function getStateFromUpdate(update, instance, prevState, props) {
  var partialState = update.partialState;
  if (typeof partialState === 'function') {
    var updateFn = partialState;

    // Invoke setState callback an extra time to help detect side-effects.
    if (debugRenderPhaseSideEffects) {
      updateFn.call(instance, prevState, props);
    }

    return updateFn.call(instance, prevState, props);
  } else {
    return partialState;
  }
}

function processUpdateQueue(current, workInProgress, queue, instance, props, renderExpirationTime) {
  if (current !== null && current.updateQueue === queue) {
    // We need to create a work-in-progress queue, by cloning the current queue.
    var currentQueue = queue;
    queue = workInProgress.updateQueue = {
      baseState: currentQueue.baseState,
      expirationTime: currentQueue.expirationTime,
      first: currentQueue.first,
      last: currentQueue.last,
      isInitialized: currentQueue.isInitialized,
      // These fields are no longer valid because they were already committed.
      // Reset them.
      callbackList: null,
      hasForceUpdate: false
    };
  }

  {
    // Set this flag so we can warn if setState is called inside the update
    // function of another setState.
    queue.isProcessing = true;
  }

  // Reset the remaining expiration time. If we skip over any updates, we'll
  // increase this accordingly.
  queue.expirationTime = NoWork;

  // TODO: We don't know what the base state will be until we begin work.
  // It depends on which fiber is the next current. Initialize with an empty
  // base state, then set to the memoizedState when rendering. Not super
  // happy with this approach.
  var state = void 0;
  if (queue.isInitialized) {
    state = queue.baseState;
  } else {
    state = queue.baseState = workInProgress.memoizedState;
    queue.isInitialized = true;
  }
  var dontMutatePrevState = true;
  var update = queue.first;
  var didSkip = false;
  while (update !== null) {
    var updateExpirationTime = update.expirationTime;
    if (updateExpirationTime > renderExpirationTime) {
      // This update does not have sufficient priority. Skip it.
      var remainingExpirationTime = queue.expirationTime;
      if (remainingExpirationTime === NoWork || remainingExpirationTime > updateExpirationTime) {
        // Update the remaining expiration time.
        queue.expirationTime = updateExpirationTime;
      }
      if (!didSkip) {
        didSkip = true;
        queue.baseState = state;
      }
      // Continue to the next update.
      update = update.next;
      continue;
    }

    // This update does have sufficient priority.

    // If no previous updates were skipped, drop this update from the queue by
    // advancing the head of the list.
    if (!didSkip) {
      queue.first = update.next;
      if (queue.first === null) {
        queue.last = null;
      }
    }

    // Process the update
    var _partialState = void 0;
    if (update.isReplace) {
      state = getStateFromUpdate(update, instance, state, props);
      dontMutatePrevState = true;
    } else {
      _partialState = getStateFromUpdate(update, instance, state, props);
      if (_partialState) {
        if (dontMutatePrevState) {
          // $FlowFixMe: Idk how to type this properly.
          state = _assign({}, state, _partialState);
        } else {
          state = _assign(state, _partialState);
        }
        dontMutatePrevState = false;
      }
    }
    if (update.isForced) {
      queue.hasForceUpdate = true;
    }
    if (update.callback !== null) {
      // Append to list of callbacks.
      var _callbackList = queue.callbackList;
      if (_callbackList === null) {
        _callbackList = queue.callbackList = [];
      }
      _callbackList.push(update);
    }
    update = update.next;
  }

  if (queue.callbackList !== null) {
    workInProgress.effectTag |= Callback;
  } else if (queue.first === null && !queue.hasForceUpdate) {
    // The queue is empty. We can reset it.
    workInProgress.updateQueue = null;
  }

  if (!didSkip) {
    didSkip = true;
    queue.baseState = state;
  }

  {
    // No longer processing.
    queue.isProcessing = false;
  }

  return state;
}

function commitCallbacks(queue, context) {
  var callbackList = queue.callbackList;
  if (callbackList === null) {
    return;
  }
  // Set the list to null to make sure they don't get called more than once.
  queue.callbackList = null;
  for (var i = 0; i < callbackList.length; i++) {
    var update = callbackList[i];
    var _callback = update.callback;
    // This update might be processed again. Clear the callback so it's only
    // called once.
    update.callback = null;
    !(typeof _callback === 'function') ? invariant(false, 'Invalid argument passed as callback. Expected a function. Instead received: %s', _callback) : void 0;
    _callback.call(context);
  }
}

var fakeInternalInstance = {};
var isArray = Array.isArray;

{
  var didWarnAboutStateAssignmentForComponent = {};

  var warnOnInvalidCallback = function (callback, callerName) {
    warning(callback === null || typeof callback === 'function', '%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, callback);
  };

  // This is so gross but it's at least non-critical and can be removed if
  // it causes problems. This is meant to give a nicer error message for
  // ReactDOM15.unstable_renderSubtreeIntoContainer(reactDOM16Component,
  // ...)) which otherwise throws a "_processChildContext is not a function"
  // exception.
  Object.defineProperty(fakeInternalInstance, '_processChildContext', {
    enumerable: false,
    value: function () {
      invariant(false, '_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn\'t supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).');
    }
  });
  Object.freeze(fakeInternalInstance);
}

var ReactFiberClassComponent = function (scheduleWork, computeExpirationForFiber, memoizeProps, memoizeState) {
  // Class component state updater
  var updater = {
    isMounted: isMounted,
    enqueueSetState: function (instance, partialState, callback) {
      var fiber = get(instance);
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'setState');
      }
      var expirationTime = computeExpirationForFiber(fiber);
      var update = {
        expirationTime: expirationTime,
        partialState: partialState,
        callback: callback,
        isReplace: false,
        isForced: false,
        nextCallback: null,
        next: null
      };
      insertUpdateIntoFiber(fiber, update);
      scheduleWork(fiber, expirationTime);
    },
    enqueueReplaceState: function (instance, state, callback) {
      var fiber = get(instance);
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'replaceState');
      }
      var expirationTime = computeExpirationForFiber(fiber);
      var update = {
        expirationTime: expirationTime,
        partialState: state,
        callback: callback,
        isReplace: true,
        isForced: false,
        nextCallback: null,
        next: null
      };
      insertUpdateIntoFiber(fiber, update);
      scheduleWork(fiber, expirationTime);
    },
    enqueueForceUpdate: function (instance, callback) {
      var fiber = get(instance);
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'forceUpdate');
      }
      var expirationTime = computeExpirationForFiber(fiber);
      var update = {
        expirationTime: expirationTime,
        partialState: null,
        callback: callback,
        isReplace: false,
        isForced: true,
        nextCallback: null,
        next: null
      };
      insertUpdateIntoFiber(fiber, update);
      scheduleWork(fiber, expirationTime);
    }
  };

  function checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext) {
    if (oldProps === null || workInProgress.updateQueue !== null && workInProgress.updateQueue.hasForceUpdate) {
      // If the workInProgress already has an Update effect, return true
      return true;
    }

    var instance = workInProgress.stateNode;
    var type = workInProgress.type;
    if (typeof instance.shouldComponentUpdate === 'function') {
      startPhaseTimer(workInProgress, 'shouldComponentUpdate');
      var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, newContext);
      stopPhaseTimer();

      // Simulate an async bailout/interruption by invoking lifecycle twice.
      if (debugRenderPhaseSideEffects) {
        instance.shouldComponentUpdate(newProps, newState, newContext);
      }

      {
        warning(shouldUpdate !== undefined, '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', getComponentName(workInProgress) || 'Unknown');
      }

      return shouldUpdate;
    }

    if (type.prototype && type.prototype.isPureReactComponent) {
      return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
    }

    return true;
  }

  function checkClassInstance(workInProgress) {
    var instance = workInProgress.stateNode;
    var type = workInProgress.type;
    {
      var name = getComponentName(workInProgress);
      var renderPresent = instance.render;

      if (!renderPresent) {
        if (type.prototype && typeof type.prototype.render === 'function') {
          warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: did you accidentally return an object from the constructor?', name);
        } else {
          warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', name);
        }
      }

      var noGetInitialStateOnES6 = !instance.getInitialState || instance.getInitialState.isReactClassApproved || instance.state;
      warning(noGetInitialStateOnES6, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', name);
      var noGetDefaultPropsOnES6 = !instance.getDefaultProps || instance.getDefaultProps.isReactClassApproved;
      warning(noGetDefaultPropsOnES6, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', name);
      var noInstancePropTypes = !instance.propTypes;
      warning(noInstancePropTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', name);
      var noInstanceContextTypes = !instance.contextTypes;
      warning(noInstanceContextTypes, 'contextTypes was defined as an instance property on %s. Use a static ' + 'property to define contextTypes instead.', name);
      var noComponentShouldUpdate = typeof instance.componentShouldUpdate !== 'function';
      warning(noComponentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', name);
      if (type.prototype && type.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== 'undefined') {
        warning(false, '%s has a method called shouldComponentUpdate(). ' + 'shouldComponentUpdate should not be used when extending React.PureComponent. ' + 'Please extend React.Component if shouldComponentUpdate is used.', getComponentName(workInProgress) || 'A pure component');
      }
      var noComponentDidUnmount = typeof instance.componentDidUnmount !== 'function';
      warning(noComponentDidUnmount, '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', name);
      var noComponentDidReceiveProps = typeof instance.componentDidReceiveProps !== 'function';
      warning(noComponentDidReceiveProps, '%s has a method called ' + 'componentDidReceiveProps(). But there is no such lifecycle method. ' + 'If you meant to update the state in response to changing props, ' + 'use componentWillReceiveProps(). If you meant to fetch data or ' + 'run side-effects or mutations after React has updated the UI, use componentDidUpdate().', name);
      var noComponentWillRecieveProps = typeof instance.componentWillRecieveProps !== 'function';
      warning(noComponentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', name);
      var hasMutatedProps = instance.props !== workInProgress.pendingProps;
      warning(instance.props === undefined || !hasMutatedProps, '%s(...): When calling super() in `%s`, make sure to pass ' + "up the same props that your component's constructor was passed.", name, name);
      var noInstanceDefaultProps = !instance.defaultProps;
      warning(noInstanceDefaultProps, 'Setting defaultProps as an instance property on %s is not supported and will be ignored.' + ' Instead, define defaultProps as a static property on %s.', name, name);
    }

    var state = instance.state;
    if (state && (typeof state !== 'object' || isArray(state))) {
      warning(false, '%s.state: must be set to an object or null', getComponentName(workInProgress));
    }
    if (typeof instance.getChildContext === 'function') {
      warning(typeof workInProgress.type.childContextTypes === 'object', '%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', getComponentName(workInProgress));
    }
  }

  function resetInputPointers(workInProgress, instance) {
    instance.props = workInProgress.memoizedProps;
    instance.state = workInProgress.memoizedState;
  }

  function adoptClassInstance(workInProgress, instance) {
    instance.updater = updater;
    workInProgress.stateNode = instance;
    // The instance needs access to the fiber so that it can schedule updates
    set(instance, workInProgress);
    {
      instance._reactInternalInstance = fakeInternalInstance;
    }
  }

  function constructClassInstance(workInProgress, props) {
    var ctor = workInProgress.type;
    var unmaskedContext = getUnmaskedContext(workInProgress);
    var needsContext = isContextConsumer(workInProgress);
    var context = needsContext ? getMaskedContext(workInProgress, unmaskedContext) : emptyObject;
    var instance = new ctor(props, context);
    adoptClassInstance(workInProgress, instance);

    // Cache unmasked context so we can avoid recreating masked context unless necessary.
    // ReactFiberContext usually updates this cache but can't for newly-created instances.
    if (needsContext) {
      cacheContext(workInProgress, unmaskedContext, context);
    }

    return instance;
  }

  function callComponentWillMount(workInProgress, instance) {
    startPhaseTimer(workInProgress, 'componentWillMount');
    var oldState = instance.state;
    instance.componentWillMount();
    stopPhaseTimer();

    // Simulate an async bailout/interruption by invoking lifecycle twice.
    if (debugRenderPhaseSideEffects) {
      instance.componentWillMount();
    }

    if (oldState !== instance.state) {
      {
        warning(false, '%s.componentWillMount(): Assigning directly to this.state is ' + "deprecated (except inside a component's " + 'constructor). Use setState instead.', getComponentName(workInProgress));
      }
      updater.enqueueReplaceState(instance, instance.state, null);
    }
  }

  function callComponentWillReceiveProps(workInProgress, instance, newProps, newContext) {
    startPhaseTimer(workInProgress, 'componentWillReceiveProps');
    var oldState = instance.state;
    instance.componentWillReceiveProps(newProps, newContext);
    stopPhaseTimer();

    // Simulate an async bailout/interruption by invoking lifecycle twice.
    if (debugRenderPhaseSideEffects) {
      instance.componentWillReceiveProps(newProps, newContext);
    }

    if (instance.state !== oldState) {
      {
        var componentName = getComponentName(workInProgress) || 'Component';
        if (!didWarnAboutStateAssignmentForComponent[componentName]) {
          warning(false, '%s.componentWillReceiveProps(): Assigning directly to ' + "this.state is deprecated (except inside a component's " + 'constructor). Use setState instead.', componentName);
          didWarnAboutStateAssignmentForComponent[componentName] = true;
        }
      }
      updater.enqueueReplaceState(instance, instance.state, null);
    }
  }

  // Invokes the mount life-cycles on a previously never rendered instance.
  function mountClassInstance(workInProgress, renderExpirationTime) {
    var current = workInProgress.alternate;

    {
      checkClassInstance(workInProgress);
    }

    var instance = workInProgress.stateNode;
    var state = instance.state || null;

    var props = workInProgress.pendingProps;
    !props ? invariant(false, 'There must be pending props for an initial mount. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    var unmaskedContext = getUnmaskedContext(workInProgress);

    instance.props = props;
    instance.state = workInProgress.memoizedState = state;
    instance.refs = emptyObject;
    instance.context = getMaskedContext(workInProgress, unmaskedContext);

    if (enableAsyncSubtreeAPI && workInProgress.type != null && workInProgress.type.prototype != null && workInProgress.type.prototype.unstable_isAsyncReactComponent === true) {
      workInProgress.internalContextTag |= AsyncUpdates;
    }

    if (typeof instance.componentWillMount === 'function') {
      callComponentWillMount(workInProgress, instance);
      // If we had additional state updates during this life-cycle, let's
      // process them now.
      var updateQueue = workInProgress.updateQueue;
      if (updateQueue !== null) {
        instance.state = processUpdateQueue(current, workInProgress, updateQueue, instance, props, renderExpirationTime);
      }
    }
    if (typeof instance.componentDidMount === 'function') {
      workInProgress.effectTag |= Update;
    }
  }

  // Called on a preexisting class instance. Returns false if a resumed render
  // could be reused.
  // function resumeMountClassInstance(
  //   workInProgress: Fiber,
  //   priorityLevel: PriorityLevel,
  // ): boolean {
  //   const instance = workInProgress.stateNode;
  //   resetInputPointers(workInProgress, instance);

  //   let newState = workInProgress.memoizedState;
  //   let newProps = workInProgress.pendingProps;
  //   if (!newProps) {
  //     // If there isn't any new props, then we'll reuse the memoized props.
  //     // This could be from already completed work.
  //     newProps = workInProgress.memoizedProps;
  //     invariant(
  //       newProps != null,
  //       'There should always be pending or memoized props. This error is ' +
  //         'likely caused by a bug in React. Please file an issue.',
  //     );
  //   }
  //   const newUnmaskedContext = getUnmaskedContext(workInProgress);
  //   const newContext = getMaskedContext(workInProgress, newUnmaskedContext);

  //   const oldContext = instance.context;
  //   const oldProps = workInProgress.memoizedProps;

  //   if (
  //     typeof instance.componentWillReceiveProps === 'function' &&
  //     (oldProps !== newProps || oldContext !== newContext)
  //   ) {
  //     callComponentWillReceiveProps(
  //       workInProgress,
  //       instance,
  //       newProps,
  //       newContext,
  //     );
  //   }

  //   // Process the update queue before calling shouldComponentUpdate
  //   const updateQueue = workInProgress.updateQueue;
  //   if (updateQueue !== null) {
  //     newState = processUpdateQueue(
  //       workInProgress,
  //       updateQueue,
  //       instance,
  //       newState,
  //       newProps,
  //       priorityLevel,
  //     );
  //   }

  //   // TODO: Should we deal with a setState that happened after the last
  //   // componentWillMount and before this componentWillMount? Probably
  //   // unsupported anyway.

  //   if (
  //     !checkShouldComponentUpdate(
  //       workInProgress,
  //       workInProgress.memoizedProps,
  //       newProps,
  //       workInProgress.memoizedState,
  //       newState,
  //       newContext,
  //     )
  //   ) {
  //     // Update the existing instance's state, props, and context pointers even
  //     // though we're bailing out.
  //     instance.props = newProps;
  //     instance.state = newState;
  //     instance.context = newContext;
  //     return false;
  //   }

  //   // Update the input pointers now so that they are correct when we call
  //   // componentWillMount
  //   instance.props = newProps;
  //   instance.state = newState;
  //   instance.context = newContext;

  //   if (typeof instance.componentWillMount === 'function') {
  //     callComponentWillMount(workInProgress, instance);
  //     // componentWillMount may have called setState. Process the update queue.
  //     const newUpdateQueue = workInProgress.updateQueue;
  //     if (newUpdateQueue !== null) {
  //       newState = processUpdateQueue(
  //         workInProgress,
  //         newUpdateQueue,
  //         instance,
  //         newState,
  //         newProps,
  //         priorityLevel,
  //       );
  //     }
  //   }

  //   if (typeof instance.componentDidMount === 'function') {
  //     workInProgress.effectTag |= Update;
  //   }

  //   instance.state = newState;

  //   return true;
  // }

  // Invokes the update life-cycles and returns false if it shouldn't rerender.
  function updateClassInstance(current, workInProgress, renderExpirationTime) {
    var instance = workInProgress.stateNode;
    resetInputPointers(workInProgress, instance);

    var oldProps = workInProgress.memoizedProps;
    var newProps = workInProgress.pendingProps;
    if (!newProps) {
      // If there aren't any new props, then we'll reuse the memoized props.
      // This could be from already completed work.
      newProps = oldProps;
      !(newProps != null) ? invariant(false, 'There should always be pending or memoized props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    }
    var oldContext = instance.context;
    var newUnmaskedContext = getUnmaskedContext(workInProgress);
    var newContext = getMaskedContext(workInProgress, newUnmaskedContext);

    // Note: During these life-cycles, instance.props/instance.state are what
    // ever the previously attempted to render - not the "current". However,
    // during componentDidUpdate we pass the "current" props.

    if (typeof instance.componentWillReceiveProps === 'function' && (oldProps !== newProps || oldContext !== newContext)) {
      callComponentWillReceiveProps(workInProgress, instance, newProps, newContext);
    }

    // Compute the next state using the memoized state and the update queue.
    var oldState = workInProgress.memoizedState;
    // TODO: Previous state can be null.
    var newState = void 0;
    if (workInProgress.updateQueue !== null) {
      newState = processUpdateQueue(current, workInProgress, workInProgress.updateQueue, instance, newProps, renderExpirationTime);
    } else {
      newState = oldState;
    }

    if (oldProps === newProps && oldState === newState && !hasContextChanged() && !(workInProgress.updateQueue !== null && workInProgress.updateQueue.hasForceUpdate)) {
      // If an update was already in progress, we should schedule an Update
      // effect even though we're bailing out, so that cWU/cDU are called.
      if (typeof instance.componentDidUpdate === 'function') {
        if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
          workInProgress.effectTag |= Update;
        }
      }
      return false;
    }

    var shouldUpdate = checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext);

    if (shouldUpdate) {
      if (typeof instance.componentWillUpdate === 'function') {
        startPhaseTimer(workInProgress, 'componentWillUpdate');
        instance.componentWillUpdate(newProps, newState, newContext);
        stopPhaseTimer();

        // Simulate an async bailout/interruption by invoking lifecycle twice.
        if (debugRenderPhaseSideEffects) {
          instance.componentWillUpdate(newProps, newState, newContext);
        }
      }
      if (typeof instance.componentDidUpdate === 'function') {
        workInProgress.effectTag |= Update;
      }
    } else {
      // If an update was already in progress, we should schedule an Update
      // effect even though we're bailing out, so that cWU/cDU are called.
      if (typeof instance.componentDidUpdate === 'function') {
        if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
          workInProgress.effectTag |= Update;
        }
      }

      // If shouldComponentUpdate returned false, we should still update the
      // memoized props/state to indicate that this work can be reused.
      memoizeProps(workInProgress, newProps);
      memoizeState(workInProgress, newState);
    }

    // Update the existing instance's state, props, and context pointers even
    // if shouldComponentUpdate returns false.
    instance.props = newProps;
    instance.state = newState;
    instance.context = newContext;

    return shouldUpdate;
  }

  return {
    adoptClassInstance: adoptClassInstance,
    constructClassInstance: constructClassInstance,
    mountClassInstance: mountClassInstance,
    // resumeMountClassInstance,
    updateClassInstance: updateClassInstance
  };
};

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

var getCurrentFiberStackAddendum$1 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;


{
  var didWarnAboutMaps = false;
  /**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */
  var ownerHasKeyUseWarning = {};
  var ownerHasFunctionTypeWarning = {};

  var warnForMissingKey = function (child) {
    if (child === null || typeof child !== 'object') {
      return;
    }
    if (!child._store || child._store.validated || child.key != null) {
      return;
    }
    !(typeof child._store === 'object') ? invariant(false, 'React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    child._store.validated = true;

    var currentComponentErrorInfo = 'Each child in an array or iterator should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.' + (getCurrentFiberStackAddendum$1() || '');
    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }
    ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

    warning(false, 'Each child in an array or iterator should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.%s', getCurrentFiberStackAddendum$1());
  };
}

var isArray$1 = Array.isArray;

function coerceRef(current, element) {
  var mixedRef = element.ref;
  if (mixedRef !== null && typeof mixedRef !== 'function') {
    if (element._owner) {
      var owner = element._owner;
      var inst = void 0;
      if (owner) {
        var ownerFiber = owner;
        !(ownerFiber.tag === ClassComponent) ? invariant(false, 'Stateless function components cannot have refs.') : void 0;
        inst = ownerFiber.stateNode;
      }
      !inst ? invariant(false, 'Missing owner for string ref %s. This error is likely caused by a bug in React. Please file an issue.', mixedRef) : void 0;
      var stringRef = '' + mixedRef;
      // Check if previous string ref matches new string ref
      if (current !== null && current.ref !== null && current.ref._stringRef === stringRef) {
        return current.ref;
      }
      var ref = function (value) {
        var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
        if (value === null) {
          delete refs[stringRef];
        } else {
          refs[stringRef] = value;
        }
      };
      ref._stringRef = stringRef;
      return ref;
    } else {
      !(typeof mixedRef === 'string') ? invariant(false, 'Expected ref to be a function or a string.') : void 0;
      !element._owner ? invariant(false, 'Element ref was specified as a string (%s) but no owner was set. You may have multiple copies of React loaded. (details: https://fb.me/react-refs-must-have-owner).', mixedRef) : void 0;
    }
  }
  return mixedRef;
}

function throwOnInvalidObjectType(returnFiber, newChild) {
  if (returnFiber.type !== 'textarea') {
    var addendum = '';
    {
      addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + (getCurrentFiberStackAddendum$1() || '');
    }
    invariant(false, 'Objects are not valid as a React child (found: %s).%s', Object.prototype.toString.call(newChild) === '[object Object]' ? 'object with keys {' + Object.keys(newChild).join(', ') + '}' : newChild, addendum);
  }
}

function warnOnFunctionType() {
  var currentComponentErrorInfo = 'Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.' + (getCurrentFiberStackAddendum$1() || '');

  if (ownerHasFunctionTypeWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasFunctionTypeWarning[currentComponentErrorInfo] = true;

  warning(false, 'Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.%s', getCurrentFiberStackAddendum$1() || '');
}

// This wrapper function exists because I expect to clone the code in each path
// to be able to optimize each path individually by branching early. This needs
// a compiler or we can do it manually. Helpers that don't need this branching
// live outside of this function.
function ChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (!shouldTrackSideEffects) {
      // Noop.
      return;
    }
    // Deletions are added in reversed order so we add it to the front.
    // At this point, the return fiber's effect list is empty except for
    // deletions, so we can just append the deletion to the list. The remaining
    // effects aren't added until the complete phase. Once we implement
    // resuming, this may not be true.
    var last = returnFiber.lastEffect;
    if (last !== null) {
      last.nextEffect = childToDelete;
      returnFiber.lastEffect = childToDelete;
    } else {
      returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
    }
    childToDelete.nextEffect = null;
    childToDelete.effectTag = Deletion;
  }

  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) {
      // Noop.
      return null;
    }

    // TODO: For the shouldClone case, this could be micro-optimized a bit by
    // assuming that after the first child we've already added everything.
    var childToDelete = currentFirstChild;
    while (childToDelete !== null) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }
    return null;
  }

  function mapRemainingChildren(returnFiber, currentFirstChild) {
    // Add the remaining children to a temporary map so that we can find them by
    // keys quickly. Implicit (null) keys get added to this set with their index
    var existingChildren = new Map();

    var existingChild = currentFirstChild;
    while (existingChild !== null) {
      if (existingChild.key !== null) {
        existingChildren.set(existingChild.key, existingChild);
      } else {
        existingChildren.set(existingChild.index, existingChild);
      }
      existingChild = existingChild.sibling;
    }
    return existingChildren;
  }

  function useFiber(fiber, pendingProps, expirationTime) {
    // We currently set sibling to null and index to 0 here because it is easy
    // to forget to do before returning it. E.g. for the single child case.
    var clone = createWorkInProgress(fiber, pendingProps, expirationTime);
    clone.index = 0;
    clone.sibling = null;
    return clone;
  }

  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) {
      // Noop.
      return lastPlacedIndex;
    }
    var current = newFiber.alternate;
    if (current !== null) {
      var oldIndex = current.index;
      if (oldIndex < lastPlacedIndex) {
        // This is a move.
        newFiber.effectTag = Placement;
        return lastPlacedIndex;
      } else {
        // This item can stay in place.
        return oldIndex;
      }
    } else {
      // This is an insertion.
      newFiber.effectTag = Placement;
      return lastPlacedIndex;
    }
  }

  function placeSingleChild(newFiber) {
    // This is simpler for the single child case. We only need to do a
    // placement for inserting new children.
    if (shouldTrackSideEffects && newFiber.alternate === null) {
      newFiber.effectTag = Placement;
    }
    return newFiber;
  }

  function updateTextNode(returnFiber, current, textContent, expirationTime) {
    if (current === null || current.tag !== HostText) {
      // Insert
      var created = createFiberFromText(textContent, returnFiber.internalContextTag, expirationTime);
      created['return'] = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current, textContent, expirationTime);
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updateElement(returnFiber, current, element, expirationTime) {
    if (current !== null && current.type === element.type) {
      // Move based on index
      var existing = useFiber(current, element.props, expirationTime);
      existing.ref = coerceRef(current, element);
      existing['return'] = returnFiber;
      {
        existing._debugSource = element._source;
        existing._debugOwner = element._owner;
      }
      return existing;
    } else {
      // Insert
      var created = createFiberFromElement(element, returnFiber.internalContextTag, expirationTime);
      created.ref = coerceRef(current, element);
      created['return'] = returnFiber;
      return created;
    }
  }

  function updateCall(returnFiber, current, call, expirationTime) {
    // TODO: Should this also compare handler to determine whether to reuse?
    if (current === null || current.tag !== CallComponent) {
      // Insert
      var created = createFiberFromCall(call, returnFiber.internalContextTag, expirationTime);
      created['return'] = returnFiber;
      return created;
    } else {
      // Move based on index
      var existing = useFiber(current, call, expirationTime);
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updateReturn(returnFiber, current, returnNode, expirationTime) {
    if (current === null || current.tag !== ReturnComponent) {
      // Insert
      var created = createFiberFromReturn(returnNode, returnFiber.internalContextTag, expirationTime);
      created.type = returnNode.value;
      created['return'] = returnFiber;
      return created;
    } else {
      // Move based on index
      var existing = useFiber(current, null, expirationTime);
      existing.type = returnNode.value;
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updatePortal(returnFiber, current, portal, expirationTime) {
    if (current === null || current.tag !== HostPortal || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) {
      // Insert
      var created = createFiberFromPortal(portal, returnFiber.internalContextTag, expirationTime);
      created['return'] = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current, portal.children || [], expirationTime);
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updateFragment(returnFiber, current, fragment, expirationTime, key) {
    if (current === null || current.tag !== Fragment) {
      // Insert
      var created = createFiberFromFragment(fragment, returnFiber.internalContextTag, expirationTime, key);
      created['return'] = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current, fragment, expirationTime);
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function createChild(returnFiber, newChild, expirationTime) {
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // Text nodes don't have keys. If the previous node is implicitly keyed
      // we can continue to replace it without aborting even if it is not a text
      // node.
      var created = createFiberFromText('' + newChild, returnFiber.internalContextTag, expirationTime);
      created['return'] = returnFiber;
      return created;
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            if (newChild.type === REACT_FRAGMENT_TYPE) {
              var _created = createFiberFromFragment(newChild.props.children, returnFiber.internalContextTag, expirationTime, newChild.key);
              _created['return'] = returnFiber;
              return _created;
            } else {
              var _created2 = createFiberFromElement(newChild, returnFiber.internalContextTag, expirationTime);
              _created2.ref = coerceRef(null, newChild);
              _created2['return'] = returnFiber;
              return _created2;
            }
          }

        case REACT_CALL_TYPE:
          {
            var _created3 = createFiberFromCall(newChild, returnFiber.internalContextTag, expirationTime);
            _created3['return'] = returnFiber;
            return _created3;
          }

        case REACT_RETURN_TYPE:
          {
            var _created4 = createFiberFromReturn(newChild, returnFiber.internalContextTag, expirationTime);
            _created4.type = newChild.value;
            _created4['return'] = returnFiber;
            return _created4;
          }

        case REACT_PORTAL_TYPE:
          {
            var _created5 = createFiberFromPortal(newChild, returnFiber.internalContextTag, expirationTime);
            _created5['return'] = returnFiber;
            return _created5;
          }
      }

      if (isArray$1(newChild) || getIteratorFn(newChild)) {
        var _created6 = createFiberFromFragment(newChild, returnFiber.internalContextTag, expirationTime, null);
        _created6['return'] = returnFiber;
        return _created6;
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }

    return null;
  }

  function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
    // Update the fiber if the keys match, otherwise return null.

    var key = oldFiber !== null ? oldFiber.key : null;

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // Text nodes don't have keys. If the previous node is implicitly keyed
      // we can continue to replace it without aborting even if it is not a text
      // node.
      if (key !== null) {
        return null;
      }
      return updateTextNode(returnFiber, oldFiber, '' + newChild, expirationTime);
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            if (newChild.key === key) {
              if (newChild.type === REACT_FRAGMENT_TYPE) {
                return updateFragment(returnFiber, oldFiber, newChild.props.children, expirationTime, key);
              }
              return updateElement(returnFiber, oldFiber, newChild, expirationTime);
            } else {
              return null;
            }
          }

        case REACT_CALL_TYPE:
          {
            if (newChild.key === key) {
              return updateCall(returnFiber, oldFiber, newChild, expirationTime);
            } else {
              return null;
            }
          }

        case REACT_RETURN_TYPE:
          {
            // Returns don't have keys. If the previous node is implicitly keyed
            // we can continue to replace it without aborting even if it is not a
            // yield.
            if (key === null) {
              return updateReturn(returnFiber, oldFiber, newChild, expirationTime);
            } else {
              return null;
            }
          }

        case REACT_PORTAL_TYPE:
          {
            if (newChild.key === key) {
              return updatePortal(returnFiber, oldFiber, newChild, expirationTime);
            } else {
              return null;
            }
          }
      }

      if (isArray$1(newChild) || getIteratorFn(newChild)) {
        if (key !== null) {
          return null;
        }

        return updateFragment(returnFiber, oldFiber, newChild, expirationTime, null);
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }

    return null;
  }

  function updateFromMap(existingChildren, returnFiber, newIdx, newChild, expirationTime) {
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // Text nodes don't have keys, so we neither have to check the old nor
      // new node for the key. If both are text nodes, they match.
      var matchedFiber = existingChildren.get(newIdx) || null;
      return updateTextNode(returnFiber, matchedFiber, '' + newChild, expirationTime);
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            var _matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            if (newChild.type === REACT_FRAGMENT_TYPE) {
              return updateFragment(returnFiber, _matchedFiber, newChild.props.children, expirationTime, newChild.key);
            }
            return updateElement(returnFiber, _matchedFiber, newChild, expirationTime);
          }

        case REACT_CALL_TYPE:
          {
            var _matchedFiber2 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            return updateCall(returnFiber, _matchedFiber2, newChild, expirationTime);
          }

        case REACT_RETURN_TYPE:
          {
            // Returns don't have keys, so we neither have to check the old nor
            // new node for the key. If both are returns, they match.
            var _matchedFiber3 = existingChildren.get(newIdx) || null;
            return updateReturn(returnFiber, _matchedFiber3, newChild, expirationTime);
          }

        case REACT_PORTAL_TYPE:
          {
            var _matchedFiber4 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            return updatePortal(returnFiber, _matchedFiber4, newChild, expirationTime);
          }
      }

      if (isArray$1(newChild) || getIteratorFn(newChild)) {
        var _matchedFiber5 = existingChildren.get(newIdx) || null;
        return updateFragment(returnFiber, _matchedFiber5, newChild, expirationTime, null);
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }

    return null;
  }

  /**
   * Warns if there is a duplicate or missing key
   */
  function warnOnInvalidKey(child, knownKeys) {
    {
      if (typeof child !== 'object' || child === null) {
        return knownKeys;
      }
      switch (child.$$typeof) {
        case REACT_ELEMENT_TYPE:
        case REACT_CALL_TYPE:
        case REACT_PORTAL_TYPE:
          warnForMissingKey(child);
          var key = child.key;
          if (typeof key !== 'string') {
            break;
          }
          if (knownKeys === null) {
            knownKeys = new Set();
            knownKeys.add(key);
            break;
          }
          if (!knownKeys.has(key)) {
            knownKeys.add(key);
            break;
          }
          warning(false, 'Encountered two children with the same key, `%s`. ' + 'Keys should be unique so that components maintain their identity ' + 'across updates. Non-unique keys may cause children to be ' + 'duplicated and/or omitted — the behavior is unsupported and ' + 'could change in a future version.%s', key, getCurrentFiberStackAddendum$1());
          break;
        default:
          break;
      }
    }
    return knownKeys;
  }

  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, expirationTime) {
    // This algorithm can't optimize by searching from boths ends since we
    // don't have backpointers on fibers. I'm trying to see how far we can get
    // with that model. If it ends up not being worth the tradeoffs, we can
    // add it later.

    // Even with a two ended optimization, we'd want to optimize for the case
    // where there are few changes and brute force the comparison instead of
    // going for the Map. It'd like to explore hitting that path first in
    // forward-only mode and only go for the Map once we notice that we need
    // lots of look ahead. This doesn't handle reversal as well as two ended
    // search but that's unusual. Besides, for the two ended optimization to
    // work on Iterables, we'd need to copy the whole set.

    // In this first iteration, we'll just live with hitting the bad case
    // (adding everything to a Map) in for every insert/move.

    // If you change this code, also update reconcileChildrenIterator() which
    // uses the same algorithm.

    {
      // First, validate keys.
      var knownKeys = null;
      for (var i = 0; i < newChildren.length; i++) {
        var child = newChildren[i];
        knownKeys = warnOnInvalidKey(child, knownKeys);
      }
    }

    var resultingFirstChild = null;
    var previousNewFiber = null;

    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;
    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);
      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (oldFiber === null) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (newIdx === newChildren.length) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; newIdx < newChildren.length; newIdx++) {
        var _newFiber = createChild(returnFiber, newChildren[newIdx], expirationTime);
        if (!_newFiber) {
          continue;
        }
        lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = _newFiber;
        } else {
          previousNewFiber.sibling = _newFiber;
        }
        previousNewFiber = _newFiber;
      }
      return resultingFirstChild;
    }

    // Add all children to a key map for quick lookups.
    var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // Keep scanning and use the map to restore deleted items as moves.
    for (; newIdx < newChildren.length; newIdx++) {
      var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], expirationTime);
      if (_newFiber2) {
        if (shouldTrackSideEffects) {
          if (_newFiber2.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren['delete'](_newFiber2.key === null ? newIdx : _newFiber2.key);
          }
        }
        lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = _newFiber2;
        } else {
          previousNewFiber.sibling = _newFiber2;
        }
        previousNewFiber = _newFiber2;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    return resultingFirstChild;
  }

  function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, expirationTime) {
    // This is the same implementation as reconcileChildrenArray(),
    // but using the iterator instead.

    var iteratorFn = getIteratorFn(newChildrenIterable);
    !(typeof iteratorFn === 'function') ? invariant(false, 'An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    {
      // Warn about using Maps as children
      if (typeof newChildrenIterable.entries === 'function') {
        var possibleMap = newChildrenIterable;
        if (possibleMap.entries === iteratorFn) {
          warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', getCurrentFiberStackAddendum$1());
          didWarnAboutMaps = true;
        }
      }

      // First, validate keys.
      // We'll get a different iterator later for the main pass.
      var _newChildren = iteratorFn.call(newChildrenIterable);
      if (_newChildren) {
        var knownKeys = null;
        var _step = _newChildren.next();
        for (; !_step.done; _step = _newChildren.next()) {
          var child = _step.value;
          knownKeys = warnOnInvalidKey(child, knownKeys);
        }
      }
    }

    var newChildren = iteratorFn.call(newChildrenIterable);
    !(newChildren != null) ? invariant(false, 'An iterable object provided no iterator.') : void 0;

    var resultingFirstChild = null;
    var previousNewFiber = null;

    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;

    var step = newChildren.next();
    for (; oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      var newFiber = updateSlot(returnFiber, oldFiber, step.value, expirationTime);
      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (!oldFiber) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (step.done) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; !step.done; newIdx++, step = newChildren.next()) {
        var _newFiber3 = createChild(returnFiber, step.value, expirationTime);
        if (_newFiber3 === null) {
          continue;
        }
        lastPlacedIndex = placeChild(_newFiber3, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = _newFiber3;
        } else {
          previousNewFiber.sibling = _newFiber3;
        }
        previousNewFiber = _newFiber3;
      }
      return resultingFirstChild;
    }

    // Add all children to a key map for quick lookups.
    var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // Keep scanning and use the map to restore deleted items as moves.
    for (; !step.done; newIdx++, step = newChildren.next()) {
      var _newFiber4 = updateFromMap(existingChildren, returnFiber, newIdx, step.value, expirationTime);
      if (_newFiber4 !== null) {
        if (shouldTrackSideEffects) {
          if (_newFiber4.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren['delete'](_newFiber4.key === null ? newIdx : _newFiber4.key);
          }
        }
        lastPlacedIndex = placeChild(_newFiber4, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = _newFiber4;
        } else {
          previousNewFiber.sibling = _newFiber4;
        }
        previousNewFiber = _newFiber4;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    return resultingFirstChild;
  }

  function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, expirationTime) {
    // There's no need to check for keys on text nodes since we don't have a
    // way to define them.
    if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
      // We already have an existing node so let's just update it and delete
      // the rest.
      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
      var existing = useFiber(currentFirstChild, textContent, expirationTime);
      existing['return'] = returnFiber;
      return existing;
    }
    // The existing first child is not a text node so we need to create one
    // and delete the existing ones.
    deleteRemainingChildren(returnFiber, currentFirstChild);
    var created = createFiberFromText(textContent, returnFiber.internalContextTag, expirationTime);
    created['return'] = returnFiber;
    return created;
  }

  function reconcileSingleElement(returnFiber, currentFirstChild, element, expirationTime) {
    var key = element.key;
    var child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (child.tag === Fragment ? element.type === REACT_FRAGMENT_TYPE : child.type === element.type) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, element.type === REACT_FRAGMENT_TYPE ? element.props.children : element.props, expirationTime);
          existing.ref = coerceRef(child, element);
          existing['return'] = returnFiber;
          {
            existing._debugSource = element._source;
            existing._debugOwner = element._owner;
          }
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    if (element.type === REACT_FRAGMENT_TYPE) {
      var created = createFiberFromFragment(element.props.children, returnFiber.internalContextTag, expirationTime, element.key);
      created['return'] = returnFiber;
      return created;
    } else {
      var _created7 = createFiberFromElement(element, returnFiber.internalContextTag, expirationTime);
      _created7.ref = coerceRef(currentFirstChild, element);
      _created7['return'] = returnFiber;
      return _created7;
    }
  }

  function reconcileSingleCall(returnFiber, currentFirstChild, call, expirationTime) {
    var key = call.key;
    var child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (child.tag === CallComponent) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, call, expirationTime);
          existing['return'] = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    var created = createFiberFromCall(call, returnFiber.internalContextTag, expirationTime);
    created['return'] = returnFiber;
    return created;
  }

  function reconcileSingleReturn(returnFiber, currentFirstChild, returnNode, expirationTime) {
    // There's no need to check for keys on yields since they're stateless.
    var child = currentFirstChild;
    if (child !== null) {
      if (child.tag === ReturnComponent) {
        deleteRemainingChildren(returnFiber, child.sibling);
        var existing = useFiber(child, null, expirationTime);
        existing.type = returnNode.value;
        existing['return'] = returnFiber;
        return existing;
      } else {
        deleteRemainingChildren(returnFiber, child);
      }
    }

    var created = createFiberFromReturn(returnNode, returnFiber.internalContextTag, expirationTime);
    created.type = returnNode.value;
    created['return'] = returnFiber;
    return created;
  }

  function reconcileSinglePortal(returnFiber, currentFirstChild, portal, expirationTime) {
    var key = portal.key;
    var child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (child.tag === HostPortal && child.stateNode.containerInfo === portal.containerInfo && child.stateNode.implementation === portal.implementation) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, portal.children || [], expirationTime);
          existing['return'] = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    var created = createFiberFromPortal(portal, returnFiber.internalContextTag, expirationTime);
    created['return'] = returnFiber;
    return created;
  }

  // This API will tag the children with the side-effect of the reconciliation
  // itself. They will be added to the side-effect list as we pass through the
  // children and the parent.
  function reconcileChildFibers(returnFiber, currentFirstChild, newChild, expirationTime) {
    // This function is not recursive.
    // If the top level item is an array, we treat it as a set of children,
    // not as a fragment. Nested arrays on the other hand will be treated as
    // fragment nodes. Recursion happens at the normal flow.

    // Handle top level unkeyed fragments as if they were arrays.
    // This leads to an ambiguity between <>{[...]}</> and <>...</>.
    // We treat the ambiguous cases above the same.
    if (typeof newChild === 'object' && newChild !== null && newChild.type === REACT_FRAGMENT_TYPE && newChild.key === null) {
      newChild = newChild.props.children;
    }

    // Handle object types
    var isObject = typeof newChild === 'object' && newChild !== null;

    if (isObject) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, expirationTime));

        case REACT_CALL_TYPE:
          return placeSingleChild(reconcileSingleCall(returnFiber, currentFirstChild, newChild, expirationTime));
        case REACT_RETURN_TYPE:
          return placeSingleChild(reconcileSingleReturn(returnFiber, currentFirstChild, newChild, expirationTime));
        case REACT_PORTAL_TYPE:
          return placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, expirationTime));
      }
    }

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild, expirationTime));
    }

    if (isArray$1(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, expirationTime);
    }

    if (getIteratorFn(newChild)) {
      return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, expirationTime);
    }

    if (isObject) {
      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }
    if (typeof newChild === 'undefined') {
      // If the new child is undefined, and the return fiber is a composite
      // component, throw an error. If Fiber return types are disabled,
      // we already threw above.
      switch (returnFiber.tag) {
        case ClassComponent:
          {
            {
              var instance = returnFiber.stateNode;
              if (instance.render._isMockFunction) {
                // We allow auto-mocks to proceed as if they're returning null.
                break;
              }
            }
          }
        // Intentionally fall through to the next case, which handles both
        // functions and classes
        // eslint-disable-next-lined no-fallthrough
        case FunctionalComponent:
          {
            var Component = returnFiber.type;
            invariant(false, '%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.', Component.displayName || Component.name || 'Component');
          }
      }
    }

    // Remaining cases are all treated as empty.
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }

  return reconcileChildFibers;
}

var reconcileChildFibers = ChildReconciler(true);
var mountChildFibers = ChildReconciler(false);

function cloneChildFibers(current, workInProgress) {
  !(current === null || workInProgress.child === current.child) ? invariant(false, 'Resuming work not yet implemented.') : void 0;

  if (workInProgress.child === null) {
    return;
  }

  var currentChild = workInProgress.child;
  var newChild = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
  workInProgress.child = newChild;

  newChild['return'] = workInProgress;
  while (currentChild.sibling !== null) {
    currentChild = currentChild.sibling;
    newChild = newChild.sibling = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
    newChild['return'] = workInProgress;
  }
  newChild.sibling = null;
}

{
  var warnedAboutStatelessRefs = {};
}

var ReactFiberBeginWork = function (config, hostContext, hydrationContext, scheduleWork, computeExpirationForFiber) {
  var shouldSetTextContent = config.shouldSetTextContent,
      useSyncScheduling = config.useSyncScheduling,
      shouldDeprioritizeSubtree = config.shouldDeprioritizeSubtree;
  var pushHostContext = hostContext.pushHostContext,
      pushHostContainer = hostContext.pushHostContainer;
  var enterHydrationState = hydrationContext.enterHydrationState,
      resetHydrationState = hydrationContext.resetHydrationState,
      tryToClaimNextHydratableInstance = hydrationContext.tryToClaimNextHydratableInstance;

  var _ReactFiberClassCompo = ReactFiberClassComponent(scheduleWork, computeExpirationForFiber, memoizeProps, memoizeState),
      adoptClassInstance = _ReactFiberClassCompo.adoptClassInstance,
      constructClassInstance = _ReactFiberClassCompo.constructClassInstance,
      mountClassInstance = _ReactFiberClassCompo.mountClassInstance,
      updateClassInstance = _ReactFiberClassCompo.updateClassInstance;

  // TODO: Remove this and use reconcileChildrenAtExpirationTime directly.


  function reconcileChildren(current, workInProgress, nextChildren) {
    reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, workInProgress.expirationTime);
  }

  function reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, renderExpirationTime) {
    if (current === null) {
      // If this is a fresh new component that hasn't been rendered yet, we
      // won't update its child set by applying minimal side-effects. Instead,
      // we will add them all to the child before it gets rendered. That means
      // we can optimize this reconciliation pass by not tracking side-effects.
      workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
    } else {
      // If the current child is the same as the work in progress, it means that
      // we haven't yet started any work on these children. Therefore, we use
      // the clone algorithm to create a copy of all the current children.

      // If we had any progressed work already, that is invalid at this point so
      // let's throw it out.
      workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderExpirationTime);
    }
  }

  function updateFragment(current, workInProgress) {
    var nextChildren = workInProgress.pendingProps;
    if (hasContextChanged()) {
      // Normally we can bail out on props equality but if context has changed
      // we don't do the bailout and we have to reuse existing props instead.
      if (nextChildren === null) {
        nextChildren = workInProgress.memoizedProps;
      }
    } else if (nextChildren === null || workInProgress.memoizedProps === nextChildren) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }
    reconcileChildren(current, workInProgress, nextChildren);
    memoizeProps(workInProgress, nextChildren);
    return workInProgress.child;
  }

  function markRef(current, workInProgress) {
    var ref = workInProgress.ref;
    if (ref !== null && (!current || current.ref !== ref)) {
      // Schedule a Ref effect
      workInProgress.effectTag |= Ref;
    }
  }

  function updateFunctionalComponent(current, workInProgress) {
    var fn = workInProgress.type;
    var nextProps = workInProgress.pendingProps;

    var memoizedProps = workInProgress.memoizedProps;
    if (hasContextChanged()) {
      // Normally we can bail out on props equality but if context has changed
      // we don't do the bailout and we have to reuse existing props instead.
      if (nextProps === null) {
        nextProps = memoizedProps;
      }
    } else {
      if (nextProps === null || memoizedProps === nextProps) {
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      // TODO: consider bringing fn.shouldComponentUpdate() back.
      // It used to be here.
    }

    var unmaskedContext = getUnmaskedContext(workInProgress);
    var context = getMaskedContext(workInProgress, unmaskedContext);

    var nextChildren;

    {
      ReactCurrentOwner.current = workInProgress;
      ReactDebugCurrentFiber.setCurrentPhase('render');
      nextChildren = fn(nextProps, context);
      ReactDebugCurrentFiber.setCurrentPhase(null);
    }
    // React DevTools reads this flag.
    workInProgress.effectTag |= PerformedWork;
    reconcileChildren(current, workInProgress, nextChildren);
    memoizeProps(workInProgress, nextProps);
    return workInProgress.child;
  }

  function updateClassComponent(current, workInProgress, renderExpirationTime) {
    // Push context providers early to prevent context stack mismatches.
    // During mounting we don't know the child context yet as the instance doesn't exist.
    // We will invalidate the child context in finishClassComponent() right after rendering.
    var hasContext = pushContextProvider(workInProgress);

    var shouldUpdate = void 0;
    if (current === null) {
      if (!workInProgress.stateNode) {
        // In the initial pass we might need to construct the instance.
        constructClassInstance(workInProgress, workInProgress.pendingProps);
        mountClassInstance(workInProgress, renderExpirationTime);
        shouldUpdate = true;
      } else {
        invariant(false, 'Resuming work not yet implemented.');
        // In a resume, we'll already have an instance we can reuse.
        // shouldUpdate = resumeMountClassInstance(workInProgress, renderExpirationTime);
      }
    } else {
      shouldUpdate = updateClassInstance(current, workInProgress, renderExpirationTime);
    }
    return finishClassComponent(current, workInProgress, shouldUpdate, hasContext);
  }

  function finishClassComponent(current, workInProgress, shouldUpdate, hasContext) {
    // Refs should update even if shouldComponentUpdate returns false
    markRef(current, workInProgress);

    if (!shouldUpdate) {
      // Context providers should defer to sCU for rendering
      if (hasContext) {
        invalidateContextProvider(workInProgress, false);
      }

      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    var instance = workInProgress.stateNode;

    // Rerender
    ReactCurrentOwner.current = workInProgress;
    var nextChildren = void 0;
    {
      ReactDebugCurrentFiber.setCurrentPhase('render');
      nextChildren = instance.render();
      if (debugRenderPhaseSideEffects) {
        instance.render();
      }
      ReactDebugCurrentFiber.setCurrentPhase(null);
    }
    // React DevTools reads this flag.
    workInProgress.effectTag |= PerformedWork;
    reconcileChildren(current, workInProgress, nextChildren);
    // Memoize props and state using the values we just used to render.
    // TODO: Restructure so we never read values from the instance.
    memoizeState(workInProgress, instance.state);
    memoizeProps(workInProgress, instance.props);

    // The context might have changed so we need to recalculate it.
    if (hasContext) {
      invalidateContextProvider(workInProgress, true);
    }

    return workInProgress.child;
  }

  function pushHostRootContext(workInProgress) {
    var root = workInProgress.stateNode;
    if (root.pendingContext) {
      pushTopLevelContextObject(workInProgress, root.pendingContext, root.pendingContext !== root.context);
    } else if (root.context) {
      // Should always be set
      pushTopLevelContextObject(workInProgress, root.context, false);
    }
    pushHostContainer(workInProgress, root.containerInfo);
  }

  function updateHostRoot(current, workInProgress, renderExpirationTime) {
    pushHostRootContext(workInProgress);
    var updateQueue = workInProgress.updateQueue;
    if (updateQueue !== null) {
      var prevState = workInProgress.memoizedState;
      var state = processUpdateQueue(current, workInProgress, updateQueue, null, null, renderExpirationTime);
      if (prevState === state) {
        // If the state is the same as before, that's a bailout because we had
        // no work that expires at this time.
        resetHydrationState();
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      var element = state.element;
      var root = workInProgress.stateNode;
      if ((current === null || current.child === null) && root.hydrate && enterHydrationState(workInProgress)) {
        // If we don't have any current children this might be the first pass.
        // We always try to hydrate. If this isn't a hydration pass there won't
        // be any children to hydrate which is effectively the same thing as
        // not hydrating.

        // This is a bit of a hack. We track the host root as a placement to
        // know that we're currently in a mounting state. That way isMounted
        // works as expected. We must reset this before committing.
        // TODO: Delete this when we delete isMounted and findDOMNode.
        workInProgress.effectTag |= Placement;

        // Ensure that children mount into this root without tracking
        // side-effects. This ensures that we don't store Placement effects on
        // nodes that will be hydrated.
        workInProgress.child = mountChildFibers(workInProgress, null, element, renderExpirationTime);
      } else {
        // Otherwise reset hydration state in case we aborted and resumed another
        // root.
        resetHydrationState();
        reconcileChildren(current, workInProgress, element);
      }
      memoizeState(workInProgress, state);
      return workInProgress.child;
    }
    resetHydrationState();
    // If there is no update queue, that's a bailout because the root has no props.
    return bailoutOnAlreadyFinishedWork(current, workInProgress);
  }

  function updateHostComponent(current, workInProgress, renderExpirationTime) {
    pushHostContext(workInProgress);

    if (current === null) {
      tryToClaimNextHydratableInstance(workInProgress);
    }

    var type = workInProgress.type;
    var memoizedProps = workInProgress.memoizedProps;
    var nextProps = workInProgress.pendingProps;
    if (nextProps === null) {
      nextProps = memoizedProps;
      !(nextProps !== null) ? invariant(false, 'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    }
    var prevProps = current !== null ? current.memoizedProps : null;

    if (hasContextChanged()) {
      // Normally we can bail out on props equality but if context has changed
      // we don't do the bailout and we have to reuse existing props instead.
    } else if (nextProps === null || memoizedProps === nextProps) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    var nextChildren = nextProps.children;
    var isDirectTextChild = shouldSetTextContent(type, nextProps);

    if (isDirectTextChild) {
      // We special case a direct text child of a host node. This is a common
      // case. We won't handle it as a reified child. We will instead handle
      // this in the host environment that also have access to this prop. That
      // avoids allocating another HostText fiber and traversing it.
      nextChildren = null;
    } else if (prevProps && shouldSetTextContent(type, prevProps)) {
      // If we're switching from a direct text child to a normal child, or to
      // empty, we need to schedule the text content to be reset.
      workInProgress.effectTag |= ContentReset;
    }

    markRef(current, workInProgress);

    // Check the host config to see if the children are offscreen/hidden.
    if (renderExpirationTime !== Never && !useSyncScheduling && shouldDeprioritizeSubtree(type, nextProps)) {
      // Down-prioritize the children.
      workInProgress.expirationTime = Never;
      // Bailout and come back to this fiber later.
      return null;
    }

    reconcileChildren(current, workInProgress, nextChildren);
    memoizeProps(workInProgress, nextProps);
    return workInProgress.child;
  }

  function updateHostText(current, workInProgress) {
    if (current === null) {
      tryToClaimNextHydratableInstance(workInProgress);
    }
    var nextProps = workInProgress.pendingProps;
    if (nextProps === null) {
      nextProps = workInProgress.memoizedProps;
    }
    memoizeProps(workInProgress, nextProps);
    // Nothing to do here. This is terminal. We'll do the completion step
    // immediately after.
    return null;
  }

  function mountIndeterminateComponent(current, workInProgress, renderExpirationTime) {
    !(current === null) ? invariant(false, 'An indeterminate component should never have mounted. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    var fn = workInProgress.type;
    var props = workInProgress.pendingProps;
    var unmaskedContext = getUnmaskedContext(workInProgress);
    var context = getMaskedContext(workInProgress, unmaskedContext);

    var value;

    {
      if (fn.prototype && typeof fn.prototype.render === 'function') {
        var componentName = getComponentName(workInProgress);
        warning(false, "The <%s /> component appears to have a render method, but doesn't extend React.Component. " + 'This is likely to cause errors. Change %s to extend React.Component instead.', componentName, componentName);
      }
      ReactCurrentOwner.current = workInProgress;
      value = fn(props, context);
    }
    // React DevTools reads this flag.
    workInProgress.effectTag |= PerformedWork;

    if (typeof value === 'object' && value !== null && typeof value.render === 'function') {
      // Proceed under the assumption that this is a class instance
      workInProgress.tag = ClassComponent;

      // Push context providers early to prevent context stack mismatches.
      // During mounting we don't know the child context yet as the instance doesn't exist.
      // We will invalidate the child context in finishClassComponent() right after rendering.
      var hasContext = pushContextProvider(workInProgress);
      adoptClassInstance(workInProgress, value);
      mountClassInstance(workInProgress, renderExpirationTime);
      return finishClassComponent(current, workInProgress, true, hasContext);
    } else {
      // Proceed under the assumption that this is a functional component
      workInProgress.tag = FunctionalComponent;
      {
        var Component = workInProgress.type;

        if (Component) {
          warning(!Component.childContextTypes, '%s(...): childContextTypes cannot be defined on a functional component.', Component.displayName || Component.name || 'Component');
        }
        if (workInProgress.ref !== null) {
          var info = '';
          var ownerName = ReactDebugCurrentFiber.getCurrentFiberOwnerName();
          if (ownerName) {
            info += '\n\nCheck the render method of `' + ownerName + '`.';
          }

          var warningKey = ownerName || workInProgress._debugID || '';
          var debugSource = workInProgress._debugSource;
          if (debugSource) {
            warningKey = debugSource.fileName + ':' + debugSource.lineNumber;
          }
          if (!warnedAboutStatelessRefs[warningKey]) {
            warnedAboutStatelessRefs[warningKey] = true;
            warning(false, 'Stateless function components cannot be given refs. ' + 'Attempts to access this ref will fail.%s%s', info, ReactDebugCurrentFiber.getCurrentFiberStackAddendum());
          }
        }
      }
      reconcileChildren(current, workInProgress, value);
      memoizeProps(workInProgress, props);
      return workInProgress.child;
    }
  }

  function updateCallComponent(current, workInProgress, renderExpirationTime) {
    var nextCall = workInProgress.pendingProps;
    if (hasContextChanged()) {
      // Normally we can bail out on props equality but if context has changed
      // we don't do the bailout and we have to reuse existing props instead.
      if (nextCall === null) {
        nextCall = current && current.memoizedProps;
        !(nextCall !== null) ? invariant(false, 'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      }
    } else if (nextCall === null || workInProgress.memoizedProps === nextCall) {
      nextCall = workInProgress.memoizedProps;
      // TODO: When bailing out, we might need to return the stateNode instead
      // of the child. To check it for work.
      // return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    var nextChildren = nextCall.children;

    // The following is a fork of reconcileChildrenAtExpirationTime but using
    // stateNode to store the child.
    if (current === null) {
      workInProgress.stateNode = mountChildFibers(workInProgress, workInProgress.stateNode, nextChildren, renderExpirationTime);
    } else {
      workInProgress.stateNode = reconcileChildFibers(workInProgress, workInProgress.stateNode, nextChildren, renderExpirationTime);
    }

    memoizeProps(workInProgress, nextCall);
    // This doesn't take arbitrary time so we could synchronously just begin
    // eagerly do the work of workInProgress.child as an optimization.
    return workInProgress.stateNode;
  }

  function updatePortalComponent(current, workInProgress, renderExpirationTime) {
    pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
    var nextChildren = workInProgress.pendingProps;
    if (hasContextChanged()) {
      // Normally we can bail out on props equality but if context has changed
      // we don't do the bailout and we have to reuse existing props instead.
      if (nextChildren === null) {
        nextChildren = current && current.memoizedProps;
        !(nextChildren != null) ? invariant(false, 'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      }
    } else if (nextChildren === null || workInProgress.memoizedProps === nextChildren) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    if (current === null) {
      // Portals are special because we don't append the children during mount
      // but at commit. Therefore we need to track insertions which the normal
      // flow doesn't do during mount. This doesn't happen at the root because
      // the root always starts with a "current" with a null child.
      // TODO: Consider unifying this with how the root works.
      workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
      memoizeProps(workInProgress, nextChildren);
    } else {
      reconcileChildren(current, workInProgress, nextChildren);
      memoizeProps(workInProgress, nextChildren);
    }
    return workInProgress.child;
  }

  /*
  function reuseChildrenEffects(returnFiber : Fiber, firstChild : Fiber) {
    let child = firstChild;
    do {
      // Ensure that the first and last effect of the parent corresponds
      // to the children's first and last effect.
      if (!returnFiber.firstEffect) {
        returnFiber.firstEffect = child.firstEffect;
      }
      if (child.lastEffect) {
        if (returnFiber.lastEffect) {
          returnFiber.lastEffect.nextEffect = child.firstEffect;
        }
        returnFiber.lastEffect = child.lastEffect;
      }
    } while (child = child.sibling);
  }
  */

  function bailoutOnAlreadyFinishedWork(current, workInProgress) {
    cancelWorkTimer(workInProgress);

    // TODO: We should ideally be able to bail out early if the children have no
    // more work to do. However, since we don't have a separation of this
    // Fiber's priority and its children yet - we don't know without doing lots
    // of the same work we do anyway. Once we have that separation we can just
    // bail out here if the children has no more work at this priority level.
    // if (workInProgress.priorityOfChildren <= priorityLevel) {
    //   // If there are side-effects in these children that have not yet been
    //   // committed we need to ensure that they get properly transferred up.
    //   if (current && current.child !== workInProgress.child) {
    //     reuseChildrenEffects(workInProgress, child);
    //   }
    //   return null;
    // }

    cloneChildFibers(current, workInProgress);
    return workInProgress.child;
  }

  function bailoutOnLowPriority(current, workInProgress) {
    cancelWorkTimer(workInProgress);

    // TODO: Handle HostComponent tags here as well and call pushHostContext()?
    // See PR 8590 discussion for context
    switch (workInProgress.tag) {
      case HostRoot:
        pushHostRootContext(workInProgress);
        break;
      case ClassComponent:
        pushContextProvider(workInProgress);
        break;
      case HostPortal:
        pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
        break;
    }
    // TODO: What if this is currently in progress?
    // How can that happen? How is this not being cloned?
    return null;
  }

  // TODO: Delete memoizeProps/State and move to reconcile/bailout instead
  function memoizeProps(workInProgress, nextProps) {
    workInProgress.memoizedProps = nextProps;
  }

  function memoizeState(workInProgress, nextState) {
    workInProgress.memoizedState = nextState;
    // Don't reset the updateQueue, in case there are pending updates. Resetting
    // is handled by processUpdateQueue.
  }

  function beginWork(current, workInProgress, renderExpirationTime) {
    if (workInProgress.expirationTime === NoWork || workInProgress.expirationTime > renderExpirationTime) {
      return bailoutOnLowPriority(current, workInProgress);
    }

    switch (workInProgress.tag) {
      case IndeterminateComponent:
        return mountIndeterminateComponent(current, workInProgress, renderExpirationTime);
      case FunctionalComponent:
        return updateFunctionalComponent(current, workInProgress);
      case ClassComponent:
        return updateClassComponent(current, workInProgress, renderExpirationTime);
      case HostRoot:
        return updateHostRoot(current, workInProgress, renderExpirationTime);
      case HostComponent:
        return updateHostComponent(current, workInProgress, renderExpirationTime);
      case HostText:
        return updateHostText(current, workInProgress);
      case CallHandlerPhase:
        // This is a restart. Reset the tag to the initial phase.
        workInProgress.tag = CallComponent;
      // Intentionally fall through since this is now the same.
      case CallComponent:
        return updateCallComponent(current, workInProgress, renderExpirationTime);
      case ReturnComponent:
        // A return component is just a placeholder, we can just run through the
        // next one immediately.
        return null;
      case HostPortal:
        return updatePortalComponent(current, workInProgress, renderExpirationTime);
      case Fragment:
        return updateFragment(current, workInProgress);
      default:
        invariant(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
    }
  }

  function beginFailedWork(current, workInProgress, renderExpirationTime) {
    // Push context providers here to avoid a push/pop context mismatch.
    switch (workInProgress.tag) {
      case ClassComponent:
        pushContextProvider(workInProgress);
        break;
      case HostRoot:
        pushHostRootContext(workInProgress);
        break;
      default:
        invariant(false, 'Invalid type of work. This error is likely caused by a bug in React. Please file an issue.');
    }

    // Add an error effect so we can handle the error during the commit phase
    workInProgress.effectTag |= Err;

    // This is a weird case where we do "resume" work — work that failed on
    // our first attempt. Because we no longer have a notion of "progressed
    // deletions," reset the child to the current child to make sure we delete
    // it again. TODO: Find a better way to handle this, perhaps during a more
    // general overhaul of error handling.
    if (current === null) {
      workInProgress.child = null;
    } else if (workInProgress.child !== current.child) {
      workInProgress.child = current.child;
    }

    if (workInProgress.expirationTime === NoWork || workInProgress.expirationTime > renderExpirationTime) {
      return bailoutOnLowPriority(current, workInProgress);
    }

    // If we don't bail out, we're going be recomputing our children so we need
    // to drop our effect list.
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;

    // Unmount the current children as if the component rendered null
    var nextChildren = null;
    reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, renderExpirationTime);

    if (workInProgress.tag === ClassComponent) {
      var instance = workInProgress.stateNode;
      workInProgress.memoizedProps = instance.props;
      workInProgress.memoizedState = instance.state;
    }

    return workInProgress.child;
  }

  return {
    beginWork: beginWork,
    beginFailedWork: beginFailedWork
  };
};

var ReactFiberCompleteWork = function (config, hostContext, hydrationContext) {
  var createInstance = config.createInstance,
      createTextInstance = config.createTextInstance,
      appendInitialChild = config.appendInitialChild,
      finalizeInitialChildren = config.finalizeInitialChildren,
      prepareUpdate = config.prepareUpdate,
      mutation = config.mutation,
      persistence = config.persistence;
  var getRootHostContainer = hostContext.getRootHostContainer,
      popHostContext = hostContext.popHostContext,
      getHostContext = hostContext.getHostContext,
      popHostContainer = hostContext.popHostContainer;
  var prepareToHydrateHostInstance = hydrationContext.prepareToHydrateHostInstance,
      prepareToHydrateHostTextInstance = hydrationContext.prepareToHydrateHostTextInstance,
      popHydrationState = hydrationContext.popHydrationState;


  function markUpdate(workInProgress) {
    // Tag the fiber with an update effect. This turns a Placement into
    // an UpdateAndPlacement.
    workInProgress.effectTag |= Update;
  }

  function markRef(workInProgress) {
    workInProgress.effectTag |= Ref;
  }

  function appendAllReturns(returns, workInProgress) {
    var node = workInProgress.stateNode;
    if (node) {
      node['return'] = workInProgress;
    }
    while (node !== null) {
      if (node.tag === HostComponent || node.tag === HostText || node.tag === HostPortal) {
        invariant(false, 'A call cannot have host component children.');
      } else if (node.tag === ReturnComponent) {
        returns.push(node.type);
      } else if (node.child !== null) {
        node.child['return'] = node;
        node = node.child;
        continue;
      }
      while (node.sibling === null) {
        if (node['return'] === null || node['return'] === workInProgress) {
          return;
        }
        node = node['return'];
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
    }
  }

  function moveCallToHandlerPhase(current, workInProgress, renderExpirationTime) {
    var call = workInProgress.memoizedProps;
    !call ? invariant(false, 'Should be resolved by now. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    // First step of the call has completed. Now we need to do the second.
    // TODO: It would be nice to have a multi stage call represented by a
    // single component, or at least tail call optimize nested ones. Currently
    // that requires additional fields that we don't want to add to the fiber.
    // So this requires nested handlers.
    // Note: This doesn't mutate the alternate node. I don't think it needs to
    // since this stage is reset for every pass.
    workInProgress.tag = CallHandlerPhase;

    // Build up the returns.
    // TODO: Compare this to a generator or opaque helpers like Children.
    var returns = [];
    appendAllReturns(returns, workInProgress);
    var fn = call.handler;
    var props = call.props;
    var nextChildren = fn(props, returns);

    var currentFirstChild = current !== null ? current.child : null;
    workInProgress.child = reconcileChildFibers(workInProgress, currentFirstChild, nextChildren, renderExpirationTime);
    return workInProgress.child;
  }

  function appendAllChildren(parent, workInProgress) {
    // We only have the top Fiber that was created but we need recurse down its
    // children to find all the terminal nodes.
    var node = workInProgress.child;
    while (node !== null) {
      if (node.tag === HostComponent || node.tag === HostText) {
        appendInitialChild(parent, node.stateNode);
      } else if (node.tag === HostPortal) {
        // If we have a portal child, then we don't want to traverse
        // down its children. Instead, we'll get insertions from each child in
        // the portal directly.
      } else if (node.child !== null) {
        node.child['return'] = node;
        node = node.child;
        continue;
      }
      if (node === workInProgress) {
        return;
      }
      while (node.sibling === null) {
        if (node['return'] === null || node['return'] === workInProgress) {
          return;
        }
        node = node['return'];
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
    }
  }

  var updateHostContainer = void 0;
  var updateHostComponent = void 0;
  var updateHostText = void 0;
  if (mutation) {
    if (enableMutatingReconciler) {
      // Mutation mode
      updateHostContainer = function (workInProgress) {
        // Noop
      };
      updateHostComponent = function (current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance) {
        // TODO: Type this specific to this type of component.
        workInProgress.updateQueue = updatePayload;
        // If the update payload indicates that there is a change or if there
        // is a new ref we mark this as an update. All the work is done in commitWork.
        if (updatePayload) {
          markUpdate(workInProgress);
        }
      };
      updateHostText = function (current, workInProgress, oldText, newText) {
        // If the text differs, mark it as an update. All the work in done in commitWork.
        if (oldText !== newText) {
          markUpdate(workInProgress);
        }
      };
    } else {
      invariant(false, 'Mutating reconciler is disabled.');
    }
  } else if (persistence) {
    if (enablePersistentReconciler) {
      // Persistent host tree mode
      var cloneInstance = persistence.cloneInstance,
          createContainerChildSet = persistence.createContainerChildSet,
          appendChildToContainerChildSet = persistence.appendChildToContainerChildSet,
          finalizeContainerChildren = persistence.finalizeContainerChildren;

      // An unfortunate fork of appendAllChildren because we have two different parent types.

      var appendAllChildrenToContainer = function (containerChildSet, workInProgress) {
        // We only have the top Fiber that was created but we need recurse down its
        // children to find all the terminal nodes.
        var node = workInProgress.child;
        while (node !== null) {
          if (node.tag === HostComponent || node.tag === HostText) {
            appendChildToContainerChildSet(containerChildSet, node.stateNode);
          } else if (node.tag === HostPortal) {
            // If we have a portal child, then we don't want to traverse
            // down its children. Instead, we'll get insertions from each child in
            // the portal directly.
          } else if (node.child !== null) {
            node.child['return'] = node;
            node = node.child;
            continue;
          }
          if (node === workInProgress) {
            return;
          }
          while (node.sibling === null) {
            if (node['return'] === null || node['return'] === workInProgress) {
              return;
            }
            node = node['return'];
          }
          node.sibling['return'] = node['return'];
          node = node.sibling;
        }
      };
      updateHostContainer = function (workInProgress) {
        var portalOrRoot = workInProgress.stateNode;
        var childrenUnchanged = workInProgress.firstEffect === null;
        if (childrenUnchanged) {
          // No changes, just reuse the existing instance.
        } else {
          var container = portalOrRoot.containerInfo;
          var newChildSet = createContainerChildSet(container);
          if (finalizeContainerChildren(container, newChildSet)) {
            markUpdate(workInProgress);
          }
          portalOrRoot.pendingChildren = newChildSet;
          // If children might have changed, we have to add them all to the set.
          appendAllChildrenToContainer(newChildSet, workInProgress);
          // Schedule an update on the container to swap out the container.
          markUpdate(workInProgress);
        }
      };
      updateHostComponent = function (current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance) {
        // If there are no effects associated with this node, then none of our children had any updates.
        // This guarantees that we can reuse all of them.
        var childrenUnchanged = workInProgress.firstEffect === null;
        var currentInstance = current.stateNode;
        if (childrenUnchanged && updatePayload === null) {
          // No changes, just reuse the existing instance.
          // Note that this might release a previous clone.
          workInProgress.stateNode = currentInstance;
        } else {
          var recyclableInstance = workInProgress.stateNode;
          var newInstance = cloneInstance(currentInstance, updatePayload, type, oldProps, newProps, workInProgress, childrenUnchanged, recyclableInstance);
          if (finalizeInitialChildren(newInstance, type, newProps, rootContainerInstance)) {
            markUpdate(workInProgress);
          }
          workInProgress.stateNode = newInstance;
          if (childrenUnchanged) {
            // If there are no other effects in this tree, we need to flag this node as having one.
            // Even though we're not going to use it for anything.
            // Otherwise parents won't know that there are new children to propagate upwards.
            markUpdate(workInProgress);
          } else {
            // If children might have changed, we have to add them all to the set.
            appendAllChildren(newInstance, workInProgress);
          }
        }
      };
      updateHostText = function (current, workInProgress, oldText, newText) {
        if (oldText !== newText) {
          // If the text content differs, we'll create a new text instance for it.
          var rootContainerInstance = getRootHostContainer();
          var currentHostContext = getHostContext();
          workInProgress.stateNode = createTextInstance(newText, rootContainerInstance, currentHostContext, workInProgress);
          // We'll have to mark it as having an effect, even though we won't use the effect for anything.
          // This lets the parents know that at least one of their children has changed.
          markUpdate(workInProgress);
        }
      };
    } else {
      invariant(false, 'Persistent reconciler is disabled.');
    }
  } else {
    if (enableNoopReconciler) {
      // No host operations
      updateHostContainer = function (workInProgress) {
        // Noop
      };
      updateHostComponent = function (current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance) {
        // Noop
      };
      updateHostText = function (current, workInProgress, oldText, newText) {
        // Noop
      };
    } else {
      invariant(false, 'Noop reconciler is disabled.');
    }
  }

  function completeWork(current, workInProgress, renderExpirationTime) {
    // Get the latest props.
    var newProps = workInProgress.pendingProps;
    if (newProps === null) {
      newProps = workInProgress.memoizedProps;
    } else if (workInProgress.expirationTime !== Never || renderExpirationTime === Never) {
      // Reset the pending props, unless this was a down-prioritization.
      workInProgress.pendingProps = null;
    }

    switch (workInProgress.tag) {
      case FunctionalComponent:
        return null;
      case ClassComponent:
        {
          // We are leaving this subtree, so pop context if any.
          popContextProvider(workInProgress);
          return null;
        }
      case HostRoot:
        {
          popHostContainer(workInProgress);
          popTopLevelContextObject(workInProgress);
          var fiberRoot = workInProgress.stateNode;
          if (fiberRoot.pendingContext) {
            fiberRoot.context = fiberRoot.pendingContext;
            fiberRoot.pendingContext = null;
          }

          if (current === null || current.child === null) {
            // If we hydrated, pop so that we can delete any remaining children
            // that weren't hydrated.
            popHydrationState(workInProgress);
            // This resets the hacky state to fix isMounted before committing.
            // TODO: Delete this when we delete isMounted and findDOMNode.
            workInProgress.effectTag &= ~Placement;
          }
          updateHostContainer(workInProgress);
          return null;
        }
      case HostComponent:
        {
          popHostContext(workInProgress);
          var rootContainerInstance = getRootHostContainer();
          var type = workInProgress.type;
          if (current !== null && workInProgress.stateNode != null) {
            // If we have an alternate, that means this is an update and we need to
            // schedule a side-effect to do the updates.
            var oldProps = current.memoizedProps;
            // If we get updated because one of our children updated, we don't
            // have newProps so we'll have to reuse them.
            // TODO: Split the update API as separate for the props vs. children.
            // Even better would be if children weren't special cased at all tho.
            var instance = workInProgress.stateNode;
            var currentHostContext = getHostContext();
            var updatePayload = prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext);

            updateHostComponent(current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance);

            if (current.ref !== workInProgress.ref) {
              markRef(workInProgress);
            }
          } else {
            if (!newProps) {
              !(workInProgress.stateNode !== null) ? invariant(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
              // This can happen when we abort work.
              return null;
            }

            var _currentHostContext = getHostContext();
            // TODO: Move createInstance to beginWork and keep it on a context
            // "stack" as the parent. Then append children as we go in beginWork
            // or completeWork depending on we want to add then top->down or
            // bottom->up. Top->down is faster in IE11.
            var wasHydrated = popHydrationState(workInProgress);
            if (wasHydrated) {
              // TODO: Move this and createInstance step into the beginPhase
              // to consolidate.
              if (prepareToHydrateHostInstance(workInProgress, rootContainerInstance, _currentHostContext)) {
                // If changes to the hydrated node needs to be applied at the
                // commit-phase we mark this as such.
                markUpdate(workInProgress);
              }
            } else {
              var _instance = createInstance(type, newProps, rootContainerInstance, _currentHostContext, workInProgress);

              appendAllChildren(_instance, workInProgress);

              // Certain renderers require commit-time effects for initial mount.
              // (eg DOM renderer supports auto-focus for certain elements).
              // Make sure such renderers get scheduled for later work.
              if (finalizeInitialChildren(_instance, type, newProps, rootContainerInstance)) {
                markUpdate(workInProgress);
              }
              workInProgress.stateNode = _instance;
            }

            if (workInProgress.ref !== null) {
              // If there is a ref on a host node we need to schedule a callback
              markRef(workInProgress);
            }
          }
          return null;
        }
      case HostText:
        {
          var newText = newProps;
          if (current && workInProgress.stateNode != null) {
            var oldText = current.memoizedProps;
            // If we have an alternate, that means this is an update and we need
            // to schedule a side-effect to do the updates.
            updateHostText(current, workInProgress, oldText, newText);
          } else {
            if (typeof newText !== 'string') {
              !(workInProgress.stateNode !== null) ? invariant(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
              // This can happen when we abort work.
              return null;
            }
            var _rootContainerInstance = getRootHostContainer();
            var _currentHostContext2 = getHostContext();
            var _wasHydrated = popHydrationState(workInProgress);
            if (_wasHydrated) {
              if (prepareToHydrateHostTextInstance(workInProgress)) {
                markUpdate(workInProgress);
              }
            } else {
              workInProgress.stateNode = createTextInstance(newText, _rootContainerInstance, _currentHostContext2, workInProgress);
            }
          }
          return null;
        }
      case CallComponent:
        return moveCallToHandlerPhase(current, workInProgress, renderExpirationTime);
      case CallHandlerPhase:
        // Reset the tag to now be a first phase call.
        workInProgress.tag = CallComponent;
        return null;
      case ReturnComponent:
        // Does nothing.
        return null;
      case Fragment:
        return null;
      case HostPortal:
        popHostContainer(workInProgress);
        updateHostContainer(workInProgress);
        return null;
      // Error cases
      case IndeterminateComponent:
        invariant(false, 'An indeterminate component should have become determinate before completing. This error is likely caused by a bug in React. Please file an issue.');
      // eslint-disable-next-line no-fallthrough
      default:
        invariant(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
    }
  }

  return {
    completeWork: completeWork
  };
};

var invokeGuardedCallback$2 = ReactErrorUtils.invokeGuardedCallback;
var hasCaughtError$1 = ReactErrorUtils.hasCaughtError;
var clearCaughtError$1 = ReactErrorUtils.clearCaughtError;


var ReactFiberCommitWork = function (config, captureError) {
  var getPublicInstance = config.getPublicInstance,
      mutation = config.mutation,
      persistence = config.persistence;


  var callComponentWillUnmountWithTimer = function (current, instance) {
    startPhaseTimer(current, 'componentWillUnmount');
    instance.props = current.memoizedProps;
    instance.state = current.memoizedState;
    instance.componentWillUnmount();
    stopPhaseTimer();
  };

  // Capture errors so they don't interrupt unmounting.
  function safelyCallComponentWillUnmount(current, instance) {
    {
      invokeGuardedCallback$2(null, callComponentWillUnmountWithTimer, null, current, instance);
      if (hasCaughtError$1()) {
        var unmountError = clearCaughtError$1();
        captureError(current, unmountError);
      }
    }
  }

  function safelyDetachRef(current) {
    var ref = current.ref;
    if (ref !== null) {
      {
        invokeGuardedCallback$2(null, ref, null, null);
        if (hasCaughtError$1()) {
          var refError = clearCaughtError$1();
          captureError(current, refError);
        }
      }
    }
  }

  function commitLifeCycles(current, finishedWork) {
    switch (finishedWork.tag) {
      case ClassComponent:
        {
          var instance = finishedWork.stateNode;
          if (finishedWork.effectTag & Update) {
            if (current === null) {
              startPhaseTimer(finishedWork, 'componentDidMount');
              instance.props = finishedWork.memoizedProps;
              instance.state = finishedWork.memoizedState;
              instance.componentDidMount();
              stopPhaseTimer();
            } else {
              var prevProps = current.memoizedProps;
              var prevState = current.memoizedState;
              startPhaseTimer(finishedWork, 'componentDidUpdate');
              instance.props = finishedWork.memoizedProps;
              instance.state = finishedWork.memoizedState;
              instance.componentDidUpdate(prevProps, prevState);
              stopPhaseTimer();
            }
          }
          var updateQueue = finishedWork.updateQueue;
          if (updateQueue !== null) {
            commitCallbacks(updateQueue, instance);
          }
          return;
        }
      case HostRoot:
        {
          var _updateQueue = finishedWork.updateQueue;
          if (_updateQueue !== null) {
            var _instance = finishedWork.child !== null ? finishedWork.child.stateNode : null;
            commitCallbacks(_updateQueue, _instance);
          }
          return;
        }
      case HostComponent:
        {
          var _instance2 = finishedWork.stateNode;

          // Renderers may schedule work to be done after host components are mounted
          // (eg DOM renderer may schedule auto-focus for inputs and form controls).
          // These effects should only be committed when components are first mounted,
          // aka when there is no current/alternate.
          if (current === null && finishedWork.effectTag & Update) {
            var type = finishedWork.type;
            var props = finishedWork.memoizedProps;
            commitMount(_instance2, type, props, finishedWork);
          }

          return;
        }
      case HostText:
        {
          // We have no life-cycles associated with text.
          return;
        }
      case HostPortal:
        {
          // We have no life-cycles associated with portals.
          return;
        }
      default:
        {
          invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
        }
    }
  }

  function commitAttachRef(finishedWork) {
    var ref = finishedWork.ref;
    if (ref !== null) {
      var instance = finishedWork.stateNode;
      switch (finishedWork.tag) {
        case HostComponent:
          ref(getPublicInstance(instance));
          break;
        default:
          ref(instance);
      }
    }
  }

  function commitDetachRef(current) {
    var currentRef = current.ref;
    if (currentRef !== null) {
      currentRef(null);
    }
  }

  // User-originating errors (lifecycles and refs) should not interrupt
  // deletion, so don't let them throw. Host-originating errors should
  // interrupt deletion, so it's okay
  function commitUnmount(current) {
    if (typeof onCommitUnmount === 'function') {
      onCommitUnmount(current);
    }

    switch (current.tag) {
      case ClassComponent:
        {
          safelyDetachRef(current);
          var instance = current.stateNode;
          if (typeof instance.componentWillUnmount === 'function') {
            safelyCallComponentWillUnmount(current, instance);
          }
          return;
        }
      case HostComponent:
        {
          safelyDetachRef(current);
          return;
        }
      case CallComponent:
        {
          commitNestedUnmounts(current.stateNode);
          return;
        }
      case HostPortal:
        {
          // TODO: this is recursive.
          // We are also not using this parent because
          // the portal will get pushed immediately.
          if (enableMutatingReconciler && mutation) {
            unmountHostComponents(current);
          } else if (enablePersistentReconciler && persistence) {
            emptyPortalContainer(current);
          }
          return;
        }
    }
  }

  function commitNestedUnmounts(root) {
    // While we're inside a removed host node we don't want to call
    // removeChild on the inner nodes because they're removed by the top
    // call anyway. We also want to call componentWillUnmount on all
    // composites before this host node is removed from the tree. Therefore
    var node = root;
    while (true) {
      commitUnmount(node);
      // Visit children because they may contain more composite or host nodes.
      // Skip portals because commitUnmount() currently visits them recursively.
      if (node.child !== null && (
      // If we use mutation we drill down into portals using commitUnmount above.
      // If we don't use mutation we drill down into portals here instead.
      !mutation || node.tag !== HostPortal)) {
        node.child['return'] = node;
        node = node.child;
        continue;
      }
      if (node === root) {
        return;
      }
      while (node.sibling === null) {
        if (node['return'] === null || node['return'] === root) {
          return;
        }
        node = node['return'];
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
    }
  }

  function detachFiber(current) {
    // Cut off the return pointers to disconnect it from the tree. Ideally, we
    // should clear the child pointer of the parent alternate to let this
    // get GC:ed but we don't know which for sure which parent is the current
    // one so we'll settle for GC:ing the subtree of this child. This child
    // itself will be GC:ed when the parent updates the next time.
    current['return'] = null;
    current.child = null;
    if (current.alternate) {
      current.alternate.child = null;
      current.alternate['return'] = null;
    }
  }

  if (!mutation) {
    var commitContainer = void 0;
    if (persistence) {
      var replaceContainerChildren = persistence.replaceContainerChildren,
          createContainerChildSet = persistence.createContainerChildSet;

      var emptyPortalContainer = function (current) {
        var portal = current.stateNode;
        var containerInfo = portal.containerInfo;

        var emptyChildSet = createContainerChildSet(containerInfo);
        replaceContainerChildren(containerInfo, emptyChildSet);
      };
      commitContainer = function (finishedWork) {
        switch (finishedWork.tag) {
          case ClassComponent:
            {
              return;
            }
          case HostComponent:
            {
              return;
            }
          case HostText:
            {
              return;
            }
          case HostRoot:
          case HostPortal:
            {
              var portalOrRoot = finishedWork.stateNode;
              var containerInfo = portalOrRoot.containerInfo,
                  _pendingChildren = portalOrRoot.pendingChildren;

              replaceContainerChildren(containerInfo, _pendingChildren);
              return;
            }
          default:
            {
              invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
            }
        }
      };
    } else {
      commitContainer = function (finishedWork) {
        // Noop
      };
    }
    if (enablePersistentReconciler || enableNoopReconciler) {
      return {
        commitResetTextContent: function (finishedWork) {},
        commitPlacement: function (finishedWork) {},
        commitDeletion: function (current) {
          // Detach refs and call componentWillUnmount() on the whole subtree.
          commitNestedUnmounts(current);
          detachFiber(current);
        },
        commitWork: function (current, finishedWork) {
          commitContainer(finishedWork);
        },

        commitLifeCycles: commitLifeCycles,
        commitAttachRef: commitAttachRef,
        commitDetachRef: commitDetachRef
      };
    } else if (persistence) {
      invariant(false, 'Persistent reconciler is disabled.');
    } else {
      invariant(false, 'Noop reconciler is disabled.');
    }
  }
  var commitMount = mutation.commitMount,
      commitUpdate = mutation.commitUpdate,
      resetTextContent = mutation.resetTextContent,
      commitTextUpdate = mutation.commitTextUpdate,
      appendChild = mutation.appendChild,
      appendChildToContainer = mutation.appendChildToContainer,
      insertBefore = mutation.insertBefore,
      insertInContainerBefore = mutation.insertInContainerBefore,
      removeChild = mutation.removeChild,
      removeChildFromContainer = mutation.removeChildFromContainer;


  function getHostParentFiber(fiber) {
    var parent = fiber['return'];
    while (parent !== null) {
      if (isHostParent(parent)) {
        return parent;
      }
      parent = parent['return'];
    }
    invariant(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.');
  }

  function isHostParent(fiber) {
    return fiber.tag === HostComponent || fiber.tag === HostRoot || fiber.tag === HostPortal;
  }

  function getHostSibling(fiber) {
    // We're going to search forward into the tree until we find a sibling host
    // node. Unfortunately, if multiple insertions are done in a row we have to
    // search past them. This leads to exponential search for the next sibling.
    var node = fiber;
    siblings: while (true) {
      // If we didn't find anything, let's try the next sibling.
      while (node.sibling === null) {
        if (node['return'] === null || isHostParent(node['return'])) {
          // If we pop out of the root or hit the parent the fiber we are the
          // last sibling.
          return null;
        }
        node = node['return'];
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
      while (node.tag !== HostComponent && node.tag !== HostText) {
        // If it is not host node and, we might have a host node inside it.
        // Try to search down until we find one.
        if (node.effectTag & Placement) {
          // If we don't have a child, try the siblings instead.
          continue siblings;
        }
        // If we don't have a child, try the siblings instead.
        // We also skip portals because they are not part of this host tree.
        if (node.child === null || node.tag === HostPortal) {
          continue siblings;
        } else {
          node.child['return'] = node;
          node = node.child;
        }
      }
      // Check if this host node is stable or about to be placed.
      if (!(node.effectTag & Placement)) {
        // Found it!
        return node.stateNode;
      }
    }
  }

  function commitPlacement(finishedWork) {
    // Recursively insert all host nodes into the parent.
    var parentFiber = getHostParentFiber(finishedWork);
    var parent = void 0;
    var isContainer = void 0;
    switch (parentFiber.tag) {
      case HostComponent:
        parent = parentFiber.stateNode;
        isContainer = false;
        break;
      case HostRoot:
        parent = parentFiber.stateNode.containerInfo;
        isContainer = true;
        break;
      case HostPortal:
        parent = parentFiber.stateNode.containerInfo;
        isContainer = true;
        break;
      default:
        invariant(false, 'Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.');
    }
    if (parentFiber.effectTag & ContentReset) {
      // Reset the text content of the parent before doing any insertions
      resetTextContent(parent);
      // Clear ContentReset from the effect tag
      parentFiber.effectTag &= ~ContentReset;
    }

    var before = getHostSibling(finishedWork);
    // We only have the top Fiber that was inserted but we need recurse down its
    // children to find all the terminal nodes.
    var node = finishedWork;
    while (true) {
      if (node.tag === HostComponent || node.tag === HostText) {
        if (before) {
          if (isContainer) {
            insertInContainerBefore(parent, node.stateNode, before);
          } else {
            insertBefore(parent, node.stateNode, before);
          }
        } else {
          if (isContainer) {
            appendChildToContainer(parent, node.stateNode);
          } else {
            appendChild(parent, node.stateNode);
          }
        }
      } else if (node.tag === HostPortal) {
        // If the insertion itself is a portal, then we don't want to traverse
        // down its children. Instead, we'll get insertions from each child in
        // the portal directly.
      } else if (node.child !== null) {
        node.child['return'] = node;
        node = node.child;
        continue;
      }
      if (node === finishedWork) {
        return;
      }
      while (node.sibling === null) {
        if (node['return'] === null || node['return'] === finishedWork) {
          return;
        }
        node = node['return'];
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
    }
  }

  function unmountHostComponents(current) {
    // We only have the top Fiber that was inserted but we need recurse down its
    var node = current;

    // Each iteration, currentParent is populated with node's host parent if not
    // currentParentIsValid.
    var currentParentIsValid = false;
    var currentParent = void 0;
    var currentParentIsContainer = void 0;

    while (true) {
      if (!currentParentIsValid) {
        var parent = node['return'];
        findParent: while (true) {
          !(parent !== null) ? invariant(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          switch (parent.tag) {
            case HostComponent:
              currentParent = parent.stateNode;
              currentParentIsContainer = false;
              break findParent;
            case HostRoot:
              currentParent = parent.stateNode.containerInfo;
              currentParentIsContainer = true;
              break findParent;
            case HostPortal:
              currentParent = parent.stateNode.containerInfo;
              currentParentIsContainer = true;
              break findParent;
          }
          parent = parent['return'];
        }
        currentParentIsValid = true;
      }

      if (node.tag === HostComponent || node.tag === HostText) {
        commitNestedUnmounts(node);
        // After all the children have unmounted, it is now safe to remove the
        // node from the tree.
        if (currentParentIsContainer) {
          removeChildFromContainer(currentParent, node.stateNode);
        } else {
          removeChild(currentParent, node.stateNode);
        }
        // Don't visit children because we already visited them.
      } else if (node.tag === HostPortal) {
        // When we go into a portal, it becomes the parent to remove from.
        // We will reassign it back when we pop the portal on the way up.
        currentParent = node.stateNode.containerInfo;
        // Visit children because portals might contain host components.
        if (node.child !== null) {
          node.child['return'] = node;
          node = node.child;
          continue;
        }
      } else {
        commitUnmount(node);
        // Visit children because we may find more host components below.
        if (node.child !== null) {
          node.child['return'] = node;
          node = node.child;
          continue;
        }
      }
      if (node === current) {
        return;
      }
      while (node.sibling === null) {
        if (node['return'] === null || node['return'] === current) {
          return;
        }
        node = node['return'];
        if (node.tag === HostPortal) {
          // When we go out of the portal, we need to restore the parent.
          // Since we don't keep a stack of them, we will search for it.
          currentParentIsValid = false;
        }
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
    }
  }

  function commitDeletion(current) {
    // Recursively delete all host nodes from the parent.
    // Detach refs and call componentWillUnmount() on the whole subtree.
    unmountHostComponents(current);
    detachFiber(current);
  }

  function commitWork(current, finishedWork) {
    switch (finishedWork.tag) {
      case ClassComponent:
        {
          return;
        }
      case HostComponent:
        {
          var instance = finishedWork.stateNode;
          if (instance != null) {
            // Commit the work prepared earlier.
            var newProps = finishedWork.memoizedProps;
            // For hydration we reuse the update path but we treat the oldProps
            // as the newProps. The updatePayload will contain the real change in
            // this case.
            var oldProps = current !== null ? current.memoizedProps : newProps;
            var type = finishedWork.type;
            // TODO: Type the updateQueue to be specific to host components.
            var updatePayload = finishedWork.updateQueue;
            finishedWork.updateQueue = null;
            if (updatePayload !== null) {
              commitUpdate(instance, updatePayload, type, oldProps, newProps, finishedWork);
            }
          }
          return;
        }
      case HostText:
        {
          !(finishedWork.stateNode !== null) ? invariant(false, 'This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          var textInstance = finishedWork.stateNode;
          var newText = finishedWork.memoizedProps;
          // For hydration we reuse the update path but we treat the oldProps
          // as the newProps. The updatePayload will contain the real change in
          // this case.
          var oldText = current !== null ? current.memoizedProps : newText;
          commitTextUpdate(textInstance, oldText, newText);
          return;
        }
      case HostRoot:
        {
          return;
        }
      default:
        {
          invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
        }
    }
  }

  function commitResetTextContent(current) {
    resetTextContent(current.stateNode);
  }

  if (enableMutatingReconciler) {
    return {
      commitResetTextContent: commitResetTextContent,
      commitPlacement: commitPlacement,
      commitDeletion: commitDeletion,
      commitWork: commitWork,
      commitLifeCycles: commitLifeCycles,
      commitAttachRef: commitAttachRef,
      commitDetachRef: commitDetachRef
    };
  } else {
    invariant(false, 'Mutating reconciler is disabled.');
  }
};

var NO_CONTEXT = {};

var ReactFiberHostContext = function (config) {
  var getChildHostContext = config.getChildHostContext,
      getRootHostContext = config.getRootHostContext;


  var contextStackCursor = createCursor(NO_CONTEXT);
  var contextFiberStackCursor = createCursor(NO_CONTEXT);
  var rootInstanceStackCursor = createCursor(NO_CONTEXT);

  function requiredContext(c) {
    !(c !== NO_CONTEXT) ? invariant(false, 'Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    return c;
  }

  function getRootHostContainer() {
    var rootInstance = requiredContext(rootInstanceStackCursor.current);
    return rootInstance;
  }

  function pushHostContainer(fiber, nextRootInstance) {
    // Push current root instance onto the stack;
    // This allows us to reset root when portals are popped.
    push(rootInstanceStackCursor, nextRootInstance, fiber);

    var nextRootContext = getRootHostContext(nextRootInstance);

    // Track the context and the Fiber that provided it.
    // This enables us to pop only Fibers that provide unique contexts.
    push(contextFiberStackCursor, fiber, fiber);
    push(contextStackCursor, nextRootContext, fiber);
  }

  function popHostContainer(fiber) {
    pop(contextStackCursor, fiber);
    pop(contextFiberStackCursor, fiber);
    pop(rootInstanceStackCursor, fiber);
  }

  function getHostContext() {
    var context = requiredContext(contextStackCursor.current);
    return context;
  }

  function pushHostContext(fiber) {
    var rootInstance = requiredContext(rootInstanceStackCursor.current);
    var context = requiredContext(contextStackCursor.current);
    var nextContext = getChildHostContext(context, fiber.type, rootInstance);

    // Don't push this Fiber's context unless it's unique.
    if (context === nextContext) {
      return;
    }

    // Track the context and the Fiber that provided it.
    // This enables us to pop only Fibers that provide unique contexts.
    push(contextFiberStackCursor, fiber, fiber);
    push(contextStackCursor, nextContext, fiber);
  }

  function popHostContext(fiber) {
    // Do not pop unless this Fiber provided the current context.
    // pushHostContext() only pushes Fibers that provide unique contexts.
    if (contextFiberStackCursor.current !== fiber) {
      return;
    }

    pop(contextStackCursor, fiber);
    pop(contextFiberStackCursor, fiber);
  }

  function resetHostContainer() {
    contextStackCursor.current = NO_CONTEXT;
    rootInstanceStackCursor.current = NO_CONTEXT;
  }

  return {
    getHostContext: getHostContext,
    getRootHostContainer: getRootHostContainer,
    popHostContainer: popHostContainer,
    popHostContext: popHostContext,
    pushHostContainer: pushHostContainer,
    pushHostContext: pushHostContext,
    resetHostContainer: resetHostContainer
  };
};

var ReactFiberHydrationContext = function (config) {
  var shouldSetTextContent = config.shouldSetTextContent,
      hydration = config.hydration;

  // If this doesn't have hydration mode.

  if (!hydration) {
    return {
      enterHydrationState: function () {
        return false;
      },
      resetHydrationState: function () {},
      tryToClaimNextHydratableInstance: function () {},
      prepareToHydrateHostInstance: function () {
        invariant(false, 'Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
      },
      prepareToHydrateHostTextInstance: function () {
        invariant(false, 'Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
      },
      popHydrationState: function (fiber) {
        return false;
      }
    };
  }

  var canHydrateInstance = hydration.canHydrateInstance,
      canHydrateTextInstance = hydration.canHydrateTextInstance,
      getNextHydratableSibling = hydration.getNextHydratableSibling,
      getFirstHydratableChild = hydration.getFirstHydratableChild,
      hydrateInstance = hydration.hydrateInstance,
      hydrateTextInstance = hydration.hydrateTextInstance,
      didNotMatchHydratedContainerTextInstance = hydration.didNotMatchHydratedContainerTextInstance,
      didNotMatchHydratedTextInstance = hydration.didNotMatchHydratedTextInstance,
      didNotHydrateContainerInstance = hydration.didNotHydrateContainerInstance,
      didNotHydrateInstance = hydration.didNotHydrateInstance,
      didNotFindHydratableContainerInstance = hydration.didNotFindHydratableContainerInstance,
      didNotFindHydratableContainerTextInstance = hydration.didNotFindHydratableContainerTextInstance,
      didNotFindHydratableInstance = hydration.didNotFindHydratableInstance,
      didNotFindHydratableTextInstance = hydration.didNotFindHydratableTextInstance;

  // The deepest Fiber on the stack involved in a hydration context.
  // This may have been an insertion or a hydration.

  var hydrationParentFiber = null;
  var nextHydratableInstance = null;
  var isHydrating = false;

  function enterHydrationState(fiber) {
    var parentInstance = fiber.stateNode.containerInfo;
    nextHydratableInstance = getFirstHydratableChild(parentInstance);
    hydrationParentFiber = fiber;
    isHydrating = true;
    return true;
  }

  function deleteHydratableInstance(returnFiber, instance) {
    {
      switch (returnFiber.tag) {
        case HostRoot:
          didNotHydrateContainerInstance(returnFiber.stateNode.containerInfo, instance);
          break;
        case HostComponent:
          didNotHydrateInstance(returnFiber.type, returnFiber.memoizedProps, returnFiber.stateNode, instance);
          break;
      }
    }

    var childToDelete = createFiberFromHostInstanceForDeletion();
    childToDelete.stateNode = instance;
    childToDelete['return'] = returnFiber;
    childToDelete.effectTag = Deletion;

    // This might seem like it belongs on progressedFirstDeletion. However,
    // these children are not part of the reconciliation list of children.
    // Even if we abort and rereconcile the children, that will try to hydrate
    // again and the nodes are still in the host tree so these will be
    // recreated.
    if (returnFiber.lastEffect !== null) {
      returnFiber.lastEffect.nextEffect = childToDelete;
      returnFiber.lastEffect = childToDelete;
    } else {
      returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
    }
  }

  function insertNonHydratedInstance(returnFiber, fiber) {
    fiber.effectTag |= Placement;
    {
      switch (returnFiber.tag) {
        case HostRoot:
          {
            var parentContainer = returnFiber.stateNode.containerInfo;
            switch (fiber.tag) {
              case HostComponent:
                var type = fiber.type;
                var props = fiber.pendingProps;
                didNotFindHydratableContainerInstance(parentContainer, type, props);
                break;
              case HostText:
                var text = fiber.pendingProps;
                didNotFindHydratableContainerTextInstance(parentContainer, text);
                break;
            }
            break;
          }
        case HostComponent:
          {
            var parentType = returnFiber.type;
            var parentProps = returnFiber.memoizedProps;
            var parentInstance = returnFiber.stateNode;
            switch (fiber.tag) {
              case HostComponent:
                var _type = fiber.type;
                var _props = fiber.pendingProps;
                didNotFindHydratableInstance(parentType, parentProps, parentInstance, _type, _props);
                break;
              case HostText:
                var _text = fiber.pendingProps;
                didNotFindHydratableTextInstance(parentType, parentProps, parentInstance, _text);
                break;
            }
            break;
          }
        default:
          return;
      }
    }
  }

  function tryHydrate(fiber, nextInstance) {
    switch (fiber.tag) {
      case HostComponent:
        {
          var type = fiber.type;
          var props = fiber.pendingProps;
          var instance = canHydrateInstance(nextInstance, type, props);
          if (instance !== null) {
            fiber.stateNode = instance;
            return true;
          }
          return false;
        }
      case HostText:
        {
          var text = fiber.pendingProps;
          var textInstance = canHydrateTextInstance(nextInstance, text);
          if (textInstance !== null) {
            fiber.stateNode = textInstance;
            return true;
          }
          return false;
        }
      default:
        return false;
    }
  }

  function tryToClaimNextHydratableInstance(fiber) {
    if (!isHydrating) {
      return;
    }
    var nextInstance = nextHydratableInstance;
    if (!nextInstance) {
      // Nothing to hydrate. Make it an insertion.
      insertNonHydratedInstance(hydrationParentFiber, fiber);
      isHydrating = false;
      hydrationParentFiber = fiber;
      return;
    }
    if (!tryHydrate(fiber, nextInstance)) {
      // If we can't hydrate this instance let's try the next one.
      // We use this as a heuristic. It's based on intuition and not data so it
      // might be flawed or unnecessary.
      nextInstance = getNextHydratableSibling(nextInstance);
      if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
        // Nothing to hydrate. Make it an insertion.
        insertNonHydratedInstance(hydrationParentFiber, fiber);
        isHydrating = false;
        hydrationParentFiber = fiber;
        return;
      }
      // We matched the next one, we'll now assume that the first one was
      // superfluous and we'll delete it. Since we can't eagerly delete it
      // we'll have to schedule a deletion. To do that, this node needs a dummy
      // fiber associated with it.
      deleteHydratableInstance(hydrationParentFiber, nextHydratableInstance);
    }
    hydrationParentFiber = fiber;
    nextHydratableInstance = getFirstHydratableChild(nextInstance);
  }

  function prepareToHydrateHostInstance(fiber, rootContainerInstance, hostContext) {
    var instance = fiber.stateNode;
    var updatePayload = hydrateInstance(instance, fiber.type, fiber.memoizedProps, rootContainerInstance, hostContext, fiber);
    // TODO: Type this specific to this type of component.
    fiber.updateQueue = updatePayload;
    // If the update payload indicates that there is a change or if there
    // is a new ref we mark this as an update.
    if (updatePayload !== null) {
      return true;
    }
    return false;
  }

  function prepareToHydrateHostTextInstance(fiber) {
    var textInstance = fiber.stateNode;
    var textContent = fiber.memoizedProps;
    var shouldUpdate = hydrateTextInstance(textInstance, textContent, fiber);
    {
      if (shouldUpdate) {
        // We assume that prepareToHydrateHostTextInstance is called in a context where the
        // hydration parent is the parent host component of this host text.
        var returnFiber = hydrationParentFiber;
        if (returnFiber !== null) {
          switch (returnFiber.tag) {
            case HostRoot:
              {
                var parentContainer = returnFiber.stateNode.containerInfo;
                didNotMatchHydratedContainerTextInstance(parentContainer, textInstance, textContent);
                break;
              }
            case HostComponent:
              {
                var parentType = returnFiber.type;
                var parentProps = returnFiber.memoizedProps;
                var parentInstance = returnFiber.stateNode;
                didNotMatchHydratedTextInstance(parentType, parentProps, parentInstance, textInstance, textContent);
                break;
              }
          }
        }
      }
    }
    return shouldUpdate;
  }

  function popToNextHostParent(fiber) {
    var parent = fiber['return'];
    while (parent !== null && parent.tag !== HostComponent && parent.tag !== HostRoot) {
      parent = parent['return'];
    }
    hydrationParentFiber = parent;
  }

  function popHydrationState(fiber) {
    if (fiber !== hydrationParentFiber) {
      // We're deeper than the current hydration context, inside an inserted
      // tree.
      return false;
    }
    if (!isHydrating) {
      // If we're not currently hydrating but we're in a hydration context, then
      // we were an insertion and now need to pop up reenter hydration of our
      // siblings.
      popToNextHostParent(fiber);
      isHydrating = true;
      return false;
    }

    var type = fiber.type;

    // If we have any remaining hydratable nodes, we need to delete them now.
    // We only do this deeper than head and body since they tend to have random
    // other nodes in them. We also ignore components with pure text content in
    // side of them.
    // TODO: Better heuristic.
    if (fiber.tag !== HostComponent || type !== 'head' && type !== 'body' && !shouldSetTextContent(type, fiber.memoizedProps)) {
      var nextInstance = nextHydratableInstance;
      while (nextInstance) {
        deleteHydratableInstance(fiber, nextInstance);
        nextInstance = getNextHydratableSibling(nextInstance);
      }
    }

    popToNextHostParent(fiber);
    nextHydratableInstance = hydrationParentFiber ? getNextHydratableSibling(fiber.stateNode) : null;
    return true;
  }

  function resetHydrationState() {
    hydrationParentFiber = null;
    nextHydratableInstance = null;
    isHydrating = false;
  }

  return {
    enterHydrationState: enterHydrationState,
    resetHydrationState: resetHydrationState,
    tryToClaimNextHydratableInstance: tryToClaimNextHydratableInstance,
    prepareToHydrateHostInstance: prepareToHydrateHostInstance,
    prepareToHydrateHostTextInstance: prepareToHydrateHostTextInstance,
    popHydrationState: popHydrationState
  };
};

// This lets us hook into Fiber to debug what it's doing.
// See https://github.com/facebook/react/pull/8033.
// This is not part of the public API, not even for React DevTools.
// You may only inject a debugTool if you work on React Fiber itself.
var ReactFiberInstrumentation = {
  debugTool: null
};

var ReactFiberInstrumentation_1 = ReactFiberInstrumentation;

var defaultShowDialog = function (capturedError) {
  return true;
};

var showDialog = defaultShowDialog;

function logCapturedError(capturedError) {
  var logError = showDialog(capturedError);

  // Allow injected showDialog() to prevent default console.error logging.
  // This enables renderers like ReactNative to better manage redbox behavior.
  if (logError === false) {
    return;
  }

  var error = capturedError.error;
  var suppressLogging = error && error.suppressReactErrorLogging;
  if (suppressLogging) {
    return;
  }

  {
    var componentName = capturedError.componentName,
        componentStack = capturedError.componentStack,
        errorBoundaryName = capturedError.errorBoundaryName,
        errorBoundaryFound = capturedError.errorBoundaryFound,
        willRetry = capturedError.willRetry;


    var componentNameMessage = componentName ? 'The above error occurred in the <' + componentName + '> component:' : 'The above error occurred in one of your React components:';

    var errorBoundaryMessage = void 0;
    // errorBoundaryFound check is sufficient; errorBoundaryName check is to satisfy Flow.
    if (errorBoundaryFound && errorBoundaryName) {
      if (willRetry) {
        errorBoundaryMessage = 'React will try to recreate this component tree from scratch ' + ('using the error boundary you provided, ' + errorBoundaryName + '.');
      } else {
        errorBoundaryMessage = 'This error was initially handled by the error boundary ' + errorBoundaryName + '.\n' + 'Recreating the tree from scratch failed so React will unmount the tree.';
      }
    } else {
      errorBoundaryMessage = 'Consider adding an error boundary to your tree to customize error handling behavior.\n' + 'Visit https://fb.me/react-error-boundaries to learn more about error boundaries.';
    }
    var combinedMessage = '' + componentNameMessage + componentStack + '\n\n' + ('' + errorBoundaryMessage);

    // In development, we provide our own message with just the component stack.
    // We don't include the original error message and JS stack because the browser
    // has already printed it. Even if the application swallows the error, it is still
    // displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.
    console.error(combinedMessage);
  }
}

var invokeGuardedCallback$1 = ReactErrorUtils.invokeGuardedCallback;
var hasCaughtError = ReactErrorUtils.hasCaughtError;
var clearCaughtError = ReactErrorUtils.clearCaughtError;


{
  var didWarnAboutStateTransition = false;
  var didWarnSetStateChildContext = false;
  var didWarnStateUpdateForUnmountedComponent = {};

  var warnAboutUpdateOnUnmounted = function (fiber) {
    var componentName = getComponentName(fiber) || 'ReactClass';
    if (didWarnStateUpdateForUnmountedComponent[componentName]) {
      return;
    }
    warning(false, 'Can only update a mounted or mounting ' + 'component. This usually means you called setState, replaceState, ' + 'or forceUpdate on an unmounted component. This is a no-op.\n\nPlease ' + 'check the code for the %s component.', componentName);
    didWarnStateUpdateForUnmountedComponent[componentName] = true;
  };

  var warnAboutInvalidUpdates = function (instance) {
    switch (ReactDebugCurrentFiber.phase) {
      case 'getChildContext':
        if (didWarnSetStateChildContext) {
          return;
        }
        warning(false, 'setState(...): Cannot call setState() inside getChildContext()');
        didWarnSetStateChildContext = true;
        break;
      case 'render':
        if (didWarnAboutStateTransition) {
          return;
        }
        warning(false, 'Cannot update during an existing state transition (such as within ' + "`render` or another component's constructor). Render methods should " + 'be a pure function of props and state; constructor side-effects are ' + 'an anti-pattern, but can be moved to `componentWillMount`.');
        didWarnAboutStateTransition = true;
        break;
    }
  };
}

var ReactFiberScheduler = function (config) {
  var hostContext = ReactFiberHostContext(config);
  var hydrationContext = ReactFiberHydrationContext(config);
  var popHostContainer = hostContext.popHostContainer,
      popHostContext = hostContext.popHostContext,
      resetHostContainer = hostContext.resetHostContainer;

  var _ReactFiberBeginWork = ReactFiberBeginWork(config, hostContext, hydrationContext, scheduleWork, computeExpirationForFiber),
      beginWork = _ReactFiberBeginWork.beginWork,
      beginFailedWork = _ReactFiberBeginWork.beginFailedWork;

  var _ReactFiberCompleteWo = ReactFiberCompleteWork(config, hostContext, hydrationContext),
      completeWork = _ReactFiberCompleteWo.completeWork;

  var _ReactFiberCommitWork = ReactFiberCommitWork(config, captureError),
      commitResetTextContent = _ReactFiberCommitWork.commitResetTextContent,
      commitPlacement = _ReactFiberCommitWork.commitPlacement,
      commitDeletion = _ReactFiberCommitWork.commitDeletion,
      commitWork = _ReactFiberCommitWork.commitWork,
      commitLifeCycles = _ReactFiberCommitWork.commitLifeCycles,
      commitAttachRef = _ReactFiberCommitWork.commitAttachRef,
      commitDetachRef = _ReactFiberCommitWork.commitDetachRef;

  var now = config.now,
      scheduleDeferredCallback = config.scheduleDeferredCallback,
      cancelDeferredCallback = config.cancelDeferredCallback,
      useSyncScheduling = config.useSyncScheduling,
      prepareForCommit = config.prepareForCommit,
      resetAfterCommit = config.resetAfterCommit;

  // Represents the current time in ms.

  var startTime = now();
  var mostRecentCurrentTime = msToExpirationTime(0);

  // Represents the expiration time that incoming updates should use. (If this
  // is NoWork, use the default strategy: async updates in async mode, sync
  // updates in sync mode.)
  var expirationContext = NoWork;

  var isWorking = false;

  // The next work in progress fiber that we're currently working on.
  var nextUnitOfWork = null;
  var nextRoot = null;
  // The time at which we're currently rendering work.
  var nextRenderExpirationTime = NoWork;

  // The next fiber with an effect that we're currently committing.
  var nextEffect = null;

  // Keep track of which fibers have captured an error that need to be handled.
  // Work is removed from this collection after componentDidCatch is called.
  var capturedErrors = null;
  // Keep track of which fibers have failed during the current batch of work.
  // This is a different set than capturedErrors, because it is not reset until
  // the end of the batch. This is needed to propagate errors correctly if a
  // subtree fails more than once.
  var failedBoundaries = null;
  // Error boundaries that captured an error during the current commit.
  var commitPhaseBoundaries = null;
  var firstUncaughtError = null;
  var didFatal = false;

  var isCommitting = false;
  var isUnmounting = false;

  // Used for performance tracking.
  var interruptedBy = null;

  function resetContextStack() {
    // Reset the stack
    reset$1();
    // Reset the cursors
    resetContext();
    resetHostContainer();
  }

  function commitAllHostEffects() {
    while (nextEffect !== null) {
      {
        ReactDebugCurrentFiber.setCurrentFiber(nextEffect);
      }
      recordEffect();

      var effectTag = nextEffect.effectTag;
      if (effectTag & ContentReset) {
        commitResetTextContent(nextEffect);
      }

      if (effectTag & Ref) {
        var current = nextEffect.alternate;
        if (current !== null) {
          commitDetachRef(current);
        }
      }

      // The following switch statement is only concerned about placement,
      // updates, and deletions. To avoid needing to add a case for every
      // possible bitmap value, we remove the secondary effects from the
      // effect tag and switch on that value.
      var primaryEffectTag = effectTag & ~(Callback | Err | ContentReset | Ref | PerformedWork);
      switch (primaryEffectTag) {
        case Placement:
          {
            commitPlacement(nextEffect);
            // Clear the "placement" from effect tag so that we know that this is inserted, before
            // any life-cycles like componentDidMount gets called.
            // TODO: findDOMNode doesn't rely on this any more but isMounted
            // does and isMounted is deprecated anyway so we should be able
            // to kill this.
            nextEffect.effectTag &= ~Placement;
            break;
          }
        case PlacementAndUpdate:
          {
            // Placement
            commitPlacement(nextEffect);
            // Clear the "placement" from effect tag so that we know that this is inserted, before
            // any life-cycles like componentDidMount gets called.
            nextEffect.effectTag &= ~Placement;

            // Update
            var _current = nextEffect.alternate;
            commitWork(_current, nextEffect);
            break;
          }
        case Update:
          {
            var _current2 = nextEffect.alternate;
            commitWork(_current2, nextEffect);
            break;
          }
        case Deletion:
          {
            isUnmounting = true;
            commitDeletion(nextEffect);
            isUnmounting = false;
            break;
          }
      }
      nextEffect = nextEffect.nextEffect;
    }

    {
      ReactDebugCurrentFiber.resetCurrentFiber();
    }
  }

  function commitAllLifeCycles() {
    while (nextEffect !== null) {
      var effectTag = nextEffect.effectTag;

      if (effectTag & (Update | Callback)) {
        recordEffect();
        var current = nextEffect.alternate;
        commitLifeCycles(current, nextEffect);
      }

      if (effectTag & Ref) {
        recordEffect();
        commitAttachRef(nextEffect);
      }

      if (effectTag & Err) {
        recordEffect();
        commitErrorHandling(nextEffect);
      }

      var next = nextEffect.nextEffect;
      // Ensure that we clean these up so that we don't accidentally keep them.
      // I'm not actually sure this matters because we can't reset firstEffect
      // and lastEffect since they're on every node, not just the effectful
      // ones. So we have to clean everything as we reuse nodes anyway.
      nextEffect.nextEffect = null;
      // Ensure that we reset the effectTag here so that we can rely on effect
      // tags to reason about the current life-cycle.
      nextEffect = next;
    }
  }

  function commitRoot(finishedWork) {
    // We keep track of this so that captureError can collect any boundaries
    // that capture an error during the commit phase. The reason these aren't
    // local to this function is because errors that occur during cWU are
    // captured elsewhere, to prevent the unmount from being interrupted.
    isWorking = true;
    isCommitting = true;
    startCommitTimer();

    var root = finishedWork.stateNode;
    !(root.current !== finishedWork) ? invariant(false, 'Cannot commit the same tree as before. This is probably a bug related to the return field. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    root.isReadyForCommit = false;

    // Reset this to null before calling lifecycles
    ReactCurrentOwner.current = null;

    var firstEffect = void 0;
    if (finishedWork.effectTag > PerformedWork) {
      // A fiber's effect list consists only of its children, not itself. So if
      // the root has an effect, we need to add it to the end of the list. The
      // resulting list is the set that would belong to the root's parent, if
      // it had one; that is, all the effects in the tree including the root.
      if (finishedWork.lastEffect !== null) {
        finishedWork.lastEffect.nextEffect = finishedWork;
        firstEffect = finishedWork.firstEffect;
      } else {
        firstEffect = finishedWork;
      }
    } else {
      // There is no effect on the root.
      firstEffect = finishedWork.firstEffect;
    }

    prepareForCommit();

    // Commit all the side-effects within a tree. We'll do this in two passes.
    // The first pass performs all the host insertions, updates, deletions and
    // ref unmounts.
    nextEffect = firstEffect;
    startCommitHostEffectsTimer();
    while (nextEffect !== null) {
      var didError = false;
      var _error = void 0;
      {
        invokeGuardedCallback$1(null, commitAllHostEffects, null);
        if (hasCaughtError()) {
          didError = true;
          _error = clearCaughtError();
        }
      }
      if (didError) {
        !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        captureError(nextEffect, _error);
        // Clean-up
        if (nextEffect !== null) {
          nextEffect = nextEffect.nextEffect;
        }
      }
    }
    stopCommitHostEffectsTimer();

    resetAfterCommit();

    // The work-in-progress tree is now the current tree. This must come after
    // the first pass of the commit phase, so that the previous tree is still
    // current during componentWillUnmount, but before the second pass, so that
    // the finished work is current during componentDidMount/Update.
    root.current = finishedWork;

    // In the second pass we'll perform all life-cycles and ref callbacks.
    // Life-cycles happen as a separate pass so that all placements, updates,
    // and deletions in the entire tree have already been invoked.
    // This pass also triggers any renderer-specific initial effects.
    nextEffect = firstEffect;
    startCommitLifeCyclesTimer();
    while (nextEffect !== null) {
      var _didError = false;
      var _error2 = void 0;
      {
        invokeGuardedCallback$1(null, commitAllLifeCycles, null);
        if (hasCaughtError()) {
          _didError = true;
          _error2 = clearCaughtError();
        }
      }
      if (_didError) {
        !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        captureError(nextEffect, _error2);
        if (nextEffect !== null) {
          nextEffect = nextEffect.nextEffect;
        }
      }
    }

    isCommitting = false;
    isWorking = false;
    stopCommitLifeCyclesTimer();
    stopCommitTimer();
    if (typeof onCommitRoot === 'function') {
      onCommitRoot(finishedWork.stateNode);
    }
    if (true && ReactFiberInstrumentation_1.debugTool) {
      ReactFiberInstrumentation_1.debugTool.onCommitWork(finishedWork);
    }

    // If we caught any errors during this commit, schedule their boundaries
    // to update.
    if (commitPhaseBoundaries) {
      commitPhaseBoundaries.forEach(scheduleErrorRecovery);
      commitPhaseBoundaries = null;
    }

    if (firstUncaughtError !== null) {
      var _error3 = firstUncaughtError;
      firstUncaughtError = null;
      onUncaughtError(_error3);
    }

    var remainingTime = root.current.expirationTime;

    if (remainingTime === NoWork) {
      capturedErrors = null;
      failedBoundaries = null;
    }

    return remainingTime;
  }

  function resetExpirationTime(workInProgress, renderTime) {
    if (renderTime !== Never && workInProgress.expirationTime === Never) {
      // The children of this component are hidden. Don't bubble their
      // expiration times.
      return;
    }

    // Check for pending updates.
    var newExpirationTime = getUpdateExpirationTime(workInProgress);

    // TODO: Calls need to visit stateNode

    // Bubble up the earliest expiration time.
    var child = workInProgress.child;
    while (child !== null) {
      if (child.expirationTime !== NoWork && (newExpirationTime === NoWork || newExpirationTime > child.expirationTime)) {
        newExpirationTime = child.expirationTime;
      }
      child = child.sibling;
    }
    workInProgress.expirationTime = newExpirationTime;
  }

  function completeUnitOfWork(workInProgress) {
    while (true) {
      // The current, flushed, state of this fiber is the alternate.
      // Ideally nothing should rely on this, but relying on it here
      // means that we don't need an additional field on the work in
      // progress.
      var current = workInProgress.alternate;
      {
        ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
      }
      var next = completeWork(current, workInProgress, nextRenderExpirationTime);
      {
        ReactDebugCurrentFiber.resetCurrentFiber();
      }

      var returnFiber = workInProgress['return'];
      var siblingFiber = workInProgress.sibling;

      resetExpirationTime(workInProgress, nextRenderExpirationTime);

      if (next !== null) {
        stopWorkTimer(workInProgress);
        if (true && ReactFiberInstrumentation_1.debugTool) {
          ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
        }
        // If completing this work spawned new work, do that next. We'll come
        // back here again.
        return next;
      }

      if (returnFiber !== null) {
        // Append all the effects of the subtree and this fiber onto the effect
        // list of the parent. The completion order of the children affects the
        // side-effect order.
        if (returnFiber.firstEffect === null) {
          returnFiber.firstEffect = workInProgress.firstEffect;
        }
        if (workInProgress.lastEffect !== null) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
          }
          returnFiber.lastEffect = workInProgress.lastEffect;
        }

        // If this fiber had side-effects, we append it AFTER the children's
        // side-effects. We can perform certain side-effects earlier if
        // needed, by doing multiple passes over the effect list. We don't want
        // to schedule our own side-effect on our own list because if end up
        // reusing children we'll schedule this effect onto itself since we're
        // at the end.
        var effectTag = workInProgress.effectTag;
        // Skip both NoWork and PerformedWork tags when creating the effect list.
        // PerformedWork effect is read by React DevTools but shouldn't be committed.
        if (effectTag > PerformedWork) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress;
          } else {
            returnFiber.firstEffect = workInProgress;
          }
          returnFiber.lastEffect = workInProgress;
        }
      }

      stopWorkTimer(workInProgress);
      if (true && ReactFiberInstrumentation_1.debugTool) {
        ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
      }

      if (siblingFiber !== null) {
        // If there is more work to do in this returnFiber, do that next.
        return siblingFiber;
      } else if (returnFiber !== null) {
        // If there's no more work in this returnFiber. Complete the returnFiber.
        workInProgress = returnFiber;
        continue;
      } else {
        // We've reached the root.
        var root = workInProgress.stateNode;
        root.isReadyForCommit = true;
        return null;
      }
    }

    // Without this explicit null return Flow complains of invalid return type
    // TODO Remove the above while(true) loop
    // eslint-disable-next-line no-unreachable
    return null;
  }

  function performUnitOfWork(workInProgress) {
    // The current, flushed, state of this fiber is the alternate.
    // Ideally nothing should rely on this, but relying on it here
    // means that we don't need an additional field on the work in
    // progress.
    var current = workInProgress.alternate;

    // See if beginning this work spawns more work.
    startWorkTimer(workInProgress);
    {
      ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
    }

    var next = beginWork(current, workInProgress, nextRenderExpirationTime);
    {
      ReactDebugCurrentFiber.resetCurrentFiber();
    }
    if (true && ReactFiberInstrumentation_1.debugTool) {
      ReactFiberInstrumentation_1.debugTool.onBeginWork(workInProgress);
    }

    if (next === null) {
      // If this doesn't spawn new work, complete the current work.
      next = completeUnitOfWork(workInProgress);
    }

    ReactCurrentOwner.current = null;

    return next;
  }

  function performFailedUnitOfWork(workInProgress) {
    // The current, flushed, state of this fiber is the alternate.
    // Ideally nothing should rely on this, but relying on it here
    // means that we don't need an additional field on the work in
    // progress.
    var current = workInProgress.alternate;

    // See if beginning this work spawns more work.
    startWorkTimer(workInProgress);
    {
      ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
    }
    var next = beginFailedWork(current, workInProgress, nextRenderExpirationTime);
    {
      ReactDebugCurrentFiber.resetCurrentFiber();
    }
    if (true && ReactFiberInstrumentation_1.debugTool) {
      ReactFiberInstrumentation_1.debugTool.onBeginWork(workInProgress);
    }

    if (next === null) {
      // If this doesn't spawn new work, complete the current work.
      next = completeUnitOfWork(workInProgress);
    }

    ReactCurrentOwner.current = null;

    return next;
  }

  function workLoop(expirationTime) {
    if (capturedErrors !== null) {
      // If there are unhandled errors, switch to the slow work loop.
      // TODO: How to avoid this check in the fast path? Maybe the renderer
      // could keep track of which roots have unhandled errors and call a
      // forked version of renderRoot.
      slowWorkLoopThatChecksForFailedWork(expirationTime);
      return;
    }
    if (nextRenderExpirationTime === NoWork || nextRenderExpirationTime > expirationTime) {
      return;
    }

    if (nextRenderExpirationTime <= mostRecentCurrentTime) {
      // Flush all expired work.
      while (nextUnitOfWork !== null) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      }
    } else {
      // Flush asynchronous work until the deadline runs out of time.
      while (nextUnitOfWork !== null && !shouldYield()) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      }
    }
  }

  function slowWorkLoopThatChecksForFailedWork(expirationTime) {
    if (nextRenderExpirationTime === NoWork || nextRenderExpirationTime > expirationTime) {
      return;
    }

    if (nextRenderExpirationTime <= mostRecentCurrentTime) {
      // Flush all expired work.
      while (nextUnitOfWork !== null) {
        if (hasCapturedError(nextUnitOfWork)) {
          // Use a forked version of performUnitOfWork
          nextUnitOfWork = performFailedUnitOfWork(nextUnitOfWork);
        } else {
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        }
      }
    } else {
      // Flush asynchronous work until the deadline runs out of time.
      while (nextUnitOfWork !== null && !shouldYield()) {
        if (hasCapturedError(nextUnitOfWork)) {
          // Use a forked version of performUnitOfWork
          nextUnitOfWork = performFailedUnitOfWork(nextUnitOfWork);
        } else {
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        }
      }
    }
  }

  function renderRootCatchBlock(root, failedWork, boundary, expirationTime) {
    // We're going to restart the error boundary that captured the error.
    // Conceptually, we're unwinding the stack. We need to unwind the
    // context stack, too.
    unwindContexts(failedWork, boundary);

    // Restart the error boundary using a forked version of
    // performUnitOfWork that deletes the boundary's children. The entire
    // failed subree will be unmounted. During the commit phase, a special
    // lifecycle method is called on the error boundary, which triggers
    // a re-render.
    nextUnitOfWork = performFailedUnitOfWork(boundary);

    // Continue working.
    workLoop(expirationTime);
  }

  function renderRoot(root, expirationTime) {
    !!isWorking ? invariant(false, 'renderRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    isWorking = true;

    // We're about to mutate the work-in-progress tree. If the root was pending
    // commit, it no longer is: we'll need to complete it again.
    root.isReadyForCommit = false;

    // Check if we're starting from a fresh stack, or if we're resuming from
    // previously yielded work.
    if (root !== nextRoot || expirationTime !== nextRenderExpirationTime || nextUnitOfWork === null) {
      // Reset the stack and start working from the root.
      resetContextStack();
      nextRoot = root;
      nextRenderExpirationTime = expirationTime;
      nextUnitOfWork = createWorkInProgress(nextRoot.current, null, expirationTime);
    }

    startWorkLoopTimer(nextUnitOfWork);

    var didError = false;
    var error = null;
    {
      invokeGuardedCallback$1(null, workLoop, null, expirationTime);
      if (hasCaughtError()) {
        didError = true;
        error = clearCaughtError();
      }
    }

    // An error was thrown during the render phase.
    while (didError) {
      if (didFatal) {
        // This was a fatal error. Don't attempt to recover from it.
        firstUncaughtError = error;
        break;
      }

      var failedWork = nextUnitOfWork;
      if (failedWork === null) {
        // An error was thrown but there's no current unit of work. This can
        // happen during the commit phase if there's a bug in the renderer.
        didFatal = true;
        continue;
      }

      // "Capture" the error by finding the nearest boundary. If there is no
      // error boundary, we use the root.
      var boundary = captureError(failedWork, error);
      !(boundary !== null) ? invariant(false, 'Should have found an error boundary. This error is likely caused by a bug in React. Please file an issue.') : void 0;

      if (didFatal) {
        // The error we just captured was a fatal error. This happens
        // when the error propagates to the root more than once.
        continue;
      }

      didError = false;
      error = null;
      {
        invokeGuardedCallback$1(null, renderRootCatchBlock, null, root, failedWork, boundary, expirationTime);
        if (hasCaughtError()) {
          didError = true;
          error = clearCaughtError();
          continue;
        }
      }
      // We're finished working. Exit the error loop.
      break;
    }

    var uncaughtError = firstUncaughtError;

    // We're done performing work. Time to clean up.
    stopWorkLoopTimer(interruptedBy);
    interruptedBy = null;
    isWorking = false;
    didFatal = false;
    firstUncaughtError = null;

    if (uncaughtError !== null) {
      onUncaughtError(uncaughtError);
    }

    return root.isReadyForCommit ? root.current.alternate : null;
  }

  // Returns the boundary that captured the error, or null if the error is ignored
  function captureError(failedWork, error) {
    // It is no longer valid because we exited the user code.
    ReactCurrentOwner.current = null;
    {
      ReactDebugCurrentFiber.resetCurrentFiber();
    }

    // Search for the nearest error boundary.
    var boundary = null;

    // Passed to logCapturedError()
    var errorBoundaryFound = false;
    var willRetry = false;
    var errorBoundaryName = null;

    // Host containers are a special case. If the failed work itself is a host
    // container, then it acts as its own boundary. In all other cases, we
    // ignore the work itself and only search through the parents.
    if (failedWork.tag === HostRoot) {
      boundary = failedWork;

      if (isFailedBoundary(failedWork)) {
        // If this root already failed, there must have been an error when
        // attempting to unmount it. This is a worst-case scenario and
        // should only be possible if there's a bug in the renderer.
        didFatal = true;
      }
    } else {
      var node = failedWork['return'];
      while (node !== null && boundary === null) {
        if (node.tag === ClassComponent) {
          var instance = node.stateNode;
          if (typeof instance.componentDidCatch === 'function') {
            errorBoundaryFound = true;
            errorBoundaryName = getComponentName(node);

            // Found an error boundary!
            boundary = node;
            willRetry = true;
          }
        } else if (node.tag === HostRoot) {
          // Treat the root like a no-op error boundary
          boundary = node;
        }

        if (isFailedBoundary(node)) {
          // This boundary is already in a failed state.

          // If we're currently unmounting, that means this error was
          // thrown while unmounting a failed subtree. We should ignore
          // the error.
          if (isUnmounting) {
            return null;
          }

          // If we're in the commit phase, we should check to see if
          // this boundary already captured an error during this commit.
          // This case exists because multiple errors can be thrown during
          // a single commit without interruption.
          if (commitPhaseBoundaries !== null && (commitPhaseBoundaries.has(node) || node.alternate !== null && commitPhaseBoundaries.has(node.alternate))) {
            // If so, we should ignore this error.
            return null;
          }

          // The error should propagate to the next boundary -— we keep looking.
          boundary = null;
          willRetry = false;
        }

        node = node['return'];
      }
    }

    if (boundary !== null) {
      // Add to the collection of failed boundaries. This lets us know that
      // subsequent errors in this subtree should propagate to the next boundary.
      if (failedBoundaries === null) {
        failedBoundaries = new Set();
      }
      failedBoundaries.add(boundary);

      // This method is unsafe outside of the begin and complete phases.
      // We might be in the commit phase when an error is captured.
      // The risk is that the return path from this Fiber may not be accurate.
      // That risk is acceptable given the benefit of providing users more context.
      var _componentStack = getStackAddendumByWorkInProgressFiber(failedWork);
      var _componentName = getComponentName(failedWork);

      // Add to the collection of captured errors. This is stored as a global
      // map of errors and their component stack location keyed by the boundaries
      // that capture them. We mostly use this Map as a Set; it's a Map only to
      // avoid adding a field to Fiber to store the error.
      if (capturedErrors === null) {
        capturedErrors = new Map();
      }

      var capturedError = {
        componentName: _componentName,
        componentStack: _componentStack,
        error: error,
        errorBoundary: errorBoundaryFound ? boundary.stateNode : null,
        errorBoundaryFound: errorBoundaryFound,
        errorBoundaryName: errorBoundaryName,
        willRetry: willRetry
      };

      capturedErrors.set(boundary, capturedError);

      try {
        logCapturedError(capturedError);
      } catch (e) {
        // Prevent cycle if logCapturedError() throws.
        // A cycle may still occur if logCapturedError renders a component that throws.
        var suppressLogging = e && e.suppressReactErrorLogging;
        if (!suppressLogging) {
          console.error(e);
        }
      }

      // If we're in the commit phase, defer scheduling an update on the
      // boundary until after the commit is complete
      if (isCommitting) {
        if (commitPhaseBoundaries === null) {
          commitPhaseBoundaries = new Set();
        }
        commitPhaseBoundaries.add(boundary);
      } else {
        // Otherwise, schedule an update now.
        // TODO: Is this actually necessary during the render phase? Is it
        // possible to unwind and continue rendering at the same priority,
        // without corrupting internal state?
        scheduleErrorRecovery(boundary);
      }
      return boundary;
    } else if (firstUncaughtError === null) {
      // If no boundary is found, we'll need to throw the error
      firstUncaughtError = error;
    }
    return null;
  }

  function hasCapturedError(fiber) {
    // TODO: capturedErrors should store the boundary instance, to avoid needing
    // to check the alternate.
    return capturedErrors !== null && (capturedErrors.has(fiber) || fiber.alternate !== null && capturedErrors.has(fiber.alternate));
  }

  function isFailedBoundary(fiber) {
    // TODO: failedBoundaries should store the boundary instance, to avoid
    // needing to check the alternate.
    return failedBoundaries !== null && (failedBoundaries.has(fiber) || fiber.alternate !== null && failedBoundaries.has(fiber.alternate));
  }

  function commitErrorHandling(effectfulFiber) {
    var capturedError = void 0;
    if (capturedErrors !== null) {
      capturedError = capturedErrors.get(effectfulFiber);
      capturedErrors['delete'](effectfulFiber);
      if (capturedError == null) {
        if (effectfulFiber.alternate !== null) {
          effectfulFiber = effectfulFiber.alternate;
          capturedError = capturedErrors.get(effectfulFiber);
          capturedErrors['delete'](effectfulFiber);
        }
      }
    }

    !(capturedError != null) ? invariant(false, 'No error for given unit of work. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    switch (effectfulFiber.tag) {
      case ClassComponent:
        var instance = effectfulFiber.stateNode;

        var info = {
          componentStack: capturedError.componentStack
        };

        // Allow the boundary to handle the error, usually by scheduling
        // an update to itself
        instance.componentDidCatch(capturedError.error, info);
        return;
      case HostRoot:
        if (firstUncaughtError === null) {
          firstUncaughtError = capturedError.error;
        }
        return;
      default:
        invariant(false, 'Invalid type of work. This error is likely caused by a bug in React. Please file an issue.');
    }
  }

  function unwindContexts(from, to) {
    var node = from;
    while (node !== null) {
      switch (node.tag) {
        case ClassComponent:
          popContextProvider(node);
          break;
        case HostComponent:
          popHostContext(node);
          break;
        case HostRoot:
          popHostContainer(node);
          break;
        case HostPortal:
          popHostContainer(node);
          break;
      }
      if (node === to || node.alternate === to) {
        stopFailedWorkTimer(node);
        break;
      } else {
        stopWorkTimer(node);
      }
      node = node['return'];
    }
  }

  function computeAsyncExpiration() {
    // Given the current clock time, returns an expiration time. We use rounding
    // to batch like updates together.
    // Should complete within ~1000ms. 1200ms max.
    var currentTime = recalculateCurrentTime();
    var expirationMs = 1000;
    var bucketSizeMs = 200;
    return computeExpirationBucket(currentTime, expirationMs, bucketSizeMs);
  }

  function computeExpirationForFiber(fiber) {
    var expirationTime = void 0;
    if (expirationContext !== NoWork) {
      // An explicit expiration context was set;
      expirationTime = expirationContext;
    } else if (isWorking) {
      if (isCommitting) {
        // Updates that occur during the commit phase should have sync priority
        // by default.
        expirationTime = Sync;
      } else {
        // Updates during the render phase should expire at the same time as
        // the work that is being rendered.
        expirationTime = nextRenderExpirationTime;
      }
    } else {
      // No explicit expiration context was set, and we're not currently
      // performing work. Calculate a new expiration time.
      if (useSyncScheduling && !(fiber.internalContextTag & AsyncUpdates)) {
        // This is a sync update
        expirationTime = Sync;
      } else {
        // This is an async update
        expirationTime = computeAsyncExpiration();
      }
    }
    return expirationTime;
  }

  function scheduleWork(fiber, expirationTime) {
    return scheduleWorkImpl(fiber, expirationTime, false);
  }

  function checkRootNeedsClearing(root, fiber, expirationTime) {
    if (!isWorking && root === nextRoot && expirationTime < nextRenderExpirationTime) {
      // Restart the root from the top.
      if (nextUnitOfWork !== null) {
        // This is an interruption. (Used for performance tracking.)
        interruptedBy = fiber;
      }
      nextRoot = null;
      nextUnitOfWork = null;
      nextRenderExpirationTime = NoWork;
    }
  }

  function scheduleWorkImpl(fiber, expirationTime, isErrorRecovery) {
    recordScheduleUpdate();

    {
      if (!isErrorRecovery && fiber.tag === ClassComponent) {
        var instance = fiber.stateNode;
        warnAboutInvalidUpdates(instance);
      }
    }

    var node = fiber;
    while (node !== null) {
      // Walk the parent path to the root and update each node's
      // expiration time.
      if (node.expirationTime === NoWork || node.expirationTime > expirationTime) {
        node.expirationTime = expirationTime;
      }
      if (node.alternate !== null) {
        if (node.alternate.expirationTime === NoWork || node.alternate.expirationTime > expirationTime) {
          node.alternate.expirationTime = expirationTime;
        }
      }
      if (node['return'] === null) {
        if (node.tag === HostRoot) {
          var root = node.stateNode;

          checkRootNeedsClearing(root, fiber, expirationTime);
          requestWork(root, expirationTime);
          checkRootNeedsClearing(root, fiber, expirationTime);
        } else {
          {
            if (!isErrorRecovery && fiber.tag === ClassComponent) {
              warnAboutUpdateOnUnmounted(fiber);
            }
          }
          return;
        }
      }
      node = node['return'];
    }
  }

  function scheduleErrorRecovery(fiber) {
    scheduleWorkImpl(fiber, Sync, true);
  }

  function recalculateCurrentTime() {
    // Subtract initial time so it fits inside 32bits
    var ms = now() - startTime;
    mostRecentCurrentTime = msToExpirationTime(ms);
    return mostRecentCurrentTime;
  }

  function deferredUpdates(fn) {
    var previousExpirationContext = expirationContext;
    expirationContext = computeAsyncExpiration();
    try {
      return fn();
    } finally {
      expirationContext = previousExpirationContext;
    }
  }

  function syncUpdates(fn) {
    var previousExpirationContext = expirationContext;
    expirationContext = Sync;
    try {
      return fn();
    } finally {
      expirationContext = previousExpirationContext;
    }
  }

  // TODO: Everything below this is written as if it has been lifted to the
  // renderers. I'll do this in a follow-up.

  // Linked-list of roots
  var firstScheduledRoot = null;
  var lastScheduledRoot = null;

  var callbackExpirationTime = NoWork;
  var callbackID = -1;
  var isRendering = false;
  var nextFlushedRoot = null;
  var nextFlushedExpirationTime = NoWork;
  var deadlineDidExpire = false;
  var hasUnhandledError = false;
  var unhandledError = null;
  var deadline = null;

  var isBatchingUpdates = false;
  var isUnbatchingUpdates = false;

  // Use these to prevent an infinite loop of nested updates
  var NESTED_UPDATE_LIMIT = 1000;
  var nestedUpdateCount = 0;

  var timeHeuristicForUnitOfWork = 1;

  function scheduleCallbackWithExpiration(expirationTime) {
    if (callbackExpirationTime !== NoWork) {
      // A callback is already scheduled. Check its expiration time (timeout).
      if (expirationTime > callbackExpirationTime) {
        // Existing callback has sufficient timeout. Exit.
        return;
      } else {
        // Existing callback has insufficient timeout. Cancel and schedule a
        // new one.
        cancelDeferredCallback(callbackID);
      }
      // The request callback timer is already running. Don't start a new one.
    } else {
      startRequestCallbackTimer();
    }

    // Compute a timeout for the given expiration time.
    var currentMs = now() - startTime;
    var expirationMs = expirationTimeToMs(expirationTime);
    var timeout = expirationMs - currentMs;

    callbackExpirationTime = expirationTime;
    callbackID = scheduleDeferredCallback(performAsyncWork, { timeout: timeout });
  }

  // requestWork is called by the scheduler whenever a root receives an update.
  // It's up to the renderer to call renderRoot at some point in the future.
  function requestWork(root, expirationTime) {
    if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
      invariant(false, 'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.');
    }

    // Add the root to the schedule.
    // Check if this root is already part of the schedule.
    if (root.nextScheduledRoot === null) {
      // This root is not already scheduled. Add it.
      root.remainingExpirationTime = expirationTime;
      if (lastScheduledRoot === null) {
        firstScheduledRoot = lastScheduledRoot = root;
        root.nextScheduledRoot = root;
      } else {
        lastScheduledRoot.nextScheduledRoot = root;
        lastScheduledRoot = root;
        lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
      }
    } else {
      // This root is already scheduled, but its priority may have increased.
      var remainingExpirationTime = root.remainingExpirationTime;
      if (remainingExpirationTime === NoWork || expirationTime < remainingExpirationTime) {
        // Update the priority.
        root.remainingExpirationTime = expirationTime;
      }
    }

    if (isRendering) {
      // Prevent reentrancy. Remaining work will be scheduled at the end of
      // the currently rendering batch.
      return;
    }

    if (isBatchingUpdates) {
      // Flush work at the end of the batch.
      if (isUnbatchingUpdates) {
        // ...unless we're inside unbatchedUpdates, in which case we should
        // flush it now.
        nextFlushedRoot = root;
        nextFlushedExpirationTime = Sync;
        performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime);
      }
      return;
    }

    // TODO: Get rid of Sync and use current time?
    if (expirationTime === Sync) {
      performWork(Sync, null);
    } else {
      scheduleCallbackWithExpiration(expirationTime);
    }
  }

  function findHighestPriorityRoot() {
    var highestPriorityWork = NoWork;
    var highestPriorityRoot = null;

    if (lastScheduledRoot !== null) {
      var previousScheduledRoot = lastScheduledRoot;
      var root = firstScheduledRoot;
      while (root !== null) {
        var remainingExpirationTime = root.remainingExpirationTime;
        if (remainingExpirationTime === NoWork) {
          // This root no longer has work. Remove it from the scheduler.

          // TODO: This check is redudant, but Flow is confused by the branch
          // below where we set lastScheduledRoot to null, even though we break
          // from the loop right after.
          !(previousScheduledRoot !== null && lastScheduledRoot !== null) ? invariant(false, 'Should have a previous and last root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          if (root === root.nextScheduledRoot) {
            // This is the only root in the list.
            root.nextScheduledRoot = null;
            firstScheduledRoot = lastScheduledRoot = null;
            break;
          } else if (root === firstScheduledRoot) {
            // This is the first root in the list.
            var next = root.nextScheduledRoot;
            firstScheduledRoot = next;
            lastScheduledRoot.nextScheduledRoot = next;
            root.nextScheduledRoot = null;
          } else if (root === lastScheduledRoot) {
            // This is the last root in the list.
            lastScheduledRoot = previousScheduledRoot;
            lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
            root.nextScheduledRoot = null;
            break;
          } else {
            previousScheduledRoot.nextScheduledRoot = root.nextScheduledRoot;
            root.nextScheduledRoot = null;
          }
          root = previousScheduledRoot.nextScheduledRoot;
        } else {
          if (highestPriorityWork === NoWork || remainingExpirationTime < highestPriorityWork) {
            // Update the priority, if it's higher
            highestPriorityWork = remainingExpirationTime;
            highestPriorityRoot = root;
          }
          if (root === lastScheduledRoot) {
            break;
          }
          previousScheduledRoot = root;
          root = root.nextScheduledRoot;
        }
      }
    }

    // If the next root is the same as the previous root, this is a nested
    // update. To prevent an infinite loop, increment the nested update count.
    var previousFlushedRoot = nextFlushedRoot;
    if (previousFlushedRoot !== null && previousFlushedRoot === highestPriorityRoot) {
      nestedUpdateCount++;
    } else {
      // Reset whenever we switch roots.
      nestedUpdateCount = 0;
    }
    nextFlushedRoot = highestPriorityRoot;
    nextFlushedExpirationTime = highestPriorityWork;
  }

  function performAsyncWork(dl) {
    performWork(NoWork, dl);
  }

  function performWork(minExpirationTime, dl) {
    deadline = dl;

    // Keep working on roots until there's no more work, or until the we reach
    // the deadline.
    findHighestPriorityRoot();

    if (enableUserTimingAPI && deadline !== null) {
      var didExpire = nextFlushedExpirationTime < recalculateCurrentTime();
      stopRequestCallbackTimer(didExpire);
    }

    while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && (minExpirationTime === NoWork || nextFlushedExpirationTime <= minExpirationTime) && !deadlineDidExpire) {
      performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime);
      // Find the next highest priority work.
      findHighestPriorityRoot();
    }

    // We're done flushing work. Either we ran out of time in this callback,
    // or there's no more work left with sufficient priority.

    // If we're inside a callback, set this to false since we just completed it.
    if (deadline !== null) {
      callbackExpirationTime = NoWork;
      callbackID = -1;
    }
    // If there's work left over, schedule a new callback.
    if (nextFlushedExpirationTime !== NoWork) {
      scheduleCallbackWithExpiration(nextFlushedExpirationTime);
    }

    // Clean-up.
    deadline = null;
    deadlineDidExpire = false;
    nestedUpdateCount = 0;

    if (hasUnhandledError) {
      var _error4 = unhandledError;
      unhandledError = null;
      hasUnhandledError = false;
      throw _error4;
    }
  }

  function performWorkOnRoot(root, expirationTime) {
    !!isRendering ? invariant(false, 'performWorkOnRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    isRendering = true;

    // Check if this is async work or sync/expired work.
    // TODO: Pass current time as argument to renderRoot, commitRoot
    if (expirationTime <= recalculateCurrentTime()) {
      // Flush sync work.
      var finishedWork = root.finishedWork;
      if (finishedWork !== null) {
        // This root is already complete. We can commit it.
        root.finishedWork = null;
        root.remainingExpirationTime = commitRoot(finishedWork);
      } else {
        root.finishedWork = null;
        finishedWork = renderRoot(root, expirationTime);
        if (finishedWork !== null) {
          // We've completed the root. Commit it.
          root.remainingExpirationTime = commitRoot(finishedWork);
        }
      }
    } else {
      // Flush async work.
      var _finishedWork = root.finishedWork;
      if (_finishedWork !== null) {
        // This root is already complete. We can commit it.
        root.finishedWork = null;
        root.remainingExpirationTime = commitRoot(_finishedWork);
      } else {
        root.finishedWork = null;
        _finishedWork = renderRoot(root, expirationTime);
        if (_finishedWork !== null) {
          // We've completed the root. Check the deadline one more time
          // before committing.
          if (!shouldYield()) {
            // Still time left. Commit the root.
            root.remainingExpirationTime = commitRoot(_finishedWork);
          } else {
            // There's no time left. Mark this root as complete. We'll come
            // back and commit it later.
            root.finishedWork = _finishedWork;
          }
        }
      }
    }

    isRendering = false;
  }

  // When working on async work, the reconciler asks the renderer if it should
  // yield execution. For DOM, we implement this with requestIdleCallback.
  function shouldYield() {
    if (deadline === null) {
      return false;
    }
    if (deadline.timeRemaining() > timeHeuristicForUnitOfWork) {
      // Disregard deadline.didTimeout. Only expired work should be flushed
      // during a timeout. This path is only hit for non-expired work.
      return false;
    }
    deadlineDidExpire = true;
    return true;
  }

  // TODO: Not happy about this hook. Conceptually, renderRoot should return a
  // tuple of (isReadyForCommit, didError, error)
  function onUncaughtError(error) {
    !(nextFlushedRoot !== null) ? invariant(false, 'Should be working on a root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    // Unschedule this root so we don't work on it again until there's
    // another update.
    nextFlushedRoot.remainingExpirationTime = NoWork;
    if (!hasUnhandledError) {
      hasUnhandledError = true;
      unhandledError = error;
    }
  }

  // TODO: Batching should be implemented at the renderer level, not inside
  // the reconciler.
  function batchedUpdates(fn, a) {
    var previousIsBatchingUpdates = isBatchingUpdates;
    isBatchingUpdates = true;
    try {
      return fn(a);
    } finally {
      isBatchingUpdates = previousIsBatchingUpdates;
      if (!isBatchingUpdates && !isRendering) {
        performWork(Sync, null);
      }
    }
  }

  // TODO: Batching should be implemented at the renderer level, not inside
  // the reconciler.
  function unbatchedUpdates(fn) {
    if (isBatchingUpdates && !isUnbatchingUpdates) {
      isUnbatchingUpdates = true;
      try {
        return fn();
      } finally {
        isUnbatchingUpdates = false;
      }
    }
    return fn();
  }

  // TODO: Batching should be implemented at the renderer level, not within
  // the reconciler.
  function flushSync(fn) {
    var previousIsBatchingUpdates = isBatchingUpdates;
    isBatchingUpdates = true;
    try {
      return syncUpdates(fn);
    } finally {
      isBatchingUpdates = previousIsBatchingUpdates;
      !!isRendering ? invariant(false, 'flushSync was called from inside a lifecycle method. It cannot be called when React is already rendering.') : void 0;
      performWork(Sync, null);
    }
  }

  return {
    computeAsyncExpiration: computeAsyncExpiration,
    computeExpirationForFiber: computeExpirationForFiber,
    scheduleWork: scheduleWork,
    batchedUpdates: batchedUpdates,
    unbatchedUpdates: unbatchedUpdates,
    flushSync: flushSync,
    deferredUpdates: deferredUpdates
  };
};

{
  var didWarnAboutNestedUpdates = false;
}

// 0 is PROD, 1 is DEV.
// Might add PROFILE later.


function getContextForSubtree(parentComponent) {
  if (!parentComponent) {
    return emptyObject;
  }

  var fiber = get(parentComponent);
  var parentContext = findCurrentUnmaskedContext(fiber);
  return isContextProvider(fiber) ? processChildContext(fiber, parentContext) : parentContext;
}

var ReactFiberReconciler$1 = function (config) {
  var getPublicInstance = config.getPublicInstance;

  var _ReactFiberScheduler = ReactFiberScheduler(config),
      computeAsyncExpiration = _ReactFiberScheduler.computeAsyncExpiration,
      computeExpirationForFiber = _ReactFiberScheduler.computeExpirationForFiber,
      scheduleWork = _ReactFiberScheduler.scheduleWork,
      batchedUpdates = _ReactFiberScheduler.batchedUpdates,
      unbatchedUpdates = _ReactFiberScheduler.unbatchedUpdates,
      flushSync = _ReactFiberScheduler.flushSync,
      deferredUpdates = _ReactFiberScheduler.deferredUpdates;

  function scheduleTopLevelUpdate(current, element, callback) {
    {
      if (ReactDebugCurrentFiber.phase === 'render' && ReactDebugCurrentFiber.current !== null && !didWarnAboutNestedUpdates) {
        didWarnAboutNestedUpdates = true;
        warning(false, 'Render methods should be a pure function of props and state; ' + 'triggering nested component updates from render is not allowed. ' + 'If necessary, trigger nested updates in componentDidUpdate.\n\n' + 'Check the render method of %s.', getComponentName(ReactDebugCurrentFiber.current) || 'Unknown');
      }
    }

    callback = callback === undefined ? null : callback;
    {
      warning(callback === null || typeof callback === 'function', 'render(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callback);
    }

    var expirationTime = void 0;
    // Check if the top-level element is an async wrapper component. If so,
    // treat updates to the root as async. This is a bit weird but lets us
    // avoid a separate `renderAsync` API.
    if (enableAsyncSubtreeAPI && element != null && element.type != null && element.type.prototype != null && element.type.prototype.unstable_isAsyncReactComponent === true) {
      expirationTime = computeAsyncExpiration();
    } else {
      expirationTime = computeExpirationForFiber(current);
    }

    var update = {
      expirationTime: expirationTime,
      partialState: { element: element },
      callback: callback,
      isReplace: false,
      isForced: false,
      nextCallback: null,
      next: null
    };
    insertUpdateIntoFiber(current, update);
    scheduleWork(current, expirationTime);
  }

  function findHostInstance(fiber) {
    var hostFiber = findCurrentHostFiber(fiber);
    if (hostFiber === null) {
      return null;
    }
    return hostFiber.stateNode;
  }

  return {
    createContainer: function (containerInfo, hydrate) {
      return createFiberRoot(containerInfo, hydrate);
    },
    updateContainer: function (element, container, parentComponent, callback) {
      // TODO: If this is a nested container, this won't be the root.
      var current = container.current;

      {
        if (ReactFiberInstrumentation_1.debugTool) {
          if (current.alternate === null) {
            ReactFiberInstrumentation_1.debugTool.onMountContainer(container);
          } else if (element === null) {
            ReactFiberInstrumentation_1.debugTool.onUnmountContainer(container);
          } else {
            ReactFiberInstrumentation_1.debugTool.onUpdateContainer(container);
          }
        }
      }

      var context = getContextForSubtree(parentComponent);
      if (container.context === null) {
        container.context = context;
      } else {
        container.pendingContext = context;
      }

      scheduleTopLevelUpdate(current, element, callback);
    },


    batchedUpdates: batchedUpdates,

    unbatchedUpdates: unbatchedUpdates,

    deferredUpdates: deferredUpdates,

    flushSync: flushSync,

    getPublicRootInstance: function (container) {
      var containerFiber = container.current;
      if (!containerFiber.child) {
        return null;
      }
      switch (containerFiber.child.tag) {
        case HostComponent:
          return getPublicInstance(containerFiber.child.stateNode);
        default:
          return containerFiber.child.stateNode;
      }
    },


    findHostInstance: findHostInstance,

    findHostInstanceWithNoPortals: function (fiber) {
      var hostFiber = findCurrentHostFiberWithNoPortals(fiber);
      if (hostFiber === null) {
        return null;
      }
      return hostFiber.stateNode;
    },
    injectIntoDevTools: function (devToolsConfig) {
      var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;

      return injectInternals(_assign({}, devToolsConfig, {
        findHostInstanceByFiber: function (fiber) {
          return findHostInstance(fiber);
        },
        findFiberByHostInstance: function (instance) {
          if (!findFiberByHostInstance) {
            // Might not be implemented by the renderer.
            return null;
          }
          return findFiberByHostInstance(instance);
        }
      }));
    }
  };
};

var ReactFiberReconciler$2 = Object.freeze({
	default: ReactFiberReconciler$1
});

var ReactFiberReconciler$3 = ( ReactFiberReconciler$2 && ReactFiberReconciler$1 ) || ReactFiberReconciler$2;

// TODO: bundle Flow types with the package.



// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var reactReconciler = ReactFiberReconciler$3['default'] ? ReactFiberReconciler$3['default'] : ReactFiberReconciler$3;

function createPortal$1(children, containerInfo,
// TODO: figure out the API for cross-renderer implementation.
implementation) {
  var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  return {
    // This tag allow us to uniquely identify this as a React Portal
    $$typeof: REACT_PORTAL_TYPE,
    key: key == null ? null : '' + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  };
}

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.2.0';

// a requestAnimationFrame, storing the time for the start of the frame, then
// scheduling a postMessage which gets scheduled after paint. Within the
// postMessage handler do as much work as possible until time + frame rate.
// By separating the idle call into a separate event tick we ensure that
// layout, paint and other browser work is counted against the available time.
// The frame rate is dynamically adjusted.

{
  if (ExecutionEnvironment.canUseDOM && typeof requestAnimationFrame !== 'function') {
    warning(false, 'React depends on requestAnimationFrame. Make sure that you load a ' + 'polyfill in older browsers. http://fb.me/react-polyfills');
  }
}

var hasNativePerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';

var now = void 0;
if (hasNativePerformanceNow) {
  now = function () {
    return performance.now();
  };
} else {
  now = function () {
    return Date.now();
  };
}

// TODO: There's no way to cancel, because Fiber doesn't atm.
var rIC = void 0;
var cIC = void 0;

if (!ExecutionEnvironment.canUseDOM) {
  rIC = function (frameCallback) {
    return setTimeout(function () {
      frameCallback({
        timeRemaining: function () {
          return Infinity;
        }
      });
    });
  };
  cIC = function (timeoutID) {
    clearTimeout(timeoutID);
  };
} else if (typeof requestIdleCallback !== 'function' || typeof cancelIdleCallback !== 'function') {
  // Polyfill requestIdleCallback and cancelIdleCallback

  var scheduledRICCallback = null;
  var isIdleScheduled = false;
  var timeoutTime = -1;

  var isAnimationFrameScheduled = false;

  var frameDeadline = 0;
  // We start out assuming that we run at 30fps but then the heuristic tracking
  // will adjust this value to a faster fps if we get more frequent animation
  // frames.
  var previousFrameTime = 33;
  var activeFrameTime = 33;

  var frameDeadlineObject;
  if (hasNativePerformanceNow) {
    frameDeadlineObject = {
      didTimeout: false,
      timeRemaining: function () {
        // We assume that if we have a performance timer that the rAF callback
        // gets a performance timer value. Not sure if this is always true.
        var remaining = frameDeadline - performance.now();
        return remaining > 0 ? remaining : 0;
      }
    };
  } else {
    frameDeadlineObject = {
      didTimeout: false,
      timeRemaining: function () {
        // Fallback to Date.now()
        var remaining = frameDeadline - Date.now();
        return remaining > 0 ? remaining : 0;
      }
    };
  }

  // We use the postMessage trick to defer idle work until after the repaint.
  var messageKey = '__reactIdleCallback$' + Math.random().toString(36).slice(2);
  var idleTick = function (event) {
    if (event.source !== window || event.data !== messageKey) {
      return;
    }

    isIdleScheduled = false;

    var currentTime = now();
    if (frameDeadline - currentTime <= 0) {
      // There's no time left in this idle period. Check if the callback has
      // a timeout and whether it's been exceeded.
      if (timeoutTime !== -1 && timeoutTime <= currentTime) {
        // Exceeded the timeout. Invoke the callback even though there's no
        // time left.
        frameDeadlineObject.didTimeout = true;
      } else {
        // No timeout.
        if (!isAnimationFrameScheduled) {
          // Schedule another animation callback so we retry later.
          isAnimationFrameScheduled = true;
          requestAnimationFrame(animationTick);
        }
        // Exit without invoking the callback.
        return;
      }
    } else {
      // There's still time left in this idle period.
      frameDeadlineObject.didTimeout = false;
    }

    timeoutTime = -1;
    var callback = scheduledRICCallback;
    scheduledRICCallback = null;
    if (callback !== null) {
      callback(frameDeadlineObject);
    }
  };
  // Assumes that we have addEventListener in this environment. Might need
  // something better for old IE.
  window.addEventListener('message', idleTick, false);

  var animationTick = function (rafTime) {
    isAnimationFrameScheduled = false;
    var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
    if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
      if (nextFrameTime < 8) {
        // Defensive coding. We don't support higher frame rates than 120hz.
        // If we get lower than that, it is probably a bug.
        nextFrameTime = 8;
      }
      // If one frame goes long, then the next one can be short to catch up.
      // If two frames are short in a row, then that's an indication that we
      // actually have a higher frame rate than what we're currently optimizing.
      // We adjust our heuristic dynamically accordingly. For example, if we're
      // running on 120hz display or 90hz VR display.
      // Take the max of the two in case one of them was an anomaly due to
      // missed frame deadlines.
      activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
    } else {
      previousFrameTime = nextFrameTime;
    }
    frameDeadline = rafTime + activeFrameTime;
    if (!isIdleScheduled) {
      isIdleScheduled = true;
      window.postMessage(messageKey, '*');
    }
  };

  rIC = function (callback, options) {
    // This assumes that we only schedule one callback at a time because that's
    // how Fiber uses it.
    scheduledRICCallback = callback;
    if (options != null && typeof options.timeout === 'number') {
      timeoutTime = now() + options.timeout;
    }
    if (!isAnimationFrameScheduled) {
      // If rAF didn't already schedule one, we need to schedule a frame.
      // TODO: If this rAF doesn't materialize because the browser throttles, we
      // might want to still have setTimeout trigger rIC as a backup to ensure
      // that we keep performing work.
      isAnimationFrameScheduled = true;
      requestAnimationFrame(animationTick);
    }
    return 0;
  };

  cIC = function () {
    scheduledRICCallback = null;
    isIdleScheduled = false;
    timeoutTime = -1;
  };
} else {
  rIC = window.requestIdleCallback;
  cIC = window.cancelIdleCallback;
}

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

// isAttributeNameSafe() is currently duplicated in DOMMarkupOperations.
// TODO: Find a better place for this.
var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');
var illegalAttributeNameCache = {};
var validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
    return true;
  }
  if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
    return false;
  }
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
    validatedAttributeNameCache[attributeName] = true;
    return true;
  }
  illegalAttributeNameCache[attributeName] = true;
  {
    warning(false, 'Invalid attribute name: `%s`', attributeName);
  }
  return false;
}

// shouldIgnoreValue() is currently duplicated in DOMMarkupOperations.
// TODO: Find a better place for this.
function shouldIgnoreValue(propertyInfo, value) {
  return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
}

/**
 * Operations for dealing with DOM properties.
 */





/**
 * Get the value for a property on a node. Only used in DEV for SSR validation.
 * The "expected" argument is used as a hint of what the expected value is.
 * Some properties have multiple equivalent values.
 */
function getValueForProperty(node, name, expected) {
  {
    var propertyInfo = getPropertyInfo(name);
    if (propertyInfo) {
      var mutationMethod = propertyInfo.mutationMethod;
      if (mutationMethod || propertyInfo.mustUseProperty) {
        return node[propertyInfo.propertyName];
      } else {
        var attributeName = propertyInfo.attributeName;

        var stringValue = null;

        if (propertyInfo.hasOverloadedBooleanValue) {
          if (node.hasAttribute(attributeName)) {
            var value = node.getAttribute(attributeName);
            if (value === '') {
              return true;
            }
            if (shouldIgnoreValue(propertyInfo, expected)) {
              return value;
            }
            if (value === '' + expected) {
              return expected;
            }
            return value;
          }
        } else if (node.hasAttribute(attributeName)) {
          if (shouldIgnoreValue(propertyInfo, expected)) {
            // We had an attribute but shouldn't have had one, so read it
            // for the error message.
            return node.getAttribute(attributeName);
          }
          if (propertyInfo.hasBooleanValue) {
            // If this was a boolean, it doesn't matter what the value is
            // the fact that we have it is the same as the expected.
            return expected;
          }
          // Even if this property uses a namespace we use getAttribute
          // because we assume its namespaced name is the same as our config.
          // To use getAttributeNS we need the local name which we don't have
          // in our config atm.
          stringValue = node.getAttribute(attributeName);
        }

        if (shouldIgnoreValue(propertyInfo, expected)) {
          return stringValue === null ? expected : stringValue;
        } else if (stringValue === '' + expected) {
          return expected;
        } else {
          return stringValue;
        }
      }
    }
  }
}

/**
 * Get the value for a attribute on a node. Only used in DEV for SSR validation.
 * The third argument is used as a hint of what the expected value is. Some
 * attributes have multiple equivalent values.
 */
function getValueForAttribute(node, name, expected) {
  {
    if (!isAttributeNameSafe(name)) {
      return;
    }
    if (!node.hasAttribute(name)) {
      return expected === undefined ? undefined : null;
    }
    var value = node.getAttribute(name);
    if (value === '' + expected) {
      return expected;
    }
    return value;
  }
}

/**
 * Sets the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 * @param {*} value
 */
function setValueForProperty(node, name, value) {
  var propertyInfo = getPropertyInfo(name);

  if (propertyInfo && shouldSetAttribute(name, value)) {
    var mutationMethod = propertyInfo.mutationMethod;
    if (mutationMethod) {
      mutationMethod(node, value);
    } else if (shouldIgnoreValue(propertyInfo, value)) {
      deleteValueForProperty(node, name);
      return;
    } else if (propertyInfo.mustUseProperty) {
      // Contrary to `setAttribute`, object properties are properly
      // `toString`ed by IE8/9.
      node[propertyInfo.propertyName] = value;
    } else {
      var attributeName = propertyInfo.attributeName;
      var namespace = propertyInfo.attributeNamespace;
      // `setAttribute` with objects becomes only `[object]` in IE8/9,
      // ('' + value) makes it output the correct toString()-value.
      if (namespace) {
        node.setAttributeNS(namespace, attributeName, '' + value);
      } else if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
        node.setAttribute(attributeName, '');
      } else {
        node.setAttribute(attributeName, '' + value);
      }
    }
  } else {
    setValueForAttribute(node, name, shouldSetAttribute(name, value) ? value : null);
    return;
  }

  {
    
  }
}

function setValueForAttribute(node, name, value) {
  if (!isAttributeNameSafe(name)) {
    return;
  }
  if (value == null) {
    node.removeAttribute(name);
  } else {
    node.setAttribute(name, '' + value);
  }

  {
    
  }
}

/**
 * Deletes an attributes from a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 */
function deleteValueForAttribute(node, name) {
  node.removeAttribute(name);
}

/**
 * Deletes the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 */
function deleteValueForProperty(node, name) {
  var propertyInfo = getPropertyInfo(name);
  if (propertyInfo) {
    var mutationMethod = propertyInfo.mutationMethod;
    if (mutationMethod) {
      mutationMethod(node, undefined);
    } else if (propertyInfo.mustUseProperty) {
      var propName = propertyInfo.propertyName;
      if (propertyInfo.hasBooleanValue) {
        node[propName] = false;
      } else {
        node[propName] = '';
      }
    } else {
      node.removeAttribute(propertyInfo.attributeName);
    }
  } else {
    node.removeAttribute(name);
  }
}

var ReactControlledValuePropTypes = {
  checkPropTypes: null
};

{
  var hasReadOnlyValue = {
    button: true,
    checkbox: true,
    image: true,
    hidden: true,
    radio: true,
    reset: true,
    submit: true
  };

  var propTypes = {
    value: function (props, propName, componentName) {
      if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
        return null;
      }
      return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
    },
    checked: function (props, propName, componentName) {
      if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
        return null;
      }
      return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
    }
  };

  /**
   * Provide a linked `value` attribute for controlled forms. You should not use
   * this outside of the ReactDOM controlled form components.
   */
  ReactControlledValuePropTypes.checkPropTypes = function (tagName, props, getStack) {
    checkPropTypes(propTypes, props, 'prop', tagName, getStack);
  };
}

// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberOwnerName$2 = ReactDebugCurrentFiber.getCurrentFiberOwnerName;
var getCurrentFiberStackAddendum$3 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

var didWarnValueDefaultValue = false;
var didWarnCheckedDefaultChecked = false;
var didWarnControlledToUncontrolled = false;
var didWarnUncontrolledToControlled = false;

function isControlled(props) {
  var usesChecked = props.type === 'checkbox' || props.type === 'radio';
  return usesChecked ? props.checked != null : props.value != null;
}

/**
 * Implements an <input> host component that allows setting these optional
 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
 *
 * If `checked` or `value` are not supplied (or null/undefined), user actions
 * that affect the checked state or value will trigger updates to the element.
 *
 * If they are supplied (and not null/undefined), the rendered element will not
 * trigger updates to the element. Instead, the props must change in order for
 * the rendered element to be updated.
 *
 * The rendered element will be initialized as unchecked (or `defaultChecked`)
 * with an empty value (or `defaultValue`).
 *
 * See http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
 */

function getHostProps(element, props) {
  var node = element;
  var value = props.value;
  var checked = props.checked;

  var hostProps = _assign({
    // Make sure we set .type before any other properties (setting .value
    // before .type means .value is lost in IE11 and below)
    type: undefined,
    // Make sure we set .step before .value (setting .value before .step
    // means .value is rounded on mount, based upon step precision)
    step: undefined,
    // Make sure we set .min & .max before .value (to ensure proper order
    // in corner cases such as min or max deriving from value, e.g. Issue #7170)
    min: undefined,
    max: undefined
  }, props, {
    defaultChecked: undefined,
    defaultValue: undefined,
    value: value != null ? value : node._wrapperState.initialValue,
    checked: checked != null ? checked : node._wrapperState.initialChecked
  });

  return hostProps;
}

function initWrapperState(element, props) {
  {
    ReactControlledValuePropTypes.checkPropTypes('input', props, getCurrentFiberStackAddendum$3);

    if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnCheckedDefaultChecked) {
      warning(false, '%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', getCurrentFiberOwnerName$2() || 'A component', props.type);
      didWarnCheckedDefaultChecked = true;
    }
    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue) {
      warning(false, '%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', getCurrentFiberOwnerName$2() || 'A component', props.type);
      didWarnValueDefaultValue = true;
    }
  }

  var defaultValue = props.defaultValue;
  var node = element;
  node._wrapperState = {
    initialChecked: props.checked != null ? props.checked : props.defaultChecked,
    initialValue: props.value != null ? props.value : defaultValue,
    controlled: isControlled(props)
  };
}

function updateChecked(element, props) {
  var node = element;
  var checked = props.checked;
  if (checked != null) {
    setValueForProperty(node, 'checked', checked);
  }
}

function updateWrapper(element, props) {
  var node = element;
  {
    var controlled = isControlled(props);

    if (!node._wrapperState.controlled && controlled && !didWarnUncontrolledToControlled) {
      warning(false, 'A component is changing an uncontrolled input of type %s to be controlled. ' + 'Input elements should not switch from uncontrolled to controlled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s', props.type, getCurrentFiberStackAddendum$3());
      didWarnUncontrolledToControlled = true;
    }
    if (node._wrapperState.controlled && !controlled && !didWarnControlledToUncontrolled) {
      warning(false, 'A component is changing a controlled input of type %s to be uncontrolled. ' + 'Input elements should not switch from controlled to uncontrolled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s', props.type, getCurrentFiberStackAddendum$3());
      didWarnControlledToUncontrolled = true;
    }
  }

  updateChecked(element, props);

  var value = props.value;
  if (value != null) {
    if (value === 0 && node.value === '') {
      node.value = '0';
      // Note: IE9 reports a number inputs as 'text', so check props instead.
    } else if (props.type === 'number') {
      // Simulate `input.valueAsNumber`. IE9 does not support it
      var valueAsNumber = parseFloat(node.value) || 0;

      if (
      // eslint-disable-next-line
      value != valueAsNumber ||
      // eslint-disable-next-line
      value == valueAsNumber && node.value != value) {
        // Cast `value` to a string to ensure the value is set correctly. While
        // browsers typically do this as necessary, jsdom doesn't.
        node.value = '' + value;
      }
    } else if (node.value !== '' + value) {
      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      node.value = '' + value;
    }
  } else {
    if (props.value == null && props.defaultValue != null) {
      // In Chrome, assigning defaultValue to certain input types triggers input validation.
      // For number inputs, the display value loses trailing decimal points. For email inputs,
      // Chrome raises "The specified value <x> is not a valid email address".
      //
      // Here we check to see if the defaultValue has actually changed, avoiding these problems
      // when the user is inputting text
      //
      // https://github.com/facebook/react/issues/7253
      if (node.defaultValue !== '' + props.defaultValue) {
        node.defaultValue = '' + props.defaultValue;
      }
    }
    if (props.checked == null && props.defaultChecked != null) {
      node.defaultChecked = !!props.defaultChecked;
    }
  }
}

function postMountWrapper(element, props) {
  var node = element;

  // Detach value from defaultValue. We won't do anything if we're working on
  // submit or reset inputs as those values & defaultValues are linked. They
  // are not resetable nodes so this operation doesn't matter and actually
  // removes browser-default values (eg "Submit Query") when no value is
  // provided.

  switch (props.type) {
    case 'submit':
    case 'reset':
      break;
    case 'color':
    case 'date':
    case 'datetime':
    case 'datetime-local':
    case 'month':
    case 'time':
    case 'week':
      // This fixes the no-show issue on iOS Safari and Android Chrome:
      // https://github.com/facebook/react/issues/7233
      node.value = '';
      node.value = node.defaultValue;
      break;
    default:
      node.value = node.value;
      break;
  }

  // Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
  // this is needed to work around a chrome bug where setting defaultChecked
  // will sometimes influence the value of checked (even after detachment).
  // Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
  // We need to temporarily unset name to avoid disrupting radio button groups.
  var name = node.name;
  if (name !== '') {
    node.name = '';
  }
  node.defaultChecked = !node.defaultChecked;
  node.defaultChecked = !node.defaultChecked;
  if (name !== '') {
    node.name = name;
  }
}

function restoreControlledState$1(element, props) {
  var node = element;
  updateWrapper(node, props);
  updateNamedCousins(node, props);
}

function updateNamedCousins(rootNode, props) {
  var name = props.name;
  if (props.type === 'radio' && name != null) {
    var queryRoot = rootNode;

    while (queryRoot.parentNode) {
      queryRoot = queryRoot.parentNode;
    }

    // If `rootNode.form` was non-null, then we could try `form.elements`,
    // but that sometimes behaves strangely in IE8. We could also try using
    // `form.getElementsByName`, but that will only return direct children
    // and won't include inputs that use the HTML5 `form=` attribute. Since
    // the input might not even be in a form. It might not even be in the
    // document. Let's just use the local `querySelectorAll` to ensure we don't
    // miss anything.
    var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');

    for (var i = 0; i < group.length; i++) {
      var otherNode = group[i];
      if (otherNode === rootNode || otherNode.form !== rootNode.form) {
        continue;
      }
      // This will throw if radio buttons rendered by different copies of React
      // and the same name are rendered into the same form (same as #1939).
      // That's probably okay; we don't support it just as we don't support
      // mixing React radio buttons with non-React ones.
      var otherProps = getFiberCurrentPropsFromNode$1(otherNode);
      !otherProps ? invariant(false, 'ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.') : void 0;

      // We need update the tracked value on the named cousin since the value
      // was changed but the input saw no event or value set
      updateValueIfChanged(otherNode);

      // If this is a controlled radio button group, forcing the input that
      // was previously checked to update will cause it to be come re-checked
      // as appropriate.
      updateWrapper(otherNode, otherProps);
    }
  }
}

function flattenChildren(children) {
  var content = '';

  // Flatten children and warn if they aren't strings or numbers;
  // invalid types are ignored.
  // We can silently skip them because invalid DOM nesting warning
  // catches these cases in Fiber.
  React.Children.forEach(children, function (child) {
    if (child == null) {
      return;
    }
    if (typeof child === 'string' || typeof child === 'number') {
      content += child;
    }
  });

  return content;
}

/**
 * Implements an <option> host component that warns when `selected` is set.
 */

function validateProps(element, props) {
  // TODO (yungsters): Remove support for `selected` in <option>.
  {
    warning(props.selected == null, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.');
  }
}

function postMountWrapper$1(element, props) {
  // value="" should make a value attribute (#6219)
  if (props.value != null) {
    element.setAttribute('value', props.value);
  }
}

function getHostProps$1(element, props) {
  var hostProps = _assign({ children: undefined }, props);
  var content = flattenChildren(props.children);

  if (content) {
    hostProps.children = content;
  }

  return hostProps;
}

// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberOwnerName$3 = ReactDebugCurrentFiber.getCurrentFiberOwnerName;
var getCurrentFiberStackAddendum$4 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;


{
  var didWarnValueDefaultValue$1 = false;
}

function getDeclarationErrorAddendum() {
  var ownerName = getCurrentFiberOwnerName$3();
  if (ownerName) {
    return '\n\nCheck the render method of `' + ownerName + '`.';
  }
  return '';
}

var valuePropNames = ['value', 'defaultValue'];

/**
 * Validation function for `value` and `defaultValue`.
 */
function checkSelectPropTypes(props) {
  ReactControlledValuePropTypes.checkPropTypes('select', props, getCurrentFiberStackAddendum$4);

  for (var i = 0; i < valuePropNames.length; i++) {
    var propName = valuePropNames[i];
    if (props[propName] == null) {
      continue;
    }
    var isArray = Array.isArray(props[propName]);
    if (props.multiple && !isArray) {
      warning(false, 'The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.%s', propName, getDeclarationErrorAddendum());
    } else if (!props.multiple && isArray) {
      warning(false, 'The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.%s', propName, getDeclarationErrorAddendum());
    }
  }
}

function updateOptions(node, multiple, propValue, setDefaultSelected) {
  var options = node.options;

  if (multiple) {
    var selectedValues = propValue;
    var selectedValue = {};
    for (var i = 0; i < selectedValues.length; i++) {
      // Prefix to avoid chaos with special keys.
      selectedValue['$' + selectedValues[i]] = true;
    }
    for (var _i = 0; _i < options.length; _i++) {
      var selected = selectedValue.hasOwnProperty('$' + options[_i].value);
      if (options[_i].selected !== selected) {
        options[_i].selected = selected;
      }
      if (selected && setDefaultSelected) {
        options[_i].defaultSelected = true;
      }
    }
  } else {
    // Do not set `select.value` as exact behavior isn't consistent across all
    // browsers for all cases.
    var _selectedValue = '' + propValue;
    var defaultSelected = null;
    for (var _i2 = 0; _i2 < options.length; _i2++) {
      if (options[_i2].value === _selectedValue) {
        options[_i2].selected = true;
        if (setDefaultSelected) {
          options[_i2].defaultSelected = true;
        }
        return;
      }
      if (defaultSelected === null && !options[_i2].disabled) {
        defaultSelected = options[_i2];
      }
    }
    if (defaultSelected !== null) {
      defaultSelected.selected = true;
    }
  }
}

/**
 * Implements a <select> host component that allows optionally setting the
 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
 * stringable. If `multiple` is true, the prop must be an array of stringables.
 *
 * If `value` is not supplied (or null/undefined), user actions that change the
 * selected option will trigger updates to the rendered options.
 *
 * If it is supplied (and not null/undefined), the rendered options will not
 * update in response to user actions. Instead, the `value` prop must change in
 * order for the rendered options to update.
 *
 * If `defaultValue` is provided, any options with the supplied values will be
 * selected.
 */

function getHostProps$2(element, props) {
  return _assign({}, props, {
    value: undefined
  });
}

function initWrapperState$1(element, props) {
  var node = element;
  {
    checkSelectPropTypes(props);
  }

  var value = props.value;
  node._wrapperState = {
    initialValue: value != null ? value : props.defaultValue,
    wasMultiple: !!props.multiple
  };

  {
    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue$1) {
      warning(false, 'Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
      didWarnValueDefaultValue$1 = true;
    }
  }
}

function postMountWrapper$2(element, props) {
  var node = element;
  node.multiple = !!props.multiple;
  var value = props.value;
  if (value != null) {
    updateOptions(node, !!props.multiple, value, false);
  } else if (props.defaultValue != null) {
    updateOptions(node, !!props.multiple, props.defaultValue, true);
  }
}

function postUpdateWrapper(element, props) {
  var node = element;
  // After the initial mount, we control selected-ness manually so don't pass
  // this value down
  node._wrapperState.initialValue = undefined;

  var wasMultiple = node._wrapperState.wasMultiple;
  node._wrapperState.wasMultiple = !!props.multiple;

  var value = props.value;
  if (value != null) {
    updateOptions(node, !!props.multiple, value, false);
  } else if (wasMultiple !== !!props.multiple) {
    // For simplicity, reapply `defaultValue` if `multiple` is toggled.
    if (props.defaultValue != null) {
      updateOptions(node, !!props.multiple, props.defaultValue, true);
    } else {
      // Revert the select back to its default unselected state.
      updateOptions(node, !!props.multiple, props.multiple ? [] : '', false);
    }
  }
}

function restoreControlledState$2(element, props) {
  var node = element;
  var value = props.value;

  if (value != null) {
    updateOptions(node, !!props.multiple, value, false);
  }
}

// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberStackAddendum$5 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

var didWarnValDefaultVal = false;

/**
 * Implements a <textarea> host component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */

function getHostProps$3(element, props) {
  var node = element;
  !(props.dangerouslySetInnerHTML == null) ? invariant(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : void 0;

  // Always set children to the same thing. In IE9, the selection range will
  // get reset if `textContent` is mutated.  We could add a check in setTextContent
  // to only set the value if/when the value differs from the node value (which would
  // completely solve this IE9 bug), but Sebastian+Sophie seemed to like this
  // solution. The value can be a boolean or object so that's why it's forced
  // to be a string.
  var hostProps = _assign({}, props, {
    value: undefined,
    defaultValue: undefined,
    children: '' + node._wrapperState.initialValue
  });

  return hostProps;
}

function initWrapperState$2(element, props) {
  var node = element;
  {
    ReactControlledValuePropTypes.checkPropTypes('textarea', props, getCurrentFiberStackAddendum$5);
    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValDefaultVal) {
      warning(false, 'Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
      didWarnValDefaultVal = true;
    }
  }

  var initialValue = props.value;

  // Only bother fetching default value if we're going to use it
  if (initialValue == null) {
    var defaultValue = props.defaultValue;
    // TODO (yungsters): Remove support for children content in <textarea>.
    var children = props.children;
    if (children != null) {
      {
        warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.');
      }
      !(defaultValue == null) ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : void 0;
      if (Array.isArray(children)) {
        !(children.length <= 1) ? invariant(false, '<textarea> can only have at most one child.') : void 0;
        children = children[0];
      }

      defaultValue = '' + children;
    }
    if (defaultValue == null) {
      defaultValue = '';
    }
    initialValue = defaultValue;
  }

  node._wrapperState = {
    initialValue: '' + initialValue
  };
}

function updateWrapper$1(element, props) {
  var node = element;
  var value = props.value;
  if (value != null) {
    // Cast `value` to a string to ensure the value is set correctly. While
    // browsers typically do this as necessary, jsdom doesn't.
    var newValue = '' + value;

    // To avoid side effects (such as losing text selection), only set value if changed
    if (newValue !== node.value) {
      node.value = newValue;
    }
    if (props.defaultValue == null) {
      node.defaultValue = newValue;
    }
  }
  if (props.defaultValue != null) {
    node.defaultValue = props.defaultValue;
  }
}

function postMountWrapper$3(element, props) {
  var node = element;
  // This is in postMount because we need access to the DOM node, which is not
  // available until after the component has mounted.
  var textContent = node.textContent;

  // Only set node.value if textContent is equal to the expected
  // initial value. In IE10/IE11 there is a bug where the placeholder attribute
  // will populate textContent as well.
  // https://developer.microsoft.com/microsoft-edge/platform/issues/101525/
  if (textContent === node._wrapperState.initialValue) {
    node.value = textContent;
  }
}

function restoreControlledState$3(element, props) {
  // DOM component is still mounted; update
  updateWrapper$1(element, props);
}

var HTML_NAMESPACE$1 = 'http://www.w3.org/1999/xhtml';
var MATH_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

var Namespaces = {
  html: HTML_NAMESPACE$1,
  mathml: MATH_NAMESPACE,
  svg: SVG_NAMESPACE
};

// Assumes there is no parent namespace.
function getIntrinsicNamespace(type) {
  switch (type) {
    case 'svg':
      return SVG_NAMESPACE;
    case 'math':
      return MATH_NAMESPACE;
    default:
      return HTML_NAMESPACE$1;
  }
}

function getChildNamespace(parentNamespace, type) {
  if (parentNamespace == null || parentNamespace === HTML_NAMESPACE$1) {
    // No (or default) parent namespace: potential entry point.
    return getIntrinsicNamespace(type);
  }
  if (parentNamespace === SVG_NAMESPACE && type === 'foreignObject') {
    // We're leaving SVG.
    return HTML_NAMESPACE$1;
  }
  // By default, pass namespace below.
  return parentNamespace;
}

/* globals MSApp */

/**
 * Create a function which has 'unsafe' privileges (required by windows8 apps)
 */
var createMicrosoftUnsafeLocalFunction = function (func) {
  if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
    return function (arg0, arg1, arg2, arg3) {
      MSApp.execUnsafeLocalFunction(function () {
        return func(arg0, arg1, arg2, arg3);
      });
    };
  } else {
    return func;
  }
};

// SVG temp container for IE lacking innerHTML
var reusableSVGContainer = void 0;

/**
 * Set the innerHTML property of a node
 *
 * @param {DOMElement} node
 * @param {string} html
 * @internal
 */
var setInnerHTML = createMicrosoftUnsafeLocalFunction(function (node, html) {
  // IE does not have innerHTML for SVG nodes, so instead we inject the
  // new markup in a temp node and then move the child nodes across into
  // the target node

  if (node.namespaceURI === Namespaces.svg && !('innerHTML' in node)) {
    reusableSVGContainer = reusableSVGContainer || document.createElement('div');
    reusableSVGContainer.innerHTML = '<svg>' + html + '</svg>';
    var svgNode = reusableSVGContainer.firstChild;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
    while (svgNode.firstChild) {
      node.appendChild(svgNode.firstChild);
    }
  } else {
    node.innerHTML = html;
  }
});

/**
 * Set the textContent property of a node, ensuring that whitespace is preserved
 * even in IE8. innerText is a poor substitute for textContent and, among many
 * issues, inserts <br> instead of the literal newline chars. innerHTML behaves
 * as it should.
 *
 * @param {DOMElement} node
 * @param {string} text
 * @internal
 */
var setTextContent = function (node, text) {
  if (text) {
    var firstChild = node.firstChild;

    if (firstChild && firstChild === node.lastChild && firstChild.nodeType === TEXT_NODE) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
};

/**
 * CSS properties which accept numbers but are not in units of "px".
 */
var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(name, value, isCustomProperty) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
    return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
  }

  return ('' + value).trim();
}

var warnValidStyle = emptyFunction;

{
  // 'msTransform' is correct, but the other prefixes should be capitalized
  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

  // style values shouldn't contain a semicolon
  var badStyleValueWithSemicolonPattern = /;\s*$/;

  var warnedStyleNames = {};
  var warnedStyleValues = {};
  var warnedForNaNValue = false;
  var warnedForInfinityValue = false;

  var warnHyphenatedStyleName = function (name, getStack) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    warning(false, 'Unsupported style property %s. Did you mean %s?%s', name, camelizeStyleName(name), getStack());
  };

  var warnBadVendoredStyleName = function (name, getStack) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    warning(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), getStack());
  };

  var warnStyleValueWithSemicolon = function (name, value, getStack) {
    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
      return;
    }

    warnedStyleValues[value] = true;
    warning(false, "Style property values shouldn't contain a semicolon. " + 'Try "%s: %s" instead.%s', name, value.replace(badStyleValueWithSemicolonPattern, ''), getStack());
  };

  var warnStyleValueIsNaN = function (name, value, getStack) {
    if (warnedForNaNValue) {
      return;
    }

    warnedForNaNValue = true;
    warning(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, getStack());
  };

  var warnStyleValueIsInfinity = function (name, value, getStack) {
    if (warnedForInfinityValue) {
      return;
    }

    warnedForInfinityValue = true;
    warning(false, '`Infinity` is an invalid value for the `%s` css style property.%s', name, getStack());
  };

  warnValidStyle = function (name, value, getStack) {
    if (name.indexOf('-') > -1) {
      warnHyphenatedStyleName(name, getStack);
    } else if (badVendoredStyleNamePattern.test(name)) {
      warnBadVendoredStyleName(name, getStack);
    } else if (badStyleValueWithSemicolonPattern.test(value)) {
      warnStyleValueWithSemicolon(name, value, getStack);
    }

    if (typeof value === 'number') {
      if (isNaN(value)) {
        warnStyleValueIsNaN(name, value, getStack);
      } else if (!isFinite(value)) {
        warnStyleValueIsInfinity(name, value, getStack);
      }
    }
  };
}

var warnValidStyle$1 = warnValidStyle;

/**
 * Operations for dealing with CSS properties.
 */

/**
 * This creates a string that is expected to be equivalent to the style
 * attribute generated by server-side rendering. It by-passes warnings and
 * security checks so it's not safe to use this value for anything other than
 * comparison. It is only used in DEV for SSR validation.
 */
function createDangerousStringForStyles(styles) {
  {
    var serialized = '';
    var delimiter = '';
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var styleValue = styles[styleName];
      if (styleValue != null) {
        var isCustomProperty = styleName.indexOf('--') === 0;
        serialized += delimiter + hyphenateStyleName(styleName) + ':';
        serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty);

        delimiter = ';';
      }
    }
    return serialized || null;
  }
}

/**
 * Sets the value for multiple styles on a node.  If a value is specified as
 * '' (empty string), the corresponding style property will be unset.
 *
 * @param {DOMElement} node
 * @param {object} styles
 */
function setValueForStyles(node, styles, getStack) {
  var style = node.style;
  for (var styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }
    var isCustomProperty = styleName.indexOf('--') === 0;
    {
      if (!isCustomProperty) {
        warnValidStyle$1(styleName, styles[styleName], getStack);
      }
    }
    var styleValue = dangerousStyleValue(styleName, styles[styleName], isCustomProperty);
    if (styleName === 'float') {
      styleName = 'cssFloat';
    }
    if (isCustomProperty) {
      style.setProperty(styleName, styleValue);
    } else {
      style[styleName] = styleValue;
    }
  }
}

// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.

var omittedCloseTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

// For HTML, certain tags cannot have children. This has the same purpose as
// `omittedCloseTags` except that `menuitem` should still have its closing tag.

var voidElementTags = _assign({
  menuitem: true
}, omittedCloseTags);

var HTML$1 = '__html';

function assertValidProps(tag, props, getStack) {
  if (!props) {
    return;
  }
  // Note the use of `==` which checks for null or undefined.
  if (voidElementTags[tag]) {
    !(props.children == null && props.dangerouslySetInnerHTML == null) ? invariant(false, '%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s', tag, getStack()) : void 0;
  }
  if (props.dangerouslySetInnerHTML != null) {
    !(props.children == null) ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : void 0;
    !(typeof props.dangerouslySetInnerHTML === 'object' && HTML$1 in props.dangerouslySetInnerHTML) ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.') : void 0;
  }
  {
    warning(props.suppressContentEditableWarning || !props.contentEditable || props.children == null, 'A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.%s', getStack());
  }
  !(props.style == null || typeof props.style === 'object') ? invariant(false, 'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s', getStack()) : void 0;
}

function isCustomComponent(tagName, props) {
  if (tagName.indexOf('-') === -1) {
    return typeof props.is === 'string';
  }
  switch (tagName) {
    // These are reserved SVG and MathML elements.
    // We don't mind this whitelist too much because we expect it to never grow.
    // The alternative is to track the namespace in a few places which is convoluted.
    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return false;
    default:
      return true;
  }
}

var ariaProperties = {
  'aria-current': 0, // state
  'aria-details': 0,
  'aria-disabled': 0, // state
  'aria-hidden': 0, // state
  'aria-invalid': 0, // state
  'aria-keyshortcuts': 0,
  'aria-label': 0,
  'aria-roledescription': 0,
  // Widget Attributes
  'aria-autocomplete': 0,
  'aria-checked': 0,
  'aria-expanded': 0,
  'aria-haspopup': 0,
  'aria-level': 0,
  'aria-modal': 0,
  'aria-multiline': 0,
  'aria-multiselectable': 0,
  'aria-orientation': 0,
  'aria-placeholder': 0,
  'aria-pressed': 0,
  'aria-readonly': 0,
  'aria-required': 0,
  'aria-selected': 0,
  'aria-sort': 0,
  'aria-valuemax': 0,
  'aria-valuemin': 0,
  'aria-valuenow': 0,
  'aria-valuetext': 0,
  // Live Region Attributes
  'aria-atomic': 0,
  'aria-busy': 0,
  'aria-live': 0,
  'aria-relevant': 0,
  // Drag-and-Drop Attributes
  'aria-dropeffect': 0,
  'aria-grabbed': 0,
  // Relationship Attributes
  'aria-activedescendant': 0,
  'aria-colcount': 0,
  'aria-colindex': 0,
  'aria-colspan': 0,
  'aria-controls': 0,
  'aria-describedby': 0,
  'aria-errormessage': 0,
  'aria-flowto': 0,
  'aria-labelledby': 0,
  'aria-owns': 0,
  'aria-posinset': 0,
  'aria-rowcount': 0,
  'aria-rowindex': 0,
  'aria-rowspan': 0,
  'aria-setsize': 0
};

var warnedProperties = {};
var rARIA = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
var rARIACamel = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

var hasOwnProperty = Object.prototype.hasOwnProperty;

function getStackAddendum() {
  var stack = ReactDebugCurrentFrame.getStackAddendum();
  return stack != null ? stack : '';
}

function validateProperty(tagName, name) {
  if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name]) {
    return true;
  }

  if (rARIACamel.test(name)) {
    var ariaName = 'aria-' + name.slice(4).toLowerCase();
    var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;

    // If this is an aria-* attribute, but is not listed in the known DOM
    // DOM properties, then it is an invalid aria-* attribute.
    if (correctName == null) {
      warning(false, 'Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.%s', name, getStackAddendum());
      warnedProperties[name] = true;
      return true;
    }
    // aria-* attributes should be lowercase; suggest the lowercase version.
    if (name !== correctName) {
      warning(false, 'Invalid ARIA attribute `%s`. Did you mean `%s`?%s', name, correctName, getStackAddendum());
      warnedProperties[name] = true;
      return true;
    }
  }

  if (rARIA.test(name)) {
    var lowerCasedName = name.toLowerCase();
    var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;

    // If this is an aria-* attribute, but is not listed in the known DOM
    // DOM properties, then it is an invalid aria-* attribute.
    if (standardName == null) {
      warnedProperties[name] = true;
      return false;
    }
    // aria-* attributes should be lowercase; suggest the lowercase version.
    if (name !== standardName) {
      warning(false, 'Unknown ARIA attribute `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum());
      warnedProperties[name] = true;
      return true;
    }
  }

  return true;
}

function warnInvalidARIAProps(type, props) {
  var invalidProps = [];

  for (var key in props) {
    var isValid = validateProperty(type, key);
    if (!isValid) {
      invalidProps.push(key);
    }
  }

  var unknownPropString = invalidProps.map(function (prop) {
    return '`' + prop + '`';
  }).join(', ');

  if (invalidProps.length === 1) {
    warning(false, 'Invalid aria prop %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum());
  } else if (invalidProps.length > 1) {
    warning(false, 'Invalid aria props %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum());
  }
}

function validateProperties(type, props) {
  if (isCustomComponent(type, props)) {
    return;
  }
  warnInvalidARIAProps(type, props);
}

var didWarnValueNull = false;

function getStackAddendum$1() {
  var stack = ReactDebugCurrentFrame.getStackAddendum();
  return stack != null ? stack : '';
}

function validateProperties$1(type, props) {
  if (type !== 'input' && type !== 'textarea' && type !== 'select') {
    return;
  }

  if (props != null && props.value === null && !didWarnValueNull) {
    didWarnValueNull = true;
    if (type === 'select' && props.multiple) {
      warning(false, '`value` prop on `%s` should not be null. ' + 'Consider using an empty array when `multiple` is set to `true` ' + 'to clear the component or `undefined` for uncontrolled components.%s', type, getStackAddendum$1());
    } else {
      warning(false, '`value` prop on `%s` should not be null. ' + 'Consider using an empty string to clear the component or `undefined` ' + 'for uncontrolled components.%s', type, getStackAddendum$1());
    }
  }
}

// When adding attributes to the HTML or SVG whitelist, be sure to
// also add them to this module to ensure casing and incorrect name
// warnings.
var possibleStandardNames = {
  // HTML
  accept: 'accept',
  acceptcharset: 'acceptCharset',
  'accept-charset': 'acceptCharset',
  accesskey: 'accessKey',
  action: 'action',
  allowfullscreen: 'allowFullScreen',
  alt: 'alt',
  as: 'as',
  async: 'async',
  autocapitalize: 'autoCapitalize',
  autocomplete: 'autoComplete',
  autocorrect: 'autoCorrect',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  autosave: 'autoSave',
  capture: 'capture',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  challenge: 'challenge',
  charset: 'charSet',
  checked: 'checked',
  children: 'children',
  cite: 'cite',
  'class': 'className',
  classid: 'classID',
  classname: 'className',
  cols: 'cols',
  colspan: 'colSpan',
  content: 'content',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  controls: 'controls',
  controlslist: 'controlsList',
  coords: 'coords',
  crossorigin: 'crossOrigin',
  dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
  data: 'data',
  datetime: 'dateTime',
  'default': 'default',
  defaultchecked: 'defaultChecked',
  defaultvalue: 'defaultValue',
  defer: 'defer',
  dir: 'dir',
  disabled: 'disabled',
  download: 'download',
  draggable: 'draggable',
  enctype: 'encType',
  'for': 'htmlFor',
  form: 'form',
  formmethod: 'formMethod',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  headers: 'headers',
  height: 'height',
  hidden: 'hidden',
  high: 'high',
  href: 'href',
  hreflang: 'hrefLang',
  htmlfor: 'htmlFor',
  httpequiv: 'httpEquiv',
  'http-equiv': 'httpEquiv',
  icon: 'icon',
  id: 'id',
  innerhtml: 'innerHTML',
  inputmode: 'inputMode',
  integrity: 'integrity',
  is: 'is',
  itemid: 'itemID',
  itemprop: 'itemProp',
  itemref: 'itemRef',
  itemscope: 'itemScope',
  itemtype: 'itemType',
  keyparams: 'keyParams',
  keytype: 'keyType',
  kind: 'kind',
  label: 'label',
  lang: 'lang',
  list: 'list',
  loop: 'loop',
  low: 'low',
  manifest: 'manifest',
  marginwidth: 'marginWidth',
  marginheight: 'marginHeight',
  max: 'max',
  maxlength: 'maxLength',
  media: 'media',
  mediagroup: 'mediaGroup',
  method: 'method',
  min: 'min',
  minlength: 'minLength',
  multiple: 'multiple',
  muted: 'muted',
  name: 'name',
  nonce: 'nonce',
  novalidate: 'noValidate',
  open: 'open',
  optimum: 'optimum',
  pattern: 'pattern',
  placeholder: 'placeholder',
  playsinline: 'playsInline',
  poster: 'poster',
  preload: 'preload',
  profile: 'profile',
  radiogroup: 'radioGroup',
  readonly: 'readOnly',
  referrerpolicy: 'referrerPolicy',
  rel: 'rel',
  required: 'required',
  reversed: 'reversed',
  role: 'role',
  rows: 'rows',
  rowspan: 'rowSpan',
  sandbox: 'sandbox',
  scope: 'scope',
  scoped: 'scoped',
  scrolling: 'scrolling',
  seamless: 'seamless',
  selected: 'selected',
  shape: 'shape',
  size: 'size',
  sizes: 'sizes',
  span: 'span',
  spellcheck: 'spellCheck',
  src: 'src',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  start: 'start',
  step: 'step',
  style: 'style',
  summary: 'summary',
  tabindex: 'tabIndex',
  target: 'target',
  title: 'title',
  type: 'type',
  usemap: 'useMap',
  value: 'value',
  width: 'width',
  wmode: 'wmode',
  wrap: 'wrap',

  // SVG
  about: 'about',
  accentheight: 'accentHeight',
  'accent-height': 'accentHeight',
  accumulate: 'accumulate',
  additive: 'additive',
  alignmentbaseline: 'alignmentBaseline',
  'alignment-baseline': 'alignmentBaseline',
  allowreorder: 'allowReorder',
  alphabetic: 'alphabetic',
  amplitude: 'amplitude',
  arabicform: 'arabicForm',
  'arabic-form': 'arabicForm',
  ascent: 'ascent',
  attributename: 'attributeName',
  attributetype: 'attributeType',
  autoreverse: 'autoReverse',
  azimuth: 'azimuth',
  basefrequency: 'baseFrequency',
  baselineshift: 'baselineShift',
  'baseline-shift': 'baselineShift',
  baseprofile: 'baseProfile',
  bbox: 'bbox',
  begin: 'begin',
  bias: 'bias',
  by: 'by',
  calcmode: 'calcMode',
  capheight: 'capHeight',
  'cap-height': 'capHeight',
  clip: 'clip',
  clippath: 'clipPath',
  'clip-path': 'clipPath',
  clippathunits: 'clipPathUnits',
  cliprule: 'clipRule',
  'clip-rule': 'clipRule',
  color: 'color',
  colorinterpolation: 'colorInterpolation',
  'color-interpolation': 'colorInterpolation',
  colorinterpolationfilters: 'colorInterpolationFilters',
  'color-interpolation-filters': 'colorInterpolationFilters',
  colorprofile: 'colorProfile',
  'color-profile': 'colorProfile',
  colorrendering: 'colorRendering',
  'color-rendering': 'colorRendering',
  contentscripttype: 'contentScriptType',
  contentstyletype: 'contentStyleType',
  cursor: 'cursor',
  cx: 'cx',
  cy: 'cy',
  d: 'd',
  datatype: 'datatype',
  decelerate: 'decelerate',
  descent: 'descent',
  diffuseconstant: 'diffuseConstant',
  direction: 'direction',
  display: 'display',
  divisor: 'divisor',
  dominantbaseline: 'dominantBaseline',
  'dominant-baseline': 'dominantBaseline',
  dur: 'dur',
  dx: 'dx',
  dy: 'dy',
  edgemode: 'edgeMode',
  elevation: 'elevation',
  enablebackground: 'enableBackground',
  'enable-background': 'enableBackground',
  end: 'end',
  exponent: 'exponent',
  externalresourcesrequired: 'externalResourcesRequired',
  fill: 'fill',
  fillopacity: 'fillOpacity',
  'fill-opacity': 'fillOpacity',
  fillrule: 'fillRule',
  'fill-rule': 'fillRule',
  filter: 'filter',
  filterres: 'filterRes',
  filterunits: 'filterUnits',
  floodopacity: 'floodOpacity',
  'flood-opacity': 'floodOpacity',
  floodcolor: 'floodColor',
  'flood-color': 'floodColor',
  focusable: 'focusable',
  fontfamily: 'fontFamily',
  'font-family': 'fontFamily',
  fontsize: 'fontSize',
  'font-size': 'fontSize',
  fontsizeadjust: 'fontSizeAdjust',
  'font-size-adjust': 'fontSizeAdjust',
  fontstretch: 'fontStretch',
  'font-stretch': 'fontStretch',
  fontstyle: 'fontStyle',
  'font-style': 'fontStyle',
  fontvariant: 'fontVariant',
  'font-variant': 'fontVariant',
  fontweight: 'fontWeight',
  'font-weight': 'fontWeight',
  format: 'format',
  from: 'from',
  fx: 'fx',
  fy: 'fy',
  g1: 'g1',
  g2: 'g2',
  glyphname: 'glyphName',
  'glyph-name': 'glyphName',
  glyphorientationhorizontal: 'glyphOrientationHorizontal',
  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
  glyphorientationvertical: 'glyphOrientationVertical',
  'glyph-orientation-vertical': 'glyphOrientationVertical',
  glyphref: 'glyphRef',
  gradienttransform: 'gradientTransform',
  gradientunits: 'gradientUnits',
  hanging: 'hanging',
  horizadvx: 'horizAdvX',
  'horiz-adv-x': 'horizAdvX',
  horizoriginx: 'horizOriginX',
  'horiz-origin-x': 'horizOriginX',
  ideographic: 'ideographic',
  imagerendering: 'imageRendering',
  'image-rendering': 'imageRendering',
  in2: 'in2',
  'in': 'in',
  inlist: 'inlist',
  intercept: 'intercept',
  k1: 'k1',
  k2: 'k2',
  k3: 'k3',
  k4: 'k4',
  k: 'k',
  kernelmatrix: 'kernelMatrix',
  kernelunitlength: 'kernelUnitLength',
  kerning: 'kerning',
  keypoints: 'keyPoints',
  keysplines: 'keySplines',
  keytimes: 'keyTimes',
  lengthadjust: 'lengthAdjust',
  letterspacing: 'letterSpacing',
  'letter-spacing': 'letterSpacing',
  lightingcolor: 'lightingColor',
  'lighting-color': 'lightingColor',
  limitingconeangle: 'limitingConeAngle',
  local: 'local',
  markerend: 'markerEnd',
  'marker-end': 'markerEnd',
  markerheight: 'markerHeight',
  markermid: 'markerMid',
  'marker-mid': 'markerMid',
  markerstart: 'markerStart',
  'marker-start': 'markerStart',
  markerunits: 'markerUnits',
  markerwidth: 'markerWidth',
  mask: 'mask',
  maskcontentunits: 'maskContentUnits',
  maskunits: 'maskUnits',
  mathematical: 'mathematical',
  mode: 'mode',
  numoctaves: 'numOctaves',
  offset: 'offset',
  opacity: 'opacity',
  operator: 'operator',
  order: 'order',
  orient: 'orient',
  orientation: 'orientation',
  origin: 'origin',
  overflow: 'overflow',
  overlineposition: 'overlinePosition',
  'overline-position': 'overlinePosition',
  overlinethickness: 'overlineThickness',
  'overline-thickness': 'overlineThickness',
  paintorder: 'paintOrder',
  'paint-order': 'paintOrder',
  panose1: 'panose1',
  'panose-1': 'panose1',
  pathlength: 'pathLength',
  patterncontentunits: 'patternContentUnits',
  patterntransform: 'patternTransform',
  patternunits: 'patternUnits',
  pointerevents: 'pointerEvents',
  'pointer-events': 'pointerEvents',
  points: 'points',
  pointsatx: 'pointsAtX',
  pointsaty: 'pointsAtY',
  pointsatz: 'pointsAtZ',
  prefix: 'prefix',
  preservealpha: 'preserveAlpha',
  preserveaspectratio: 'preserveAspectRatio',
  primitiveunits: 'primitiveUnits',
  property: 'property',
  r: 'r',
  radius: 'radius',
  refx: 'refX',
  refy: 'refY',
  renderingintent: 'renderingIntent',
  'rendering-intent': 'renderingIntent',
  repeatcount: 'repeatCount',
  repeatdur: 'repeatDur',
  requiredextensions: 'requiredExtensions',
  requiredfeatures: 'requiredFeatures',
  resource: 'resource',
  restart: 'restart',
  result: 'result',
  results: 'results',
  rotate: 'rotate',
  rx: 'rx',
  ry: 'ry',
  scale: 'scale',
  security: 'security',
  seed: 'seed',
  shaperendering: 'shapeRendering',
  'shape-rendering': 'shapeRendering',
  slope: 'slope',
  spacing: 'spacing',
  specularconstant: 'specularConstant',
  specularexponent: 'specularExponent',
  speed: 'speed',
  spreadmethod: 'spreadMethod',
  startoffset: 'startOffset',
  stddeviation: 'stdDeviation',
  stemh: 'stemh',
  stemv: 'stemv',
  stitchtiles: 'stitchTiles',
  stopcolor: 'stopColor',
  'stop-color': 'stopColor',
  stopopacity: 'stopOpacity',
  'stop-opacity': 'stopOpacity',
  strikethroughposition: 'strikethroughPosition',
  'strikethrough-position': 'strikethroughPosition',
  strikethroughthickness: 'strikethroughThickness',
  'strikethrough-thickness': 'strikethroughThickness',
  string: 'string',
  stroke: 'stroke',
  strokedasharray: 'strokeDasharray',
  'stroke-dasharray': 'strokeDasharray',
  strokedashoffset: 'strokeDashoffset',
  'stroke-dashoffset': 'strokeDashoffset',
  strokelinecap: 'strokeLinecap',
  'stroke-linecap': 'strokeLinecap',
  strokelinejoin: 'strokeLinejoin',
  'stroke-linejoin': 'strokeLinejoin',
  strokemiterlimit: 'strokeMiterlimit',
  'stroke-miterlimit': 'strokeMiterlimit',
  strokewidth: 'strokeWidth',
  'stroke-width': 'strokeWidth',
  strokeopacity: 'strokeOpacity',
  'stroke-opacity': 'strokeOpacity',
  suppresscontenteditablewarning: 'suppressContentEditableWarning',
  suppresshydrationwarning: 'suppressHydrationWarning',
  surfacescale: 'surfaceScale',
  systemlanguage: 'systemLanguage',
  tablevalues: 'tableValues',
  targetx: 'targetX',
  targety: 'targetY',
  textanchor: 'textAnchor',
  'text-anchor': 'textAnchor',
  textdecoration: 'textDecoration',
  'text-decoration': 'textDecoration',
  textlength: 'textLength',
  textrendering: 'textRendering',
  'text-rendering': 'textRendering',
  to: 'to',
  transform: 'transform',
  'typeof': 'typeof',
  u1: 'u1',
  u2: 'u2',
  underlineposition: 'underlinePosition',
  'underline-position': 'underlinePosition',
  underlinethickness: 'underlineThickness',
  'underline-thickness': 'underlineThickness',
  unicode: 'unicode',
  unicodebidi: 'unicodeBidi',
  'unicode-bidi': 'unicodeBidi',
  unicoderange: 'unicodeRange',
  'unicode-range': 'unicodeRange',
  unitsperem: 'unitsPerEm',
  'units-per-em': 'unitsPerEm',
  unselectable: 'unselectable',
  valphabetic: 'vAlphabetic',
  'v-alphabetic': 'vAlphabetic',
  values: 'values',
  vectoreffect: 'vectorEffect',
  'vector-effect': 'vectorEffect',
  version: 'version',
  vertadvy: 'vertAdvY',
  'vert-adv-y': 'vertAdvY',
  vertoriginx: 'vertOriginX',
  'vert-origin-x': 'vertOriginX',
  vertoriginy: 'vertOriginY',
  'vert-origin-y': 'vertOriginY',
  vhanging: 'vHanging',
  'v-hanging': 'vHanging',
  videographic: 'vIdeographic',
  'v-ideographic': 'vIdeographic',
  viewbox: 'viewBox',
  viewtarget: 'viewTarget',
  visibility: 'visibility',
  vmathematical: 'vMathematical',
  'v-mathematical': 'vMathematical',
  vocab: 'vocab',
  widths: 'widths',
  wordspacing: 'wordSpacing',
  'word-spacing': 'wordSpacing',
  writingmode: 'writingMode',
  'writing-mode': 'writingMode',
  x1: 'x1',
  x2: 'x2',
  x: 'x',
  xchannelselector: 'xChannelSelector',
  xheight: 'xHeight',
  'x-height': 'xHeight',
  xlinkactuate: 'xlinkActuate',
  'xlink:actuate': 'xlinkActuate',
  xlinkarcrole: 'xlinkArcrole',
  'xlink:arcrole': 'xlinkArcrole',
  xlinkhref: 'xlinkHref',
  'xlink:href': 'xlinkHref',
  xlinkrole: 'xlinkRole',
  'xlink:role': 'xlinkRole',
  xlinkshow: 'xlinkShow',
  'xlink:show': 'xlinkShow',
  xlinktitle: 'xlinkTitle',
  'xlink:title': 'xlinkTitle',
  xlinktype: 'xlinkType',
  'xlink:type': 'xlinkType',
  xmlbase: 'xmlBase',
  'xml:base': 'xmlBase',
  xmllang: 'xmlLang',
  'xml:lang': 'xmlLang',
  xmlns: 'xmlns',
  'xml:space': 'xmlSpace',
  xmlnsxlink: 'xmlnsXlink',
  'xmlns:xlink': 'xmlnsXlink',
  xmlspace: 'xmlSpace',
  y1: 'y1',
  y2: 'y2',
  y: 'y',
  ychannelselector: 'yChannelSelector',
  z: 'z',
  zoomandpan: 'zoomAndPan'
};

function getStackAddendum$2() {
  var stack = ReactDebugCurrentFrame.getStackAddendum();
  return stack != null ? stack : '';
}

{
  var warnedProperties$1 = {};
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var EVENT_NAME_REGEX = /^on./;
  var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
  var rARIA$1 = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
  var rARIACamel$1 = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

  var validateProperty$1 = function (tagName, name, value, canUseEventSystem) {
    if (hasOwnProperty$1.call(warnedProperties$1, name) && warnedProperties$1[name]) {
      return true;
    }

    var lowerCasedName = name.toLowerCase();
    if (lowerCasedName === 'onfocusin' || lowerCasedName === 'onfocusout') {
      warning(false, 'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.');
      warnedProperties$1[name] = true;
      return true;
    }

    // We can't rely on the event system being injected on the server.
    if (canUseEventSystem) {
      if (registrationNameModules.hasOwnProperty(name)) {
        return true;
      }
      var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
      if (registrationName != null) {
        warning(false, 'Invalid event handler property `%s`. Did you mean `%s`?%s', name, registrationName, getStackAddendum$2());
        warnedProperties$1[name] = true;
        return true;
      }
      if (EVENT_NAME_REGEX.test(name)) {
        warning(false, 'Unknown event handler property `%s`. It will be ignored.%s', name, getStackAddendum$2());
        warnedProperties$1[name] = true;
        return true;
      }
    } else if (EVENT_NAME_REGEX.test(name)) {
      // If no event plugins have been injected, we are in a server environment.
      // So we can't tell if the event name is correct for sure, but we can filter
      // out known bad ones like `onclick`. We can't suggest a specific replacement though.
      if (INVALID_EVENT_NAME_REGEX.test(name)) {
        warning(false, 'Invalid event handler property `%s`. ' + 'React events use the camelCase naming convention, for example `onClick`.%s', name, getStackAddendum$2());
      }
      warnedProperties$1[name] = true;
      return true;
    }

    // Let the ARIA attribute hook validate ARIA attributes
    if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
      return true;
    }

    if (lowerCasedName === 'innerhtml') {
      warning(false, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.');
      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName === 'aria') {
      warning(false, 'The `aria` attribute is reserved for future use in React. ' + 'Pass individual `aria-` attributes instead.');
      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName === 'is' && value !== null && value !== undefined && typeof value !== 'string') {
      warning(false, 'Received a `%s` for a string attribute `is`. If this is expected, cast ' + 'the value to a string.%s', typeof value, getStackAddendum$2());
      warnedProperties$1[name] = true;
      return true;
    }

    if (typeof value === 'number' && isNaN(value)) {
      warning(false, 'Received NaN for the `%s` attribute. If this is expected, cast ' + 'the value to a string.%s', name, getStackAddendum$2());
      warnedProperties$1[name] = true;
      return true;
    }

    var isReserved = isReservedProp(name);

    // Known attributes should match the casing specified in the property config.
    if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
      var standardName = possibleStandardNames[lowerCasedName];
      if (standardName !== name) {
        warning(false, 'Invalid DOM property `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum$2());
        warnedProperties$1[name] = true;
        return true;
      }
    } else if (!isReserved && name !== lowerCasedName) {
      // Unknown attributes should have lowercase casing since that's how they
      // will be cased anyway with server rendering.
      warning(false, 'React does not recognize the `%s` prop on a DOM element. If you ' + 'intentionally want it to appear in the DOM as a custom ' + 'attribute, spell it as lowercase `%s` instead. ' + 'If you accidentally passed it from a parent component, remove ' + 'it from the DOM element.%s', name, lowerCasedName, getStackAddendum$2());
      warnedProperties$1[name] = true;
      return true;
    }

    if (typeof value === 'boolean' && !shouldAttributeAcceptBooleanValue(name)) {
      if (value) {
        warning(false, 'Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.%s', value, name, name, value, name, getStackAddendum$2());
      } else {
        warning(false, 'Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.%s', value, name, name, value, name, name, name, getStackAddendum$2());
      }
      warnedProperties$1[name] = true;
      return true;
    }

    // Now that we've validated casing, do not validate
    // data types for reserved props
    if (isReserved) {
      return true;
    }

    // Warn when a known attribute is a bad type
    if (!shouldSetAttribute(name, value)) {
      warnedProperties$1[name] = true;
      return false;
    }

    return true;
  };
}

var warnUnknownProperties = function (type, props, canUseEventSystem) {
  var unknownProps = [];
  for (var key in props) {
    var isValid = validateProperty$1(type, key, props[key], canUseEventSystem);
    if (!isValid) {
      unknownProps.push(key);
    }
  }

  var unknownPropString = unknownProps.map(function (prop) {
    return '`' + prop + '`';
  }).join(', ');
  if (unknownProps.length === 1) {
    warning(false, 'Invalid value for prop %s on <%s> tag. Either remove it from the element, ' + 'or pass a string or number value to keep it in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$2());
  } else if (unknownProps.length > 1) {
    warning(false, 'Invalid values for props %s on <%s> tag. Either remove them from the element, ' + 'or pass a string or number value to keep them in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$2());
  }
};

function validateProperties$2(type, props, canUseEventSystem) {
  if (isCustomComponent(type, props)) {
    return;
  }
  warnUnknownProperties(type, props, canUseEventSystem);
}

// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberOwnerName$1 = ReactDebugCurrentFiber.getCurrentFiberOwnerName;
var getCurrentFiberStackAddendum$2 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

var didWarnInvalidHydration = false;
var didWarnShadyDOM = false;

var DANGEROUSLY_SET_INNER_HTML = 'dangerouslySetInnerHTML';
var SUPPRESS_CONTENT_EDITABLE_WARNING = 'suppressContentEditableWarning';
var SUPPRESS_HYDRATION_WARNING$1 = 'suppressHydrationWarning';
var AUTOFOCUS = 'autoFocus';
var CHILDREN = 'children';
var STYLE = 'style';
var HTML = '__html';

var HTML_NAMESPACE = Namespaces.html;


var getStack = emptyFunction.thatReturns('');

{
  getStack = getCurrentFiberStackAddendum$2;

  var warnedUnknownTags = {
    // Chrome is the only major browser not shipping <time>. But as of July
    // 2017 it intends to ship it due to widespread usage. We intentionally
    // *don't* warn for <time> even if it's unrecognized by Chrome because
    // it soon will be, and many apps have been using it anyway.
    time: true,
    // There are working polyfills for <dialog>. Let people use it.
    dialog: true
  };

  var validatePropertiesInDevelopment = function (type, props) {
    validateProperties(type, props);
    validateProperties$1(type, props);
    validateProperties$2(type, props, /* canUseEventSystem */true);
  };

  // HTML parsing normalizes CR and CRLF to LF.
  // It also can turn \u0000 into \uFFFD inside attributes.
  // https://www.w3.org/TR/html5/single-page.html#preprocessing-the-input-stream
  // If we have a mismatch, it might be caused by that.
  // We will still patch up in this case but not fire the warning.
  var NORMALIZE_NEWLINES_REGEX = /\r\n?/g;
  var NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;

  var normalizeMarkupForTextOrAttribute = function (markup) {
    var markupString = typeof markup === 'string' ? markup : '' + markup;
    return markupString.replace(NORMALIZE_NEWLINES_REGEX, '\n').replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, '');
  };

  var warnForTextDifference = function (serverText, clientText) {
    if (didWarnInvalidHydration) {
      return;
    }
    var normalizedClientText = normalizeMarkupForTextOrAttribute(clientText);
    var normalizedServerText = normalizeMarkupForTextOrAttribute(serverText);
    if (normalizedServerText === normalizedClientText) {
      return;
    }
    didWarnInvalidHydration = true;
    warning(false, 'Text content did not match. Server: "%s" Client: "%s"', normalizedServerText, normalizedClientText);
  };

  var warnForPropDifference = function (propName, serverValue, clientValue) {
    if (didWarnInvalidHydration) {
      return;
    }
    var normalizedClientValue = normalizeMarkupForTextOrAttribute(clientValue);
    var normalizedServerValue = normalizeMarkupForTextOrAttribute(serverValue);
    if (normalizedServerValue === normalizedClientValue) {
      return;
    }
    didWarnInvalidHydration = true;
    warning(false, 'Prop `%s` did not match. Server: %s Client: %s', propName, JSON.stringify(normalizedServerValue), JSON.stringify(normalizedClientValue));
  };

  var warnForExtraAttributes = function (attributeNames) {
    if (didWarnInvalidHydration) {
      return;
    }
    didWarnInvalidHydration = true;
    var names = [];
    attributeNames.forEach(function (name) {
      names.push(name);
    });
    warning(false, 'Extra attributes from the server: %s', names);
  };

  var warnForInvalidEventListener = function (registrationName, listener) {
    if (listener === false) {
      warning(false, 'Expected `%s` listener to be a function, instead got `false`.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.%s', registrationName, registrationName, registrationName, getCurrentFiberStackAddendum$2());
    } else {
      warning(false, 'Expected `%s` listener to be a function, instead got a value of `%s` type.%s', registrationName, typeof listener, getCurrentFiberStackAddendum$2());
    }
  };

  // Parse the HTML and read it back to normalize the HTML string so that it
  // can be used for comparison.
  var normalizeHTML = function (parent, html) {
    // We could have created a separate document here to avoid
    // re-initializing custom elements if they exist. But this breaks
    // how <noscript> is being handled. So we use the same document.
    // See the discussion in https://github.com/facebook/react/pull/11157.
    var testElement = parent.namespaceURI === HTML_NAMESPACE ? parent.ownerDocument.createElement(parent.tagName) : parent.ownerDocument.createElementNS(parent.namespaceURI, parent.tagName);
    testElement.innerHTML = html;
    return testElement.innerHTML;
  };
}

function ensureListeningTo(rootContainerElement, registrationName) {
  var isDocumentOrFragment = rootContainerElement.nodeType === DOCUMENT_NODE || rootContainerElement.nodeType === DOCUMENT_FRAGMENT_NODE;
  var doc = isDocumentOrFragment ? rootContainerElement : rootContainerElement.ownerDocument;
  listenTo(registrationName, doc);
}

function getOwnerDocumentFromRootContainer(rootContainerElement) {
  return rootContainerElement.nodeType === DOCUMENT_NODE ? rootContainerElement : rootContainerElement.ownerDocument;
}

// There are so many media events, it makes sense to just
// maintain a list rather than create a `trapBubbledEvent` for each
var mediaEvents = {
  topAbort: 'abort',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topLoadedData: 'loadeddata',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTimeUpdate: 'timeupdate',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting'
};

function trapClickOnNonInteractiveElement(node) {
  // Mobile Safari does not fire properly bubble click events on
  // non-interactive elements, which means delegated click listeners do not
  // fire. The workaround for this bug involves attaching an empty click
  // listener on the target node.
  // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
  // Just set it using the onclick property so that we don't have to manage any
  // bookkeeping for it. Not sure if we need to clear it when the listener is
  // removed.
  // TODO: Only do this for the relevant Safaris maybe?
  node.onclick = emptyFunction;
}

function setInitialDOMProperties(tag, domElement, rootContainerElement, nextProps, isCustomComponentTag) {
  for (var propKey in nextProps) {
    if (!nextProps.hasOwnProperty(propKey)) {
      continue;
    }
    var nextProp = nextProps[propKey];
    if (propKey === STYLE) {
      {
        if (nextProp) {
          // Freeze the next style object so that we can assume it won't be
          // mutated. We have already warned for this in the past.
          Object.freeze(nextProp);
        }
      }
      // Relies on `updateStylesByID` not mutating `styleUpdates`.
      setValueForStyles(domElement, nextProp, getStack);
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
      var nextHtml = nextProp ? nextProp[HTML] : undefined;
      if (nextHtml != null) {
        setInnerHTML(domElement, nextHtml);
      }
    } else if (propKey === CHILDREN) {
      if (typeof nextProp === 'string') {
        // Avoid setting initial textContent when the text is empty. In IE11 setting
        // textContent on a <textarea> will cause the placeholder to not
        // show within the <textarea> until it has been focused and blurred again.
        // https://github.com/facebook/react/issues/6731#issuecomment-254874553
        var canSetTextContent = tag !== 'textarea' || nextProp !== '';
        if (canSetTextContent) {
          setTextContent(domElement, nextProp);
        }
      } else if (typeof nextProp === 'number') {
        setTextContent(domElement, '' + nextProp);
      }
    } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1) {
      // Noop
    } else if (propKey === AUTOFOCUS) {
      // We polyfill it separately on the client during commit.
      // We blacklist it here rather than in the property list because we emit it in SSR.
    } else if (registrationNameModules.hasOwnProperty(propKey)) {
      if (nextProp != null) {
        if (true && typeof nextProp !== 'function') {
          warnForInvalidEventListener(propKey, nextProp);
        }
        ensureListeningTo(rootContainerElement, propKey);
      }
    } else if (isCustomComponentTag) {
      setValueForAttribute(domElement, propKey, nextProp);
    } else if (nextProp != null) {
      // If we're updating to null or undefined, we should remove the property
      // from the DOM node instead of inadvertently setting to a string. This
      // brings us in line with the same behavior we have on initial render.
      setValueForProperty(domElement, propKey, nextProp);
    }
  }
}

function updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag) {
  // TODO: Handle wasCustomComponentTag
  for (var i = 0; i < updatePayload.length; i += 2) {
    var propKey = updatePayload[i];
    var propValue = updatePayload[i + 1];
    if (propKey === STYLE) {
      setValueForStyles(domElement, propValue, getStack);
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
      setInnerHTML(domElement, propValue);
    } else if (propKey === CHILDREN) {
      setTextContent(domElement, propValue);
    } else if (isCustomComponentTag) {
      if (propValue != null) {
        setValueForAttribute(domElement, propKey, propValue);
      } else {
        deleteValueForAttribute(domElement, propKey);
      }
    } else if (propValue != null) {
      setValueForProperty(domElement, propKey, propValue);
    } else {
      // If we're updating to null or undefined, we should remove the property
      // from the DOM node instead of inadvertently setting to a string. This
      // brings us in line with the same behavior we have on initial render.
      deleteValueForProperty(domElement, propKey);
    }
  }
}

function createElement$1(type, props, rootContainerElement, parentNamespace) {
  // We create tags in the namespace of their parent container, except HTML
  var ownerDocument = getOwnerDocumentFromRootContainer(rootContainerElement);
  var domElement;
  var namespaceURI = parentNamespace;
  if (namespaceURI === HTML_NAMESPACE) {
    namespaceURI = getIntrinsicNamespace(type);
  }
  if (namespaceURI === HTML_NAMESPACE) {
    {
      var isCustomComponentTag = isCustomComponent(type, props);
      // Should this check be gated by parent namespace? Not sure we want to
      // allow <SVG> or <mATH>.
      warning(isCustomComponentTag || type === type.toLowerCase(), '<%s /> is using uppercase HTML. Always use lowercase HTML tags ' + 'in React.', type);
    }

    if (type === 'script') {
      // Create the script via .innerHTML so its "parser-inserted" flag is
      // set to true and it does not execute
      var div = ownerDocument.createElement('div');
      div.innerHTML = '<script><' + '/script>'; // eslint-disable-line
      // This is guaranteed to yield a script element.
      var firstChild = div.firstChild;
      domElement = div.removeChild(firstChild);
    } else if (typeof props.is === 'string') {
      // $FlowIssue `createElement` should be updated for Web Components
      domElement = ownerDocument.createElement(type, { is: props.is });
    } else {
      // Separate else branch instead of using `props.is || undefined` above because of a Firefox bug.
      // See discussion in https://github.com/facebook/react/pull/6896
      // and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
      domElement = ownerDocument.createElement(type);
    }
  } else {
    domElement = ownerDocument.createElementNS(namespaceURI, type);
  }

  {
    if (namespaceURI === HTML_NAMESPACE) {
      if (!isCustomComponentTag && Object.prototype.toString.call(domElement) === '[object HTMLUnknownElement]' && !Object.prototype.hasOwnProperty.call(warnedUnknownTags, type)) {
        warnedUnknownTags[type] = true;
        warning(false, 'The tag <%s> is unrecognized in this browser. ' + 'If you meant to render a React component, start its name with ' + 'an uppercase letter.', type);
      }
    }
  }

  return domElement;
}

function createTextNode$1(text, rootContainerElement) {
  return getOwnerDocumentFromRootContainer(rootContainerElement).createTextNode(text);
}

function setInitialProperties$1(domElement, tag, rawProps, rootContainerElement) {
  var isCustomComponentTag = isCustomComponent(tag, rawProps);
  {
    validatePropertiesInDevelopment(tag, rawProps);
    if (isCustomComponentTag && !didWarnShadyDOM && domElement.shadyRoot) {
      warning(false, '%s is using shady DOM. Using shady DOM with React can ' + 'cause things to break subtly.', getCurrentFiberOwnerName$1() || 'A component');
      didWarnShadyDOM = true;
    }
  }

  // TODO: Make sure that we check isMounted before firing any of these events.
  var props;
  switch (tag) {
    case 'iframe':
    case 'object':
      trapBubbledEvent('topLoad', 'load', domElement);
      props = rawProps;
      break;
    case 'video':
    case 'audio':
      // Create listener for each media event
      for (var event in mediaEvents) {
        if (mediaEvents.hasOwnProperty(event)) {
          trapBubbledEvent(event, mediaEvents[event], domElement);
        }
      }
      props = rawProps;
      break;
    case 'source':
      trapBubbledEvent('topError', 'error', domElement);
      props = rawProps;
      break;
    case 'img':
    case 'image':
      trapBubbledEvent('topError', 'error', domElement);
      trapBubbledEvent('topLoad', 'load', domElement);
      props = rawProps;
      break;
    case 'form':
      trapBubbledEvent('topReset', 'reset', domElement);
      trapBubbledEvent('topSubmit', 'submit', domElement);
      props = rawProps;
      break;
    case 'details':
      trapBubbledEvent('topToggle', 'toggle', domElement);
      props = rawProps;
      break;
    case 'input':
      initWrapperState(domElement, rawProps);
      props = getHostProps(domElement, rawProps);
      trapBubbledEvent('topInvalid', 'invalid', domElement);
      // For controlled components we always need to ensure we're listening
      // to onChange. Even if there is no listener.
      ensureListeningTo(rootContainerElement, 'onChange');
      break;
    case 'option':
      validateProps(domElement, rawProps);
      props = getHostProps$1(domElement, rawProps);
      break;
    case 'select':
      initWrapperState$1(domElement, rawProps);
      props = getHostProps$2(domElement, rawProps);
      trapBubbledEvent('topInvalid', 'invalid', domElement);
      // For controlled components we always need to ensure we're listening
      // to onChange. Even if there is no listener.
      ensureListeningTo(rootContainerElement, 'onChange');
      break;
    case 'textarea':
      initWrapperState$2(domElement, rawProps);
      props = getHostProps$3(domElement, rawProps);
      trapBubbledEvent('topInvalid', 'invalid', domElement);
      // For controlled components we always need to ensure we're listening
      // to onChange. Even if there is no listener.
      ensureListeningTo(rootContainerElement, 'onChange');
      break;
    default:
      props = rawProps;
  }

  assertValidProps(tag, props, getStack);

  setInitialDOMProperties(tag, domElement, rootContainerElement, props, isCustomComponentTag);

  switch (tag) {
    case 'input':
      // TODO: Make sure we check if this is still unmounted or do any clean
      // up necessary since we never stop tracking anymore.
      track(domElement);
      postMountWrapper(domElement, rawProps);
      break;
    case 'textarea':
      // TODO: Make sure we check if this is still unmounted or do any clean
      // up necessary since we never stop tracking anymore.
      track(domElement);
      postMountWrapper$3(domElement, rawProps);
      break;
    case 'option':
      postMountWrapper$1(domElement, rawProps);
      break;
    case 'select':
      postMountWrapper$2(domElement, rawProps);
      break;
    default:
      if (typeof props.onClick === 'function') {
        // TODO: This cast may not be sound for SVG, MathML or custom elements.
        trapClickOnNonInteractiveElement(domElement);
      }
      break;
  }
}

// Calculate the diff between the two objects.
function diffProperties$1(domElement, tag, lastRawProps, nextRawProps, rootContainerElement) {
  {
    validatePropertiesInDevelopment(tag, nextRawProps);
  }

  var updatePayload = null;

  var lastProps;
  var nextProps;
  switch (tag) {
    case 'input':
      lastProps = getHostProps(domElement, lastRawProps);
      nextProps = getHostProps(domElement, nextRawProps);
      updatePayload = [];
      break;
    case 'option':
      lastProps = getHostProps$1(domElement, lastRawProps);
      nextProps = getHostProps$1(domElement, nextRawProps);
      updatePayload = [];
      break;
    case 'select':
      lastProps = getHostProps$2(domElement, lastRawProps);
      nextProps = getHostProps$2(domElement, nextRawProps);
      updatePayload = [];
      break;
    case 'textarea':
      lastProps = getHostProps$3(domElement, lastRawProps);
      nextProps = getHostProps$3(domElement, nextRawProps);
      updatePayload = [];
      break;
    default:
      lastProps = lastRawProps;
      nextProps = nextRawProps;
      if (typeof lastProps.onClick !== 'function' && typeof nextProps.onClick === 'function') {
        // TODO: This cast may not be sound for SVG, MathML or custom elements.
        trapClickOnNonInteractiveElement(domElement);
      }
      break;
  }

  assertValidProps(tag, nextProps, getStack);

  var propKey;
  var styleName;
  var styleUpdates = null;
  for (propKey in lastProps) {
    if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
      continue;
    }
    if (propKey === STYLE) {
      var lastStyle = lastProps[propKey];
      for (styleName in lastStyle) {
        if (lastStyle.hasOwnProperty(styleName)) {
          if (!styleUpdates) {
            styleUpdates = {};
          }
          styleUpdates[styleName] = '';
        }
      }
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML || propKey === CHILDREN) {
      // Noop. This is handled by the clear text mechanism.
    } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1) {
      // Noop
    } else if (propKey === AUTOFOCUS) {
      // Noop. It doesn't work on updates anyway.
    } else if (registrationNameModules.hasOwnProperty(propKey)) {
      // This is a special case. If any listener updates we need to ensure
      // that the "current" fiber pointer gets updated so we need a commit
      // to update this element.
      if (!updatePayload) {
        updatePayload = [];
      }
    } else {
      // For all other deleted properties we add it to the queue. We use
      // the whitelist in the commit phase instead.
      (updatePayload = updatePayload || []).push(propKey, null);
    }
  }
  for (propKey in nextProps) {
    var nextProp = nextProps[propKey];
    var lastProp = lastProps != null ? lastProps[propKey] : undefined;
    if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
      continue;
    }
    if (propKey === STYLE) {
      {
        if (nextProp) {
          // Freeze the next style object so that we can assume it won't be
          // mutated. We have already warned for this in the past.
          Object.freeze(nextProp);
        }
      }
      if (lastProp) {
        // Unset styles on `lastProp` but not on `nextProp`.
        for (styleName in lastProp) {
          if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
            if (!styleUpdates) {
              styleUpdates = {};
            }
            styleUpdates[styleName] = '';
          }
        }
        // Update styles that changed since `lastProp`.
        for (styleName in nextProp) {
          if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
            if (!styleUpdates) {
              styleUpdates = {};
            }
            styleUpdates[styleName] = nextProp[styleName];
          }
        }
      } else {
        // Relies on `updateStylesByID` not mutating `styleUpdates`.
        if (!styleUpdates) {
          if (!updatePayload) {
            updatePayload = [];
          }
          updatePayload.push(propKey, styleUpdates);
        }
        styleUpdates = nextProp;
      }
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
      var nextHtml = nextProp ? nextProp[HTML] : undefined;
      var lastHtml = lastProp ? lastProp[HTML] : undefined;
      if (nextHtml != null) {
        if (lastHtml !== nextHtml) {
          (updatePayload = updatePayload || []).push(propKey, '' + nextHtml);
        }
      } else {
        // TODO: It might be too late to clear this if we have children
        // inserted already.
      }
    } else if (propKey === CHILDREN) {
      if (lastProp !== nextProp && (typeof nextProp === 'string' || typeof nextProp === 'number')) {
        (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
      }
    } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1) {
      // Noop
    } else if (registrationNameModules.hasOwnProperty(propKey)) {
      if (nextProp != null) {
        // We eagerly listen to this even though we haven't committed yet.
        if (true && typeof nextProp !== 'function') {
          warnForInvalidEventListener(propKey, nextProp);
        }
        ensureListeningTo(rootContainerElement, propKey);
      }
      if (!updatePayload && lastProp !== nextProp) {
        // This is a special case. If any listener updates we need to ensure
        // that the "current" props pointer gets updated so we need a commit
        // to update this element.
        updatePayload = [];
      }
    } else {
      // For any other property we always add it to the queue and then we
      // filter it out using the whitelist during the commit.
      (updatePayload = updatePayload || []).push(propKey, nextProp);
    }
  }
  if (styleUpdates) {
    (updatePayload = updatePayload || []).push(STYLE, styleUpdates);
  }
  return updatePayload;
}

// Apply the diff.
function updateProperties$1(domElement, updatePayload, tag, lastRawProps, nextRawProps) {
  // Update checked *before* name.
  // In the middle of an update, it is possible to have multiple checked.
  // When a checked radio tries to change name, browser makes another radio's checked false.
  if (tag === 'input' && nextRawProps.type === 'radio' && nextRawProps.name != null) {
    updateChecked(domElement, nextRawProps);
  }

  var wasCustomComponentTag = isCustomComponent(tag, lastRawProps);
  var isCustomComponentTag = isCustomComponent(tag, nextRawProps);
  // Apply the diff.
  updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag);

  // TODO: Ensure that an update gets scheduled if any of the special props
  // changed.
  switch (tag) {
    case 'input':
      // Update the wrapper around inputs *after* updating props. This has to
      // happen after `updateDOMProperties`. Otherwise HTML5 input validations
      // raise warnings and prevent the new value from being assigned.
      updateWrapper(domElement, nextRawProps);
      break;
    case 'textarea':
      updateWrapper$1(domElement, nextRawProps);
      break;
    case 'select':
      // <select> value update needs to occur after <option> children
      // reconciliation
      postUpdateWrapper(domElement, nextRawProps);
      break;
  }
}

function diffHydratedProperties$1(domElement, tag, rawProps, parentNamespace, rootContainerElement) {
  {
    var suppressHydrationWarning = rawProps[SUPPRESS_HYDRATION_WARNING$1] === true;
    var isCustomComponentTag = isCustomComponent(tag, rawProps);
    validatePropertiesInDevelopment(tag, rawProps);
    if (isCustomComponentTag && !didWarnShadyDOM && domElement.shadyRoot) {
      warning(false, '%s is using shady DOM. Using shady DOM with React can ' + 'cause things to break subtly.', getCurrentFiberOwnerName$1() || 'A component');
      didWarnShadyDOM = true;
    }
  }

  // TODO: Make sure that we check isMounted before firing any of these events.
  switch (tag) {
    case 'iframe':
    case 'object':
      trapBubbledEvent('topLoad', 'load', domElement);
      break;
    case 'video':
    case 'audio':
      // Create listener for each media event
      for (var event in mediaEvents) {
        if (mediaEvents.hasOwnProperty(event)) {
          trapBubbledEvent(event, mediaEvents[event], domElement);
        }
      }
      break;
    case 'source':
      trapBubbledEvent('topError', 'error', domElement);
      break;
    case 'img':
    case 'image':
      trapBubbledEvent('topError', 'error', domElement);
      trapBubbledEvent('topLoad', 'load', domElement);
      break;
    case 'form':
      trapBubbledEvent('topReset', 'reset', domElement);
      trapBubbledEvent('topSubmit', 'submit', domElement);
      break;
    case 'details':
      trapBubbledEvent('topToggle', 'toggle', domElement);
      break;
    case 'input':
      initWrapperState(domElement, rawProps);
      trapBubbledEvent('topInvalid', 'invalid', domElement);
      // For controlled components we always need to ensure we're listening
      // to onChange. Even if there is no listener.
      ensureListeningTo(rootContainerElement, 'onChange');
      break;
    case 'option':
      validateProps(domElement, rawProps);
      break;
    case 'select':
      initWrapperState$1(domElement, rawProps);
      trapBubbledEvent('topInvalid', 'invalid', domElement);
      // For controlled components we always need to ensure we're listening
      // to onChange. Even if there is no listener.
      ensureListeningTo(rootContainerElement, 'onChange');
      break;
    case 'textarea':
      initWrapperState$2(domElement, rawProps);
      trapBubbledEvent('topInvalid', 'invalid', domElement);
      // For controlled components we always need to ensure we're listening
      // to onChange. Even if there is no listener.
      ensureListeningTo(rootContainerElement, 'onChange');
      break;
  }

  assertValidProps(tag, rawProps, getStack);

  {
    var extraAttributeNames = new Set();
    var attributes = domElement.attributes;
    for (var i = 0; i < attributes.length; i++) {
      var name = attributes[i].name.toLowerCase();
      switch (name) {
        // Built-in SSR attribute is whitelisted
        case 'data-reactroot':
          break;
        // Controlled attributes are not validated
        // TODO: Only ignore them on controlled tags.
        case 'value':
          break;
        case 'checked':
          break;
        case 'selected':
          break;
        default:
          // Intentionally use the original name.
          // See discussion in https://github.com/facebook/react/pull/10676.
          extraAttributeNames.add(attributes[i].name);
      }
    }
  }

  var updatePayload = null;
  for (var propKey in rawProps) {
    if (!rawProps.hasOwnProperty(propKey)) {
      continue;
    }
    var nextProp = rawProps[propKey];
    if (propKey === CHILDREN) {
      // For text content children we compare against textContent. This
      // might match additional HTML that is hidden when we read it using
      // textContent. E.g. "foo" will match "f<span>oo</span>" but that still
      // satisfies our requirement. Our requirement is not to produce perfect
      // HTML and attributes. Ideally we should preserve structure but it's
      // ok not to if the visible content is still enough to indicate what
      // even listeners these nodes might be wired up to.
      // TODO: Warn if there is more than a single textNode as a child.
      // TODO: Should we use domElement.firstChild.nodeValue to compare?
      if (typeof nextProp === 'string') {
        if (domElement.textContent !== nextProp) {
          if (true && !suppressHydrationWarning) {
            warnForTextDifference(domElement.textContent, nextProp);
          }
          updatePayload = [CHILDREN, nextProp];
        }
      } else if (typeof nextProp === 'number') {
        if (domElement.textContent !== '' + nextProp) {
          if (true && !suppressHydrationWarning) {
            warnForTextDifference(domElement.textContent, nextProp);
          }
          updatePayload = [CHILDREN, '' + nextProp];
        }
      }
    } else if (registrationNameModules.hasOwnProperty(propKey)) {
      if (nextProp != null) {
        if (true && typeof nextProp !== 'function') {
          warnForInvalidEventListener(propKey, nextProp);
        }
        ensureListeningTo(rootContainerElement, propKey);
      }
    } else {
      // Validate that the properties correspond to their expected values.
      var serverValue;
      var propertyInfo;
      if (suppressHydrationWarning) {
        // Don't bother comparing. We're ignoring all these warnings.
      } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1 ||
      // Controlled attributes are not validated
      // TODO: Only ignore them on controlled tags.
      propKey === 'value' || propKey === 'checked' || propKey === 'selected') {
        // Noop
      } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
        var rawHtml = nextProp ? nextProp[HTML] || '' : '';
        var serverHTML = domElement.innerHTML;
        var expectedHTML = normalizeHTML(domElement, rawHtml);
        if (expectedHTML !== serverHTML) {
          warnForPropDifference(propKey, serverHTML, expectedHTML);
        }
      } else if (propKey === STYLE) {
        // $FlowFixMe - Should be inferred as not undefined.
        extraAttributeNames['delete'](propKey);
        var expectedStyle = createDangerousStringForStyles(nextProp);
        serverValue = domElement.getAttribute('style');
        if (expectedStyle !== serverValue) {
          warnForPropDifference(propKey, serverValue, expectedStyle);
        }
      } else if (isCustomComponentTag) {
        // $FlowFixMe - Should be inferred as not undefined.
        extraAttributeNames['delete'](propKey.toLowerCase());
        serverValue = getValueForAttribute(domElement, propKey, nextProp);

        if (nextProp !== serverValue) {
          warnForPropDifference(propKey, serverValue, nextProp);
        }
      } else if (shouldSetAttribute(propKey, nextProp)) {
        if (propertyInfo = getPropertyInfo(propKey)) {
          // $FlowFixMe - Should be inferred as not undefined.
          extraAttributeNames['delete'](propertyInfo.attributeName);
          serverValue = getValueForProperty(domElement, propKey, nextProp);
        } else {
          var ownNamespace = parentNamespace;
          if (ownNamespace === HTML_NAMESPACE) {
            ownNamespace = getIntrinsicNamespace(tag);
          }
          if (ownNamespace === HTML_NAMESPACE) {
            // $FlowFixMe - Should be inferred as not undefined.
            extraAttributeNames['delete'](propKey.toLowerCase());
          } else {
            // $FlowFixMe - Should be inferred as not undefined.
            extraAttributeNames['delete'](propKey);
          }
          serverValue = getValueForAttribute(domElement, propKey, nextProp);
        }

        if (nextProp !== serverValue) {
          warnForPropDifference(propKey, serverValue, nextProp);
        }
      }
    }
  }

  {
    // $FlowFixMe - Should be inferred as not undefined.
    if (extraAttributeNames.size > 0 && !suppressHydrationWarning) {
      // $FlowFixMe - Should be inferred as not undefined.
      warnForExtraAttributes(extraAttributeNames);
    }
  }

  switch (tag) {
    case 'input':
      // TODO: Make sure we check if this is still unmounted or do any clean
      // up necessary since we never stop tracking anymore.
      track(domElement);
      postMountWrapper(domElement, rawProps);
      break;
    case 'textarea':
      // TODO: Make sure we check if this is still unmounted or do any clean
      // up necessary since we never stop tracking anymore.
      track(domElement);
      postMountWrapper$3(domElement, rawProps);
      break;
    case 'select':
    case 'option':
      // For input and textarea we current always set the value property at
      // post mount to force it to diverge from attributes. However, for
      // option and select we don't quite do the same thing and select
      // is not resilient to the DOM state changing so we don't do that here.
      // TODO: Consider not doing this for input and textarea.
      break;
    default:
      if (typeof rawProps.onClick === 'function') {
        // TODO: This cast may not be sound for SVG, MathML or custom elements.
        trapClickOnNonInteractiveElement(domElement);
      }
      break;
  }

  return updatePayload;
}

function diffHydratedText$1(textNode, text) {
  var isDifferent = textNode.nodeValue !== text;
  return isDifferent;
}

function warnForUnmatchedText$1(textNode, text) {
  {
    warnForTextDifference(textNode.nodeValue, text);
  }
}

function warnForDeletedHydratableElement$1(parentNode, child) {
  {
    if (didWarnInvalidHydration) {
      return;
    }
    didWarnInvalidHydration = true;
    warning(false, 'Did not expect server HTML to contain a <%s> in <%s>.', child.nodeName.toLowerCase(), parentNode.nodeName.toLowerCase());
  }
}

function warnForDeletedHydratableText$1(parentNode, child) {
  {
    if (didWarnInvalidHydration) {
      return;
    }
    didWarnInvalidHydration = true;
    warning(false, 'Did not expect server HTML to contain the text node "%s" in <%s>.', child.nodeValue, parentNode.nodeName.toLowerCase());
  }
}

function warnForInsertedHydratedElement$1(parentNode, tag, props) {
  {
    if (didWarnInvalidHydration) {
      return;
    }
    didWarnInvalidHydration = true;
    warning(false, 'Expected server HTML to contain a matching <%s> in <%s>.', tag, parentNode.nodeName.toLowerCase());
  }
}

function warnForInsertedHydratedText$1(parentNode, text) {
  {
    if (text === '') {
      // We expect to insert empty text nodes since they're not represented in
      // the HTML.
      // TODO: Remove this special case if we can just avoid inserting empty
      // text nodes.
      return;
    }
    if (didWarnInvalidHydration) {
      return;
    }
    didWarnInvalidHydration = true;
    warning(false, 'Expected server HTML to contain a matching text node for "%s" in <%s>.', text, parentNode.nodeName.toLowerCase());
  }
}

function restoreControlledState(domElement, tag, props) {
  switch (tag) {
    case 'input':
      restoreControlledState$1(domElement, props);
      return;
    case 'textarea':
      restoreControlledState$3(domElement, props);
      return;
    case 'select':
      restoreControlledState$2(domElement, props);
      return;
  }
}

var ReactDOMFiberComponent = Object.freeze({
	createElement: createElement$1,
	createTextNode: createTextNode$1,
	setInitialProperties: setInitialProperties$1,
	diffProperties: diffProperties$1,
	updateProperties: updateProperties$1,
	diffHydratedProperties: diffHydratedProperties$1,
	diffHydratedText: diffHydratedText$1,
	warnForUnmatchedText: warnForUnmatchedText$1,
	warnForDeletedHydratableElement: warnForDeletedHydratableElement$1,
	warnForDeletedHydratableText: warnForDeletedHydratableText$1,
	warnForInsertedHydratedElement: warnForInsertedHydratedElement$1,
	warnForInsertedHydratedText: warnForInsertedHydratedText$1,
	restoreControlledState: restoreControlledState
});

// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberStackAddendum$6 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

var validateDOMNesting = emptyFunction;

{
  // This validation code was written based on the HTML5 parsing spec:
  // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
  //
  // Note: this does not catch all invalid nesting, nor does it try to (as it's
  // not clear what practical benefit doing so provides); instead, we warn only
  // for cases where the parser will give a parse tree differing from what React
  // intended. For example, <b><div></div></b> is invalid but we don't warn
  // because it still parses correctly; we do warn for other cases like nested
  // <p> tags where the beginning of the second element implicitly closes the
  // first, causing a confusing mess.

  // https://html.spec.whatwg.org/multipage/syntax.html#special
  var specialTags = ['address', 'applet', 'area', 'article', 'aside', 'base', 'basefont', 'bgsound', 'blockquote', 'body', 'br', 'button', 'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dir', 'div', 'dl', 'dt', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'iframe', 'img', 'input', 'isindex', 'li', 'link', 'listing', 'main', 'marquee', 'menu', 'menuitem', 'meta', 'nav', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'p', 'param', 'plaintext', 'pre', 'script', 'section', 'select', 'source', 'style', 'summary', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 'ul', 'wbr', 'xmp'];

  // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
  var inScopeTags = ['applet', 'caption', 'html', 'table', 'td', 'th', 'marquee', 'object', 'template',

  // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
  // TODO: Distinguish by namespace here -- for <title>, including it here
  // errs on the side of fewer warnings
  'foreignObject', 'desc', 'title'];

  // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-button-scope
  var buttonScopeTags = inScopeTags.concat(['button']);

  // https://html.spec.whatwg.org/multipage/syntax.html#generate-implied-end-tags
  var impliedEndTags = ['dd', 'dt', 'li', 'option', 'optgroup', 'p', 'rp', 'rt'];

  var emptyAncestorInfo = {
    current: null,

    formTag: null,
    aTagInScope: null,
    buttonTagInScope: null,
    nobrTagInScope: null,
    pTagInButtonScope: null,

    listItemTagAutoclosing: null,
    dlItemTagAutoclosing: null
  };

  var updatedAncestorInfo$1 = function (oldInfo, tag, instance) {
    var ancestorInfo = _assign({}, oldInfo || emptyAncestorInfo);
    var info = { tag: tag, instance: instance };

    if (inScopeTags.indexOf(tag) !== -1) {
      ancestorInfo.aTagInScope = null;
      ancestorInfo.buttonTagInScope = null;
      ancestorInfo.nobrTagInScope = null;
    }
    if (buttonScopeTags.indexOf(tag) !== -1) {
      ancestorInfo.pTagInButtonScope = null;
    }

    // See rules for 'li', 'dd', 'dt' start tags in
    // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
    if (specialTags.indexOf(tag) !== -1 && tag !== 'address' && tag !== 'div' && tag !== 'p') {
      ancestorInfo.listItemTagAutoclosing = null;
      ancestorInfo.dlItemTagAutoclosing = null;
    }

    ancestorInfo.current = info;

    if (tag === 'form') {
      ancestorInfo.formTag = info;
    }
    if (tag === 'a') {
      ancestorInfo.aTagInScope = info;
    }
    if (tag === 'button') {
      ancestorInfo.buttonTagInScope = info;
    }
    if (tag === 'nobr') {
      ancestorInfo.nobrTagInScope = info;
    }
    if (tag === 'p') {
      ancestorInfo.pTagInButtonScope = info;
    }
    if (tag === 'li') {
      ancestorInfo.listItemTagAutoclosing = info;
    }
    if (tag === 'dd' || tag === 'dt') {
      ancestorInfo.dlItemTagAutoclosing = info;
    }

    return ancestorInfo;
  };

  /**
   * Returns whether
   */
  var isTagValidWithParent = function (tag, parentTag) {
    // First, let's check if we're in an unusual parsing mode...
    switch (parentTag) {
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
      case 'select':
        return tag === 'option' || tag === 'optgroup' || tag === '#text';
      case 'optgroup':
        return tag === 'option' || tag === '#text';
      // Strictly speaking, seeing an <option> doesn't mean we're in a <select>
      // but
      case 'option':
        return tag === '#text';
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
      // No special behavior since these rules fall back to "in body" mode for
      // all except special table nodes which cause bad parsing behavior anyway.

      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
      case 'tr':
        return tag === 'th' || tag === 'td' || tag === 'style' || tag === 'script' || tag === 'template';
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
      case 'tbody':
      case 'thead':
      case 'tfoot':
        return tag === 'tr' || tag === 'style' || tag === 'script' || tag === 'template';
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
      case 'colgroup':
        return tag === 'col' || tag === 'template';
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
      case 'table':
        return tag === 'caption' || tag === 'colgroup' || tag === 'tbody' || tag === 'tfoot' || tag === 'thead' || tag === 'style' || tag === 'script' || tag === 'template';
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
      case 'head':
        return tag === 'base' || tag === 'basefont' || tag === 'bgsound' || tag === 'link' || tag === 'meta' || tag === 'title' || tag === 'noscript' || tag === 'noframes' || tag === 'style' || tag === 'script' || tag === 'template';
      // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
      case 'html':
        return tag === 'head' || tag === 'body';
      case '#document':
        return tag === 'html';
    }

    // Probably in the "in body" parsing mode, so we outlaw only tag combos
    // where the parsing rules cause implicit opens or closes to be added.
    // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
    switch (tag) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return parentTag !== 'h1' && parentTag !== 'h2' && parentTag !== 'h3' && parentTag !== 'h4' && parentTag !== 'h5' && parentTag !== 'h6';

      case 'rp':
      case 'rt':
        return impliedEndTags.indexOf(parentTag) === -1;

      case 'body':
      case 'caption':
      case 'col':
      case 'colgroup':
      case 'frame':
      case 'head':
      case 'html':
      case 'tbody':
      case 'td':
      case 'tfoot':
      case 'th':
      case 'thead':
      case 'tr':
        // These tags are only valid with a few parents that have special child
        // parsing rules -- if we're down here, then none of those matched and
        // so we allow it only if we don't know what the parent is, as all other
        // cases are invalid.
        return parentTag == null;
    }

    return true;
  };

  /**
   * Returns whether
   */
  var findInvalidAncestorForTag = function (tag, ancestorInfo) {
    switch (tag) {
      case 'address':
      case 'article':
      case 'aside':
      case 'blockquote':
      case 'center':
      case 'details':
      case 'dialog':
      case 'dir':
      case 'div':
      case 'dl':
      case 'fieldset':
      case 'figcaption':
      case 'figure':
      case 'footer':
      case 'header':
      case 'hgroup':
      case 'main':
      case 'menu':
      case 'nav':
      case 'ol':
      case 'p':
      case 'section':
      case 'summary':
      case 'ul':
      case 'pre':
      case 'listing':
      case 'table':
      case 'hr':
      case 'xmp':
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return ancestorInfo.pTagInButtonScope;

      case 'form':
        return ancestorInfo.formTag || ancestorInfo.pTagInButtonScope;

      case 'li':
        return ancestorInfo.listItemTagAutoclosing;

      case 'dd':
      case 'dt':
        return ancestorInfo.dlItemTagAutoclosing;

      case 'button':
        return ancestorInfo.buttonTagInScope;

      case 'a':
        // Spec says something about storing a list of markers, but it sounds
        // equivalent to this check.
        return ancestorInfo.aTagInScope;

      case 'nobr':
        return ancestorInfo.nobrTagInScope;
    }

    return null;
  };

  var didWarn = {};

  validateDOMNesting = function (childTag, childText, ancestorInfo) {
    ancestorInfo = ancestorInfo || emptyAncestorInfo;
    var parentInfo = ancestorInfo.current;
    var parentTag = parentInfo && parentInfo.tag;

    if (childText != null) {
      warning(childTag == null, 'validateDOMNesting: when childText is passed, childTag should be null');
      childTag = '#text';
    }

    var invalidParent = isTagValidWithParent(childTag, parentTag) ? null : parentInfo;
    var invalidAncestor = invalidParent ? null : findInvalidAncestorForTag(childTag, ancestorInfo);
    var invalidParentOrAncestor = invalidParent || invalidAncestor;
    if (!invalidParentOrAncestor) {
      return;
    }

    var ancestorTag = invalidParentOrAncestor.tag;
    var addendum = getCurrentFiberStackAddendum$6();

    var warnKey = !!invalidParent + '|' + childTag + '|' + ancestorTag + '|' + addendum;
    if (didWarn[warnKey]) {
      return;
    }
    didWarn[warnKey] = true;

    var tagDisplayName = childTag;
    var whitespaceInfo = '';
    if (childTag === '#text') {
      if (/\S/.test(childText)) {
        tagDisplayName = 'Text nodes';
      } else {
        tagDisplayName = 'Whitespace text nodes';
        whitespaceInfo = " Make sure you don't have any extra whitespace between tags on " + 'each line of your source code.';
      }
    } else {
      tagDisplayName = '<' + childTag + '>';
    }

    if (invalidParent) {
      var info = '';
      if (ancestorTag === 'table' && childTag === 'tr') {
        info += ' Add a <tbody> to your code to match the DOM tree generated by ' + 'the browser.';
      }
      warning(false, 'validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s%s', tagDisplayName, ancestorTag, whitespaceInfo, info, addendum);
    } else {
      warning(false, 'validateDOMNesting(...): %s cannot appear as a descendant of ' + '<%s>.%s', tagDisplayName, ancestorTag, addendum);
    }
  };

  // TODO: turn this into a named export
  validateDOMNesting.updatedAncestorInfo = updatedAncestorInfo$1;

  // For testing
  validateDOMNesting.isTagValidInContext = function (tag, ancestorInfo) {
    ancestorInfo = ancestorInfo || emptyAncestorInfo;
    var parentInfo = ancestorInfo.current;
    var parentTag = parentInfo && parentInfo.tag;
    return isTagValidWithParent(tag, parentTag) && !findInvalidAncestorForTag(tag, ancestorInfo);
  };
}

var validateDOMNesting$1 = validateDOMNesting;

// TODO: direct imports like some-package/src/* are bad. Fix me.
var createElement = createElement$1;
var createTextNode = createTextNode$1;
var setInitialProperties = setInitialProperties$1;
var diffProperties = diffProperties$1;
var updateProperties = updateProperties$1;
var diffHydratedProperties = diffHydratedProperties$1;
var diffHydratedText = diffHydratedText$1;
var warnForUnmatchedText = warnForUnmatchedText$1;
var warnForDeletedHydratableElement = warnForDeletedHydratableElement$1;
var warnForDeletedHydratableText = warnForDeletedHydratableText$1;
var warnForInsertedHydratedElement = warnForInsertedHydratedElement$1;
var warnForInsertedHydratedText = warnForInsertedHydratedText$1;
var updatedAncestorInfo = validateDOMNesting$1.updatedAncestorInfo;
var precacheFiberNode = precacheFiberNode$1;
var updateFiberProps = updateFiberProps$1;


{
  var SUPPRESS_HYDRATION_WARNING = 'suppressHydrationWarning';
  if (typeof Map !== 'function' || Map.prototype == null || typeof Map.prototype.forEach !== 'function' || typeof Set !== 'function' || Set.prototype == null || typeof Set.prototype.clear !== 'function' || typeof Set.prototype.forEach !== 'function') {
    warning(false, 'React depends on Map and Set built-in types. Make sure that you load a ' + 'polyfill in older browsers. http://fb.me/react-polyfills');
  }
}

injection$3.injectFiberControlledHostComponent(ReactDOMFiberComponent);

var eventsEnabled = null;
var selectionInformation = null;

/**
 * True if the supplied DOM node is a valid node element.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @return {boolean} True if the DOM is a valid DOM node.
 * @internal
 */
function isValidContainer(node) {
  return !!(node && (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE || node.nodeType === COMMENT_NODE && node.nodeValue === ' react-mount-point-unstable '));
}

function getReactRootElementInContainer(container) {
  if (!container) {
    return null;
  }

  if (container.nodeType === DOCUMENT_NODE) {
    return container.documentElement;
  } else {
    return container.firstChild;
  }
}

function shouldHydrateDueToLegacyHeuristic(container) {
  var rootElement = getReactRootElementInContainer(container);
  return !!(rootElement && rootElement.nodeType === ELEMENT_NODE && rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME));
}

function shouldAutoFocusHostComponent(type, props) {
  switch (type) {
    case 'button':
    case 'input':
    case 'select':
    case 'textarea':
      return !!props.autoFocus;
  }
  return false;
}

var DOMRenderer = reactReconciler({
  getRootHostContext: function (rootContainerInstance) {
    var type = void 0;
    var namespace = void 0;
    var nodeType = rootContainerInstance.nodeType;
    switch (nodeType) {
      case DOCUMENT_NODE:
      case DOCUMENT_FRAGMENT_NODE:
        {
          type = nodeType === DOCUMENT_NODE ? '#document' : '#fragment';
          var root = rootContainerInstance.documentElement;
          namespace = root ? root.namespaceURI : getChildNamespace(null, '');
          break;
        }
      default:
        {
          var container = nodeType === COMMENT_NODE ? rootContainerInstance.parentNode : rootContainerInstance;
          var ownNamespace = container.namespaceURI || null;
          type = container.tagName;
          namespace = getChildNamespace(ownNamespace, type);
          break;
        }
    }
    {
      var validatedTag = type.toLowerCase();
      var _ancestorInfo = updatedAncestorInfo(null, validatedTag, null);
      return { namespace: namespace, ancestorInfo: _ancestorInfo };
    }
    return namespace;
  },
  getChildHostContext: function (parentHostContext, type) {
    {
      var parentHostContextDev = parentHostContext;
      var _namespace = getChildNamespace(parentHostContextDev.namespace, type);
      var _ancestorInfo2 = updatedAncestorInfo(parentHostContextDev.ancestorInfo, type, null);
      return { namespace: _namespace, ancestorInfo: _ancestorInfo2 };
    }
    var parentNamespace = parentHostContext;
    return getChildNamespace(parentNamespace, type);
  },
  getPublicInstance: function (instance) {
    return instance;
  },
  prepareForCommit: function () {
    eventsEnabled = isEnabled();
    selectionInformation = getSelectionInformation();
    setEnabled(false);
  },
  resetAfterCommit: function () {
    restoreSelection(selectionInformation);
    selectionInformation = null;
    setEnabled(eventsEnabled);
    eventsEnabled = null;
  },
  createInstance: function (type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    var parentNamespace = void 0;
    {
      // TODO: take namespace into account when validating.
      var hostContextDev = hostContext;
      validateDOMNesting$1(type, null, hostContextDev.ancestorInfo);
      if (typeof props.children === 'string' || typeof props.children === 'number') {
        var string = '' + props.children;
        var ownAncestorInfo = updatedAncestorInfo(hostContextDev.ancestorInfo, type, null);
        validateDOMNesting$1(null, string, ownAncestorInfo);
      }
      parentNamespace = hostContextDev.namespace;
    }
    var domElement = createElement(type, props, rootContainerInstance, parentNamespace);
    precacheFiberNode(internalInstanceHandle, domElement);
    updateFiberProps(domElement, props);
    return domElement;
  },
  appendInitialChild: function (parentInstance, child) {
    parentInstance.appendChild(child);
  },
  finalizeInitialChildren: function (domElement, type, props, rootContainerInstance) {
    setInitialProperties(domElement, type, props, rootContainerInstance);
    return shouldAutoFocusHostComponent(type, props);
  },
  prepareUpdate: function (domElement, type, oldProps, newProps, rootContainerInstance, hostContext) {
    {
      var hostContextDev = hostContext;
      if (typeof newProps.children !== typeof oldProps.children && (typeof newProps.children === 'string' || typeof newProps.children === 'number')) {
        var string = '' + newProps.children;
        var ownAncestorInfo = updatedAncestorInfo(hostContextDev.ancestorInfo, type, null);
        validateDOMNesting$1(null, string, ownAncestorInfo);
      }
    }
    return diffProperties(domElement, type, oldProps, newProps, rootContainerInstance);
  },
  shouldSetTextContent: function (type, props) {
    return type === 'textarea' || typeof props.children === 'string' || typeof props.children === 'number' || typeof props.dangerouslySetInnerHTML === 'object' && props.dangerouslySetInnerHTML !== null && typeof props.dangerouslySetInnerHTML.__html === 'string';
  },
  shouldDeprioritizeSubtree: function (type, props) {
    return !!props.hidden;
  },
  createTextInstance: function (text, rootContainerInstance, hostContext, internalInstanceHandle) {
    {
      var hostContextDev = hostContext;
      validateDOMNesting$1(null, text, hostContextDev.ancestorInfo);
    }
    var textNode = createTextNode(text, rootContainerInstance);
    precacheFiberNode(internalInstanceHandle, textNode);
    return textNode;
  },


  now: now,

  mutation: {
    commitMount: function (domElement, type, newProps, internalInstanceHandle) {
      domElement.focus();
    },
    commitUpdate: function (domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
      // Update the props handle so that we know which props are the ones with
      // with current event handlers.
      updateFiberProps(domElement, newProps);
      // Apply the diff to the DOM node.
      updateProperties(domElement, updatePayload, type, oldProps, newProps);
    },
    resetTextContent: function (domElement) {
      domElement.textContent = '';
    },
    commitTextUpdate: function (textInstance, oldText, newText) {
      textInstance.nodeValue = newText;
    },
    appendChild: function (parentInstance, child) {
      parentInstance.appendChild(child);
    },
    appendChildToContainer: function (container, child) {
      if (container.nodeType === COMMENT_NODE) {
        container.parentNode.insertBefore(child, container);
      } else {
        container.appendChild(child);
      }
    },
    insertBefore: function (parentInstance, child, beforeChild) {
      parentInstance.insertBefore(child, beforeChild);
    },
    insertInContainerBefore: function (container, child, beforeChild) {
      if (container.nodeType === COMMENT_NODE) {
        container.parentNode.insertBefore(child, beforeChild);
      } else {
        container.insertBefore(child, beforeChild);
      }
    },
    removeChild: function (parentInstance, child) {
      parentInstance.removeChild(child);
    },
    removeChildFromContainer: function (container, child) {
      if (container.nodeType === COMMENT_NODE) {
        container.parentNode.removeChild(child);
      } else {
        container.removeChild(child);
      }
    }
  },

  hydration: {
    canHydrateInstance: function (instance, type, props) {
      if (instance.nodeType !== ELEMENT_NODE || type.toLowerCase() !== instance.nodeName.toLowerCase()) {
        return null;
      }
      // This has now been refined to an element node.
      return instance;
    },
    canHydrateTextInstance: function (instance, text) {
      if (text === '' || instance.nodeType !== TEXT_NODE) {
        // Empty strings are not parsed by HTML so there won't be a correct match here.
        return null;
      }
      // This has now been refined to a text node.
      return instance;
    },
    getNextHydratableSibling: function (instance) {
      var node = instance.nextSibling;
      // Skip non-hydratable nodes.
      while (node && node.nodeType !== ELEMENT_NODE && node.nodeType !== TEXT_NODE) {
        node = node.nextSibling;
      }
      return node;
    },
    getFirstHydratableChild: function (parentInstance) {
      var next = parentInstance.firstChild;
      // Skip non-hydratable nodes.
      while (next && next.nodeType !== ELEMENT_NODE && next.nodeType !== TEXT_NODE) {
        next = next.nextSibling;
      }
      return next;
    },
    hydrateInstance: function (instance, type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
      precacheFiberNode(internalInstanceHandle, instance);
      // TODO: Possibly defer this until the commit phase where all the events
      // get attached.
      updateFiberProps(instance, props);
      var parentNamespace = void 0;
      {
        var hostContextDev = hostContext;
        parentNamespace = hostContextDev.namespace;
      }
      return diffHydratedProperties(instance, type, props, parentNamespace, rootContainerInstance);
    },
    hydrateTextInstance: function (textInstance, text, internalInstanceHandle) {
      precacheFiberNode(internalInstanceHandle, textInstance);
      return diffHydratedText(textInstance, text);
    },
    didNotMatchHydratedContainerTextInstance: function (parentContainer, textInstance, text) {
      {
        warnForUnmatchedText(textInstance, text);
      }
    },
    didNotMatchHydratedTextInstance: function (parentType, parentProps, parentInstance, textInstance, text) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        warnForUnmatchedText(textInstance, text);
      }
    },
    didNotHydrateContainerInstance: function (parentContainer, instance) {
      {
        if (instance.nodeType === 1) {
          warnForDeletedHydratableElement(parentContainer, instance);
        } else {
          warnForDeletedHydratableText(parentContainer, instance);
        }
      }
    },
    didNotHydrateInstance: function (parentType, parentProps, parentInstance, instance) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        if (instance.nodeType === 1) {
          warnForDeletedHydratableElement(parentInstance, instance);
        } else {
          warnForDeletedHydratableText(parentInstance, instance);
        }
      }
    },
    didNotFindHydratableContainerInstance: function (parentContainer, type, props) {
      {
        warnForInsertedHydratedElement(parentContainer, type, props);
      }
    },
    didNotFindHydratableContainerTextInstance: function (parentContainer, text) {
      {
        warnForInsertedHydratedText(parentContainer, text);
      }
    },
    didNotFindHydratableInstance: function (parentType, parentProps, parentInstance, type, props) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        warnForInsertedHydratedElement(parentInstance, type, props);
      }
    },
    didNotFindHydratableTextInstance: function (parentType, parentProps, parentInstance, text) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        warnForInsertedHydratedText(parentInstance, text);
      }
    }
  },

  scheduleDeferredCallback: rIC,
  cancelDeferredCallback: cIC,

  useSyncScheduling: !enableAsyncSchedulingByDefaultInReactDOM
});

injection$4.injectFiberBatchedUpdates(DOMRenderer.batchedUpdates);

var warnedAboutHydrateAPI = false;

function renderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
  !isValidContainer(container) ? invariant(false, 'Target container is not a DOM element.') : void 0;

  {
    if (container._reactRootContainer && container.nodeType !== COMMENT_NODE) {
      var hostInstance = DOMRenderer.findHostInstanceWithNoPortals(container._reactRootContainer.current);
      if (hostInstance) {
        warning(hostInstance.parentNode === container, 'render(...): It looks like the React-rendered content of this ' + 'container was removed without using React. This is not ' + 'supported and will cause errors. Instead, call ' + 'ReactDOM.unmountComponentAtNode to empty a container.');
      }
    }

    var isRootRenderedBySomeReact = !!container._reactRootContainer;
    var rootEl = getReactRootElementInContainer(container);
    var hasNonRootReactChild = !!(rootEl && getInstanceFromNode$1(rootEl));

    warning(!hasNonRootReactChild || isRootRenderedBySomeReact, 'render(...): Replacing React-rendered children with a new root ' + 'component. If you intended to update the children of this node, ' + 'you should instead have the existing children update their state ' + 'and render the new components instead of calling ReactDOM.render.');

    warning(container.nodeType !== ELEMENT_NODE || !container.tagName || container.tagName.toUpperCase() !== 'BODY', 'render(): Rendering components directly into document.body is ' + 'discouraged, since its children are often manipulated by third-party ' + 'scripts and browser extensions. This may lead to subtle ' + 'reconciliation issues. Try rendering into a container element created ' + 'for your app.');
  }

  var root = container._reactRootContainer;
  if (!root) {
    var shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
    // First clear any existing content.
    if (!shouldHydrate) {
      var warned = false;
      var rootSibling = void 0;
      while (rootSibling = container.lastChild) {
        {
          if (!warned && rootSibling.nodeType === ELEMENT_NODE && rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)) {
            warned = true;
            warning(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.');
          }
        }
        container.removeChild(rootSibling);
      }
    }
    {
      if (shouldHydrate && !forceHydrate && !warnedAboutHydrateAPI) {
        warnedAboutHydrateAPI = true;
        lowPriorityWarning$1(false, 'render(): Calling ReactDOM.render() to hydrate server-rendered markup ' + 'will stop working in React v17. Replace the ReactDOM.render() call ' + 'with ReactDOM.hydrate() if you want React to attach to the server HTML.');
      }
    }
    var newRoot = DOMRenderer.createContainer(container, shouldHydrate);
    root = container._reactRootContainer = newRoot;
    // Initial mount should not be batched.
    DOMRenderer.unbatchedUpdates(function () {
      DOMRenderer.updateContainer(children, newRoot, parentComponent, callback);
    });
  } else {
    DOMRenderer.updateContainer(children, root, parentComponent, callback);
  }
  return DOMRenderer.getPublicRootInstance(root);
}

function createPortal(children, container) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  !isValidContainer(container) ? invariant(false, 'Target container is not a DOM element.') : void 0;
  // TODO: pass ReactDOM portal implementation as third argument
  return createPortal$1(children, container, null, key);
}

function ReactRoot(container, hydrate) {
  var root = DOMRenderer.createContainer(container, hydrate);
  this._reactRootContainer = root;
}
ReactRoot.prototype.render = function (children, callback) {
  var root = this._reactRootContainer;
  DOMRenderer.updateContainer(children, root, null, callback);
};
ReactRoot.prototype.unmount = function (callback) {
  var root = this._reactRootContainer;
  DOMRenderer.updateContainer(null, root, null, callback);
};

var ReactDOM = {
  createPortal: createPortal,

  findDOMNode: function (componentOrElement) {
    {
      var owner = ReactCurrentOwner.current;
      if (owner !== null) {
        var warnedAboutRefsInRender = owner.stateNode._warnedAboutRefsInRender;
        warning(warnedAboutRefsInRender, '%s is accessing findDOMNode inside its render(). ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', getComponentName(owner) || 'A component');
        owner.stateNode._warnedAboutRefsInRender = true;
      }
    }
    if (componentOrElement == null) {
      return null;
    }
    if (componentOrElement.nodeType === ELEMENT_NODE) {
      return componentOrElement;
    }

    var inst = get(componentOrElement);
    if (inst) {
      return DOMRenderer.findHostInstance(inst);
    }

    if (typeof componentOrElement.render === 'function') {
      invariant(false, 'Unable to find node on an unmounted component.');
    } else {
      invariant(false, 'Element appears to be neither ReactComponent nor DOMNode. Keys: %s', Object.keys(componentOrElement));
    }
  },
  hydrate: function (element, container, callback) {
    // TODO: throw or warn if we couldn't hydrate?
    return renderSubtreeIntoContainer(null, element, container, true, callback);
  },
  render: function (element, container, callback) {
    return renderSubtreeIntoContainer(null, element, container, false, callback);
  },
  unstable_renderSubtreeIntoContainer: function (parentComponent, element, containerNode, callback) {
    !(parentComponent != null && has(parentComponent)) ? invariant(false, 'parentComponent must be a valid React Component') : void 0;
    return renderSubtreeIntoContainer(parentComponent, element, containerNode, false, callback);
  },
  unmountComponentAtNode: function (container) {
    !isValidContainer(container) ? invariant(false, 'unmountComponentAtNode(...): Target container is not a DOM element.') : void 0;

    if (container._reactRootContainer) {
      {
        var rootEl = getReactRootElementInContainer(container);
        var renderedByDifferentReact = rootEl && !getInstanceFromNode$1(rootEl);
        warning(!renderedByDifferentReact, "unmountComponentAtNode(): The node you're attempting to unmount " + 'was rendered by another copy of React.');
      }

      // Unmount should not be batched.
      DOMRenderer.unbatchedUpdates(function () {
        renderSubtreeIntoContainer(null, null, container, false, function () {
          container._reactRootContainer = null;
        });
      });
      // If you call unmountComponentAtNode twice in quick succession, you'll
      // get `true` twice. That's probably fine?
      return true;
    } else {
      {
        var _rootEl = getReactRootElementInContainer(container);
        var hasNonRootReactChild = !!(_rootEl && getInstanceFromNode$1(_rootEl));

        // Check if the container itself is a React root node.
        var isContainerReactRoot = container.nodeType === 1 && isValidContainer(container.parentNode) && !!container.parentNode._reactRootContainer;

        warning(!hasNonRootReactChild, "unmountComponentAtNode(): The node you're attempting to unmount " + 'was rendered by React and is not a top-level container. %s', isContainerReactRoot ? 'You may have accidentally passed in a React root node instead ' + 'of its container.' : 'Instead, have the parent component update its state and ' + 'rerender in order to remove this component.');
      }

      return false;
    }
  },


  // Temporary alias since we already shipped React 16 RC with it.
  // TODO: remove in React 17.
  unstable_createPortal: createPortal,

  unstable_batchedUpdates: batchedUpdates,

  unstable_deferredUpdates: DOMRenderer.deferredUpdates,

  flushSync: DOMRenderer.flushSync,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    // For TapEventPlugin which is popular in open source
    EventPluginHub: EventPluginHub,
    // Used by test-utils
    EventPluginRegistry: EventPluginRegistry,
    EventPropagators: EventPropagators,
    ReactControlledComponent: ReactControlledComponent,
    ReactDOMComponentTree: ReactDOMComponentTree,
    ReactDOMEventListener: ReactDOMEventListener
  }
};

if (enableCreateRoot) {
  ReactDOM.createRoot = function createRoot(container, options) {
    var hydrate = options != null && options.hydrate === true;
    return new ReactRoot(container, hydrate);
  };
}

var foundDevTools = DOMRenderer.injectIntoDevTools({
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: 1,
  version: ReactVersion,
  rendererPackageName: 'react-dom'
});

{
  if (!foundDevTools && ExecutionEnvironment.canUseDOM && window.top === window.self) {
    // If we're in Chrome or Firefox, provide a download link if not installed.
    if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
      var protocol = window.location.protocol;
      // Don't warn in exotic cases like chrome-extension://.
      if (/^(https?|file):$/.test(protocol)) {
        console.info('%cDownload the React DevTools ' + 'for a better development experience: ' + 'https://fb.me/react-devtools' + (protocol === 'file:' ? '\nYou might need to use a local HTTP server (instead of file://): ' + 'https://fb.me/react-devtools-faq' : ''), 'font-weight:bold');
      }
    }
  }
}



var ReactDOM$2 = Object.freeze({
	default: ReactDOM
});

var ReactDOM$3 = ( ReactDOM$2 && ReactDOM ) || ReactDOM$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var reactDom = ReactDOM$3['default'] ? ReactDOM$3['default'] : ReactDOM$3;

module.exports = reactDom;
  })();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var hyphenate = __webpack_require__(26);

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var camelize = __webpack_require__(28);

var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
}

module.exports = camelizeStyleName;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;

/***/ })
/******/ ]);
//# sourceMappingURL=scala-js-starter-opt-bundle.js.map