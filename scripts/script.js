$(document).ready(function () {
  updateBoard();
  document.getElementById("name").firstChild.nodeValue = `${playerName}: `;
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

  if (computerMove === "rock") {
    if (playerMove === "rock") result = "TIE";
    else if (playerMove === "paper") result = "WIN";
    else if (playerMove === "scissors") result = "LOSS";
  } else if (computerMove === "paper") {
    if (playerMove === "rock") result = "LOSS";
    else if (playerMove === "paper") result = "TIE";
    else if (playerMove === "scissors") result = "WIN";
  } else if (computerMove === "scissors") {
    if (playerMove === "rock") result = "WIN";
    else if (playerMove === "paper") result = "LOSS";
    else if (playerMove === "scissors") result = "TIE";
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

  document.getElementById("player").innerHTML = `${playerMove.toUpperCase()}`;
  document.getElementById("cpu").innerHTML = `${computerMove.toUpperCase()}`;
  document.getElementById("result").innerHTML = `${result.toUpperCase()}`;
}

function resetScore() {
  document.getElementById("player").innerHTML = "";
  document.getElementById("cpu").innerHTML = "";
  document.getElementById("result").innerHTML = "";

  scores.reset();
  updateBoard();
  localStorage.removeItem("scores");
}
