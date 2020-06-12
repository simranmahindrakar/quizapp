const startButton = document.getElementById('start');
const nextButton = document.getElementById('next');
const questionContainerElement = document.getElementById('question-container');

let shuffleQuestions, currenntQI;

const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer-btn');


startButton.addEventListener ('click', startGame);
nextButton.addEventListener('click' , () => {   //event to occur after Next is clicked
    currenntQI++;
    setNextQuestion();
})

function startGame() {
    startButton.classList.add('hide');
    shuffleQuestions = questions.sort(() => Math.random() - 0.5);  //shuffles questions for us
    currenntQI =0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();

}

function setNextQuestion() {
    resetstate(); //reset everything to default before showing next question
    showQuestion(shuffleQuestions[currenntQI]);  //shuffle question is an array  

}

function showQuestion (questions) {
   questionElement.innerText=questions.question; //questions is the array containing Qs as objects
    questions.answers.forEach(answer => {     //loop through options to populate answer buttons by creating new buttonw
        
        const button = document.createElement('button');
        button.innerText=answer.text;
        button.classList.add('btn');
        
        if(answer.correct){
            button.dataset.correct = answer.correct;     //do this only for correct answer to make life easy
        }
        button.addEventListener("click", selectAnswer);
        answerElement.appendChild(button);
    });
}


function selectAnswer(e) {      //takes the click event as input parameter
    const selectedButton = e.target;   //e.target is the chosen ans
    //check if answer is correct
    const correct = selectedButton.dataset.correct;
    //change background colour according to answer
    setStatusClass(document.body, correct);
    Array.from(answerElement.children).forEach(button => {
        setStatusClass(button, button.dataset.corect);  
    })
    if(shuffleQuestions.length>currenntQI + 1)  //we have more questions
        {   nextButton.classList.remove('hide');
            }
    else {
        startButton.innerText = 'Restart';

        startButton.classList.remove('hide');   //show this button if quiz is over
        
    }
}

function setStatusClass(element, correct){     //button is the elemnt to add class 'correct' to
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct');
    }
    else{
        element.classList.add('wrong');
    }
}

//func to clear status
function clearStatusClass(element){
    element.classList.remove('correct');     //make screen neutral 
    element.classList.remove('wrong');
}

function resetstate() {
    nextButton.classList.add('hide'); //hide NEXT when showing new Q
    while (answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild);   //remove old answers 
    }
}

const questions =[
    {                                                      // array of questions
        question: "What is Simran's deadline to bag an internship?",
        answers : [
            {text: '1st July', correct : true},
            {text: 'IDK' , correct : false} ]
    }
];