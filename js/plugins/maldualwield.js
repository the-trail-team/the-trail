//=============================================================================
// Maliki's Dual Weilding/Two-Handed Weapons
// MalDualWield.js
// version 2.3c
//=============================================================================
/*:  
* @plugindesc ver2.3c - Allows you to set weapons as twohanded, disallowing you from equipping weapons to the Off-hand.  
 * @author Maliki79
 * @param ShieldsArmor
 * @desc Type 1 to place Shield weapons in Menu Screens' Armor category. 
 * Default: 0
 * @default 0
 * 
 * @param MustUseMain
 * @desc Type 1 to force equips to be placed in Main hand before they can be place in Off hand.
 * Default: 0
 * @default 0
 * 
 * @param OffhandAdjust
 * @desc Percentage of stats offhand weapons add to actors. (Make the number lower than 100 to lower stats and higher to raise)
 * Default: 100
 * @default 100
 * 
 * @param OffhandSlotName
 * @desc Name used for offhand weapon slot. 
 * Default: Off-Hand
 * @default Off-Hand
 * 
 * @param ShowTraitsInConsole
 * @desc Type 1 to show trait code,dataId and value data on console upon item equip.
 * Default: 0
 * @default 0
 *
 * @param PowerAdjustement0
 * @desc Amount of "weight" given to HP when determining strength of weapons as a percent.
 * Default: 100
 * @default 100
 *
 * @param PowerAdjustement1
 * @desc Amount of "weight" given to MP when determining strength of weapons as a percent.
 * Default: 100
 * @default 100
 *
 * @param PowerAdjustement2
 * @desc Amount of "weight" given to ATK when determining strength of weapons as a percent.
 * Default: 100
 * @default 100
 *
 * @param PowerAdjustement3
 * @desc Amount of "weight" given to DEF when determining strength of weapons as a percent.
 * Default: 100
 * @default 100
 *
 * @param PowerAdjustement4
 * @desc Amount of "weight" given to M.ATK when determining strength of weapons as a percent.
 * Default: 100
 * @default 100
 *
 * @param PowerAdjustement5
 * @desc Amount of "weight" given to M.DEF when determining strength of weapons as a percent.
 * Default: 100
 * @default 100
 *
 * @param PowerAdjustement6
 * @desc Amount of "weight" given to AGI when determining strength of weapons as a percent.
 * Default: 100
 * @default 100
 *
 * @param PowerAdjustement7
 * @desc Amount of "weight" given to LUK when determining strength of weapons as a percent.
 * Default: 100
 * @default 100
 * 
 * @param PotentialPointsInShop
 * @desc Shows Equipment "Potential" as a point total in shops.  Make this value 1 to enable, otherwise, the default calculations will be used.
 * Default: 1
 * @default 1
 *
 * @help You need two steps to use this plugin:
 * 1: Set your actor(s) up to have Dual-Wield in the Database. TRAITS => EQUIP => SLOT TYPE => DUAL WIELD
 * 2: Add the Notetag <twohand> to any two handed weapons in your Database.
 * 3: (Optional) For Shields, make them weapons in your database and add the tag <shld> to their notes. "Shields" can only be equipped to the off-hand.
 * 3a: Conversly, if you tag a weapon with <mainWeaponOnly> , it will only be equippable on the main hand.
 * 4: (Optional) For one handed Actors you wish to equip shields that are considered weapons in the DB, tag <handnshld> 
 *    to the Actor's Class notes. (Those Actors still need to have the Dual Wield trait.)
 * 5: (Optional) An Actor's Class notes can be tagged with <monkeygrip> to allow two handed weapons to be dual wielded or allow a 2H weapon and shield.
 * 6: (Optional) You can tag any weapons with <OffhandAdjust: x> with x being a number. This will allow the specific weapon to use the given value instead of the default.
 * 7: (Optional) You can tag a weapon with <subweapon> so that it's basic attack animation will not be shown in battles when in the off hand.
 * 8: (Optional) You can tag a weapon with <mainweaponTrait: x, y, z> or <subweaponTrait: x, y, z> with x being the trait code, y being the dataId, and z being the value.
 *    Weapons with the Mainweapon tag will exhibit those traits ONLY while in the main weapon slot while supweapon tagged weapons will exhibit 
 *    thier traits while in the off hand only. 
 * 9: (Optional) You can tag a weapon with <doubleGripTrait: x, y, z> with x being the trait code, y being the dataId, and z being the value.
 *    When one tagged weapon is equipped and while the actor has the <doubleGrip> tag on either class notes or a state's notes, 
 *    the double grip traits will be applied to the actor.
 * 10:(Optional) You can tag Weapons or Armor with <PotentialP: Number> with Number being a whole number to assign a starting value to the Potential Point 
 *    calculations.  Usful if things other than raw stats are used and will fator into the potential score in your project.
 *
 * Notes on main/sub/double-grip weapon traits:
 * Codes are the number representation of traits as they appear in the database.
 *  Trait codes are listed below: 
 *  11-TRAIT_ELEMENT_RATE      41-TRAIT_STYPE_ADD       61-TRAIT_ACTION_PLUS
 *  12-TRAIT_DEBUFF_RATE       42-TRAIT_STYPE_SEAL      62-TRAIT_SPECIAL_FLAG
 *  13-TRAIT_STATE_RATE        43-TRAIT_SKILL_ADD       63-TRAIT_COLLAPSE_TYPE
 *  14-TRAIT_STATE_RESIST      44-TRAIT_SKILL_SEAL      64-TRAIT_PARTY_ABILITY
 *  21-TRAIT_PARAM             51-TRAIT_EQUIP_WTYPE
 *  22-TRAIT_XPARAM            52-TRAIT_EQUIP_ATYPE
 *  23-TRAIT_SPARAM            53-TRAIT_EQUIP_LOCK
 *  31-TRAIT_ATTACK_ELEMENT    54-TRAIT_EQUIP_SEAL
 *  32-TRAIT_ATTACK_STATE      55-TRAIT_SLOT_TYPE
 *  33-TRAIT_ATTACK_SPEED
 *  34-TRAIT_ATTACK_TIMES
 *
 * DataId is the code's parameter.  For example, if you wanted to add a boost to Atk power, you would use code: 21 and the dataId would be 2.
 * The numbers here can vary based on the quantity of things in your database and what code is being used.
 *
 * The value is the amount of the effect the code will express as a float.  So, revisiting the about example, if you wanted attack to be raised by 20%,
 * you would use the value 1.2, which is 120%.
 * The final tag for this example would be:  <subweaponTrait: 21, 2, 1.2>
 *
 * A method to assist with finding the code, dataId and value figures lies in the ShowTraitsInConsole param.  Setting it to 1
 * will allow the console to print out an array of normal traits on an equipped item on the moment it is equipped.
 * (Press F8 to open the console by default.)
 * The array will list the traits in the order that they were added in the database.  So if you need to know the values, just make a dummy/temp
 * equip with the traits you want and note what their values are via the console.
 * (Note that notetag related bonuses/traits/etc not provided by this plugin cannot be used here; Those traits will be active as stipulated in thier respective plugins.) 
 *
 * As of version 2.2, a "potential" value has been introduced.
 * This value is a combination of the default stats of a weapon with differing user defined "weights" for each one.
 * This value is used for two parts of this plugin: the choosing of weapons when optimizing and when comparing equips in the
 * the shop scene.  (The shop scene potential can be deactivated by changing the PotentialPointsInShop param).
 *
 * As of version 2.3, the Shop Scene has received a small update.  Players can now cycle through PC in the scene to get detailed info
 * of an equip item.  This can be used if the Potential value is still a bit too vague.
 *
 * A script call has been added to aid those wishing to know which equip slot is housing what equip type.
 * Using the script call $gameActors.isWeaponEquipped(type) will return a number based on the defined type 
 * (type is the weapon type ID in the database.)
 * 0 if in the first equip slot,
 * 1 if it's in the second,
 * 2 if it's in both,
 * and -1 if in neither.
 * You can omit the type arguement and the function will return those numbers if their is ANY weapon is equipped in those slots. 
 */

