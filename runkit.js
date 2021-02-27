const rkmidi = require("runkit-midi");
const download = require('download');
const midi = await download('https://github.com/jazz-soft/runkit-midi/raw/main/test.mid');

rkmidi(midi.toString('binary'));
// click the [▶run] button... ↓