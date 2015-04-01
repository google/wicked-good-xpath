/**
 * @license
 * Copyright 2014 Software Freedom Conservancy
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Copyright 2012 Google Inc. All Rights Reserved.

/**
 * @fileoverview A class representing number literals.
 * @author moz@google.com (Michael Zhou)
 */

goog.provide('wgxpath.Number');

goog.require('wgxpath.Expr');



/**
 * Constructs a number expression.
 *
 * @param {number} value The number value.
 * @constructor
 * @extends {wgxpath.Expr}
 */
wgxpath.Number = function(value) {
  wgxpath.Expr.call(this, wgxpath.DataType.NUMBER);

  /**
   * @type {number}
   * @private
   */
  this.value_ = value;
};
goog.inherits(wgxpath.Number, wgxpath.Expr);


/**
 * @override
 * @return {number} The number result.
 */
wgxpath.Number.prototype.evaluate = function(ctx) {
  return this.value_;
};


/**
 * @override
 */
wgxpath.Number.prototype.toString = function() {
  return 'Number: ' + this.value_;
};