var Mal = Mal || {}; 

Mal.Parameters = PluginManager.parameters('MalDualWield');
Mal.Param = Mal.Param || {};

Mal.power = [];
 Mal.power.push(Number(Mal.Parameters['PowerAdjustement0']));
 Mal.power.push(Number(Mal.Parameters['PowerAdjustement1']));
 Mal.power.push(Number(Mal.Parameters['PowerAdjustement2']));
 Mal.power.push(Number(Mal.Parameters['PowerAdjustement3']));
 Mal.power.push(Number(Mal.Parameters['PowerAdjustement4']));
 Mal.power.push(Number(Mal.Parameters['PowerAdjustement5']));
 Mal.power.push(Number(Mal.Parameters['PowerAdjustement6']));
 Mal.power.push(Number(Mal.Parameters['PowerAdjustement7']));

 var MalDualDatabaseLoad = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!MalDualDatabaseLoad.call(this)) return false;
  if (!DataManager._malDual_DatabaseLoaded) {
    this.processDualNotetags($dataWeapons);
    this.processDualNotetags($dataArmors);
    DataManager._malDual_DatabaseLoaded = true;
  }
  return true;
};

DataManager.processDualNotetags = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		this.createDualTraits(obj); 
	}
};

DataManager.createDualTraits = function(obj) {

var traits = [];
var noteread = obj.note;
while(noteread.indexOf("mainweaponTrait") > -1)
{ 
	var notereg = noteread.split("<mainweaponTrait: ");
	var match = notereg[1].split(", ");
	var match2 = match[2].split(">");
	match2 = match2[0];
	traits.push({"code": parseInt(match[0]), "dataId": parseInt(match[1]), "value": Number(match2)});
	noteread = noteread.replace("<mainweaponTrait: ", " ");
}
obj.mainWTraits = traits;

traits = [];
while(noteread.indexOf("subweaponTrait") > -1)
{ 
	var notereg = noteread.split("<subweaponTrait: ");
	var match = notereg[1].split(", ");
	var match2 = match[2].split(">");
	match2 = match2[0];
	traits.push({"code": parseInt(match[0]), "dataId": parseInt(match[1]), "value": Number(match2)});
	noteread = noteread.replace("<subweaponTrait: ", " ");
}
obj.subWTraits = traits;

traits = [];
while(noteread.indexOf("doubleGripTrait") > -1)
{ 
	var notereg = noteread.split("<doubleGripTrait: ");
	var match = notereg[1].split(", ");
	var match2 = match[2].split(">");
	match2 = match2[0];
	traits.push({"code": parseInt(match[0]), "dataId": parseInt(match[1]), "value": Number(match2)});
	noteread = noteread.replace("<doubleGripTrait: ", " ");
}
obj.doubleGripTraits = traits;
};
 
