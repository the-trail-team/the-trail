const clientId = '1004968765815005215';
const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({
    transport: 'ipc'
});

const startTimestamp = Date.now();
var refreshes = -1;
const smallImageKeys = [`power`, `quests`, `bits`];

DiscordRPC.register(clientId);

async function setActivity() {
    if (!RPC) return;

    refreshes++;

    var details = "Launching game...";
    var state = "Playing ";
    var smallImageKey = smallImageKeys[refreshes % smallImageKeys.length];
    var smallImageText = "No save loaded";

    if ($gameMap) {
        if ($gameMap._mapId === 0 || !$gameTemp._isGameLoaded) {
            details = "In the main menu";
        } else {
            details = "Location: " + $gameMap.displayName();

            if (refreshes % smallImageKeys.length === 0 && $gameParty && $gameTemp._isGameLoaded) {
                smallImageText = "Party Levels: ";
                for (i = 0; i < $gameParty.members().length; i++) {
                    smallImageText += ($gameParty.members()[i]._level + ", ");
                }
                smallImageText = smallImageText.slice(0, -2);
            }

            if (refreshes % smallImageKeys.length === 1 && $gameSystem) {
                smallImageText = "Quests Complete: " + String(Math.round(($gameSystem.totalQuestsCompleted() / $gameSystem.totalQuestsInGame()) * 100)) + "%";
            }
            
            if (refreshes % smallImageKeys.length === 2 && $gameParty) {
                smallImageText = "Bits: " + $gameParty.gold();
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
        smallImageKey: smallImageKey,
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