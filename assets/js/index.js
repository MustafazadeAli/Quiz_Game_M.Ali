let gamePage = document.querySelector(".gamePage");
let progressValue = 0;
let randomIndex = 0;
let clickEnabled = true;
let counter = 1;
const keyToastEl = document.getElementById("keyToast");
const keyToast = new bootstrap.Toast(keyToastEl, {
  autohide: true,
  delay: 10000,
});
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
    answers: ["js", "script", "javascript"],
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
    this.showQuestion();
  }
  showQuestion() {
questionSection.innerHTML = `
    <div>
     <div class="container">
        <div>
          <div class="progressBarContainer">
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                aria-label="Example with label"
                style="width:" + ${progressValue} "%"
                aria-valuenow="${progressValue}"
                aria-valuemin="0"
                aria-valuemax="100"
              >
               ${progressValue === 0 ? "" : progressValue}
              </div>
            </div>
          </div>
          <div class="questionSection">
            <div>
              <div class="title">Question ${counter}</div>
              <div class="desc "> ${questions[randomIndex].question}
              </div>
            </div>
          </div>
          <div class="row answerSection">
            <div class="col-12">
              <div>A)</div>
              <div id="a" >${questions[randomIndex].answers[0]}</div>
            </div>
            <div class="col-12">
              <div>B)</div>
              <div id="b">${questions[randomIndex].answers[1]}</div>
            </div>
            <div class="col-12">
              <div>C)</div>
              <div id="c">${questions[randomIndex].answers[2]}</div>
            </div>
          </div>
        </div>
      </div>
    
    
    `;


    gamePage.appendChild(gamePage_container);
  }
}
   
nextQuestion() {
  if (questions.length === 1) {
    document.querySelector(".result_page").classList.add("show");
    document.querySelector(".game_page").classList.remove("show");
    window.removeEventListener("keydown", a);
    
    setTimeout(() => {
      document.querySelector(".result_page").classList.remove("show");
      document.querySelector(".initial_page").classList.remove("hide");
      window.location.reload();
    }, 5000);
  } else {
    questions.splice(randomIndex, 1);
    this.getRandomQuestion();
  }
}


let newGame = new QuizGame();

window.addEventListener(
  "keydown",
  (a = (e) => {
    if (clickEnabled) {
      if (e.key === "a" || e.key === "b" || e.key === "c") {
        clickEnabled = false;
        if (e.key === questions[randomIndex].trueAnswer) {
          let progress_bar = document.querySelector(".progress-bar");
          let faiz = progressValue + Math.floor(100 / questions.length);
          progress_bar.style.width = faiz + "%";
          progress_bar.textContent = faiz + "%"; 
          document.querySelector("#" + e.key).style.backgroundColor = "#163d08";
          document.querySelector("#" + e.key).style.color = "white";
        } else {
          document.querySelector("#" + e.key).style.backgroundColor = "#8f1919";
          document.querySelector("#" + e.key).style.color = "white";
        }

        setTimeout(() => {
          newGame.nextQuestion();
          clickEnabled = true;
        }, 1000);
      } else {
        if (!keyToastEl.classList.contains("show")) {
          keyToast.show();
        }
      }
    } else {
      console.log("Warning !");
    }
  }),
);

document.querySelector(".startButton").addEventListener("click", () => {
  document.querySelector(".firstPage").classList.add("hide");
  document.querySelector(".gamePage").classList.add("show");
  newGame.getRandomQuestion();
});
document.querySelector(".exitButton").addEventListener("click", () => {
  window.close();
});
