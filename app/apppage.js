var port = chrome.runtime.connect({name:"appside"});

var UID = {
  _current: 0,
  styleitams:[]||{},
  styles:{
  	push:function(j={},type="array"){
  		if(type === "array"){
  			this.styleitams = [];
  		}else if(type === "object"){
  			this.styleitams = j
  		}

  	}
  },
  getNew: function(){
    this._current++;
    return this._current;
  }

};
var stylesb = {};
var stylesa = {};
var stylecheckb = {};
var stylechecka = {};

HTMLElement.prototype.pseudoStyle = function(args={}){
  var _this = this;
  var _sheetId = "pseudoStyles";
  var _head = document.head || document.getElementsByTagName('head')[0];
  var _sheet = document.getElementById(_sheetId) || document.createElement('style');
  _sheet.id = _sheetId;
  var className = "";
  var element = "";
  var prop = "";
  var value = "";
  var temp = ``;
  var attr = "";
  var id = "";
  var istemp = false;
  var hasattr = false;
  var idcount = 0;
  var classcount = 0;
  var istruea = false;
	var istrueb = false;

  //////console.log(window)
  ////console.log(args);
  // var className = "pseudoStyle" + UID.getNew();
  if(_this.getAttribute("id") === undefined){
	  if(typeof args.id === "undefined"){
	  	id = idcount;
	  	idcount++;
	  }else{
	  	id = args.id;
	  }
	}else{
		if(typeof args.id === "undefined"){
	  	id = _this.getAttribute("id");
	  }else{
	  	id = args.id;
	  }
	}

  if(typeof args.classname ===  "undefined"){
  	if(id != "")
    	className = "pseudoStyle" + id;
    else{
    	classname = "pseudoStyle" + classcount;
    	classcount++;
    }
    
  }else{
    className = args.classname;
  }

  if(typeof args.element != "undefined"){
    element = args.element;
  }
  if(typeof args.prop != "undefined"){
    prop = args.prop;
  }
  if(typeof args.value != "undefined"){
    value = args.value;
  }
  if(typeof args.temp != "undefined"){
    temp = args.temp;
    istemp = true;
  }
  if(typeof args.attr != "undefined"){
    attr = ":"+args.attr;
    //////console.log(args.attr);
    hasattr = true;
  }else if(typeof args.attr === "undefined"){
    hasattr = false;
  }

  
  ////console.log(_this.classList.contains(className));
   if(!_this.classList.contains(className))
  	_this.className +=  " "+className; 

  if(temp === ``){
    istemp = false;
  }else{
    istemp = true;
  }

  if(attr === ""){
    hasattr = false;
  }
   // $(this).bind("click",function(ev){
    
   //  //////console.log(ev);
   //  ////////console.log(ev.target.parentNode);
   //  // //////console.log($(":after"));
    
   //  //$(".myafter").addClass("myafter:active");
   //    _sheet.innerHTML += " .myafter"+"::after{z-index:1000000;background:purple;}";
   // })
   // $(this).bind("mouseover",function(ev){
   //  //$(_this).css("background","white");
   //  //////console.log(ev.target);
   // });
  var checkstyle = String(_sheet.innerHTML).trim().split(" ");

  
 //////console.log(checkstyle);
  // for(var [i,elem] of checkstyle.entries()){
  //   //////console.log(elem);
  // }
  if(!String(_sheet).includes(className)){
  	////console.log("here");
  	if(className != "undefined"){
  		////console.log(className)
  	}
  	////console.log(_sheet.textContent.length);
  	var _sheetarr = _sheet.textContent.split("l{}.");
  	////console.log(_sheetarr);
  	for(var [i,text] of Object.entries(_sheetarr)){

  		
  		if(istemp){
	      if(hasattr){
	        //styles[className] = text;
	        if(text.includes("after")){
	        	stylesa[className] = text;
	        }

	        if(text.includes("before")){
	        	stylesb[className] = text;
	        }
	      }
	      else{
	        //styles[className] = text;
	        if(text.includes("after")){
	        	stylesa[className] = text;
	        }

	        if(text.includes("before")){
	        	stylesb[className] = text;
	        }
	      }
	    }else{
	      if(hasattr){
	        //styles[className] = text;
	        if(text.includes("after")){
	        	stylesa[className] = text;
	        }

	        if(text.includes("before")){
	        	stylesb[className] = text;
	        }
	      }
	      else{
	        //styles[className] = text;
	        if(text.includes("after")){
	        	stylesa[className] = text;
	        }

	        if(text.includes("before")){
	        	stylesb[className] = text;
	        }
	      }
	    }

  	}

  	if(istemp){
      if(hasattr){
      	if(element.includes("after")){
        	stylechecka[className] = ""+className+attr+"::"+element+"{"+temp+"}";
        }
        if(element.includes("before")){
        	stylecheckb[className] = ""+className+attr+"::"+element+"{"+temp+"}";
        }
      }
      else{
      	if(element.includes("after")){
      		stylechecka[className] = ""+className+"::"+element+"{"+temp+"}";
      	}
      	if(element.includes("before")){
      		stylecheckb[className] = ""+className+"::"+element+"{"+temp+"}";
      	}
        
      }
    }else{
      if(hasattr){
      	if(element.includes("after")){
        	stylechecka[className] = ""+className+attr+"::"+element+"{"+prop+":"+value+"}";
        }
        if(element.includes("before")){
        	stylecheckb[className] = ""+className+attr+"::"+element+"{"+prop+":"+value+"}";
        }
      }
      else{
      	if(element.includes("after")){
        	stylechecka[className] = ""+className+"::"+element+"{"+prop+":"+value+"}";
      	}
        if(element.includes("before")){
        	stylecheckb[className] = ""+className+"::"+element+"{"+prop+":"+value+"}";
        }

      }
    }
  	
		

    ////console.log(stylesa,stylesb,stylechecka,stylecheckb);

    if(String(stylesa[className]).includes(stylechecka[className])){
    	istruea = true;
    }else{
    	istruea = false;
    }
    if(String(stylesb[className]).includes(stylecheckb[className])){
    	istrueb = true;
    }else{
    	istrueb = false;
    }
  	var buildup = "";

  	////console.log(stylecheckb,stylechecka)
  	for(var [i,item] of Object.entries(stylechecka)){
  		buildup+= "l{}."+item+"\n";
  	}
		for(var [i,item] of Object.entries(stylecheckb)){
		  buildup+= "l{}."+item+"\n";		
		}

		////console.log(buildup);
		 _sheet.innerHTML = buildup;
    
    _head.appendChild(_sheet);
  }
  
  
  return this;
};


