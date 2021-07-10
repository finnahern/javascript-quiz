### Bugs: 
- Loop to add event listeners to mutiple choice answers was in the pullQuestion function meaning that every time the function was called to display a new question meaning that the compareAnswer function was getting called once the first answer you clicked, twice for the second and so on. Probably have to move the loop to the global scope. FIXED
- incorrectCount is not resetting properly, causing any wrong answers to fail after a second attempt. FIXED

### Improvements: 
- enableOptions, disableOptions and resetColour functions are clunky and inelegant. Some sort of loop to apply attributes/stlye rule to each option would be neater. Temporary solution works but should be fixed later.

### Possible additions:
- Timer on the bottom of the quiz-box that tracks how long the user is taking.
- Ability to adapt to questions with fewer (or more) possible answers.
- Ability to randomise the order of the displayed answers to add even more variance to subsequent attempts.