Game_BattlerBase.prototype.isEquipTypeSealed = function(etypeId) {
	return this.traitsSet(Game_BattlerBase.TRAIT_EQUIP_SEAL).contains(etypeId);
};
 
var MalOnSlotOK = Scene_Equip.prototype.onItemOk
Scene_Equip.prototype.onItemOk = function() {
	if (this._slotWindow.index() === 0 && !(this._itemWindow.item()) && (this._actor.equips()[1] && Mal.Parameters['MustUseMain'] == 1)) {
	SoundManager.playBuzzer();
	}else {
	SoundManager.playEquip();
    this.actor().changeEquip(this._slotWindow.index(), this._itemWindow.item());
	if (this._itemWindow.item() && Mal.Parameters['ShowTraitsInConsole'] == 1) {
	console.log(this._itemWindow.item().name + "'s traits are:");
	console.log(this._itemWindow.item().traits);
	}
	}
    this._slotWindow.activate();
    this._slotWindow.refresh();
    this._itemWindow.deselect();
    this._itemWindow.refresh();
	if (typeof Yanfly !== "undefined" && Yanfly.Equip) this._itemWindow.hide(); //Added this for compatibility with YF's Equip Core
    this._statusWindow.refresh();
	
};
 
Game_Actor.prototype.changeEquip = function(slotId, item) {
    if (this.tradeItemWithParty(item, this.equips()[slotId]) &&
            (!item || this.equipSlots()[slotId] === item.etypeId)) {
        this._equips[slotId].setObject(item);
		if (slotId == 0) {
		var slot = 1;
		} else {
		var slot = 0;
		}
		if (slotId < 2) {
		if (item && item.meta.twohand && !this.currentClass().meta.monkeygrip) {
		this.tradeItemWithParty(null, this.equips()[slot])
		this._equips[slot].setObject(null);
		}
		if (item && this.equips()[slot] && this.equips()[slot].meta.twohand && !this.currentClass().meta.monkeygrip){
		this.tradeItemWithParty(null, this.equips()[slot])
		this._equips[slot].setObject(null);
		}
		if (Mal.Parameters['MustUseMain'] == 1 && !this.equips()[0] && this.equips()[1]){
		if(!this.equips()[1].meta.shld) this._equips[0].setObject(this.equips()[1]);
		this._equips[1].setObject(null);
		}
		}
        this.refresh();
    }
};

Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
    if (item) {
		this._equips[slotId].setObject(item);
		if (slotId == 0) {
			var slot = 1;
		} else {
			var slot = 0;
		}
		if (slotId < 2) {
			if (item && item.meta.twohand && !this.currentClass().meta.monkeygrip) {
				this._equips[slot].setObject(null);
			}
			if (item && this.equips()[slot] && this.equips()[slot].meta.twohand && !this.currentClass().meta.monkeygrip){
				this._equips[slot].setObject(null);
			}
			if (Mal.Parameters['MustUseMain'] == 1 && !this.equips()[0] && this.equips()[1]){
				this._equips[0].setObject(this.equips()[1]);
				this._equips[1].setObject(null);
			}
		}
	} else {
		this._equips[slotId].setObject(null);
	}
    this.releaseUnequippableItems(true);
    this.refresh();
};

