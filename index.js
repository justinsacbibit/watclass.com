var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))

var specs = [['FROST', 'UNHOLY', 'BLOOD'],['RESTO', 'FERAL', 'GUARDIAN', 'BALANCE'],['BM', 'SURVIVAL', 'MARKSMANSHIP'],['FROST', 'FIRE', 'ARCANE'],['MISTWEAVER', 'BREWMASTER', 'WINDWALKER'],['HOLY', 'RET', 'PROT'],['HOLY', 'DISC', 'SHADOW'],['ASS', 'SUB', 'COMBAT'],['ELE', 'ENH', 'RESTO'],['DESTRO', 'DEMO', 'AFF'],['PROT', 'FURY', 'ARMS']];
var classes = ['DEATH KNIGHT', 'DRUID', 'HUNTER', 'MAGE', 'MONK', 'PALADIN', 'PRIEST', 'ROGUE', 'SHAMAN', 'WARLOCK', 'WARRIOR'];

var checkbox = function checkbox(name, value, prettyName, checked) {
  return '<input type="checkbox" name="'+name+'" value="'+value+'" '+(checked ? 'checked' : '')+'> '+prettyName + ' ';
};

// TODO: clean up this shit "code"
var names = ['dk','druid','hunter','mage','monk','paladin','priest','rogue','shaman','warlock','warrior'];
// var values = ['1', 'Druid', 'Hunter', 'Mage', 'Monk', 'Paladin', 'Priest', 'Rogue','Shaman','Warlock','Warrior'];
var prettyNames = ['Death Knight', 'Druid', 'Hunter', 'Mage', 'Monk', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior'];

var randomizeShit = function randomizeShit(req) {
  var random = Math.floor(Math.random() * classes.length);
  var spec = Math.floor(Math.random() * specs[random].length);
  var reqClasses = [];

  if (Object.keys(req.query).length > 0){
    for (var key in req.query) {
      var nameIndex = names.indexOf(key);
      reqClasses.push(nameIndex);
    }
    random = reqClasses[Math.floor(Math.random() * reqClasses.length)];
    spec = Math.floor(Math.random() * specs[random].length);
  } else {
    for (var i = 0; i < classes.length; i++) {
      reqClasses.push(i);
    }
  }

  var checkboxes = '';
  for (var i = 0; i < classes.length; i++) {
    var checked = true;
    if (reqClasses.length > 0 && reqClasses.indexOf(i)===-1) {
      checked = false;
    }

    checkboxes += checkbox(names[i],1,prettyNames[i],checked);
  }

  return {
    random: random,
    spec: spec,
    checkboxes: checkboxes
  };
};

app.get('/', function(req, res) {
  var randomizedShit = randomizeShit(req);
  var random = randomizedShit.random;
  var spec = randomizedShit.spec;

  // io.emit('generated', specs[random][spec] + ' ' + classes[random]);

  var checkboxes = randomizedShit.checkboxes;
  res.render('index', { title: specs[random][spec] + ' ' + classes[random], link: '', toggle: 'Click to hide specializations', toggleLink: '/nospec',checkboxes:checkboxes });
});

app.get('/nospec', function(req, res) {
  var randomizedShit = randomizeShit(req);
  var random = randomizedShit.random;

  // io.emit('generated', classes[random]);

  var checkboxes = randomizedShit.checkboxes
  res.render('index', { title: classes[random], link: 'nospec', toggle: 'Click to randomize specializations', toggleLink: '/',checkboxes:checkboxes });
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('message', function(msg) {
    io.emit('message', msg);
  })

  socket.on('disconnect', function() {
    console.log('a user connected');
  });
});

http.listen(port);