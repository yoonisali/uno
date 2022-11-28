import Game from './js/business.js'
import './css/styles.css';
import "bootstrap";
import * as $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";

$(".opponent-card").html(`
    <div class="card-body">
        <h5 class="card-title">Uno</h5>
    </div>
`);

let game = new Game("Yoonis");
console.log(game);