var MalEquip = Window_EquipItem.prototype.includes
Window_EquipItem.prototype.includes = function(item) {
	if (item === null) {
        if (this._slotId === 0 && (this._actor.equips()[1] && Mal.Parameters['MustUseMain'] == 1)){
		return; // false;
		} else {
		return true;
    }}
	if (this._slotId === 0 && item.meta.shld && this._actor.currentClass().meta.monkeygrip) {
	return this._actor.canEquip(item);
	}
	if (this._slotId === 0 && item.meta.shld) {
	return false;
	}
	if (this._slotId === 1 && !(item.meta.shld) && this._actor.currentClass().meta.handnshld) {
	return false;
	}
	if (this._slotId === 1 && !(this._actor.equips()[0]) && Mal.Parameters['MustUseMain'] == 1 ) {
    return false;
	}
	if (this._slotId === 1 && item.meta.mainWeaponOnly) {
    return false;
	}
    if (this._slotId < 0 || item.etypeId !== this._actor.equipSlots()[this._slotId]) {
        return false;
    }
	
    return this._actor.canEquip(item);
};


Game_Actor.prototype.optimizeEquipments = function() {
    var maxSlots = this.equipSlots().length;
    this.clearEquipments();
	this.setWeapons();
	for (var i = 2; i < maxSlots; i++) {
        if (this.isEquipChangeOk(i)) {
            this.changeEquip(i, this.bestEquipItem(i));
        }
    }
};

