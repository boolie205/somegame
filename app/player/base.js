var characterSprite = new Image();
characterSprite.src = "images/character/default.png";

var spriteSize = {width: 36, height: 36};

characterSprite.onload = function() {
	window.requestAnimationFrame(mainLoop);
};