const quizQuestions = document.querySelector(".quiz-questions");
const quizNavigation = document.querySelector(".quiz-navigation");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const submitBtn = document.querySelector(".submit-btn");
const timer = document.querySelector(".timer");
let questionsHtml = [];
let selectedAnswers = [];
let allInputs;
let currentQuestion = 0;
let total = 0;
let time = 1800;
let answers;

const data = sessionStorage.getItem("quizData");

const quizDatas = JSON.parse(data);

// const quizDatas = [
//     {
//         question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, saepe.',
//         options: ['Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//              'Dolor magni perferendis nesciunt possimus nostrum iusto dolores,',
//              'jjjwsiddjdifi0eoeldodldldldododd neque non atque.']
//     },
//     {
//         question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, saepe.',
//         options: ['Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//              'Dolor magni perferendis nesciunt possimus nostrum iusto dolores,',
//              'jjjwsiddjdifi0eoeldodldldldododd neque non atque.']
//     },
//     {
//         question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, saepe.',
//         options: ['Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//              'Dolor magni perferendis nesciunt possimus nostrum iusto dolores,',
//              'jjjwsiddjdifi0eoeldodldldldododd neque non atque.']
//     },
//     {
//         question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, saepe.',
//         options: ['Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//              'Dolor magni perferendis nesciunt possimus nostrum iusto dolores,',
//              'jjjwsiddjdifi0eoeldodldldldododd neque non atque.']
//     },
//     {
//         question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, saepe.',
//         options: ['Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//              'Dolor magni perferendis nesciunt possimus nostrum iusto dolores,',
//              'jjjwsiddjdifi0eoeldodldldldododd neque non atque.']
//     },
//     {
//         question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, saepe.',
//         options: ['Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//              'Dolor magni perferendis nesciunt possimus nostrum iusto dolores,',
//              'jjjwsiddjdifi0eoeldodldldldododd neque non atque.']
//     },
//     {
//         question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, saepe.',
//         options: ['Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//              'Dolor magni perferendis nesciunt possimus nostrum iusto dolores,',
//              'jjjwsiddjdifi0eoeldodldldldododd neque non atque.']
//     }
// ]
// let answers = ['C. 1960', 'A. Aang', 'A. Max Essien', 'A. Aang',
//                 'A. Max Essien', 'A. Aang', 'A. Max Essien', 'A. Aang',
//                 'A. Max Essien']

loadNavigation();
const navBoxes = document.querySelectorAll(".boxes");

function runTimer() {
  const intervalId = setInterval(() => {
    time--;
    let seconds = time % 60;
    let minute = Math.floor(time / 60);
    timer.textContent = `${minute.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    if (time === 0) {
      clearInterval(intervalId);
      fetch(
        "https://raw.githubusercontent.com/Maxessien/Test-API-Fetch-/main/answer.json"
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          answers = data;
          displayResults();
        });
    }
  }, 1000);
}

function loadQuestions() {
  if (currentQuestion === quizDatas.length - 1) {
    elementDisplay([
      { target: nextBtn, action: "remove" },
      { target: submitBtn, action: "add" },
    ]);
  } else if (currentQuestion < quizDatas.length - 1) {
    elementDisplay([
      { target: nextBtn, action: "add" },
      { target: submitBtn, action: "remove" },
    ]);
  }
  if (currentQuestion === 0) {
    elementDisplay([{ target: prevBtn, action: "remove" }]);
  } else if (currentQuestion > 0) {
    elementDisplay([{ target: prevBtn, action: "add" }]);
  }
  quizQuestions.innerHTML = questionsHtml[currentQuestion];
  displayCurrentQuestion();
  enableInputSelection();
}

function createQuestions() {
  quizDatas.forEach((quizData, index) => {
    selectedAnswers[index] = "No answer";
    questionsHtml.push(
      `<div class="question">
                ${quizData.question}
            </div>
            <ul class="options">
                ${quizData.options
                  .map((element, i) => {
                    return `<li class="options-list">
                                    <input type="radio" class="no-display current-inputs" value="${element}" name="question${
                      currentQuestion + 1
                    }options" id="opt${i + 1}">
                                    <label for="opt${i + 1}">${element}</label>
                                </li>`;
                  })
                  .join("")}
            </ul>`
    );
  });
  console.log(selectedAnswers);
}

function elementDisplay(arr) {
  arr.forEach((element) => {
    const target = element.target;
    const action = element.action;
    if (action === "add") {
      target.classList.remove("no-display");
    } else if (action === "remove") {
      target.classList.add("no-display");
    } else {
      console.error(`${action} is not a valid action`);
    }
  });
}

function selectedOption() {
  let optionSelected = false;
  const currentInputs = document.querySelectorAll(".current-inputs");
  currentInputs.forEach((input) => {
    if (
      document
        .querySelector(`label[for="${input.id}"]`)
        .classList.contains("selected")
    ) {
      selectedAnswers[currentQuestion] = input.value;
      optionSelected = true;
    }
  });
  if (!optionSelected) {
    selectedAnswers[currentQuestion] = "No answer";
  }
  updateQuizNavigation(optionSelected);
  console.log(selectedAnswers);
}

function nextQuestion() {
  questionsHtml[currentQuestion] = quizQuestions.innerHTML;
  currentQuestion++;
  loadQuestions();
}

function previousQuestion() {
  questionsHtml[currentQuestion] = quizQuestions.innerHTML;
  currentQuestion--;
  loadQuestions();
}

function enableInputSelection() {
  allInputs = document.querySelectorAll("input");
  allInputs.forEach((input) => {
    input.addEventListener("change", () => {
      console.log("chosen");
      allInputs.forEach((inputs) => {
        document
          .querySelector(`label[for="${inputs.id}"]`)
          .classList.remove("selected");
      });
      if (input.checked) {
        document
          .querySelector(`label[for="${input.id}"]`)
          .classList.add("selected");
        selectedOption();
      }
    });
  });
}

function loadNavigation() {
  quizNavigation.innerHTML = quizDatas
    .map((quizData, index) => {
      return `<div class="boxes">${index + 1}</div>`;
    })
    .join("");
}

function updateQuizNavigation(bool) {
  if (bool) {
    navBoxes[currentQuestion].classList.add("answered");
  }
}

function skipToQuestion(number) {
  currentQuestion = number;
  loadQuestions();
}

function displayResults() {
  total = 0;
  answers.forEach((ans, index) => {
    if (ans.trim() === selectedAnswers[index].trim()) {
      total++;
    }
  });
  sessionStorage.setItem("score", total);
  sessionStorage.setItem("length", answers.length);
  sessionStorage.setItem("answersArr", JSON.stringify(answers));
  sessionStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
  window.location.replace("results.html");
}

submitBtn.addEventListener("click", () => {
  fetch(
    "https://raw.githubusercontent.com/Maxessien/Test-API-Fetch-/main/answer.json"
  )
    .then((res) => {
      return res.json();
    })
    .then((ansData) => {
      answers = ansData;
      displayResults();
    });
});
createQuestions();
loadQuestions();
runTimer();
nextBtn.addEventListener("click", nextQuestion);
prevBtn.addEventListener("click", previousQuestion);

function displayCurrentQuestion() {
  navBoxes.forEach((navBox) => {
    navBox.classList.remove("current");
  });
  navBoxes[currentQuestion].classList.add("current");
  console.log(navBoxes[currentQuestion]);
}

navBoxes.forEach((navBox, index) => {
  navBox.addEventListener("click", () => {
    skipToQuestion(index);
  });
});