var Storage = function(){

	this.set = function(store,func){
		
		if(store instanceof Object)
			if(func instanceof Function)
				chrome.storage.local.set(store,func);
		
		if(store instanceof Array)
			if(func instanceof Function)
				chrome.storage.local.set(store,func);
		
		if(typeof store === "string" ||store instanceof String)
			if(func instanceof Function)
				chrome.storage.local.set([store],func);
	}

	this.get = function(key,func){
		console.log(typeof key, 'here' instanceof String,key.toString());

		var out;
		if(key instanceof Object)
			if(func instanceof Function)
				out = chrome.storage.local.get(key,func);
		
		if(key instanceof Array)
			if(func instanceof Function)
				out = chrome.storage.local.get(key,func);
		
		if(typeof key === "string"){
			console.log("here");
			if(func instanceof Function){
				console.log("sadfjhkjahsfd");
				out = chrome.storage.local.get([key],func);
			}
		}
		
		if(key instanceof Object)
			if(typeof func === undefined)
				out = chrome.storage.local.get([key]);
		
		if(key instanceof Array)
			if(typeof func === undefined)
				out = chrome.storage.local.get([key]);
		
		if(typeof key === "string"){
			console.log("oks");
			if(typeof func === undefined)
				out = chrome.storage.local.get([key]);
		}

		return out;
	}

	this.remove = function(key,func){
		if(key instanceof Object){
			if(func instanceof Function){
				chrome.storage.local.remove(key,func)
			}
		}
		if(key instanceof Array){
			if(func instanceof Function){
				chrome.storage.local.remove(key,func)
			}
		}
		
		if(typeof key === "string"){
			if(func instanceof Function){
				return chrome.storage.local.remove([key],func)
			}
		}
		if(key instanceof Object){
			if(typeof func === undefined){
				chrome.storage.local.remove(key)
			}
		}
		if(key instanceof Array){
			if(typeof func === undefined){
				chrome.storage.local.remove(key)
			}
		}
		
		if(typeof key === "string"){
			if(typeof func === undefined){
				return chrome.storage.local.remove([key])
			}
		}
	}
	this.clearall = function(){
		chrome.storage.local.clear();
	}

	this.onChange = function(func){
		chrome.storage.local.onChanged.addListener(func)
	}
}


var Passer = function(starter){
	this.message = starter;
	this.ids = {}
	this.setMesseage = function(val){
		this.message = val;
	}
	this.getMessage = function(val){
		return this.message;
	}
	this.getIDS = function(val){
		if(typeof val === "object"){

			try{
				if(Object.entries(val).length > 0){
					//////console.log(val);
					for(var [i,item] of Object.entries(val)){
						//////console.log(item);
						if(typeof item === "object"){
							for(var[j,itemj] of Object.entries(item)){
								
								if(!String(itemj.url).includes("apppage")){
									var id = itemj["tab"]["id"];
									//////console.log(itemj);
									this.ids[id] = id;
								}
							};
						}
					}
				
				}
			}catch(e){

			}
		}
	}
	this.refresh = function(){
		var idss = {};
		//////console.log("ok",this.ids);
		if(Object.entries(this.ids).length > 0){
			for(var[i,item] of Object.entries(this.ids)){
				//////console.log(item,i);
				idss[i] = item;
				////////console.log(chrome.tabs.query({"active":false}));
			}
		}
		return idss;
	}

}

