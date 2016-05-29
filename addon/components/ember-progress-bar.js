import Ember from 'ember';

const {
  Component,
  get,
  set
} = Ember;

export default Component.extend({
  classNames: ['ember-progress-bar'],
  hook: 'ember_progress_bar',

  shape: 'Line',
  options: { },

  defaultStep(state, bar) {
    bar.setText((bar.value() * 100).toFixed(0));
  },

  didInsertElement(...args) {
    this._super(...args);

    const shape = get(this, 'shape');
    const options = get(this, 'options');

    if (get(this, 'useDefaultStep')) {
      options.step = get(this, 'defaultStep');
    }

    const progressBar = new ProgressBar[shape](this.element, options);

    set(this, 'progressBar', progressBar);
  },

  didRender(...args) {
    this._super(...args);

    const progress = get(this, 'progress');

    get(this, 'progressBar').animate(progress);
  },

  willDestroyElement(...args) {
    get(this, 'progressBar').destroy();

    this._super(...args);
  }
});
