/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');

function findRoot(current) {
  var app;

  // Keep iterating upward until we don't have a grandparent.
  // Has to do this grandparent check because at some point we hit the project.
  do {
    app = current.app || app;
  } while (current.parent && current.parent.parent && (current = current.parent));

  return app;
}

module.exports = {
  name: 'ember-progress-bar',

  treeForVendor: function() {
    var treePath = path.join(path.dirname(require.resolve('progressbar.js')), '/..')
    return new Funnel(treePath, {
      destDir: 'progressbar.js'
    });
  },

  treeForAddon: function() {
    var app = findRoot(this);

    app.import('vendor/progressbar.js/dist/progressbar.min.js');

    return this._super.treeForAddon.apply(this, arguments);
  }
};
