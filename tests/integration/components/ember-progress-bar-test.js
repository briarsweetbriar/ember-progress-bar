import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { hook, initialize as initializeHook } from 'ember-hook';

const { run: { later } } = Ember;

moduleForComponent('ember-progress-bar', 'Integration | Component | ember progress bar', {
  integration: true,

  beforeEach() {
    initializeHook();
  }
});

test('it renders a progressbar Line by default', function(assert) {
  assert.expect(3);

  this.render(hbs`{{ember-progress-bar}}`);

  assert.ok(Ember.$(`${hook('ember_progress_bar')} svg`).length > 0, 'progressbar is present');
  assert.equal(Ember.$(`${hook('ember_progress_bar')} svg`).get(0).getAttribute('viewBox'), '0 0 100 1', 'progressbar has line shape');
  assert.ok(Ember.$(`${hook('ember_progress_bar')} .progressbar-text`).length === 0, 'text is not present');
});

test('it can render other shapes', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ember-progress-bar shape="Circle"}}`);

  assert.equal(Ember.$(`${hook('ember_progress_bar')} svg`).get(0).getAttribute('viewBox'), '0 0 100 100', 'progressbar has circle shape');
});

test('it applies options', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ember-progress-bar options=(hash strokeWidth=20)}}`);

  assert.equal(Ember.$(`${hook('ember_progress_bar')} svg path`).get(0).getAttribute('stroke-width'), '20', 'stroke width correct');
});

test('when useDefaultStep is true, it displays progress text', function(assert) {
  assert.expect(3);

  const done = assert.async();

  this.set('progress', 0.1);

  this.render(hbs`{{ember-progress-bar progress=progress}}`);

  assert.equal(Ember.$(`${hook('ember_progress_bar')} path`).css('stroke-dashoffset'), '100px', 'initial progress correct');

  later(() => {
    assert.equal(Ember.$(`${hook('ember_progress_bar')} path`).css('stroke-dashoffset'), '90px', 'progress proceeds correctly');

    this.set('progress', 0.2);

    later(() => {
      assert.equal(Ember.$(`${hook('ember_progress_bar')} path`).css('stroke-dashoffset'), '80px', 'progress completes correctly');

      done();
    }, 1000);
  }, 1000);
});

test('it updates with progress', function(assert) {
  assert.expect(3);

  const done = assert.async();

  this.render(hbs`{{ember-progress-bar useDefaultStep=true progress=0.0123456}}`);

  assert.ok(Ember.$(`${hook('ember_progress_bar')} svg`).length > 0, 'progressbar is present');
  assert.ok(Ember.$(`${hook('ember_progress_bar')} .progressbar-text`).length > 0, 'text is present');

  later(() => {
    assert.equal(Ember.$(`${hook('ember_progress_bar')} .progressbar-text`).text().trim(), 1, 'text is correct');

    done();
  }, 400);
});
