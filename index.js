/* jshint node: true */
'use strict';

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
    return new Funnel('node_modules/progressbar.js', {
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
