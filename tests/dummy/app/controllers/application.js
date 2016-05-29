import Ember from 'ember';

const { Controller } = Ember;
const { run: { later } } = Ember;

export default Controller.extend({
  progress: 0,

  init() {
    this.step();
  },

  step() {
    if (this.get('progress') < 1) {
      this.incrementProperty('progress', 0.01);

      later(() => {
        this.step();
      }, 20);
    }
  }
});
