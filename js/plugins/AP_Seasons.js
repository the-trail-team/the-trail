//=============================================================================
/*:
 * @author NoLongerLucky
 * @plugindesc Detects seasons.
 */
//=============================================================================

var Seasons_Scene_Title_initialize = Scene_Title.prototype.initialize;
date = new Date();

//
// CHRISTMAS
//

if (date.getMonth() === 11) {

    // Switch

    var Seasons_Scene_Title_initialize = Scene_Title.prototype.initialize;
    Scene_Title.prototype.initialize = function() {
        Seasons_Scene_Title_initialize.call(this);
        $gameSwitches.setValue(81, true);
    }

    // Window Skin

    Window_Base.prototype.loadWindowskin = function() {
        this.windowskin = ImageManager.loadSystem('Window_Christmas');
    }

    // Menu Particles

    Moghunter.mpart_oy *= -1;

    Scene_MenuBase.prototype.set_particle_img = function() {
        if (this._self_par && SceneManager._scene) {return SceneManager._scene.constructor.name + "_par"}
        if ($gameSwitches.value(81)) {
            return "Snow";
        } else {
            return "Particles";
        }
    };
} else {
    Scene_Title.prototype.initialize = function() {
        Seasons_Scene_Title_initialize.call(this);
        $gameSwitches.setValue(81, false);
    }
}