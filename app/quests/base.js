var quests = {};

quests.getKillQuestById = function(id) {
	for(var key in killQuests) {
		if(key == id) {
			let q = cloneObj(killQuests[key]);
			q.requiredKills = cloneObj(killQuests[key].requiredKills);
			return q;
		}
	}
}