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
 * Kind test.
 *
 * Copyright 2012 Google Inc. All Rights Reserved.
 * Author: moz@google.com (Michael Zhou)
 */

goog.require('goog.dom.NodeType');
goog.require('goog.testing.jsunit');
goog.require('wgxpath.KindTest');


var testNode;

function setUpPage() {
  testNode =  /** @type {!Node} */(document.getElementById('div-1').firstChild);
}

// TODO: Add test case for PI nodes.
function testIsValid() {
  var nodeTypeName = 'test()';
  assert(!wgxpath.KindTest.isValidType(nodeTypeName));
}

function testMatches() {
  var resultKindTest = new wgxpath.KindTest('text');
  assert(resultKindTest.matches(testNode));
}

function testNotMatches() {
  var resultKindTest = new wgxpath.KindTest('comment');
  assert(!resultKindTest.matches(testNode));
}
