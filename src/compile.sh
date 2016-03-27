#!/bin/sh
#
# Script to compile Wicked Good XPath. This script assumes that you have
# Closure Compiler at ../../closure-compiler/build/compiler.jar and Closure
# Library at ../../closure-library. This script is now deprecated in favor
# of Gulp unless you are using Closure Compiler or Closure Library from HEAD.

echo "Compiling Wicked Good XPath with Closure Compiler..."
java -jar ../closure-compiler/build/compiler.jar \
    -O ADVANCED \
    --assume_function_wrapper \
    --dependency_mode STRICT \
    --entry_point goog:wgxpath \
    --language_in ES6_STRICT \
    --language_out ES5_STRICT \
    --js 'src/*.js' \
    --js '!src/*_test.js' \
    --js '../closure-library/closure/**/*.js' \
    --js '!../closure-library/closure/**/*_test.js' \
    --js_output_file wgxpath.install.js \
    --output_wrapper '(function(){%output%}).call(this)' \
    --use_types_for_optimization \
    --warning_level VERBOSE
if [ $? -eq 0 ]
then
  echo "Compilation succeeded."
else
  echo "Compilation failed."
fi
