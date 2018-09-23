var character = {};
character.spriteSize = {width: 32, height: 32, sourceWidth: 36, sourceHeight: 36};
character.stats = {
	health: 100,
	healthMax: 100,
	attack: 0,
	defense: 0,
	attackSpeed: 500,
	movementSpeed: 100//movementSpeed should always be >= 60
};
character.lastMovement = 0;
character.movementStatesTotal = 2;
character.lastMovementAnimation = 0;
character.isFrozen = false;

character.moveArea = function(direction) {
	if(direction == DIRECTION.DOWN) {
		this.currentPosition.area.y++;
		this.currentPosition.y = 0;
	} else if(direction == DIRECTION.UP) {
		this.currentPosition.area.y--;
		this.currentPosition.y = gameCanvas.height - character.spriteSize.height;
	} else if(direction == DIRECTION.LEFT) {
		this.currentPosition.area.x--;
		this.currentPosition.x = gameCanvas.width - character.spriteSize.width;
	} else if(direction == DIRECTION.RIGHT) {
		this.currentPosition.area.x++;
		this.currentPosition.x = 0;
	}

	map.enterArea(character.currentPosition.area);
}