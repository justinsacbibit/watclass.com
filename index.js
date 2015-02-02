var express = require('express'),
    app = express();

var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.get('/', function(req, res) {
  var classes = ['DEATH KNIGHT', 'DRUID', 'HUNTER', 'MAGE', 'MONK', 'PALADIN', 'PRIEST', 'ROGUE', 'SHAMAN', 'WARLOCK', 'WARRIOR'];
  var random = Math.floor((Math.random() * 11));
  // force
  // random = 8;
  console.log(random);
  res.render('index', { title: classes[random] });
});
app.listen(port);