Game_Actor.prototype.setWeapons = function() {
	var mode = 1;
	if (this.currentClass().meta.handnshld) mode = 2;
	if (this.currentClass().meta.monkeygrip) mode = 3;
	//First weapon selection
	if (mode == 1 || mode == 2) {
		var items = $gameParty.equipItems().filter(function(item) {
        return item.etypeId === 1 && this.canEquip(item) && !item.meta.shld;
    }, this);
	}
	if (mode == 3) {
		var items = $gameParty.equipItems().filter(function(item) {
        return item.etypeId === 1 && this.canEquip(item);
    }, this);
	}
	var mainW1 = this.bestEquipW(items);
	//End first weapon
	//Second Weapon Selection (First sub)
	if (mode == 1) {
		var newItems = $gameParty.equipItems().filter(function(item) {
        return item.etypeId === 1 && this.canEquip(item) && item != mainW1 && !item.meta.twohand && !item.meta.mainWeaponOnly;
    }, this);
	}
	if (mode == 2) {
		var newItems = $gameParty.equipItems().filter(function(item) {
        return item.etypeId === 1 && this.canEquip(item) && item != mainW1  && !item.meta.twohand && item.meta.shld && !item.meta.mainWeaponOnly;
    }, this);
	}
	if (mode == 3) {
		var newItems = $gameParty.equipItems().filter(function(item) {
        return item.etypeId === 1 && this.canEquip(item) && item != mainW1;
    }, this);
	}
	var subW1 = this.bestEquipW(newItems);
	//End Second
	//Third weapon selection (Second Main)
	var subW2 = null;
	if (mode == 1 || mode == 2) {
	items = $gameParty.equipItems().filter(function(item) {
        return item.etypeId === 1 && this.canEquip(item) && !item.meta.shld && !item.meta.twohand && item != mainW1 && item != subW1;
    }, this);
	var subW2 = this.bestEquipW(items);
	}
	//End Third 
	if (subW2 !== null) {
	if(this.potential(mainW1) > this.potential(subW1) + this.potential(subW2)) {
	if (this.isEquipChangeOk(0)) this.changeEquip(0, mainW1);
	} else {
	if (this.isEquipChangeOk(0)) this.changeEquip(0, subW2);
	if (this.isEquipChangeOk(1)) this.changeEquip(1, subW1);
	}
	} else {
	if (this.isEquipChangeOk(0)) this.changeEquip(0, mainW1);
	if (this.isEquipChangeOk(1)) this.changeEquip(1, subW1);
	}
}

Game_Actor.prototype.bestEquipW = function(itemSet) {
    var items = itemSet;
    var bestItem = null;
    var bestPerformance = -1000;
    for (var i = 0; i < items.length; i++) {
        var performance = this.potential(items[i]);
        if (performance > bestPerformance) {
            bestPerformance = performance;
            bestItem = items[i];
        }
    }
    return bestItem;
};

MalBestEquip = Game_Actor.prototype.bestEquipItem
Game_Actor.prototype.bestEquipItem = function(slotId) {
    var etypeId = this.equipSlots()[slotId];
    var items = $gameParty.equipItems().filter(function(item) {
        return item.etypeId === etypeId && this.canEquip(item);
    }, this);
    var bestItem = null;
    var bestPerformance = -1000000;
    for (var i = 0; i < items.length; i++) {
        var performance = this.potential(items[i]);
        if (performance > bestPerformance) {
            bestPerformance = performance;
            bestItem = items[i];
        }
    }
    return bestItem;
};

Game_Actor.prototype.potential = function(item) {
if (item === null) return 0;
var potent = item.meta.PotentialP || 0;
for (var i = 0; i < 8; i++) {
		potent += item.params[i] * (Mal.power[i] / 100);
	}
potent = Math.round(potent);
return potent;
};

//Addition for shop scene
var malShop_drawParamChange = Window_ShopStatus.prototype.drawActorParamChange;
Window_ShopStatus.prototype.drawActorParamChange = function(x, y, actor, item1) {
    if (Mal.Parameters['PotentialPointsInShop'] == 1) {
	var width = this.contents.width - this.textPadding() - x;
    var change = this.potential(this._item) - (item1 ? this.potential(item1) : 0);
    this.changeTextColor(this.paramchangeTextColor(change));
    this.drawText((change > 0 ? '+' : '') + change, x, y, width, 'right');
	} else {
	malShop_drawParamChange.call(this, x, y, actor, item1);
	}
};

Window_ShopStatus.prototype.potential = function(item) {
if (item === null) return 0;
var potent = item.meta.PotentialP || 0;
for (var i = 0; i < 8; i++) {
		potent += item.params[i] * (Mal.power[i] / 100);
	}
potent = Math.round(potent);
return potent;
};
//End Shop Scene

