document.getElementById('choosePath').addEventListener('click',function(){
    var config = {
        type: 'saveFile',
        suggestedName: 'upnp.txt'
    };
    chrome.fileSystem.chooseEntry(config, function(entry) {
        var entryId = chrome.fileSystem.retainEntry(entry);
        chrome.fileSystem.getDisplayPath(entry,function(displayPath){
            chrome.storage.local.set({'unp_DisplayPath' : displayPath});
        });
        chrome.storage.local.set({'unp_SaveDir' : entryId});
    });
});
