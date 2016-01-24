/*
 * 1) determines where elems on page are
 * 2) for a given position, determine which elements must be moved (return array of pointers) 
 */ 

/*
 * Auxiliary size function for Object. Call with 
 * Object.size(myArray)
 * @param obj Object to determine size of.
 */
Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
	    if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

/* 
 * Blast webpage; that is, enclose all characters in 
 * their own span tags.
 */

function blastWebpage(){
$("div")
  // Blast the text apart by word.
  .blast({ 
    delimiter: "character", // Set the delimiter type (see left)
    tag: "span", // Set the wrapping element type (e.g. "div")
    display: "inline",
    // position: "absolute"
    });

  $("p")
  // Blast the text apart by word.
  .blast({ 
    delimiter: "character", // Set the delimiter type (see left)
    tag: "span", // Set the wrapping element type (e.g. "div")
    display: "inline",
    // position: "absolute"
    });
}

/* 
 * Finds and stores all boundary locations of elements 
 * on the page. To get the element corresponding to id, 
 * get all[id].
 */ 

function findElems() {
	for (var i=0, max=all.length; i < max; i++) {
    	// store bounding box corners
    	var elem = all[i];
    	var id = i;
    	var rect = elem.getBoundingClientRect();
    	boundaries[id] = {};
    	boundaries[id].right = rect.right;
    	boundaries[id].left = rect.left;
    	boundaries[id].top = rect.top;
    	boundaries[id].bottom = rect.bottom;
	}
};

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

/*
 * Determines whether an element should collide or not
 * depending on the sprite's location and direction. If
 * yes, punts the element.
 * @param id The id of an element, from findElems()
 * @param sprite The sprite object
 */

var delta = 6; // threshold: within 10px
var sprite = document.getElementById("character");
var all = document.getElementsByClassName("blast");
var boundaries = {};

 function puntElem(id) {
    //console.log("punt");
    var style = window.getComputedStyle(sprite)
    //console.log(sprite.className.split(/\s+/));
    var dir = sprite.className.split(/\s+/)[0];
    var x = style.left.substring(0,style.left.length-2);
    x = parseInt(x);
    var y = style.top.substring(0,style.top.length-2);
    y = parseInt(y);

    //console.log(x + "," + y);
    var elemLoc = getPosition(all[id]);
    //console.log(elemLoc);
    var dist = distance(x,y,elemLoc);
    //console.log("dist: " + dist);
    //console.log("sprite: " + x + "," + y);
 	// if sprite is facing the object and within punting distance
 	/*if ((dir.startsWith("front") && x<=id.right && x>=id.left && y-id.top<=delta && y-id.top>=0) ||
 		(dir.startsWith("back") && x<=id.right && x>=id.left && id.bottom-y<=delta && id.bottom-y>=0) ||
 		(dir.startsWith("right") && y<=id.top && y>=id.bottom && id.left-x<=delta && id.left-x>=0) ||
 		(dir.startsWith("left") && y<=id.top && y>=id.bottom && x-id.right<=delta && x-id.right>=0)) {
 		console.log("collide");
        deleteElem(all[id]);
 	}*/
    if (dist < delta) {
        deleteElem(all[id]);
    }
 }

/*
 * Distance function between two elements.
 */
function distance(x,y,elemLoc){
    var a = Math.abs(elemLoc.x-x);
    var b = Math.abs(elemLoc.y-y);
    return Math.sqrt(a+b);
}

/* 
* Deletes the given element; that is, makes it the 
* background color. 
* @param element The given element. 
*/ 
 function deleteElem(element){

    var background_rgb = [255, 255, 255];

    var c = $("body").css("background-color");
    var colors = c.replace(/^rgba?\(|\s+|\)$/g,'').split(',');
    background_rgb[0] = colors[0];
    background_rgb[1] = colors[1];
    background_rgb[2] = colors[2];

    if(background_rgb[0] == background_rgb[1] == background_rgb[2] == 0){ // Handle if background not defined or black
        background_rgb[0] = 255;
        background_rgb[1] = 255;
        background_rgb[2] = 255;
    }

    var backgroundWrite = "rgb(" + background_rgb[0] + ", " + background_rgb[1] + ", " + background_rgb[2] + ")";
    element.style.color = backgroundWrite;
}


$(document).ready(function() {
    blastWebpage();
    
    //console.log(all.length);
    findElems();
    //console.log(Object.size(boundaries));
    setInterval(function(){
        //console.log("update");
      for (var i = 0; i < all.length; i++) {
            puntElem(i);
        }
    }, 250);
    
});


