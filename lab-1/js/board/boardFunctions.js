"use strict"
import { Card, generateCards, getRandomInt } from '../cards/cardObjects.js'
import { humanPlayers } from "../board/classicModeAddPlayers.js"

let clickedCards = new Map();
let cards = [];
let board = [];
let usedCards = [];
let boardSets = new Set();
let speedModeStats = {
  wins: 0,
  loses: 0,
  time: 0,
}

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
    shapes.add(card.shape);
    numSymbs.add(card.numSymb);
    shades.add(card.shade);
  });
  let colorsValid = (colors.size === 1 || colors.size === 3);
  let shapesValid = (shapes.size === 1 || shapes.size === 3);
  let numSymbsValid = (numSymbs.size === 1 || numSymbs.size === 3);
  let shadesValid = (shades.size === 1 || shades.size === 3);

  return colorsValid && shapesValid && numSymbsValid && shadesValid;
}

//Function that returns a set whose elements are arrays, and the array elements are the indicies of usedCards that create a set
function checkIfSetOnBoard() {
  let currSets = new Set();

  //Loop through the "first" card in a potential set
  for (let i = 0; i < board.length - 2; i++){
    clickedCards.set(board[i], null);

    //Loop through the "second" card in a potential set
    for (let j = i + 1; j < board.length - 1; j++){
      clickedCards.set(board[j], null);

      //Loop through the "third" card in a potential set
      for (let k = j + 1; k < board.length; k++){
        clickedCards.set(board[k], null);

        let validSet = checkIfSet();
        if (validSet){
          let thisSet = [usedCards.indexOf(board[i]), usedCards.indexOf(board[j]), usedCards.indexOf(board[k])];
          currSets.add(thisSet);
        }

        clickedCards.delete(board[k]);
      }
      clickedCards.delete(board[j]);
    }
    clickedCards.delete(board[i]);
  }
  return currSets;
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
  boardSets = checkIfSetOnBoard();
}

function createAddCardButton() {
  let button = document.getElementById("add-card-button");
  button.addEventListener("click", () => addCards())
}

function createHintButton() {
  let button = document.getElementById("hint-button");
  button.addEventListener("click", () => giveHint());
  boardSets = checkIfSetOnBoard();
}

function giveHint() {
  //Clear clicked cards so that the hint is the only highlighted card
  for (const thisCard of clickedCards){
    let card = thisCard[0];
    let target = thisCard[1];
    card.isClicked = false;
    highlightCard(card.isClicked, target, card);
  }
  clickedCards.clear();

  for (const thisSet of boardSets){
    let target = document.getElementById(thisSet[0] + 1);
    let card = usedCards[thisSet[0]];
    card.isClicked = true;
    highlightCard(card.isClicked, target, card);
    clickedCards.set(card, target);
    break;
  }
}

//gets a new card randomly from the bank of unused cards
function selectNewCard() {
  let randomCard = getRandomInt(cards.length);

  if(cards.length === 0 || cards[randomCard] === null) {
    return null;
  }
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

//Displays a game message for 1 second based on validity of chosen cards. @GameFlow
function displaySetMessage(isSet) {
  let className = isSet ? "is-success" : "is-danger";
  let messageTop = isSet ? "SET Won!" : "Not a SET!";
  let messageBottom;
  if(document.getElementById("speed")?.firstChild.nodeValue.includes("Speed")){
    if(!isSet){
      messageBottom = '+5 seconds';
      speedModeStats.loses += 1;
      speedModeStats.time += 1;
    } else {
    speedModeStats.wins += 1;
    messageBottom = "<br>";
    }
  } else {
    messageBottom = isSet ? "+1 Point" : "-1 Point";
  }
  document.getElementById("game-message").classList.toggle(className);
  document.getElementById("mesg-top").innerHTML = messageTop;
  document.getElementById("mesg-bottom").innerHTML = messageBottom;
  setTimeout(function(){
    if(board.length == 0) return;
    document.getElementById("game-message").classList.toggle(className);
    document.getElementById("mesg-top").innerHTML = "<br>";
    document.getElementById("mesg-bottom").innerHTML = "Look for a SET!";
  }, 1000)
}

//Button click event listener that handles set checking and card highlighting
function buttonClick(click) {
  let human = humanPlayers.filter((player) => player.isTurn);
  if(human.length === 0) {
    return;
  }
  console.log(human)
  let target = click.target;
  let cardIndex = parseInt(target.id) - 1;
  let card = usedCards[cardIndex];
  card.isClicked = !card.isClicked;
  highlightCard(card.isClicked, target, card);
  if(card.isClicked) {
    clickedCards.set(card, target)
  }

  //Displays a game message for 1 second based on validity of chosen cards. @GameFlow
  function displaySetMessage(isSet) {
    let className = isSet ? "is-success" : "is-danger";
    let messageTop = isSet ? "SET Won!" : "Not a SET!";
    let messageBottom = isSet ? "+1 Point" : "-1 Point";
    document.getElementById("game-message").classList.toggle(className);
    document.getElementById("mesg-top").innerHTML = messageTop;
    document.getElementById("mesg-bottom").innerHTML = messageBottom;
    setTimeout(function(){
      document.getElementById("game-message").classList.toggle(className);
      document.getElementById("mesg-top").innerHTML = "<br>";
      document.getElementById("mesg-bottom").innerHTML = "Look for a SET!";
    }, 1000)
  }

  if(clickedCards.size >= 3) {
    displaySetMessage(checkIfSet());
    if(!checkIfSet()) {
      human[0].failedSet();
      clickedCards.forEach((cardElement, cardObject) => {
        cardObject.isClicked = false;
        //unhighlights a card if selected cards are not part of a set
        highlightCard(cardObject.isClicked, cardElement, cardObject);
      })
    } else {
      human[0].gotSet();
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
<<<<<<< HEAD
      clickedCards.clear();
      boardSets = checkIfSetOnBoard();
=======
>>>>>>> Refactoring button click event handler to handle player interations
    }
    human[0].updateHTML();
    clickedCards.clear();
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
  clickedCards.forEach((cardE) => {
    cardE.removeEventListener("click", buttonClick);
  });
  // removes all existing event listeners
}

generateCards(cards);
export { generateBoard, createAddCardButton, addCards, createHintButton, board, cards, speedModeStats, highlightCard, clickedCards, checkIfSet };
