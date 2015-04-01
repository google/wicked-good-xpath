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

/*
 * Binary expression test.
 *
 * Copyright 2012 Google Inc. All Rights Reserved.
 * Author: moz@google.com (Michael Zhou)
 */

goog.require('goog.testing.jsunit');
goog.require('wgxpath.BinaryExpr');
goog.require('wgxpath.Context');
goog.require('wgxpath.DataType');
goog.require('wgxpath.Expr');
goog.require('wgxpath.Number');


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
