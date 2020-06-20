var isOpen = false;
function connection()
{
  var passing;
  chrome.runtime.onConnect.addListener(function (ported){
  this.port = ported;
    if (ported.name === "popup"){
      ported.onMessage.addListener(function(msg){
//        setInterval(function (){setpopmsg(msg.popupMessage);},100);
        console.log(msg.popupMessage);
        passing = msg.popupMessage;
      });
      
    }
    if(ported.name === "workingpage"){
      ported.onMessage.addListener(function(msg){
        
        console.log(msg.workingMessage);
        if(passing != null || passing != undefined){
          ported.postMessage({backgrounds:v});
        }
      });
    }
  });
}
chrome.runtime.onStartup.addListener(function(e){
  console.log("started");
})
chrome.browserAction.setPopup({popup:""});

chrome.browserAction.onClicked.addListener(function(tabs){
    if(!isOpen){
        chrome.windows.create({"type":"popup"},function(newTab){
          windowId = newTab.id;

          chrome.tabs.create({"windowId":windowId,"url":"app/apppage.html"},function(ntab){
            tabids = ntab.id;
          })
          console.log(windowId);
        });
        isOpen = true;

    }
});

chrome.windows.onCreated.addListener(function(){

})
chrome.windows.onRemoved.addListener(function(){
  isOpen = false;
})


chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
  if(!String(tab.url).startsWith("facebook")){
    console.log("ok");
  }
});