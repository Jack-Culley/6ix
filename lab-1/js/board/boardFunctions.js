"use strict"
import { Card, generateCards, getRandomInt } from '../cards/cardObjects.js'

let clickedCards = new Map();
let cards = [];
let board = [];
let usedCards = [];

function highlightCard(isClicked, cardElement, cardObject) {
  if(isClicked) {
    cardElement.className += " clicked";
  } else {
    clickedCards.delete(cardObject);
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

function addCards() {
  let numCards = cards.length >= 3 ? 3 : cards.length;
  generateBoard(numCards);
}

function createAddCardButton() {
  let button = document.getElementById("add-card-button");
  button.addEventListener("click", () => addCards())
}

//gets a new card randomly from the bank of unused cards
function selectNewCard() {
  let randomCard = getRandomInt(cards.length);
  //splice returns an array
  return cards.splice(randomCard, 1)[0];
}

//find the leftmost empty slot on the grid
function addToEmptySpace() {
  let columns = document.getElementsByClassName("tile-parent");
  let columnArray = [];
  for(let i = 0; i < columns.length; i++) {
    columnArray[i] = columns[i];
  }
  return columnArray.filter((column) => column.children.length < 4)[0];
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
      document.getElementById("game-message").classList.toggle("is-danger"); //@GameFlow
      setTimeout(function(){
        document.getElementById("game-message").classList.toggle("is-danger"); //@GameFlow
      }, 1000);
      document.getElementById("mesg-top").innerHTML = "Not a SET!"; //@GameFlow
      document.getElementById("mesg-bottom").innerHTML = "-1 Point"; //@GameFlow
      clickedCards.forEach((cardElement, cardObject) => {
        cardObject.isClicked = false;
        //unhighlights a card if selected cards are not part of a set
        highlightCard(cardObject.isClicked, cardElement, cardObject);
      })
    } else {
      document.getElementById("game-message").classList.toggle("is-success"); //@GameFlow
      setTimeout(function(){
        document.getElementById("game-message").classList.toggle("is-success"); //@GameFlow
      }, 1000);
      document.getElementById("mesg-top").innerHTML = "SET Won!"; //@GameFlow
      document.getElementById("mesg-bottom").innerHTML = "+1 Point"; //@GameFlow
      cleanUp();
      //adds the new cards to the board
      clickedCards.forEach((cardElement, cardObject) => {
        let tileParent = cardElement.parentElement.parentElement;
        tileParent.removeChild(cardElement.parentElement);
        // we don't want to replace cards that have been added when there are
        // more than 12 cards on the board as per the rules
        board.splice(board.indexOf(cardObject), 1);
        if(board.length < 12) {
          let newTile = document.createElement("div");
          newTile.className = "tile center card-container";
          let newCard = selectNewCard();
          if(newCard !== null) {
            let button = createButton(usedCards.length, newCard);
            //removes old card from board
            //this is used to make sure the cards get appended to the first empty slot on the grid
            let nextIncompleteTile = addToEmptySpace();
            board.push(newCard);
            usedCards.push(newCard);
            newTile.appendChild(button);
            nextIncompleteTile.appendChild(newTile);
          }
        }
      })
      clickedCards.clear();
    }
  }
}

//uses a Set object to generate a board of 12 unique cards
function generateBoard(numCards) {
  let tileParent;
  let tileAncestor = document.getElementById("card-container");
  for(let i = 0; i < numCards; i++) {
    if(i % 4 == 0 && i < 12) {
      tileParent = document.createElement("div");
      tileParent.className = "tile tile-parent is-vertical";
      tileAncestor.appendChild(tileParent);
    }
    let newTile = document.createElement("div");
    newTile.className = "tile center card-container";
    let cardIndex = getRandomInt(cards.length);
    let card = cards[cardIndex];
    board.push(card);
    usedCards.push(card);
    let button = createButton(usedCards.indexOf(usedCards[usedCards.length-1]), card);
    newTile.appendChild(button);
    tileParent.appendChild(newTile);
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

generateCards(cards);
export { generateBoard, createAddCardButton };
