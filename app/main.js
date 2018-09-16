var gameCanvas = document.getElementsByTagName("canvas")[0];
var gameCanvasContext = gameCanvas.getContext("2d");

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

function mainLoop() {
	if(character.isMoving()) {
		if(character.lastMovement < Math.round((new Date()).getTime()) - character.stats.movementSpeed) {
			if(character.lastMovementAnimation < Math.round((new Date()).getTime()) - 100) {
				character.movementState = (character.movementState < 3 ? character.movementState + 1 : 0);
				character.lastMovementAnimation = Math.round((new Date()).getTime());
			}
			
			if(keyState[KEYS.MOVE_DOWN]) {
				if(character.currentPosition.direction != DIRECTION.DOWN) {
					character.currentPosition.direction = DIRECTION.DOWN;
				}

				character.currentPosition.y += 4;
			} else if(keyState[KEYS.MOVE_UP]) {
				if(character.currentPosition.direction != DIRECTION.UP) {
					character.currentPosition.direction = DIRECTION.UP;
				}

				character.currentPosition.y -= 4;
			} else if(keyState[KEYS.MOVE_LEFT]) {
				if(character.currentPosition.direction != DIRECTION.LEFT) {
					character.currentPosition.direction = DIRECTION.LEFT;
				}

				character.currentPosition.x -= 4;
			} else if(keyState[KEYS.MOVE_RIGHT]) {
				if(character.currentPosition.direction != DIRECTION.RIGHT) {
					character.currentPosition.direction = DIRECTION.RIGHT;
				}

				character.currentPosition.x += 4;
			}
			character.lastMovement = Math.round((new Date()).getTime());
		}
	} else if(character.movementState != 0) {
		character.movementState = 0;
	}

	gameCanvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	gameCanvasContext.drawImage(
		characterSprite,
		character.movementState * character.spriteSize.width, character.currentPosition.direction * character.spriteSize.height,
		character.spriteSize.width, character.spriteSize.height,
		character.currentPosition.x, character.currentPosition.y,
		character.spriteSize.width, character.spriteSize.height
	);

	window.requestAnimationFrame(mainLoop);
}