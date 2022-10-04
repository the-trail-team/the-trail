//=============================================================================
// Game_Party
//=============================================================================

let _ = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    _.call(this);
    this._proficiencyLevels = {};
    this._proficiencyPerks = {};
};

Game_Party.prototype.proficiencyExistCheck = function(name) {
    if (!this._proficiencyLevels.hasOwnProperty(name)) this._proficiencyLevels[name] = 0;
    if (!this._proficiencyPerks.hasOwnProperty(name)) {
        this._proficiencyPerks[name] = {};
        let perks = $gameParty.proficiencyPerks(name);
        Object.keys(perks).forEach(function(key) {
            $gameParty._proficiencyPerks[name][key] = perks[key].base;
        });
    }
};

Game_Party.prototype.proficiencyArray = function() {
    let proficiencies = $dataProficiencies;
    let array = [];
    Object.keys(proficiencies).forEach(function(key) {
        array.push([proficiencies[key], key]);
    });
    return array;
};

Game_Party.prototype.proficiencyLevel = function(name) {
    this.proficiencyExistCheck(name);
    return this._proficiencyLevels[name];
};

Game_Party.prototype.proficiencyName = function(name) {
    return $dataProficiencies[name].name;
};

Game_Party.prototype.proficiencyLevelUp = function(name, levels) {
    this.proficiencyExistCheck(name);
    this._proficiencyLevels[name] += levels;
    this.calculatePerkEffects(name);
};

Game_Party.prototype.proficiencyPerks = function(name) {
    return $dataProficiencies[name].perks;
};

Game_Party.prototype.proficiencyPerksArray = function(name) {
    let perks = $gameParty.proficiencyPerks(name);
    let array = [];
    Object.keys(perks).forEach(function(key) {
        array.push([perks[key], key]);
    });
    return array;
};

Game_Party.prototype.calculatePerkEffects = function(name) {
    this.proficiencyExistCheck(name);
    perks = this._proficiencyPerks[name];
    Object.keys(perks).forEach(function(key) {
        perks[key] = $dataProficiencies[name].perks[key].base;
        for (i = 1; i <= $gameParty.proficiencyLevel(name); i++) {
            level = $dataProficiencies[name].levels[i];
            if (level) if (level[0] == key) perks[key] += level[1];
        }
    });
};

//=============================================================================
// Window_ProficiencyCommand
//=============================================================================

function Window_ProficiencyCommand() {
    this.initialize.apply(this, arguments);
}

Window_ProficiencyCommand.prototype = Object.create(Window_Command.prototype);
Window_ProficiencyCommand.prototype.constructor = Window_ProficiencyCommand;

Window_ProficiencyCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
};

Window_ProficiencyCommand.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_ProficiencyCommand.prototype.numVisibleRows = function() {
    return Math.max(Math.floor($gameParty.proficiencyArray().length / 5), 1);
};

Window_ProficiencyCommand.prototype.maxCols = function() {
    return 5;
};

Window_ProficiencyCommand.prototype.makeCommandList = function() {
    let array = $gameParty.proficiencyArray().sort((a, b) => {
        if (a[0].name < b[0].name) {
            return -1;
        }
        if (a[0].name > b[0].name) {
            return 1;
        }
        return 0;
    });
	for (i = 0; i < array.length; i++) {
        this.addCommand(array[i][0].name, 'proficiency', true, array[i]);
    }
};

Window_ProficiencyCommand.prototype.setInfoWindow = function(infoWindow) {
	this._infoWindow = infoWindow;
};

Window_ProficiencyCommand.prototype.update = function() {
    Window_Command.prototype.update.call(this);
	if (this._infoWindow) this._infoWindow.setSymbol(this.currentSymbol());
};

Window_ProficiencyCommand.prototype.itemTextAlign = function() {
    return 'center';
};

Window_ProficiencyCommand.prototype.playOkSound = function() {
    if (this.isPlayOkSound()) SoundManager.playOk();
};

Window_ProficiencyCommand.prototype.isPlayOkSound = function() {
    if (this.currentSymbol() === 'cancel') return true;
    return false;
};

Window_ProficiencyCommand.prototype.update = function() {
    Window_Command.prototype.update.call(this);
	if (SceneManager._scene._infoWindow) SceneManager._scene._infoWindow.refresh();
};

//=============================================================================
// Window_ProficiencyCommand2
//=============================================================================

function Window_ProficiencyCommand2() {
    this.initialize.apply(this, arguments);
}

Window_ProficiencyCommand2.prototype = Object.create(Window_ProficiencyCommand.prototype);
Window_ProficiencyCommand2.prototype.constructor = Window_ProficiencyCommand2;

