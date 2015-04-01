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
 * @fileoverview An abstract class representing basic expressions.
 * @author moz@google.com (Michael Zhou)
 */

goog.provide('wgxpath.Expr');

goog.require('wgxpath.NodeSet');



/**
 * Abstract constructor for an XPath expression.
 *
 * @param {!wgxpath.DataType} dataType The data type that the expression
 *                                    will be evaluated into.
 * @constructor
 */
wgxpath.Expr = function(dataType) {

  /**
   * @type {!wgxpath.DataType}
   * @private
   */
  this.dataType_ = dataType;

  /**
   * @type {boolean}
   * @private
   */
  this.needContextPosition_ = false;

  /**
   * @type {boolean}
   * @private
   */
  this.needContextNode_ = false;

  /**
   * @type {?{name: string, valueExpr: wgxpath.Expr}}
   * @private
   */
  this.quickAttr_ = null;
};


/**
 * Indentation method for pretty printing.
 *
 * @param {*} obj The object to return a string representation for.
 * @return {string} The string prepended with newline and two spaces.
 */
wgxpath.Expr.indent = function(obj) {
  return '\n  ' + obj.toString().split('\n').join('\n  ');
};


/**
 * Evaluates the expression.
 *
 * @param {!wgxpath.Context} ctx The context to evaluate the expression in.
 * @return {!(string|boolean|number|wgxpath.NodeSet)} The evaluation result.
 */
wgxpath.Expr.prototype.evaluate = goog.abstractMethod;


/**
 * @override
 */
wgxpath.Expr.prototype.toString = goog.abstractMethod;


/**
 * Returns the data type of the expression.
 *
 * @return {!wgxpath.DataType} The data type that the expression
 *                            will be evaluated into.
 */
wgxpath.Expr.prototype.getDataType = function() {
  return this.dataType_;
};


/**
 * Returns whether the expression needs context position to be evaluated.
 *
 * @return {boolean} Whether context position is needed.
 */
wgxpath.Expr.prototype.doesNeedContextPosition = function() {
  return this.needContextPosition_;
};


/**
 * Sets whether the expression needs context position to be evaluated.
 *
 * @param {boolean} flag Whether context position is needed.
 */
wgxpath.Expr.prototype.setNeedContextPosition = function(flag) {
  this.needContextPosition_ = flag;
};


/**
 * Returns whether the expression needs context node to be evaluated.
 *
 * @return {boolean} Whether context node is needed.
 */
wgxpath.Expr.prototype.doesNeedContextNode = function() {
  return this.needContextNode_;
};


/**
 * Sets whether the expression needs context node to be evaluated.
 *
 * @param {boolean} flag Whether context node is needed.
 */
wgxpath.Expr.prototype.setNeedContextNode = function(flag) {
  this.needContextNode_ = flag;
};


/**
 * Returns the quick attribute information, if exists.
 *
 * @return {?{name: string, valueExpr: wgxpath.Expr}} The attribute
 *         information.
 */
wgxpath.Expr.prototype.getQuickAttr = function() {
  return this.quickAttr_;
};


/**
 * Sets up the quick attribute info.
 *
 * @param {?{name: string, valueExpr: wgxpath.Expr}} attrInfo The attribute
 *        information.
 */
wgxpath.Expr.prototype.setQuickAttr = function(attrInfo) {
  this.quickAttr_ = attrInfo;
};


/**
 * Evaluate and interpret the result as a number.
 *
 * @param {!wgxpath.Context} ctx The context to evaluate the expression in.
 * @return {number} The evaluated number value.
 */
wgxpath.Expr.prototype.asNumber = function(ctx) {
  var exrs = this.evaluate(ctx);
  if (exrs instanceof wgxpath.NodeSet) {
    return exrs.number();
  }
  return +exrs;
};


/**
 * Evaluate and interpret the result as a string.
 *
 * @param {!wgxpath.Context} ctx The context to evaluate the expression in.
 * @return {string} The evaluated string.
 */
wgxpath.Expr.prototype.asString = function(ctx) {
  var exrs = this.evaluate(ctx);
  if (exrs instanceof wgxpath.NodeSet) {
    return exrs.string();
  }
  return '' + exrs;
};


/**
 * Evaluate and interpret the result as a boolean value.
 *
 * @param {!wgxpath.Context} ctx The context to evaluate the expression in.
 * @return {boolean} The evaluated boolean value.
 */
wgxpath.Expr.prototype.asBool = function(ctx) {
  var exrs = this.evaluate(ctx);
  if (exrs instanceof wgxpath.NodeSet) {
    return !!exrs.getLength();
  }
  return !!exrs;
};
