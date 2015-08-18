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
 * @fileoverview Lexer test.
 * @author moz@google.com (Michael Zhou)
 */

goog.require('goog.testing.jsunit');
goog.require('wgxpath.Lexer');


function testTokenize() {
  var sourcePath = '//*[@id="i"]';
  var expectedTokens = ['//', '*', '[', '@', 'id', '=', '"i"', ']'];
  var resultLexer = wgxpath.Lexer.tokenize(sourcePath);
  var expectedLexer = new wgxpath.Lexer(expectedTokens);
  for (var i = 0; i < expectedTokens.length; i++) {
    assertEquals(expectedLexer.next(), resultLexer.next());
  }
}

function testNext() {
  var expectedTokens = ['/', 'bookstore', '/', 'book', '[', 'price', '>',
                        '35.00', ']'];
  var resultLexer = new wgxpath.Lexer(expectedTokens);
  for (var i = 0; i < expectedTokens.length; i++) {
    assertEquals(expectedTokens[i], resultLexer.next());
  }
}

function testEmpty() {
  var resultLexer = new wgxpath.Lexer([]);
  assertEquals(true, resultLexer.empty());
}

function testPeek() {
  var expectedTokens = ['name', '(', '"some_name"', ')'];
  var resultLexer = new wgxpath.Lexer(expectedTokens);
  assertEquals(expectedTokens[0], resultLexer.peek());
  for (var i = 0; i < expectedTokens.length; i++) {
    assertEquals(expectedTokens[i], resultLexer.peek(i));
  }
}

function testBack() {
  var expectedTokens = ['..', '/', 'contents', '/', 'child', '::',
                        'sections'];
  var resultLexer = new wgxpath.Lexer(expectedTokens);
  for (var i = 0; i < expectedTokens.length; i++) {
    resultLexer.next();
  }
  resultLexer.back();
  assertEquals(expectedTokens[expectedTokens.length - 1],
               resultLexer.next());
}
