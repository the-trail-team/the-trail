/*=============================================================================
 * Orange - Screenshot Saver
 * By Hudell - www.hudell.com
 * OrangeScreenshotSaver.js
 * Version: 1.0
 * Free for commercial and non commercial use.
 *=============================================================================*/
 /*:
 * @plugindesc This plugin will automatically save screenshots in a "Screenshots" folder inside the game
 *             
 * @author Hudell
 */
var Imported = Imported || {};

var OrangeScreenshotSaver = OrangeScreenshotSaver || {};

(function($) {
  "use strict";

  $.generateFileName = function(){
    var date = new Date();
    return '' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '_' + date.getMilliseconds() + '.png';
  };

  $.saveScreenshot = function(){
    if (!Utils.isNwjs()) return;

    $gameSystem.setShowMapQuestWindow(false);

    var fs = require('fs');
    var path = './SCREENSHOTS';

    try {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
      var fileName = path + '/' + $.generateFileName();

      setTimeout(function() {
        requestAnimationFrame(function() {
          var snap = SceneManager.snap();
          var urlData = snap._canvas.toDataURL();
          var base64Data = urlData.replace(/^data:image\/png;base64,/, "");
        
          fs.writeFileSync(fileName, base64Data, 'base64');
  
          setTimeout(function() {
            $gameSystem.setShowMapQuestWindow(true);
          }, 100);
        });
      }, 100);
    } catch (error) {
      console.error("An error occurred while saving the screenshot:", error);
      alert("Screenshot failed: " + error.message);
      $gameSystem.setShowMapQuestWindow(true);
    }    
  };

  var oldInput_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event) {
    oldInput_onKeyUp.call(this, event);

    if (event.keyCode == 44) {
      $.saveScreenshot();
      AudioManager.playSe({name: "Save", pan: 0, pitch: 100, volume: 100});
    }
  };
})(OrangeScreenshotSaver);

Imported["OrangeScreenshotSaver"] = true;