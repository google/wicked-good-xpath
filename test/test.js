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
 * @fileoverview Utility class for the XPath test suite.
 * @author moz@google.com (Michael Zhou)
 */


goog.provide('wgxpath.test');


goog.require('goog.dom');
goog.require('goog.dom.NodeType');
goog.require('goog.userAgent');


/**
 * Whether the browser is Android Froyo.
 *
 * @const
 * @type {boolean}
 */
wgxpath.test.ANDROID_FROYO =
    /Android\s+2\.2/.test(goog.userAgent.getUserAgentString());


/**
 * Whether the browser is IE and has a document mode < 9.
 *
 * @const
 * @type {boolean}
 */
wgxpath.test.IE_DOC_PRE_9 =
    goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9);


/**
 * Whether the browser is IE and has a document mode < 10.
 *
 * @const
 * @type {boolean}
 */
wgxpath.test.IE_DOC_PRE_10 =
    goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(10);


/**
 * Checks if a node matches the expected one.
 *
 * @param {string} expected The string representation of the expected node.
 * @param {!Node} node The node to check.
 * @return {boolean} Whether the node is the expected one.
 * @private
 */
wgxpath.test.isNodeExpected_ = function(expected, node) {
  return expected.indexOf('(') == - 1 ?
      wgxpath.test.isElementExpected_(expected, node) :
      wgxpath.test.isNonElementExpected_(expected, node);
};


/**
 * Checks if an element matches the expected one.
 *
 * @param {string} expected The string representation of the expected node.
 * @param {!Node} node The node to check.
 * @return {boolean} Whether the node is the expected one.
 * @private
 */
