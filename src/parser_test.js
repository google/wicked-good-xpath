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
 * Parser test.
 *
 * Copyright 2012 Google Inc. All Rights Reserved.
 * Author: evanrthomas@google.com (Evan Thomas)
 */

goog.require('goog.dom.NodeType');
goog.require('goog.testing.jsunit');
goog.require('wgxpath.Lexer');
goog.require('wgxpath.Parser');


function createParser(tokens, opt_nsResolver) {
  var lexer = new wgxpath.Lexer(tokens);
  var nsResolver = opt_nsResolver || function() { return null; };
  return new wgxpath.Parser(lexer, nsResolver);
}

function testKindTest() {
  var parser = createParser(['text', '(', ')']);
  var kindTest = parser.parseKindTest_();
  assertEquals(goog.dom.NodeType.TEXT, kindTest.getType());
}

function testNameTestWithWildcard() {
  var parser = createParser(['*']);
  var nameTest = parser.parseNameTest_();
  assertEquals('*', nameTest.getName());
  assertEquals('http://www.w3.org/1999/xhtml', nameTest.getNamespaceUri());
}

function testNameTestWithName() {
  var parser = createParser(['nodename']);
  var nameTest = parser.parseNameTest_();
  assertEquals('nodename', nameTest.getName());
  assertEquals('http://www.w3.org/1999/xhtml', nameTest.getNamespaceUri());
}

function testNameTestWithWildcardAndNamespace() {
  var nsResolver = function(ns) {
    return ns == 'ns' ? 'http://scheme/uri' : null;
  };
  var parser = createParser(['ns:*'], nsResolver);
  var nameTest = parser.parseNameTest_();
  assertEquals('*', nameTest.getName());
  assertEquals('http://scheme/uri', nameTest.getNamespaceUri());
}

function testNameTestWithNameAndNamespace() {
  var nsResolver = function(ns) {
    return ns == 'ns' ? 'http://scheme/uri' : null;
  };
  var parser = createParser(['ns:nodename'], nsResolver);
  var nameTest = parser.parseNameTest_();
  assertEquals('nodename', nameTest.getName());
  assertEquals('http://scheme/uri', nameTest.getNamespaceUri());
}

function testUnknownNamespaceRaisesError() {
  var parser = createParser(['ns:nodename']);
  try {
    parser.parseNameTest_();
    fail('No exception was thrown.');
  } catch (e) {
    assertContains('ns', e.message);
  }
}

function parsePredicates(tokens) {
  // A fake Expr parser for Predicates to use internally.
  wgxpath.Parser.parseExpr_ = function(lexer) {
    lexer.next();
    return {};
  };
  var parser = createParser(tokens);
  return parser.parsePredicates_();
}

function testPredicatesNoPredicates() {
  var predicates = parsePredicates([]);
  assert(predicates.length == 0);
}

function testPredicatesSinglePredicates() {
  // [some expression]
  var predicates = parsePredicates(
      ['[', 'some expression', ']']);
  assert(predicates.length == 1);
}

function testPredicatesMultiplePredicates() {
  //[some expresion][some other expression]'
  var predicates = parsePredicates(['[', 'some expression', ']',
                                    '[', 'some other expression', ']']);
  assert(predicates.length == 2);

  //[some expression][some other expression][third expression]
  predicates = parsePredicates(['[', 'some expression', ']',
      '[', 'some other expression', ']', '[', 'third expression', ']']);
  assert(predicates.length == 3);
}

function testPredicatesUnclosedPredicate() {
  assertThrows(function() {
    parsePredicates(['[', 'some expression']);
  });
}

function testPredicatesEmptyPredicate() {
  assertThrows(function() {
    parsePredicates(['[']);
  });
}

function testPredicatesBadToken() {
  // Assuming Parser.Expr.parse works correctly, after the expression in a
  // predicate is parsed, the next token should be "]". Throw an error if
  // this is false.

  assertThrows(function() {
    parsePredicates(['[', 'expression', 'not a ]']);
  });
}
