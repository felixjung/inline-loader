/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Felix Jung @feju
*/

var path = require('path');
var utils = require('loader-utils');

module.exports = function(content) {
  this.cacheable && this.cacheable();

  // Parse query into options and add resourcePath to options
  var query = utils.parseQuery(this.query);
  var options = {
      resourcePath: this.resourcePath
  };

  // relativeTo from https://github.com/WearyMonkey/ngtemplate-loader
  var relativeTo = query.relativeTo || '';
  var absolute = false;
  var pathSep = query.pathSep || '/';
  var resource = this.resource;
  var pathSepRegex = new RegExp(escapeRegExp(path.sep), 'g');

  // if a unix path starts with // we treat is as an absolute path e.g. //Users/felixjung
  // if we're on windows, then we ignore the / prefix as windows absolute paths are unique anyway e.g. C:\Users\felixjung
  if (relativeTo[0] == '/') {
      if (path.sep == '\\') { // we're on windows
          relativeTo = relativeTo.substring(1);
      } else if (relativeTo[1] == '/') {
          absolute = true;
          relativeTo = relativeTo.substring(1);
      }
  }

  // normalise the path separators
  if (path.sep != pathSep) {
      relativeTo = relativeTo.replace(pathSepRegex, pathSep);
      resource = resource.replace(pathSepRegex, pathSep)
  }

  var relativeToIndex = resource.indexOf(relativeTo);
  if (relativeToIndex === -1 || (absolute && relativeToIndex !== 0)) {
      throw 'The path for file doesn\'t contain relativeTo param';
  }

  // reassign resource path
  options.resourcePath = resource.slice(relativeToIndex + relativeTo.length); // get the base path

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

  // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegExp(string) {
      return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
};
