const colors = ["green", "red", "purple"];

const numSymbs = [1, 2, 3];

const shapes = ["rhombus", "oval", "tilde"];

const shades = ["unfilled", "semi", "filled"];

//constructor for card object
function Card(color, numSymb, shape, shade) {
  this.color = color;
  this.numSymb = numSymb;
  this.shape = shape;
  this.shade = shade;
  this.isClicked = false;
  this.imageString = createImageString(color, numSymb, shape, shade);
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


window.onload = function () {
    var e = document.getElementById('generate');
    e.addEventListener("click", displayBoard, false);
}


function displayCard(cardObj, n){
    console.log(cardObj.numSymb);
    for(let i = 0; i < cardObj.numSymb; i++){
        const th = document.getElementById(n);
        const card = document.createElement("img");
        card.setAttribute('class','card');
        card.setAttribute('src', '../assets/cardImages/' + cardObj.shape + '_' + cardObj.shade + '_' + cardObj.color + '.png');
        th.appendChild(card);
        th.appendChild(document.createElement("br"));
        console.log(card);
        console.log(th);
    }
}

function displayBoard(){
    let i = 1;
    for(var iter = board.values(), card= null; card=iter.next().value;){
        console.log(card);
        displayCard(card, i);
        i++;
    }
}
