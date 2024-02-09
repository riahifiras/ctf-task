const currentQuestion = document.getElementsByClassName("question")[0];
const container = document.getElementsByClassName("container")[0];
const currentAnswers = document.getElementsByClassName("answer");
const gameoverWindow = document.getElementsByClassName("gameover")[0];
const alertTag = document.getElementsByClassName("alert")[0];
const nextBtn = document.getElementsByClassName("next")[0];
const submitBtn = document.getElementsByClassName("submit")[0];
const restartBtn = document.getElementsByClassName("restart")[0];
const scoreTag = document.getElementsByClassName("score")[0];
const finalScoreTag = document.getElementsByClassName("score")[1];
const numberOfQuestionsTag = document.getElementsByClassName("total")[0];
const remainingTimeTag = document.getElementsByClassName("time")[0];
let final = "";
let score = 0;
let currentQuestionIndex = 0;
let selectedAnswer = -1;
let timeRemaining = 20;
let numberOfQuestions;
let questions;
let originalStringIndex = 0;

const startInterval = () => {
    return setInterval(() => {
        remainingTimeTag.innerText = timeRemaining;
        if (timeRemaining === 0) {
            if (selectedAnswer === -1) {
                currentAnswers[questions[currentQuestionIndex].correctOptionIndex].style.backgroundColor = "green";
                nextBtn.style.display = "block";
                submitBtn.style.display = "none";
                for (let index = 0; index < questions[currentQuestionIndex].options.length; index++) {
                    currentAnswers[index].removeEventListener("click", select);
                }
            } else {
                submit();
            }
            clearInterval(intervalId);
        }
        timeRemaining -= 1;
    }, 1000);
};

let intervalId = startInterval();

const loadQuestion = () => {
    currentQuestion.innerText = questions[currentQuestionIndex].questionText;
    for (let index = 0; index < questions[currentQuestionIndex].options.length; index++) {
        const element = questions[currentQuestionIndex].options[index];
        currentAnswers[index].innerText = element;
        currentAnswers[index].addEventListener("click", select);
    }
};

function decryptMessage(encryptedMessage) {
    let decryptedMessage = '';
    const shift = 3;

    for (let i = 0; i < encryptedMessage.length; i++) {
        let charCode = encryptedMessage.charCodeAt(i);
        if (charCode >= 97 && charCode <= 122) {
            charCode = ((charCode - 97 - shift + 26) % 26) + 97;
        }
        decryptedMessage += String.fromCharCode(charCode);
    }

    return decryptedMessage;
}

const loadNextQuestion = () => {
    if (currentQuestionIndex >= numberOfQuestions - 1) {
        nextBtn.style.display = "none";
        finalScoreTag.innerText = score;
        numberOfQuestionsTag.innerText = numberOfQuestions;
        gameoverWindow.style.display = "flex";
        container.style.display = "none";
        clearInterval(intervalId);
        console.log(decryptMessage(final));
        return 0;
    }
    selectedAnswer = -1;
    currentQuestionIndex += 1;
    timeRemaining = 10;
    clearInterval(intervalId);
    intervalId = startInterval();
    for (let index = 0; index < questions[currentQuestionIndex].options.length; index++) {
        currentAnswers[index].addEventListener("click", select);
    }
    loadQuestion(questions, currentQuestionIndex);
    for (let index = 0; index < questions[currentQuestionIndex].options.length; index++) {
        currentAnswers[index].style.backgroundColor = "white";
        currentAnswers[index].style.border = "2px solid black";
    }
    nextBtn.style.display = "none";
    submitBtn.style.display = "block";
};

const select = (e) => {
    for (let index = 0; index < questions[currentQuestionIndex].options.length; index++) {
        currentAnswers[index].style.border = "2px solid black";
    }
    selectedAnswer = e.target;
    e.target.style.border = "2px solid lime";
}

const submit = () => {
    if (selectedAnswer === -1) {
        setTimeout(() => {
            alertTag.innerText = "";
        }, 3000);
        alertTag.innerText = "Please select an answer";
    }
    else {
        nextBtn.style.display = "block";
        submitBtn.style.display = "none";
        for (let index = 0; index < questions[currentQuestionIndex].options.length; index++) {
            currentAnswers[index].removeEventListener("click", select);
        }
        if (selectedAnswer.innerText === questions[currentQuestionIndex].options[questions[currentQuestionIndex].correctOptionIndex]) {
            selectedAnswer.style.backgroundColor = "green";
            score += 1;
            scoreTag.innerText = score;
            final += "/rvvhf_rq_iluh"[originalStringIndex] || '#';
            originalStringIndex++;
        }
        else {
            selectedAnswer.style.backgroundColor = "red";
            currentAnswers[questions[currentQuestionIndex].correctOptionIndex].style.backgroundColor = "green";
            final += "#";
            originalStringIndex++;
        }
        clearInterval(intervalId);
    }
    if (currentQuestionIndex >= numberOfQuestions - 1 && (selectedAnswer != -1 || timeRemaining === 0)) {
        nextBtn.style.display = "none";
        finalScoreTag.innerText = score;
        numberOfQuestionsTag.innerText = numberOfQuestions;
        localStorage.setItem("final", final);
        gameoverWindow.style.display = "flex";
        container.style.display = "none";
        clearInterval(intervalId);
        console.log(final);
    }
}

const restart = () => {
    gameoverWindow.style.display = "none";
    container.style.display = "flex";
    score = 0;
    scoreTag.innerText = score;
    currentQuestionIndex = -1;
    originalStringIndex = 0;
    loadNextQuestion();
}

async function fetchData() {
    try {
        const response = await fetch("questions.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching or parsing data:", error);
        throw error;
    }
}

async function initialize() {
    try {
        localStorage.setItem("final", "");
        gameoverWindow.style.display = "none";
        alertTag.innerText = "";
        container.style.display = "flex";
        nextBtn.style.display = "none"
        let data = await fetchData();
        questions = data;
        numberOfQuestions = questions.length;
        loadQuestion();
        nextBtn.addEventListener("click", loadNextQuestion);
        submitBtn.addEventListener("click", submit);
        restartBtn.addEventListener("click", restart);
    } catch (error) {
        console.error("Error initializing:", error);
    }
}

initialize();
