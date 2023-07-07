/*:
* @plugindesc Trigger Event Before Victory
* @author mrcopra
* 
* @param Switch
* @desc The Switch number(when the switch turn on it will stop victory)
* @default 1
* 
* @help Turn the Switch on to prevent victory and turn it on after you trigged the event
*
*/
 (function() {
     
     var parameters = PluginManager.parameters('Event Before Victory');
     var Switch = Number(parameters['Switch'] || 1);
    
BattleManager.checkBattleEnd = function() {
    if (this._phase) {
        if (this.checkAbort()) {
            return true;
        } else if ($gameParty.isAllDead()) {
            this.processDefeat();
            return true;
        } else if ($gameTroop.isAllDead()&&$gameSwitches.value(Switch)==false) {
            this.processVictory();
            return true;
        }
    }
    return false;
};
    

     
 })();


