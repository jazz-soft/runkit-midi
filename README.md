# runkit-midi
MIDI player/viewer for RunKit

[![npm](https://img.shields.io/npm/v/runkit-midi.svg)](https://www.npmjs.com/package/runkit-midi)
[![Try runkit-midi on RunKit](https://badge.runkitcdn.com/runkit-midi.svg)](https://npm.runkit.com/runkit-midi)

## Your own live MIDI demo on RunKit

[![runkit](https://github.com/jazz-soft/runkit-midi/raw/main/media/runkit.png)](https://npm.runkit.com/runkit-midi)

Have you ever wondered what was that `RunKit` button on your NPM page for?

Does your project generate MIDI files?

You may want to enable a live MIDI demo on your project page.

No install required!

Your visitors will be able to play and view the contents of generated MIDI files as on the image below:

[![screenshot](https://github.com/jazz-soft/runkit-midi/raw/main/media/rkmidi.png)](https://npm.runkit.com/runkit-midi)

## Enabling live MIDI demo on your project page

### Create a demo script:
```js
// my-demo.js
const rkmidi = require('runkit-midi');
const myproj = require('your-project');
const midi = myproj.makeCoolMidi();
rkmidi(midi);
```

### Add an entry into your package.json:
```json
// package.json
  ...
  "runkitExampleFilename": "my-demo.js",
  ...
```

### Add a button to your README.md (optional):
```md
// README.md
  ...
[![Try your-project on RunKit](https://badge.runkitcdn.com/your-project.svg)](https://npm.runkit.com/your-project)
  ...
```

### Publish the new release of your-project on NPM
Have fun!