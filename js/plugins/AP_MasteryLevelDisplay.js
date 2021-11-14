//=============================================================================
/*:
 * @author NoLongerLucky
 * @plugindesc Overrides Window_SkillList.prototype.drawItem
 */
//=============================================================================

Window_SkillList.prototype.drawItem = function(index) {
    var skill = this._data[index];
    if (skill) {
        var costWidth = this.costWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(skill));
        this.drawSkillName(skill, rect.x, rect.y, rect.width - costWidth);
        this.drawSkillCost(skill, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    }
};

Window_SkillList.prototype.drawSkillName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        this._gaugeH = 4;
        this.drawSkillMasteryGauge(item, x, y, width + 48);
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        var offset = this.contents.measureTextWidth(item.name);
        if (this._actor.skillMasteryLevel(item) == 0 && this._actor.isMaxedSkillMasteryLevel(item)) return;
        this.changeTextColor(this.textColor(29));
        this.contents.fontSize = 16;
        this.drawText(" LV." + this._actor.skillMasteryLevel(item), x + iconBoxWidth + offset + 4, y, width - iconBoxWidth);
    }
};

Window_BattleSkill.prototype.drawSkillName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        // this._gaugeH = 2;
        // this.drawSkillMasteryGauge(item, x - 8, y, width + 36);
        var iconBoxWidth = Math.round(Window_Base._iconWidth * this.scaleRate()) + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        var offset = this.contents.measureTextWidth(item.name);
        if (this._actor.skillMasteryLevel(item) == 0 && this._actor.isMaxedSkillMasteryLevel(item)) return;
        this.changeTextColor(this.textColor(29));
        this.contents.fontSize = 12;
        this.drawText(" LV." + this._actor.skillMasteryLevel(item), x + iconBoxWidth + offset + 4, y, width - iconBoxWidth);
    }
};