//=============================================================================
// Yanfly Engine Plugins - Shop Menu Core
// YEP_ShopMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ShopMenuCore = true;

var Yanfly = Yanfly || {};
Yanfly.Shop = Yanfly.Shop || {};
Yanfly.Shop.version = 1.05

//=============================================================================
 /*:
 * @plugindesc v1.05 Revamps the shop menu appearance and provides the
 * framework for many new shop options.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Command Order
 * @parent ---General---
 * @desc This is the order in which the command menu will appear. Use
 * a space to separate the individual commands.
 * @default Buy Sell Equip Custom Cancel
 *
 * @param Shop List Width
 * @parent ---General---
 * @desc This allows you to adjust the formula to determine the window width
 * for the main shop list windows.
 * @default Graphics.boxWidth / 2 + Graphics.boxWidth / 10
 *
 * @param Command Alignment
 * @parent ---General---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment used for the command windows.
 * left     center     right
 * @default center
 *
 * @param ---Status Window---
 * @default
 *
 * @param Default Mode
 * @parent ---Status Window---
 * @type combo
 * @option default
 * @option actor
 * @desc Display a comparison for all actors per stat or per actor?
 * default - All Actors     actor - Individual Actors
 * @default actor
 *
 * @param Stat Switching
 * @parent ---Status Window---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable stat comparison switching by pressing left/right?
 * NO - false     YES - true
 * @default true
 *
 * @param Cannot Equip
 * @parent ---Status Window---
 * @desc If an actor cannot equip an item, this text is shown.
 * @default Can't Equip
 *
 * @param Stat Font Size
 * @parent ---Status Window---
 * @desc The font size used for stat comparisons.
 * Default: 28
 * @default 20
 *
 * @param Cannot Equip Font Size
 * @parent ---Status Window---
 * @type number
 * @min 1
 * @desc The font size used for cannot equip text.
 * Default: 28
 * @default 20
 *
 * @param ---Info Window---
 * @default
 *
 * @param Show Icon
 * @parent ---Info Window---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the icon in the info window?
 * NO - false     YES - true
 * @default true
 *
 * @param Icon Size
 * @parent ---Info Window---
 * @type number
 * @min 0
 * @desc This will be the width and height of the icon to be drawn.
 * This is normally 4x the default Icon Width and Icon Height.
 * @default 128
 *
 * @param Font Size
 * @parent ---Info Window---
 * @type number
 * @min 1
 * @desc This changes the font size for description items.
 * Default: 28
 * @default 20
 *
 * @param Recovery Format
 * @parent ---Info Window---
 * @desc This is the text format for HP/MP Recovery.
 * @default %1 Heal
 *
 * @param Add State
 * @parent ---Info Window---
 * @desc This is the text for adding states.
 * @default +State
 *
 * @param Add Buff
 * @parent ---Info Window---
 * @desc This is the text for adding buffs.
 * @default +Buff
 *
 * @param Remove State
 * @parent ---Info Window---
 * @desc This is the text for remove states.
 * @default -State
 *
 * @param Remove Buff
 * @parent ---Info Window---
 * @desc This is the text for remove buffs.
 * @default -Buff
 *
 * @param Maximum Icons
 * @parent ---Info Window---
 * @type number
 * @min 0
 * @desc Maximum number of icons drawn for states and buffs.
 * @default 4
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The shop menu in RPG Maker MV is the same as it was in RPG Maker VX and RPG
 * Maker VX Ace. It's relatively basic and provides adequate information, but
 * not really enough to let the player know what they're actually buying or
 * even selling. This plugin enables shops to show more than just the basic
 * information displayed in RPG Maker MV and even allows for custom commands to
 * be inserted into the command window.
 *
 * This plugin also gives the player the option to tab between a parameter
 * comparison mode with the whole party displaying individual stats at a time
 * or individual actors displaying all stats at a time. The player can switch
 * between the two modes by pressing the 'tab' button on the keyboard or with
 * touch input on the name of the actor or parameter.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * You can add and remove commands from the Command Window by changing the
 * 'Command Order' parameter. Here is a list of commands you may use:
 *
 *   Buy
 *   - This is the buy item command.
 *
 *   Sell
 *   - This is the sell item command.
 *
 *   Equip
 *   - This is the equip command to directly access an actor's equipment.
 *
 *   Custom
 *   - If you have any custom shop menu items, they will be displayed here.
 *
 *   Cancel
 *   - This exits the shop.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use the following notetag to alter various shop aspects
 *
 * Item, Weapon, and Armor Notetag:
 *
 *   <Price: x>
 *   This notetag allows you to exceed the default editor limit for item prices
 *   of 999,999 gold.
 *
 *   <Sell Price: x>
 *   This sets the selling price of the item to x.
 *
 *   <Cannot Sell>
 *   This makes it so that the item cannot be sold.
 *
 *   <Can Sell>
 *   This makes it so that the item can be sold even if it is at 0 gold.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.05:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.04:
 * - Compatibility Update with YEP_X_ItemPictureImg.js
 *
 * Version 1.03:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.02:
 * - Fixed a visual bug that listed actor stats in the wrong order.
 *
 * Version 1.01a:
 * - Disabled LEFT/RIGHT movement from the status window while inputting an
 * item quantity to buy.
 * - Added a font reset on the number window upon refresh.
 * - Fixed a visual error with MP recovery displaying a 0 instead of ---.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_ShopMenuCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ShopCommandOrder = String(Yanfly.Parameters['Command Order']);
Yanfly.Param.ShopListWidth = String(Yanfly.Parameters['Shop List Width']);
Yanfly.Param.ShopCommandAlign = String(Yanfly.Parameters['Command Alignment']);

Yanfly.Param.ShopDefaultMode = String(Yanfly.Parameters['Default Mode']);
Yanfly.Param.ShopDefaultMode = Yanfly.Param.ShopDefaultMode.toLowerCase();
Yanfly.Param.ShopStatSwitch = eval(String(Yanfly.Parameters['Stat Switching']));
Yanfly.Param.ShopCantEquip = String(Yanfly.Parameters['Cannot Equip']);
Yanfly.Param.ShopStatFontSize = Number(Yanfly.Parameters['Stat Font Size']);
Yanfly.Param.ShopCantSize = Number(Yanfly.Parameters['Cannot Equip Font Size']);

if (!Imported.YEP_ItemCore) {
  Yanfly.Param.ItemFontSize = Number(Yanfly.Parameters['Font Size']);
  Yanfly.Param.ItemShowIcon = String(Yanfly.Parameters['Show Icon']);
  Yanfly.Param.ItemIconSize = Number(Yanfly.Parameters['Icon Size']);
  Yanfly.Param.ItemRecoverFmt = String(Yanfly.Parameters['Recovery Format']);
  Yanfly.Param.ItemAddState = String(Yanfly.Parameters['Add State']);
  Yanfly.Param.ItemAddBuff = String(Yanfly.Parameters['Add Buff']);
  Yanfly.Param.ItemRemoveState = String(Yanfly.Parameters['Remove State']);
  Yanfly.Param.ItemRemoveBuff = String(Yanfly.Parameters['Remove Buff']);
  Yanfly.Param.ItemMaxIcons = Number(Yanfly.Parameters['Maximum Icons']);
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Shop.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Shop.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_ShopMenuCore) {
    this.processShopNotetags($dataItems);
    this.processShopNotetags($dataWeapons);
    this.processShopNotetags($dataArmors);
    Yanfly._loaded_YEP_ShopMenuCore = true;
  }
  return true;
};

DataManager.processShopNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.cannotSell = false;
    obj.canSell = false;
    obj.sellPrice = undefined;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:PRICE):[ ](\d+)>/i)) {
        obj.price = parseInt(RegExp.$1);
      } else if (line.match(/<(?:SELL PRICE|SELLING PRICE):[ ](\d+)>/i)) {
        obj.sellPrice = parseInt(RegExp.$1);
      } else if (line.match(/<(?:CANNOT SELL)>/i)) {
        obj.cannotSell = true;
      } else if (line.match(/<(?:CAN SELL)>/i)) {
        obj.canSell = true;
      }
    }
  }
};

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.registerShopGoods = function() {
    var scene = SceneManager._scene;
    this._shopGoods = scene._goods;
    this._shopPurchaseOnly = scene._purchaseOnly;
};

Game_Temp.prototype.clearShopGoods = function() {
    this._shopGoods = undefined;
    this._shopPurchaseOnly = undefined;
};

//=============================================================================
// Window_ShopCommand
//=============================================================================

Window_ShopCommand.prototype.windowWidth = function() {
    return 240;
};

Window_ShopCommand.prototype.maxCols = function() {
    return 1;
};

Window_ShopCommand.prototype.numVisibleRows = function() {
    return 4;
};

Window_ShopCommand.prototype.makeCommandList = function() {
    this._commandOrder = Yanfly.Param.ShopCommandOrder.split(' ');
    for (var i = 0; i < this._commandOrder.length; ++i) {
      var command = this._commandOrder[i];
      this.createCommand(command);
    }
};

Window_ShopCommand.prototype.createCommand = function(command) {
    command = command.toUpperCase();
    if (command === 'BUY') {
      this.addCommand(TextManager.buy, 'buy');
    } else if (command === 'SELL') {
      this.addCommand(TextManager.sell, 'sell', !this._purchaseOnly);
    } else if (command === 'CANCEL') {
      this.addCommand(TextManager.cancel, 'cancel');
    } else if (['CUSTOM', 'ORIGINAL'].contains(command)) {
      this.addCustomCommands();
    } else if (command === 'EQUIP') {
      this.addCommand(TextManager.equip, 'equip');
    }
};

Window_ShopCommand.prototype.addCustomCommands = function() {
};

Window_ShopCommand.prototype.itemTextAlign = function() {
    return Yanfly.Param.ShopCommandAlign;
};

//=============================================================================
// Window_ShopInfo
//=============================================================================

function Window_ShopInfo() {
    this.initialize.apply(this, arguments);
}

Window_ShopInfo.prototype = Object.create(Window_ItemStatus.prototype);
Window_ShopInfo.prototype.constructor = Window_ShopInfo;

if (Imported.YEP_X_ItemPictureImg) {

Yanfly.IPI.Window_ShopInfo_drawItemIcon =
  Window_ShopInfo.prototype.drawItemIcon;
Window_ShopInfo.prototype.drawItemIcon = function() {
  if (this.itemHasPictureImage()) {
    this.readyItemPictureImage(this._item);
  } else {
    Yanfly.IPI.Window_ShopInfo_drawItemIcon.call(this);
  }
};

Window_ShopInfo.prototype.itemHasPictureImage = function() {
  if (!this._item) return false;
  var filename = ItemManager.getItemPictureImageFilename(this._item);
  return filename !== '';
};

Window_ShopInfo.prototype.readyItemPictureImage = function(item) {
  if (item !== this._item) return;
  var bitmap = ItemManager.getItemPictureImage(item);
  if (bitmap.width <= 0) {
    return setTimeout(this.readyItemPictureImage.bind(this, item), 250);
  } else {
    this.drawItemPictureImage(bitmap);
  }
};

Window_ShopInfo.prototype.drawItemPictureImage = function(bitmap) {
  var pw = bitmap.width;
  var ph = bitmap.height;
  var sx = 0;
  var sy = 0;
  var dw = pw;
  var dh = ph;
  if (dw > Yanfly.Param.ItemImageMaxWidth) {
    var rate = Yanfly.Param.ItemImageMaxWidth / dw;
    dw = Math.floor(dw * rate);
    dh = Math.floor(dh * rate);
  }
  if (dh > Yanfly.Param.ItemImageMaxHeight) {
    var rate = Yanfly.Param.ItemImageMaxHeight / dh;
    dw = Math.floor(dw * rate);
    dh = Math.floor(dh * rate);
  }
  var dx = (Window_Base._faceWidth - dw) / 2;
  var dy = (Window_Base._faceHeight - dh) / 2;
  this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy, dw, dh);
};

}; // Imported.YEP_X_ItemPictureImg

//=============================================================================
// Window_ShopNumber
//=============================================================================

Window_ShopNumber.prototype.windowWidth = function() {
    return Math.ceil(eval(Yanfly.Param.ShopListWidth));
};

Window_ShopNumber.prototype.refresh = function() {
    this.contents.clear();
    this._index = 0;
    this.resetFontSettings();
    this.drawItemName(this._item, 0, this.lineHeight(), this.contents.width);
    if (this._max !== 1) this.drawMultiplicationSign();
    this.drawNumber();
    this.drawTotalPrice();
};

Window_ShopNumber.prototype.itemY = function() {
    return this.lineHeight() * 2;
};

Window_ShopNumber.prototype.drawTotalPrice = function() {
    var ww = this.contents.width - this.textPadding();
    var wy = this.itemY();
    this.drawHorzLine(this.lineHeight() * 3);
    this.drawTotalCurrency(ww, wy + this.lineHeight() * 1);
    this.drawTotalCost(ww, wy + this.lineHeight() * 2);
    this.drawHorzLine(wy + this.lineHeight() * 3);
    this.drawTotalAfter(ww, wy + this.lineHeight() * 3);
};

Window_ShopNumber.prototype.drawTotalCurrency = function(ww, wy) {
    var value = Yanfly.Util.toGroup(this.getTotalCurrency());
    this.drawCurrencyValue(value, this._currencyUnit, 0, wy, ww);
};

Window_ShopNumber.prototype.getTotalCurrency = function() {
    if (this._currencyUnit === TextManager.currencyUnit) {
      return $gameParty.gold();
    }
    return 0;
};

Window_ShopNumber.prototype.drawTotalCost = function(ww, wy) {
    var value = this._price * this._number;
    if (!this.isSelling()) value *= -1;
    value = Yanfly.Util.toGroup(value);
    if (this.isSelling()) value = '+' + value;
    this.drawCurrencyValue(value, this._currencyUnit, 0, wy, ww);
};

Window_ShopNumber.prototype.drawHorzLine = function(y) {
  this.contents.paintOpacity = 128;
  this.contents.fillRect(0, y, this.contentsWidth(), 2, this.normalColor());
  this.contents.paintOpacity = 255;
};

Window_ShopNumber.prototype.drawTotalAfter = function(ww, wy) {
    var value = this.getTotalCurrency();
    value += (this._price * this._number) * (!this.isSelling() ? -1 : 1);
    value = Yanfly.Util.toGroup(value);
    this.drawCurrencyValue(value, this._currencyUnit, 0, wy, ww);
};

Window_ShopNumber.prototype.isSelling = function() {
    var scene = SceneManager._scene;
    return scene.isSelling();
};

Window_ShopNumber.prototype.cursorWidth = function() {
    this.resetFontSettings();
    var item = this._item
    if (this._item && this._item.proxyBuy) {
      var id = this._item.proxyBuy;
      if (DataManager.isItem(this._item)) item = $dataItems[id];
      if (DataManager.isWeapon(this._item)) item = $dataWeapons[id];
      if (DataManager.isArmor(this._item)) item = $dataArmors[id];
    }
    var value = $gameParty.maxItems(item);
    if (this._max == 1) value = this._buyOrSell;
    var digitWidth = this.textWidth(Yanfly.Util.toGroup(value));
    return digitWidth + this.textPadding() * 2;
};

//=============================================================================
// Window_ShowBuy
//=============================================================================

Window_ShopBuy.prototype.windowWidth = function() {
    return Math.ceil(eval(Yanfly.Param.ShopListWidth));
};

Window_ShopBuy.prototype.setInfoWindow = function(infoWindow) {
    this._infoWindow = infoWindow;
    this.callUpdateHelp();
};

Yanfly.Shop.Window_ShopBuy_updateHelp = Window_ShopBuy.prototype.updateHelp;
Window_ShopBuy.prototype.updateHelp = function() {
    Yanfly.Shop.Window_ShopBuy_updateHelp.call(this);
    if (this._infoWindow) this._infoWindow.setItem(this.item());
};

//=============================================================================
// Window_ShopCategory
//=============================================================================

function Window_ShopCategory() {
    this.initialize.apply(this, arguments);
}

Window_ShopCategory.prototype = Object.create(Window_ItemCategory.prototype);
Window_ShopCategory.prototype.constructor = Window_ShopCategory;

Window_ShopCategory.prototype.initialize = function() {
    Window_ItemCategory.prototype.initialize.call(this);
};

Window_ShopCategory.prototype.windowWidth = function() {
    return 240;
};

Window_ShopCategory.prototype.numVisibleRows = function() {
    return 4;
};

Window_ShopCategory.prototype.maxCols = function() {
    return 1;
};

Window_ShopCategory.prototype.itemTextAlign = function() {
    return Yanfly.Param.ShopCommandAlign;
};

//=============================================================================
// Window_ShopBuy
//=============================================================================

Window_ShopBuy.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    this.drawBuyItem(item, rect);
    this.drawBuyPrice(item, rect);
    this.changePaintOpacity(true);
    this.resetFontSettings();
};

Window_ShopBuy.prototype.drawBuyItem = function(item, rect) {
    this.drawItemName(item, rect.x, rect.y, rect.width);
};

Window_ShopBuy.prototype.drawBuyPrice = function(item, rect) {
    if (Imported.YEP_CoreEngine) {
      this.contents.fontSize = Yanfly.Param.GoldFontSize;
    }
    var itemPrice = Yanfly.Util.toGroup(this.price(item));
    this.drawCurrencyValue(itemPrice, this.currencyUnit(), rect.x, rect.y,
        rect.width);
};

Window_ShopBuy.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

//=============================================================================
// Window_ShopSell
//=============================================================================

Window_ShopSell.prototype.maxCols = function() {
    return 1;
};

Window_ShopSell.prototype.setInfoWindow = function(infoWindow) {
    this._infoWindow = infoWindow;
    this.callUpdateHelp();
};

Window_ShopSell.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

Yanfly.Shop.Window_ShopSell_updateHelp = Window_ShopSell.prototype.updateHelp;
Window_ShopSell.prototype.updateHelp = function() {
    Yanfly.Shop.Window_ShopSell_updateHelp.call(this);
    if (this._infoWindow) this._infoWindow.setItem(this.item());
    if (this._statusWindow) this._statusWindow.setItem(this.item());
};

Yanfly.Shop.Window_ShopSell_isEnabled = Window_ShopSell.prototype.isEnabled;
Window_ShopSell.prototype.isEnabled = function(item) {
    if (item) {
      if ($gamePlayer.isDebugThrough()) return true;
      if (item.cannotSell) return false;
      if (item.canSell) return true;
    }
    return Yanfly.Shop.Window_ShopSell_isEnabled.call(this, item);
};

//=============================================================================
// Window_ShopStatus
//=============================================================================

Yanfly.Shop.Window_ShopStatus_initialize = 
    Window_ShopStatus.prototype.initialize;
Window_ShopStatus.prototype.initialize = function(x, y, width, height) {
    Yanfly.Shop.Window_ShopStatus_initialize.call(this, x, y, width, height);
    if (Yanfly.Param.ShopStatSwitch) this._paramId = 2;
    this._displayMode = Yanfly.Param.ShopDefaultMode;
    this._actorIndex = 0;
    this._clickZoneX = this.textWidth('<<') + this.standardPadding();
    this._clickZoneY = this.standardPadding() + this.lineHeight() * 2;
};

Window_ShopStatus.prototype.filterParty = function() {
    return $gameParty.members().filter(a => a.canEquip(this._item));
};

Window_ShopStatus.prototype.maxActorIndex = function() {
    return this.filterParty().length - 1;
};

Window_ShopStatus.prototype.displayMode = function() {
    return this._displayMode;
};

Window_ShopStatus.prototype.setDisplayMode = function(mode) {
    this._displayMode = mode;
};

Window_ShopStatus.prototype.isDefaultMode = function() {
    return false;
};

Window_ShopStatus.prototype.isActorMode = function() {
    return true;
};

Window_ShopStatus.prototype.refresh = function() {
    this.contents.clear();
    if (!this._item) return;
    this.resetTextColor();
    this.resetFontSettings();
    var x = this.textPadding();
    this.drawPossession(x, 0);
    if (!this.isEquipItem()) return;
    this.resetTextColor();
    this.resetFontSettings();
    if (this.isDefaultMode()) this.drawDefaultData();
    if (this.isActorMode()) this.drawActorData();
};

Window_ShopStatus.prototype.drawDefaultData = function() {
    this.drawStatDisplayed();
    this.drawEquipInfo(this.textPadding(), this.lineHeight() * 2);
};

Window_ShopStatus.prototype.drawStatDisplayed = function() {
    var paramId = this.paramId();
    var text = TextManager.param(paramId);
    this.changeTextColor(this.normalColor());
    this.drawText(text, 0, this.lineHeight(), this.contents.width, 'center');
    if (!Yanfly.Param.ShopStatSwitch) return;
    this.changeTextColor(this.systemColor());
    var text = '<<';
    this.drawText(text, 0, this.lineHeight(), this.contents.width, 'left');
    var text = '>>';
    this.drawText(text, 0, this.lineHeight(), this.contents.width, 'right');
};

Window_ShopStatus.prototype.drawActorData = function() {
    var actor = this.getActor();
    if (!actor) return;
    this.drawActorDisplayed(actor);
    this.drawDarkRectEntries(actor);
    this.drawActorStatInfo(actor);
};

Window_ShopStatus.prototype.getActor = function() {
    if (this._actorIndex > this.maxActorIndex() || this._actorIndex < 0) this._actorIndex = 0;
    return this.filterParty()[this._actorIndex];
};

Window_ShopStatus.prototype.drawActorDisplayed = function(actor) {
    var text = "\\i[" + $dataClasses[actor._classId].icon + "]" + actor.name();
    var tx = (this.contents.width - this.textWidth(text)) / 2;
    this.changeTextColor(this.normalColor());
    this.drawTextEx(text, tx, this.lineHeight(), this.contents.width, 'center');
    this.changeTextColor(this.systemColor());
    var text = '<<';
    this.drawText(text, 0, this.lineHeight(), this.contents.width, 'left');
    var text = '>>';
    this.drawText(text, 0, this.lineHeight(), this.contents.width, 'right');
};

Window_ShopStatus.prototype.drawDarkRectEntries = function(actor) {
    for (var i = 0; i < 8 * this.currentEquippedItem(actor, this._item.etypeId).length; ++i) {
      var rect = this.getRectPosition(i);
      this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
    }
};

Window_ShopStatus.prototype.getRectPosition = function(index) {
    var rect = new Rectangle();
    rect.width = Math.floor(this.contents.width / 4);
    rect.height = this.lineHeight();
    rect.x = (index % 4) * rect.width;
    rect.y = Math.floor(index / 4) * this.lineHeight() + this.lineHeight() * 2;
    return rect;
};

Window_ShopStatus.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_ShopStatus.prototype.drawActorStatInfo = function(actor) {
    this.contents.fontSize = Yanfly.Param.ShopStatFontSize;
    var items = this.currentEquippedItem(actor, this._item.etypeId);
    var canEquip = actor.canEquip(this._item);
    canEquip = actor.checkEquipRequirements(this._item);
    for (index = 0; index < items.length; index++) {
      item = items[index];
      for (var i = 0; i < 8; ++i) {
        this.changePaintOpacity(true);
        var rect = this.getRectPosition(i);
        rect.x += this.textPadding();
        rect.y += index * this.lineHeight() * 2;
        rect.width -= this.textPadding() * 2;
        this.changeTextColor(this.systemColor());
        if (i == 0) {
          var icon = item ? item.iconIndex : Yanfly.Icon.EmptyEquip;
          this.changePaintOpacity(!!item);
          this.drawIcon(icon, rect.x + (rect.width - Window_Base._iconWidth) / 2, rect.y + (this.lineHeight() - Window_Base._iconHeight) / 2)
        } else {
          var text = TextManager.param(i - 1);
          this.drawText(text, rect.x, rect.y, rect.width);
          if (!canEquip) this.drawActorCantEquip(actor, rect);
          if (canEquip) this.drawActorChange(actor, rect, item, i - 1);
        }
      }
      this.changePaintOpacity(true);
    }
};

Window_ShopStatus.prototype.drawActorCantEquip = function(actor, rect) {
    this.changePaintOpacity(false);
    this.resetTextColor();
    this.contents.fontSize = Yanfly.Param.ShopCantSize;
    var text = "Can't Equip";
    this.drawText(text, rect.x, rect.y, rect.width, 'right');
};

Window_ShopStatus.prototype.drawActorChange = function(actor, rect, item1, i) {
    var change = this._item.params[i]
    if (item1) if (item1.baseItemId == 157) change -= $gameSystem.championsTalisman()[i]; // Champion's Talisman
    change -= (item1 ? item1.params[i] : 0);
    this.changePaintOpacity(change !== 0);
    this.changeTextColor(this.paramchangeTextColor(change));
    var text = (change > 0 ? '+' : '') + Yanfly.Util.toGroup(change);
    this.drawText(text, rect.x, rect.y, rect.width, 'right');
};

Window_ShopStatus.prototype.drawEquipInfo = function(x, y) {
    var members = this.statusMembers();
    for (var i = 0; i < members.length; i++) {
      var wy = y;
      wy += i * this.lineHeight();
      this.drawActorEquipInfo(x, wy, members[i]);
    }
};

Window_ShopStatus.prototype.drawActorEquipInfo = function(x, y, actor) {
    var enabled = actor.canEquip(this._item);
    enabled = actor.checkEquipRequirements(this._item);
    this.changePaintOpacity(enabled);
    this.resetTextColor();
    this.resetFontSettings();
    this.drawTextEx("\\i[" + $dataClasses[actor._classId].icon + "] " + actor.name(), x, y, this.contents.width - x);
    var item1 = this.currentEquippedItem(actor, this._item.etypeId);
    if (enabled) {
      this.contents.fontSize = Yanfly.Param.ShopStatFontSize;
      this.drawActorParamChange(x, y, actor, item1);
    } else {
      this.contents.fontSize = Yanfly.Param.ShopCantSize;
      var ww = this.contents.width - this.textPadding();
      this.drawText(Yanfly.Param.ShopCantEquip, x, y, ww, 'right');
    }
    this.changePaintOpacity(true);
};

Window_ShopStatus.prototype.drawActorParamChange = 
function(x, y, actor, item1) {
    var width = this.contents.width - this.textPadding() - x;
    var paramId = this.paramId();
    var change = this._item.params[paramId]
    change -= (item1 ? item1.params[paramId] : 0);
    this.changeTextColor(this.paramchangeTextColor(change));
    var text = (change > 0 ? '+' : '') + Yanfly.Util.toGroup(change);
    this.drawText(text, x, y, width, 'right');
};

Yanfly.Shop.Window_ShopStatus_update = Window_ShopStatus.prototype.update;
Window_ShopStatus.prototype.update = function() {
    Yanfly.Shop.Window_ShopStatus_update.call(this);
    if (this.isUpdateTrigger()) this.updateParamSwitch();
};

Window_ShopStatus.prototype.isUpdateTrigger = function() {
    if (this.isDefaultMode() && Yanfly.Param.ShopStatSwitch) return true;
    if (this.isActorMode()) return true;
    return false;
};

Window_ShopStatus.prototype.updateParamSwitch = function() {
    if (!this.isEquipItem()) return;
    if (this.isTouched(-1) || this.getInput('left')) {
      SoundManager.playCursor();
      this.adjustLeft();
      this.refresh();
    } else if (this.isTouched(1) || this.getInput('right')) {
      SoundManager.playCursor();
      this.adjustRight();
      this.refresh();
    } else if (Input.isRepeated('tab') || this.isTouched(0)) {
      SoundManager.playCursor();
      this.adjustMode();
      this.refresh();
    }
};

Window_ShopStatus.prototype.getInput = function(input) {
    if (SceneManager._scene._numberWindow.active && !(SceneManager._scene instanceof Scene_Synthesis)) return false;
    return Input.isRepeated(input)
};

Window_ShopStatus.prototype.adjustLeft = function() {
    if (this.isDefaultMode()) {
      this._paramId -= 1;
      if (this._paramId < 0) this._paramId = 7;
    } else if (this.isActorMode()) {
      this._actorIndex -= 1;
      if (this._actorIndex < 0) this._actorIndex = this.maxActorIndex();
    }
};

Window_ShopStatus.prototype.adjustRight = function() {
    if (this.isDefaultMode()) {
      this._paramId += 1;
      if (this._paramId > 7) this._paramId = 0;
    } else if (this.isActorMode()) {
      this._actorIndex += 1;
      if (this._actorIndex > this.maxActorIndex()) this._actorIndex = 0;
    }
};

Window_ShopStatus.prototype.adjustMode = function() {
    if (this.isDefaultMode()) {
      this.setDisplayMode('actor');
    } else if (this.isActorMode()) {
      this.setDisplayMode('default');
    }
};

Window_ShopStatus.prototype.isTouched = function(position) {
    if (!TouchInput.isTriggered()) return false;
    if (!this.isTouchedInsideFrame()) return false;
    var y = this.canvasToLocalY(TouchInput.y);
    if (y > this._clickZoneY) return false;
    var x = this.canvasToLocalX(TouchInput.x);
    if (position === -1 && x < this._clickZoneX) return true;
    if (position === 1 && x > this.width - this._clickZoneX) return true;
    if (position === 0) return true;
    return false;
};

Yanfly.Shop.Window_ShopStatus_paramId = Window_ShopStatus.prototype.paramId;
Window_ShopStatus.prototype.paramId = function() {
    if (Yanfly.Param.ShopStatSwitch) return this._paramId;
    return Yanfly.Shop.Window_ShopStatus_paramId.call(this);
};

Window_ShopStatus.prototype.isPageChangeRequested = function() {
    if (Input.isTriggered('shift')) return true;
    return false;
};

//=============================================================================
// Scene_Shop
//=============================================================================

Scene_Shop.prototype.failSafeGoods = function() {
  if (this._goods === undefined) {
    var goods = $gameTemp._shopGoods;
    var purchaseOnly = $gameTemp._shopPurchaseOnly;
    this.prepare(goods, purchaseOnly);
  }
  $gameTemp.clearShopGoods();
};

Scene_Shop.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.failSafeGoods();
    this.createHelpWindow();
    this.createCommandWindow();
    this.createInfoWindow();
    this.createDummyWindow();
    this.createNumberWindow();
    this.createBuyWindow();
    this.createCategoryWindow();
    this.createSellWindow();
    this.createGoldWindow();
    this.createStatusWindow();
    this.createActorWindow();
};

Scene_Shop.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_ShopCommand(0, this._purchaseOnly);
    this._commandWindow.y = this._helpWindow.height;
    this.addWindow(this._commandWindow);
    this.setCommandWindowHandlers();
};

Scene_Shop.prototype.setCommandWindowHandlers = function() {
    this._commandWindow.setHandler('buy',    this.commandBuy.bind(this));
    this._commandWindow.setHandler('sell',   this.commandSell.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandWindow.setHandler('equip',  this.commandEquip.bind(this));
};

Scene_Shop.prototype.createInfoWindow = function() {
    var wx = this._commandWindow.width;
    var wy = this._commandWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = this._commandWindow.height;
    this._infoWindow = new Window_ShopInfo(wx, wy, ww, wh);
    this.addWindow(this._infoWindow);
};

Scene_Shop.prototype.createDummyWindow = function() {
    var wy = this._commandWindow.y + this._commandWindow.height;
    var wh = Graphics.boxHeight - wy;
    var ww = Math.ceil(eval(Yanfly.Param.ShopListWidth));
    this._dummyWindow = new Window_Base(0, wy, ww, wh);
    this.addWindow(this._dummyWindow);
};

Scene_Shop.prototype.createBuyWindow = function() {
    var wy = this._dummyWindow.y;
    var wh = this._dummyWindow.height;
    this._buyWindow = new Window_ShopBuy(0, wy, wh, this._goods);
    this._buyWindow.setHelpWindow(this._helpWindow);
    this._buyWindow.setInfoWindow(this._infoWindow);
    this._buyWindow.hide();
    this._buyWindow.setHandler('ok',     this.onBuyOk.bind(this));
    this._buyWindow.setHandler('cancel', this.onBuyCancel.bind(this));
    this.addWindow(this._buyWindow);
};

Scene_Shop.prototype.createCategoryWindow = function() {
    this._categoryWindow = new Window_ShopCategory();
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.y = this._commandWindow.y;
    this._categoryWindow.hide();
    this._categoryWindow.deactivate();
    this._categoryWindow.setHandler('ok',        this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler('cancel',    this.onCategoryCancel.bind(this));
    this._categoryWindow.setHandler('WeaponCat', this.commandWeapon.bind(this));
    this._categoryWindow.setHandler('ArmorCat',  this.commandArmor.bind(this));
    this.addWindow(this._categoryWindow);
};

Scene_Shop.prototype.onCategoryCancel = function() {
    if (this._categoryWindow._type == '') {
      this._sellWindow.hide();
      this._commandWindow.activate();
      this._dummyWindow.show();
      this._categoryWindow.hide();
      this._statusWindow.hide();
      this._statusWindow.setItem(null);
      this._helpWindow.clear();
      this._statusWindow.show();
      this._infoWindow.setItem(null);
      this._goldWindow.setItemSell(null);
    } else {
      this._categoryWindow.select(this._categoryWindow._type == 'weapons' ? 2 : 3);
      this._categoryWindow._type = '';
      this._categoryWindow.activate();
      this._categoryWindow.refresh();
    }
};

Scene_Shop.prototype.commandWeapon = Scene_Item.prototype.commandWeapon;
  
Scene_Shop.prototype.commandArmor = Scene_Item.prototype.commandArmor;

Scene_Shop.prototype.createSellWindow = function() {
    var wy = this._dummyWindow.y;
    var ww = this._dummyWindow.width;
    var wh = this._dummyWindow.height;
    this._sellWindow = new Window_ShopSell(0, wy, ww, wh);
    this._sellWindow.setHelpWindow(this._helpWindow);
    this._sellWindow.hide();
    this._sellWindow.setInfoWindow(this._infoWindow);
    this._sellWindow.setHandler('ok',     this.onSellOk.bind(this));
    this._sellWindow.setHandler('cancel', this.onSellCancel.bind(this));
    this._categoryWindow.setItemWindow(this._sellWindow);
    this.addWindow(this._sellWindow);
};

Scene_Shop.prototype.createGoldWindow = function() {
    this._goldWindow = new Window_Gold(0, 0);
    this._goldWindow.x = this._buyWindow.width;
    this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
    this._goldWindow.width = Graphics.boxWidth - this._goldWindow.x;
    this._goldWindow.createContents();
    this._goldWindow.refresh();
    this.addWindow(this._goldWindow);
};

Scene_Shop.prototype.createStatusWindow = function() {
    var wx = this._dummyWindow.width;
    var wy = this._dummyWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = this._dummyWindow.height - this._goldWindow.height;
    this._statusWindow = new Window_ShopStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
    this._buyWindow.setStatusWindow(this._statusWindow);
    this._sellWindow.setStatusWindow(this._statusWindow);
};

Yanfly.Shop.Scene_Shop_onBuyCancel = Scene_Shop.prototype.onBuyCancel;
Scene_Shop.prototype.onBuyCancel = function() {
    Yanfly.Shop.Scene_Shop_onBuyCancel.call(this);
    this._statusWindow.show();
    this._infoWindow.setItem(null);
};

Scene_Shop.prototype.doBuy = function(number) {
    if (Imported.YEP_ItemCore) $gameTemp.enableVarianceStock();
    this.doBuyGold(number);
    this.doBuyItem(number);
    if (Imported.YEP_ItemCore) $gameTemp.disableVarianceStock();
};

Scene_Shop.prototype.doBuyGold = function(number) {
    $gameParty.loseGold(number * this.buyingPrice());
};

Scene_Shop.prototype.doBuyItem = function(number) {
    $gameParty.gainItem(this._item, number);
};

Scene_Shop.prototype.doSell = function(number) {
    this.doSellGold(number);
    this.doSellItem(number);
    if (!Imported.YEP_ItemCore) return;
    if (!DataManager.isIndependent(this._item)) return;
    DataManager.removeIndependentItem(this._item);
};

Scene_Shop.prototype.doSellGold = function(number) {
    $gameParty.gainGold(number * this.sellingPrice());
};

Scene_Shop.prototype.doSellItem = function(number) {
    $gameParty.loseItem(this._item, number);
};

Yanfly.Shop.Scene_Shop_activateSellWindow = 
    Scene_Shop.prototype.activateSellWindow;
Scene_Shop.prototype.activateSellWindow = function() {
    Yanfly.Shop.Scene_Shop_activateSellWindow.call(this);
    this._statusWindow.show();
};

Yanfly.Shop.Scene_Shop_onSellCancel = Scene_Shop.prototype.onSellCancel;
Scene_Shop.prototype.onSellCancel = function() {
    Yanfly.Shop.Scene_Shop_onSellCancel.call(this);
    this._infoWindow.setItem(null);
};

Scene_Shop.prototype.isSelling = function() {
    return this._commandWindow.currentSymbol() === 'sell';
};

Scene_Shop.prototype.createActorWindow = function() {
    this._actorWindow = new Window_MenuActor();
    this._actorWindow.setHandler('ok',     this.onActorOk.bind(this));
    this._actorWindow.setHandler('cancel', this.onActorCancel.bind(this));
    this.addWindow(this._actorWindow);
};

Scene_Shop.prototype.commandEquip = function() {  
    this._actorWindow.activate();
    this._actorWindow.show();
    this._actorWindow.select(0);
};

Scene_Shop.prototype.onActorOk = function() {
    this.onActorCommon();
    if (this._commandWindow.currentSymbol() === 'equip') {
      SceneManager.push(Scene_Equip);
    }
};

Scene_Shop.prototype.onActorCancel = function() {
    this._actorWindow.hide();
    this._actorWindow.deselect();
    this._commandWindow.activate();
};

Scene_Shop.prototype.onActorCommon = function() {
    $gameTemp.registerShopGoods();
    var index = this._actorWindow.index();
    var actor = $gameParty.members()[index];
    $gameParty.setMenuActor(actor);
    SoundManager.playOk();
};

Yanfly.Shop.Scene_Shop_sellingPrice = Scene_Shop.prototype.sellingPrice;
Scene_Shop.prototype.sellingPrice = function() {
    if (this._item && this._item.sellPrice !== undefined) {
      return this._item.sellPrice;
    }
    return Yanfly.Shop.Scene_Shop_sellingPrice.call(this);
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

//=============================================================================
// End of File
//=============================================================================
