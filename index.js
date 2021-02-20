const { ValueViewerSymbol } = require("@runkit/value-viewer");

module.exports = function(arg) {
  var html = `
<body>
<script src='https://cdn.jsdelivr.net/npm/jzz'></script>
<script src='https://cdn.jsdelivr.net/npm/jzz-synth-tiny'></script>
<script src='https://cdn.jsdelivr.net/npm/jzz-midi-smf'></script>
<script src='https://cdn.jsdelivr.net/npm/jzz-gui-player'></script>
<script>
JZZ.synth.Tiny.register('Web Audio');
var player = new JZZ.gui.Player({ file: true });
</script>
</body>
`;
  return {
    [ValueViewerSymbol]: {
      title: "MIDI Player",
      HTML: html
    }
  };
};
