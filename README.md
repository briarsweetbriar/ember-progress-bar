[![npm version](https://badge.fury.io/js/ember-progress-bar.svg)](https://badge.fury.io/js/ember-progress-bar)
[![Build Status](https://travis-ci.org/null-null-null/ember-progress-bar.svg?branch=master)](https://travis-ci.org/null-null-null/ember-progress-bar)

# ember-progress-bar

Wraps the versatile [ProgressBar.js](https://kimmobrunfeldt.github.io/progressbar.js/) in an Ember.js component.

## Installation

`ember install ember-progress-bar`

## Usage

`{{ember-progress-bar}}`

### `shape`

By default, `ember-progress-bar` renders a `Line` progress bar, but ProgressBar.js provides several other shapes, as well as an api for custom options. You can specify these with the `shape` attribute:

`{{ember-progress-bar shape="Circle"}}`

`{{ember-progress-bar shape="SemiCircle"}}`

`{{ember-progress-bar shape="Path"}}`

### `progress`

A float between 0 and 1, with 1 being progress complete:

`{{ember-progress-bar progress=progress}}`

### `setProgress`

The initial progress that the bar will render with.

`{{ember-progress-bar setProgress=0.5}}`

### `useDefaultStep`

A boolean, defaulting to `false`. If `true`, the component will render a number between 0 and 100, tracking the progress of the bar:

`{{ember-progress-bar useDefaultStep=true}}`

### `options`

A hash of options, which are fed directly to ProgressBar.js. Consult their [api](http://progressbarjs.readthedocs.io/en/latest/api/shape/#new-shapecontainer-options) for more info.

`{{ember-progress-bar options=(hash strokeWidth=10 duration=1000)}}`

### `onAnimationComplete`

An action which will be fired at animation end ( fired by [animated callback](http://progressbarjs.readthedocs.io/en/latest/api/path/#animateprogress-options-cb) ) to handle animation process.
