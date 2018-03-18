import Component from '@ember/component';
import { assign } from '@ember/polyfills';
import { set, get, getProperties } from '@ember/object';
import { isPresent, typeOf } from '@ember/utils';

function deepObjectAssign(object) {
  Object.keys(object).forEach((key) => {
    if (typeOf(object[key]) === 'object') {
      object[key] = deepObjectAssign(object[key]);
    }
  });

  return assign({}, object);
}

export default Component.extend({
  classNames: ['ember-progress-bar'],
  hook: 'ember_progress_bar',
  onAnimationComplete: null,

  shape: 'Line',

  setProgress: null,

  defaultStep(state, bar) {
    bar.setText((bar.value() * 100).toFixed(0));
  },

  didInsertElement(...args) {
    this._super(...args);

    const shape = get(this, 'shape');
    const options = deepObjectAssign(get(this, 'options') || {});

    if (get(this, 'useDefaultStep')) {
      set(options, 'step', get(this, 'defaultStep'));
    }

    const progressBar = new ProgressBar[shape](this.element, options);

    set(this, 'progressBar', progressBar);
  },

  didRender(...args) {
    this._super(...args);

    const { progressBar, progress, setProgress } = getProperties(
      this,
      'progressBar',
      'progress',
      'setProgress'
    );

    if (isPresent(setProgress)) {
      progressBar.set(setProgress);
    }

    get(this, 'progressBar').animate(progress, () => {
      if (this.get('onAnimationComplete')) this.get('onAnimationComplete')();
    });
  },

  willDestroyElement(...args) {
    get(this, 'progressBar').destroy();

    this._super(...args);
  }
});
