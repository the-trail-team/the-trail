const clientId = '1004968765815005215';
const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({
    transport: 'ipc'
});
const startTimestamp = Date.now();

DiscordRPC.register(clientId);

async function setActivity() {
    if (!RPC) return;

    var details = "Launching game...";
    var smallImageText = "No save loaded";
    var state = "Playing ";

    if ($gameMap) {
        if ($gameMap._mapId === 0 || !$gameTemp._isGameLoaded) {
            details = "In the main menu"
        } else {
            details = "Location: " + $gameMap.displayName();

            if ($gameParty && $gameTemp._isGameLoaded) {
                var smallImageText = "Party Levels: "
                for (i = 0; i < $gameParty.members().length; i++) {
                    smallImageText += ($gameParty.members()[i]._level + ", ");
                }
                smallImageText = smallImageText.slice(0, -2);
            }
        }
    }
    
    if ($dataVersion) {
        state += $dataVersion.name;
    } else {
        state += "unknown version";
    }

    RPC.setActivity({
        details: details,
        state: state,
        startTimestamp: startTimestamp,
        largeImageKey: `large_image`,
        largeImageText: `Saving the world!`,
        smallImageKey: `power`,
        smallImageText: smallImageText,
        instance: false,
    });
}

RPC.on('ready', async () => {
    setActivity();

    setInterval(() => {
        setActivity();
    }, 15 * 1000);
});

RPC.login({
    clientId: clientId
}).catch(err => console.error(error));