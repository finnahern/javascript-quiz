//Wait for the DOM to finish loading before running Javascript.
document.addEventListener("DOMContentLoaded", function(){
	
	//Loop to add event listeners to all buttons so they will call the appropriate function on click.
	let buttons = document.getElementsByTagName("button");
	for(let button of buttons){
    	button.addEventListener("click", function(){
			if (this.getAttribute("class") === "start"){
				initialiseQuiz();
			}else if (this.getAttribute("class") === "nextbtn"){
				pullQuestion();
			}else if (this.getAttribute("class") === "restart"){
				restartQuiz();
			}else if(this.getAttribute("class") === "quit"){
				abortQuiz();
			}else {
				alert("Unrecognised button clicked!");
				throw "Unrecognised button clicked!, Aborting!";
			}
    	})
  	}
})

/* Loop to determine order of questions. Pulls 8 questions from the array of 12 and ensures 
there are no duplicates. */
const questionOrder = [];
const numberOfQuestions = 8;
while(questionOrder.length < numberOfQuestions){
    let r = Math.floor(Math.random() * 12);
    if(questionOrder.indexOf(r) === -1) questionOrder.push(r);
}
console.log(questionOrder);

function initialiseQuiz(){
	//Sets score counts to 0, pulls the initial array of questions.

	console.log("Start button clicked, initialiseQuiz() called!")
	document.getElementById('start-box').style.display = 'none';
	document.getElementById('quiz-box').style.display = 'block';
	document.getElementById('result-box').style.display = 'none';

	pullQuestion();
}

function pullQuestion(){
	//Pulls a random question from the array and displays it on screen.
	// Listens for user input and calls compareAnswer. Increments question-number span.

	console.log("Next button clicked, pullQuestion() called!")
	//document.getElementById('start-box').style.display = 'none';
	//document.getElementById('quiz-box').style.display = 'none';
	//document.getElementById('result-box').style.display = 'block';

	document.getElementById('question-text').textContent = questions[questionOrder[0]].question;
	
	document.getElementById('option1').textContent = questions[questionOrder[0]].options[0];
	document.getElementById('option2').textContent = questions[questionOrder[0]].options[1];
	document.getElementById('option3').textContent = questions[questionOrder[0]].options[2];
	document.getElementById('option4').textContent = questions[questionOrder[0]].options[3];
}

function compareAnswer(){
//compares the correct answer to the one the user selected. If it's correct highlights it in green and calls 
// incrementCorrectCount. If it's wrong, highlights in red, highlights the correct answer in green and calls
// incrementIncorrectCount. Both cases prompt the user to click next which calls pullQuestion again.
}

/**
 * Increments the number-correct counter by 1. Called when the user correctly answers a question.
 * If the number of correct answer
 */
function incrementCorrectCount(){
	let oldScore = parseInt(document.getElementById("number-correct").innerText);
	let newScore = ++oldScore
	document.getElementById("number-correct").textContent = newScore;

	if(newScore => 5){
		passQuiz();
	}
}

function incrementIncorrectCount(){
//Displays 3 big greyed out Xs at the top of the quiz box throughout. When the user gets an answer wrong, one
//of the Xs turns red. When all 3 are red calls abortQuiz function.
}

function passQuiz(){
//Displays results box congratulating the user on passing the quiz and has two buttons to restart or quit(abortQuiz)
}

function abortQuiz(){
	//Cancels the quiz and returns to the start-box screen. Possibly acknowledges failure if called by incrementIncorrectCount

	console.log("Quit button clicked, abortQuiz() called!")
	document.getElementById('start-box').style.display = 'block';
	document.getElementById('quiz-box').style.display = 'none';
	document.getElementById('result-box').style.display = 'none';
}

function restartQuiz(){
	//Resets the correct and incorrect answer counts to 0 and clears the list of Question IDs already completed so they 
	//can be pulled again
	
	console.log("Restart button clicked, restartQuiz() called!");
	document.getElementById('start-box').style.display = 'none';
	document.getElementById('quiz-box').style.display = 'block';
	document.getElementById('result-box').style.display = 'none';
}

/* --- Array of Quiz questions will look something like this: --- */

const questions = [
    {
		Id: 1,
		question: "Text of the first question",
		answer: "option 1",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"option 4"
		]
  	},
    {
    	Id: 2,
		question: "Text of the second question",
		answer: "option 1",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"option 4"
		]
  	},
  	{
		Id: 3,
		question: "Text of the third question",
		answer: "option 1",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"option 4"
		]
 	},
	{
		Id: 4,
		question: "Text of the fourth question",
		answer: "option 1",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"option 4"
		]
	},
	{
		Id: 5,
		question: "Text of the fifth question",
		answer: "option 1",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"option 4"
		]
	},
	{
		Id: 6,
		question: "Text of the sixth question",
		answer: "option 1",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"option 4"
		]
	},
	{
		Id: 7,
		question: "Text of the seventh question",
		answer: "option 1",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"option 4"
		]
	},
	{
		Id: 8,
		question: "Text of the eighth question",
		answer: "option 1",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"option 4"
		]
	},
	{
		Id: 9,
		question: "Text of the ninth question",
		answer: "option 1",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"option 4"
		]
	},
	{
		Id: 10,
		question: "Text of the tenth question",
		answer: "option 1",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"option 4"
		]
	},
	{
		Id: 11,
		question: "Text of the eleventh question",
		answer: "option 1",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"option 4"
		]
	},
	{
		Id: 12,
		question: "Text of the twelfth question",
		answer: "option 1",
		options: [
			"option 1",
			"option 2",
			"option 3",
			"option 4"
		]
	},
]