const getData = async () => {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=3&category=18&difficulty=easy&type=multiple"
  );
  const data = await res.json();
  return data.results;
};

let qeustionNo = parseInt(localStorage.getItem("currentQuestion")) || 0;
let correctAnswer = parseInt(localStorage.getItem("correctAnswer")) || 0;
let quizData = null;

const questionBox = document.querySelector(".question-box");
const answerList = document.querySelector(".answer-list");
const nextButton = document.querySelector(".next-btn");
const currentQuestionNo = document.querySelector(".current-question");
const totalQuestions = document.querySelector(".total-question");
const score = document.querySelector(".score");

getData().then((result) => {
  quizData = result;
  setQuestion(qeustionNo);

  totalQuestions.innerHTML = quizData.length;
});

// Next Button functionality
nextButton.addEventListener("click", () => {
  qeustionNo = qeustionNo + 1;

  // Check if all question is finished
  if (qeustionNo === quizData.length) {
    handleFinishQuiz();
  } else {
    localStorage.setItem("currentQuestion", qeustionNo);
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
  if (e.target.tagName === "LI") {
    // If the answer is correct or not
    if (e.target.innerHTML === quizData[qeustionNo].correct_answer) {
      e.target.classList.add("correct");

      // Set total correct answer
      correctAnswer = correctAnswer + 1;
      localStorage.setItem("correctAnswer", correctAnswer);
    } else {
      e.target.classList.add("wrong");

      // Show correct answer
      answerList.childNodes.forEach((elem) => {
        if (elem.innerHTML === quizData[qeustionNo].correct_answer) {
          elem.classList.add("correct");
        }
      });
    }

    nextButton.classList.add("show");
  }
});

// Handle finished game
function handleFinishQuiz() {
  window.location.href = "/result.html";

  // Separation req..
  console.log(score);
  score.innerHTML = parseInt(localStorage.getItem("correctAnswer"));

  localStorage.setItem("currentQuestion", 0);
  localStorage.setItem("correctAnswer", 0);
}
