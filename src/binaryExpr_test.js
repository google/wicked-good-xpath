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
 * @fileoverview Binary expression test.
 * @author moz@google.com (Michael Zhou)
 */

goog.require('goog.testing.jsunit');
goog.require('wgxpath.BinaryExpr');
goog.require('wgxpath.Context');
goog.require('wgxpath.DataType');
goog.require('wgxpath.Expr');
goog.require('wgxpath.Number');


// TODO(moz): Add tests involving wgxpath.NodeSet.
function assertBinaryExprEvaluatesTo(expected, op, left, right) {
  var expr = new wgxpath.BinaryExpr(op, new wgxpath.Number(left),
                                    new wgxpath.Number(right));
  assertEquals(expected, expr.evaluate(new wgxpath.Context(document)));
}

function testConstructorSetContextPosition() {
  var fakeLeft = new wgxpath.Expr(wgxpath.DataType.NUMBER);
  var fakeRight = new wgxpath.Expr(wgxpath.DataType.NUMBER);
  fakeRight.setNeedContextPosition(true);
  var expr = new wgxpath.BinaryExpr(wgxpath.BinaryExpr.Op.EQUAL, fakeLeft,
                                    fakeRight);
  assertEquals(true, expr.doesNeedContextPosition());
  fakeRight.setNeedContextPosition(false);
  expr = new wgxpath.BinaryExpr(wgxpath.BinaryExpr.Op.EQUAL, fakeLeft,
                                fakeRight);
  assertEquals(false, expr.doesNeedContextPosition());
}

function testConstructorSetContextNode() {
  var fakeLeft = new wgxpath.Expr(wgxpath.DataType.NUMBER);
  var fakeRight = new wgxpath.Expr(wgxpath.DataType.NUMBER);
  fakeRight.setNeedContextNode(true);
  var expr = new wgxpath.BinaryExpr(wgxpath.BinaryExpr.Op.EQUAL, fakeLeft,
                                    fakeRight);
  assertEquals(true, expr.doesNeedContextNode());
  fakeRight.setNeedContextNode(false);
  expr = new wgxpath.BinaryExpr(wgxpath.BinaryExpr.Op.EQUAL, fakeLeft,
                                fakeRight);
  assertEquals(false, expr.doesNeedContextNode());
}

function testSetQuickAttr() {
  var fakeLeft = new wgxpath.Expr(wgxpath.DataType.NUMBER);
  var fakeRight = new wgxpath.Expr(wgxpath.DataType.NUMBER);
  fakeRight.setQuickAttr({
    name: 'fakeName',
    valueExpr: null});
  var expr = new wgxpath.BinaryExpr(wgxpath.BinaryExpr.Op.EQUAL, fakeLeft,
                                    fakeRight);
  var fakeQuickAttr = expr.getQuickAttr();
  assertEquals('fakeName', fakeQuickAttr.name);
  assertEquals(fakeLeft, fakeQuickAttr.valueExpr);
}

function testEvaluatePlus() {
  assertBinaryExprEvaluatesTo(3, wgxpath.BinaryExpr.Op.PLUS, 1, 2);
}

function testEvaluateMinus() {
  assertBinaryExprEvaluatesTo(-1, wgxpath.BinaryExpr.Op.MINUS, 1, 2);
}

function testEvaluateMult() {
  assertBinaryExprEvaluatesTo(12, wgxpath.BinaryExpr.Op.MULT, 3, 4);
}

function testEvaluateDiv() {
  assertBinaryExprEvaluatesTo(3, wgxpath.BinaryExpr.Op.DIV, 6, 2);
}

function testEvaluateMod() {
  assertBinaryExprEvaluatesTo(1, wgxpath.BinaryExpr.Op.MOD, 25, 4);
}

function testEvaluateLessThan() {
  assertBinaryExprEvaluatesTo(true, wgxpath.BinaryExpr.Op.LESSTHAN, 1, 2);
  assertBinaryExprEvaluatesTo(false, wgxpath.BinaryExpr.Op.LESSTHAN, 2, 1);
  assertBinaryExprEvaluatesTo(false, wgxpath.BinaryExpr.Op.LESSTHAN, 2, 2);
}

function testEvaluateGreaterThan() {
  assertBinaryExprEvaluatesTo(false, wgxpath.BinaryExpr.Op.GREATERTHAN, 1, 2);
  assertBinaryExprEvaluatesTo(true, wgxpath.BinaryExpr.Op.GREATERTHAN, 2, 1);
  assertBinaryExprEvaluatesTo(false, wgxpath.BinaryExpr.Op.GREATERTHAN, 2, 2);
}

function testEvaluateLessThanEqual() {
  assertBinaryExprEvaluatesTo(true, wgxpath.BinaryExpr.Op.LESSTHAN_EQUAL, 1, 2);
  assertBinaryExprEvaluatesTo(false, wgxpath.BinaryExpr.Op.LESSTHAN_EQUAL,
                              2, 1);
  assertBinaryExprEvaluatesTo(true, wgxpath.BinaryExpr.Op.LESSTHAN_EQUAL,
                              2, 2);
}

function testEvaluateGreaterThanEqual() {
  assertBinaryExprEvaluatesTo(false,
                              wgxpath.BinaryExpr.Op.GREATERTHAN_EQUAL, 1, 2);
  assertBinaryExprEvaluatesTo(true,
                              wgxpath.BinaryExpr.Op.GREATERTHAN_EQUAL, 2, 1);
  assertBinaryExprEvaluatesTo(true,
                              wgxpath.BinaryExpr.Op.GREATERTHAN_EQUAL, 2, 2);
}

function testEvaluateEqual() {
  assertBinaryExprEvaluatesTo(false, wgxpath.BinaryExpr.Op.EQUAL, 1, 2);
  assertBinaryExprEvaluatesTo(true, wgxpath.BinaryExpr.Op.EQUAL, 2, 2);
}

function testEvaluateNotEqual() {
  assertBinaryExprEvaluatesTo(true, wgxpath.BinaryExpr.Op.NOT_EQUAL, 1, 2);
  assertBinaryExprEvaluatesTo(false, wgxpath.BinaryExpr.Op.NOT_EQUAL, 2, 2);
}
