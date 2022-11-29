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

function displayGameCard () {
  const playSpot = $(".game-spot");
  const nCard = game.currentCard;
  playSpot.html(nCard.render(2)); 
}

displayGameCard();

$(".player-card").on("click", (c) => {
  const elId = c.currentTarget.getAttribute("id").replace("card-", "");
  console.log(elId);
});

$("#deck-btn").on("click", (c) => {
  if (game.canDraw) {
    game.canDraw = false;
    setTimeout(() => {
      if (!c.currentTarget.classList.contains("disabled")) {
        game.draw();
        game.canDraw = true;
        console.log(game.human.hand);
        c.currentTarget.classList.add("disabled");
      }
    }, 500);
  }
  handlePlay(elId);
});

function handlePlay(uid) {
  let valid = game.checkValid(uid); 
  if (valid) {
    game.playCard(uid);
    displayGameCard(); 
    removeCard(uid); 
  }  
}

function removeCard(uid) {
  const idName = `card-${uid}`;  
  $(`#${idName}`).remove(); 
}
