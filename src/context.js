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
 * @fileoverview Context information about nodes in their nodeset.
 * @author evanrthomas@google.com (Evan Thomas)
 */

goog.provide('wgxpath.Context');



/**
 * Provides information for where something is in the DOM.
 *
 * @param {!wgxpath.Node} node A node in the DOM.
 * @param {number=} opt_position The position of this node in its nodeset,
 *     defaults to 1.
 * @param {number=} opt_last Index of the last node in this nodeset,
 *     defaults to 1.
 * @constructor
 */
wgxpath.Context = function(node, opt_position, opt_last) {

  /**
    * @private
    * @type {!wgxpath.Node}
    */
  this.node_ = node;

  /**
   * @private
   * @type {number}
   */
  this.position_ = opt_position || 1;

  /**
   * @private
   * @type {number} opt_last
   */
  this.last_ = opt_last || 1;
};


/**
 * Returns the node for this context object.
 *
 * @return {!wgxpath.Node} The node for this context object.
 */
wgxpath.Context.prototype.getNode = function() {
  return this.node_;
};


/**
 * Returns the position for this context object.
 *
 * @return {number} The position for this context object.
 */
wgxpath.Context.prototype.getPosition = function() {
  return this.position_;
};


/**
 * Returns the last field for this context object.
 *
 * @return {number} The last field for this context object.
 */
wgxpath.Context.prototype.getLast = function() {
  return this.last_;
};
