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
 * @fileoverview Wrapper classes for attribute nodes in old IE browsers.
 * @author moz@google.com (Michael Zhou)
 */

goog.provide('wgxpath.IEAttrWrapper');

goog.require('goog.dom.NodeType');
goog.require('wgxpath.userAgent');



/**
 * A wrapper for an attribute node in old IE.
 *
 * <p> Note: Although sourceIndex is equal to node.sourceIndex, it is
 * denormalized into a separate parameter for performance, so that clients
 * constructing multiple IEAttrWrappers can pass in the same sourceIndex
 * rather than re-querying it each time.
 *
 * @constructor
 * @extends {Attr}
 * @param {!Node} node The attribute node.
 * @param {!Node} parent The parent of the attribute node.
 * @param {string} nodeName The name of the attribute node.
 * @param {(string|number|boolean)} nodeValue The value of the attribute node.
 * @param {number} sourceIndex The source index of the parent node.
 */
wgxpath.IEAttrWrapper = function(node, parent, nodeName, nodeValue,
    sourceIndex) {
  /**
   * @type {!Node}
   * @private
   */
  this.node_ = node;

  /**
   * @type {string}
   */
  this.nodeName = nodeName;

  /**
   * @type {(string|number|boolean)}
   */
  this.nodeValue = nodeValue;

  /**
   * @type {goog.dom.NodeType}
   */
  this.nodeType = goog.dom.NodeType.ATTRIBUTE;

  /**
   * @type {!Node}
   */
  this.ownerElement = parent;

  /**
   * @type {number}
   * @private
   */
  this.parentSourceIndex_ = sourceIndex;

  /**
   * @type {!Node}
   */
  this.parentNode = parent;
};


/**
 * Creates a wrapper for an attribute node in old IE.
 *
 * @param {!Node} parent The parent of the attribute node.
 * @param {!Node} attr The attribute node.
 * @param {number} sourceIndex The source index of the parent node.
 * @return {!wgxpath.IEAttrWrapper} The constcuted wrapper.
 */
wgxpath.IEAttrWrapper.forAttrOf = function(parent, attr, sourceIndex) {
  var nodeValue = (wgxpath.userAgent.IE_DOC_PRE_8 && attr.nodeName == 'href') ?
      parent.getAttribute(attr.nodeName, 2) : attr.nodeValue;
  return new wgxpath.IEAttrWrapper(attr, parent, attr.nodeName, nodeValue,
      sourceIndex);
};


/**
 * Creates a wrapper for a style attribute node in old IE.
 *
 * @param {!Node} parent The parent of the attribute node.
 * @param {number} sourceIndex The source index of the parent node.
 * @return {!wgxpath.IEAttrWrapper} The constcuted wrapper.
 */
wgxpath.IEAttrWrapper.forStyleOf = function(parent, sourceIndex) {
  return new wgxpath.IEAttrWrapper(parent.style, parent, 'style',
      parent.style.cssText, sourceIndex);
};


/**
 * Returns the source index of the parent of the attribute node.
 *
 * @return {number} The source index of the parent.
 */
wgxpath.IEAttrWrapper.prototype.getParentSourceIndex = function() {
  return this.parentSourceIndex_;
};


/**
 * Returns the attribute node contained in the wrapper.
 *
 * @return {!Node} The original attribute node.
 */
wgxpath.IEAttrWrapper.prototype.getNode = function() {
  return this.node_;
};