var mess;

function sendMessage(to,message={}){
  var reup = "";
  
	
  if(port != undefined){
  	if(mess != undefined){
			//////console.log(mess.getMessage());
			reup = mess.refresh();
  	}
    port.postMessage({"appto":to,"appfrom":"appside","appmessage":message,"to":to,"from":"appside","message":message,"refresh":reup});
  }
}

function messageListener(){

  if(port != undefined){
    port.onMessage.addListener(function(msg){
    	if(mess === undefined){
    		mess = new Passer(msg);
    		mess.getIDS(msg);
    	}
      //////console.log(msg);
      mess.setMesseage(msg);

      // //////console.log(port);
      // //////console.log(chrome);

    });
  }
};



sendMessage("reface",{"background_color":"red"});
messageListener();
var pickeroptions = {}
var pickerslist = ["bgpicker","postheadpicker","postcommentpicker","postallpicker","postrandomheaderpicker","postrandomcommentpicker","postrandomallpicker"]

let pickers = {};
var iscustomcolor = false;
var customcolor = "";
function createswatchbtn(){
	var btn = document.createElement("button");
	btn.setAttribute("type","button");
	btn.setAttribute("class","createswatchbtn");
	btn.setAttribute("style","color: white");
	btn.setAttribute("aria-label","color swatch");
	btn.innerHTML = "<span class='createswatch'>+</span>";
	
	return btn;
}

for(var[i,key] of Object.entries(pickerslist)){

	if(!iscustomcolor)
		customcolor = "rgba("+Math.floor(Math.random() * 256)+","+Math.floor(Math.random() * 256)+","+Math.floor(Math.random() * 256)+","+1+")"

	pickers[key] = new Pickr.create(	 
		{
		 el: "."+key,
		 theme: 'classic',
		 default:customcolor,
		 comparison:true,
		 padding:40,


		 swatches: [
	        'rgba(244, 67, 54, 1)',
	        'rgba(233, 30, 99, 0.95)',
	        'rgba(156, 39, 176, 0.9)',
	        'rgba(103, 58, 183, 0.85)',
	        'rgba(63, 81, 181, 0.8)',
	        'rgba(33, 150, 243, 0.75)',
	        'rgba(3, 169, 244, 0.7)',
	        'rgba(0, 188, 212, 0.7)',
	        'rgba(0, 150, 136, 0.75)',
	        'rgba(76, 175, 80, 0.8)',
	        'rgba(139, 195, 74, 0.85)',
	        'rgba(205, 220, 57, 0.9)',
	        'rgba(255, 235, 59, 0.95)',
	        'rgba(255, 193, 7, 1)'
	        
	    ],

	    components: {

	        // Main components
	        preview: true,
	        opacity: true,
	        hue: true,

	        // Input / output Options
	        interaction: {
	            hex: true,
	            rgba: true,
	            hsla: true,
	            hsva: true,
	            cmyk: true,
	            input: true,
	            cancel:true,
	            clear: true,
	            save: true
	           

	        }
	    }

	})
 
	var swatchbtn;
	// //////console.log(pickers[key]._eventBindings);
	pickers[key]["update"] = function(){
		var pic = this;
		Object.entries(this.getRoot().swatches.children).forEach(function(item,key){
			item[1].addEventListener("click",function(e){
				// //////console.log(pic.getColor());
				pic.addSwatch(pic.getColor().toHEXA().toString());
			})
			item[1].addEventListener("mouseover",function(e){
				// //////console.log("ok");
			})
			item[1].addEventListener("mouseleave",function(e){
				// //////console.log("ok");
			})
		});

	};

	pickers[key].on('init',function(instance){
		// //////console.log(instance);
		// //////console.log(instance.getRoot().button);
		// //////console.log(instance.getRoot().swatches);
		swatchbtn = createswatchbtn();

		
		instance.getRoot().swatches.insertBefore(swatchbtn,instance.getRoot().swatches.firstChild);
		instance._eventBindings.push([swatchbtn,"click", function(){}] );
		instance._eventListener["createswatch"] = [function(){}];
		instance.getRoot().interaction["createswatch"] = swatchbtn;
		instance._emit("createswatch");
		var mycolor =new Object(instance._color);
		// //////console.log(mycolor);
		instance._swatchColors.push({"el":swatchbtn,"color":mycolor});
		//instance.addSwitch(mycolor);
		// //////console.log(instance);
		instance._updateOutput();
		instance.update();



		//var obj = new Object(pickers[key]._bindEvents());
		////////console.log(obj());
		
	});
	////////console.log(pickers[key]._swatchColors);
	pickers[key].on('hide',function(instance){
		
	});

	pickers[key].on('show',function(color,instance){
		
		//instance.getRoot().swatches.insertBefore(swatchbtn,instance.getRoot().swatches.firstChild);
		
	});
	// //////console.log(pickers[key]._updateOutput());
	// //////console.log(pickers[key]._eventBindings);
	// //////console.log(pickers[key]._bindEvents);
	// Object.entries(pickers[key].getRoot()["swatches"].children).forEach(function(e,i){
		
	// 	e.forEach(function(j,k){
	// 		//////console.log(j,k);
	// 	})
	// });
	
	pickers[key].on('save',function(color,instance){
		
		sendMessage("reface",{"action":"change","background":color.toHEXA().toString()});
		instance.hide();
	});

	

	pickers[key].on('clear',function(instance){
		
	});
	pickers[key].on('cancel',function(instance){
		instance.hide();
	});
	pickers[key].on('change',function(color,instance){
		
	});
	pickers[key].on('changestop',function(instance){
		
	});
	pickers[key].on('swatchselect',function(color,instance){
		
	});
	// pickers[key].on('createswatch',function(instance){

	// });

}
//////console.log(pickers);

