import Card from "./card.js";
import * as $ from "jquery";

export default class Game {
  constructor() {
    this.humanTurn = true;
    this.canDraw = true;
    this.uidCounter = 0;
    this.turnType = "normal";
    this.bot = {
      hand: this.makeHand()
    };
    this.human = {
      hand: this.makeHand()
    };
    this.currentCard = this.firstCard();
    this.switchTurn = true;
    this.stack = [];
    this.formOpen = false;
  }

  makeHand() {
    let hand = {};
    for (let i = 0; i < 7; i++) {
      const card = this.randomCard();
      hand[card.uid.toString()] = card;
    }
    return hand;
  }


  randomCard() {
    this.uidCounter++;
    const randomNumber = Math.floor(Math.random() * 14);
    const wildRandom = Math.floor(Math.random() * 2);
    const colorRandom = Math.floor(Math.random() * 4);
    const possibleValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Ø", "§", "+2", "W"];
    let value = possibleValues[randomNumber];
    if (value === "W" && wildRandom === 1) {
      value = "W4";
    }
    const possibleColors = ["red", "blue", "green", "yellow"];
    let color = possibleColors[colorRandom];
    if (value === "W" || value === "W4") {
      color = null;
    }
    return new Card(color, value, this.uidCounter);
  }

  renderCard(card, player) {
    const spot = $(`.${player}`);
    card.appendTo(spot);
  }

  draw() {
    const addCard = (hand) => {
      const card = this.randomCard();
      hand[card.uid.toString()] = card;
      return card;
    };
    const nCard = this.humanTurn ?
      addCard(this.human.hand) : addCard(this.bot.hand);
    const cardElement = this.humanTurn ?
      nCard.render(true) : nCard.render(1);
    this.humanTurn ?
      this.renderCard(cardElement, "bottom") : this.renderCard(cardElement, "top");
    this.turnType = "draw";
    if (this.humanTurn) {
      $("#end-btn").get()[0].classList.add("enabled");
    }
  }

  firstCard() {
    const randomNumber = Math.floor(Math.random() * 10);
    const colorRandom = Math.floor(Math.random() * 4);
    const possibleColors = ["red", "blue", "green", "yellow"];
    let card = this.randomCard();
    if (card.value === "W" || card.value === "W4") {
      card.value = randomNumber.toString();
      card.color = possibleColors[colorRandom];
    }
    return card;
  }

  endButton() {
    if(this.humanTurn === true && this.turnType === "draw") {
      this.changeTurn();
    } else if(this.humanTurn && this.turnType === "normal") {
      this.draw(); 
      this.changeTurn(); 
    }
  }

  changeTurn() {
    if (this.switchTurn) {
      if (this.humanTurn) {
        this.humanTurn = false;
        $("#deck-btn").get()[0].classList.add("disabled");
        $("#end-btn").get()[0].classList.remove("enabled");
        console.log("bots turn");
      } else {
        $("#deck-btn").get()[0].classList.remove("disabled");
        $("#end-btn").get()[0].classList.add("enabled");
        this.humanTurn = true;
        console.log("human turn");
      }
    }
  }

  checkValid(uid) {
    let card = this.human.hand[uid];
    let currentCard = this.currentCard;
    if (this.turnType === "normal") {
      if (card.color === currentCard.color || card.value === currentCard.value || card.value === "W" || card.value === "W4") {
        return true;
      } else {
        return false;
      }
    } else if (this.turnType === "stack") {
      this.turnType = "normal";
      if(this.bot.hand[uid].value === currentCard) {
        return true;
      } else {
        this.humanTurn ?
          this.applyStack(this.human.hand) : this.applyStack(this.bot.hand);
        this.changeTurn();
        return false;
      }
    } else if (this.turnType === "draw") {
      this.turnType = "normal";
      if (card.color === currentCard.color || card.value === currentCard.value || card.value === "W" || card.value === "W4") {
        return true;
      } else {
        this.changeTurn();
        return false;
      }
    }
  }

  addStack(num) {
    for (let i = 0; i < num; i++) {
      this.stack.push(this.randomCard());
    }
    this.turnType = "stack";
  }

  applyStack(hand) {
    for (let i = 0; i < this.stack.length; i++) {
      hand.push(this.stack[i]);
      this.humanTurn ? 
        this.renderCard(this.stack[i].render(), "bottom") : this.renderCard(this.stack[i], "top");
    }
    this.stack = [];
  }

  openForm() {
    this.formOpen = true;
    document.getElementById("popupForm").style.display = "block";
  }

  closeForm() {
    this.formOpen = false;
    document.getElementById("popupForm").style.display = "none";
    this.changeTurn();
  }

  playCard(uid) {
    let playedCard = this.human.hand[uid];
    let value = playedCard.value;
    this.currentCard = playedCard;
    this.switchTurn = true;
    delete this.human.hand[uid];
    let wild = false;
    if (value === "§" || value === "Ø") {
      this.switchTurn = false;
    } else if (value === "+2") {
      this.addStack(2);
    } else if (value === "W4") {
      this.addStack(4);
      wild = true;
    } else if (value === "W") {
      wild = true;
    }
    if (wild === true) {
      this.openForm();
    } else {
      this.changeTurn();
    }
  }
}