Window_ProficiencyCommand2.prototype.makeCommandList = function() {
    this.addCommand("Info", 'info', true);
    this.addCommand("Levels 1-10", 'levels1', true);
    this.addCommand("Levels 11-20", 'levels2', true);
    this.addCommand("Levels 21-30", 'levels3', true);
    this.addCommand("Levels 31-40", 'levels4', true);
};

Window_ProficiencyCommand2.prototype.update = function() {
    Window_Command.prototype.update.call(this);
	if (SceneManager._scene._infoWindow) SceneManager._scene._infoWindow.setSymbol(this.currentSymbol());
};

//=============================================================================
// Window_ProficiencyInfo
//=============================================================================

function Window_ProficiencyInfo() {
    this.initialize.apply(this, arguments);
}

Window_ProficiencyInfo.prototype = Object.create(Window_Selectable.prototype);
Window_ProficiencyInfo.prototype.constructor = Window_ProficiencyInfo;

Window_ProficiencyInfo.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
};

Window_ProficiencyInfo.prototype.setSymbol = function(symbol) {
    var needRefresh = this._symbol !== symbol;
	this._symbol = symbol;
	if (needRefresh) this.refresh();
};

Window_ProficiencyInfo.prototype.resetFontSettings = function() {
    if (this._bypassResetText) return;
    Window_Base.prototype.resetFontSettings.call(this);
};

Window_ProficiencyInfo.prototype.resetTextColor = function() {
    if (this._bypassResetTextColor) return;
    Window_Base.prototype.resetTextColor.call(this);
};

Window_ProficiencyInfo.prototype.refresh = function() {
    this.contents.clear();
	this.drawInfoContents(this._symbol);
};

Window_ProficiencyInfo.prototype.drawInfoContents = function(symbol) {
    this.resetFontSettings();
    if (!symbol) return;
    switch (symbol.toLowerCase()) {
        case 'info':
            this.drawInfo();
            break;
        case 'levels1':
        case 'levels2':
        case 'levels3':
        case 'levels4':
            this.drawLevels(symbol);
            break;
        default:
            break;
    }
};

Window_ProficiencyInfo.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_ProficiencyInfo.prototype.drawInfo = function() {
    var dx = this.standardPadding();
    var dy = this.lineHeight() / 2;
    var dw = (this.contents.width - this.standardPadding());
    var dh = this.lineHeight();
    var text = $gameParty.proficiencyName(SceneManager._scene._commandWindow.currentExt()[1]);
    this.changeTextColor(this.systemColor());
    this.drawText(text, dx, dy, dw, 'center');
    dy += this.lineHeight();
    text = "Info";
    this.drawText(text, dx, dy, dw, 'center');
    this.drawPerks(dx);
};

Window_ProficiencyInfo.prototype.drawLevels = function(symbol) {
    var dx = this.standardPadding();
    var dy = this.lineHeight() / 2;
    var dw = (this.contents.width - this.standardPadding());
    var dh = this.lineHeight();
    var text = $gameParty.proficiencyName(SceneManager._scene._commandWindow.currentExt()[1]);
    this.changeTextColor(this.systemColor());
    this.drawText(text, dx, dy, dw, 'center');
    dy += this.lineHeight();
    text = "Levels 1-10";
    if (symbol == 'levels2') text = "Levels 11-20";
    if (symbol == 'levels3') text = "Levels 21-30";
    if (symbol == 'levels4') text = "Levels 31-40";
    this.drawText(text, dx, dy, dw, 'center');
    this.drawLevelPerks(symbol);
};

Window_ProficiencyInfo.prototype.drawLevelPerks = function(symbol) {
    var ext = SceneManager._scene._commandWindow.currentExt();
    var proficiency = ext[0];
    var internal = ext[1];
    switch (symbol) {
        case 'levels1':
            max = 10;
            break;
        case 'levels2':
            max = 20;
            break;
        case 'levels3':
            max = 30;
            break;
        default:
            max = 40;
            break;
    }
    min = max - 9;
    var rect = new Rectangle();
    rect.width = (this.contents.width - this.standardPadding());
    rect.y = this.lineHeight() * 3;
    rect.height = this.lineHeight();
    var dx = rect.x + this.textPadding();
    var dw = rect.width - this.textPadding() * 2;
    for (i = min; i <= max; i++) {
        this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
        this.changeTextColor(this.systemColor());
        this.drawText("Level " + [i], dx, rect.y, dw, 'left');
        this.resetTextColor();
        this.changePaintOpacity($gameParty.proficiencyLevel(internal) >= i);
        if (proficiency.levels[i]) {
            perk = proficiency.levels[i][0];
            num = proficiency.levels[i][1];
            perkName = proficiency.perks[perk].name;
            format = proficiency.perks[perk].format;
            text = perkName + ": "
            if (format == "percent") text += (num > 0 ? "+" : "") + num * 100 + "%";
            else if (format == "plus") text += "+" + num;
            else text = num;
        } else {
            text = "Undefined";
        }
        this.drawText(text, dx, rect.y, dw, 'right');
        rect.y += this.lineHeight();
    }
    this.changePaintOpacity(true);
};