var MalItemList = Window_ItemList.prototype.includes
Window_ItemList.prototype.includes = function(item) {
    switch (this._category) {
    case 'item':
        return DataManager.isItem(item) && item.itypeId === 1;
    case 'weapon':
	    if (Mal.Parameters['ShieldsArmor'] == 1){
		return DataManager.isWeapon(item) && !item.meta.shld;
		} else{
		return DataManager.isWeapon(item);
		}
    case 'armor':
	if (Mal.Parameters['ShieldsArmor'] == 1){
        return DataManager.isArmor(item) || (item && item.meta.shld);
		} else {
		return DataManager.isArmor(item);
		}
    case 'keyItem':
        return DataManager.isItem(item) && item.itypeId === 2;
    default:
        return false;
    }
};

var MalSlotName = Window_EquipSlot.prototype.slotName
Window_EquipSlot.prototype.slotName = function(index) {
    var slots = this._actor.equipSlots();
	if (index === 1 && this._actor.isDualWield()) return this._actor ? Mal.Parameters['OffhandSlotName'] : '';
    return this._actor ? $dataSystem.equipTypes[slots[index]] : '';
};

var MalDrawItem = Window_ItemList.prototype.drawItem
Window_ItemList.prototype.drawItem = function(index) {
    var item = this._data[index];
	var setting = 0;
	if (typeof Window_AugmentItemList != "undefined") {
		if (this instanceof Window_AugmentItemList) setting++;
	} 
    if (item) {
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
        this.drawItemNumber(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    } else {
		var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
		if (setting == 0) this.drawText('-UNEQUIP-', rect.x, rect.y, rect.width - numberWidth);
	}
};
Window_ShopStatus.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._item = null;
	this._maxCharPages = null;
	this._characterPage = this.setupCharPages();
    this._pageIndex = 0;
    this.refresh();
};

Window_ShopStatus.prototype.setupCharPages = function() {
	if (this._maxCharPages === null) {
	var count = this.statusMembers().length;
	if (count < 2) return -2;
	this._maxCharPages = count - 1;
	this._cursorFixed = false;
	return -1;
	}
};

Window_ShopStatus.prototype.refresh = function() {
    this.contents.clear();
	this._cursorFixed = true;
	if (!this._maxCharPages) this._characterPage = this.setupCharPages();
    if (this._item) {
        var x = this.textPadding();
        this.drawPossession(x, 0);
        if (this.isEquipItem()) {
            this.drawEquipInfo(x, this.lineHeight() * 2);
        }
    }
};

Window_ShopStatus.prototype.updatePage = function() {
    if (this.isPageChangeEnabled() && this.isPageChangeRequested()) {
        this.changePage();
    }
	if (this.isCharPageChangeEnabled() && this.isCharPageChangeRequested()) {
        if (Input.isTriggered('left')) {
			this.changeCharPage("L");
		} else {
			this.changeCharPage("R");
		}
		this.refresh();
			
    }
};

Window_ShopStatus.prototype.isCharPageChangeEnabled = function() {
    return (this._characterPage != -2 && this.visible && this.isEquipItem());
};

Window_ShopStatus.prototype.isCharPageChangeRequested = function() {
    if (Input.isTriggered('left') || Input.isTriggered('right')) {
        return true;
    }
    if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        return true;
    }
    return false;
};

Window_ShopStatus.prototype.changeCharPage = function (dir) {
var code = 1;
SoundManager.playCursor();
if (dir === "L") code = 0;
if(code == 0) {
	this._characterPage--;
	if(this._characterPage == -2) this._characterPage = this._maxCharPages;
}
if(code == 1) {
	this._characterPage++;
	if(this._characterPage > this._maxCharPages) this._characterPage = -1;
}
		this.refresh();
};

