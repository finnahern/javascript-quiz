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

	//Loop to add event listeners when an answer is clicked and calls the compareAnswer function.
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

/* Defines incorrectCount and correctAnswer variables, used in incrementIncorrectCount, pullQuestion and
compareAnwer functions, so they need to be declared in the global scope.*/
let incorrectCount = 0;
let correctAnswer;

/**
 * Initialises the quiz. Sets scores to 0, chooses the questions, displays the quiz box and calls 
 * pullQuestion to display the first question.
 */
function initialiseQuiz(){
	console.log("Start button clicked, initialiseQuiz() called!")
	console.log(incorrectCount);

	//Resets score counts to 0
	document.getElementById("number-correct").textContent = "0";
	incorrectCount = 0;

	//Changes colour of incorrect Xs back to grey.
	document.getElementById("incorrect1").style.color="#a9a9a9";
	document.getElementById("incorrect2").style.color="#a9a9a9";
	document.getElementById("incorrect3").style.color="#a9a9a9";
	
	//Loop to populate questionOrder array
	while(questionOrder.length < numberOfQuestions){
		let r = Math.floor(Math.random() * 12);
		if(questionOrder.indexOf(r) === -1) questionOrder.push(r);
	}
	console.log(questionOrder);

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

	//Resets the background colour of the option buttons
	resetColour();

	//Disables the Next button and change its colour to grey
	document.getElementById("nextbtn").disabled = true;
	document.getElementById("nextbtn").style.background='#a9a9a9';

	//Enables the option buttons
	enableOptions();
	
	//Incrementa Question number at the top of the div
	let questionNumber = parseInt(document.getElementById("question-number").innerText);
	++questionNumber;
	document.getElementById("question-number").textContent = questionNumber.toString();


	//Displays the question and multiple choice answers for the current question.
	let currentQuestion = questionOrder.shift();
	correctAnswer = questions[currentQuestion].answer;
	console.log(`Current question index: ${currentQuestion}`);
	console.log(`Correct answer:${correctAnswer}`);

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

	//Defines userAnswer and compares it to correctAnswer.
	let userAnswer = document.getElementById(selectedOption).textContent;
	console.log(`userAnswer is: ${userAnswer}`);
	console.log(`correctAnswer is: ${correctAnswer}`);
	
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
	document.getElementById("number-correct").textContent = newScore.toString();

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
	document.getElementById("restartbtn").innerText = "Try Again";
	
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

/* 
--- Array of Quiz questions ---
Questions sourced from W3Schools Javascript quiz: https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS
*/
const questions = [
    {
		//Question 1
		question: "Inside which HTML element do we put the JavaScript?",
		answer: "<script>",
		options: [
			"<script>",
			"<js>",
			"<javascript>",
			"<scripting>"
		]
  	},
    {
    	//Question 2
		question: "What is the correct JavaScript syntax to change the content of the following HTML element? <p id='demo'>This is a demonstration.</p>",
		answer: "document.getElementById('demo').innerHTML = 'Hello World!';",
		options: [
			"#demo.innerHTML = 'Hello World!';",
			"document.getElementByName('p').innerHTML = 'Hello World!';",
			"document.getElement('p').innerHTML = 'Hello World!';",
			"document.getElementById('demo').innerHTML = 'Hello World!';"
		]
  	},
  	{
		//Question 3
		question: "How do you write 'Hello World' in an alert box?",
		answer: "alert('Hello World');",
		options: [
			"msg('Hello World');",
			"msgBox('Hello World');",
			"alert('Hello World');",
			"alertBox('Hello World');"
		]
 	},
	{
		//Question 4
		question: "How do you write an IF statement in JavaScript?",
		answer: "if (i == 5)",
		options: [
			"if i = 5",
			"if (i == 5)",
			"if i = 5 then",
			"if i == 5 then"
		]
	},
	{
		//Question 5
		question: "How would you write an IF statement for executing some code if 'i' is NOT equal to 5?",
		answer: "if (i != 5)",
		options: [
			"if (i <> 5)",
			"if i =! 5 then",
			"if (i != 5)",
			"if i <> 5"
		]
	},
	{
		//Question 6
		question: "How does a FOR loop start?",
		answer: "for (i = 0; i <= 5; i++)",
		options: [
			"for i = 1 to 5",
			"for (i = 0; i <= 5; i++)",
			"for (i <= 5; i++)",
			"for (i <= 5; i++)"
		]
	},
	{
		//Question 7
		question: "What is the correct way to write a JavaScript array?",
		answer: "var colors = ['red', 'green', 'blue']",
		options: [
			"var colors = 'red', 'green', 'blue'",
			"var colors = (1:'red', 2:'green', 3:'blue')",
			"var colors = ['red', 'green', 'blue']",
			"var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"
		]
	},
	{
		//Question 8
		question: "How do you round the number 7.25, to the nearest integer?",
		answer: "Math.round(7.25)",
		options: [
			"Math.round(7.25)",
			"round(7.25)",
			"Math.rnd(7.25)",
			"rnd(7.25)"
		]
	},
	{
		//Question 9
		question: "How do you find the number with the highest value of x and y?",
		answer: "Math.max(x, y)",
		options: [
			"top(x, y)",
			"Math.ceil(x, y)",
			"ceil(x, y)",
			"Math.max(x, y)"
		]
	},
	{
		//Question 10
		question: "Which event occurs when the user clicks on an HTML element?",
		answer: "onclick",
		options: [
			"onclick",
			"onchange",
			"onmouseclick",
			"onmouseover"
		]
	},
	{
		//Question 11
		question: "How do you declare a JavaScript variable?",
		answer: "var carName;",
		options: [
			"variable carName;",
			"v carName;",
			"carName;",
			"var carName;"
		]
	},
	{
		//Question 12
		question: "Which operator is used to assign a value to a variable?",
		answer: "=",
		options: [
			"*",
			"=",
			"+",
			"x"
		]
	},
]

/* Template to add new questions to the array.
{
		question: "Placeholder question text",
		answer: "the right answer",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"the right answer"
		]
	},
*/