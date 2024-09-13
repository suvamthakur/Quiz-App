const getData = async () => {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=3&category=18&difficulty=easy&type=multiple"
  );
  const data = await res.json();
  return data.results;
};

let noOfQuestions = parseInt(localStorage.getItem("noOfQuestions") || 0);
let qeustionNo = parseInt(localStorage.getItem("currentQuestion")) || 0;
let correctAnswer = parseInt(localStorage.getItem("correctAnswer")) || 0;
let quizData = JSON.parse(localStorage.getItem("quizData")) || null;

const questionBox = document.querySelector(".question-box");
const answerList = document.querySelector(".answer-list");
const nextButton = document.querySelector(".next-btn");
const currentQuestionNo = document.querySelector(".current-question");
const totalQuestions = document.querySelector(".total-question");

// For timer
const second = document.querySelector(".second");
const mainContainer = document.querySelector(".main");
const timerBox = document.querySelector(".timer");
let t; //id of setTimeInterval
const totalTimeInSec = 30;

let canAnswer = true; // Flag to control if user can choose an option

// Get quiz data
if (quizData) {
  setup();
} else {
  getData().then((result) => {
    quizData = result;
    setup();
    localStorage.setItem("quizData", JSON.stringify(result));
  });
}

function setup() {
  setQuestion(qeustionNo);
  totalQuestions.innerHTML = quizData.length;
}

// Timer
function timer() {
  let sec = totalTimeInSec;

  // Reset background, button color
  mainContainer.style.backgroundColor = "#cce2c2";
  timerBox.style.backgroundColor = "#35bd3a";

  t = setInterval(() => {
    // Check if time is over
    if (sec == 0) {
      clearInterval(t);
      showCorrectAnswer();

      nextButton.classList.add("show");
      mainContainer.style.backgroundColor = "#cce2c2";
    } else {
      // Check if 50% time is left
      if (totalTimeInSec / 2 == sec) {
        mainContainer.style.backgroundColor = "#fa7f7f";
        timerBox.style.backgroundColor = "#ed3232";
      }
      sec--;
      second.innerHTML = sec.toString().length < 2 ? "0" + sec : sec;
    }
  }, 1000);
}

// Next Button functionality
nextButton.addEventListener("click", () => {
  qeustionNo = qeustionNo + 1;
  localStorage.setItem("currentQuestion", qeustionNo);
  clearTimeout(t);

  // Check if all questions are finished
  if (qeustionNo === quizData.length) {
    // Move to result page

    window.location.href = "/result.html";
  } else {
    setQuestion(qeustionNo);

    nextButton.classList.remove("show");
  }
});

// Question setup
function setQuestion(qeustionNo) {
  // Suffling the answers
  const answers = [
    quizData[qeustionNo].correct_answer,
    ...quizData[qeustionNo].incorrect_answers,
  ].sort();

  const question = quizData[qeustionNo].question;

  showInUI(question, answers);

  // User can choose option
  canAnswer = true; // Flag to control if user can choose an option

  // Start timer
  timer();
}

// Show in UI
function showInUI(question, answers) {
  // Set current question No
  currentQuestionNo.innerHTML = qeustionNo + 1;

  // Set question
  questionBox.innerHTML = question;

  // Set answers
  let answersHTML = ``;
  for (let i = 0; i < answers.length; i++) {
    answersHTML += `<Li>${answers[i]}</Li>`;
  }

  answerList.innerHTML = answersHTML;
}

// Check chosen answer is correct or not
answerList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI" && canAnswer) {
    // If the answer is correct or not
    if (e.target.innerHTML === quizData[qeustionNo].correct_answer) {
      e.target.classList.add("correct");

      // Set total correct answer
      correctAnswer = correctAnswer + 1;
      localStorage.setItem("correctAnswer", correctAnswer);
    } else {
      e.target.classList.add("wrong");

      // Show correct answer
      showCorrectAnswer();
    }

    nextButton.classList.add("show");

    // desible other clicks
    canAnswer = false;
  }
});

function showCorrectAnswer() {
  answerList.childNodes.forEach((elem) => {
    if (elem.innerHTML === quizData[qeustionNo].correct_answer) {
      elem.classList.add("correct");
    }
  });
}
