var AP = AP || {};
AP.Leaderboard = AP.Leaderboard || {};

//=============================================================================
// API_ITCH
//=============================================================================

function API_ITCH() {
    this.initialize.apply(this, arguments);
};

API_ITCH.prototype = Object.create(Object.prototype);
API_ITCH.prototype.constructor = API_ITCH;

API_ITCH.prototype.initialize = function() {
    this._authUrl = `https://itch.io/user/oauth?client_id=1f07ac3cbec324309359a4983aedd4a6&scope=profile%3Ame&response_type=token&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob`;
};

API_ITCH.prototype.authenticate = function() {
    nw.Shell.openExternal(this._authUrl);
};

API_ITCH.prototype.keyPrompt = function() {
    const KEY = prompt("Paste in your API key:");
    fetch(`https://itch.io/api/1/${KEY}/me`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => alert("Username: " + data.user.username))
    .catch(err => alert("Error fetching user data: " + err));
};

//=============================================================================
// Scene_Menu
//=============================================================================

Scene_Menu.prototype.commandLeaderboard = function() {
    const API = new API_ITCH();
    API.authenticate();
    API.keyPrompt();
    this._commandWindow.activate();
};