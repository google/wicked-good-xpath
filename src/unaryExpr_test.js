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
 * Unary expression test.
 *
 * Copyright 2012 Google Inc. All Rights Reserved.
 * Author: moz@google.com (Michael Zhou)
 */

goog.require('goog.testing.jsunit');
goog.require('wgxpath.Context');
goog.require('wgxpath.DataType');
goog.require('wgxpath.Expr');
goog.require('wgxpath.Number');
goog.require('wgxpath.UnaryExpr');


function testConstructorSetContextPosition() {
  var fakeExpr = new wgxpath.Expr(wgxpath.DataType.NUMBER);
  fakeExpr.setNeedContextPosition(true);
  var expr = new wgxpath.UnaryExpr(fakeExpr);
  assertEquals(true, expr.doesNeedContextPosition());
  fakeExpr.setNeedContextPosition(false);
  expr = new wgxpath.UnaryExpr(fakeExpr);
  assertEquals(false, expr.doesNeedContextPosition());
}

function testConstructorSetContextNode() {
  var fakeExpr = new wgxpath.Expr(wgxpath.DataType.NUMBER);
  fakeExpr.setNeedContextNode(true);
  var expr = new wgxpath.UnaryExpr(fakeExpr);
  assertEquals(true, expr.doesNeedContextNode());
  fakeExpr.setNeedContextNode(false);
  expr = new wgxpath.UnaryExpr(fakeExpr);
  assertEquals(false, expr.doesNeedContextNode());
}

function testEvaluate() {
  var expr = new wgxpath.UnaryExpr(new wgxpath.Number(3));
  assertEquals(-3, expr.evaluate(new wgxpath.Context(document)));
}
