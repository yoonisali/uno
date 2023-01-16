import Card from "../card.js";
import { handlePlay, colorSpot, btnColors } from "../index";
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
      unoCall: false,
      hand: this.makeHand()
    };
    this.currentCard = this.firstCard();
    this.switchTurn = true;
    this.stack = [];
    this.formOpen = false;
    this.gameEnd = false;
  }

  //Start of Game

  makeHand() {
    let hand = {};
    for (let i = 0; i < 7; i++) {
      const card = this.randomCard();
      hand[card.uid.toString()] = card;
    }
    return hand;
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
    if (this.canDraw && this.turnType !== "stack") {
      this.addStack(1);
      this.humanTurn ?
        this.applyStack(this.human.hand) : this.applyStack(this.bot.hand);
      this.turnType = "draw";
      this.canDraw = false;
    }
  }

  botPick() {
    const checkBot = () => {
      const botArray = [...Object.values(this.bot.hand)];
      const check = botArray.filter((c) => {
        const vCheck = this.checkValid(c.uid);
        console.log(vCheck);
        if (vCheck) {
          return true;
        } else {
          return false;
        }
      });
      return check;
    };

    const botPlay = (filtered) => {
      const choose = filtered[Math.floor(Math.random() * filtered.length)];
      if (choose) {
        this.currentCard = choose;
        if (choose.uid) {
          handlePlay(choose.uid, true);
        }
      }
    };

    this.switchTurn = true;
    if (this.turnType === "normal") {
      this.canDraw = true;
      const filtered = checkBot();
      if (filtered.length > 0) {
        botPlay(filtered);
      } else {
        this.draw();
        this.turnType = "draw";
        this.botPick();
      }
    } else if (this.turnType === "stack") {
      const filtered = checkBot();
      if (filtered.length > 0) {
        botPlay(filtered);
      } else {
        this.canDraw = false;
        this.applyStack(this.bot.hand);
        this.changeTurn();
      }
    } else if (this.turnType === "draw") {
      this.canDraw = false;
      const filtered = checkBot();
      if (filtered.length > 0) {
        botPlay(filtered);
      } else {
        this.turnType = "normal";
        this.changeTurn();
      }
    }
  }

  botTurn() {
    const checkUno = () => {
      const handArray = Object.values(this.human.hand);
      if (handArray.length === 1 && !this.human.unoCall) {
        this.addStack(2);
        this.applyStack(this.human.hand);
      }
    };
    setTimeout(() => {
      $("#uno-btn").get()[0].classList.remove("enabled");
      checkUno();
      this.botPick();
    }, 2000);
  }

  botWild() {
    setTimeout(() => {
      colorSpot.get()[0].style.backgroundColor = btnColors[Math.floor(Math.random() * btnColors.length)];
      this.changeTurn();
    }, 1000);
  }

  //Buttons

  unoButton() {
    this.human.unoCall = true;
  }

  endButton() {
    if (this.humanTurn) {
      if (this.turnType === "normal") {
        this.changeTurn();
      } else {
        this.turnType = "normal";
        this.applyStack(this.human.hand);
        this.changeTurn();
      }
    }
  }

  changeTurn() {
    if (this.switchTurn) {
      if (this.turnType !== "stack") {
        this.canDraw = true;
      }
      if (this.humanTurn) {
        this.humanTurn = false;
        this.botTurn();
        console.log("bots turn");
        console.log(this);
      } else {
        this.canDraw = true;
        this.humanTurn = true;
        this.checkHand();
        console.log("human turn");
        console.log(this);
      }
    }

  }

  checkValid(uid) {
    let card = this.humanTurn ?
      this.human.hand[uid] : this.bot.hand[uid];
    let currentCard = this.currentCard;
    const colorSpot = $("#color-space");
    let colorIndic = colorSpot.get()[0].style.backgroundColor;
    if (card) {
      console.log(card);
      if (this.turnType === "normal") {
        if (card.color === colorIndic || card.value === currentCard.value || card.value === "W" || card.value === "W4") {
          return true;
        } else {
          return false;
        }
      } else if (this.turnType === "stack") {
        if (card.value === currentCard.value) {
          return true;
        } else {
          return false;
        }
      } else if (this.turnType === "draw") {
        if (card.color === colorIndic || card.value === currentCard.value || card.value === "W" || card.value === "W4") {
          this.turnType = "normal";
          return true;
        } else {
          return false;
        }
      }
    }
  }

  //Stack Functions

  addStack(num) {
    for (let i = 0; i < num; i++) {
      this.stack.push(this.randomCard());
    }
    this.turnType = "stack";
  }

  applyStack(hand) {
    for (let i = 0; i < this.stack.length; i++) {
      hand[`${this.stack[i].uid}`] = this.stack[i];
      hand === this.human.hand ?
        this.renderCard(this.stack[i].render(true), "bottom") : this.renderCard(this.stack[i].render(1), "top");
    }
    this.stack = [];
    this.turnType = "normal";
  }

  cardCount(player) {
    return Object.values(this[player].hand).length;
  }

  checkHand() {
    if (this.humanTurn) {
      if (this.cardCount("human") <= 2) {
        $("#uno-btn").get()[0].classList.add("enabled");
      }
    }
  }

  //Wild Card Pop Up 

  openWild() {
    this.formOpen = true;
    document.getElementById("popupForm").style.display = "block";
  }

  openWin() {
    this.formOpen = true;
    document.getElementById("popupWin").style.display = "block";
    document.getElementById("gameover").style.display = "none";
  }

  newGame() {
    //window.location.reload();
    return false;
  }

  closeWild() {
    this.formOpen = false;
    document.getElementById("popupForm").style.display = "none";
    this.changeTurn();
  }


  playCard(uid) {
    let playedCard = this.humanTurn ?
      this.human.hand[uid] : this.bot.hand[uid];
    if (playedCard) {
      let value = playedCard.value;
      this.currentCard = playedCard;
      this.switchTurn = true;
      if (this.humanTurn) {
        delete this.human.hand[uid];
      } else {
        delete this.bot.hand[uid];
      }
      let wild = false;
      if (value === "§" || value === "Ø") {
        this.checkHand();
        this.switchTurn = false;
        this.canDraw = true;
        if (!this.humanTurn) {
          this.botTurn();
        }
        console.log(`player has ${this.cardCount("human")} cards`);
      } else if (value === "+2") {
        this.addStack(2);
      } else if (value === "W4") {
        this.addStack(4);
        wild = true;
      } else if (value === "W") {
        wild = true;
      }
      if (wild === true) {
        if (this.humanTurn) {
          this.openWild();
        } else {
          this.botWild();
        }
      } else {
        this.changeTurn();
      }
    }
  }

  // End of Game 

  endGame() {
    const humanHand = [...Object.values(this.human.hand)];
    const botsHand = [...Object.values(this.bot.hand)];
    console.log("botshand", botsHand);
    console.log("humanHand", humanHand);
    if (humanHand.length === 0 || botsHand.length === 0) {
      this.gameEnd = true;
      this.openWin();
    }
  }
}
