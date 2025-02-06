DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = DataManager_makeSaveContents.call(this);
    contents.version = $dataVersion;
    return contents;
}

DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    DataManager_extractSaveContents.call(this, contents);
    $gameVersion = contents.version;
}