const pages = [...document.querySelectorAll(".page")];
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");

let currentQuestion = 0;
let musicStarted = false;

// PAGE NAVIGATION
function showPage(id) {
  pages.forEach(page => page.classList.remove("active"));

  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (id === "finale") {
    heartBurst(35);
  }
}

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.next);
  });
});

document.querySelectorAll("[data-go]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    showPage(link.dataset.go);
  });
});

// BACKGROUND MUSIC
if (music) {
  music.loop = true;
  music.volume = 0.65;
  music.preload = "auto";
}

async function startMusic() {
  if (!music) return false;

  try {
    await music.play();
    musicStarted = true;

    if (musicLabel) {
      musicLabel.textContent = "Pause tune";
    }

    return true;
  } catch (error) {
    console.log("Music could not start:", error);

    if (musicLabel) {
      musicLabel.textContent = "Play tune";
    }

    return false;
  }
}

// Try autoplay when the page loads.
// Mobile browsers may block autoplay until the user taps.
window.addEventListener("load", () => {
  startMusic();
});

// Welcome button: start music and open the next page.
const startBtn = document.getElementById("startBtn");

if (startBtn) {
  startBtn.addEventListener("click", async () => {
    await startMusic();
    showPage("letters");
  });
}

// Music control button
if (musicToggle && music) {
  musicToggle.addEventListener("click", async () => {
    if (music.paused) {
      await startMusic();
    } else {
      music.pause();
    }
  });
}

if (music) {
  music.addEventListener("play", () => {
    musicStarted = true;

    if (musicLabel) {
      musicLabel.textContent = "Pause tune";
    }
  });

  music.addEventListener("pause", () => {
    if (musicLabel) {
      musicLabel.textContent = "Play tune";
    }
  });

  music.addEventListener("error", () => {
    console.log(
      "Audio error: check the MP3 filename and folder."
    );

    if (musicLabel) {
      musicLabel.textContent = "Play tune";
    }
  });
}

// FLOATING HEARTS
const heartContainer = document.getElementById("ambientHearts");

function createFloatingHeart() {
  if (!heartContainer) return;

  const heart = document.createElement("span");
  heart.className = "ambient-heart";
  heart.textContent = Math.random() > 0.45 ? "♡" : "♥";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (12 + Math.random() * 18) + "px";
  heart.style.animationDuration =
    (8 + Math.random() * 8) + "s";

  heartContainer.appendChild(heart);

  heart.addEventListener("animationend", () => {
    heart.remove();
  });
}

setInterval(createFloatingHeart, 1300);

// HEART BURST
function heartBurst(amount = 20) {
  const symbols = ["♡", "♥", "✦", "✨"];

  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");

    heart.className = "burst-heart";
    heart.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = (10 + Math.random() * 80) + "vw";
    heart.style.top = (35 + Math.random() * 50) + "vh";
    heart.style.fontSize = (15 + Math.random() * 25) + "px";
    heart.style.color =
      Math.random() > 0.5 ? "#d987a5" : "#f1b9cd";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1900);
  }
}

// BIRTHDAY CAKE WISH
const blowBtn = document.getElementById("blowBtn");

if (blowBtn) {
  blowBtn.addEventListener("click", () => {
    const flame = document.getElementById("flame");
    const wishFeedback = document.getElementById("wishFeedback");

    if (flame) flame.textContent = "♡";

    if (wishFeedback) {
      wishFeedback.textContent =
        "May your sweetest wishes find their way to you. ♡";
    }

    blowBtn.textContent = "Wish made! ✨";
    blowBtn.disabled = true;

    heartBurst(28);
  });
}

