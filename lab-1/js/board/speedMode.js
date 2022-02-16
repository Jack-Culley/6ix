import { generateBoard, createAddCardButton, clearBoard } from './boardFunctions.js';

function newBoard(numCards) {
  clearBoard();
  generateBoard(numCards)
}
createAddCardButton();
setInterval(newBoard, 5000, 12)
