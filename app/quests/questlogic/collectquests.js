//This is going to actually hold all the logic for this quest type.
// Not sure when I should run this function, I guess i COULD do it onclick of the quest NPC. run the check then display "success text"

let questID = 1;  // Gunna gave to read this from the "context menu" once in game, IE player clicks on NPC, then selects quest. THEN this function is run.
let questComplete = false; // also the reason this is here rather than being declared inside the function is because I need it to be global scope. Spose I could use return tho but fuck you
let questInfo = []; // gunna have an array passed into this from the collects quest repo

function isComplete(questID, questInfo ){
if (amountNeeded === amountHeld){
      questComplete = true; 

}else {
  //fuck all atm mate
}
}; 


