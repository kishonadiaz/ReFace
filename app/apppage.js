// const pickr = Pickr.create({
// 	 el: '.picker',
// 	 theme: 'classic',

// 	 swatches: [
//         'rgba(244, 67, 54, 1)',
//         'rgba(233, 30, 99, 0.95)',
//         'rgba(156, 39, 176, 0.9)',
//         'rgba(103, 58, 183, 0.85)',
//         'rgba(63, 81, 181, 0.8)',
//         'rgba(33, 150, 243, 0.75)',
//         'rgba(3, 169, 244, 0.7)',
//         'rgba(0, 188, 212, 0.7)',
//         'rgba(0, 150, 136, 0.75)',
//         'rgba(76, 175, 80, 0.8)',
//         'rgba(139, 195, 74, 0.85)',
//         'rgba(205, 220, 57, 0.9)',
//         'rgba(255, 235, 59, 0.95)',
//         'rgba(255, 193, 7, 1)'
//     ],

//     components: {

//         // Main components
//         preview: true,
//         opacity: true,
//         hue: true,

//         // Input / output Options
//         interaction: {
//             hex: true,
//             rgba: true,
//             hsla: true,
//             hsva: true,
//             cmyk: true,
//             input: true,
//             clear: true,
//             save: true
//         }
//     }

// })

var pickeroptions = {}
var pickerslist = ["bgpicker","postheadpicker","postcommentpicker","postallpicker","postrandomheaderpicker","postrandomcommentpicker","postrandomallpicker"]

let pickers = {};
var iscustomcolor = false;
var customcolor = "";

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
	            clear: true,
	            save: true
	        }
	    }

	})
}


function openclosed(elem){
	//elem
	var picr =  document.querySelectorAll(".pickr");
	// for(var i of picr){
	// 	if(i.classList.contains("pickrclosed")){
	// 		console.log(i);
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
				console.log(picr[i]);
				picr[i].classList.remove("pickrclosed");		
			}
		}
	}

	if(elem.classList.contains("bgcontrol")){
		console.log(elem);
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
	// 		console.log(i);	
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
				console.log(picr[i]);
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
//console.log(checkboxes,labels,labelbeef);
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
// 	//console.log(e.target);
// })
// //console.log(scroll);
// //console.log(window.getComputedStyle(scroll));
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
// //console.log(ws);
// var sheet = new CSSStyleSheet({"cssRules":ws});
// //console.log(sheet);
// //console.log(ws.rules[52]);
// //console.log(ws.insertRule('#draggables::-webkit-scrollbar-track-piece{ width:40px!important;}',0));
