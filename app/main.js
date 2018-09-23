var gameCanvas = document.getElementsByTagName("canvas")[0];
var gameCanvasContext = gameCanvas.getContext("2d");

var characterSprite = new Image();
var mapItems = [];
var monsterImages = [];

for(var itemKey in map_items) {
	mapItems[itemKey] = new Image();
	mapItems[itemKey].src = 'images/map_items/' + itemKey + '.png';
}

for(var monsterKey in monsterTypes) {
	monsterImages[monsterKey] = new Image();
	monsterImages[monsterKey].src = 'images/monster/' + monsterKey.toLowerCase() + '.png';
}

characterSprite.src = "images/character/default.png";

$(window).ready(function() {
	map.enterArea(character.currentPosition.area);
	setTimeout(movementLoop, 0);
	window.requestAnimationFrame(mainLoop);
});

var lastMoveAnimation = 0;
var keyState = {};
var keysToStateSwitch = [
	KEYS.MOVE_LEFT,
	KEYS.MOVE_RIGHT,
	KEYS.MOVE_UP,
	KEYS.MOVE_DOWN
];

$(window).keydown(function(e) {
	if(keysToStateSwitch.includes(e.keyCode)) {
		keyState[e.keyCode] = true;
	}
});

$(window).keyup(function(e) {
	if(keysToStateSwitch.includes(e.keyCode)) {
		keyState[e.keyCode] = false;
	}
});

function drawHealthBar() {
	gameCanvasContext.fillStyle = "#000000";
	gameCanvasContext.fillRect(character.currentPosition.x, character.currentPosition.y - 12, character.spriteSize.width, 6);
	let characterHealthPercentage = (100 / character.stats.healthMax) * character.stats.health;
	let healthBarMaxWidth = character.spriteSize.width - 4;
	gameCanvasContext.fillStyle = (characterHealthPercentage > 50 ? "#00FF00" : (characterHealthPercentage > 33 ? "#FFFF00" : "#FF0000"));
	gameCanvasContext.fillRect(character.currentPosition.x + 2, character.currentPosition.y - 10, (healthBarMaxWidth / 100) * characterHealthPercentage, 2);
}

function movementLoop() {
	if(character.isMoving() && !character.isFrozen) {
		if(character.lastMovement < Math.round((new Date()).getTime()) - character.stats.movementSpeed) {
			if(character.lastMovementAnimation < Math.round((new Date()).getTime()) - 100) {
				character.movementState = (character.movementState < character.movementStatesTotal ? character.movementState + 1 : 0);
				character.lastMovementAnimation = Math.round((new Date()).getTime());
			}
			
			if(keyState[KEYS.MOVE_DOWN]) {
				if(character.currentPosition.direction != DIRECTION.DOWN) {
					character.currentPosition.direction = DIRECTION.DOWN;
				}

				if(!map.isBlocking(character.currentPosition.x, character.currentPosition.y + 32, character.currentPosition.area)) {
					if(character.currentPosition.y + character.spriteSize.height + 1 > gameCanvas.height) {
						character.moveArea(DIRECTION.DOWN);
					} else {
						character.currentPosition.y += 32;
					}
				}
			} else if(keyState[KEYS.MOVE_UP]) {
				if(character.currentPosition.direction != DIRECTION.UP) {
					character.currentPosition.direction = DIRECTION.UP;
				}

				if(!map.isBlocking(character.currentPosition.x, character.currentPosition.y - 32, character.currentPosition.area)) {
					if(character.currentPosition.y - 1 < 0) {
						character.moveArea(DIRECTION.UP);
					} else {
						character.currentPosition.y -= 32;
					}
				}
			} else if(keyState[KEYS.MOVE_LEFT]) {
				if(character.currentPosition.direction != DIRECTION.LEFT) {
					character.currentPosition.direction = DIRECTION.LEFT;
				}

				if(!map.isBlocking(character.currentPosition.x - 32, character.currentPosition.y, character.currentPosition.area)) {
					if(character.currentPosition.x - 1 < 0) {
						character.moveArea(DIRECTION.LEFT);
					} else {
						character.currentPosition.x -= 32;
					}
				}
			} else if(keyState[KEYS.MOVE_RIGHT]) {
				if(character.currentPosition.direction != DIRECTION.RIGHT) {
					character.currentPosition.direction = DIRECTION.RIGHT;
				}

				if(!map.isBlocking(character.currentPosition.x + 32, character.currentPosition.y, character.currentPosition.area)) {
					if(character.currentPosition.x + character.spriteSize.width + 1 > gameCanvas.width) {
						character.moveArea(DIRECTION.RIGHT);
					} else {
						character.currentPosition.x += 32;
					}
				}
			}
			character.lastMovement = Math.round((new Date()).getTime());
		}
	} else if(character.movementState != 0) {
		character.movementState = 0;
	}

	setTimeout(movementLoop, 0);
}

function mainLoop() {
	gameCanvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);	

	if(map.getArea(character.currentPosition.area)) {
		let currentArea = map.getArea(character.currentPosition.area);
		for(var ii = 0; ii < currentArea.items.length; ii++) {
			gameCanvasContext.drawImage(mapItems[currentArea.items[ii].item], currentArea.items[ii].x, currentArea.items[ii].y);
		}

		if(currentArea.monsters) {
		for(var mi = 0; mi < currentArea.monsters.length; mi++) {
				gameCanvasContext.drawImage(
					monsterImages[currentArea.monsters[mi].name],
					0, 0,
					32, 32,
					currentArea.monsters[mi].x, currentArea.monsters[mi].y,
					32, 32
				);
			}
		}
	}

	gameCanvasContext.drawImage(
		characterSprite,
		character.movementState * character.spriteSize.sourceWidth, character.currentPosition.direction * character.spriteSize.sourceHeight,
		character.spriteSize.sourceWidth, character.spriteSize.sourceHeight,
		character.currentPosition.x, character.currentPosition.y,
		character.spriteSize.width, character.spriteSize.height
	);
	drawHealthBar();

	window.requestAnimationFrame(mainLoop);
}