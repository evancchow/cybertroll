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
 * Finds and stores all boundary locations of elements 
 * on the page. To get the element corresponding to id, 
 * get all[id].
 */ 

var all = document.getElementsByClassName("blast");
var boundaries = {};

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

/*
 * Determines whether an element should collide or not
 * depending on the sprite's location and direction. If
 * yes, punts the element.
 * @param id The id of an element, from findElems()
 * @param sprite The sprite object
 */

 var delta = 10; // threshold: within 10px

 function puntElem(id, sprite) {
 	var dir = sprite.direction;
 	var x = sprite.x;
 	var y = sprite.y;
 	// if sprite is facing the object and within punting distance
 	if ((dir=="down" && x<=id.right && x>=id.left && y-id.top<=delta && y-id.top>=0) ||
 		(dir=="up" && x<=id.right && x>=id.left && id.bottom-y<=delta && id.bottom-y>=0) ||
 		(dir=="right" && y<=id.top && y>=id.bottom && id.left-x<=delta && id.left-x>=0) ||
 		(dir="left" && y<=id.top && y>=id.bottom && x-id.right<=delta && x-id.right>=0)) {
 		punt(dir, id);
 	}
 }

findElements();
console.log(Object.size(boundaries));

