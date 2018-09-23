function cloneObj(_fromObj) {
	if(!_fromObj || typeof _fromObj !== "object") {
		return null;
	}

	let _tmpObj = _fromObj.constructor();
	for(var _fromKey in _fromObj) {
		_tmpObj[_fromKey] = _fromObj[_fromKey];
	}

	return _tmpObj;
}