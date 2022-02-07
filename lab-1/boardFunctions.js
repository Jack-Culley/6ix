"use strict"
import { generateCards } from './cardObjects.js'

let clickedCards = new Map();
let cards = [];
let board = [];

function highlightCard(isClicked, cardElement) {
  console.log('highlighting')
  if(isClicked) {
    cardElement.className += " clicked";
  } else {
    cardElement.className = "game-button";
  }
}

function getRandomInt(num) {
  return Math.floor(Math.random() * num);
}

function checkIfSet() {
  let colors = new Set();
  let shapes = new Set();
  let numSymbs = new Set();
  let shades = new Set();
  // console.log(clickedCards)
  clickedCards.forEach((v, card) => {
    colors.add(card.color);
    shapes.add(card.shapes);
    numSymbs.add(card.numSymb);
    shades.add(card.shade);
  });
  let colorsValid = (colors.size == 1 || colors.size == 3);
  let shapesValid = (shapes.size == 1 || shapes.size == 3);
  let numSymbsValid = (numSymbs.size == 1 || numSymbs.size == 3);
  let shadesValid = (shades.size == 1 || shades.size == 3);

  return colorsValid && shapesValid && numSymbsValid && shadesValid
}

function buttonClick(click) {
  console.log('clicked')
  let target = click.target;
  let cardIndex = parseInt(target.id) - 1;
  let card = board[cardIndex];
  card.isClicked = !card.isClicked;
  highlightCard(card.isClicked, target)
  clickedCards.set(card, target)
  // console.log(clickedCards)

  if(clickedCards.size == 3) {
    console.log('checking if set...')
    console.log(checkIfSet());
    if(!checkIfSet()) {
      console.log('Here!')
      clickedCards.forEach((cardElement, cardObject) => {
        cardObject.isClicked = false;
        highlightCard(cardObject.isClicked, cardElement);
      })
      clickedCards.clear();
    }
    //checkIfSet
    //clear clicked cards array if not set else increment player score
    // if it is a set clear event listeners on the clicked buttons then append 3 more cards to the board
  }
}

//uses a Set object to generate a board of 12 unique cards
function generateBoard() {
  let trIndex = -1;
  for(let i = 0; i < 12; i++) {
    if(i % 4 == 0 && i < 12) {
      trIndex++;
    }
    let tr = document.getElementsByClassName("card-row")[trIndex];
    let cardIndex = getRandomInt(81 - i);
    let card = cards[cardIndex];
    let td = document.createElement("td");
    let button = document.createElement("button");
    button.type = "button";
    button.style = `background: url(../assets/Images/${card.imageString})`;
    button.className = "game-button";
    button.id = `${i+1}`;
    button.addEventListener("click", (click) => buttonClick(click))
    td.appendChild(button);
    tr.appendChild(td);
    board.push(card);
    // We have to deplete the deck when laying down cards on the board
    cards.splice(cardIndex, 1);
  }
  console.log(cards.length)
}

//gets called after deck is depleted
function cleanUp() {
  // removes all existing event listeners
}

generateCards(cards)
generateBoard()
