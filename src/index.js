import './css/styles.css';

class Game {
  constructor(humanName) {
    this.humanName = humanName;
    this.turn = true;
    this.bot = {};
    this.uidCounter = 0;
  }

  makeBot() {
    this.bot["hand"] = [];
    for (let i = 0; i < 7; i++) {
      const card = Game.randomCard();
      this.bot["hand"].push(card);
    }
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
    const color = possibleColors[colorRandom];
    this.uidCounter++;
    return {
      color: color,
      value: value,
      uid: this.uidCounter
    };
  }
  

  // changeTurn() {
  //   let turn = this.turn;
  //   if (turn === true) {
  //     turn = false;
  //   } else if (turn === false) {
  //     turn = true;
  //   }
  // }

}

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

