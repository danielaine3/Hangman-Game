//Creates an array that lists all the word options for the computer to choose from. 
var myList = [
	{ "word": 'australia',
		"picture": 'assets/images/australiamap.jpg',
		"fact": 'Australia was originally founded as a penal colony.'
	},
	{ "word": 'kangaroo',
		"picture": 'assets/images/kangaroos.jpg',
		"fact": 'Kangaroos can reach speeds of over 65 Kilometers per hour.'
	},
	{ "word": 'uluru',
		"picture": 'assets/images/Uluru.jpg',
		"fact": 'Uluru, also known as Ayers Rock, stands 348 meters (1141.73 feet) above ground.'
	},
	{ "word": 'echidna',
		"picture":'assets/images/echidna.jpg',
		"fact": 'Echidnas are one of only two egg laying mammals on Earth.'
	},
	{ "word": 'wombat',
		"picture": 'assets/images/wombat.jpg',
		"fact": 'Wombats have cube-shaped poop.'
	},
	{ "word": 'whitehaven',
		"picture": 'assets/images/whitehavenbeach.jpg',
		"fact": 'Whitehaven Beach stretches over 7km and has pure white silica sand.'
	},
	{ "word": 'koala',
		"picture": 'assets/images/koala.jpg',
		"fact": 'Koalas will eat up to 2.5lbs of food a day and sleep for up to 20 hours a day.'
	},
	{ "word": 'quokka',
		"picture": 'assets/images/quokka.jpg',
		"fact": "Quokkas are only found on Rottnest Island just off Western Australia's coast."
	},
	{ "word": 'dingo',
		"picture": 'assets/images/dingo.jpg',
		"fact": 'A dingo is type of feral dog that originates from Southeast Asia and can now be found in parts of Australia.'
	},
	{ "word": 'sydney',
		"picture": 'assets/images/sydney.jpg',
		"fact": 'Sydney is home to well over 100 beaches.'
	},
	{ "word": 'perth',
		"picture": 'assets/images/perth.jpg',
		"fact": 'Perth is the capital of Western Australia.'
	},
	{ "word": 'tasmania',
		"picture": 'assets/images/tasmania.jpg',
		"fact": "Tasmania is home to the Overland Track, Australia's most famous hiking trail."
	},
	{ "word": 'platypus',
		"picture": 'assets/images/platypus.jpg',
		"fact": 'The platypus is such an unlikely animal that when scientists first discovered it they thought they were the victims of a hoax.'
	},
	{ "word": 'freycinet',
		"picture": 'assets/images/freycinet.jpg',
		"fact": 'Freycinet National Park is home to Wineglass Bay which is consistently listed as one of the top 10 beaches in the World.'
	},
	{ "word": 'outback',
		"picture": 'assets/images/outback.jpg',
		"fact": 'The Outback has an average maximum temperature in January of 104F'
	},
	{ "word": 'boomerang',
		"picture": 'assets/images/boomerang.jpg',
		"fact": 'A boomerang was originally used as weapon by Indigenous Australians.'
	},
	{ "word": 'wallaby',
		"picture": 'assets/images/wallaby.jpg',
		"fact": 'A wallaby is a member of the kanagroo family but they are generally much smaller than kangeroos.'
	},
	{ "word": 'cassowary', 
		"picture": 'assets/images/cassowary.jpg',
		"fact": 'The cassowary is extremely dangerous if provoked and can literally kick a person to death.'
	},
	{ "word": 'canberra',
		"picture": 'assets/images/canberra.jpg',
		"fact": 'Canberra is the capital of Australia.'
	},
];
//Solution will be held here
var chosenWord = "";
//This will break the solution into individual letters to be stored in an array
var lettersInChosenWord = [];
//This will be the number of letter blanks shown based on chosenWord
var numBlanks = 0;
//This will hold a mix of blank and solved letters (ex. n, _ _, n, _)
var blanksAndLetters = [];
//This will hold the wrong guesses
var wrongGuess = [];
//Create variables for counters
var winCounter = 0;
var numGuesses = 8;
//Sounds
var boo = new Audio ("assets/sound/womp.mp3")
var yay = new Audio ("assets/sound/ding.mp3")
//Random number set to blank
var randomNumber = "";	

