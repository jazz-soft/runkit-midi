const fs = require('fs');
const path = require('path');
const rkmidi = require('..');
const JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfBPM(90).ch(0).program(16)
   .tick(96).noteOn('C6', 127).tick(96).noteOn('Eb6', 127)
   .tick(96).noteOn('G6', 127).tick(96).noteOn('C7', 127)
   .tick(192).noteOff('C6').noteOff('Eb6').noteOff('G6')
   .noteOff('C7').tick(96).smfEndOfTrack();

var clp = new JZZ.MIDI.Clip();
clp.gr(0).ch(0).program(16)
   .tick(96).noteOn('C6', 127).tick(96).noteOn('Eb6', 127)
   .tick(96).noteOn('G6', 127).tick(96).noteOn('C7', 127)
   .tick(192).noteOff('C6').noteOff('Eb6').noteOff('G6')
   .noteOff('C7').tick(96);

test('test0.html');

test('test1.html', smf);

test('test2.html', smf.dump());

test('test3.html', smf.toBuffer());

test('test4.html', smf.toArrayBuffer());

test('test5.html', smf.toUint8Array());

test('test6.html', clp);

test('test7.html', clp.dump());

function nop() {}

async function test(name, arg) {
  var data = rkmidi(arg);
  console.log(name);
  if (data.error) console.log('error:', data.error);
  fs.writeFile(path.join(__dirname, name), data.ValueViewerSymbol.HTML, nop);
}
