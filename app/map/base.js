var map = {};

map.isBlocking = function(x, y, area) {
	if(!map.getArea(character.currentPosition.area)) {
		return false;
	}

	for(var i = 0; i < map.getArea(area).items.length; i++) {
		if(
			(map_items[map.getArea(area).items[i].item].flags & ITEM_FLAGS.blocking) &&
			(map.getArea(area).items[i].x + map.spriteSize.width >= x && map.getArea(area).items[i].x - character.spriteSize.width < x) &&
			(map.getArea(area).items[i].y + map.spriteSize.height >= y && map.getArea(area).items[i].y - character.spriteSize.height < y)
		) {
			return true;
		}
	}

	return false;
}

map.getArea = function(area) {
	return map["x:" + area.x + ",y:" + area.y];
}

map.spriteSize = {width: 32, height: 32};
/*
map["x:0,y:0"] = {
	items: [
		{x: 10, y: 34, item: 0},
		{x: 256, y: 315, item: 0},
		{x: 22, y: 333, item: 0},
		{x: 215, y: 50, item: 0},
		{x: 30, y: 88, item: 0},
		{x: 100, y: 100, item: 1},
		{x: 440, y: 100, item: 1},
		{x: 340, y: 384, item: 1},
		{x: 190, y: 100, item: 1},
		{x: 200, y: 400, item: 1},
		{x: 210, y: 250, item: 1},
		{x: 300, y: 300, item: 2},
		{x: 570, y: 55, item: 2},
		{x: 580, y: 350, item: 2},
		{x: 600, y: 440, item: 2}
	]
};*/
map["x:0,y:0"]={items:[{x:224,y:220,item:0},{x:160,y:252,item:0},{x:128,y:252,item:0},{x:288,y:220,item:0},{x:256,y:252,item:0},{x:0,y:188,item:1},{x:128,y:188,item:1},{x:160,y:188,item:1},{x:64,y:188,item:1},{x:96,y:188,item:1},{x:32,y:188,item:1},{x:256,y:220,item:0},{x:288,y:252,item:0},{x:224,y:252,item:0},{x:192,y:220,item:0},{x:160,y:220,item:0},{x:192,y:252,item:0},{x:128,y:220,item:0},{x:96,y:220,item:0},{x:96,y:252,item:0},{x:64,y:220,item:0},{x:64,y:252,item:0},{x:32,y:220,item:0},{x:32,y:252,item:0},{x:0,y:252,item:0},{x:0,y:220,item:0},{x:192,y:188,item:1},{x:224,y:188,item:1},{x:256,y:188,item:1},{x:288,y:188,item:1},{x:0,y:284,item:1},{x:32,y:284,item:1},{x:64,y:284,item:1},{x:96,y:284,item:1},{x:128,y:284,item:1},{x:160,y:284,item:1},{x:192,y:284,item:1},{x:224,y:284,item:1},{x:256,y:284,item:1},{x:288,y:284,item:1},{x:320,y:188,item:1},{x:320,y:284,item:1},{x:320,y:156,item:1},{x:352,y:284,item:1},{x:384,y:284,item:1},{x:416,y:284,item:1},{x:416,y:252,item:1},{x:416,y:220,item:1},{x:416,y:188,item:1},{x:416,y:156,item:1},{x:416,y:124,item:1},{x:320,y:124,item:1},{x:352,y:124,item:1},{x:384,y:124,item:1},{x:320,y:220,item:0},{x:320,y:252,item:0},{x:384,y:252,item:0},{x:352,y:188,item:0},{x:352,y:252,item:0},{x:352,y:220,item:0},{x:384,y:220,item:0},{x:384,y:188,item:0},{x:352,y:156,item:0},{x:384,y:156,item:0}]};
map["x:-1,y:0"]={items:[{x:608,y:220,item:0},{x:608,y:252,item:0},{x:608,y:188,item:1},{x:608,y:284,item:1}]};