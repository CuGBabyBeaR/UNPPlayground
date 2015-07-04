var EXT_ID = "ejkfaihloegnkccehmbmpegonpgdelfe";

chrome.app.runtime.onLaunched.addListener(function(launchData) {
    chrome.runtime.onMessageExternal.addListener(function(msg, sender, sendResponse) {
        if (!sender) return;
        if (sender.id != EXT_ID) return;
        if (!msg.type) return;
        switch (msg.type) {
            case 'setPath':
                callPathSet();
                break;
            case 'getPath':
                getPath();
                break;
            case 'save':
                write(msg.data);
                break;
        };
        console.log('Massage get.');
        console.log(msg);
    });
});

function callPathSet() {
    chrome.app.window.create('options.html');
}

function getPath(){}
