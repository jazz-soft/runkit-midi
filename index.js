var vvs = 'ValueViewerSymbol';
try {
  const { ValueViewerSymbol } = require("@runkit/value-viewer");
  vvs = ValueViewerSymbol;
}
catch (err) {}

module.exports = function(arg) {
  var html = `
<head>
<script src='https://cdn.jsdelivr.net/npm/jzz'></script>
<script src='https://cdn.jsdelivr.net/npm/jzz-synth-tiny'></script>
<script src='https://cdn.jsdelivr.net/npm/jzz-midi-smf'></script>
<script src='https://cdn.jsdelivr.net/npm/jzz-gui-player'></script>
<style>
 body { min-width:270px; padding:10px; margin:0; min-height:80px; }
</style>
</head>
<body>
<div id=player></div>
<script>
JZZ.synth.Tiny.register('Web Audio');
var player = new JZZ.gui.Player({ at: 'player', file: true });
</script>
</body>
`;
  return {
    [vvs]: {
      title: "MIDI Player",
      HTML: html
    }
  };
};