wgxpath.test.isElementExpected_ = function(expected, node) {
  if (node.nodeType != goog.dom.NodeType.ELEMENT) {
    return false;
  }
  var m = expected.match(/(\w+)(?:([#\.])([\w\s-]+))?/);
  var nodeName = m[1], propertyDelimiter = m[2], propertyValue = m[3];
  if (node.nodeName.toLowerCase() != nodeName) {
    return false;
  }
  if (propertyDelimiter) {
    switch (propertyDelimiter) {
      case '.':
        return node.className == propertyValue;
      case '#':
        return node.id == propertyValue;
      default:
        throw new Error('Unknown delimiter: ' + propertyDelimiter);
    }
  }
  return true;
};


/**
 * Checks if a non-element node matches the expected one.
 *
 * @param {string} expected The string representation of the expected node.
 * @param {!Node} node The node to check.
 * @return {boolean} Whether the node is the expected one.
 * @private
 */
wgxpath.test.isNonElementExpected_ = function(expected, node) {
  var m = expected.match(/([\w-]+)\(([\w-=\?"'\s\\:]*)\)/);
  var nodeTypeName = m[1], nodeArgs = m[2];
  var nodeType = wgxpath.test.NON_ELEMENT_NAME_TO_TYPE_MAP_[nodeTypeName];
  if (node.nodeType != nodeType) {
    return false;
  }
  switch (nodeType) {
    case goog.dom.NodeType.ATTRIBUTE:
    case goog.dom.NodeType.PROCESSING_INSTRUCTION:
      var mArgs = nodeArgs.match(/([\w-]+)(?:=)([\w-'"\s]+)/);
      nodeName = mArgs[1];
      nodeValue = mArgs[2];
      break;
    case goog.dom.NodeType.TEXT:
    case goog.dom.NodeType.CDATA_SECTION:
    case goog.dom.NodeType.COMMENT:
      nodeName = '#' + nodeTypeName;
      nodeValue = nodeArgs;
      break;
    case goog.dom.NodeType.DOCUMENT:
      nodeName = '#document';
      nodeValue = null;
      break;
    default:
      throw new Error('Unknown node type: ' + nodeType);
  }
  if (node.nodeName.toLowerCase() != nodeName) {
    return false;
  }
  if (!goog.isNull(nodeValue) && node.nodeValue != nodeValue) {
    return false;
  }
  return true;
};


/**
 * Maps non-element node names to node types.
 *
 * @const
 * @type {!Object.<string, goog.dom.NodeType>}
 * @private
 */
wgxpath.test.NON_ELEMENT_NAME_TO_TYPE_MAP_ = {
  'attribute': goog.dom.NodeType.ATTRIBUTE,
  'text': goog.dom.NodeType.TEXT,
  'cdata-section': goog.dom.NodeType.CDATA_SECTION,
  'entity-reference': goog.dom.NodeType.ENTITY_REFERENCE,
  'entity': goog.dom.NodeType.ENTITY,
  'processing-instruction': goog.dom.NodeType.PROCESSING_INSTRUCTION,
  'comment': goog.dom.NodeType.COMMENT,
  'document': goog.dom.NodeType.DOCUMENT,
  'document-type': goog.dom.NodeType.DOCUMENT_TYPE,
  'document-fragment': goog.dom.NodeType.DOCUMENT_FRAGMENT,
  'notation': goog.dom.NodeType.NOTATION
};


/**
 * The context to evaluate test cases in.
 *
 * @type {{node: !Node, doc: !Document, nsResolver: !XPathNSResolver}}
 * @private
 */
wgxpath.test.context_;


/**
 * Installs the library on the window of the given context node and sets this
 * node to be the context for subsequent calls to the assertEvalutesTo* methods.
 *
 * @param {!Node} node The context node to evaluate test cases in.
 */
wgxpath.test.setContext = function(node) {
  var doc = goog.dom.getOwnerDocument(node);
  var win = goog.dom.getWindow(doc);

  // The Android Froyo WebDriver injects an old XPath library automatically
  // on the top window, which causes our installation to be a noop, unless we
  // specifically delete that old implementation.
  if (wgxpath.test.ANDROID_FROYO && win == win.top) {
    win.document.evaluate = null;
  }

  wgxpath.install(win);
  window.XPathResult = win.XPathResult;

  var nsResolver = doc.createNSResolver(doc.documentElement);
  wgxpath.test.context_ = {node: node, doc: doc, nsResolver: nsResolver};
};


/**
 * Executes an xpath expression.
 *
 * @param {string} expr The expression to evaluate.
 * @param {number} type The type of the xpath result to return.
 * @param {(function(string): ?string)=} opt_nsResolver
 *     Optional custom namespace resolver.
 * @return {!XPathResult} The evaluation result.
 * @private
 */
wgxpath.test.evaluatePath_ = function(expr, type, opt_nsResolver) {
  var nsResolver = goog.isDef(opt_nsResolver) ? opt_nsResolver :
      wgxpath.test.context_.nsResolver;
  var startTime = goog.now();
  var result = wgxpath.test.context_.doc.evaluate(
      expr, wgxpath.test.context_.node, nsResolver, type, /* result */ null);
  // TODO: Use this number for benchmarking eventually.
  var elapsedTime = goog.now() - startTime;
  return result;
};


/**
 * Executes one test case that evaluates to nodeset.
 *
 * @param {!Array.<string>} expected The expected result.
 * @param {string} expr The expression to evaluate.
 * @param {(function(string): ?string)=} opt_nsResolver
 *     Optional custom namespace resolver.
 */
wgxpath.test.assertEvaluatesToNodeSet = function(expected, expr,
    opt_nsResolver) {
  var result = wgxpath.test.evaluatePath_(
      expr, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, opt_nsResolver);
  assertEquals(expected.length, result.snapshotLength);
  for (var i = 0; i < result.snapshotLength; i++) {
    assert(wgxpath.test.isNodeExpected_(expected[i], result.snapshotItem(i)));
  }
};


/**
 * Executes one test case that evaluates to a value.
 *
 * @param {(string|boolean|number)} expected The expected result.
 * @param {string} expr The expression to evaluate.
 * @param {(XPathNSResolver|function(string): ?string)=} opt_nsResolver
 *     Optional namespace resolver.
 */
wgxpath.test.assertEvaluatesToValue = function(expected, expr, opt_nsResolver) {
  var result = wgxpath.test.evaluatePath_(
      expr, XPathResult.ANY_TYPE, opt_nsResolver);
  if (result.resultType == XPathResult.NUMBER_TYPE) {
    assertEquals(expected, result.numberValue);
  } else if (result.resultType == XPathResult.STRING_TYPE) {
    assertEquals(expected, result.stringValue);
  } else if (result.resultType == XPathResult.BOOLEAN_TYPE) {
    assertEquals(expected, result.booleanValue);
  } else {
    throw new Error('Unknown result type: ' + result.resultType);
  }
};
