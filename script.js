const questions = [
    {
        question: "Where river nile gets it's main source of water",
        answers: [
            { text: "Lake Karaina", correct: false},
            { text: "Lake Nasser", correct: false},
            { text: "Lake Victoria", correct: true},
            { text: "None", correct: false}
        ]
    },
    {
        question: "The river nile begin",
        answers: [
            { text: "Ethipoia", correct: true},
            { text: "Sudan", correct: false},
            { text: "North Sudan", correct: false},
            { text: "None", correct: false}
        ]
    },
    {
        question: "The white and blue nile are meet in",
        answers: [
            { text: "Ethipoia", correct: false},
            { text: "Sudan", correct: true},
            { text: "North Sudan", correct: false},
            { text: "None", correct: false}
        ]
    }
]


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;


function QuizStart(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;

        }
        button.addEventListener("click", selectAnswer)
    })
}


function resetState(){
    nextButton.style.display = 'none';
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct == "true") {
            selectedBtn.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}


function showScore(){
    resetState();
    questionElement.innerHTML =  `Your Score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handlenextButtom(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestions();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length) {
        handlenextButtom();
    }else{
        QuizStart();
    }
})

QuizStart();
console.log("hello")