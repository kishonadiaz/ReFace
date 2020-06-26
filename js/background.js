var isOpen = false;
var div = document.createElement("div");
var sender = document.createElement("div");
var event = new CustomEvent('messaging',{"info":"messing"});
var senderevent = new CustomEvent('sending',{"thisthing":sender});
var appid = -1;
var appname = "" ;
var bod = document.body;
////console.log(this,bod);
bod.appendChild(div);
bod.appendChild(sender);
var Commuications = function(){
  var self = this;
  self.lastcurrent = {"lastwho":"","lastfrom":"","lastmessage":"","lasttabid":""}
  self.appsidecurrent = {"lastwho":"","lastfrom":"","lastmessage":"","lasttabid":""}
  self.port;
  self.ports = {};
  self.message = "";
  self.toAPP = "";
  self.refreshids = {};
  self.app = "";
  self.tabids = {};
  self.connection = function(){
    chrome.runtime.onConnect.addListener(function (ported){
      self.port = ported;
      var name = self.port.name;

      self.ports[name] = self.port;
      //console.log(self.port.sender,self.port.sender.tab);
      if(!String(self.port.sender["tab"]["url"]).includes("apppage")){
        self.id = self.port.sender.tab.id;
        self.tabids[self.id] = self.port.sender;
      }else{
        appid = self.port.sender.tab.id;
        app = self.port.sender;
      }
      
      
      if(self.port.name === "appside")
        self.port.postMessage({"tabid":self.tabids});
       sender.addEventListener('sending',function(e){
        try{
          //console.log(self.refreshids);
          if(!chrome.runtime.lastError){
            chrome.tabs.executeScript(self.id,{
              file: "js/reface.js"
            },() => chrome.runtime.lastError);
          }
        }catch(e){

        }
         
          });
      self.messageSys();

    });
    chrome.runtime.onConnect.hasListener(function(port){
      //console.log(port);
    });
    

    chrome.runtime.onConnect.removeListener(function(ported){
      //console.log("removed",ported);
    });

    chrome.runtime.onSuspend.addListener(function(posted){
      //console.log(posted);
    });

    chrome.runtime.onRestartRequired.addListener(function(post){
      //console.log(post)
    });
  }

  self.postMessage = function(name,message){
    //console.log("heao;aoispod",self.ports);
    try{
      if(self.ports[name]!= undefined)
        self.ports[name].postMessage(message);
    }catch(e){
      
    }
  }

  self.messageSys = function(){
    if(self.port != undefined){
      self.port.onMessage.addListener(function(msg){
        ////console.log(msg);
        div.innerHTML = msg.message;
        div.dispatchEvent(event);
        self.postMessage(msg.to,msg.message);
        //sender.dispatchEvent(senderevent);
         //porte.postMessage({"background":"test"})
        //  if(msg != undefined)
        //   //console.log("ok",msg,self.lastcurrent["lastwho"],self.lastcurrent["lastfrom"],self.lastcurrent["lastmessage"],self.port.name);
        // if(msg.to != self.port.name){
          
          
          
        //   if(self.port.name != msg.to ){
        //       if(msg.to != "" || self.lastcurrent["lastfrom"]!= "" || self.lastcurrent["lastwho"] != ""){
        //         if(msg.to != msg.from){
        //         //console.log("here");
        //         if(msg.to != "background"){
        //           //console.log("okdsdd");
        //           if(self.lastcurrent["lastfrom"] != "")
        //             self.port.postMessage({"from":self.lastcurrent["lastfrom"],"message":self.lastcurrent["lastmessage"]});
        //           // self.lastcurrent["lastwho"] = "";
        //           // self.lastcurrent["lastfrom"] = "";
        //           // self.lastcurrent["lastmessage"] = "";
        //         }
        //       }
        //     }else{
        //       /*message for background*/
        //       //console.log(msg);

        //     }
        //   }


        //   self.lastcurrent["lastwho"] = msg.to;
        //   self.lastcurrent["lastfrom"] = msg.from;
        //   self.lastcurrent["lastmessage"] = msg.message;
          
        // }
        
        if(msg.appto != undefined)
          //console.log(msg);
        if(self.port.name === "appside"){
          
          self.appsidecurrent["lastwho"] = msg.appto;
          self.appsidecurrent["lastfrom"] = msg.appfrom;
          self.appsidecurrent["lastmessage"] = msg.appmessage;
          //console.log(msg);
          if(typeof msg.refresh === "object"){
            //console.log(msg.refresh);
            if(Object.entries(msg.refresh).length > 0){
              for(var [i,item] of Object.entries(msg.refresh)){
                //console.log(i,item);
                //chrome.tabs.reload(item)
                self.refreshids[i]=item;
                try{
                  ////console.log(self.refreshids);
                  if(!chrome.runtime.lastError){
                    chrome.tabs.executeScript(item,{
                      file: "js/reface.js"
                    },() => chrome.runtime.lastError);
                  }
                }catch(e){

                }
         
                // chrome.tabs.sendMessage(item,"wakeup",function(e){
                //   //console.log(e,"it is done");
                // })
              }
            }
          }
        }
      });
    }
  }

  self.sendMessage =function(to,from,message){
    //console.log(self.port.postMessage);
    if(self.port != undefined){
      //self.port.postMessage({"from":from,"message":message});
      if(to === self.lastcurrent["lastfrom"]){
        self.port.postMessage({"from":from,"message":message});
        // //console.log(self.tabids);
      }
    }
  }
  self.reroute =function(){
    
  }

  self.sendToApp =function(message){
    sender.innerHTML = message;
    sender.dispatchEvent(senderevent);
    // if(self.port != undefined){
    //   //console.log(self.port);
    //   if("appside" === self.port.name){
    //     self.port.postMessage(message)
    //   } 
    // }
  }
}


