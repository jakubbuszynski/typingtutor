Meteor.methods({
  getWords: function(level) {
    var wordlist=Levels.findOne({level:level}).wordlist;
    return getRandomWords(wordlist,100);

    function getRandomWords(wordlist,maxChars) {
      var words=[];
      var charsLength=0;
      for (var i = 0; i < 50; i++) {
        if(charsLength<maxChars){
          words.push(getRandomWord(wordlist));
          charsLength+=words[i].length;
          charsLength++;
        }else{
          break;
        }
      }
      return words;
    }

    function getRandomWord(wordlist){
      return wordlist[Math.floor(Math.random() * wordlist.length)];
    }
  }
});