Window_ShopStatus.prototype.drawEquipInfo = function(x, y) {
    var members = this.statusMembers();
	if(this._characterPage == -2) {
		this.drawActorEquipInfoSingle(x, y + this.lineHeight() * (0 * 2.4), members[0]);
    } else if (this._characterPage == -1){
		for (var i = 0; i < members.length; i++) {
			this.drawActorEquipInfo(x, y + this.lineHeight() * (i * 2.4), members[i]);
		}
	} else this.drawActorEquipInfoSingle(x, y + this.lineHeight() * (0 * 2.4), members[this._characterPage]);
};

Window_ShopStatus.prototype.drawActorEquipInfoSingle = function(x, y, actor) {
  var enabled = actor.canEquip(this._item);
  var paramHeight = 0;
  this.changePaintOpacity(enabled);
  this.resetTextColor();
  this.drawText(actor.name(), x, y, 168);
  var item1 = this.currentEquippedItem(actor, this._item.etypeId);
  if (enabled) {
    paramHeight = this.drawActorParamChangeSingle(x, y, actor, item1);
  }
  this.drawItemName(item1, x, y + (paramHeight || this.lineHeight()));
  this.changePaintOpacity(true);
};

Window_ShopStatus.prototype.drawActorParamChangeSingle = function(x, y, actor, item1) {
  var width = this.contents.width - this.textPadding() - x;
  var change = 0;
  var lines = 0;
  var actorParam = 0;
  var paramName = ['MHP', 'MMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'];

  for (var id = 0; id < paramName.length; id++) {
    change = this._item.params[id] - (item1 ? item1.params[id] : 0);
    if (item1) {
        if (this.doublewielding(actor) && DataManager.isWeapon(item1)) {
        if(item1 === actor.equips()[0]) var item2 = actor.equips()[1];
        if(item1 === actor.equips()[1]) var item2 = actor.equips()[0];
        }
        if(this._item.meta.twohand && item2) change -= item2.params[id]; 
		if (item1.etypeId !== this._item.etypeId && item1.id !== this._item.id) {
        actorParam = this._item.params[id] > 0 ? actor.param(id) - this._item.params[id] : actor.param(id) + this._item.params[id];
      } else {
        actorParam = actor.param(id);
      }
    } else {
      actorParam = actor.param(id);
    }
    this.changeTextColor(this.paramchangeTextColor(change));
    if (change == 0) {
        this.drawText((change > 0 ? '+' : '') + '  ' + ' ' + paramName[id] + ' ' + (actorParam + change), x, y + lines, width, 'right');
    } else {
        this.drawText((change > 0 ? '+' : '') + change + ' ' + paramName[id] + ' ' + (actorParam + change), x, y + lines, width, 'right');
    };
    lines += this.lineHeight();
  }

  return lines;
};

Window_ShopStatus.prototype.currentEquippedItem = function(actor, etypeId) {
    var list = [];
    var equips = actor.equips();
    var slots = actor.equipSlots();
    for (var i = 0; i < slots.length; i++) {
        if (slots[i] === etypeId) {
        if (i < 2 && $dataClasses[actor._classId].meta.monkeygrip) {
            list.push(equips[i]);
        } else {
            if (i == 0 && !this.ignoreWeap1(actor)) list.push(equips[i]);
            if (i == 1 && !this.ignoreWeap2(actor)) list.push(equips[i]);
        }
		if (i >= 2) list.push(equips[i]);
        }
    }
    var paramId = this.paramId();
    var worstParam = Number.MAX_VALUE;
    var worstItem = null;
    for (var j = 0; j < list.length; j++) {
        if (!list[j]) {
          return null;
        }
        if (list[j] && list[j].params[paramId] < worstParam) {
            worstParam = list[j].params[paramId];
            worstItem = list[j];
        }
    }
    return worstItem;
};

Window_ShopStatus.prototype.ignoreWeap1 = function (actor) {

    if (this._item.meta.twohand && !actor.equips()[0]) return true;
	if (this._item.meta.shld && !this.dualwielding(actor)) return true;
    if (this._item.meta.shld && actor.equips()[1] && actor.equips()[1].meta.shld) return true;
    if (this.dualwielding(actor) && !actor.equips()[0]) return true;
    return false;
};

