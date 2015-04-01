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
 * @fileoverview Constants for user agent detection.
 * @author moz@google.com (Michael Zhou)
 */

goog.provide('wgxpath.userAgent');

goog.require('goog.userAgent');


/**
 * @type {boolean}
 * @const
 */
wgxpath.userAgent.IE_DOC_PRE_9 = goog.userAgent.IE &&
    !goog.userAgent.isDocumentModeOrHigher(9);


/**
 * @type {boolean}
 * @const
 */
wgxpath.userAgent.IE_DOC_PRE_8 = goog.userAgent.IE &&
    !goog.userAgent.isDocumentModeOrHigher(8);
