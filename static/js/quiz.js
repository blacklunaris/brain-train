function buildQuiz(){
    //variable to store the html output
    const output=[];
    //for each question...
    myQuestions.forEach(
        (currentQuestion, questionNumber)=>{
            //variable to store the list of possible answers
            const answers=[];
            //and for each available answer..
            for(letter in currentQuestion.answers){
                // add an html radio button
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter}:
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            //add this question and its answers to the output
            output.push(
                `<div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join('')}</div>`
            );
        }
    );
    //finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML=output.join('');

}

function showResults(){
    //gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    //keep track of user's answers 
    let numCorrect=0;
    //for each question
    myQuestions.forEach((currentQuestion,questionNumber)=>{
        //find selected answer
        const answerContainer=answerContainers[questionNumber];
        const selector=`input[name=question${questionNumber}:checked]`;
        const userAnswer =(answerContainer.querySelector(selector) || {}).value;

        //if answer if correct 
        if(userAnswer===currentQuestion.correctAnswer){
            //add to the number of correct answers
            numCorrect++;
            //colour the answers green
            answerContainers[questionNumber].style.color='lightgreen';
        }
        // if answer is wrong or blank
        else{
            //colour the answers red
            answerContainers[questionNumber].style.color='red';
        }
    }
    );
    //show number of correct answers out of total
    resultsContainer.innerHTML=`${numCorrect} out of ${myQuestions.length}`;
    
}

//variables
const quizContainer =document.getElementById('quiz').value;
const resultsContainer=document.getElementById('results').value;
const submitButton=document.getElementById('submit').value;
const myQuestions=[
    {
        question: "Who invented JavaScript?",
        answers:{
            a: "Douglas Crockford",
            b: "Sheryl Sandberg",
            c: "Brendon Eich"
        },
        correctAnswer:"c"
    },
    {
        question: "Which one of these are is a JavaScript package manager?",
        answers:{
            a: "Node.js",
            b: "TypeScript",
            c: "npm"
        },
        correctAnswer:"c"
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers:{
            a: "Angular",
            b: "JQuery",
            c: "RequireJS",
            d:"ESLint"
        },
        correctAnswer:"d"
    }

];

//display quiz right away
buildQuiz();

//on submit, shows results
submitButton.addEventListener('click',showResults());