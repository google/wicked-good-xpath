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
 * @fileoverview A class representing operations on unary expressions.
 * @author moz@google.com (Michael Zhou)
 */

goog.provide('wgxpath.UnaryExpr');

goog.require('wgxpath.DataType');
goog.require('wgxpath.Expr');



/**
 * Constructor for UnaryExpr.
 *
 * @param {!wgxpath.Expr} expr The unary expression.
 * @extends {wgxpath.Expr}
 * @constructor
 */
wgxpath.UnaryExpr = function(expr) {
  wgxpath.Expr.call(this, wgxpath.DataType.NUMBER);

  /**
   * @private
   * @type {!wgxpath.Expr}
   */
  this.expr_ = expr;

  this.setNeedContextPosition(expr.doesNeedContextPosition());
  this.setNeedContextNode(expr.doesNeedContextNode());
};
goog.inherits(wgxpath.UnaryExpr, wgxpath.Expr);


/**
 * @override
 * @return {number} The number result.
 */
wgxpath.UnaryExpr.prototype.evaluate = function(ctx) {
  return -this.expr_.asNumber(ctx);
};


/**
 * @override
 */
wgxpath.UnaryExpr.prototype.toString = function() {
  return 'Unary Expression: -' + wgxpath.Expr.indent(this.expr_);
};
