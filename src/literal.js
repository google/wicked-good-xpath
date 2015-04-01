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
 * @fileoverview A class representing the string literals.
 * @author moz@google.com (Michael Zhou)
 */

goog.provide('wgxpath.Literal');

goog.require('wgxpath.Expr');



/**
 * Constructs a string literal expression.
 *
 * @param {string} text The text value of the literal.
 * @constructor
 * @extends {wgxpath.Expr}
 */
wgxpath.Literal = function(text) {
  wgxpath.Expr.call(this, wgxpath.DataType.STRING);

  /**
   * @type {string}
   * @private
   */
  this.text_ = text.substring(1, text.length - 1);
};
goog.inherits(wgxpath.Literal, wgxpath.Expr);


/**
 * @override
 * @return {string} The string result.
 */
wgxpath.Literal.prototype.evaluate = function(context) {
  return this.text_;
};


/**
 * @override
 */
wgxpath.Literal.prototype.toString = function() {
  return 'Literal: ' + this.text_;
};
