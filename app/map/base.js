var map = {};

map.isBlocking = function(x, y, area) {
	if(!map.getArea(character.currentPosition.area)) {
		return false;
	}

	for(var i = 0; i < map.getArea(area).items.length; i++) {
		if(
			(map_items[map.getArea(area).items[i].item].flags & ITEM_FLAGS.blocking) &&
			(map.getArea(area).items[i].x + map.spriteSize.width > x && map.getArea(area).items[i].x - character.spriteSize.width < x) &&
			(map.getArea(area).items[i].y + map.spriteSize.height > y && map.getArea(area).items[i].y - character.spriteSize.height < y)
		) {
			return true;
		}
	}
	
	if(monsters) {
		for(var mk in monsters) {
			if(
				(monsters[mk].position.x + 32 > x && monsters[mk].position.x - 32 < x) &&
				(monsters[mk].position.y + 32 > y && monsters[mk].position.y - 32 < y)
			) {
				return true;
			}
		}
	}

	return false;
}

map.monsterAtPosition = function(x, y) {
	if(monsters) {
		for(var mk in monsters) {
			if(
				(monsters[mk].position.x + 32 > x && monsters[mk].position.x - 32 < x) &&
				(monsters[mk].position.y + 32 > y && monsters[mk].position.y - 32 < y)
			) {
				return monsters[mk];
			}
		}
	}

	return null;
}

map.enterArea = function(area) {
	monsters = {};
	if(area.monsters) {
		for(var k in area.monsters) {
			let currentMonster = cloneObj(monsterTypes[area.monsters[k].name]);
			currentMonster.position = {x: area.monsters[k].x, y: area.monsters[k].y};
			currentMonster.stats = cloneObj(currentMonster.stats);
			monsters[Object.keys(monsters).length] = currentMonster;
		}
	}
	character.attackingMonster = null;
};

map.getArea = function(area) {
	return map["x:" + area.x + ",y:" + area.y];
}

map.spriteSize = {width: 32, height: 32};

