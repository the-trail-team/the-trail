/*:
 * @plugindesc Allows for developers to customize all the visible parameters that can be seen on the Equip Screen.
 * @author SumRndmDde
 *
 * @param Default Pos Color
 * @desc The default color used for positive stat gains.
 * @default #80ff80
 *
 * @param Default Neg Color
 * @desc The default color used for negative stat gains.
 * @default #c08080
 *
 * @param Window Width
 * @desc The width of the Stat Comparison window.
 * @default 356
 *
 * @param Font Size
 * @desc The font size of the stat comparisons.
 * @default 24
 *
 * @param Line Padding
 * @desc The padding in between each line.
 * @default 8
 *
 * @param Stat List
 * @type struct<Stat>[]
 * @default []
 *
 * @help
 *
 * Equip Compare Upgrade
 * Version 1.01
 * SumRndmDde
 *
 *
 * This plugin allows for developers to customize all the visible stats that 
 * can be seen on the Equip Screen. Furthermore, it sets the comparison window
 * to only show the stats that are being changed.
 *
 *
 * ==============================================================================
 *  How to Set Up Stats
 * ==============================================================================
 *
 * In order to set up a stat to be available to the Comparison Window, you need
 * three things:
 *
 *  -  Name
 *  -  Formula for determining the stat
 *  -  String format it will appear as
 *
 *
 * In order to set up the name, simply use the "Stat X Name" parameters.
 *
 * In order to set up the formula for find the stat based off of an Actor
 * object, simply input it into the "Stat X Eval" parameters.
 *
 * In order to set up the format of the string, and determine what other 
 * characters will be shown, simply use the "Stat X Format" parameters.
 *
 *
 * For the most part, you should be able to figure out the system through
 * the parameters that are set up by default in the plugin.
 *
 *
 * ==============================================================================
 *  Formatting the Colors
 * ==============================================================================
 *
 * You can use notetags in the "Stat X Format" parameter to customize the colors
 * used for the comparison.
 *
 *   <Pos Color: [color]>
 *   <Neg Color: [color]>
 *
 * Input the "Pos Color" or positive color for when a stat is increased.
 * Input the "Neg Color" or negative color for when a stat is decreased.
 *
 *
 * ==============================================================================
 *  End of Help File
 * ==============================================================================
 * 
 * Welcome to the bottom of the Help file.
 *
 *
 * Thanks for reading!
 * If you have questions, or if you enjoyed this Plugin, please check
 * out my YouTube channel!
 *
 * https://www.youtube.com/c/SumRndmDde
 *
 *
 * Until next time,
 *   ~ SumRndmDde
 */
 /*~struct~Stat:
 * @param Name
 * @desc The name of the stat that is shown on the window.
 * @default 
 * 
 * @param Eval
 * @desc The evaluation of the stat; it must eval to a number.
 * Use 'actor' to reference the actor object.
 * @default 
 * 
 * @param Format
 * @desc The String format of the values.
 * Use 'val' to represent the value.
 * @default val
 * 
 * @param Reverse Colors
 * @type boolean
 * @default false
 * 
 * @param Category
 * @type select
 * @option Other
 * @option Core Stat
 * @option Decimal Place
 * @option Elemental Attack
 * @option ON/OFF
 * @option Attack Skill
 * @option Guard Skill
 * @default Other
 * 
 * @param Extra
 * @type number
 * @desc For occasional extra data
 * @default 
 */

var SRD = SRD || {};
SRD.EquipCompareUpgrade = SRD.EquipCompareUpgrade || {};

var Imported = Imported || {};
Imported["SumRndmDde Equipment Comparison Upgrade"] = 1.01;

