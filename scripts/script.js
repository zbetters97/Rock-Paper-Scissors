$(document).ready(() => {
  updateBoard();
  document.getElementById("name").firstChild.nodeValue = `${playerName}: `;

  document.body.addEventListener("keydown", (e) => {
    if (e.key === "r") playGame("rock");
    else if (e.key === "p") playGame("paper");
    else if (e.key === "s") playGame("scissors");
  });

  document
    .querySelector(".rock-btn")
    .addEventListener("click", () => playGame("rock"));
  document
    .querySelector(".paper-btn")
    .addEventListener("click", () => playGame("paper"));
  $(".scissors-btn").on("click", () => playGame("scissors"));
});

let playerName = localStorage.getItem("name") || "You";
let scores = JSON.parse(localStorage.getItem("scores")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
scores.reset = function () {
  this.wins = 0;
  this.losses = 0;
  this.ties = 0;
};

const rock = '<i class="fa-solid fa-hand-fist"></i>';
const paper = '<i class="fa-solid fa-hand"></i>';
const scissors = '<i class="fa-solid fa-hand-scissors"></i>';

let isAutoPlaying = false;
let autoGame = null;

function changeName() {
  const inputField = document.querySelector("#input-name");

  if (inputField.value) {
    playerName = inputField.value;
    inputField.value = "";
    document.getElementById("name").firstChild.nodeValue = `${playerName}: `;

    localStorage.setItem("name", playerName);
  }
}

function updateBoard() {
  document.getElementById("wins").innerHTML = scores.wins || 0;
  document.getElementById("losses").innerHTML = scores.losses || 0;
  document.getElementById("ties").innerHTML = scores.ties || 0;
}

function playGame(playerMove) {
  const computerMove = getCPUMove();
  let result = "";

  switch (computerMove) {
    case "rock":
      if (playerMove === "rock") result = "TIE";
      else if (playerMove === "paper") result = "WIN";
      else if (playerMove === "scissors") result = "LOSS";
      break;
    case "paper":
      if (playerMove === "rock") result = "LOSS";
      else if (playerMove === "paper") result = "TIE";
      else if (playerMove === "scissors") result = "WIN";
      break;
    case "scissors":
      if (playerMove === "rock") result = "WIN";
      else if (playerMove === "paper") result = "LOSS";
      else if (playerMove === "scissors") result = "TIE";
      break;
  }

  getResult(playerMove, computerMove, result);
}

function getCPUMove() {
  const ranNum = Math.random();
  if (ranNum < 0.33) {
    computerMove = "rock";
  } else if (0.33 < ranNum && ranNum < 0.66) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }

  return computerMove;
}

function getResult(playerMove, computerMove, result) {
  if (result === "WIN") {
    scores.wins++;
  } else if (result === "LOSS") {
    scores.losses++;
  } else if (result === "TIE") {
    scores.ties++;
  }

  updateBoard();
  localStorage.setItem("scores", JSON.stringify(scores));

  playerMove = getHandIcon(playerMove);
  computerMove = getHandIcon(computerMove);

  document.getElementById("player").innerHTML = `${playerMove}`;
  document.getElementById("cpu").innerHTML = `${computerMove}`;
  document.getElementById("result").innerHTML = `${result}`;
}

function getHandIcon(move) {
  switch (move) {
    case "rock":
      move = rock;
      break;
    case "paper":
      move = paper;
      break;
    case "scissors":
      move = scissors;
      break;
  }

  return move;
}

function resetScore() {
  document.getElementById("player").innerHTML = "";
  document.getElementById("cpu").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.querySelector(".auto-btn").innerHTML = "Auto Play";

  scores.reset();
  updateBoard();
  clearInterval(autoGame);
  isAutoPlaying = false;

  localStorage.removeItem("scores");
}

function autoPlay() {
  const autoBtn = document.querySelector(".auto-btn");

  if (!isAutoPlaying) {
    autoGame = setInterval(() => {
      playGame(getCPUMove());
    }, 1000);
    autoBtn.innerHTML = "Stop";
    isAutoPlaying = true;
  } else {
    clearInterval(autoGame);
    autoBtn.innerHTML = "Auto Play";
    isAutoPlaying = false;
  }
}
