Galv.FISH.ponds = {
    "The Promenade": [
        [1, 12, true],
        [3, 12, true]
    ],
    "Lake of Telluria": [
        [1, 8, true],
        [2, 16, true]
    ],
    "North Telluria Field": [
        [2, 5, true],
        [4, 5, '$gameSwitches.value(69)']
    ],
    "Fish-Flavored Fish": [
        [5, 1, true]
    ]
}

Galv.FISH.initPond = function(name) {
    pond = $gameSystem.fishing.ponds[name];
    pond.forEach(fish => {
        const cond = eval(this.ponds[name].find(f => f[0] == fish)[2]);
        if (cond) this.addFish(fish);
    });
};

Game_System.prototype.initPonds = function() {
    this.fishing.ponds = {};
    for (const key in Galv.FISH.ponds) {
        const pondData = Galv.FISH.ponds[key];
        pond = this.fishing.ponds[key] = [];
        pondData.forEach(fish => {
            while (pond.filter(id => id == fish[0]).length < fish[1]) pond.push(fish[0]);
        });
    }
};

__Game_System_prototype_initialize__ = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    __Game_System_prototype_initialize__.call(this);
    this.initPonds();
};

__Scene_Fishing_prototype_caughtFish__ = Scene_Fishing.prototype.caughtFish;
Scene_Fishing.prototype.caughtFish = function(fish) {
    __Scene_Fishing_prototype_caughtFish__.call(this, fish);
    // Code to remove fish from current fishing spot
};