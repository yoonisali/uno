import * as $ from "jquery";

export default class Card {
  constructor(color, value, uid) {
    this.color = color;
    this.value = value;
    this.uid = uid;
  }

  render(isPlayer) {
    let place = "player";
    let val = this.value;
    let color = this.color;
    if (isPlayer === 1) {
      place = "opponent";
      val = "Uno";
      color = "black";
    } else if (isPlayer === 2) {
      place = "game"; 
    }
    return $(`
    <div class="card ${place}-card" id="card-${this.uid}">
    <div class="card-body" style="background-color: ${color};">
      <h5 class="card-title">${val}</h5>
    </div>
  </div>
    `);
  }
}