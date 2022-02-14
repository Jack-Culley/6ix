"use strict"
import { Card, generateCards, getRandomInt } from '../cards/cardObjects.js'

let clickedCards = new Map();
let cards = [];
let board = []
let usedCards = [];

function highlightCard(isClicked, cardElement, cardObject) {
  if(isClicked) {
    cardElement.className += " clicked";
  } else {
    clickedCards.delete(cardObject);
    cardElement.className = "game-button";
  }
}

function createNewRow() {
  let tbody = document.getElementById("table-body");
  let newRow = document.createElement("tr");
  newRow.className = "card-row";
  tbody.appendChild(newRow);
  return newRow;
}


//checks if the selected cards make up a set per game of set rules
function checkIfSet() {
  let colors = new Set();
  let shapes = new Set();
  let numSymbs = new Set();
  let shades = new Set();
  console.log(clickedCards)
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
function createButton(id, card) {
    let button = document.createElement("button");
    button.type = "button";
    button.style = `background: url(../assets/images/${card.imageString})`;
    button.className = "game-button";
    button.id = `${id+1}`;
    button.addEventListener("click", (click) => buttonClick(click));
    return button;
}

function addCard() {
  let rows = document.getElementsByClassName("card-row");
  let lastRow = rows[rows.length-1];
  let children = lastRow.childNodes;
  let newCardId = children[children.length-1].childNodes[0].id;
  let newCard = selectNewCard();
  let newButton = createButton(parseInt(newCardId), newCard);
  let td = document.createElement("td");
  td.appendChild(newButton);
  if(lastRow.childNodes.length === 4) {
    let newRow = createNewRow();
    newRow.appendChild(td);
  } else {
    lastRow.appendChild(td);
  }
  board.push(newCard);
  usedCards.push(newCard);
}

function createAddCardButton() {
  let button = document.getElementById("add-card-button");
  button.addEventListener("click", () => addCard())
}

//Button click event listener that handles set checking and card highlighting
function buttonClick(click) {
  let target = click.target;
  let cardIndex = parseInt(target.id) - 1;
  let card = usedCards[cardIndex];
  card.isClicked = !card.isClicked;
  highlightCard(card.isClicked, target, card);
  if(card.isClicked) {
    clickedCards.set(card, target)
  }

  if(clickedCards.size >= 3) {
    if(!checkIfSet()) {
      clickedCards.forEach((cardElement, cardObject) => {
        cardObject.isClicked = false;
        //unhighlights a card if selected cards are not part of a set
        highlightCard(cardObject.isClicked, cardElement, cardObject);
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
        usedCards.push(newCard);
        td.appendChild(button);
        tr.appendChild(td);
      })
      clickedCards.clear();
    }
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
    usedCards.push(card);
    // We have to deplete the deck when laying down cards on the board
    cards.splice(cardIndex, 1);
  }
  createAddCardButton();
}

//gets called after a set is found
function cleanUp() {
  clickedCards.forEach((cardE, k) => {
    cardE.removeEventListener("click", buttonClick);
  });
  // removes all existing event listeners
}

// let cs= [new Card("purple", 3, "oval", "dashed"), new Card("green", 3, "rhombus", "filled"), new Card("red", 3, "tilde", "empty")]
// clickedCards.set(cs[0], 'h')
// clickedCards.set(cs[1], 'h')
// clickedCards.set(cs[2], 'h')
// console.log(checkIfSet())
// clickedCards.clear()
generateCards(cards);
generateBoard();
