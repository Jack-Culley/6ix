const colors = ["green", "red", "purple"];

const numSymbs = [1, 2, 3];

const shapes = ["rhombus", "oval", "tilde"];

const shades = ["empty", "dashed", "filled"];

//constructor for card object
function Card(color, numSymb, shape, shade) {
  this.color = color;
  this.numSymb = numSymb;
  this.shape = shape;
  this.shade = shade;
  this.isClicked = false;
  this.imageString = createImageString(color, numSymb, shape, shade);
}

function getRandomInt(num) {
  return Math.floor(Math.random() * num);
}

function createImageString(color, numSymb, shape, shade) {
  return `${color}_${shape}_${shade}_${numSymb}.PNG`;
}

//generates all 81 cards into an array
function generateCards(cards) {
  let c, n, sp, sd;
  let i = 0;
  for (c = 0; c < 3; c++) {
    for (n = 1; n < 4; n++) {
      for (sp = 0; sp < 3; sp++) {
        for (sd = 0; sd < 3; sd++) {
          cards[i] = new Card(colors[c], n, shapes[sp], shades[sd]);
          i++;
        }
      }
    }
  }
}

//uses a Set object to generate a board of 12 unique cards
function generateBoard(cards) {
  let tbody = document.getElementById("table-body");
  let board = new Set();
  let trIndex = -1;
  for(let i = 0; i < 12; i++) {
    if(i % 4 == 0 && i < 12) {
      trIndex++;
    }
    let tr = document.getElementsByClassName("card-row")[trIndex];
    console.log(tr)
    let card = cards[getRandomInt(81)];
    let td = document.createElement("td");
    let button = document.createElement("button");
    button.type = "button";
    button.style = `background: url(../assets/Images/${card.imageString})`
    button.className = "game-button"
    td.appendChild(button);
    tr.appendChild(td);
    board.add(card);
  }
  return board;
}

let cards = [];
generateCards(cards);
let board = generateBoard(cards);
