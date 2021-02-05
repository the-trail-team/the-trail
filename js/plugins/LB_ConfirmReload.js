/*:
 * @plugindesc On pressing F5, asks the player to confirm that the game should be reloaded
 * @author LadyBaskerville
 *
 * @param Message
 * @desc The message that is displayed when the player presses F5.
 * @default Do you want to reload the game and return to the title screen? All progress since the last save will be lost.
 *
 * @help
 * Confirm Reload
 * Version 1.00
 * by LadyBaskerville
 * LB_ConfirmReload.js
 *
 * Free for use in both non-commercial and commercial games.
 * Credit appreciated, but not required.
 *
 */

var LB = LB || {};
LB.ConfirmReload = LB.ConfirmReload || {};

LB.ConfirmReload.message = String(PluginManager.parameters('LB_ConfirmReload')['Message'])

LB.ConfirmReload._SceneManager_onKeyDown = SceneManager.onKeyDown;
SceneManager.onKeyDown = function(event) {
    if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
        case 116:   // F5
            if (Utils.isNwjs()) {
				if (window.confirm(LB.ConfirmReload.message)) {
					location.reload();
				}
            }
            break;
        case 119:   // F8
            if (Utils.isNwjs() && Utils.isOptionValid('test')) {
                require('nw.gui').Window.get().showDevTools();
            }
            break;
        }
    }
};

