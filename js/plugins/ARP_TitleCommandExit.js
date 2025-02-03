//=============================================================================
// ARP_TitleCommandExit.js
//=============================================================================

/*:
 * @plugindesc v1.00 Adds an option in the title command window to close
 * game window.
 * @author Atreyo Ray
 *
 * @param Command Exit
 * @desc The text that should appear as the exit command.
 * @default Quit
 *
 * @param Show Exit
 * @desc Highly recommended to only show when deploying to Windows
   or Mac iOS. For HTML or mobiles, make it false.
 * @default true
 *
 * @help This plugin does not provide plugin commands.
 */

(function() {

    var parameters = PluginManager.parameters('ARP_TitleCommandExit');
    var showExit = parameters['Show Exit'];
    Object.defineProperty(TextManager, 'exitGame', {
        get: function() { return parameters['Command Exit']; },
        configurable: true
    });

    // TitleCommand
    var _Window_TitleCommand_makeCommandList = 
            Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.call(this);
        if (eval(showExit)){
            this.addCommand(TextManager.exitGame, 'exitGame');
        }
    };

    var _Scene_Title_createCommandWindow =
            Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler('exitGame', this.commandExitGame.bind(this));
    };

    Scene_Title.prototype.commandExitGame = function() {
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager.exit();
    };

    // GameEnd
    Window_GameEnd.prototype.makeCommandList = function() {
        this.addCommand(TextManager.toTitle, 'toTitle');
        if (eval(showExit)){
            this.addCommand(TextManager.exitGame, 'exitGame');
        }
        this.addCommand(TextManager.cancel,  'cancel');
    };

    var _Scene_GameEnd_createCommandWindow =
            Scene_GameEnd.prototype.createCommandWindow;
    Scene_GameEnd.prototype.createCommandWindow = function() {
        _Scene_GameEnd_createCommandWindow.call(this);
        this._commandWindow.setHandler('exitGame', this.commandExitGame.bind(this));
    };

    Scene_GameEnd.prototype.commandExitGame = function() {
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager.exit();
    };

})();