function openclosed(elem){
	//elem
	var picr =  document.querySelectorAll(".pickr");
	// for(var i of picr){
	// 	if(i.classList.contains("pickrclosed")){
	// 		//////console.log(i);
	// 		i.classList.remove("pickrclosed");		
	// 	}
	// }
	if(elem.classList.contains("bgcolorpickerdiv")){
		// console.
		// var picbg = document.querySelector("."+elem.className+" > div > div > div");
		// if(!picbg.classList.contains("pickrclosed")){
		// 	picbg.classList.add("pickrclosed");
		// }
		picr[0].setAttribute("data-parent",elem.classList.item(0));
		if(picr[0].classList.contains("pickrclosed")){
			if(picr[0].getAttribute("data-parent"))
			picr[0].classList.remove("pickrclosed");
		}
		if(!elem.classList.contains("bgcolorpickerOpen")){
			elem.classList.add("bgcolorpickerOpen");
		}
	}

	for(var i =1; i < picr.length; i++){
		if(picr[i]!= undefined){
			picr[i].setAttribute("data-parent",elem.classList.item(0));
			if(picr[i].classList.contains("pickrclosed")){
				//////console.log(picr[i]);
				picr[i].classList.remove("pickrclosed");		
			}
		}
	}

	if(elem.classList.contains("bgcontrol")){
		//////console.log(elem);
		if(!elem.classList.contains("bgcontrolopen")){
			elem.classList.add("bgcontrolopen");
		}
	}

	if(elem.classList.contains("postcolors")){
		if(!elem.classList.contains("postcolorsOpen")){
			elem.classList.add("postcolorsOpen");
		}
	}

	if(elem.classList.contains("postwallpaper")){
		if(!elem.classList.contains("postwallpaperOpen")){
			elem.classList.add("postwallpaperOpen");
		}
	}
}
function closeopened(elem){
	var picr =  document.querySelectorAll(".pickr");
	// for(var i of picr){
			
	// 	if(!i.classList.contains("pickrclosed")){
	// 		i.classList.add("pickrclosed");
	// 		//////console.log(i);	
	// 	}
	// }
	if(elem.classList.contains("bgcolorpickerdiv")){
		picr[0].setAttribute("data-parent",elem.classList.item(0));
		if(!picr[0].classList.contains("pickrclosed")){
			if(picr[0].getAttribute("data-parent"))
			picr[0].classList.add("pickrclosed");
		}
		if(elem.classList.contains("bgcolorpickerOpen")){
			elem.classList.remove("bgcolorpickerOpen");
		}
	}
	for(var i =1; i < picr.length; i++){
		if(picr[i]!= undefined){
			//picr[i].setAttribute("data-parent",elem.classList.item(0));
			if(!picr[i].classList.contains("pickrclosed")){
				//////console.log(picr[i]);
				picr[i].classList.add("pickrclosed");		
			}
		}
	}
	if(elem.classList.contains("bgcontrol")){

		if(elem.classList.contains("bgcontrolopen")){
			elem.classList.remove("bgcontrolopen");
		}
	}

	if(elem.classList.contains("postcolors")){
		if(elem.classList.contains("postcolorsOpen")){
			elem.classList.remove("postcolorsOpen");
		}
	}

	if(elem.classList.contains("postwallpaper")){
		if(elem.classList.contains("postwallpaperOpen")){
			elem.classList.remove("postwallpaperOpen");
		}
	}
}

var labels = document.querySelectorAll("label");
var labelbeef = document.querySelectorAll("label:before");
var checkboxes = document.querySelectorAll("input[type='checkbox']");
////////console.log(checkboxes,labels,labelbeef);
for(var i =0; i < (labels.length); i++){
	if(labels[i].lastChild.tagName == "INPUT"){
		labels[i].lastChild.addEventListener("change",function(ev){
			if(ev.target.checked){
					if(ev.target.getAttribute("data-open") != undefined){
						var queryitem = document.querySelectorAll(ev.target.getAttribute("data-open"));
						if(queryitem.length <= 0){
		        	openclosed(queryitem[0]);
		        	//closeopened(queryitem[0])
						}
		        else{
		        	for(var j of queryitem){
		        		openclosed(j);
		        		//closeopened(j);
		        	}
		        }
					}
			}else{
				if(ev.target.getAttribute("data-open") != undefined){
						var queryitem = document.querySelectorAll(ev.target.getAttribute("data-open"));
						if(queryitem.length <= 0){
		        	//openclosed(queryitem[0]);
		        	closeopened(queryitem[0])
						}
		        else{
		        	for(var j of queryitem){
		        		//openclosed(j);
		        		closeopened(j);
		        	}
		        }
					}
			}
		});
	}
}