// YES / NO QUESTIONS
const questions = [
  {
    q: "Ready to be today's birthday princess?",
    hint: "A little crown looks good on you. 🎀",
    yes: "Princess mode: ACTIVATED! 👑",
    cat: "🐱👑🐱"
  },
  {
    q: "Do you deserve extra happiness this year?",
    hint: "Hint: the answer is whatever you truly feel. ♡",
    yes: "Wishing you so many happy moments! ✨",
    cat: "🐱💕🐱"
  },
  {
    q: "Would you accept a virtual teddy hug?",
    hint: "Sending one from our tiny cat kingdom.",
    yes: "Incoming teddy hug! 🧸",
    cat: "🧸🤍🧸"
  },
  {
    q: "Should we keep making cute memories?",
    hint: "One little moment at a time. ♡",
    yes: "Here's to more lovely memories! 🎀",
    cat: "🐱📸🐱"
  },
  {
    q: "Can we agree that cats are adorable?",
    hint: "Tiny paws, giant personalities.",
    yes: "Meow-tastic choice! 🐈",
    cat: "🐈🐾🐈"
  },
  {
    q: "Would you like a day full of smiles?",
    hint: "You deserve joy in your own special way.",
    yes: "Sending you a pocketful of smiles. 🌸",
    cat: "🐱🌷🐱"
  },
  {
    q: "Can your dreams have a beautiful year too?",
    hint: "Keep believing in what matters to you.",
    yes: "Rooting for every dream you chase! ✨",
    cat: "🐱⭐🐱"
  },
  {
    q: "Would you save this little birthday surprise?",
    hint: "A tiny page made just for you.",
    yes: "This little corner is yours. ♡",
    cat: "🐱💌🐱"
  },
  {
    q: "Ready for one final surprise?",
    hint: "It's almost time for the last page...",
    yes: "A little more magic is coming! 🎁",
    cat: "🐱🎀🐱"
  },
  {
    q: "Shall we open the final page together?",
    hint: "One last tap to reach the finale. ♡",
    yes: "Let's go, birthday girl! 💗",
    cat: "🐱💞🐱"
  }
];

const questionText = document.getElementById("questionText");
const questionHint = document.getElementById("questionHint");
const questionCount = document.getElementById("questionCount");
const quizCat = document.getElementById("quizCat");
const progressBar = document.getElementById("progressBar");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const answerZone = document.getElementById("answerZone");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");

function renderQuestion() {
  const item = questions[currentQuestion];

  if (
    !questionText ||
    !questionHint ||
    !questionCount ||
    !quizCat ||
    !progressBar ||
    !yesBtn ||
    !noBtn ||
    !answerZone ||
    !quizFeedback ||
    !nextQuestion
  ) {
    return;
  }

  questionText.textContent = item.q;
  questionHint.textContent = item.hint;
  quizCat.textContent = item.cat;

  questionCount.textContent =
    String(currentQuestion + 1).padStart(2, "0") + " / 10";

  progressBar.style.width =
    ((currentQuestion + 1) / questions.length * 100) + "%";

  quizFeedback.textContent = "";
  nextQuestion.classList.add("hidden");
  yesBtn.classList.remove("hidden");
  noBtn.classList.remove("hidden");

  yesBtn.disabled = false;
  yesBtn.textContent = "YES ♡";
  noBtn.textContent = "NO 🙈";

  // Reset NO button position for every question.
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
  noBtn.style.transform = "";
}

function moveNoButton() {
  if (!noBtn || !answerZone) return;

  noBtn.style.position = "absolute";

  const zone = answerZone.getBoundingClientRect();
  const button = noBtn.getBoundingClientRect();

  const maxX = Math.max(0, zone.width - button.width);
  const maxY = Math.max(0, zone.height - button.height);

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
}

if (noBtn) {
  noBtn.addEventListener("pointerenter", moveNoButton);

  noBtn.addEventListener("click", event => {
    event.preventDefault();
    moveNoButton();
  });

  noBtn.addEventListener("touchstart", moveNoButton, {
    passive: true
  });
}

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    const item = questions[currentQuestion];

    quizFeedback.textContent = item.yes;
    yesBtn.disabled = true;
    yesBtn.textContent = "YES! ♡";
    noBtn.classList.add("hidden");

    heartBurst(12);

    nextQuestion.textContent =
      currentQuestion === questions.length - 1
        ? "Open your final surprise ♡"
        : "Next question →";

    nextQuestion.classList.remove("hidden");
  });
}

if (nextQuestion) {
  nextQuestion.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      showPage("finale");
      heartBurst(45);
    }
  });
}

// RESTART THE EXPERIENCE
const restartBtn = document.getElementById("restartBtn");

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    renderQuestion();
    showPage("welcome");
  });
}

// INITIAL QUESTION SETUP
renderQuestion();