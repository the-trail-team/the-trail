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

    var fs = require('fs');
    var path = './SCREENSHOTS';

    try {
      fs.mkdir(path, function(){
        var fileName = path + '/' + $.generateFileName();

        var snap = SceneManager.snap();
        var urlData = snap._canvas.toDataURL();
        var base64Data = urlData.replace(/^data:image\/png;base64,/, "");

        fs.writeFile(fileName, base64Data, 'base64', function(error){
          if (error !== undefined && error !== null) {
            alert("An error occured while saving the screenshot.");
            console.error('An error occured while saving the screenshot', error); 
          }
        });
      });
    } catch(error) {
      if (error !== undefined && error !== null) {
        alert("An error occured while saving the screenshot.");
        console.error('An error occured while saving the screenshot:', error);
      }
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