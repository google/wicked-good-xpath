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
 * @fileoverview Parser test.
 * @author evanrthomas@google.com (Evan Thomas)
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
