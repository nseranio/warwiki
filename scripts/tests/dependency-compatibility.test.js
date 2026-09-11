const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const vm = require('node:vm');

function dependencyUsedBy(parent, dependency) {
  return require(require.resolve(dependency, {paths: [path.dirname(require.resolve(parent))]}));
}

test('patched serializer preserves the cache-key and worker options used by both Webpack plugins', () => {
  for (const plugin of ['copy-webpack-plugin', 'css-minimizer-webpack-plugin']) {
    const serialize = dependencyUsedBy(plugin, 'serialize-javascript');
    const serialized = serialize({filename: 'example.css', pattern: /css$/i, transform: function (value) {return value.toUpperCase();}});
    // Only evaluate this fixed test fixture, never site content or outside input.
    const restored = new vm.Script(`(${serialized})`).runInNewContext();
    assert.equal(restored.filename, 'example.css');
    assert.equal(restored.pattern.test('SITE.CSS'), true);
    assert.equal(restored.transform('body'), 'BODY');
  }
});

test('patched UUID keeps the exact CommonJS v4 call used by SockJS sessions', () => {
  const uuid = dependencyUsedBy('sockjs', 'uuid');
  assert.match(uuid.v4(), /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
});

test('patched query parser preserves nested and repeated query values used by Express', () => {
  const qs = dependencyUsedBy('express', 'qs');
  assert.deepEqual(qs.parse('filter[topic]=urethra&tag=a&tag=b'), {filter: {topic: 'urethra'}, tag: ['a', 'b']});
});
