const questions = [{
    question: "What is the maximum speed limit on most federal roads and states roads? ",
    answers: [
        { text: "90 km/h", correct: true },
        { text: "45 km/h", correct: false },
        { text: "50 km/h", correct: false },
        { text: "75 km/h", correct: false }
    ]
},
{
    question: "When is the Car Free Day?",
    answers: [
        { text: "21 Sept", correct: false },
        { text: "7 Sept", correct: false },
        { text: "8 April", correct: false },
        { text: "22 Sept", correct: true }
    ]
},
{
    question: "In 2030, where is road traffic injuries expected to rank among the leading causes of global deaths? ",
    answers: [
        { text: "5th", correct: false },
        { text: "6th", correct: false },
        { text: "7th", correct: true },
        { text: "8th", correct: false }
    ]
},
{
    question: " What is the legal blood alcohol concentration (BAC) limit for drivers in many countries?",
    answers: [
        { text: "0.00%", correct: false },
        { text: "0.08%", correct: true },
        { text: "0.05%", correct: false },
        { text: "1.00%", correct: false }
    ]
},
{
    question: "In adverse weather conditions, such as heavy rain or snow, drivers should: ",
    answers: [
        { text: "increase speed for better traction", correct: false },
        { text: "use hazard lights constantly", correct: false },
        { text: "reduce speed and increase following distance", correct: true },
        { text: "keep windows open for better visibility", correct: false }
    ]
},

];


let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-text');
const imageContainer = document.getElementById('question-image');
const answerButtonsContainer = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const quizOverMessage = document.getElementById('quiz-over-message');
const scoreContainer = document.getElementById('score-container');
const scoreSpan = document.getElementById('score');


function startGame() {
currentQuestionIndex = 0;
score = 0;
questions.forEach(question => {
    question.answered = false;
});
showQuestion(questions[currentQuestionIndex]);

}

function showQuestion(question) {
questionContainer.innerText = question.question;
answerButtonsContainer.innerHTML = '';
question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer));
    answerButtonsContainer.appendChild(button);
});
}

function selectAnswer(answer) {
if (questions[currentQuestionIndex].answered) {
    return;
}

questions[currentQuestionIndex].answered = true;

if (answer.correct) {
    score++;
    scoreSpan.innerText = score;
}

currentQuestionIndex++;

if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
} else {
    endQuiz();
}
}



function endQuiz() {
quizOverMessage.style.display = 'block';
scoreContainer.style.display = 'block';
scoreSpan.innerText = score;
nextButton.style.display = 'none';
restartButton.style.display = 'block';

const scoringMessage = document.createElement('p');
scoringMessage.innerText = `You scored ${score} out of ${questions.length}!`;

// Append scoring message to the correct container
document.getElementById('quiz-container').appendChild(scoringMessage);
}

function restartQuiz() {
quizOverMessage.style.display = 'none';
nextButton.style.display = 'block';
restartButton.style.display = 'none';

// Remove scoring message element
const scoringMessage = document.getElementById('quiz-container').querySelector('p');
if (scoringMessage) {
    scoringMessage.remove();
}

questions.forEach(question => {
    question.answered = false;
});
score = 0;
scoreContainer.style.display = 'block';
scoreSpan.innerText = score;

startGame();
}



function nextQuestion() {
selectAnswer();

}

startGame();