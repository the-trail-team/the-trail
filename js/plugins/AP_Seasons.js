//=============================================================================
/*:
 * @author NoLongerLucky
 * @plugindesc Detects seasons.
 */
//=============================================================================

var Seasons_Scene_Title_initialize = Scene_Title.prototype.initialize;
Scene_Title.prototype.initialize = function() {
    Seasons_Scene_Title_initialize.call(this);
    this.holidaySeason();
}

Scene_Title.prototype.holidaySeason = function() {
    var currentMonth = Date().split(" ")[1];
    if (currentMonth == "Dec") {
        $gameSwitches.setValue(81, true);
    } else {
        $gameSwitches.setValue(81, false);
    }
    console.log(currentMonth);
}
