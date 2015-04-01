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
 * @fileoverview A class representing operations on union expressions.
 * @author moz@google.com (Michael Zhou)
 */

goog.provide('wgxpath.UnionExpr');

goog.require('goog.array');
goog.require('wgxpath.DataType');
goog.require('wgxpath.Expr');
goog.require('wgxpath.NodeSet');



/**
 * Constructor for UnionExpr.
 *
 * @param {!Array.<!wgxpath.Expr>} paths The paths in the union.
 * @extends {wgxpath.Expr}
 * @constructor
 */
wgxpath.UnionExpr = function(paths) {
  wgxpath.Expr.call(this, wgxpath.DataType.NODESET);

  /**
   * @type {!Array.<!wgxpath.Expr>}
   * @private
   */
  this.paths_ = paths;
  this.setNeedContextPosition(goog.array.some(this.paths_, function(p) {
    return p.doesNeedContextPosition();
  }));
  this.setNeedContextNode(goog.array.some(this.paths_, function(p) {
    return p.doesNeedContextNode();
  }));
};
goog.inherits(wgxpath.UnionExpr, wgxpath.Expr);


/**
 * @override
 * @return {!wgxpath.NodeSet} The nodeset result.
 */
wgxpath.UnionExpr.prototype.evaluate = function(ctx) {
  var nodeset = new wgxpath.NodeSet();
  goog.array.forEach(this.paths_, function(p) {
    var result = p.evaluate(ctx);
    if (!(result instanceof wgxpath.NodeSet)) {
      throw Error('Path expression must evaluate to NodeSet.');
    }
    nodeset = wgxpath.NodeSet.merge(nodeset, result);
  });
  return nodeset;
};


/**
 * @override
 */
wgxpath.UnionExpr.prototype.toString = function() {
  return goog.array.reduce(this.paths_, function(prev, curr) {
    return prev + wgxpath.Expr.indent(curr);
  }, 'Union Expression:');
};
