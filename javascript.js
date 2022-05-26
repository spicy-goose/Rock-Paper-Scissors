// create function to select computer move
function selectComputerMove(){

	//create an array with three values: rock paper scissors 	
	const choicesArr = ['ROCK', 'PAPER', 'SCISSORS'];
	
	//declare variable randomNum and assign a random number from 0-3 
	let randomNum = Math.floor(Math.random()*3);

        //return the value of the array at index randomNum
	return choicesArr[randomNum]
}
//create function to select player move
function selectPlayerMove(){

	//declare player choice variable
	let playerChoice;

	//declare variable keepGoing to true, it will decide whether the player choice is done
	let keepGoing = true;

	//iterate while keep going is true
	while (keepGoing == true){

		//prompt player to select a move and store it in a player choice variable
		playerChoice = prompt('what is your move? Rock, Paper or Scissors!');
		
		//check that player move is a string
		if (typeof playerChoice ==  "string"){

			//change the input to upper case and compare to ROCK, PAPER or SCISSORS	
			playerChoice = playerChoice.toUpperCase();
		}
		//verify choice is a valid choice
		if (playerChoice == "ROCK" || playerChoice == "PAPER" || playerChoice == "SCISSORS"){
			
			//if yes, change keepGoing to false
			keepGoing = false;
		}else{
			//if not, alert the choice is not valid, select a new move
			alert("Invalid choice, select a new move!")
		}
	}
	//return player move
	return playerChoice
}

//create function to declare winner of round of RPS, needs two choices as parameters
function declareWinner(computerMove, playerMove){
	
	//use switch statement to decide winner
	switch(computerMove+playerMove){
		case "ROCKSCISSORS":
		case "PAPERROCK":
		case "SCISSORSPAPER":
			return "Computer"
		case "SCISSORSROCK":
		case "ROCKPAPER":
		case "PAPERSCISSORS":
			return "Player"
		default:
			return "Draw"
	}
}

//create function to store/increment player score
function playerScore(){	

	//create variable to serve as player score 
	let playerScore = 0;

	//return function with parameter (point, computerMove)
	return function(point, computerMove) {
		//check that point exist, 
		if (point){
			//if yes increment player score 
			++playerScore
			//return string declaring the player as winner of round, "computer chose x, you win"
			return `Computer chose ${computerMove}, you win!`
		}
		//if no, return current score
		return playerScore
	}
}

//create function to store/increment computer score
function computerScore(){

	//create variable to serve as computer score 
	let computerScore = 0;

	//return function with parameter (point)
	return function(point, computerMove) {
		//check that point exist, 
		if (point){
			//if yes increment computer score
			++computerScore;
			//return string declaring computer as winner,  "computer chose x, you lose"
			return `Computer chose ${computerMove}, you lose.`
		}
		//if no, return current computer score
		return computerScore
	}
}	

//create function to play a round of R, P , S, pass in functions to increment score
function playRound(currentPlayerScore, currentComputerScore){

	//initiate variable for round winner
	let roundWinner;

	//initiate variable for computer move and call function to select computer move
	let computerMove = selectComputerMove();

	//initiate variable for player move and call function to select player move
	let playerMove = selectPlayerMove();

	//call function to declare winner and store in winner variable, pass computer and player moves
	roundWinner = declareWinner(computerMove, playerMove);
	
	//if draw, declare a draw and call the play round function again
	if (roundWinner == "Draw"){
		alert(`Computer chose ${computerMove}, it's a draw!`);
		return playRound(currentPlayerScore, currentComputerScore)
	
	//if player wins, call player increment function and return result, pass in computer move
	}else if (roundWinner == "Player"){
		return currentPlayerScore("Player", computerMove)
	
	//else call computer increment function and return result, pass in computer move
	}else{
		return currentComputerScore("Player", computerMove)

	}
	


}

//create function to initiate/reset game
function play(){
	//initiate variable for overall winner
	let overallWinner;
	
	// initialize a variable for player score and computer score
	let currentPlayerScore = playerScore();
	let currentComputerScore = computerScore();

	//intialize variables to keep track if it is a 1, 3 or 5 round game
	let round3 = true;
	let round5 = true;

	//initialize variable 'keepGoing' to true to keep track of number of games played	
	let keepGoing = true;

	//start a while loop that runs while keepGoing is true
	while (keepGoing == true){
		//call play round 1 function, console log output of function
		alert(playRound(currentPlayerScore, currentComputerScore))

		//check player score and computer score
		//currentPlayerScore = playerScore();
		//computerScore = computerScore();

		//if player score or computer score == 1 and round 3 is true, 
		if ((currentPlayerScore() == 1 || currentComputerScore() == 1) && round3 == true){

			//prompt for playing best out of 3
			keepGoing  = Boolean(confirm("Want to play best out of 3?"));
			round3 = false;

		//if player score or computer score == 2
		}else if((currentPlayerScore() == 2 || currentComputerScore() == 2) && round5 == true){
		
			//prompt for playing best out of 5
			keepGoing  = Boolean(confirm("Want to play best out of 5?"));
			round5 = false;

		//elseif player score or computer score == 3, set keepGoing to false
		}else if (currentPlayerScore() == 3 || currentComputerScore() == 3){
			keepGoing  = false;
		}

	}
	//If player score > computer
	if (currentPlayerScore() > currentComputerScore()) {
		//Declare player winner
		overallWinner  = "Player"
	}else{
	//else declare computer as winner	
		overallWinner = "Computer"
	}

	//return overall winner
	alert(`The winner is the ${overallWinner}! Thank you for playing!`)
}

play()
