(function(alias){
    SceneManager.clearStack = function() {
        alias.call(this);
        SceneManager.preserveScene(null);
    };
    })(SceneManager.clearStack);
    
    SceneManager.preserveScene = function(scene){
      if(this._preserved){
        this._preserved.stop();
        this._preserved.terminate();
        this._preserved.detachReservation();
      }
      if(scene){
        this._preserved=scene;
        scene._isPreserved=true;
      }else delete this._preserved;
    };
    
    Spriteset_Map.prototype.showCharacters = function() {
        for (var i = 0; i < this._characterSprites.length; i++) {
            this._characterSprites[i].show();
        }
    };
    
    (function(alias){
    SceneManager.changeScene = function() {
        if((this._scene&&this._scene._isPreserved)||(this._nextScene&&this._nextScene._isPreserved)) {
          if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
              if (this._scene) {
                if(!this._scene._isPreserved){
                  this._scene.terminate();
                  this._scene.detachReservation();
                } else{
                  SceneManager.snapForBackground();
                  $gameScreen.clearZoom();
                }
                  this._previousClass = this._scene.constructor;
              }
              this._scene = this._nextScene;
              if (this._scene) {
                if(!this._scene._isPreserved){
                  this._scene.attachReservation();
                  this._scene.create();
                  this.onSceneCreate();
                  this._sceneStarted = false;
                }else{
                  this._scene._active=true;
                  this._scene.menuCalling = false;
                  if(this._previousClass==Scene_Battle){
                    this._scene.startFadeIn(this._scene.fadeSpeed(), false);
                    this._scene._spriteset.showCharacters();
                  }
                }
                this._nextScene = null;
                delete this._scene._isPreserved;
              }
              if (this._exiting) {
                  this.terminate();
              }
          }
        }else {
          alias.call(this);
        }
    };
    })(SceneManager.changeScene);
    
    (function(alias){
    SceneManager.goto = function(sceneClass) {
        //preserve map scene before battle and menu
        if(this._scene && this._scene instanceof Scene_Map){
          if(sceneClass!=Scene_Map){
            this.preserveScene(this._scene);
          }
        }
        if(this._preserved){
          if (sceneClass) {
            if(this._preserved instanceof sceneClass){
              this._nextScene = this._preserved;
              delete this._preserved;
            }else{
              this._nextScene = new sceneClass();
            }
          }
          if (this._scene!=this._preserved) {
              this._scene.stop();
          }else{
              this._preserved._active=false;
              if(sceneClass==Scene_Battle) {
                this._scene.launchBattle();
              }
          }
        }else alias.call(this,sceneClass);
    };
    })(SceneManager.goto);