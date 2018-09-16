var characterSprite = new Image();
characterSprite.src = "images/character/default.png";

var character = {};
character.spriteSize = {width: 36, height: 36};
character.stats = {
	attack: 0,
	defense: 0,
	attackSpeed: 500,
	movementSpeed: 100
};
character.lastMovement = 0;
character.lastMovementAnimation = 0;

characterSprite.onload = function() {
	window.requestAnimationFrame(mainLoop);
};