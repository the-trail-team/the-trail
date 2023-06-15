// Scene_Collection

function Scene_Collection() {
    this.initialize.apply(this, arguments);
}

Scene_Collection.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Collection.prototype.constructor = Scene_Collection;

Scene_Collection.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Collection.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createWindows();
};

Scene_Collection.prototype.createWindows = function() {
    this.createListWindow();
    if (this.showSummaryWindow()) this.createSummaryWindow();
};

Scene_Collection.prototype.createListWindow = function() {
    if (this._listWindow) {
        this._listWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._listWindow);
    }
};

Scene_Collection.prototype.createSummaryWindow = function() {

};

Scene_Collection.prototype.showSummaryWindow = function() {
    return true;
};



// Scene_Statues

function Scene_Statues() {
    this.initialize.apply(this, arguments);
}

Scene_Statues.prototype = Object.create(Scene_Collection.prototype);
Scene_Statues.prototype.constructor = Scene_Collection;

Scene_Statues.prototype.initialize = function() {
    Scene_Collection.prototype.initialize.call(this);
};

Scene_Statues.prototype.createListWindow = function() {
    this._listWindow = new Window_Statues();
    Scene_Collection.prototype.createListWindow.call(this);
};



// Window_Collection

function Window_Collection() {
    this.initialize.apply(this, arguments);
}

Window_Collection.prototype = Object.create(Window_Selectable.prototype);
Window_Collection.prototype.constructor = Window_Collection;

Window_Collection.prototype.initialize = function() {
    Window_Selectable.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._data = [];
    this.refresh();
    this.select(this.selection());
    this.activate();
};

Window_Collection.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_Collection.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Window_Collection.prototype.isEnabled = function(item) {
    return item[3];
};

Window_Collection.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_Collection.prototype.makeItemList = function() {
    
};

Window_Collection.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width);
    this.drawText(item[2], rect.x, rect.y, rect.width, 'right');
    this.changePaintOpacity(true);
};

Window_Collection.prototype.drawItemName = function(item, x, y, width) {
    var iconWidth = Window_Base._iconWidth + 4;
    this.drawIcon(item[0], x + 2, y + 2);
    this.drawText(item[1], x + iconWidth, y, width - iconWidth);
};

Window_Collection.prototype.selection = function() {
    return 0;
};



// Window_Statues

function Window_Statues() {
    this.initialize.apply(this, arguments);
}

Window_Statues.prototype = Object.create(Window_Collection.prototype);
Window_Statues.prototype.constructor = Window_Collection;

Window_Statues.prototype.initialize = function() {
    Window_Collection.prototype.initialize.call(this);
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

Window_Statues.prototype.selection = function() {
    return this._data.findIndex(s => s[4] == $gameMap.mapId());
};