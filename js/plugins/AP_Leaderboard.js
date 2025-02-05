//=============================================================================
// API_ITCH
//=============================================================================

API_ITCH = new Object();

API_ITCH._authUrl = `https://itch.io/user/oauth?client_id=1f07ac3cbec324309359a4983aedd4a6&scope=profile%3Ame&response_type=token&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob`;
API_ITCH._keyVariable = 81;
API_ITCH._dataVariable = 82;

API_ITCH.authenticate = function() {
    nw.Shell.openExternal(this._authUrl);
    this.setKey(prompt("Paste in your API key:"));
    fetch(`https://itch.io/api/1/${this.getKey()}/me`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        this.setData(data.user);
        alert("Successfully logged in " + this.username());
    })
    .catch(err => {
        alert("Error fetching user data: " + err);
        this.resetKey();
    });
};

API_ITCH.logout = function() {
    alert("You have logged out of " + this.username());
    this.resetKey();
    this.resetData();
};

API_ITCH.loggedIn = function() {
    return this.getKey() != 0 && this.getData() != [];
};

API_ITCH.getKey = function() {
    return $gameVariables.value(this._keyVariable);
};

API_ITCH.setKey = function(key) {
    $gameVariables.setValue(this._keyVariable, key);
};

API_ITCH.resetKey = function() {
    this.setKey(0);
};

API_ITCH.getData = function() {
    data = $gameVariables.value(this._dataVariable);
    return data != 0 ? data : [];
};

API_ITCH.setData = function(data) {
    $gameVariables.setValue(this._dataVariable, data);
};

API_ITCH.resetData = function() {
    this.setData([]);
};

API_ITCH.username = function() {
    return this.getData().username;
};

API_ITCH.userId = function() {
    return this.getData().id;
};

//=============================================================================
// API_LEADERBOARD
//=============================================================================

API_LEADERBOARD = new Object();

API_LEADERBOARD._url = `https://script.google.com/macros/s/AKfycby0KHaXUKbUi4aXDCE7eNp-JRbLMJC_86OcgzmZ3gpmI7YUIOTXkWljjeU78kRRsTs/exec`;
API_LEADERBOARD._data = API_LEADERBOARD._data || {};

API_LEADERBOARD.fetchLeaderboard = function(leaderboard) {
    url = this._url + "?leaderboard=" + leaderboard;
    fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        this.setLeaderboard(leaderboard, data);
    })
    .catch(error => alert("Error fetching data: " + error));
};

API_LEADERBOARD.addToLeaderboard = function(leaderboard, value) {
    fetch(this._url, {
        method: "POST",
        body: JSON.stringify([leaderboard, API_ITCH.userId(), API_ITCH.username(), value])
    })
    .catch(error => alert("Error adding data: " + error));
};

API_LEADERBOARD.getLeaderboard = function(leaderboard) {
    return this._data[leaderboard];
};

API_LEADERBOARD.setLeaderboard = function(leaderboard, data) {
    this._data[leaderboard] = data;
};

//=============================================================================
// Scene_Menu
//=============================================================================

Scene_Menu.prototype.commandLeaderboard = function() {
    SceneManager.push(Scene_Leaderboard);
};

//=============================================================================
// Scene_Leaderboard
//=============================================================================

function Scene_Leaderboard() {
    this.initialize.apply(this, arguments);
}

Scene_Leaderboard.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Leaderboard.prototype.constructor = Scene_Leaderboard;

Scene_Leaderboard.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Leaderboard.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createWindows();
};

Scene_Leaderboard.prototype.createWindows = function() {
    this.createLoginWindow();
};

Scene_Leaderboard.prototype.createLoginWindow = function() {
    this._loginWindow = new Window_Login();
    this._loginWindow.setHandler('login', this.loginCommand.bind(this));
    this._loginWindow.setHandler('logout', this.logoutCommand.bind(this));
    this.addWindow(this._loginWindow);
};

Scene_Leaderboard.prototype.loginCommand = function() {
    API_ITCH.authenticate();
    this._loginWindow.refresh();
    this._loginWindow.activate();
};

Scene_Leaderboard.prototype.logoutCommand = function () {
    API_ITCH.logout();
    this._loginWindow.refresh();
    this._loginWindow.activate();
};

//=============================================================================
// Window_Leaderboard
//=============================================================================


//=============================================================================
// Window_Login
//=============================================================================

function Window_Login() {
    this.initialize.apply(this, arguments);
}

Window_Login.prototype = Object.create(Window_Command.prototype);
Window_Login.prototype.constructor = Window_Login;

Window_Login.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
};

Window_Login.prototype.maxCols = function() {
    return 2;
};

Window_Login.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_Login.prototype.windowHeight = function () {
    return this.lineHeight() * 2;
};

Window_Login.prototype.makeCommandList = function() {
    this.addCommand("Login", 'login', !API_ITCH.loggedIn());
    this.addCommand("Logout", 'logout', API_ITCH.loggedIn());
};

Window_Login.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    var text = this.commandName(index);
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawTextEx(text, rect.x, rect.y, rect.width, align);
};

//=============================================================================
// End
//=============================================================================