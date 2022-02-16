import { generateBoard, createAddCardButton } from './boardFunctions.js';

    //Displays a countdown from 3 seconds, then starts the game
    let t = 3;
    let countDown = setInterval(gameStart, 1000);
    document.getElementById("add-card-button").style.display = 'none'; //@GameFlow
    document.getElementById("mesg-top").innerHTML = "Get Ready!"; //@GameFlow
    function gameStart(){
        //updates countdown until game starts
        if(t>0){
            document.getElementById("mesg-bottom").innerHTML = "Game starting in: " + t; //@GameFlow
            t--;
        }    
        //At the end of the countdown, the game functions start and the interval timer stops
        else{
            document.getElementById("mesg-top").innerHTML = "Cards Dealt"; //@GameFlow
            document.getElementById("mesg-bottom").innerHTML = "Look for a SET!"; //@GameFlow  
            clearInterval(countDown);
            document.getElementById("add-card-button").style.display = 'block'; //@GameFlow
            generateBoard(12);
            createAddCardButton();
        }
        
    }