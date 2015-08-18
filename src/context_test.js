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
 * @fileoverview Context test.
 * @author evanrthomas@google.com (Evan Thomas)
 */

goog.require('goog.dom');
goog.require('goog.testing.jsunit');
goog.require('wgxpath.Context');


var div;

function setUpPage() {
  div = goog.dom.getRequiredElement('div');
}

function testConstructContextWithPositionAndLastArguments() {
  var ctx = new wgxpath.Context(div, 10, 20);
  assertEquals(ctx.getNode(), div);
  assertEquals(ctx.getPosition(), 10);
  assertEquals(ctx.getLast(), 20);
}

function testConstructContextWithNoArguments() {
  var ctx = new wgxpath.Context(div);
  assertEquals(ctx.getNode(), div);
  assertEquals(ctx.getPosition(), 1);
  assertEquals(ctx.getLast(), 1);
}

function testConstructContextWithPosition() {
  var ctx = new wgxpath.Context(div, 5);
  assertEquals(ctx.getPosition(), 5);
  assertEquals(ctx.getLast(), 1);
}
