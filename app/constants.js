const KEYS = {
	MOVE_LEFT: 65,
	MOVE_UP: 87,
	MOVE_DOWN: 83,
	MOVE_RIGHT: 68
};

const DIRECTION = {
	DOWN: 0,
	UP: 1,
	LEFT: 2,
	RIGHT: 3
};

const ITEM_FLAGS = {
	none: 0,
	blocking: (1 << 0),
	movable: (1 << 1)
};