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
    let hand = [];
    for (let i = 0; i < 7; i++) {
      const card = this.randomCard();
      hand.push(card);
    }
    return hand;
  }


  randomCard() {
    const randomNumber = Math.floor(Math.random() * 14);
    const wildRandom = Math.floor(Math.random() * 2);
    const colorRandom = Math.floor(Math.random() * 4);
    const possibleValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "+2", "wild"];
    let value = possibleValues[randomNumber];
    if (value === "wild" && wildRandom === 1) {
      value = "wild4";
    }
    const possibleColors = ["red", "blue", "green", "yellow"];
    let color = possibleColors[colorRandom];
    if (value === "wild" || value === "wild4") {
      color = null;
    }
    this.uidCounter++;
    return {
      color: color,
      value: value,
      uid: this.uidCounter
    };
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

}

// Console Testing -------------------------------
let game = new Game("Yoonis");
console.log(game);



// function Player(human, bot) {
//   this.human = human;
//   this.bot = bot;
// }



// Player.prototype.assignTurn = function () {
//   // let human = this.human
//   // let bot = this.bot;
//   // let playerTurn = true;
//   // let botPlayers = [bot1, bot2, bot3];
// };

