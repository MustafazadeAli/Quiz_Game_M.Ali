let game_page = document.querySelector(".game_page");
let progressValue = 0;
let randomIndex = 0;
let clickEnabled = true;

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: ["<js>", "<script>", "<javascript>"],
    trueAnswer: "b",
  },

  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: [
      "The <head> section",
      "The <body> section",
      "Both the <head> section and the <body> section are correct",
    ],
    trueAnswer: "b",
  },

  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: ["<js>", "<script>", "<javascript>"],
    trueAnswer: "b",
  },
  {
    question: "In what year was JavaScript created ? ",
    answers: ["<1995>", "<1992>", "<2000>"],
    trueAnswer: "a",
  },
];

class QuizGame {
  constructor() {
    console.log("salam");
  }
  getRandomQuestion() {
    randomIndex = Math.floor(Math.random() * questions.length);
  }
}

let newGame = new QuizGame();
document.querySelector(".startButton").addEventListener("click", (e) => {
  document.querySelector(".firstPage").classList.add("hide");
  document.querySelector(".gamePage").classList.add("show");
});
document.querySelector(".exitButton").addEventListener("click", (e) => {
  window.close();
});
