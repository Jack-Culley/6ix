
function Card(color, numSymb, shape, shade) {
    this.color = color;
    this.numSymb = numSymb;
    this.shape = shape;
    this.shade = shade;
}

//code to generate a random card
const colors = ["green", "blue", "purple"];

const numSymbs = [1,2,3];

const shapes = ["rhombus", "oval", "tilde"];

const shades = ["empty", "lines", "filled"];

function getRandomInt(num) {
    return Math.floor(Math.random() * num);
}

var c = new Card(colors[getRandomInt(3)], numSymbs[getRandomInt(3)], shapes[getRandomInt(3)], shades[getRandomInt(3)]);

let cards = [];
let i,u,x,y;
for(i,u,x,y = 0; i < 81; i++){
    cards[i] = new Card(i, i, i, i)
}
