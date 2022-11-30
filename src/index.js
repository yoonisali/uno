import './css/styles.css';
import "bootstrap";
import * as $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import Game from './js/game';

//Opening Sequence

const game = new Game();
displayOpeningHands();
displayGameCard(); 

//Rendering Function For Start of Game

function displayOpeningHands() {
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
}

//Rendering Function for Current Card (called once at start of game, then after each play. Replaces previous game card each time)

function displayGameCard() {
  const playSpot = $(".game-spot");
  const nCard = game.currentCard;
  const colorSpot = $("#color-space");
  colorSpot.get()[0].style.backgroundColor = nCard.color;
  playSpot.html(nCard.render(2));
}

//Rendering Function to remove cards from hand when played (player and bot hands)

function removeCard(uid) {
  const idName = `card-${uid}`;
  $(`#${idName}`).remove();
}

//Game Play (checks if valid play, updates business values, renders game card, removes card from hand)

export function handlePlay(uid, bot = false) {
  let valid = game.checkValid(uid, false);
  if (game.humanTurn === true || bot === true) {
    if (valid) {
      game.playCard(uid);
      displayGameCard();
      removeCard(uid);
    }
  }
}

//Event Listeners 
  
  //Click Cards (Play)

$(".player-card").on("click", (c) => {
  const elId = c.currentTarget.getAttribute("id").replace("card-", "");
  handlePlay(elId);
});

  //Click Deck (Draw)

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

  //Uno Button (Call Uno)

$("#uno-btn").on("click", (c) => {
  if (c.currentTarget.classList.contains("enabled")) {
    console.log("uno button pressed");
    game.unoButton();
    $("#uno-btn").get()[0].classList.remove("enabled");
  }
});

  //End Turn (can't play)

$("#end-btn").on("click", (c) => {
  if (c.currentTarget.classList.contains("enabled")) {
    console.log("end button pressed");
    game.endButton();
    $("#end-btn").get()[0].classList.remove("enabled");
  }
});

  // Set Color for Wild Card

const btnColors = ["green", "red", "yellow", "blue"];
btnColors.forEach((cb) => {
  document.getElementById(`${cb}Button`).addEventListener("click", function(ev) {
    const element = ev.currentTarget;
    const elColor = element.getAttribute("id").replace("Button", "");
    const colorSpot = $("#color-space");
    if (elColor === "green") {
      colorSpot.get()[0].style.backgroundColor = "green";
    } else if (elColor === "red") {
      colorSpot.get()[0].style.backgroundColor = "red";
    } else if (elColor === "yellow") {
      colorSpot.get()[0].style.backgroundColor = "yellow";
    } else if (elColor === "blue") {
      colorSpot.get()[0].style.backgroundColor = "blue";
    }
    game.closeForm();
  });
});