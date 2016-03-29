if (Levels.find().count() === 0) {
	var fs = Npm.require('fs');
	var wordlists={};
	wordlists.level0=["j","k","f","d"];
	wordlists.level1=[];
	wordlists.level2=[];
	wordlists.level3=[];
	wordlists.level4=[];
	wordlists.level5=[];
	wordlists.level6=[];
	wordlists.level7=[];
	wordlists.level8=[];
	wordlists.level9=[];
	wordlists.level10=[];
	wordlists.level11=[];
	wordlists.level12=[];
	wordlists.level13=[];
	wordlists.level14=[];
	wordlists.level15=[];
	wordlists.level16=[];
	var arrayi;
	fs.readFile('public/wordlists/en_GB.txt', 'utf8', function(err, data) {
		if (err) throw err;
		var array=data.split('\n');
		for (var i = 0; i < array.length; i++) {
			arrayi=array[i];
			if(arrayi.match(/^[asdfjkl]{3,12}$/)!==null){
				wordlists.level1.push(arrayi);
				wordlists.level2.push(arrayi);
				wordlists.level2.push(arrayi+";");
			}
			if(array[i].match(/^[asdfghjkl]{3,12}$/)!==null){
				wordlists.level3.push(arrayi);
				wordlists.level3.push(arrayi+";");
			}
			if(array[i].match(/^[asdfghjkl]{3,12}$/)!==null){
				wordlists.level3.push(arrayi);
				wordlists.level3.push(arrayi+";");
			}
			if(array[i].match(/^[asdfghjklru]{3,12}$/)!==null){
				wordlists.level4.push(arrayi);
				wordlists.level4.push(arrayi+";");
			}
			if(array[i].match(/^[asdfghjklerui]{3,12}$/)!==null){
				wordlists.level5.push(arrayi);
				wordlists.level5.push(arrayi+";");
			}
			if(array[i].match(/^[asdfghjklweruio]{3,12}$/)!==null){
				wordlists.level6.push(arrayi);
				wordlists.level6.push(arrayi+";");
			}
			if(array[i].match(/^[asdfghjklqweruiop]{3,12}$/)!==null){
				wordlists.level7.push(arrayi);
				wordlists.level7.push(arrayi+";");
			}
			if(array[i].match(/^[asdfghjklqwertyuiop]{3,12}$/)!==null){
				wordlists.level8.push(arrayi);
				wordlists.level8.push(arrayi+";");
			}
			if(array[i].match(/^[asdfghjklqwertyuiopvn]{3,12}$/)!==null){
				wordlists.level9.push(arrayi);
				wordlists.level9.push(arrayi+";");
			}
			if(array[i].match(/^[asdfghjklqwertyuiopcvnm]{3,12}$/)!==null){
				wordlists.level10.push(arrayi);
				wordlists.level10.push(arrayi+";");
			}
			if(array[i].match(/^[asdfghjklqwertyuiopxcvnm]{3,12}$/)!==null){
				wordlists.level11.push(arrayi);
				wordlists.level11.push(arrayi+";");
				wordlists.level11.push(arrayi+",");
			}
			if(array[i].match(/^[asdfghjklqwertyuiopzxcvnm]{3,12}$/)!==null){
				wordlists.level12.push(arrayi);
				wordlists.level12.push(arrayi+";");
				wordlists.level12.push(arrayi+",");
				wordlists.level12.push(arrayi+".");
			}
		}
	});
	insertLevels(wordlists);
}

function insertLevels(wordlists){
	Levels.insert({level:0,name:'level 0: d f j k ',wordlist:wordlists.level0});
	Levels.insert({level:1,name:'level 1: a s d f j k l',wordlist:wordlists.level1});
	Levels.insert({level:2,name:'level 2: a s d f j k l ;',wordlist:wordlists.level2});
	Levels.insert({level:3,name:'level 3: a s d f g h j k l ;',wordlist:wordlists.level3});
	Levels.insert({level:4,name:'level 4: a s d f g h j k l ; r u',wordlist:wordlists.level4});
	Levels.insert({level:5,name:'level 5: a s d f g h j k l ; e r u i',wordlist:wordlists.level5});
	Levels.insert({level:6,name:'level 6: a s d f g h j k l ; w e r u i o',wordlist:wordlists.level6});
	Levels.insert({level:7,name:'level 7: a s d f g h j k l ; q w e r u i o p',wordlist:wordlists.level7});
	Levels.insert({level:8,name:'level 8: a s d f g h j k l ; q w e r u t y i o p',wordlist:wordlists.level8});
	Levels.insert({level:9,name:'level 9: a s d f g h j k l ; q w e r t y u i o p v n',wordlist:wordlists.level9});
	Levels.insert({level:10,name:'level 10: a s d f g h j k l ; q w e r t y u i o p c v n m',wordlist:wordlists.level10});
	Levels.insert({level:11,name:'level 11: a s d f g h j k l ; q w e r t y u i o p x c v n m ,',wordlist:wordlists.level11});
	Levels.insert({level:12,name:'level 12: a s d f g h j k l ; q w e r t y u i o p z x c v n m , .',wordlist:wordlists.level12});
}