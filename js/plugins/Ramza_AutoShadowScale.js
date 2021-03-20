//=============================================================================
// Ramza Plugins - Automatic Actor Shadow Sprite Scaling
// Ramza_AutoShadowScale.js
// v1.00
//=============================================================================

var Ramza = Ramza || {};
Ramza.ASS = Ramza.ASS || {};
Ramza.ASS.version = 1.00

//=============================================================================
 /*:
* @plugindesc v1.00 Automatically scales the shadow sprite beneath SV Actors when they are not the standard size.
* @author Ramza
*
* @help
* ============================================================================
* Description
* ============================================================================
*
* This plugin makes it so that any actor who has a larger or smaller than 
* normal battler sprite will also have their shadow sprite change scale to 
* match. This doesn't affect enemies. If you use a script to change the actor's
* sprite during a battle, the shadow sprite will scale immediately to match 
* the new sprite. There are no settings to be changed.
*
* If you are using Yanfly's BattleEngineCore plugin, you will need to place 
* this plugin below it in your load order for the change to take effect.
* 
* ============================================================================
* Change Log
* ============================================================================
* v1.00
* -Initial release.
*/



Sprite_Actor.prototype.updateShadow = function() {
    this._shadowSprite.visible = !!this._actor;
//	console.log(this._mainSprite.bitmap)
	var scaleX = (this._mainSprite.bitmap) ? this._mainSprite.bitmap.width / 9 / 64 : 1;
	var scaleY = (this._mainSprite.bitmap) ? this._mainSprite.bitmap.width / 9 / 64 : 1;
    this._shadowSprite.scale.x = scaleX;
    this._shadowSprite.scale.y = scaleY;
};
if(Yanfly && Yanfly.BEC){
	Yanfly.BEC.Sprite_Actor_updateShadow = Sprite_Actor.prototype.updateShadow;
	Sprite_Actor.prototype.updateShadow = function() {
		if (this._hideShadows === undefined) {
			this._hideShadows = Yanfly.Param.BECShowShadows;
		}
		if (!this._hideShadows) return this._shadowSprite.visible = false;
			Yanfly.BEC.Sprite_Actor_updateShadow.call(this);
	};
}