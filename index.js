const highestScore = document.querySelector(".highest-score");
const totalQuestions = document.querySelector(".total-question");
const bestScoreText = document.querySelector(".best-score");

// Get best score
const score = localStorage.getItem("highestScore");
const highestScoreTotalQuestions = localStorage.getItem(
  "highestScoreTotalQuestions"
);

// If previous (best) score exists
if (score) {
  bestScoreText.innerHTML = `Highest score: ${score}/${highestScoreTotalQuestions} `;
}
