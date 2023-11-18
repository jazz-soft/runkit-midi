const assert = require('assert');
const { ValueViewerSymbol } = require("@runkit/value-viewer");
const rkmidi = require('..');
const JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var clip = new JZZ.MIDI.Clip();
var smf1 = new JZZ.MIDI.SMF(0, 96);
var smf2 = new JZZ.MIDI.SMF(1, 24, 16);
var trk1 = new JZZ.MIDI.SMF.MTrk();
var trk2 = new JZZ.MIDI.SMF.Chunk('JUNK', 'JUNK');
smf1.push(trk1);
smf2.push(trk1);
smf2.push(trk2);
trk1.noteOn(0, 'C6', 127).tick(96).noteOff(0, 'C6');
clip.noteOn(0, 0, 'C6', 127).tick(96).noteOff(0, 0, 'C6');

describe('MIDI files', function() {
  it('empty', function() {
    var data = rkmidi();
    assert.equal(data[ValueViewerSymbol].title, 'MIDI Player');
  });
  it('smf1', function() {
    var data = rkmidi(smf1);
    assert.equal(data[ValueViewerSymbol].title, 'MIDI Player');
  });
  it('smf2', function() {
    var data = rkmidi(smf2);
    assert.equal(data[ValueViewerSymbol].title, 'MIDI Player');
  });
  it('clip', function() {
    var data = rkmidi(clip);
    assert.equal(data[ValueViewerSymbol].title, 'MIDI Player');
  });
  it('error', function() {
    var data = rkmidi('error');
    assert.equal(data[ValueViewerSymbol].title, 'MIDI Player');
  });
});
