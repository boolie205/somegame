$(document).ready(function() {
  var questtitle = document.getElementById("questtitle");
  var questsummery = document.getElementById("questsummery");
  var questtext = document.getElementById("questtext");
  var questContext = demonquest;

   
  questtitle.innerHTML = questContext.name;
  questsummery.innerHTML = questContext.description;
  npctext.innerHTML = questContext.npctext;
  questtext.innerHTML = "You will recieve" + " " + questContext.reward;
  


});