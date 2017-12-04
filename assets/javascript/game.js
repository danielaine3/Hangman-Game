//Creates an array that lists all the word options for the computer to choose from. 
var wordList = ["australia", "new south wales","queensland","northern territory","south australia","western australia","australian capital territory","victoria","tasmania","uluru","ayers rock","platypus","koala","echidna","wombat","dingo","great barrier reef","kata tjuna","the olgas","fraser island","sydney","perth","sydney opera house","sydney harbour bridge","canberra","blue mountains","tasmanian devil","kangaroo"
				];

//Solution will be held here
var chosenWord = "";

//This will break the solution into individual letters to be stored in an array
var lettersInChosenWord = [];

//This will be the number of letter blanks shown based on chosenWord
var numBlanks = 0;

//This will hold a mix of blank and solved letters (ex. n, _ _, n, _)
var blanksAndSuccesses = [];

//This will hold the wrong guesses
var wrongGuesses = [];

//Create variables for counters
var winCounter = 0;
var numGuesses = 10;

//FUNCTIONS

//startGame() function tells computer how to start/restart the game
function startGame() {

	//Resets guess remaining at beginning of game
	numGuesses= 10;

	//Solution is chosen
	chosenWord = wordList[Math.floor(Math.random() * wordList.length)];

	//Breaks solution word into individual letters
	lettersInChosenWord = chosenWord.split("");

	//Counts the number of letters in the solution
	numBlanks = lettersInChosenWord.length;

	//print the solution in console for testing
	console.log(chosenWord);

	//reset guess and success array at each round
	blanksAndSuccesses = [];

	//reset wrong guesses from previous round
	wrongGuesses = [];

	for (var i = 0; i < numBlanks; i++){
		blanksAndSuccesses.push("_ ");
	}

	//Print the initial blanks to console.
	console.log(blanksAndSuccesses);

	//Reprinte the Guesses Remaining to 10
	document.getElementById("guessesLeft").innerHTML = guessesLeft;

	//Print the blanks at the beginning of each round in the HTML
	document.getElementById("wordblanks").innerHTML= blanksAndSuccesses.join("");

	//Clear sthe wrong guesses from previous round
	document.getElementById("wrongGuesses").innerHTML= wrongGuesses.join("");

};

//checking letters for matches
function checkLetters(letter){


	var letterInWord = false

	for (var i = 0; i < numBlanks; i++){

		if(chosenWord[i] === letter){
			letterInWord = true;
		}
	}

	//If the letter is in the word, find exaclty where (index)
	if(letterInWord){

		//loop through the word
		for (var i = 0; i < numBlanks; i++){

			//Populate blanksAndSuccesses with every instance of the letter.
			if (chosenWord[i] == letter){

				//set specific space equal to letter when there is a match
				blanksAndSuccesses[i] = letter;
			}
		}

		//log to test
		console.log(blanksAndSuccesses);
		
	}
	//If no match
	else{
		//Add the letter to list of wrong guesses
		wrongGuesses.push(letter);
		//subtract 1 from remaining guesses
		numGuesses--;
	}
};

//roundComplete() function
//This is the code that needs to run after each guess is made

function roundComplete(){

	console.log("WinCount: " + winCounter + " | NumGuesses: " + numGuesses);

	//Update the HTML to reflect new nunmber of guesses and correct guesses. 
	document.getElementById("guessesLeft").innerHTML= numGuesses;

	//This will pring the arra of guesses and blanks onto the page
	document.getElementById("wordblanks").innerHTML= blanksAndSuccesses.join(" ");

	//This will pring the wrong guesses onto the page
	document.getElementById("wrongGuesses").innerHTML= wrongGuesses.join(" ");

	//If we have gotten all the letters to match the solution
	if (lettersInChosenWord.toString() == blanksAndSuccesses.toString()){
		//Add to win count
		winCounter++;
		//Alert user they won!
		alert("You win!");

		//update win count in HTML
		document.getElementById("winCounter").innerHTML=winCounter;
		//Restart the game
		startGame();
	}

	//If user runs out of guesses
	else if (numGuesses == 0) {
		//Alert user they lost.
		alert ("You lost.")

		//restart the game
		startGame();

	}
}

//Start game by running startGame() function
startGame();

//Initiates by capturing keystrokes
document.onkeyup= function(event){

	//Converts all keystrokes to lowercase
	letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

	//Runs code to check for correctness
	checkLetters(letterGuessed);
	//Runs cod after each round is done
	roundComplete();

};
