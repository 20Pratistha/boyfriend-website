
const warningScreen = document.getElementById("warning-screen");
const questionScreen = document.getElementById("question-screen");
const endingScreen = document.getElementById("ending-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question");
const description = document.getElementById("description");
const progress = document.getElementById("progress");
const answerButtons = document.getElementById("answer-buttons");
const feedback = document.getElementById("feedback");
const finalMessage = document.getElementById("final-message");

const questions = [
    {
        question: "Do you love your girlfriend? 👀",
        description: "Careful. Your answer will be remembered.",
        answers: ["YES, OBVIOUSLY 💗", "NO"],
        runaway: true,
        feedback: "EXCUSE ME?! Try that again. 😭"
    },
    {
        question: "Who is the cutest person ever?",
        description: "There is only one correct answer.",
        answers: ["My girlfriend 🎀", "Also my girlfriend 💌"],
        feedback: "Correct answer. You may continue. ♡"
    },
    {
        question: "How much do you love her?",
        description: "Be honest, boyfriend.",
        answers: ["A little", "A LOT 💗", "INFINITE ♡"],
        feedback: "Noted. She will be expecting extra hugs."
    },
    {
        question: "Will you keep making memories with her?",
        description: "This question is a little more serious. 💌",
        answers: ["Of course ♡", "I promise 💗"],
        feedback: "Here's to more memories together. 🥹"
    }
];

let currentQuestion = 0;

startBtn.addEventListener("click", function () {
    warningScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
    showQuestion();
});

function showQuestion() {
    const item = questions[currentQuestion];

    progress.textContent =
        "QUESTION " + (currentQuestion + 1) +
        " OF " + questions.length;

    questionText.textContent = item.question;
    description.textContent = item.description;
    feedback.textContent = "";
    answerButtons.innerHTML = "";

    item.answers.forEach(function (answer) {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer-btn");

        if (answer === "NO" && item.runaway) {
            button.id = "no-btn";

            button.addEventListener("mouseenter", runAway);
            button.addEventListener("touchstart", runAway);
            button.addEventListener("click", runAway);
        } else {
            button.addEventListener("click", function () {
                chooseAnswer(answer);
            });
        }

        answerButtons.appendChild(button);
    });
}

function runAway(event) {
    event.preventDefault();

    const noBtn = document.getElementById("no-btn");

    if (!noBtn) return;

    const maxX = Math.max(
        0, window.innerWidth - noBtn.offsetWidth - 20
    );

    const maxY = Math.max(
        0, window.innerHeight - noBtn.offsetHeight - 20
    );

    noBtn.style.position = "fixed";
    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top = Math.random() * maxY + "px";

    feedback.textContent = questions[currentQuestion].feedback;
}

function chooseAnswer(answer) {
    feedback.textContent = questions[currentQuestion].feedback;

    answerButtons.querySelectorAll("button").forEach(function (button) {
        button.disabled = true;
    });

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next question ➜";
    nextBtn.style.marginTop = "15px";

    nextBtn.addEventListener("click", function () {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showEnding();
        }
    });

    answerButtons.appendChild(nextBtn);
}

function showEnding() {
    questionScreen.classList.add("hidden");
    endingScreen.classList.remove("hidden");

    finalMessage.textContent =
        "Surprise, my love! 💗 You are one of my favourite parts of life. " +
        "Thank you for being you. Here's to our little moments, our laughs, " +
        "and all the memories we haven't made yet. I love you. 💌";
}

restartBtn.addEventListener("click", function () {
    currentQuestion = 0;

    endingScreen.classList.add("hidden");
    warningScreen.classList.remove("hidden");
});
