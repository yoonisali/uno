import './css/styles.css';
import "bootstrap";
import * as $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import Game from './js/game';

const game = new Game();
const playerSpot = $(".bottom");
for (let i = 0; i < Object.values(game.human.hand).length; i++) {
  const nCard = Object.values(game.human.hand)[i];
  nCard.render(true).appendTo(playerSpot);
}

const botSpot = $(".top");
for (let i = 0; i < Object.values(game.bot.hand).length; i++) {
  const nCard = Object.values(game.bot.hand)[i];
  nCard.render(1).appendTo(botSpot);
}

function displayGameCard() {
  const playSpot = $(".game-spot");
  const nCard = game.currentCard;
  const colorSpot = $("#color-space");
  colorSpot.get()[0].style.backgroundColor = nCard.color;
  playSpot.html(nCard.render(2));
}

displayGameCard();

$(".player-card").on("click", (c) => {
  const elId = c.currentTarget.getAttribute("id").replace("card-", "");
  handlePlay(elId);
});

$("#deck-btn").on("click", (c) => {
  if (game.canDraw) {
    game.canDraw = false;
    setTimeout(() => {
      if (c.currentTarget.classList.contains("disabled") === false) {
        console.log("drew a card");
        game.draw();
        game.canDraw = true;
        c.currentTarget.classList.add("disabled");
      }
    }, 500);
  }
});

$("#uno-btn").on("click", (c) => {
  if (c.currentTarget.classList.contains("enabled")) {
    console.log("uno button pressed");
    game.unoButton();
    $("#uno-btn").get()[0].classList.remove("enabled");
  }
});

$("#end-btn").on("click", (c) => {
  if (c.currentTarget.classList.contains("enabled")) {
    console.log("end button pressed");
    game.endButton();
    $("#end-btn").get()[0].classList.remove("enabled");
  }
});

function handlePlay(uid) {
  let valid = game.checkValid(uid);
  if (game.humanTurn === true) {
    if (valid) {
      game.playCard(uid);
      displayGameCard();
      removeCard(uid);
    }
  }
}

function removeCard(uid) {
  const idName = `card-${uid}`;
  $(`#${idName}`).remove();
}

const btnColors = ["green", "red", "yellow", "blue"];
btnColors.forEach((cb) => {
  document.getElementById(`${cb}Button`).addEventListener("click", function() {
    game.closeForm();
  });
});

// document.getElementById("greenButton").addEventListener("submit", game.closeForm);
// document.getElementById("redButton").addEventListener("submit", game.closeForm);
// document.getElementById("yellowButton").addEventListener("submit", game.closeForm);
// document.getElementById("blueButton").addEventListener("submit", game.closeForm)