Window_ShopStatus.prototype.ignoreWeap2 = function (actor) {

    if (!actor.equips()[0]) return false;
	if (this.dualwielding(actor)) return true;
	if (this._item.meta.mainWeaponOnly) return true
    if (this._item.meta.twohand && actor.equips()[0] && !actor.equips()[0].meta.twohand) return true;
	return false;
    
};

Window_ShopStatus.prototype.dualwielding = function (actor) {

	if(actor.equips()[0] && actor.equips()[0].meta.twohand) return true;
	if(actor.equips()[1] && actor.equips()[1].meta.twohand) return true;
    return false;
};

Window_ShopStatus.prototype.doublewielding = function (actor) {

    if(actor.equips()[0] && actor.equips()[1]) return true;
    return false;
};

var MalDualBuyWindow = Scene_Shop.prototype.createBuyWindow
Scene_Shop.prototype.createBuyWindow = function() {
	MalDualBuyWindow.call(this);
	this._buyWindow.setHandler('left',     this.cycleLeft.bind(this));
	this._buyWindow.setHandler('Menu',     this.cycleRight.bind(this));
};

Scene_Shop.prototype.cycleLeft = function () {
this._statusWindow.changeCharPage("L");
};

Scene_Shop.prototype.cycleRight = function () {
this._statusWindow.changeCharPage("R");
};

var MalparamPlus = Game_Actor.prototype.paramPlus
Game_Actor.prototype.paramPlus = function(paramId) {
    var value = Game_Battler.prototype.paramPlus.call(this, paramId);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item) {
			if (i == 1) {
			if (item.meta.OffhandAdjust) {
			value += (item.params[paramId] * item.meta.OffhandAdjust / 100) ;
			} else {
				value += (item.params[paramId] * Mal.Parameters['OffhandAdjust'] / 100) ;
				}} else {
				value += item.params[paramId];
				}
		}
    }
    return value;
};

Game_Actor.prototype.attackAnimationId2 = function() {
    var weapons = this.weapons();
	if (weapons[1] && weapons[1].meta.subweapon) return 0;
    return weapons[1] ? weapons[1].animationId : 0;
};


var MalGame_Actor_allTraits = Game_Actor.prototype.allTraits;
Game_Actor.prototype.allTraits = function() {
	var traits = MalGame_Actor_allTraits.call(this);
	var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
		var item = equips[i];
		if(item) {
			if (i == 0 && item.mainWTraits) traits = traits.concat(item.mainWTraits);
			if (i == 1 && item.subWTraits) traits = traits.concat(item.subWTraits);
			if(item.doubleGripTraits && this.isDoubleGripping()) traits = traits.concat(item.doubleGripTraits);
		}
	}
	return traits;
};


Game_Actor.prototype.isDoubleGripping = function() {
    var equips = this.equips();
    return (this.hasDoubleGrip() && ((equips[0] && !equips[1]) || (equips[1] && !equips[0])));
};

Game_Actor.prototype.hasDoubleGrip = function() {
	if (this.currentClass().note.indexOf("<doubleGrip>") > -1) return true;
	var equips = this.equips();
	for (var i = 0; i < equips.length; i++) {
		if (equips[i] && equips[i].note.indexOf("<doubleGrip>") > -1) return true;
	}
	var states = this.states();
	for (var i = 0; i < states.length; i++) {
		if (states[i].note.indexOf("<doubleGrip>") > -1) return true;
	}
	return false;
}

Game_Actor.prototype.isWeaponEquipped = function(type) {
if (type) {
var type = Number(type);
} else {
var type = 0;
}
if (type == 0){
	if (this.equips()[0]) {
		if (this.equips()[1]) return 2;
		return 0;
	}
	if (this.equips()[1]) return 1;
	return -1;
} else {
	if (this.equips()[0] && this.equips()[0].wtypeId == type) {
		if (this.equips()[1] && this.equips()[1].wtypeId == type) return 2;
		return 0;
	}
	if (this.equips()[1] && this.equips()[1].wtypeId == type) return 1;
	return -1;
}
};

Game_Enemy.prototype.isWeaponEquipped = function(type) {
return -1;
};