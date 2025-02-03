//=============================================================================
// main.js
//=============================================================================

PluginManager.setup($plugins);

window.onload = function() {
    SceneManager.run(Scene_Boot);
    $droppeditems = [] // Added to initialize MOG/YEP VA Drops in an easy to find location.
};
