const colors = ["green", "blue", "purple"];

const numSymbs = [1,2,3];

const shapes = ["rhombus", "oval", "tilde"];

const shades = ["empty", "lines", "filled"];

//constructor for card object
function Card(color, numSymb, shape, shade) {
    this.color = color;
    this.numSymb = numSymb;
    this.shape = shape;
    this.shade = shade;
}

function getRandomInt(num) {
    return Math.floor(Math.random() * num);
}

//generates all 81 cards into an array
function generateCards(cards) {
    let c,n,sp,sd;
    let i = 0;
    for(c = 0; c < 3; c++){
        for(n = 1; n < 4; n++){
            for(sp = 0; sp < 3; sp++){
                for(sd = 0; sd < 3; sd++){
                    cards[i] = new Card(colors[c], n, shapes[sp], shades[sd]);
                    i++;
                }
            }
        }
    }
}

//uses a Set object to generate a board of 12 unique cards
function generateBoard(cards) {
    let board = new Set();
    while(board.size < 13){
        board.add(cards[getRandomInt(81)]);
    }
    return board;
}

let cards = [];
generateCards(cards);
let board = generateBoard(cards);

