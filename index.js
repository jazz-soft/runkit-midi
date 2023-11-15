var vvs = 'ValueViewerSymbol';
try {
  const { ValueViewerSymbol } = require("@runkit/value-viewer");
  vvs = ValueViewerSymbol;
}
catch (err) {/**/}
const JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

module.exports = function(arg) {
  var data = '';
  var out = {}
  if (arg) {
    try {
      arg = arg.dump();
    }
    catch (err) {/**/}
    try {
      data = JZZ.MIDI.Clip(arg);
    }
    catch (err) {
      try {
        data = JZZ.MIDI.SMF(arg);
      }
      catch (err) {
        out.error = err.message;
      }
    }
  }
  if (data) {
    populate(out, data);
    data = chop(JZZ.lib.toBase64(data.dump()), 80);
  }
  var html = `
<script src='https://cdn.jsdelivr.net/npm/jzz'></script>
<script src='https://cdn.jsdelivr.net/npm/jzz-synth-tiny'></script>
<script src='https://cdn.jsdelivr.net/npm/jzz-midi-smf'></script>
<script src='https://cdn.jsdelivr.net/npm/jzz-gui-player'></script>
<div id=player></div>
<p><a href=https://github.com/jazz-soft/runkit-midi target=_blank style='color:#bbb;font-size:small;font-family:Arial,Helvetica,sans-serif;'>runkit-midi at GitHub</a></p>
<script>
var data = '${data}';
JZZ.synth.Tiny.register('Web Audio');
var player = new JZZ.gui.Player({ at: 'player', file: !data.length, link: !!data.length });
if (data) {
  try {
    player.load(new JZZ.MIDI.Clip(JZZ.lib.fromBase64(data)));
    player.setUrl('data:audio/midi2;base64,' + data, 'runkit-midi');
  }
  catch (e) {
    player.load(new JZZ.MIDI.SMF(JZZ.lib.fromBase64(data)));
    player.setUrl('data:audio/midi;base64,' + data, 'runkit-midi');
  }
}
</script>
`;
  out[vvs] = {
    title: "MIDI Player",
    HTML: html
  };
  return out;
};

function chop(s, n) {
  var t = '';
  while (s.length) {
    if (t.length) t += '\\\n';
    t += s.substr(0, n);
    s = s.substr(n);
  }
  return t;
}

function populate(x, m) {
  var i, j, k, h;
  if (m instanceof JZZ.MIDI.Clip) {
    h = { type: 'clip', ppqn: m.length };
    x.header = h;
  }
  else {
    h = { type: m.type, tracks: m.length };
    if (m.ppqn) h.ppqn = m.ppqn;
    else { h.fps = m.fps; h.ppf = m.ppf; }
    x.header = h;
    for (i = 0; i < m.length; i++) {
      k = 'track' + (i + 1);
      if (m[i].type == 'MTrk') {
        x[k] = [];
        for (j = 0; j < m[i].length; j++) x[k].push([m[i][j].tt, m[i][j].toString()]);
      }
      else {
        x[k] = 'Not a MIDI track';
      }
    }  
  }
}
