var isOpen = false;
var event = new CustomEvent('messaging',{"info":"messing"});
var div = document.createElement("div");
var bod = document.body;
//console.log(this,bod);
bod.appendChild(div);
var Commuications = function(){
  var self = this;
  self.lastcurrent = {"lastwho":"","lastfrom":""}
  self.port;
  self.message;
  self.connection = function(){
    chrome.runtime.onConnect.addListener(function (ported){
      self.port = ported;
      self.messageSys();

    });
  }

  

  self.messageSys = function(){
    if(self.port != undefined){
      self.port.onMessage.addListener(function(msg){
        //console.log(msg);
        div.innerHTML = msg;
        div.dispatchEvent(event);
         //porte.postMessage({"background":"test"})
        if(msg.to != self.port.name){
          
          
          console.log("ok",msg.to,self.lastcurrent["lastwho"],self.port.name);
          if(self.lastcurrent["lastwho"] === self.port.name){
            console.log("here");
            if(msg.to != "background"){
              self.port.postMessage({"from":msg.from,"message":msg.message});
            }else{
              /*message for background*/
              console.log(msg);

            }
          }
          self.lastcurrent["lastwho"] = msg.to;
          self.lastcurrent["lastfrom"] = msg.from;
          
        }
      });
    }
  }

  self.sendMessage =function(to,message){
    if(self.port != undefined){
      if(to == self.port.name){
        if(typeof message === "object"){
          self.port.postMessage({"from":"background","message":message});
        }else{
          self.port.postMessage({"from":"background","message":message});
        }
      }
    }
  }
}

function connection()
{
  var passing;
  chrome.runtime.onConnect.addListener(function (ported){
  this.port = ported;
  //console.log(ported);

  ported.onMessage.addListener(function(msg){
    //console.log(msg);
     ported.postMessage({"background":"test"})
    if(msg.to != ported.name){
      if(msg.to != msg.from){
        if(msg.to === ported.name){
          ported.postMessage({"from":msg.from,"message":"test"});
        }
      }
    }
  });


//     if (ported.name === "popup"){
//       ported.onMessage.addListener(function(msg){
// //        setInterval(function (){setpopmsg(msg.popupMessage);},100);
//         //console.log(msg.popupMessage);
//         passing = msg.popupMessage;
//       });
      
//     }
//     if(ported.name === "workingpage"){
//       ported.onMessage.addListener(function(msg){
        
//         //console.log(msg.workingMessage);
//         if(passing != null || passing != undefined){
//           ported.postMessage({backgrounds:v});
//         }
//       });
//     }
  });
}
var com = new Commuications();
com.connection();

div.addEventListener('messaging',function(e){
  com.sendMessage("reface",{"test":"test"});
})

chrome.runtime.onStartup.addListener(function(e){
  //console.log("started");
})
chrome.browserAction.setPopup({popup:""});

chrome.browserAction.onClicked.addListener(function(tabs){
    if(!isOpen){
        chrome.windows.create({"type":"popup"},function(newTab){
          windowId = newTab.id;

          chrome.tabs.create({"windowId":windowId,"url":"app/apppage.html"},function(ntab){
            tabids = ntab.id;
          })
          //console.log(windowId);
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
  //console.log(changeInfo,tab);
 
});