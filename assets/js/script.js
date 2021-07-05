function initialiseQuiz(){
//Calls pullQuesiton
}

function pullQuestion(){
//Pulls a random question from the array and displays it on screen. Stores Question ID so it doesn't pull
//the same one again. Listens for user input and calls compareAnswer. Increments question-number span.
}

function compareAnswer(){
//compares the correct answer to the one the user selected. If it's correct highlights it in green and calls 
// incrementCorrectCount. If it's wrong, highlights in red, highlights the correct answer in green and calls
// incrementIncorrectCount. Both cases prompt the user to click next which calls pullQuestion again.
}

function incrementCorrectCount(){
//Displays correctAnswer integer. Starts at 0 and increments by 1 every time the user answers a question correctly.
//When correctAnswer = 5, calls passQuiz function.
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
}

function restartQuiz(){
//Resets the correct and incorrect answer counts to 0 and clears the list of Question IDs already completed so they 
//can be pulled again
}

/* --- Array of Quiz questions will look something like this: ---

let questions = [
    {
    Id: 1,
    question: "Text of the first question",
    answer: "Correct answer of the first question",
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
    answer: "Correct answer of the seconf question",
    options: [
        "option 1",
        "option 2",
        "option 3",
        "option 4"
    ]
  },

  etc....
*/