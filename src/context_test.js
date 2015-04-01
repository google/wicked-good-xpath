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
 * Context test.
 *
 * Copyright 2012 Google Inc. All Rights Reserved.
 * Author: evanrthomas@google.com (Evan Thomas)
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
