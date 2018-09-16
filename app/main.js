var gameCanvas = document.getElementsByTagName("canvas")[0];
var gameCanvasContext = gameCanvas.getContext("2d");

function mainLoop() {
	gameCanvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

	gameCanvasContext.drawImage(characterSprite, 0, 0, spriteSize.width, spriteSize.height, 0, 0, spriteSize.width, spriteSize.height);
	//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

	window.requestAnimationFrame(mainLoop);
}

