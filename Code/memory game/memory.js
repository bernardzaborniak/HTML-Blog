
window.onload = function(){
    
    "use strict";
    
//der kasten der alle Karten enthält
var container = document.getElementsByClassName("flip-container")[0];
    
//Karten
var turnedCardsNumber = 0;   //wieviele Paare sind aufgedekt?
var turnable = true; //falls bereits 2 aufgedeckt sind, wirds zu false 
var turnedCards=[]; //in diesem Array werden jeweils die allCards-indexe von den aufgedeckten Karten gespeichert, falls beide aufgedeckt wurden, wird der array wieder geleert
var allRightTurnedCards = [];
var allCardsFront = document.getElementsByClassName("frontImage"); //hier werden die Bilder zufällig hinzugefügt
var allCards = document.getElementsByClassName("flipper");
var allCardsNumber = allCards.length;
    
//werden nach dem Sieg angezeigt
var blurrerP = document.getElementById("blurrerP");
    
//sound beim Gewinnn
var audioTada = document.getElementById("tadaa");
var audioChher = document.getElementById("cheering");
    

    
//alle bilder-scr in einem Array (von jedem jeweils 2)
var allImgs = [
    "Images/ananas.png", 
    "Images/ananas.png",
    "Images/baum.jpg",
    "Images/baum.jpg",
    "Images/delphin.jpg",
    "Images/delphin.jpg",
    "Images/pizza.png",
    "Images/pizza.png",
    "Images/pizza2.png",
    "Images/pizza2.png",
    "Images/rote.jpg",
    "Images/rote.jpg",
    "Images/troll.png",
    "Images/troll.png",
    "Images/trump.jpg",
    "Images/trump.jpg"
];
    
    
//buttons
var  startButton = document.getElementById("startButton");

    
 
startButton.onclick = startGame;

    
    function startGame()
    {
        makeVisible();
        turnBackwards();
        allImgs = shuffle(allImgs);
        glueImages();
        addClickEvents();
        
        
        function makeVisible(){
            startButton.style.position = "static";
            startButton.style.width = "10%";
            startButton.style.height = "10%";
            startButton.style.marginRight = "45%";
            startButton.style.marginLeft = "45%";
            startButton.style.zIndex = "4";
            startButton.innerHTML = "reset Game";
            
            container.style.visibility = "visible";
        
            blurrerP.style.display = "none";
        }
        
        function turnBackwards(){
            for(let i=0;i<allCardsNumber;i++){
                allCards[i].style.transform = "rotateY(0deg)"; 
                allCards[i].style.boxShadow = "";
                turnedCardsNumber = 0;   
                turnable = true;  
                turnedCards=[]; 
                allRightTurnedCards = [];
            }
        }
        
        function shuffle(array) //kopiert aus stackoverflow
        { 
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) 
            {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
            }

        return array;
        }
        
        function glueImages() //klebt die Bilder vom Array an die Karten 
        {
            for(let i=0; i<allCards.length; i++)
                {
                    allCards[i].childNodes[1].childNodes[3].src = allImgs[i];
                    console.log("cardSrc");
                }
        }
   
        function addClickEvents(){
            for(let i=0;i<allCardsNumber;i++)
            {
                var card=allCards[i];
                card.addEventListener("click", function(){turn(i)});
            } 
        }
        
        function turn(i)
        {   
            
            if(turnable != false && turnedCards.includes(i)==false && allRightTurnedCards.includes(i)==false)
            {
                allCards[i].style.transform = "rotateY(180deg)"; 
                turnedCards.push(i);
                
                if(turnedCards.length>=2){
                     turnable = false;
                    setTimeout(function(){
                    //alert(turnedCards);  
                    var same = compareCards();
                    if(same==true){
                        //greenShadow
                        allCards[turnedCards[0]].style.boxShadow = "0px 0px 20px 3px rgba(15,219,4,1)";
                        allRightTurnedCards.push(turnedCards[0]);
                         allCards[turnedCards[1]].style.boxShadow = "0px 0px 20px 3px rgba(15,219,4,1)";
                        allRightTurnedCards.push(turnedCards[1]);
                        audioTada.play();
                    }else{
                        //turnBack
                        allCards[turnedCards[0]].style.transform = "rotateY(0deg)";
                        allCards[turnedCards[1]].style.transform = "rotateY(0deg)";
                    }
                        turnable = true;
                 turnedCards = [];   
                  gameWon();//checks if the game is already won  
               },1000)  
                    
            }
            }
            
        } 
        
        function compareCards(){
            
            
            
            var firstCard = allCards[turnedCards[0]].childNodes[1].childNodes[3].src;
            var secondCard = allCards[turnedCards[1]].childNodes[1].childNodes[3].src;
            /*alert(firstCard + "?");
            firstCard = firstCard.childNodes[1];
            alert(firstCard + "?");
            firstCard = firstCard.childNodes[3];
            alert(firstCard + "?");
             firstCard = firstCard.src;
            alert(firstCard + "?");
            */
            
            if(firstCard == secondCard){
                return true;
            }else{
                return false;
            }
            
            
        }
        
        function gameWon()
        {
            if(allRightTurnedCards.length >= 16){
                blurrerP.style.display = "block";
                audioChher.play();
                turnedCardsNumber = 0;   
                turnable = true;  
                turnedCards=[]; 
                allRightTurnedCards = [];
            }
        }
    }    
    
}