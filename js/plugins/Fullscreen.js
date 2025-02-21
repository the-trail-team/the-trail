//=============================================================================
// Fullscreen.js
//=============================================================================
 
/*:
 * @plugindesc Starts the game in fullscreen
 * @author Christian Schicho
 *
 * @help
 */
 
;(function() {
  function extend(obj, name, func) {
    var orig = obj.prototype[name]
    obj.prototype[name] = function() {
      orig.call(this)
      func.call(this)
    }
  }
 
  extend(Scene_Boot, 'start', function() {
		if (Graphics._isFullScreen()) Graphics._switchFullScreen();
  })
  
  extend(Scene_Base, 'create', function() {
		Graphics.width = 1280;
		Graphics.height = 720;
		Graphics.boxWidth = 1280;
    Graphics.boxHeight = 720;
  })
 
})()