//=============================================================================
/*:
 * @author NoLongerLucky
 * @plugindesc Detects seasons.
 */
//=============================================================================

//
// CHRISTMAS
//

if (Date().split(" ")[1] == "Dec") {

    // Switch

    Scene_Title.prototype.holidaySeason = function() {
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
}