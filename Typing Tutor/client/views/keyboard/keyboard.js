$(document).live('keydown', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 9 || keyCode === 8 || keyCode === 27) {
    e.preventDefault();
  }
});
$(document).live('keyup', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode===9 || keyCode===8 || keyCode === 27) {
    e.preventDefault();
  }
});
$(document).live('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode===9 || keyCode===8 || keyCode === 27) {
    e.preventDefault();
  }
});
keyboard={};
keyboard.SHIFT_MAP = {'`':'~','1':'!','2':'@','3':'#','4':'$','5':'%','6':'^','7':'&','8':'*','9':'(','0':')','-':'_','=':'+',';':':','\'':'"',',':'<','.':'>','/':'?',"\\":'|'};
keyboard.specialKeyLabels=['ctrl','option','command','space','command','option','left','up','down','right',
'esc','backspace','tab','capslock','enter'];

keyboard.keysLabels=['`','1','2','3','4','5','6','7','8','9',"0",'-','=',
  'q','w','e','r','t','y','u','i','o','p','[',']','\\',
  'a','s','d','f','g','h','j','k','l',';',"'",
  'z','x','c','v','b','n','m',',','.','/'];

//"dbkdsbkudbs".split('');

keyboard.leftKeysLabels=['1','2','3','4','5','6',
  'q','w','e','r','t',
  'a','s','d','f','g',
  '`','z','x','c','v'];
keyboard.rightKeysLabels=['7','8','9','0','-','=',
  'y','u','i','o','p','[',']',
  'h','j','k','l',';',"'",'\\',
  'b','n','m',',','.','/'];



Template.keyboard.rendered=function(){
  keyboard.lastUnixTime=moment();
  keyboard.WPMs=[];
  keyboard.specialKeys=[$('#keyControl'),$('#keyOptionLeft'),$('#keyCommandLeft'),$('#keySpace'),
  $('#keyCommandRight'),$('#keyOptionRight'),$('#keyLeft'),$('#keyUp'),$('#keyDown'),$('#keyRight'),
  $('#keyEsc'),$('#keyBackspace'),$('#keyTab'),$('#keyCapsLock'),$('#keyEnter')];
  keyboard.keysShift=[ $('#keyShiftRight'),$('#keyShiftLeft')];

  var keys=[];
  for (var i = 0; i < keyboard.keysLabels.length; i++) {
    var currentKeyLabel=convertKeyLabel(keyboard.keysLabels[i]);
    var currentKey=$('#key'+currentKeyLabel);
    keys.push(currentKey);
  }
  keyboard.keysShift[0].hide();
  keyboard.keysShift[1].hide();
  Mousetrap.bindGlobal('shift', function(e,combo) { keyboard.keysShift[0].fadeOut(40); keyboard.keysShift[1].fadeOut(40); },'keyup');
  for (i = 0; i < keys.length; i++) {
    initKey(keys[i],keyboard.keysLabels[i]);
  }
  for (i = 0; i < keyboard.specialKeys.length; i++) {
    initKey(keyboard.specialKeys[i],keyboard.specialKeyLabels[i]);
  }
};


function initKey(key, keyLabel){
  key.hide();
  Mousetrap.bindGlobal(keyLabel, function(e,combo) {logKey(keyLabel); key.fadeIn(20);},'keydown');
  Mousetrap.bindGlobal(keyLabel, function(e,combo) { key.fadeOut(40); keyboard.keysShift[0].fadeOut(40); keyboard.keysShift[1].fadeOut(40); },'keyup');
  Mousetrap.bindGlobal('shift+'+keyLabel, function(e,combo) { logKey(convertToChar(combo,keyLabel)); key.fadeIn(20); if(searchStringInArray(keyLabel,keyboard.leftKeysLabels))keyboard.keysShift[0].fadeIn(20); if(searchStringInArray(keyLabel,keyboard.rightKeysLabels))keyboard.keysShift[1].fadeIn(20); },'keydown');
  Mousetrap.bindGlobal('shift+'+keyLabel, function(e,combo) {  key.fadeOut(40); keyboard.keysShift[0].fadeOut(40); keyboard.keysShift[1].fadeOut(40); },'keyup');
}

function hideKey(key){
    key.hide();
}

function convertToChar(combo,keyLabel){
  var comboArray=combo.split('+');
  if(comboArray[0]==='shift'){
    var shiftValue=keyboard.SHIFT_MAP[comboArray[1]];
    if(shiftValue){
      return shiftValue.toString();
    }else{
      return keyLabel.toUpperCase();
    }
  }
}

function convertKeyLabel(label){
  return {
    "=": "Sum",
    "-": "Minus",
    "[":'SquareBraketLeft',
    "]":'SquareBraketRight',
    '\\':'Backslash',
    ';':'Semicolon',
    "'":'Apostrophe',
    ",":'Comma',
    ".":'Period',
    "/":'Slash',
    '`':'Tilde'
  }[label] || label;
}

function searchStringInArray (str, strArray) {
  for (var j=0; j<strArray.length; j++) {
    if(str==='\\' || str==='.' || str==='['){
      if (strArray[j].match('\\'+str)) return true;
    }else{
      if (strArray[j].match(str)) return true;
    }
  }
  return false;
}

function logKey(keyLabel){
  if(!isFunctionalKey(keyLabel)){
    if(keyLabel.toUpperCase()==='SPACE'){
      //console.log('space pressed');
      getWPM();
      //log space
    }else{
      getWPM();
      //console.log(keyLabel);
    }
  }
}

timer='null';
currentWPM=0;
function getWPM(){
  keyboard.lastWPM=(60*1000/(moment().valueOf()-keyboard.lastUnixTime.valueOf()))/5;
  keyboard.lastUnixTime=moment();
  if(keyboard.lastWPM<160)
    keyboard.WPMs.push(keyboard.lastWPM);
  currentWPM=calculateAvgWPM();
  wpmMeter.refresh(currentWPM);
  updateWPMMeter();
}

function updateWPMMeter(){
  if(timer)clearTimeout(timer);
  if(currentWPM>3){
    currentWPM=currentWPM-3;
  }else{
    currentWPM=0;
  }
  wpmMeter.refresh(currentWPM);
  timer=setTimeout(updateWPMMeter,150);
}

function calculateAvgWPM(){
  if(keyboard.WPMs.length>3){
    if(keyboard.WPMs.length>5){
      keyboard.WPMs.reverse().pop();
      keyboard.WPMs.reverse();
    }
    var value=0;
    for (var i = 0; i < keyboard.WPMs.length; i++) {
      value+=keyboard.WPMs[i];
    }
    return Math.floor(0.5+value/keyboard.WPMs.length);
  }else{
    return 0;
  }
}

function isFunctionalKey(keyLabel){
  return checkStringWithArray(keyLabel.toUpperCase(),['CAPSLOCK','SHIFT','TAB','ENTER','UP','LEFT','DOWN','RIGHT','OPTION','CTRL','COMMAND','BACKSPACE']);
}

function checkStringWithArray (str, strArray) {
  for (var j=0; j<strArray.length; j++) {
    if(str===strArray[j])
      return true;
  }
  return false;
}