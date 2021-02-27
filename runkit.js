// generate or downoad your MIDI file:
const download = require('download');
const midi = await download('https://github.com/jazz-soft/runkit-midi/raw/main/test.mid');
// create a MIDI player/viewer:
const rkmidi = require('runkit-midi');
rkmidi(midi);
// click the [▶run] button... ↓