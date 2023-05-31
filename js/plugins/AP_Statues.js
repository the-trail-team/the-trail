// Window_Statues

function Window_Statues() {
    this.initialize.apply(this, arguments);
}

Window_Statues.prototype = Object.create(Window_Selectable.prototype);
Window_Statues.prototype.constructor = Window_Statues;

Window_Statues.prototype.initialize = function() {
    Window_Selectable.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._data = [];
    this.refresh();
    this.select(this._data.findIndex(s => s[4] == $gameMap.mapId()))
    this.activate();
};

Window_Statues.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_Statues.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Window_Statues.prototype.isEnabled = function(statue) {
    return statue[3];
};

Window_Statues.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_Statues.prototype.makeItemList = function() {
    this._data = [];
    states = $dataStates.filter(s => s).filter(s => s.meta["Statue Icon"] && s.meta["Statue Buff"]);
    states.forEach(s => {
        var statue = [];
        statue[0] = s.meta["Statue Icon"]; // Icon
        statue[1] = s.name.replace("Statue - ", ""); // Name
        statue[2] = s.meta["Statue Buff"]; // Buff Display
        statue[3] = s.passiveConditionEval(); // Discovered
        statue[4] = s.passiveConditionEval.toString().match(/\$gameSystem\.statue\((\d+)\)/i)[1]; // Map ID
        if (!statue[3]) {
            statue[0] = 635;
            statue[1] = "???";
            statue[2] = "???";
        }
        this._data.push(statue);
    }, this);
};

Window_Statues.prototype.drawItem = function(index) {
    var statue = this._data[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(statue));
    this.drawItemName(statue, rect.x, rect.y, rect.width);
    this.drawText(statue[2], rect.x, rect.y, rect.width, 'right');
    this.changePaintOpacity(true);
};

Window_Statues.prototype.drawItemName = function(statue, x, y, width) {
    var iconWidth = Window_Base._iconWidth + 4;
    this.drawIcon(statue[0], x + 2, y + 2);
    this.drawText(statue[1], x + iconWidth, y, width - iconWidth);
};

// Scene_Statues

function Scene_Statues() {
    this.initialize.apply(this, arguments);
}

Scene_Statues.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Statues.prototype.constructor = Scene_Statues;

Scene_Statues.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Statues.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createStatueWindow();
};

Scene_Statues.prototype.createStatueWindow = function() {
    this._statueWindow = new Window_Statues();
    this._statueWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._statueWindow);
};