import { later } from '@ember/runloop';
import Controller from '@ember/controller';

export default Controller.extend({
  progress: 0,

  init() {
    this._super(...arguments);

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
