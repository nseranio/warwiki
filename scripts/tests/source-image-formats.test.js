const test = require('node:test');
const assert = require('node:assert/strict');
const {blockedFormat} = require('../check-source-image-formats');

test('rejects affected signatures even when disguised with ordinary image extensions', () => {
  assert.equal(blockedFormat(Buffer.from('icns'), 'renamed.jpg'), 'icns');
  assert.equal(blockedFormat(Buffer.from([0xff, 0x0a]), 'renamed.png'), 'jxl');
  assert.equal(blockedFormat(Buffer.from([0, 0, 0, 12, 0x4a, 0x58, 0x4c, 0x20]), 'renamed.png'), 'jxl');
  assert.equal(blockedFormat(Buffer.from('\0\0\0\x10ftypavif\0\0\0\0', 'binary'), 'renamed.jpg'), 'heif/avif');
  assert.equal(blockedFormat(Buffer.alloc(0), 'source.HEIC'), 'heic');
});

test('does not block site image formats, PDFs or video containers', () => {
  assert.equal(blockedFormat(Buffer.from([0xff, 0xd8, 0xff]), 'preview.jpg'), null);
  assert.equal(blockedFormat(Buffer.from('<svg xmlns="http'), 'diagram.svg'), null);
  assert.equal(blockedFormat(Buffer.from('%PDF-1.7'), 'handout.pdf'), null);
  assert.equal(blockedFormat(Buffer.from('\0\0\0\x10ftypisom\0\0\0\0', 'binary'), 'video.mp4'), null);
});
