var vvs = 'ValueViewerSymbol';
try {
  const { ValueViewerSymbol } = require("@runkit/value-viewer");
  vvs = ValueViewerSymbol;
}
catch (err) {/**/}
const http = require('http');
const https = require('https');
const JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

module.exports = async function(arg) {
  var data = '';
  var link = '';
  var out = {}
  if (arg) {
    if (typeof arg == 'string') {
      if (arg.match(/^data:([a-z0-9_]+\/[a-z0-9_]+)?;base64,/i)) {
        arg = JZZ.lib.fromBase64(arg.substring(arg.indexOf(',') + 1));
      }
      else if (arg.match(/^https?:/i)) {
        link = arg;
        try {
          arg = await download(arg);
        }
        catch (err) {
          out.error = err.message;
        }
      }
    }
    if (!out.error) {
      try {
        data = JZZ.MIDI.SMF(arg.dump());
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
var link = '${link}';
var data = '${data}';
JZZ.synth.Tiny.register('Web Audio');
var player = new JZZ.gui.Player({ at: 'player', file: !data.length, link: !!data.length });
if (data) {
  player.load(new JZZ.MIDI.SMF(JZZ.lib.fromBase64(data)));
  if (link) player.setUrl(link);
  else player.setUrl('data:audio/midi;base64,' + data, 'runkit-midi');
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
  var i, j, k;
  var h = { type: m.type, tracks: m.length };
  if (m.ppqn) h.ppqn = m.ppqn;
  else { h.fps = m.fps; h.ppf = m.ppf; }
  x.header = h;
  for (i = 0; i < m.length; i++) {
    k = 'track' + (i + 1);
    x[k] = [];
    for (j = 0; j < m[i].length; j++) x[k].push([m[i][j].tt, m[i][j].toString()]);
  }  
}

function get(url, resolve, reject) {
  var htt = url.match(/^http:/i) ? http : https;
  htt.get(url, (res) => {
    if(res.statusCode === 301 || res.statusCode === 302) {
      return get(res.headers.location, resolve, reject)
    }
    if(res.statusCode != 200) {
      reject(new Error(`HTTP ${res.statusCode}`));
    }
    res.setEncoding('binary');
    var data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => { resolve(data); });
  }).on('error', (err) => {
    reject(err);
  });
}

async function download(url) {
  return new Promise((resolve, reject) => get(url, resolve, reject));
}