const assert = require('assert');
const rkmidi = require('..');
const JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

describe('smoke test', function() {
  it('it works!', function() {
    var smf = new JZZ.MIDI.SMF(0, 96);
    var trk = new JZZ.MIDI.SMF.MTrk();
    smf.push(trk);
    trk.smfBPM(90).ch(0).program(16)
       .tick(96).noteOn('C6', 127).tick(96).noteOn('Eb6', 127)
       .tick(96).noteOn('G6', 127).tick(96).noteOn('C7', 127)
       .tick(192).noteOff('C6').noteOff('Eb6').noteOff('G6')
       .noteOff('C7').tick(96).smfEndOfTrack();
    var data = rkmidi(smf);
    assert.equal(data.ValueViewerSymbol.title, 'MIDI Player');
  });
});
