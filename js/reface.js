var port;
function sendConnection(obj={})
{
  port=chrome.runtime.connect({name:obj.name});
  port.postMessage({refaceMessage:obj.val});
 
}
function receiveMessage(){

}


sendConnection();





receiveMessage(){

}