var main = function() {
  var classes = ['DEATH KNIGHT', 'DRUID', 'HUNTER', 'MAGE', 'MONK', 'PALADIN', 'PRIEST', 'ROGUE', 'SHAMAN', 'WARLOCK', 'WARRIOR'];
  var random = Math.floor((Math.random() * 11) + 1);
  $('span').text(classes[random]);
}

$(document).ready(main)
