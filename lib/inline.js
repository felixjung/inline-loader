// Load required modules
var path = require('path');

module.exports = function(content, options) {

  // Check if parentId has been set. If not, default to empty id string.
  // This will result in content being inserted into <body>.
  if (!options.parentId || (typeof options.parentId !== 'string')) {
    options.parentId = '';
  }

  // Attach content to DOM
  addToDom(content, options.parentId, options.resourcePath);
}

function addToDom(content, parentId, resourcePath) {
  // Get the parent element we're going to attach the wrapper div to.
  var parentElement;
  if (parentId === '') {
    // Get the body element, if no id is specified.
    parentElement = document.getElementsByTagName('body')[0];
  } else {
    // Get the parent element by its id provided in the query.
    parentElement = document.getElementById(parentId);
  }

  // Gererate and set the id attribute for the wrapper.
  var nodeId = createNodeId(resourcePath);

  // Get the wrapper for the content, if already in document.
  var inlineDiv = document.getElementById(nodeId);

  // If wrapper is already in document, print a warning. Else create a new wrapper
  // node and set inner html.
  // TODO: support adding plain text instead of innerHTML
  if (inlineDiv === null) {
    // Create wrapper node.
    inlineDiv = document.createElement('div');
    // Set wrapper id.
    inlineDiv.setAttribute('id', nodeId);
    // Set content as inner html.
    inlineDiv.innerHTML = content;
    // Append the wrapper to the parent node.
    parentElement.appendChild(inlineDiv);
  }
}

function createNodeId(resourcePath) {
  var nodeId = 'inline-';
  var extension = path.extname(resourcePath);
  var filename = path.basename(resourcePath, extension);

  return nodeId + filename;
}
