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

function createImageString(color, numSymb, shape, shade) {
  return `${color}_${shape}_${shade}_${numSymb}.PNG`;
}

function getRandomInt(num) {
  return Math.floor(Math.random() * num);
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

export { generateCards, Card, getRandomInt };