var dragscroll = document.querySelector("#draggables");
var trayscroll = document.querySelector("#tray");
var generalscroll = document.querySelector("#generals");




// document.body.addEventListener("mouseover",function(e){
// 	////////console.log(e.target);
// })
// ////////console.log(scroll);
// ////////console.log(window.getComputedStyle(scroll));
var script = document.createElement("style");
script.rel="sylesheet";
script.type="text/css";
dragscroll.addEventListener("mouseover",function(e){

	script.innerHTML = "#draggables::-webkit-scrollbar{content:\"hey\";width:10px!important;}";
	script.innerHTML += "#draggables::-webkit-scrollbar-track{ background: rgb(0,0,0);border: 4px solid transparent;background-clip: content-box; }";
	script.innerHTML += "#draggables::-webkit-scrollbar-thumb{content:'hey'; border: 1px solid black; }";
	script.innerHTML += "#draggables::-webkit-scrollbar::after{content:\"hey\"; border: 1px solid black; }";
	document.head.appendChild(script);
});
dragscroll.addEventListener("mouseleave",function(e){

	document.head.removeChild(script);
});

trayscroll.addEventListener("mouseover",function(e){

	script.innerHTML = "#tray::-webkit-scrollbar{ width:10px!important;}";
	script.innerHTML += "#tray::-webkit-scrollbar-track{ background: rgb(0,0,0);border: 4px solid transparent;background-clip: content-box; }";
	script.innerHTML += "#tray::-webkit-scrollbar-thumb{ border: 1px solid black; }";
	document.head.appendChild(script);
});
trayscroll.addEventListener("mouseleave",function(e){

	document.head.removeChild(script);
});

generalscroll.addEventListener("mouseover",function(e){

	script.innerHTML = "#generals::-webkit-scrollbar{ width:10px!important;}";
	script.innerHTML += "#generals::-webkit-scrollbar-track{ background: rgb(0,0,0);border: 4px solid transparent;background-clip: content-box; }";
	script.innerHTML += "#generals::-webkit-scrollbar-thumb{ border: 1px solid black; }";
	document.head.appendChild(script);
});
generalscroll.addEventListener("mouseleave",function(e){

	document.head.removeChild(script);
});