//FUNCTIONS
//startGame() function tells computer how to start/restart the game
function startGame() {
//Generating random number to be used in selecting question, picture and fact
	randomNumber = Math.floor(Math.random() * myList.length);	
	//Resets guess remaining at beginning of game
	numGuesses= 8;
	//Solution is chosen
	chosenWord = myList[randomNumber].word;
	//Breaks solution word into individual letters
	lettersInChosenWord = chosenWord.toString("");
	//Counts the number of letters in the solution
	numBlanks = lettersInChosenWord.length;
	//print the solution in console for testing
	console.log(chosenWord);
	//reset guess and success array at each round
	blanksAndLetters = [];
	//reset wrongGuess from previous round
	wrongGuess = [];
	for (var i = 0; i < numBlanks; i++){
		blanksAndLetters.push("_ ");
	}
	//Print the initial blanks to console.
	console.log(blanksAndLetters);
	//Reprint the Guesses Remaining to 8
	document.getElementById("guessesLeft").innerHTML = numGuesses;
	//Print the blanks at the beginning of each round in the HTML
	document.getElementById("wordblanks").innerHTML= blanksAndLetters.join("");
	//Clear sthe wrong guesses from previous round
	document.getElementById("wrongGuess").innerHTML= wrongGuess.join("");
};
//checking letters for matches
function checkLetters(letter){
	var letterInWord = false
	for (var i = 0; i < numBlanks; i++){
		if(chosenWord[i] == letter){
			letterInWord = true;
		}
	}
	//If the letter is in the word, find exaclty where (index)
	if(letterInWord){
		//loop through the word
		for (var i = 0; i < numBlanks; i++){
			//Populate blanksAndLetters with every instance of the letter.
			if (chosenWord[i] == letter){
				//set specific space equal to letter when there is a match
				blanksAndLetters[i] = letter;
			}
		}
		//log to test
		console.log(blanksAndLetters);
	//If no match
	}else {
		//If letter is not in wrongGuess array
		if (wrongGuess.indexOf(letter) < 0) {
			//Add the letter to list of wrong guesses
			wrongGuess.push(letter);
			//subtract 1 from remaining guesses
			numGuesses--;
		}
	}
};
//roundComplete() function
//This is the code that needs to run after each guess is made
function roundComplete(){
	console.log("WinCount: " + winCounter + " | NumGuesses: " + numGuesses);
	//Update the HTML to reflect new nunmber of guesses and correct guesses. 
	document.getElementById("guessesLeft").innerHTML= numGuesses;
	//This will print the array of guesses and blanks onto the page
	document.getElementById("wordblanks").innerHTML= blanksAndLetters.join(" ");
	//This will print the wrong guesses onto the page
	document.getElementById("wrongGuess").innerHTML= wrongGuess.join(" ");
	//If we have gotten all the letters to match the solution
	if (lettersInChosenWord == blanksAndLetters.join("")){
		//play sound
		yay.play();
		//Add to win count
		winCounter++;
		//Change picture
		//set image src to index of picture corresponding to the chosen word
		document.getElementById("rotatingimage").src= myList[randomNumber].picture;
		//Show fun fact about chosenWord
		document.getElementById("facts").innerHTML= myList[randomNumber].fact;
		//update win count in HTML
		document.getElementById("winCounter").innerHTML=winCounter;
		//Restart the game
		startGame();
	}
	//If user runs out of guesses
	else if (numGuesses == 0) {
		//play sound
		boo.play();
		//Alert user they lost.
		alert ("You lost.")
		//restart the game
		startGame();
	}
}
//Start game by running startGame() function
startGame();
//Initiates by capturing keystrokes
document.onkeyup = function(event) { 
	//Converts all keystrokes to lowercase
	var charCode = event.which;
	var letterGuessed = String.fromCharCode(charCode).toLowerCase();
	if(/[a-z]/i.test(letterGuessed)
		) {
		console.log(event.keyCode);
		//Runs code to check for correctness
		checkLetters(letterGuessed);
		//Runs cod after each round is done
		roundComplete();
	} else{
		console.log(event.keyCode);
		alert ("Invalid letter!");
	}
};