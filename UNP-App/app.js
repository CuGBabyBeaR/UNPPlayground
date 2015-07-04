function errorHandler(e) {
    console.error(e);
}

function setPath(filename) {
    var config = {
        type: 'saveFile',
        suggestedName: filename
    };
    chrome.fileSystem.chooseEntry(config, function(entry) {
        var entryId = chrome.fileSystem.retainEntry(entry);
        localStorage['unp_SaveDir'] = entryId;
    });
}

function write(str) {
    chrome.storage.local.get('unp_SaveDir',function(items){
        chrome.fileSystem.restoreEntry(items.unp_SaveDir, function(entry) {
            var blob = new Blob([str], {
                type: 'text/plain'
            });
            writeFileEntry(entry, blob); //,null);
        });
    });
}

function writeFileEntry(writableEntry, opt_blob, callback) {
    if (!writableEntry) {
        output.textContent = 'Nothing selected.';
        return;
    }
    writableEntry.createWriter(function(writer) {
        writer.onerror = errorHandler;
        writer.onwriteend = callback;
        if (opt_blob) {
            writer.truncate(opt_blob.size);
            waitForIO(writer, function() {
                writer.seek(0);
                writer.write(opt_blob);
            });
        }
    }, errorHandler);
}

function waitForIO(writer, callback) {
    // set a watchdog to avoid eventual locking:
    var start = Date.now();
    // wait for a few seconds
    var reentrant = function() {
        if (writer.readyState === writer.WRITING && Date.now() - start < 4000) {
            setTimeout(reentrant, 100);
            return;
        }
        if (writer.readyState === writer.WRITING) {
            console.error("Write operation taking too long, aborting!" + " (current writer readyState is " + writer.readyState + ")");
            writer.abort();
        } else {
            callback();
        }
    };
    setTimeout(reentrant, 100);
}