map["x:0,y:0"]={items:[{x:224,y:224,item:0},{x:160,y:256,item:0},{x:128,y:256,item:0},{x:288,y:224,item:0},{x:256,y:256,item:0},{x:32,y:448,item:1},{x:256,y:224,item:0},{x:288,y:256,item:0},{x:192,y:224,item:0},{x:160,y:224,item:0},{x:192,y:256,item:0},{x:128,y:224,item:0},{x:96,y:224,item:0},{x:96,y:256,item:0},{x:64,y:224,item:0},{x:64,y:256,item:0},{x:32,y:224,item:0},{x:32,y:256,item:0},{x:0,y:256,item:0},{x:0,y:224,item:0},{x:0,y:288,item:1},{x:320,y:224,item:0},{x:320,y:256,item:0},{x:384,y:256,item:0},{x:352,y:192,item:0},{x:352,y:256,item:0},{x:352,y:224,item:0},{x:384,y:224,item:0},{x:384,y:192,item:0},{x:224,y:256,item:0},{x:384,y:160,item:0},{x:0,y:320,item:1},{x:32,y:0,item:1},{x:0,y:32,item:1},{x:0,y:64,item:1},{x:0,y:96,item:1},{x:0,y:128,item:1},{x:0,y:160,item:1},{x:0,y:352,item:1},{x:0,y:384,item:1},{x:0,y:416,item:1},{x:0,y:448,item:1},{x:64,y:0,item:1},{x:96,y:0,item:1},{x:128,y:0,item:1},{x:160,y:0,item:1},{x:192,y:0,item:1},{x:224,y:0,item:1},{x:256,y:0,item:1},{x:288,y:0,item:1},{x:320,y:0,item:1},{x:352,y:0,item:1},{x:384,y:0,item:1},{x:416,y:0,item:1},{x:448,y:0,item:1},{x:480,y:0,item:1},{x:512,y:0,item:1},{x:544,y:0,item:1},{x:576,y:0,item:1},{x:608,y:0,item:1},{x:64,y:448,item:1},{x:96,y:448,item:1},{x:128,y:448,item:1},{x:160,y:448,item:1},{x:192,y:448,item:1},{x:224,y:448,item:1},{x:256,y:448,item:1},{x:288,y:448,item:1},{x:320,y:448,item:1},{x:352,y:448,item:1},{x:384,y:448,item:1},{x:416,y:448,item:1},{x:448,y:448,item:1},{x:480,y:448,item:1},{x:512,y:448,item:1},{x:544,y:448,item:1},{x:576,y:448,item:1},{x:608,y:448,item:1},{x:608,y:64,item:1},{x:608,y:96,item:1},{x:608,y:128,item:1},{x:608,y:160,item:1},{x:608,y:192,item:1},{x:608,y:224,item:1},{x:608,y:256,item:1},{x:608,y:288,item:1},{x:608,y:320,item:1},{x:608,y:352,item:1},{x:608,y:384,item:1},{x:608,y:416,item:1},{x:608,y:32,item:1},{x:0,y:0,item:1},{x:32,y:32,item:0},{x:32,y:64,item:0},{x:32,y:96,item:0},{x:32,y:128,item:0},{x:32,y:160,item:0},{x:32,y:192,item:0},{x:32,y:288,item:0},{x:32,y:320,item:0},{x:32,y:352,item:0},{x:32,y:384,item:0},{x:32,y:416,item:0},{x:64,y:32,item:0},{x:64,y:64,item:0},{x:64,y:96,item:0},{x:64,y:128,item:0},{x:64,y:160,item:0},{x:64,y:192,item:0},{x:64,y:288,item:0},{x:64,y:320,item:0},{x:64,y:352,item:0},{x:64,y:384,item:0},{x:64,y:416,item:0},{x:96,y:32,item:0},{x:96,y:64,item:0},{x:96,y:96,item:0},{x:96,y:128,item:0},{x:96,y:160,item:0},{x:96,y:192,item:0},{x:96,y:288,item:0},{x:96,y:320,item:0},{x:96,y:352,item:0},{x:96,y:384,item:0},{x:96,y:416,item:0},{x:128,y:32,item:0},{x:128,y:64,item:0},{x:128,y:96,item:0},{x:128,y:128,item:0},{x:128,y:160,item:0},{x:128,y:192,item:0},{x:128,y:288,item:0},{x:128,y:320,item:0},{x:128,y:352,item:0},{x:128,y:384,item:0},{x:128,y:416,item:0},{x:160,y:32,item:0},{x:160,y:64,item:0},{x:160,y:96,item:0},{x:160,y:128,item:0},{x:160,y:160,item:0},{x:160,y:192,item:0},{x:160,y:288,item:0},{x:160,y:320,item:0},{x:160,y:352,item:0},{x:160,y:384,item:0},{x:160,y:416,item:0},{x:192,y:32,item:0},{x:192,y:64,item:0},{x:192,y:96,item:0},{x:192,y:128,item:0},{x:192,y:160,item:0},{x:192,y:192,item:0},{x:192,y:288,item:0},{x:192,y:320,item:0},{x:192,y:352,item:0},{x:192,y:384,item:0},{x:192,y:416,item:0},{x:224,y:32,item:0},{x:224,y:64,item:0},{x:224,y:96,item:0},{x:224,y:128,item:0},{x:224,y:160,item:0},{x:224,y:192,item:0},{x:224,y:288,item:0},{x:224,y:320,item:0},{x:224,y:352,item:0},{x:224,y:384,item:0},{x:224,y:416,item:0},{x:256,y:32,item:0},{x:256,y:64,item:0},{x:256,y:96,item:0},{x:256,y:128,item:0},{x:256,y:160,item:0},{x:256,y:192,item:0},{x:256,y:288,item:0},{x:256,y:320,item:0},{x:256,y:352,item:0},{x:256,y:384,item:0},{x:256,y:416,item:0},{x:288,y:32,item:0},{x:288,y:64,item:0},{x:288,y:96,item:0},{x:288,y:128,item:0},{x:288,y:160,item:0},{x:288,y:192,item:0},{x:288,y:288,item:0},{x:288,y:320,item:0},{x:288,y:352,item:0},{x:288,y:384,item:0},{x:288,y:416,item:0},{x:320,y:32,item:0},{x:320,y:64,item:0},{x:320,y:96,item:0},{x:320,y:128,item:0},{x:320,y:160,item:0},{x:320,y:192,item:0},{x:320,y:288,item:0},{x:320,y:320,item:0},{x:320,y:352,item:0},{x:320,y:384,item:0},{x:320,y:416,item:0},{x:352,y:32,item:0},{x:352,y:64,item:0},{x:352,y:96,item:0},{x:352,y:128,item:0},{x:352,y:160,item:0},{x:352,y:288,item:0},{x:352,y:320,item:0},{x:352,y:352,item:0},{x:352,y:384,item:0},{x:352,y:416,item:0},{x:384,y:32,item:0},{x:384,y:64,item:0},{x:384,y:96,item:0},{x:384,y:128,item:0},{x:384,y:288,item:0},{x:384,y:320,item:0},{x:384,y:352,item:0},{x:384,y:384,item:0},{x:384,y:416,item:0},{x:416,y:32,item:0},{x:416,y:64,item:0},{x:416,y:96,item:0},{x:416,y:128,item:0},{x:416,y:160,item:0},{x:416,y:192,item:0},{x:416,y:224,item:0},{x:416,y:256,item:0},{x:416,y:288,item:0},{x:416,y:320,item:0},{x:416,y:352,item:0},{x:416,y:384,item:0},{x:416,y:416,item:0},{x:448,y:32,item:0},{x:448,y:64,item:0},{x:448,y:96,item:0},{x:448,y:128,item:0},{x:448,y:160,item:0},{x:448,y:192,item:0},{x:448,y:224,item:0},{x:448,y:256,item:0},{x:448,y:288,item:0},{x:448,y:320,item:0},{x:448,y:352,item:0},{x:448,y:384,item:0},{x:448,y:416,item:0},{x:480,y:32,item:0},{x:480,y:64,item:0},{x:480,y:96,item:0},{x:480,y:128,item:0},{x:480,y:160,item:0},{x:480,y:192,item:0},{x:480,y:224,item:0},{x:480,y:256,item:0},{x:480,y:288,item:0},{x:480,y:320,item:0},{x:480,y:352,item:0},{x:480,y:384,item:0},{x:480,y:416,item:0},{x:512,y:32,item:0},{x:512,y:64,item:0},{x:512,y:96,item:0},{x:512,y:128,item:0},{x:512,y:160,item:0},{x:512,y:192,item:0},{x:512,y:224,item:0},{x:512,y:256,item:0},{x:512,y:288,item:0},{x:512,y:320,item:0},{x:512,y:352,item:0},{x:512,y:384,item:0},{x:512,y:416,item:0},{x:544,y:32,item:0},{x:544,y:64,item:0},{x:544,y:96,item:0},{x:544,y:128,item:0},{x:544,y:160,item:0},{x:544,y:192,item:0},{x:544,y:224,item:0},{x:544,y:256,item:0},{x:544,y:288,item:0},{x:544,y:320,item:0},{x:544,y:352,item:0},{x:544,y:384,item:0},{x:544,y:416,item:0},{x:576,y:32,item:0},{x:576,y:64,item:0},{x:576,y:96,item:0},{x:576,y:128,item:0},{x:576,y:160,item:0},{x:576,y:192,item:0},{x:576,y:224,item:0},{x:576,y:256,item:0},{x:576,y:288,item:0},{x:576,y:320,item:0},{x:576,y:352,item:0},{x:576,y:384,item:0},{x:576,y:416,item:0},{x:0,y:192,item:0}],monsters:[{x:480,y:288,name:"Fagmingo"},{x:64,y:128,name:"Fagmingo"}]};
map["x:-1,y:0"]={items:[{x:576,y:160,item:1},{x:608,y:160,item:1},{x:608,y:288,item:1},{x:576,y:288,item:1},{x:544,y:160,item:1},{x:544,y:128,item:1},{x:512,y:128,item:1},{x:544,y:288,item:1},{x:544,y:320,item:1},{x:512,y:320,item:1},{x:384,y:128,item:1},{x:320,y:96,item:1},{x:352,y:96,item:1},{x:256,y:96,item:1},{x:224,y:128,item:1},{x:288,y:96,item:1},{x:384,y:96,item:1},{x:416,y:128,item:1},{x:448,y:128,item:1},{x:224,y:96,item:1},{x:480,y:128,item:1},{x:480,y:320,item:1},{x:448,y:320,item:1},{x:416,y:320,item:1},{x:352,y:352,item:1},{x:224,y:320,item:1},{x:224,y:352,item:1},{x:288,y:352,item:1},{x:256,y:352,item:1},{x:384,y:352,item:1},{x:320,y:352,item:1},{x:384,y:320,item:1},{x:224,y:160,item:1},{x:224,y:192,item:1},{x:224,y:288,item:1},{x:224,y:256,item:1},{x:224,y:224,item:1},{x:256,y:128,item:2},{x:288,y:128,item:2},{x:320,y:128,item:2},{x:352,y:128,item:2},{x:384,y:160,item:2},{x:416,y:160,item:2},{x:448,y:160,item:2},{x:480,y:160,item:2},{x:512,y:160,item:2},{x:352,y:160,item:2},{x:512,y:192,item:2},{x:544,y:192,item:2},{x:576,y:192,item:2},{x:608,y:192,item:2},{x:608,y:224,item:2},{x:608,y:256,item:2},{x:576,y:256,item:2},{x:544,y:256,item:2},{x:512,y:256,item:2},{x:512,y:288,item:2},{x:480,y:288,item:2},{x:448,y:288,item:2},{x:416,y:288,item:2},{x:384,y:288,item:2},{x:352,y:288,item:2},{x:352,y:320,item:2},{x:320,y:320,item:2},{x:288,y:320,item:2},{x:256,y:320,item:2},{x:256,y:160,item:2},{x:256,y:192,item:2},{x:256,y:224,item:2},{x:256,y:256,item:2},{x:256,y:288,item:2},{x:288,y:160,item:2},{x:320,y:160,item:2},{x:320,y:288,item:2},{x:288,y:288,item:2},{x:576,y:224,item:2},{x:544,y:224,item:2},{x:512,y:224,item:2},{x:480,y:192,item:2},{x:480,y:224,item:2},{x:480,y:256,item:2},{x:288,y:256,item:2},{x:320,y:256,item:2},{x:352,y:256,item:2},{x:384,y:256,item:2},{x:416,y:256,item:2},{x:448,y:256,item:2},{x:288,y:224,item:2},{x:288,y:192,item:2},{x:320,y:192,item:2},{x:352,y:192,item:2},{x:384,y:192,item:2},{x:416,y:192,item:2},{x:448,y:192,item:2},{x:320,y:224,item:2},{x:352,y:224,item:2},{x:384,y:224,item:2},{x:416,y:224,item:2},{x:448,y:224,item:2}]};