// var ws = document.styleSheets[3];
// ////////console.log(ws);
// var sheet = new CSSStyleSheet({"cssRules":ws});
// ////////console.log(sheet);
// ////////console.log(ws.rules[52]);
// ////////console.log(ws.insertRule('#draggables::-webkit-scrollbar-track-piece{ width:40px!important;}',0));
var count = 0;
var columcount = 0;
var clicks = {};
var openpreview = [];
function savedelaction(e){

	// //console.log(e.target.getBoundingClientRect().left,e.clientX,,,(e.target.getBoundingClientRect().right-e.target.getBoundingClientRect().left))
		//console.log(e.target,i);
		if(e.type === "click"){
		
			//console.log(e,"clicked");
			if(e.target.getAttribute("data-isclicked") === "false"){
				if( e.clientX >= e.target.getBoundingClientRect().right-10){
					e.target.pseudoStyle({"element":"after","temp":`background:rgba(224, 41, 41, 0.14);width:unset;left:0;`});
					e.target.pseudoStyle({"element":"before","temp":`display:none;`});
					e.target.setAttribute("data-isclicked",true);
					e.target.setAttribute("data-side","right");
					//console.log(e.target.previousElementSibling.getAttribute("class"));
					if(e.target.previousElementSibling.getAttribute("class") === "previewline"){

						e.target.previousElementSibling.innerHTML = "CLEAR";
						//console.log(e.target.previousElementSibling.style);
						e.target.previousElementSibling.style.cssText = "transform: translateY(-17px);";
						openpreview.push(e.target.previousElementSibling);
						e.target.previousElementSibling.setAttribute("data-openedby",e.target.getAttribute("id"));
						
					}
					//console.log(e.target.parentElement.firstElementChild);
					if(e.target.parentElement.firstElementChild.classList.contains("predelconfirm")){
						if(e.target.parentElement.firstElementChild.classList.contains("predelconfirmClose"))
							e.target.parentElement.firstElementChild.classList.remove("predelconfirmClose");
						var pbtns = e.target.parentElement.firstElementChild.children;
						for(var [k,kitems] of Object.entries(pbtns)){
							if(kitems.classList.contains("pyesconfirm")){
								kitems.addEventListener("click",function(ek){
									//e.target.remove();
									e.target.parentElement.style.cssText = "display:none";
								});
							}
							if(kitems.classList.contains("pnoconfirm")){
								kitems.addEventListener("click",function(ek){
									if(!e.target.parentElement.firstElementChild.classList.contains("predelconfirmClose"))
										e.target.parentElement.firstElementChild.classList.add("predelconfirmClose");
										e.target.pseudoStyle({"element":"before","temp":`width:initial;`});
										e.target.previousElementSibling.innerHTML = "";
										e.target.previousElementSibling.style.cssText = "transform: translateY(0px);";
										e.target.setAttribute("data-isclicked",false);
								});
							}
						}
					}

				}

				if(e.clientX <= e.target.getBoundingClientRect().left+10){
					
					e.target.pseudoStyle({"element":"before","temp":`background:rgba(41, 224, 41, 0.14);width:unset;right:0;`});
					e.target.pseudoStyle({"element":"after","temp":`display:none;`});
					e.target.setAttribute("data-isclicked",true);
					e.target.setAttribute("data-side","left");
					if(e.target.previousElementSibling.getAttribute("class") === "previewline"){

						e.target.previousElementSibling.innerHTML = "CLEAR";
						//console.log(e.target.previousElementSibling.style);
						e.target.previousElementSibling.style.cssText = "transform: translateY(-17px);";
						e.target.previousElementSibling.setAttribute("data-openedby",e.target.getAttribute("id"));
						
					}
					

				}
			}

			
		}
		
		if(e.type === "mouseover"){
			e.target.addEventListener("mousemove",function(ev){
				////console.log(clicks);
				
				if(ev.target.getAttribute("data-isclicked")=== "false"){	
					if( ev.clientX >= ev.target.getBoundingClientRect().right-10){
						
							ev.target.pseudoStyle({"element":"after","temp":`background:rgba(224, 41, 41, 0.14);`});
						
					}else{
						
							ev.target.pseudoStyle({"element":"after","temp":`background:initial;`});
						
					}
					if(ev.clientX <= ev.target.getBoundingClientRect().left+10){
						
							ev.target.pseudoStyle({"element":"before","temp":`background:rgba(41, 224, 41, 0.14);`});
						
					}else{
						
							ev.target.pseudoStyle({"element":"before","temp":`background:initial;`});
						
					}
				}
				
			})
		}
		if(e.type === "mouseleave"){

			if(e.target.getAttribute("data-isclicked")=== "false"){	
				e.target.pseudoStyle({"element":"after","temp":`background:initial;`});
				e.target.pseudoStyle({"element":"before","temp":`background:initial;`});
						e.target.addEventListener("mousemove",function(ev){
							
							
							
						});
			}
									
		}
}

function clearbtn(e){
	////console.log(e.target.getAttribute("data-openedby"),e)
	var pre = document.querySelector(`#${e.target.getAttribute("data-openedby")}`);
	//console.log(pre);
	if(pre.getAttribute("data-isclicked") === "true"){
		if(pre.getAttribute("data-side") === "right"){
			pre.pseudoStyle({"element":"after","temp":`display:initial;`});
			pre.pseudoStyle({"element":"after","temp":`background:initial;`});
			pre.setAttribute("data-isclicked",false);
		}
	}
	if(pre.getAttribute("data-isclicked") === "true"){
		if(pre.getAttribute("data-side") === "left"){
			pre.pseudoStyle({"element":"before","temp":`display:initial;`});
			pre.pseudoStyle({"element":"before","temp":`background:initial;`});
			pre.setAttribute("data-isclicked",false);
		}
	}
	e.target.style.cssText = "transform:translateY(0);";
	e.target.innerHTML = "";
}
var prviewclear = function(reader){
	var previews = document.querySelectorAll(".previewline");
	//console.log(previews);
	for(var i of previews){
		// i.pseudoStyle({"element":"before","temp":`background:red;`})
		// i.addEventListener("mouseover",clearbtn);
		i.addEventListener("click",clearbtn);
		

	}
}
var savedordelete = function(reader){
	var previews = document.querySelectorAll(".previewitem");
	//console.log(previews);
	for(var i of previews){
		// i.pseudoStyle({"element":"before","temp":`background:red;`})
		i.addEventListener("mouseover",savedelaction);
		i.addEventListener("mouseleave",savedelaction);
		i.addEventListener("click",savedelaction);
		

	}
}

var store= new Storage()
var savethis = {};
	// store.set({"test":"that"},function(result){
	// 	console.log("this works");
	// });
	// store.get("test",function(result){
	// 	console.log("this works",result);
	// })
	// store.remove("test");
function saveimge(where,to,store){
	store.set({wherefrom:where,whereto:to,store:store});
}

function galleryimg(){

}

