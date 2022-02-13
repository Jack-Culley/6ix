"use strict"
import { generateCards, getRandomInt } from './cardObjects.js'

let clickedCards = new Map();
let cards = [];
let board = []

function highlightCard(isClicked, cardElement) {
  if(isClicked) {
    cardElement.className += " clicked";
  } else {
    cardElement.className = "game-button";
  }
}

//checks if the selected cards make up a set per game of set rules
function checkIfSet() {
  let colors = new Set();
  let shapes = new Set();
  let numSymbs = new Set();
  let shades = new Set();
  clickedCards.forEach((v, card) => {
    colors.add(card.color);
    shapes.add(card.shapes);
    numSymbs.add(card.numSymb);
    shades.add(card.shade);
  });
  let colorsValid = (colors.size === 1 || colors.size === 3);
  let shapesValid = (shapes.size === 1 || shapes.size === 3);
  let numSymbsValid = (numSymbs.size === 1 || numSymbs.size === 3);
  let shadesValid = (shades.size === 1 || shades.size === 3);

  return colorsValid && shapesValid && numSymbsValid && shadesValid
}

//gets a new card randomly from the bank of unused cards
function selectNewCard() {
  let randomCard = getRandomInt(cards.length);
  //splice returns an array
  return cards.splice(randomCard, 1)[0];
}

//creates a button for the td element
function createButton(id, card, isAddingToExistingBoard) {
    let button = document.createElement("button");
    button.type = "button";
    button.style = `background: url(../assets/Images/${card.imageString})`;
    button.className = "game-button";
    let newId = isAddingToExistingBoard ? id : id + 1;
    button.id = `${newId}`;
    button.addEventListener("click", (click) => buttonClick(click));
    return button;
}

//Button click event listener that handles set checking and card highlighting
function buttonClick(click) {
  let target = click.target;
  let cardIndex = parseInt(target.id) - 1;
  let card = board[cardIndex];
  card.isClicked = !card.isClicked;
  highlightCard(card.isClicked, target)
  clickedCards.set(card, target)

  if(clickedCards.size >= 3) {
    if(!checkIfSet()) {
      clickedCards.forEach((cardElement, cardObject) => {
        cardObject.isClicked = false;
        //unhighlights a card if selected cards are not part of a set
        highlightCard(cardObject.isClicked, cardElement);
      })
    } else {
      cleanUp();
      //adds the new cards to the board
      clickedCards.forEach((cardElement, cardObject) => {
        let tr = cardElement.parentElement.parentElement;
        tr.removeChild(cardElement.parentElement);
        let newCard = selectNewCard();
        let button = createButton(parseInt(cardElement.id), newCard);
        let td = document.createElement("td");
        //removes old card from board
        board.splice(board.indexOf(cardObject), 1);
        board.push(newCard);
        td.appendChild(button);
        tr.appendChild(td);
      })
    }
    clickedCards.clear();
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
    let button = createButton(i, card);
    td.appendChild(button);
    tr.appendChild(td);
    board.push(card);
    // We have to deplete the deck when laying down cards on the board
    cards.splice(cardIndex, 1);
  }
}

//gets called after a set is found
function cleanUp() {
  clickedCards.forEach((cardE, k) => {
    cardE.removeEventListener("click", buttonClick);
  });
  // removes all existing event listeners
}

generateCards(cards)
generateBoard()
