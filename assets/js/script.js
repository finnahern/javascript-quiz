//Wait for the DOM to finish loading before running Javascript.
document.addEventListener("DOMContentLoaded", function(){
	
	//Loop to add event listeners to all buttons so they will call the appropriate function on click.
	let buttons = document.getElementsByClassName("button");
	for(let button of buttons){
    	button.addEventListener("click", function(){
			if (this.getAttribute("id") === "startbtn"){
				initialiseQuiz();
			}else if (this.getAttribute("id") === "nextbtn"){
				pullQuestion();
			}else if (this.getAttribute("id") === "restartbtn"){
				initialiseQuiz();
			}else if(this.getAttribute("id") === "quitbtn"){
				abortQuiz();
			}else {
				alert("Unrecognised button clicked!");
				throw "Unrecognised button clicked!, Aborting!";
			}
    	})
  	}

	//Loop to add event listeners when an answer is clicked. Needs to call the compareAnswer() function
	let options = document.getElementsByClassName("option");
	for(let option of options){
		option.addEventListener("click", function(){
			if (this.getAttribute("id") === "option1"){
				console.log("Option 1 clicked!")
				compareAnswer("option1");
			}else if (this.getAttribute("id") === "option2"){
				console.log("Option 2 clicked!")
				compareAnswer("option2");
			}else if (this.getAttribute("id") === "option3"){
				console.log("Option 3 clicked!")
				compareAnswer("option3");
			}else if (this.getAttribute("id") === "option4"){
				console.log("Option 4 clicked!")
				compareAnswer("option4");
			}else {
				alert("Unrecognised option clicked!");
				throw "Unrecognised option clicked!, Aborting!";
			}
		})
	}
})

/* Array to determine order of questions. Pulls 8 questions from the array of 12 and ensures 
there are no duplicates. */
const questionOrder = [];
const numberOfQuestions = 8;

let incorrectCount = 0;

/**
 * Initialises the quiz. Sets scores to 0, chooses the questions, displays the quiz box and calls 
 * pullQuestion to display the first question.
 */
function initialiseQuiz(){
	console.log("Start button clicked, initialiseQuiz() called!")
	
	//Loop to populate questionOrder array
	while(questionOrder.length < numberOfQuestions){
		let r = Math.floor(Math.random() * 12);
		if(questionOrder.indexOf(r) === -1) questionOrder.push(r);
	}
	console.log(questionOrder);

	//Resets score counts to 0
	document.getElementById("number-correct").textContent = "0";
	incorrectCount = 0;

	//Hides start-box and result-box divs. Displays quiz-box.
	document.getElementById("start-box").style.display = "none";
	document.getElementById("quiz-box").style.display = "block";
	document.getElementById("result-box").style.display = "none";

	pullQuestion();
}

/**
 * Increments the question number and displays the question 
 * text and answers from the next question in the questionOrder array.
 */
function pullQuestion(){
	console.log("pullQuestion() called!")

	//Reset the background colour of the option buttons
	resetColour();

	//Disable the Next button and change its colour to grey
	document.getElementById("nextbtn").disabled = true;
	document.getElementById("nextbtn").style.background='#a9a9a9';

	//Enable the option buttons
	enableOptions();
	
	//Increments Question number at the top of the div
	let questionNumber = parseInt(document.getElementById("question-number").innerText);
	++questionNumber;
	document.getElementById("question-number").textContent = questionNumber;


	//Displays the question and multiple chouce answers for the current question.
	let currentQuestion = questionOrder.shift();
	console.log(`Current question index: ${currentQuestion}`);

	document.getElementById("question-text").textContent = questions[currentQuestion].question;
	
	document.getElementById("option1").textContent = questions[currentQuestion].options[0];
	document.getElementById("option2").textContent = questions[currentQuestion].options[1];
	document.getElementById("option3").textContent = questions[currentQuestion].options[2];
	document.getElementById("option4").textContent = questions[currentQuestion].options[3];
}

/**
 * Compares the user's selected answer to the correct answer from the question array. Call 
 * incrementCorrectCount or incrementIncorrectCount depending and display feedback to user.
 */
function compareAnswer(selectedOption){
	console.log("compareAnswer called!")

	//Enables the Next button and changes its colour to blue.
	document.getElementById("nextbtn").disabled = false;
	document.getElementById("nextbtn").style.background="#0077ff";

	//Disables the option buttons
	disableOptions();

	//Defines correctAnswer and userAnswer and compares them.
	let correctAnswer = questions[0].answer;
	let userAnswer = document.getElementById(selectedOption).textContent;
	


	if(userAnswer === correctAnswer){
		console.log("Clicked the right answer! :D");
		incrementCorrectCount();

		document.getElementById(selectedOption).style.background="#1dcc4b";
	} else{
		console.log("Fucked it mate");
		incorrectCount = incrementIncorrectCount(incorrectCount);
		console.log(incorrectCount);

		document.getElementById(selectedOption).style.background="#cc2121";
	}
}

/**
 * Increments the number-correct counter by 1. Called when the user correctly answers a question.
 * If the number of correct answers hits 5, calls the passQuiz() function.
 */
function incrementCorrectCount(){
	let oldScore = parseInt(document.getElementById("number-correct").innerText);
	let newScore = ++oldScore
	document.getElementById("number-correct").textContent = newScore;

	if(newScore >= 5){
		passQuiz();
	}
}

