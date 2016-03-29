currentWords=null;
wordsDom=null;
currentChars=[];
currentCharsDoms=[];
currentCharIndex=0;
currentCharDom=null;
Template.words.rendered=function(){
	wordsDom=$("#words");
	Meteor.call('getWords', 6, function (error, result) {
		currentWords=result;
		Meteor.insertWords(result);
	});
};

Meteor.getNewWords=function(level){
	Meteor.call('getWords', level, function (error, result) {
		currentWords=result;
		Meteor.insertWords(result);
	});
};

Meteor.insertWords=function(words){
	wordsDom.empty();
	var divInline=null;
	var curWord=null;
	currentChars=[];
	currentCharsDoms=[];
	currentCharIndex=0;
	currentCharDom=null;
	for (var i = 0; i < words.length; i++) {
		wordsDom.append('<div id="word'+i+'" class="inline"></div>');
		divInline=$('#word'+i);
		divInline.append('<div id="word'+i+'Chars" class="word inline"></div>');
		Meteor.insertChars($('#word'+i+'Chars'),words[i],i);
		if(i<words.length-1){
			divInline.append('<div id="space'+i+'" class="word inline space"></div>');
			currentChars.push(' ');
			$('#space'+i).append('<div id="space'+i+'Char" class="inline">_</div>');
			currentCharsDoms.push($('#space'+i+'Char'));
			$('#space'+i+'Char').toggleClass('overline');
		}else{
			divInline.append('<div id="enter'+i+'" class="inline enter"></div>');
			currentChars.push('\n');
			$('#enter'+i).append('<img id="enter'+i+'Char" class="inline" src="/enter.png">');
			currentCharsDoms.push($('#enter'+i+'Char'));
		}
	}
	currentCharsDoms[currentCharsDoms.length-1].toggleClass("overline");
	currentCharsDoms[currentCharsDoms.length-1].toggleClass("underline");
	currentCharsDoms[0].toggleClass("underline");
};

Meteor.insertChars=function(wordDom,word,i){
	var chars=word.split('');
	for (var j = 0; j < chars.length; j++) {
		wordDom.append('<div id="word'+i+'Char'+j+'" class="inline">'+chars[j]+'</div>');
		currentChars.push(chars[j]);
		if(i===0 && j===0)
			currentCharDom=$('#word0Char0');
		currentCharsDoms.push($('#word'+i+'Char'+j));
	}
};