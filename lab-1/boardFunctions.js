"use strict"
import { generateCards } from './cardObjects.js'

let clickedCards = [];
let cards = [];
let board = [];
function highlightCard(card, cardElement) {
  if(card.isClicked) {
    cardElement.className += " clicked";
  } else {
    cardElement.className = "game-button";
  }
}

function getRandomInt(num) {
  return Math.floor(Math.random() * num);
}

function buttonClick(click) {
  let cardIndex = parseInt(click.target.id) - 1;
  let card = board[cardIndex];
  card.isClicked = !card.isClicked;
  console.log(card)
  highlightCard(card, click.target)
  clickedCards.push(card);
  if(clickedCards.length == 3) {
    console.log('checking if set...')
    //checkIfSet
    //clear clicked cards array if not set else increment player score
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
