const fs = require('fs');
const path = require('path');
const rkmidi = require('..');
const JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

test('test0.html');

test('test1.html', 'garbage...');

test('test2.html', 'https://github.com/jazz-soft/test-midi-files/raw/main/midi/test-c-major-scale.mid');

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfBPM(90).ch(0).program(16)
   .tick(96).noteOn('C6', 127).tick(96).noteOn('Eb6', 127)
   .tick(96).noteOn('G6', 127).tick(96).noteOn('C7', 127)
   .tick(192).noteOff('C6').noteOff('Eb6').noteOff('G6')
   .noteOff('C7').tick(96).smfEndOfTrack();

test('test3.html', smf);

test('test4.html', smf.dump());

function nop() {}
async function test(name, arg) {
  var data = await rkmidi(arg);
  if (data.error) console.log('error:', data.error);
  var fname = path.join(__dirname, name);
  fs.writeFile(path.join(__dirname, name), data.ValueViewerSymbol.HTML, nop);
}
