 /**
  * @license
  * The MIT License
  *
  * Copyright (c) 2007 Cybozu Labs, Inc.
  * Copyright (c) 2012 Google Inc.
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to
  * deal in the Software without restriction, including without limitation the
  * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
  * sell copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in
  * all copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
  * IN THE SOFTWARE.
  */

/**
 * @fileoverview Predicates test.
 * @author evanrthomas@google.com (Evan Thomas)
 */

goog.require('goog.dom');
goog.require('goog.testing.jsunit');
goog.require('wgxpath.NodeSet');
goog.require('wgxpath.Predicates');


/**
  * The nodeset with the nodes for the predicates to be evaluated against.
  */
var nodeset;

function setUp() {
  nodeset = new wgxpath.NodeSet();
  nodeset.add(goog.dom.getRequiredElement('1'));
  nodeset.add(goog.dom.getRequiredElement('2'));
  nodeset.add(goog.dom.getRequiredElement('3'));
  nodeset.add(goog.dom.getRequiredElement('4'));
  nodeset.add(goog.dom.getRequiredElement('5'));
}

/**
  * Asserts that these predicates evaluated against the nodeset defined
  * in setup yields these nodes.
  *
  * @param {!Array.<!Object>} predicatesArray An array of the fake
  *     predicates.
  * @param {!Array.<string>} ids An array with the ids of the nodes that
  *     should result from evaluating these predicates against nodeset.
  */
function assertEvaluatesTo(predicatesArray, ids) {
  var predicates = new wgxpath.Predicates(predicatesArray);
  var result = predicates.evaluatePredicates(nodeset);

  assertEquals(result.getLength(), ids.length);
  var iter = result.iterator();
  for (var i = 0; i < ids.length; i++) {
    assertEquals(iter.next(), goog.dom.getRequiredElement(ids[i]));
  }
  assertEquals(null, iter.next());
}


function makePredicate(evaluate) {
  return {evaluate: evaluate};
}

function testEvaluatePredicatesNumber() {
  var predicate = makePredicate(function(ctx) {
    return 1;
  });
  assertEvaluatesTo([predicate], ['1']);
}

function testEvaluatePredicatesString() {
  // If the predicate evaluates to any non-empty string against some node,
  // that node is kept.
  var predicate = makePredicate(function(ctx) {
    return ctx.getNode().id == 2 ? 'some string' : '';
  });
  assertEvaluatesTo([predicate], ['2']);
}

function testEvaluatePredicatesBoolean() {
  var predicate = makePredicate(function(ctx) {
    return ctx.getNode().id == 1 || ctx.getNode().id == 3;
  });
  assertEvaluatesTo([predicate], ['1', '3']);
}

function testEvaluatePredicatesNodeSet() {
  // If the predicate evaluates to any non-empty nodeset against some node,
  // that node is kept.
  var predicate = makePredicate(function(ctx) {
    var nonEmptyNodeSet = new wgxpath.NodeSet();
    nonEmptyNodeSet.add(goog.dom.getRequiredElement('1'));

    var emptyNodeSet = new wgxpath.NodeSet();
    return ctx.getNode().id == 3 ? nonEmptyNodeSet : emptyNodeSet;
  });
  assertEvaluatesTo([predicate], ['3']);
}

function testEvaluatePredicatesUnsupportedType() {
  var predicate = makePredicate(function(ctx) {
    return {};
  });
  var predicates =
      new wgxpath.Predicates([predicate]);
  assertThrows(function() {
    predicates.evaluatePredicates(nodeset);
  });
}

function testEvaluateMultiplePredicates() {
  var predicate1 = makePredicate(function(ctx) {
    return ctx.getNode().id % 2 == 1;
  });

  var predicate2 = makePredicate(function(ctx) {
    return 2;
  });
  assertEvaluatesTo([predicate1, predicate2], ['3']);
}
