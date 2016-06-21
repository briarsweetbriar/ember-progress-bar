/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel')

function getParentApp(app) {
  if (typeof app.import !== 'function' && app.app) {
    return getParentApp(app.app);
  } else {
    return app;
  }
}

module.exports = {
  name: 'ember-progress-bar',

  treeForVendor: function() {
    var treePath = path.dirname(require.resolve('progressbar.js')).split('/').slice(0, -1).join('/');
    return new Funnel(treePath, {
      destDir: 'progressbar.js'
    });
  },

  included: function(app) {
    this._super.included(app);

    app = getParentApp(app);

    app.import('vendor/progressbar.js/dist/progressbar.min.js');
  },

  safeIncluded: function(app, parent) {
    this.included(app, parent);
  }
};
