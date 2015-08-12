/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Felix Jung @feju
*/

var path = require('path');
var utils = require('loader-utils');

module.exports = function(content) {
  this.cacheable && this.cacheable();

  // Parse query into options and add resourcePath to options
  var options = utils.parseQuery(this.query);
  options.resourcePath = this.resourcePath;

  var loaderCode = [
    '// inline-loader: inserts the content of a resource into the DOM.',
    '',
    '// Load the content.',
    'var content = ' + utils.stringifyRequest(this, content),
    '// Load the function to inline the content.',
    'var inline = require(' + utils.stringifyRequest(this, '!' + path.join(__dirname, 'lib/inline.js')) + ');',
    '// Insert content into the DOM.',
    'inline(content, ' + JSON.stringify(options) + ');',
    ''
  ].join('\n');

  return loaderCode;
};
