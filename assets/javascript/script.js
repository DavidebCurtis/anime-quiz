const startContainer = document.getElementById("start-container");
const startBtn = document.getElementById("btn-start");
const questionsContainer = document.getElementById("questions-container");
const questionEl = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-buttons");
var timerEL = document.getElementById("timer");
var timerContainerEL = document.getElementById("timer-container");
var yourScore = document.getElementById("your-score");
var highScoresPrompt = document.getElementById("highscores-prompt-container");

let shuffledQuestions, currentQuestionIndex;

let count = 40;
// Timer
var timer = function () {
  var counter = setInterval(function () {
    count = count - 1;
    if (count <= 0) {
      clearInterval(counter);
      console.log(count);
      yourScore.innerHTML = 0;
      questionsContainer.style.display = "none";
      timerContainerEL.style.display = "none";
      highScoresPrompt.style.display = "flex";
      return;
    }
    if (shuffledQuestions.length < currentQuestionIndex + 1) {
      yourScore.innerHTML = count + 1;
      clearInterval(counter);
      console.log(count);
      highScoresPrompt.style.display = "flex";
    }

    timerEL.innerHTML = count;
  }, 1000);
};

// start button begins quiz and starts timer
startBtn.addEventListener("click", function () {
  startQuiz();
  timer();
});

// main function
var startQuiz = function () {
  startContainer.style.display = "none";
  questionsContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  displayQuestion();
};

// picks next question randomly and displays it in the element
var displayQuestion = function () {
  reset();
  if (shuffledQuestions.length < currentQuestionIndex + 1) {
    questionsContainer.style.display = "none";
    timerContainerEL.style.display = "none";
    highScoresPrompt.style.display = "flex";
    return;
  }
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  //   showQuestion(questions[0]);
};

// displays questions
function showQuestion(question) {
  questionEl.innerText = question.question;
  // loops through answers and creates button elements for each
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    answerButtonsEl.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
      var dataAttribute = button.getAttribute("data-correct");
      //   console.log(button.innerText + ": " + dataAttribute);
    }
    if (!answer.correct) {
      button.dataset.wrong = answer.correct;
      var wrongDataAttribute = button.getAttribute("data-correct");
      //   console.log(button.innerText + ": " + wrongDataAttribute);
    }
  });
}

// if answer picked show next question
answerButtonsEl.addEventListener("click", function (event) {
  var whatIClicked = event.target;

  if (whatIClicked.dataset.correct) {
    console.log(count + " seconds remaining");
    console.log("hurray!");
    currentQuestionIndex++;
    whatIClicked.classList.add("btn-correct");
    setTimeout(displayQuestion, 800);
  }
  if (whatIClicked.dataset.wrong) {
    count = count - 10;
    console.log(count + " seconds remaining");
    console.log("Booooo you stink");
    currentQuestionIndex++;
    whatIClicked.classList.add("btn-wrong");
    setTimeout(displayQuestion, 800);
  }
});

// removes answer
function reset() {
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild);
  }
}

// questions and answers object
const questions = [
  {
    question: "Bleach: How many Vizards are there?",
    answers: [
      { text: "7", correct: false },
      { text: "8", correct: true },
      { text: "10", correct: false },
      { text: "9", correct: false },
    ],
  },
  {
    question:
      "YuYu Hakusho: What was NOT one of the ways Master Genkai determined the best receipient of her spiritwave technique?",
    answers: [
      { text: "Meditation", correct: true },
      { text: "Rock, Paper, Scissors", correct: false },
      { text: "Fighting", correct: false },
      { text: "Karaoke", correct: false },
    ],
  },
  {
    question:
      "Death Note: What is the minimum age someone has to be to be killed by the death note?",
    answers: [
      { text: "No minimum age", correct: false },
      { text: "780 days old", correct: true },
      { text: "2 years old", correct: false },
      { text: "1 day old", correct: false },
    ],
  },
  {
    question: "Cowboy Bebop: What plant cures Venus sickness?",
    answers: [
      { text: "Windflower", correct: false },
      { text: "Venus Cactus", correct: false },
      { text: "Grey Ash Plant", correct: true },
      { text: "Jupiter Skullcap", correct: false },
    ],
  },
  {
    question: "Demon Slayer: Nezukos powers include",
    answers: [
      { text: "Teleportation", correct: false },
      { text: "Pyrokinesis", correct: true },
      { text: "Invisibility", correct: false },
      { text: "Telekinesis", correct: false },
    ],
  },
  {
    question:
      "JuJutsu kaisen: What ability allows Aoi to switch places with objects that have cursed energy?",
    answers: [
      { text: "Clapback", correct: false },
      { text: "Trading Places", correct: false },
      { text: "Swap", correct: false },
      { text: "Boogie Woogie", correct: true },
    ],
  },
];
