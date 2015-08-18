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
 * @fileoverview Name test.
 * @author moz@google.com (Michael Zhou)
 */

goog.require('goog.dom');
goog.require('goog.testing.jsunit');
goog.require('wgxpath.NameTest');


function testStarMatchesWithoutNamespace() {
  var testNode = goog.dom.getRequiredElement('div-1');
  var resultNameTest = new wgxpath.NameTest('*');
  assertTrue(resultNameTest.matches(testNode));
}

function testStarMatchesWithHtmlNamespace() {
  var testNode = goog.dom.getRequiredElement('div-1');
  var resultNameTest = new wgxpath.NameTest('*',
                                            'http://www.w3.org/1999/xhtml');
  assertTrue(resultNameTest.matches(testNode));
}

function testStarMatchesWithNonHtmlNamespace() {
  if (!document.createElementNS) {
    return;
  }
  var testNode = document.createElementNS('http://www.google.com', 'div');
  var resultNameTest = new wgxpath.NameTest('*',
                                            'http://www.google.com');
  assertTrue(resultNameTest.matches(testNode));
}

function testNameMatchesWithoutNamespace() {
  var testNode = goog.dom.getRequiredElement('div-1');
  var resultNameTest = new wgxpath.NameTest('div');
  assertTrue(resultNameTest.matches(testNode));
}

function testNameMatchesWithHtmlNamespace() {
  var testNode = goog.dom.getRequiredElement('div-1');
  var resultNameTest = new wgxpath.NameTest('div',
                                            'http://www.w3.org/1999/xhtml');
  assertTrue(resultNameTest.matches(testNode));
}

function testNameMatchesWithNonHtmlNamespace() {
  if (!document.createElementNS) {
    return;
  }
  var testNode = document.createElementNS('http://www.google.com', 'div');
  var resultNameTest = new wgxpath.NameTest('div',
                                            'http://www.google.com');
  assertTrue(resultNameTest.matches(testNode));
}

function testNameDoesNotMatch() {
  var testNode = goog.dom.getRequiredElement('div-1');
  var resultNameTest = new wgxpath.NameTest('span');
  assertFalse(resultNameTest.matches(testNode));
}

function testNamespaceDoesNotMatch() {
  var testNode = goog.dom.getRequiredElement('div-1');
  var resultNameTest = new wgxpath.NameTest('div',
                                            'http://www.google.com');
  assertFalse(resultNameTest.matches(testNode));
}

function testNamespaceDoesNotMatchWithStar() {
  var testNode = goog.dom.getRequiredElement('div-1');
  var resultNameTest = new wgxpath.NameTest('*',
                                            'http://www.google.com');
  assertFalse(resultNameTest.matches(testNode));
}
