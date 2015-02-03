var express = require('express'),
    app = express();

var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.get('/', function(req, res) {
  var specs = [['FROST', 'UNHOLY', 'BLOOD'],['RESTO', 'FERAL', 'GUARDIAN', 'BALANCE'],['BM', 'SURVIVAL', 'MARKSMANSHIP'],['FROST', 'FIRE', 'ARCANE'],['MISTWEAVER', 'BREWMASTER', 'WINDWALKER'],['HOLY', 'RET', 'PROT'],['HOLY', 'DISC', 'SHADOW'],['ASS', 'SUB', 'COMBAT'],['ELE', 'ENH', 'RESTO'],['DESTRO', 'DEMO', 'AFF'],['PROT', 'FURY', 'ARMS']];
  var classes = ['DEATH KNIGHT', 'DRUID', 'HUNTER', 'MAGE', 'MONK', 'PALADIN', 'PRIEST', 'ROGUE', 'SHAMAN', 'WARLOCK', 'WARRIOR'];
  var random = Math.floor(Math.random() * 11);
  var spec = Math.floor(Math.random() * ((random === 1) ? 4 : 3));
  res.render('index', { title: specs[random][spec] + classes[random] });
});
app.listen(port);