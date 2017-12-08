//Creates an array that lists all the word options for the computer to choose from. 
var wordList = ["australia", "kangaroo", "uluru", "echidna", "wombat",
"whitehaven", "koala", "quokka", "dingo", "sydney", "perth", "tasmania", "platypus",
"freycinet", "outback", "boomerang", "wallaby", "cassowary", "canberra"];

//Creates an array that lists all the picture options for the computer to choose from.
var picList= ["assets/images/australiamap.jpg", "assets/images/kangaroos.jpg",
"assets/images/Uluru.jpg", "assets/images/echidna.jpg", "assets/images/wombat.jpg",
"assets/images/whitehavenbeach.jpg", "assets/images/koala.jpg", "assets/images/quokka.jpg",
"assets/images/dingo.jpg", "assets/images/sydney.jpg", "assets/images/perth.jpg",
"assets/images/tasmania.jpg", "assets/images/platypus.jpg", "assets/images/freycinet.jpg",
"assets/images/outback.jpg", "assets/images/boomerang.jpg", "assets/images/wallaby.jpg",
"assets/images/cassowary.jpg", "assets/images/canberra.jpg"];

var factList= ["Australia was originally founded as a penal colony.",
"Kangaroos can reach to speed of over 65 Kilometers per hour.",
"Uluru, also known as Ayers Rock, stands 348 meters (1141.73 feet) above ground.",
"Echidnas are one of only two egg laying mammals on Earth.",
"Wombats have cube-shaped poop.", "Whitehaven Beach stretches over 7km and has pure white silica sand.",
"Koalas will eat up to 2.5lbs of food a day and sleep for up to 20 hours a day.",
"Quokkas are only found on Rottnest Island just off Western Australia's coast.",
"A dingo is type of feral dog that originates from Southeast Asia and can now be found in parts of Australia.",
"Sydney is home to well over 100 beaches.", "Perth is the capital of Western Australia.",
"Tasmania is home to the Overland Track, Australia's most famous hiking trail.", 
"The platypus is such an unlikely animal that when scientists first discovered it they thought they were the victims of a hoax.",
"Freycinet National Park is home to Wineglass Bay which is consistently listed as one of the top 10 beaches in the World.",
"The Outback has an average maximum temperature in January of 104F", 
"A boomerang was originally used as weapon by Indigenous Australians.", 
"A wallaby is a member of the kanagroo family but they are generally much smaller than kangeroos.", 
"The cassowary is extremely dangerous if provoked and can literally kick a person to death.", 
"Canberra is the capital of Australia."];


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

//FUNCTIONS

//startGame() function tells computer how to start/restart the game
function startGame() {

	//Resets guess remaining at beginning of game
	numGuesses= 8;

	//Solution is chosen
	chosenWord = wordList[Math.floor(Math.random() * wordList.length)];

	//Breaks solution word into individual letters
	lettersInChosenWord = chosenWord.split("");

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

	//Reprinte the Guesses Remaining to 10
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
	if (lettersInChosenWord.toString() == blanksAndLetters.toString()){

		//play sound
		yay.play();

		//Add to win count
		winCounter++;

		//Change picture
		//get index of chosenWord
		var wordIndex = wordList.indexOf(chosenWord);
		console.log(wordIndex);
		
		//set image src to index of picture corresponding to the chosen word
		document.getElementById("rotatingimage").src= picList[wordIndex];

		//Show fun fact about chosenWord

		document.getElementById("facts").innerHTML= factList[wordIndex];

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
	var letterGuessed = event.key.toLowerCase();

	if(letterGuessed === "a" || letterGuessed === "b" || letterGuessed === "c" || 
		letterGuessed === "d" || letterGuessed === "e" || letterGuessed === "f" || 
		letterGuessed === "g" || letterGuessed === "h" || letterGuessed === "i" ||
		letterGuessed === "j" || letterGuessed === "k" || letterGuessed === "l" || 
		letterGuessed === "m" || letterGuessed === "n" || letterGuessed === "o" || 
		letterGuessed === "p" || letterGuessed === "q" || letterGuessed === "r" || 
		letterGuessed === "s" || letterGuessed === "t" || letterGuessed === "u" ||
		letterGuessed === "v" || letterGuessed === "w" || letterGuessed === "x" || 
		letterGuessed === "y" || letterGuessed === "z") {

		//Runs code to check for correctness
		checkLetters(letterGuessed);

		//Runs cod after each round is done
		roundComplete();

	} else{
		alert ("Invalid letter!");

	}
};
