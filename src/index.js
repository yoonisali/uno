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
  if (nCard) {
    const rend = nCard.render(2);
    if (rend) {
      playSpot.html(nCard.render(2));
    }
  }
}

export const colorSpot = $("#color-space");
setInterval(() => {
  if (game.currentCard.color) {
    displayGameCard();
  }
  if (game.humanTurn && game.turnType !== "normal") {
    $("#end-btn").get()[0].classList.add("enabled");
  } else {
    $("#end-btn").get()[0].classList.remove("enabled");
  }
  if (game.turnType === "stack") {
    colorSpot.text("Stack");
    game.humanTurn ?
      colorSpot.text("You: stack") : colorSpot.text("Bot: stack");
  } else {
    game.humanTurn ?
      colorSpot.text("You") : colorSpot.text("Bot");
  }
  if (game.canDraw) {
    $("#deck-btn").get()[0].classList.remove("disabled");
  } else {
    $("#deck-btn").get()[0].classList.add("disabled");
  }
}, 250);

//Rendering Function to remove cards from hand when played (player and bot hands)

function removeCard(uid) {
  const idName = `card-${uid}`;
  $(`#${idName}`).remove();
}

//Game Play (checks if valid play, updates business values, renders game card, removes card from hand)

export function handlePlay(uid, bot = false) {
  let valid = game.checkValid(`${uid}`, false);
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
setInterval(() => {
  $(".player-card").get().forEach((c) => {
    if (!c.classList.contains("listen")) {
      c.addEventListener("click", () => {        
        const elId = c.getAttribute("id").replace("card-", "");
        if (game.humanTurn === false) {
          console.log("not your turn");
        } else {
          handlePlay(elId);
        }
      });
    }
  });
}, 1500);

  //Click Deck (Draw)

$("#deck-btn").on("click", () => {
  if (game.canDraw) {
    setTimeout(() => {
      if (game.humanTurn && game.turnType === "normal") {
        game.canDraw = true;
        console.log("drew a card");
        game.draw();
      } else {
        game.canDraw = false;
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
    $("#end-btn").get()[0].classList.remove("enabled");
    game.endButton();
  }
});

  // Set Color for Wild Card

export const btnColors = ["green", "red", "yellow", "blue"];
btnColors.forEach((cb) => {
  document.getElementById(`${cb}Button`).addEventListener("click", function(ev) {
    const element = ev.currentTarget;
    const elColor = element.getAttribute("id").replace("Button", "");
    if (elColor === "green") {
      colorSpot.get()[0].style.backgroundColor = "green";
    } else if (elColor === "red") {
      colorSpot.get()[0].style.backgroundColor = "red";
    } else if (elColor === "yellow") {
      colorSpot.get()[0].style.backgroundColor = "yellow";
    } else if (elColor === "blue") {
      colorSpot.get()[0].style.backgroundColor = "blue";
    }
    game.closeWild();
  });
});

  //new game button

window.addEventListener("load", () => {
  const newGameBttn = document.getElementById("newGame");
  newGameBttn.addEventListener("click", game.newGame());
});