var previewimages = [];
var loadedpreview = new Event('change',{"bubbles":true ,"cancelable":false});
var previewAdd = document.querySelector("#previewadd");
function previews(target,file,length,rowcount){
	if(target.files && target.files[0]){
		var reader = new FileReader();
		var e  = target.getAttribute("data-preview");
		//console.log(file);
		//console.log(event,target,target.nextElementSibling.nextElementSibling);
		var item;
		var previewcont = target.nextElementSibling.nextElementSibling;
		var gparent = target.parentElement.parentElement;
		var imgcont = gparent.nextElementSibling.children[1];
		console.log(gparent.nextElementSibling.children,gparent.previousElementSibling.children[2]);
		imgcont.setAttribute("data-previewitem","imgcont"+target.getAttribute("id"));
		imgcont.setAttribute("id","imgshowcont"+target.getAttribute("id"));
		if(previewcont.classList.contains("previewpoppup")){
			//console.log(previewcont);
			var previewitem=  previewcont.children[0];
			var previewbtns=  previewcont.children[1];
			//console.log(previewitem)
			//console.log("ddsa",previewitem.classList.contains("previewbtns"))
			if(previewitem.classList.contains("preview")){
					 if(previewitem.children.length >= 0){
					 	count = (previewitem.children.length);
					 }

						reader.addEventListener('load',function(e){
							console.log(e,target.files);
								previewitem.innerHTML += `<div id="pre${count}r${target.getAttribute("rowcount")}" data-imagecontparent="${imgcont.getAttribute("data-previewitem")}" data-atrow="${target.getAttribute("rowcount")}" data-img="${e.target.result}" data-iteration="${count}" class="previewitemcont">
									<div class="predelconfirm predelconfirmClose">
										<span>Remove?</span>
										<button class="pyesconfirm">Yes</button>
										<button class="pnoconfirm">No</button>
									</div>
							 		<div class="previewline"></div>
							 		<div id="preitem${count}r${target.getAttribute("rowcount")}" filename="${target.files[count].name}" lastModified="${target.files[count].lastModified}" lastModifiedDate="${target.files[count].lastModifiedDate}" data-timestamp="${e.timeStamp}" data-imagecont="${imgcont.getAttribute("id")}" data-atrow="${target.getAttribute("rowcount")}" data-iteration="${count}" data-isclicked="false" data-side="left" style="background:url(${e.target.result})" data-img="${e.target.result}" data-count="${count}" class="previewitem"></div>
							 	</div>`;
							 	count++;
							 	
							 	previewAdd.dispatchEvent(loadedpreview);

							 	if(previewbtns.classList.contains("previewbtns")){
							 		if(previewbtns.classList.contains("previewbtnsClose")){
							 			previewbtns.classList.remove("previewbtnsClose")
							 		}
							 	}
						});


						reader.readAsDataURL(file);	
						previewimages.push(reader);

			}
			
		}
	}

	return previewimages;
}
function outi(e){
				//console.log(item,file,e);
				if(item != undefined){
					
					item.style.background = "url("+e.target.result+")";

				}				
			}
var savetheseimages = [];
var saveevent = new Event('change',{"bubbles":true ,"cancelable":false});
var saveeventdone = new Event('change',{"bubbles":true ,"cancelable":false});
var savediv = document.querySelector("#saveimages");
var savedivdone = document.querySelector("#saveimagesdone");
var elementstosaves = {};
var b={}
var r = {}
function savepreviewimages(r){


	console.log(r);

	var save = document.querySelectorAll(".savepreview");
	//var preview = document.querySelectorAll(".previewitem");
	//console.log(save[0].parentElement.previousElementSibling);
	for(var [i,saveing] of Object.entries(save)){
		saveing.addEventListener("click",function(e){
			var childprev = e.target.parentElement.previousElementSibling.children;
			console.log(childprev);
			console.log(e);
			
			
			var preview = document.querySelectorAll(".previewitem");
			for(var [i, prevs] of Object.entries(childprev)){
				//console.log(preview[i],prevs);
				
				
				if(prevs.children[2].getAttribute("data-isclicked")=== "true"){
					if(prevs.children[2].getAttribute("data-side") === "left"){
						/*saving*/
						//save stuff to local and or server;
						console.log();
						prevs.children[2].pseudoStyle({"element":"before","temp":`background:rgba(41, 224, 41, 0.14);width:unset;right:0;`});
						prevs.children[2].pseudoStyle({"element":"after","temp":`display:none;`});

						savetheseimages.push(prevs.children[2].getAttribute("data-img"));

						// window.setTimeout(async ()=>{
						// 	console.log("e");
						// 	savediv.dispatchEvent(saveevent);
						// },3000);

					}
					if(prevs.children[2].getAttribute("data-side") === "right"){
						// remove from priview no save

					 	prevs.children[2].previousElementSibling.innerHTML = "Removing";
					 	prevs.children[2].parentElement.style.cssText = "display:none";
					 	
					 	
						//prevs.parentElement.remove();
						
						//count = (previewitem.children.length);
						//prevs.remove()
					}
				}else{
					//console.log(prevs);
					if(prevs.children[2].getAttribute("data-side") === "left"){
						/*saving*/
						//save stuff to local and or server;
						
						prevs.children[2].pseudoStyle({"element":"before","temp":`background:rgba(41, 224, 41, 0.14);width:unset;right:0;`});
						prevs.children[2].pseudoStyle({"element":"after","temp":`display:none;`});
						prevs.children[2].setAttribute("data-isclicked",true);
						prevs.children[2].previousElementSibling = "saving";
						savetheseimages.push(prevs.children[2].getAttribute("data-img"));

						savedivdone.addEventListener("change",function(e){
							console.log("finish up");
						});
						var row = prevs.children[2].getAttribute("data-atrow");
						
						if(prevs.getAttribute("data-atrow") == row){
							b["r"+row] = row;
							// console.log(b,row);
							var n = prevs.getAttribute("id");
							// console.log(n);
							if(String(n).includes("r"+row)){
								console.log(prevs.children);
							}
							//childprev["files"] = b;
							// if(childprev[i+1]!= undefined){
							// 	if(n != childprev[i+1].getAttribute("id")){
							// 		r[n] ={t:childprev[n][0]};
							// 	}
							// }
							// b[row] = r[n];
							// console.log(r);
							// var t = r;
							// console.log(r);
							elementstosaves[row]=childprev;
							
						}
						//console.log(saveevent);
						window.setTimeout(async ()=>{
							
							savediv.dispatchEvent(saveevent);
						},3000);
					}
				}
				
			}
		})
	}
	saveevent["currenta"] = elementstosaves;
}

