var port = chrome.runtime.connect({name:"reface"});



function sendMessage(to,message={}){
  
  if(port != undefined)
    port.postMessage({"to":to,"from":"reface","message":message});
  
}

function messageListener(){
  console.log(port);
  if(port != undefined){
    port.onMessage.addListener(function(msg){
      console.log(msg);
    });
  }
};

sendMessage("appside",{"action":"background_color","val":"#33343"});
messageListener();








