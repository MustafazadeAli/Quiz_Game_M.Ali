let gamePage = document.querySelector(".gamePage");
let questionSection = document.querySelector(".questionSection");
let progressValue = 0;
let randomIndex = 0;
let clickEnabled = true;
let counter = 1;
const keyToastEl = document.getElementById("keyToast");
const result = document.querySelector(".result");
let myQuestionCount = document.querySelector(".questionCount");
const keyToast = new bootstrap.Toast(keyToastEl, {
  autohide: true,
  delay: 10000,
});
let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: ["&lt;js&gt;", "&lt;script&gt;", "&lt;javascript&gt;"],
    trueAnswer: "b",
  },

  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: [
      "The &lt;head&gt; section",
      "The &lt;body&gt; section",
      "Both the  &lt;head&gt; section and the &lt;body&gt; section are correct",
    ],
    trueAnswer: "c",
  },

  {
    question: "In what year was JavaScript created ? ",
    answers: ["&lt;1995&gt;", "&lt;1992&gt;", "&lt;2000&gt;"],
    trueAnswer: "a",
  },
];

let questionCount = questions.length;
let correctAnswer = 0;

class QuizGame {
  constructor() {
    result.innerHTML = localStorage.getItem("my score") || 0;
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
                style="width:${progressValue}%"
                aria-valuenow="${progressValue}"
                aria-valuemin="0"
                aria-valuemax="100"
              >
               ${progressValue === 0 ? "" : Math.floor(progressValue) + "%"}
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
  }

  nextQuestion() {
    counter++;
    if (questions.length === 1) {
      localStorage.setItem(
        "my score",
        Math.floor((correctAnswer / questionCount) * 100),
      );
      myQuestionCount.innerHTML = correctAnswer + " / " + questionCount;
      document.querySelector(".lastPage").classList.add("show");
      document.querySelector(".gamePage").classList.add("hide");
      window.removeEventListener("keydown", a);

      setTimeout(() => {
        window.location.reload();
        document.querySelector(".lastPage").classList.add("hide");
        document.querySelector(".firstPage").classList.add("show");
      }, 5000);
    } else {
      questions.splice(randomIndex, 1);
      this.getRandomQuestion();
    }
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
          correctAnswer = correctAnswer + 1;
          let progress_bar = document.querySelector(".progress-bar");
          let faiz = progressValue + 100 / questionCount;
          // 33...............333333333333333333333
          progress_bar.style.width = faiz + "%";
          progress_bar.textContent = Math.floor(faiz) + "%";
          progressValue = progressValue + 100 / questionCount;
          document.querySelector("#" + e.key).style.backgroundColor = "#163d08";
          document.querySelector("#" + e.key).style.color = "white";
        } else {
          document.querySelector("#" + e.key).style.backgroundColor = "#8f1919";
          document.querySelector("#" + e.key).style.color = "white";
        }

        setTimeout(() => {
          newGame.nextQuestion();
          clickEnabled = true;
        }, 2000);
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
