const score = document.querySelector(".score");
const retryButton = document.querySelector(".retry-btn");
const totalQuestions = document.querySelector(".total-question");
const finalText = document.querySelector(".final-text");

const totalScore = parseInt(localStorage.getItem("correctAnswer")) || 0;
const qeustionNo = parseInt(localStorage.getItem("currentQuestion"));

score.innerHTML = totalScore;
totalQuestions.innerHTML = qeustionNo;

// Get best score
const highestScore = localStorage.getItem("highestScore") || 0;
const highestScoreTotalQuestion =
  localStorage.getItem("highestScoreTotalQuestions") || 0;

const scorePercentage = (totalScore / qeustionNo) * 100;
// If new score is better than prevous

// First time
if (highestScore == 0 && highestScoreTotalQuestion == 0) {
  localStorage.setItem("highestScore", totalScore);
  localStorage.setItem("highestScoreTotalQuestions", qeustionNo);
}

// If new score is best
if (scorePercentage > (highestScore / highestScoreTotalQuestion) * 100) {
  localStorage.setItem("highestScore", totalScore);
  localStorage.setItem("highestScoreTotalQuestions", qeustionNo);
}

// Progess bar
const firstScoreBar = document.querySelector(".score-bar-correct");
const secondScoreBar = document.querySelector(".score-bar-wrong");

firstScoreBar.style.width = scorePercentage + "%";
secondScoreBar.style.width = 100 - scorePercentage + "%";

if (scorePercentage > 60) {
  finalText.innerHTML = "Keep learning, you have a good score!";
} else {
  finalText.innerHTML = "Practice More, keep going!";
}

// clearing previous records
localStorage.setItem("currentQuestion", 0);
localStorage.setItem("correctAnswer", 0);
localStorage.removeItem("quizData");

retryButton.addEventListener("click", () => {
  window.location.href = "/quiz.html";
});
