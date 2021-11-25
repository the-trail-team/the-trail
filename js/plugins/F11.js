// Bind fullscreen toggle to F11 (in addition to F4)
// by orlando
// Date: 06/01/2016

//=============================================================================


/*:
 * @plugindesc Binds fullscreen toggling to F11 in addition to the default F4
 * @author orlando
 * @license Common, this snippet is absolutely trivial :) you could have thought of it yourself! I don't care what you do with it, do anything you want.
 */

Graphics._prePatchF11Down_onKeyDown =
    Graphics._onKeyDown;
Graphics._onKeyDown = function(event) {
    if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
        case 122:   // F11
            event.preventDefault();
            this._switchFullScreen();
            return;
        }
    }
    return this._prePatchF11Down_onKeyDown(event);
};