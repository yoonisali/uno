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
      hand[card.uid.toString()] = card;
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
    const colorRandom = Math.floor(Math.random() * 4);
    const possibleColors = ["red", "blue", "green", "yellow"];
    let card = this.randomCard();
    if (card.value === "W" || card.value === "W4") {
      card.value = randomNumber.toString();
      card.color = possibleColors[colorRandom];
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

  playCard(uid) {
    let playedCard = this.human.hand[uid];
    let value = playedCard.value;
    this.currentCard = playedCard; 
    delete this.human.hand[uid];
    this.humanTurn = false;
    let wild = false;
    if (value === "reverse" || value === "skip") {
      this.humanTurn = true; 
    } else if (value === "+2") {
      let card1 = this.randomCard(); 
      let card2 = this.randomCard(); 
      this.bot.hand[card1.uid] = card1; 
      this.bot.hand[card2.uid] = card2;
    } else if (value === "wild4") {
      let card1 = this.randomCard(); 
      let card2 = this.randomCard(); 
      let card3 = this.randomCard(); 
      let card4 = this.randomCard(); 
      this.bot.hand[card1.uid] = card1; 
      this.bot.hand[card2.uid] = card2;
      this.bot.hand[card3.uid] = card3;
      this.bot.hand[card4.uid] = card4;
      this.humanTurn = true;
      wild = true; 
    } else if (value === "wild") {
      wild = true; 
    }
    return wild; 
  }
  

}

