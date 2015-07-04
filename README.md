# UNPPlayground
Trying techs can used in UNP

-------------

## Note of 2015-7-4

1. Extension can launch app. So we can launch app any time if we want.
2. Extension can communicate with app by runtime.sendMessage . 
3. App can save message from extension to in specific text files successfully.

problems:  

1. How to insure app runs in single-instance model?
2. Can extension install app automatically?


`chrome.fileSystem` API can write files not by path, but by `Entry`, which is a Object containing encrypted path information. 
`Entry` only can created by [chrome.fileSystem.chooseEntry()](https://developer.chrome.com/apps/fileSystem#method-chooseEntry) method, which work only in a window created by app. 

But app run in multi-instance model. If multiple instances running, send a message to app, it will create multiple windows with "Choose Path" button. That is not good.

Preliminary idea is launch app in callback of sendMessage method if app is not running, and then wait one or half second for app launching and send message again.
