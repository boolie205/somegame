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
	currentQuests[0] = quests.getKillQuestById(0);
	map.enterArea(map.getArea(character.currentPosition.area));
	setTimeout(movementLoop, 0);
	setTimeout(doCombat, 0);
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

function getDistanceBetween(s, d){
	let dx = (s.x / 32) - (d.x / 32);
	let dy = (s.y / 32) - (d.y / 32);
	return Math.floor(Math.sqrt(dx*dx + dy*dy));
}

function onKill(monster) {//here you can add to quest and shit later
	for(var k in currentQuests) {
		let currentQuest = currentQuests[k];
		if(currentQuest.type == "kill") {
			for(var x = 0; x < currentQuest.requiredKills.length; x++) {
				for(var i in currentQuest.requiredKills[x]) {
					if(i == monster.name) {
						if(currentQuest.requiredKills[x][i] > currentQuest.requiredKills[x].progress + 1) {
							currentQuest.requiredKills[x].progress++;
						} else {
							currentQuest.requiredKills[x].progress++;
							completedQuests[completedQuests.length] = currentQuest;
							delete currentQuests[k];
						}
					}
				}
			}
		}
	}
}

function doCombat() {
	if(character.lastCombat < Math.round((new Date()).getTime()) - character.stats.attackSpeed) {
		if(character.attackingMonster) {
			if(getDistanceBetween(character.currentPosition, character.attackingMonster.position) <= character.inventory.weapon.range) {
				let attackStrength = Math.floor(Math.random() * (character.inventory.weapon.attack - (character.inventory.weapon.hitChance / 100)) + (character.inventory.weapon.hitChance / 100));
				character.attackingMonster.stats.health = (character.attackingMonster.stats.health - attackStrength > 0 ? character.attackingMonster.stats.health - attackStrength : 0);
				if(character.attackingMonster.stats.health == 0) {
					for(var m in monsters) {
						if(monsters[m] == character.attackingMonster) {
							onKill(character.attackingMonster);
							delete monsters[m];
							break;
						}
					}
					character.attackingMonster = null;
				}
				character.lastCombat = Math.round((new Date()).getTime());
			}
		}
	}
	setTimeout(doCombat, 0);
}

function drawHealthBar() {
	gameCanvasContext.fillStyle = "#000000";
	gameCanvasContext.fillRect(character.currentPosition.x, character.currentPosition.y - 12, character.spriteSize.width, 6);
	let characterHealthPercentage = (100 / character.stats.healthMax) * character.stats.health;
	let healthBarMaxWidth = character.spriteSize.width - 4;
	gameCanvasContext.fillStyle = (characterHealthPercentage > 50 ? "#00FF00" : (characterHealthPercentage > 33 ? "#FFFF00" : "#FF0000"));
	gameCanvasContext.fillRect(character.currentPosition.x + 2, character.currentPosition.y - 10, (healthBarMaxWidth / 100) * characterHealthPercentage, 2);
}

function drawMonsterHealthBar(monster) {
	gameCanvasContext.fillStyle = "#000000";
	gameCanvasContext.fillRect(monster.position.x, monster.position.y - 12, 32, 6);
	let monsterHealthPercentage = (100 / monster.stats.healthMax) * monster.stats.health;
	let healthBarMaxWidth = 28;
	gameCanvasContext.fillStyle = (monsterHealthPercentage > 50 ? "#00FF00" : (monsterHealthPercentage > 33 ? "#FFFF00" : "#FF0000"));
	gameCanvasContext.fillRect(monster.position.x + 2, monster.position.y - 10, (healthBarMaxWidth / 100) * monsterHealthPercentage, 2);
	gameCanvasContext.font = "10px Arial";
	gameCanvasContext.fillText(monster.name, monster.position.x - (gameCanvasContext.measureText(monster.name).width / 2) + 16, monster.position.y - 16);
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
	}

	gameCanvasContext.drawImage(
		characterSprite,
		character.movementState * character.spriteSize.sourceWidth, character.currentPosition.direction * character.spriteSize.sourceHeight,
		character.spriteSize.sourceWidth, character.spriteSize.sourceHeight,
		character.currentPosition.x, character.currentPosition.y,
		character.spriteSize.width, character.spriteSize.height
	);

	if(monsters) {
		for(var mk in monsters) {
			drawMonsterHealthBar(monsters[mk]);
			gameCanvasContext.drawImage(
				monsterImages[monsters[mk].name],
				0, 0,
				32, 32,
				monsters[mk].position.x, monsters[mk].position.y,
				32, 32
			);

			if(character.attackingMonster) {
				if(monsters[mk] == character.attackingMonster) {
					gameCanvasContext.save();
					gameCanvasContext.fillStyle = "#FF0000";
					gameCanvasContext.globalAlpha = 0.5;
					gameCanvasContext.fillRect(monsters[mk].position.x, monsters[mk].position.y, 32, 32);
					gameCanvasContext.restore();
				}
			}
		}
	}

	drawHealthBar();
	window.requestAnimationFrame(mainLoop);
}

$(gameCanvas).contextmenu(function(e) {
	let mouseX = e.clientX - e.target.offsetLeft;
	let mouseY = e.clientY - e.target.offsetTop;
	let monsterClick = map.monsterAtPosition(mouseX, mouseY);
	if(monsterClick) {
		if(character.attackingMonster) {
			character.attackingMonster = (monsterClick == character.attackingMonster ? null : monsterClick);
		} else {
			character.attackingMonster = monsterClick;
		}
	}
	return false;
});