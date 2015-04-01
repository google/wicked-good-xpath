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

// Copyright 2012 Google Inc. All Rights Reserved.

/**
 * @fileoverview An interface for the NodeTest construct.
 * @author moz@google.com (Michael Zhou)
 */

goog.provide('wgxpath.NodeTest');



/**
 * The NodeTest interface to represent the NodeTest production
 * in the xpath grammar:
 * http://www.w3.org/TR/xpath-30/#prod-xpath30-NodeTest
 *
 * @interface
 */
wgxpath.NodeTest = function() {};


/**
 * Tests if a node matches the stored characteristics.
 *
 * @param {wgxpath.Node} node The node to be tested.
 * @return {boolean} Whether the node passes the test.
 */
wgxpath.NodeTest.prototype.matches = goog.abstractMethod;


/**
 * Returns the name of the test.
 *
 * @return {string} The name, either nodename or type name.
 */
wgxpath.NodeTest.prototype.getName = goog.abstractMethod;


/**
 * @override
 */
wgxpath.NodeTest.prototype.toString = goog.abstractMethod;
