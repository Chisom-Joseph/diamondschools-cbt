const answers = localStorage.getItem("answers")
  ? JSON.parse(localStorage.getItem("answers"))
  : [];
let totalSeconds = localStorage.getItem("totalSeconds") || 1 * 60;
const timerElement = document.getElementById("quizTimer");
let quizActive = false;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

function updateTimer() {
  timerElement.textContent = formatTime(totalSeconds);

  if (totalSeconds <= 59) {
    timerElement.style.color = "#e63946";
    timerElement.style.borderColor = "#e63946";
  }

  if (totalSeconds > 0) {
    quizActive = true;
    totalSeconds--;
    localStorage.setItem("totalSeconds", totalSeconds);
    setTimeout(updateTimer, 1000);
  } else {
    quizActive = false;
    timerElement.textContent = "Time's up!";
    localStorage.clear("answers");
    localStorage.clear("totalSeconds");
    finishAttempt();
  }
}

updateTimer();

// Scroll observer
const quizQuestions = document.querySelectorAll(".quizQuestion");
const questionNumbers = document.querySelectorAll(".questionNumber");

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 1,
};

const scrollObserverCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      questionNumbers.forEach((questionNumber) => {
        questionNumber.classList.remove("activeQuestion");
        if (questionNumber.classList.contains(entry.target.id)) {
          questionNumber.classList.add("activeQuestion");
        }
      });
    } else {
    }
  });
};

quizQuestions.forEach((quizQuestion) => {
  const observer = new IntersectionObserver(
    scrollObserverCallback,
    observerOptions
  );
  observer.observe(quizQuestion);
});

// Add answer
const addAnswer = (optionId, questionId) => {
  const existingAnswerIndex = answers.findIndex(
    (answer) => answer.questionId === questionId
  );

  if (existingAnswerIndex !== -1) {
    answers[existingAnswerIndex].optionId = optionId;
    return localStorage.setItem("answers", JSON.stringify(answers));
  }

  answers.push({ optionId, questionId });

  localStorage.setItem("answers", JSON.stringify(answers));

  setAnswerdQuestionNumber(questionId, true);

  console.log(answers);
};

// Clear answer
const clearAnswer = (questionId) => {
  // Remove answer
  answers.forEach((answer) => {
    if (answer.questionId === questionId) {
      answers.splice(answers.indexOf(answer), 1);
    }
  });

  // Uncheck all inputs
  document.querySelectorAll(`input[name="${questionId}"]`).forEach((input) => {
    input.checked = false;
  });

  localStorage.setItem("answers", JSON.stringify(answers));

  setAnswerdQuestionNumber(questionId, false);
};

// Finish attempt
const finishAttemptAlert = document.querySelector(".finishAttemptAlert");

document.querySelector("#finishAttemptButton").addEventListener("click", () => {
  if (quizActive) {
    // Alert user to be sure
    showFullscreenAlert({
      title: "End exam",
      message:
        "Are you sure you want to end your exam? Your answers will be saved",
      type: "warning",
      button: `<button onclick="finishAttempt()" class="border-2 border-gray-700 px-4 py-2 dark:text-white rounded dark:hover:bg-gray-900 hover:bg-gray-700">Hello click me</button>`,
    });
  } else {
    finishAttempt();
  }
});

const finishAttempt = () => {
  totalSeconds = 0;

  fetch("/finishAttempt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Alert user to be sure
  console.log("Attempt Finished");
};

const setAnswerdQuestionNumber = (questionId, add = true) => {
  document.querySelectorAll(".questionNumber").forEach((questionNumber) => {
    // questionNumber.classList.remove("answeredQuestion");
    if (questionNumber.classList.contains(questionId)) {
      if (add) {
        questionNumber.classList.add("answeredQuestion");
      } else {
        questionNumber.classList.remove("answeredQuestion");
      }
    }
  });
};

// Remember current state
const populateAnswers = () => {
  if (localStorage.getItem("answers")) {
    answers.forEach((answer) => {
      setAnswerdQuestionNumber(answer.questionId, true);

      // reselect options
      document.querySelector(`#${answer.optionId}`).checked = true;
    });
  }
};
populateAnswers();
