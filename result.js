const score = sessionStorage.getItem("score");
const length = sessionStorage.getItem("length");
const answers = sessionStorage.getItem("answersArr");
const selectedAnswers = sessionStorage.getItem("selectedAnswers");
const scoresList = document.querySelector(".scores-list");
const totalScorePara = document.querySelector(".total-score");
const perDisplay = document.querySelector(".percentage");
const parsedAnswers = JSON.parse(answers);
const parsedSelectedAnswers = JSON.parse(selectedAnswers);

scoresList.innerHTML = "";

parsedAnswers.forEach((parsedAnswer, index) => {
  if (parsedAnswer === parsedSelectedAnswers[index]) {
    scoresList.innerHTML += `<li class="scores-list-items">
                                    ${index + 1}. ✅ Correct - ${
      parsedSelectedAnswers[index]
    }
                                </li>`;
  } else {
    scoresList.innerHTML += `<li class="scores-list-items">
                                    ${index + 1}. ❌ Wrong - ${
      parsedSelectedAnswers[index]
    }
                                </li>`;
  }
});
totalScorePara.textContent = `total: ${score} / ${length}`;
perDisplay.textContent = `score: ${((score / length) * 100).toFixed(2)}%`;