(function(_) {

"use strict";

//-----------------------------------------------------------------------------
// SRD.EquipCompareUpgrade
//-----------------------------------------------------------------------------

const params = PluginManager.parameters('SRD_EquipCompareUpgrade');

_.defaultPos = String(params['Default Pos Color']);
_.defaultNeg = String(params['Default Neg Color']);
_.windowWidth = parseInt(params['Window Width']);
_.fontSize = parseInt(params['Font Size']);
_.fontPad = parseInt(params['Line Padding']);
_.stats = [{}].concat(SRD.parse(params['Stat List']));

_.names = [];
_.evals = [];
_.tags = [];
_.forms = [];
_.reves = [];
_.cates = [];
_.extrs = [];
for(let i = 1; i < _.stats.length; i++) {
	const name = String(_.stats[i]['Name']);
	const evil = String(_.stats[i]['Eval']);
	const form = String(_.stats[i]['Format']);
	const reve = _.stats[i]['Reverse Colors'] === 'true';
	const cate = String(_.stats[i]['Category']);
	const extr = Number(_.stats[i]['Extra']);

	_.names[i] = name;
	_.evals[i] = evil;
	_.tags[i] = form;
	_.forms[i] = form;
	_.forms[i] = _.forms[i].replace(/\s*<Pos\s*Color\s*:\s*[^>]*\s*>\s*/, '');
	_.forms[i] = _.forms[i].replace(/\s*<Neg\s*Color\s*:\s*[^>]*\s*>\s*/, '');
	_.reves[i] = reve;
	_.cates[i] = cate;
	_.extrs[i] = extr;

	if (_.cates[i] == 'Decimal Place') _.evals[i] = "(" + _.evals[i] + " * 100).toFixed(1)";
}

//-----------------------------------------------------------------------------
// Window_EquipStatus
//-----------------------------------------------------------------------------

Window_EquipStatus.prototype.windowWidth = function() {
	return _.windowWidth;
};

Window_EquipStatus.prototype.drawParamName = function(x, y, paramId) {
	this.changeTextColor(this.systemColor());
	this.drawText(_.names[paramId], x, y, this.width - (312 - 120));
};

Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
	this.resetTextColor();
	const actor = this._actor;
	const param = eval(_.evals[paramId]);
	const result = _.forms[paramId].replace(/val/, param);
	this.drawText(result, x, y, 48, 'right');
};

Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
	let actor = this._tempActor;
	const newValue = eval(_.evals[paramId]);
	actor = this._actor;
	const diffvalue = newValue - eval(_.evals[paramId]);
	const result = _.forms[paramId].replace(/val/, newValue);
	this.changeTextColor(this.paramchangeTextColor(diffvalue, paramId));
	this.drawText(result, x, y, 48, 'right');
};

Window_EquipStatus.prototype.drawHorzLine = function(y) {
	const lineY = y + this.lineHeight() / 2 - 1;
	this.contents.paintOpacity = 48;
	this.contents.fillRect(0, lineY, this.contentsWidth(), 2, "#FFFFFF");
	this.contents.paintOpacity = 255;
};

Window_EquipStatus.prototype.paramchangeTextColor = function(change, paramId) {
    if (change > 0) {
        return this.powerUpColor(paramId);
    } else if (change < 0) {
        return this.powerDownColor(paramId);
    } else {
        return this.normalColor();
    }
};

const _Window_EquipStatus_powerUpColor = Window_EquipStatus.prototype.powerUpColor;
Window_EquipStatus.prototype.powerUpColor = function(paramId) {
	if(_.tags[paramId] && _.tags[paramId].match(/\s*<Pos\s*Color\s*:\s*([^>]*)\s*>\s*/)) {
		return String(RegExp.$1);
	}
	if (_.reves[paramId]) return _.defaultNeg;
    return _.defaultPos;
};

const _Window_EquipStatus_powerDownColor = Window_EquipStatus.prototype.powerDownColor;
Window_EquipStatus.prototype.powerDownColor = function(paramId) {
	if(_.tags[paramId] && _.tags[paramId].match(/\s*<Neg\s*Color\s*:\s*([^>]*)\s*>\s*/)) {
		return String(RegExp.$1);
	}
	if (_.reves[paramId]) return _.defaultPos;
    return _.defaultNeg;
};

Window_EquipStatus.prototype.refresh = function() {
	if(this._actor) {
		this.contents.clear();
		this.drawActorName(this._actor, this.textPadding(), 0);
		this.drawHorzLine(_.fontSize);
		if(this._tempActor) {
			const y = _.fontSize + (_.fontPad * 3);
			let place = 0;
			for(var i = 1; i < _.names.length; i++) {
				if(_.names[i]) {
					let actor = this._tempActor;
					const newValue = eval(_.evals[i]);
					actor = this._actor;
					const diffvalue = newValue - eval(_.evals[i]);
					if(diffvalue !== 0) {
						this.drawItem(0, y + (_.fontSize + _.fontPad) * (place), i);
						place++;
					}
				}
			}
		}
	}
};

Window_EquipStatus.prototype.drawItem = function(x, y, paramId) {
	this.drawParamName(x + this.textPadding(), y, paramId);
	if (this._actor) {
		this.drawCurrentParam(x + this.width - (312 - 140), y, paramId);
	}
	this.drawRightArrow(x + this.width - (312 - 188), y);
	if (this._tempActor) {
		this.drawNewParam(x + this.width - (312 - 222), y, paramId);
	}
};

Window_EquipStatus.prototype.standardFontSize = function() {
	return _.fontSize;
};

//-----------------------------------------------------------------------------
// Window_StatCompare
//-----------------------------------------------------------------------------

