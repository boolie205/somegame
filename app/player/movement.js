character.movementState = 0;
character.currentPosition = {x: (gameCanvas.width / 2) - (character.spriteSize.width / 2), y: (gameCanvas.height / 2) - (character.spriteSize.height / 2), direction: DIRECTION.DOWN};

character.isMoving = function() {
	let tempMoving = false;
	Object.values(keyState).forEach(function(e) {
		if(e === true) {
			tempMoving = true;
		}
	});

	return tempMoving;
}