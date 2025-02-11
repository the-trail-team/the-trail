__DataManager_loadMapData__ = DataManager.loadMapData;
DataManager.loadMapData = function(mapId) {
    invalid = [184, 192, 193, 194, 195, 196, 197, 198].contains(mapId);
    if (invalid) mapId = 8;
    __DataManager_loadMapData__.call(this, mapId);
    if (invalid) $gamePlayer.reserveTransfer(8, 64, 65);
};