if(Imported.YEP_EquipCore) {

Window_StatCompare.prototype.showStat = function(paramId, diffvalue) {
	return (
		(_.cates[paramId] == "Core Stat") || // ATK, DEF, MAT, MDF, AGI always show
		(["Other", "Decimal Place", "ON/OFF"].contains(_.cates[paramId]) && diffvalue != 0) || // All other stats besides attack element changes show if changed
		(_.cates[paramId] == "Elemental Attack" && this._actor.attackElements().contains(_.extrs[paramId]) != this._tempActor.attackElements().contains(_.extrs[paramId])) || // Attack element changes
		(_.cates[paramId] == "Attack Skill" && this._actor.replaceAttackSkillId() != this._tempActor.replaceAttackSkillId()) || // Attack Skill
		(_.cates[paramId] == "Guard Skill" && this._actor.replaceGuardSkillId() != this._tempActor.replaceGuardSkillId()) // Guard Skill
	);
};

Window_StatCompare.prototype.drawTitle = function() {
	this._lineHeight = Yanfly.Param.LineHeight;
	this.contents.fontSize = 28;
	this.drawText("Stat Comparison", 0, 0, this.contents.width, 'center');
	this._lineHeight = null;
	this.contents.fontSize = this.standardFontSize();
};

Window_StatCompare.prototype.refresh = function() {
	if(this._actor && this._tempActor) {
		this.contents.clear();
		this.changeTextColor(this.systemColor());
		this.drawTitle();
		let place = 1;
		for (i = 1; i < _.names.length; i++) {
			if (!_.names[i]) continue;
			let actor = this._tempActor;
			const newValue = eval(_.evals[i]);
			actor = this._actor;
			const diffvalue = newValue - eval(_.evals[i]);

			if (this.showStat(i, diffvalue)) {
				this.drawItem(
					(this.contents.width * ((place - 1) % 5)) / 5, 
					Yanfly.Param.LineHeight + 8 + Math.floor((place - 1) / 5) * ((this.lineHeight() * 4) + 2), 
					i
				);
				place++;
			}
		}
	}
};

Window_StatCompare.prototype.drawParamName = function(x, y, paramId) {
	this.changeTextColor(this.systemColor());
	this.drawText(_.names[paramId], x, y, this.contents.width / 5, 'center');
};

Window_StatCompare.prototype.drawCurrentParam = function(x, y, paramId) {
    this.resetTextColor();
	const actor = this._actor;
	const param = eval(_.evals[paramId]);
	const result = _.forms[paramId].replace(/val/, param);
    this.drawText(result, x, y + this.lineHeight(), this.contents.width / 5, 'center');
};

Window_StatCompare.prototype.drawNewParam = function(x, y, paramId) {
    let actor = this._tempActor;
	const newValue = eval(_.evals[paramId]);
	actor = this._actor;
	const diffvalue = newValue - eval(_.evals[paramId]);
	const result = _.forms[paramId].replace(/val/, newValue);
    this.changeTextColor(this.textColor(diffvalue == 0 ? 7 : 14));
    this.drawText(result, x, y + this.lineHeight() * 3, this.contents.width / 5, 'center');
};

Window_StatCompare.prototype.drawParamDifference = function(x, y, paramId) {
	let actor = this._tempActor;
	const newValue = eval(_.evals[paramId]);
	actor = this._actor;
	var diffvalue = newValue - eval(_.evals[paramId]);
	if (diffvalue === 0) return;
	if (["Elemental Attack", "ON/OFF", "Attack Skill", "Guard Skill"].contains(_.cates[paramId])) {
		this.drawRightArrow(x, y);
		return;
	}
	if (_.cates[paramId] == "Decimal Place") diffvalue = diffvalue.toFixed(1);
	this.changeTextColor(this.paramchangeTextColor(diffvalue, paramId));
	var text = Yanfly.Util.toGroup(diffvalue) + _.forms[paramId].replace(/val/, "");
	if (diffvalue > 0) {
		text = ' (+' + text + ')';
	} else {
		text = ' (' + text + ')';
	}
	this.drawText(text, x, y + this.lineHeight() * 2, this.contents.width / 5, 'center');
};

Window_StatCompare.prototype.paramchangeTextColor = function(change, paramId) {
    if (change > 0) {
        return this.powerUpColor(paramId);
    } else if (change < 0) {
        return this.powerDownColor(paramId);
    } else {
        return this.normalColor();
    }
};

const _Window_StatCompare_powerUpColor = Window_StatCompare.prototype.powerUpColor;
Window_StatCompare.prototype.powerUpColor = function(paramId) {
	if(_.tags[paramId] && _.tags[paramId].match(/\s*<Pos\s*Color\s*:\s*([^>]*)\s*>\s*/)) {
		return String(RegExp.$1);
	}
	if (_.reves[paramId]) return _.defaultNeg;
    return _.defaultPos;
};

const _Window_StatCompare_powerDownColor = Window_StatCompare.prototype.powerDownColor;
Window_StatCompare.prototype.powerDownColor = function(paramId) {
	if(_.tags[paramId] && _.tags[paramId].match(/\s*<Neg\s*Color\s*:\s*([^>]*)\s*>\s*/)) {
		return String(RegExp.$1);
	}
	if (_.reves[paramId]) return _.defaultPos;
    return _.defaultNeg;
};

}

})(SRD.EquipCompareUpgrade);