function ajaxcall(file,j={}){

	var files = file;

	var formdata  = new FormData();

	try{
		if(files.length > 0){
			for(var [i,item] of Object.entries(files)){
				//console.log(i,item);
			}	
		}
	}catch(e){

	}


	$.ajax({
		type:'POST',
		url:"#",
		dataType:'json',
		data:{"test":"test"},
		cache:false,
		contentType:false,
		processData:false,

		beforeSend:function(data,textstatus, jqXHR){
			////console.log("before",data,textstatus,jqXHR);
			try{
				j.beforeSend();
			}catch(e){

			}
		},
		success: function(data,textStatus,jqXHR){
			////console.log(data,textstatus,jqXHR);
			try{
				j.success();

			}catch(e){

			}
		},
		complete:function(data,textStatus,jqXHR){
			////console.log(data,textStatus, jqXHR);
			try{
				j.complete();
			}catch(e){

			}
		},error:function(throws){
			//console.log(throws);

		}	
	});
}

function getimages(){
	var images = document.querySelectorAll(".bgimgfile");
	
	
	for(var [i,item] of Object.entries(images)){
		//console.log(i,item);
		item.setAttribute("rowcount",i);
		item.addEventListener("change",function(e){
			//console.log(e.target.files,e.target.result);
			var length = e.target.files.length;
			for(var [j,file] of Object.entries(e.target.files)){
				//console.log(i);
				var imgarray = previews(this,file,length,i);
				
			}

		})
	}
}

getimages();
previewAdd.addEventListener("change",function(){
	if(previewimages != undefined){
		savedordelete(previewimages);
		prviewclear();
		savepreviewimages(previewimages)
		var q = document.querySelectorAll(".preview");
		var leftsave = [];
		savediv.addEventListener("change",function(e){
			console.log(e);
			for(var [i,elem] of Object.entries(e.currenta)){
				console.log(elem,i);
				for(var [j,elemj] of Object.entries(elem)){
					//console.log(elemj)
					if(elemj.children[2].getAttribute("data-side") === "left"){
						console.log(elemj);
						leftsave.push(elemj.children[2].getAttribute("data-img"));
						var g = document.querySelector("#"+elemj.getAttribute("id"))
						console.log(g);
						var name = String(g.children[2].getAttribute("filename")).split(".");
						console.log(name[0]);
						//g.innerHTML += `<div id="${name[0]}" class="displayimages" filename="${g.children[2].getAttribute("filename")}" lastModified="${g.children[2].getAttribute("lastModified")}" lastModifiedDate="${g.children[2].getAttribute("lastModifiedDate")}" timestamp="${g.children[2].getAttribute("timestamp")}"></div>`;
					}
				}
				// if(i.getAttribute("data-side") === "left"){
				// 	//leftsave.push()
				// 	console.log(i);
				// }
			}
		})
		// for(var [i,item] of Object.entries(q)){
		// 	item.addEventListener("change",function(e,r){
		// 		console.log(e.target,e.target.children[0]);
		// 		for(var[j,jitem] of Object.entries(e.target.children)){
		// 			savedivdone.dispatchEvent(saveeventdone);
		// 			console.log(jitem.children[2]);
		// 		}
		// 	});
		// }
		
	}
})

// if(previewimages != undefined){
// 		savedordelete(previewimages);
// 		prviewclear();
// 		savepreviewimages(previewimages)
// }


