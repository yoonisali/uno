import Card from "./card.js";

export default class Game {
  constructor(humanName) {
    this.humanTurn = true;
    this.uidCounter = 0;
    this.bot = {
      hand: this.makeHand()
    };
    this.human = {
      name: humanName,
      hand: this.makeHand()
    };
    this.currentCard = this.firstCard();
  }

  makeHand() {
    let hand = {};
    for (let i = 0; i < 7; i++) {
      const card = this.randomCard();
      hand[card.uid] = card;
    }
    return hand;
  }


  randomCard() {
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
    this.uidCounter++;
    return new Card(color, value, this.uidCounter);
  }

  firstCard() {
    const randomNumber = Math.floor(Math.random() * 10);
    let card = this.randomCard();
    if (card.value === "wild" || card.value === "wild4") {
      card.value = randomNumber.toString();
    }
    return card;
  }

  changeTurn() {
    let turn = this.humanTurn;
    if (turn === true) {
      turn = false;
    } else if (turn === false) {
      turn = true;
    }
  }

  checkValid(uid) {
    let card = this.human.hand[uid];
    let currentCard = this.currentCard;
    if (card.color === currentCard.color || card.value === currentCard.value || card.value === "wild" || card.value === "wild4") {
      return true;
    } else {
      return false;
    }
  }
}

