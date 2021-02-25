const fs = require('fs');
const path = require('path');
const rkmidi = require('..');
const JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var url = 'https://github.com/jazz-soft/test-midi-files/raw/main/midi/test-c-major-scale.mid';

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfBPM(90).ch(0).program(16)
   .tick(96).noteOn('C6', 127).tick(96).noteOn('Eb6', 127)
   .tick(96).noteOn('G6', 127).tick(96).noteOn('C7', 127)
   .tick(192).noteOff('C6').noteOff('Eb6').noteOff('G6')
   .noteOff('C7').tick(96).smfEndOfTrack();

var data = 'data:audio/midi;base64,\
TVRoZAAAAAYAAQADAGRNVHJrAAAAGgD/AwtMaXR0bGUgTGFtZQD/UQMKLCsA/y8A\
TVRyawAAAPMA/wMGTHlyaWNzAP8BGEBUTWFyeSBXYXMgQSBMaXR0bGUgTGFtZWT/\
AQNcTWFL/wEDcnkgGf8BBHdhcyAy/wECYSAy/wEDbGl0Mv8BBHRsZSAy/wEFbGFt\
ZSxk/wEEL0xpdDL/AQR0bGUgMv8BBWxhbWUsZP8BBC9MaXQy/wEEdGxlIDL/AQVs\
YW1lLGT/AQMvTWFL/wEDcnkgGf8BBHdhcyAy/wECYSAy/wEDbGl0Mv8BBHRsZSAy\
/wEFbGFtZSwy/wEDL0EgMv8BA2xpdDL/AQR0bGUgMv8BBWxhbWUgMv8BBHdhcyAy\
/wEEc2hlIQD/LwBNVHJrAAAA8gD/AwVNdXNpYwDAC2SQQH9LgEBAAJA+fxmAPkAA\
kDx/MoA8QACQPn8ygD5AAJBAfzKAQEAAkEB/MoBAQACQQH9agEBACpA+fzKAPkAA\
kD5/MoA+QACQPn9agD5ACpBAfzKAQEAAkEN/MoBDQACQQ39agENACpBAf0uAQEAA\
kD5/GYA+QACQPH8ygDxAAJA+fzKAPkAAkEB/MoBAQACQQH8ygEBAAJBAfzKAQEAZ\
kEB/GYBAQACQPn8ygD5AAJA+fzKAPkAAkEB/MoBAQACQPn8ygD5AAJA8f2RAZABD\
ZABIf1qAPEAAQEAAQ0AASEAK/y8A';

test('test0.html');

test('test1.html', data);

test('test2.html', url);

test('test3.html', smf);

test('test4.html', smf.dump());

test('test5.html', 'garbage...');

function nop() {}
async function test(name, arg) {
  var data = await rkmidi(arg);
  console.log(name);
  if (data.error) console.log('error:', data.error);
  var fname = path.join(__dirname, name);
  fs.writeFile(path.join(__dirname, name), data.ValueViewerSymbol.HTML, nop);
}
