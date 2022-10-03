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

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.proficiencies = function() {
    keys = [];
    id = this.actorId();
    Object.keys($dataProficiencies).forEach(function(key) {
        if ($dataProficiencies[key].actor == id) keys.push(key);
    });
    return keys;
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
    this._actor = null;
};

Window_ProficiencyCommand.prototype.windowWidth = function() {
    return Yanfly.Param.StatusCmdWidth;
};

Window_ProficiencyCommand.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
    this._actor = actor;
    this.refresh();
		this.select(0);
};

Window_ProficiencyCommand.prototype.numVisibleRows = function() {
    return Yanfly.Param.StatusCmdRows;
};

Window_ProficiencyCommand.prototype.makeCommandList = function() {
    proficiencies = SceneManager._scene._actor.proficiencies();
	for (i = 0; i < proficiencies.length; i++) {
        this.addCommand($gameParty.proficiencyName(proficiencies[i]), 'proficiency', true, proficiencies[i]);
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
    return Yanfly.Param.StatusCmdAlign;
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
    this.addCommand("Progress", 'progress', true);
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
    case 'progress':
      this.drawProgress();
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
    var text = $gameParty.proficiencyName(SceneManager._scene._commandWindow.currentExt());
    this.changeTextColor(this.systemColor());
    this.drawText(text, dx, dy, dw, 'center');
    dy += this.lineHeight();
    text = "Info";
    this.drawText(text, dx, dy, dw, 'center');
    this.drawPerks(dx, dy, dw, dh);
};

Window_ProficiencyInfo.prototype.drawProgress = function() {
    var dx = this.standardPadding();
    var dy = this.lineHeight() / 2;
    var dw = (this.contents.width - this.standardPadding());
    var dh = this.lineHeight();
    var text = $gameParty.proficiencyName(SceneManager._scene._commandWindow.currentExt());
    this.changeTextColor(this.systemColor());
    this.drawText(text, dx, dy, dw, 'center');
    dy += this.lineHeight();
    text = "Progress";
    this.drawText(text, dx, dy, dw, 'center');
};

Window_ProficiencyInfo.prototype.drawPerks = function() {
    var proficiency = SceneManager._scene._commandWindow.currentExt();
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
    this.createStatusWindow();
    this.createInfoWindow();
    this.refreshActor();
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
    this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._commandWindow.setHandler('pageup', this.previousActor.bind(this));
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
    this._commandWindow2.setHandler('progress', this.progress.bind(this));
    this._commandWindow2.setHandler('cancel', this.returnToProficiencies.bind(this));
};

Scene_Proficiency.prototype.createStatusWindow = function() {
    var wx = this._commandWindow.width;
    var wy = 0;
    var ww = Graphics.boxWidth - wx;
    var wh = this._commandWindow.height;
    this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
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

Scene_Proficiency.prototype.progress = function() {
    this._commandWindow2.activate();
};

Scene_Proficiency.prototype.returnToProficiencies = function() {
    this._commandWindow2.select(0);
    this._commandWindow2.hide();
    this._commandWindow2.deactivate();
    this._commandWindow.show();
    this._commandWindow.activate();
};

Scene_Proficiency.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this.refreshActor();
};

Scene_Proficiency.prototype.refreshActor = function() {
    var actor = this.actor();
    this._commandWindow.refresh();
    this._statusWindow.setActor(actor);
};

Scene_Proficiency.prototype.onActorChange = function() {
    this.refreshActor();
    this._commandWindow.activate();
};