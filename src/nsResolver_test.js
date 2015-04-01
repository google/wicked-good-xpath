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

/**
 * Namespace resolver test.
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
