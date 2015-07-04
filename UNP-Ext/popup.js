var APP_ID = 'nbcfdalaohlihmfoenijpgiklinfpbfk'

document.getElementById('startApp').addEventListener('click',function(){
    chrome.management.launchApp(APP_ID);
});

document.getElementById('setPath').addEventListener('click',function(){
    chrome.runtime.sendMessage(APP_ID,{type:'setPath'});
});

document.getElementById('saveInfo').addEventListener('click',function(){
    chrome.runtime.sendMessage(APP_ID,{type:'save',data:'Some info...'});
});