// //console.log(chrome.runtime);
// chrome.runtime.onUpdateAvailable.addListener(function(details){
//   //console.log(syncRemainingData,"ok",details);
// });
// function connection()
// {
//   var passing;
//   chrome.runtime.onConnect.addListener(function (ported){
//   this.port = ported;
  
//   ////console.log(ported);

//   ported.onMessage.addListener(function(msg){
//     ////console.log(msg);

//     ported.postMessage({"background":"test"})
//     if(msg.to != ported.name){
//       if(msg.to != msg.from){
//         if(msg.to === ported.name){
//           ported.postMessage({"from":msg.from,"message":"test"});
//         }
//       }
//     }

//   });


//     if (ported.name === "popup"){
//       ported.onMessage.addListener(function(msg){
// //        setInterval(function (){setpopmsg(msg.popupMessage);},100);
//         ////console.log(msg.popupMessage);
//         passing = msg.popupMessage;
//       });
      
//     }
//     if(ported.name === "workingpage"){
//       ported.onMessage.addListener(function(msg){
        
//         ////console.log(msg.workingMessage);
//         if(passing != null || passing != undefined){
//           ported.postMessage({backgrounds:v});
//         }
//       });
//     }
//   });
// }
var com = new Commuications();


div.addEventListener('messaging',function(e){
  com.postMessage("reface","only for reface");
  com.postMessage("appside","only for appid");
  // com.sendMessage("reface","s",{"test":"test"});
  // setTimeout(function(e){
  //   com.reroute();
  // },4000);
  
})

//console.log(chrome.tabs);
chrome.tabs.onCreated.addListener(function(tab){
  //console.log(tab);
  if(String(tab.pendingUrl).includes("apppage"))
    appid = tab.id;
  
})

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
  ////console.log(changeInfo,tab);
 
});

chrome.tabs.onHighlighted.addListener(function(obj){
  //console.log(obj);
  //console.log("appid",appid);
  try{
    if(obj["tabIds"][0] != appid){
      if(!chrome.runtime.lastError){
        chrome.tabs.executeScript(obj["tabIds"][0],{
          file: "js/reface.js"
        },() => chrome.runtime.lastError);
      }
    }
   
  }catch(e){

  }
  // chrome.tabs.captureVisibleTab(obj["windowId"],function(tab){
  //   //console.log("updated");
  // });
})

chrome.tabs.onHighlighted.hasListener(function(obj){
  //console.log("listeners",obj);
})

chrome.tabs.onActivated.addListener(function(obj){
  //console.log(obj);
  //appid = obj.
})

chrome.tabs.onMoved.addListener(function(tabid,obj){
  //console.log(obj);
})

chrome.tabs.onRemoved.addListener(function(tabid,obj){
  //console.log('removed',tabid,obj);
})

chrome.runtime.onStartup.addListener(function(e){
  //console.log("started");
})
chrome.browserAction.setPopup({popup:""});

chrome.browserAction.onClicked.addListener(function(tabs){
    sender.dispatchEvent(senderevent);
    com.sendToApp({"ok":"itsfromhere"});
    if(!isOpen){
        chrome.windows.create({"type":"popup"},function(newTab){
          windowId = newTab.id;

          chrome.tabs.create({"windowId":windowId,"url":"app/apppage.html"},function(ntab){
            tabids = ntab.id;
            //console.log(ntab);
            appid = ntab.id;
            
          })
          ////console.log(windowId);
        });
        isOpen = true;

    }
});

chrome.windows.onCreated.addListener(function(){

})
chrome.windows.onRemoved.addListener(function(){
  isOpen = false;
})
com.connection();