Window_ProficiencyInfo.prototype.drawPerks = function() {
    var proficiency = SceneManager._scene._commandWindow.currentExt()[1];
    var rect = new Rectangle();
    rect.width = (this.contents.width - this.standardPadding()) / 2;
    rect.y = this.lineHeight() * 3;
    rect.height = this.lineHeight();
    var dx = rect.x + this.textPadding();
    var dw = rect.width - this.textPadding() * 2;
    this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.level, dx, rect.y, dw, 'left');
    this.changeTextColor(this.normalColor());
    text = $gameParty.proficiencyLevel(proficiency);
    this.drawText(text, dx, rect.y, dw, 'right');
    var perks = $gameParty.proficiencyPerksArray(proficiency);
    for (var i = 0; i < perks.length; ++i) {
        rect.y += this.lineHeight();
        this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
        this.changeTextColor(this.systemColor());
        this.drawText(perks[i][0].name, dx, rect.y, dw, 'left');
        this.changeTextColor(this.normalColor());
        format = perks[i][0]['format'];
        num = $gameParty._proficiencyPerks[proficiency][perks[i][1]];
        if (format == "percent") text = num * 100 + "%";
        else if (format == "plus") text = "+" + num;
        else text = num;
        this.drawText(text, dx, rect.y, dw, 'right');
    }
};

//=============================================================================
// Scene_Proficiency
//=============================================================================

function Scene_Proficiency() {
    this.initialize.apply(this, arguments);
}

Scene_Proficiency.prototype = Object.create(Scene_ItemBase.prototype);
Scene_Proficiency.prototype.constructor = Scene_Proficiency;

Scene_Proficiency.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Proficiency.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createCommandWindow2();
    this.createInfoWindow();
    this._commandWindow.activate();
};

Scene_Proficiency.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_ProficiencyCommand();
    this._commandWindow.x = 0;
    this._commandWindow.y = 0;
    this.setCommandWindowHandlers();
    this.addWindow(this._commandWindow);
};

Scene_Proficiency.prototype.setCommandWindowHandlers = function() {
    this._commandWindow.setHandler('proficiency', this.proficiency.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
};

Scene_Proficiency.prototype.createCommandWindow2 = function() {
    this._commandWindow2 = new Window_ProficiencyCommand2();
    this._commandWindow2.x = 0;
    this._commandWindow2.y = 0;
    this._commandWindow2.active = false;
    this._commandWindow2.visible = false;
    this.setCommandWindow2Handlers();
    this.addWindow(this._commandWindow2);
};

Scene_Proficiency.prototype.setCommandWindow2Handlers = function() {
    this._commandWindow2.setHandler('info', this.info.bind(this));
    this._commandWindow2.setHandler('levels1', this.levels.bind(this));
    this._commandWindow2.setHandler('levels2', this.levels.bind(this));
    this._commandWindow2.setHandler('levels3', this.levels.bind(this));
    this._commandWindow2.setHandler('levels4', this.levels.bind(this));
    this._commandWindow2.setHandler('cancel', this.returnToProficiencies.bind(this));
};

Scene_Proficiency.prototype.createInfoWindow = function() {
    var wx = 0;
    var wy = this._commandWindow.height;
    var ww = Graphics.boxWidth;
    var wh = Graphics.boxHeight - wy;
    this._infoWindow = new Window_ProficiencyInfo(wx, wy, ww, wh);
    this.addWindow(this._infoWindow);
};

Scene_Proficiency.prototype.proficiency = function() {
    SoundManager.playOk();
    this._commandWindow.hide();
    this._commandWindow.deactivate();
    this._commandWindow2.show();
    this._commandWindow2.activate();
};

Scene_Proficiency.prototype.info = function() {
    this._commandWindow2.activate();
};

Scene_Proficiency.prototype.levels = function() {
    this._commandWindow2.activate();
};

Scene_Proficiency.prototype.returnToProficiencies = function() {
    this._commandWindow2.select(0);
    this._commandWindow2.hide();
    this._commandWindow2.deactivate();
    this._commandWindow.show();
    this._commandWindow.activate();
};

//=============================================================================
// Scene_Menu
//=============================================================================

let __= Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    __.call(this);
    this._commandWindow.setHandler('proficiency', this.commandProficiency.bind(this));
};

Scene_Menu.prototype.commandProficiency = function() {
    SceneManager.push(Scene_Proficiency);
};