/**
 * Displays 3 big greyed out Xs at the top of the quiz box throughout. When the user gets an answer wrong, 
 * one of the Xs turns red. When all 3 are red calls failQuiz function.
 */
function incrementIncorrectCount(incorrectCount){
	let currentCount = incorrectCount;
	currentCount++;

	switch(currentCount){
		case 0:
			document.getElementById("incorrect1").style.color="#a9a9a9";
			document.getElementById("incorrect2").style.color="#a9a9a9";
			document.getElementById("incorrect3").style.color="#a9a9a9";
			break;
		case 1:
			document.getElementById("incorrect1").style.color="#cc2121";
			break;
		case 2:
			document.getElementById("incorrect1").style.color="#cc2121";
			document.getElementById("incorrect2").style.color="#cc2121";
			break;
		case 3:
			document.getElementById("incorrect1").style.color="#cc2121";
			document.getElementById("incorrect2").style.color="#cc2121";
			document.getElementById("incorrect3").style.color="#cc2121";
			break;
		default: 
			document.getElementById("incorrect1").style.color="#a9a9a9";
			document.getElementById("incorrect2").style.color="#a9a9a9";
			document.getElementById("incorrect3").style.color="#a9a9a9";
			break;
	}

	if(currentCount >= 3){
		failQuiz();
	}

	return currentCount;
}

/**
 * Displays results box congratulating the user on passing the quiz and has two buttons 
 * to restart(initialiseQuiz) or quit(abortQuiz).
 */
function passQuiz(){
	console.log("Quiz passed!");

	document.getElementById("start-box").style.display = "none";
	document.getElementById("quiz-box").style.display = "none";
	document.getElementById("result-box").style.display = "block";
}

/**
 * Displays the results box but edits the content in the DOM to indicate the the user failed
 * the quiz. 2 buttons prompt the user to restart(initialiseQuiz) or quit(abortQuiz).
 */
function failQuiz(){
	console.log("Quiz failed!");

	document.getElementById("icon").innerHTML = "<i class='fas fa-times'></i>";
	document.getElementById("completed-text").innerText = "You failed the quiz, better luck next time!";
	
	document.getElementById("start-box").style.display = "none";
	document.getElementById("quiz-box").style.display = "none";
	document.getElementById("result-box").style.display = "block";
}

/**
 * Cancels the quiz and returns to the start-box screen.
 */
function abortQuiz(){
	console.log("Quit button clicked, abortQuiz() called!");
	document.getElementById("start-box").style.display = "block";
	document.getElementById("quiz-box").style.display = "none";
	document.getElementById("result-box").style.display = "none";
}

/**
 * Enables the option button elements
 */
function enableOptions(){
	document.getElementById("option1").disabled = false;
	document.getElementById("option2").disabled = false;
	document.getElementById("option3").disabled = false;
	document.getElementById("option4").disabled = false;	
}

/**
 * Disables the option button elements
 */
function disableOptions(){
	document.getElementById("option1").disabled = true;
	document.getElementById("option2").disabled = true;
	document.getElementById("option3").disabled = true;
	document.getElementById("option4").disabled = true;
}

/**
 * Resets the colours of the option buttons once the next question is displayed
 */
function resetColour(){
	document.getElementById("option1").style.background="#efefef";
	document.getElementById("option2").style.background="#efefef";
	document.getElementById("option3").style.background="#efefef";
	document.getElementById("option4").style.background="#efefef";
}

/* --- Array of Quiz questions will look something like this: --- */

const questions = [
    {
		//Question 1
		question: "Text of the first question",
		answer: "the right answer",
		options: [
			"the right answer",
			"option 2",
			"option 3",
			"option 4"
		]
  	},
    {
    	//Question 2
		question: "Text of the second question",
		answer: "the right answer",
		options: [
			"option 1",
			"the right answer",
			"option 3",
			"option 4"
		]
  	},
  	{
		//Question 3
		question: "Text of the third question",
		answer: "the right answer",
		options: [
			"option 1",
			"option 2",
			"the right answer",
			"option 4"
		]
 	},
	{
		//Question 4
		question: "Text of the fourth question",
		answer: "the right answer",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"the right answer"
		]
	},
	{
		//Question 5
		question: "Text of the fifth question",
		answer: "the right answer",
		options: [
			"the right answer",
			"option 2",
			"option 3",
			"option 4"
		]
	},
	{
		//Question 6
		question: "Text of the sixth question",
		answer: "the right answer",
		options: [
			"option 1",
			"the right answer",
			"option 3",
			"option 4"
		]
	},
	{
		//Question 7
		question: "Text of the seventh question",
		answer: "the right answer",
		options: [
			"option 1",
			"option 2",
			"the right answer",
			"option 4"
		]
	},
	{
		//Question 8
		question: "Text of the eighth question",
		answer: "the right answer",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"the right answer"
		]
	},
	{
		//Question 9
		question: "Text of the ninth question",
		answer: "the right answer",
		options: [
			"the right answer",
			"option 2",
			"option 3",
			"option 4"
		]
	},
	{
		//Question 10
		question: "Text of the tenth question",
		answer: "the right answer",
		options: [
			"option 1",
			"the right answer",
			"option 3",
			"option 4"
		]
	},
	{
		//Question 11
		question: "Text of the eleventh question",
		answer: "the right answer",
		options: [
			"option 1",
			"option 2",
			"the right answer",
			"option 4"
		]
	},
	{
		//Question 12
		question: "Text of the twelfth question",
		answer: "the right answer",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"the right answer"
		]
	},
]