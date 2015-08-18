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
 * @fileoverview Namespace resolver test.
 * @author gdennis@google.com (Greg Dennis)
 */

goog.require('goog.dom');
goog.require('goog.testing.jsunit');
goog.require('wgxpath.nsResolver');


function setUpPage() {
  document.documentElement.setAttribute('xmlns:a', 'http://www.example.org/a');
  document.documentElement.setAttribute('xmlns:b', 'http://www.example.org/b');
}

function testDocumentResolver() {
  var resolver = wgxpath.nsResolver.getResolver(document);
  assertEquals('http://www.w3.org/1999/xhtml', resolver(null));
  assertEquals('http://www.example.org/a', resolver('a'));
  assertEquals('http://www.example.org/b', resolver('b'));
  assertEquals(null, resolver('c'));
}

function testElementResolver() {
  var elem = goog.dom.getRequiredElement('elem');
  var resolver = wgxpath.nsResolver.getResolver(elem);
  assertEquals('http://www.w3.org/1999/xhtml', resolver(null));
  assertEquals('http://www.example.org/a2', resolver('a'));
  assertEquals('http://www.example.org/b', resolver('b'));
  assertEquals(null, resolver('c'));
}

function testAttributeResolver() {
  var attr = document.getElementById('elem').attributes[0];
  var resolver = wgxpath.nsResolver.getResolver(attr);
  assertEquals(null, resolver(null));
  assertEquals(null, resolver('a'));
  assertEquals(null, resolver('b'));
  assertEquals(null, resolver('c'));
}

function testDocumentFragmentResolver() {
  var docFragment = document.createDocumentFragment();
  var resolver = wgxpath.nsResolver.getResolver(docFragment);
  assertEquals(null, resolver(null));
  assertEquals(null, resolver('a'));
  assertEquals(null, resolver('b'));
  assertEquals(null, resolver('c'));
}
