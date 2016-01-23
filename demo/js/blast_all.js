/* jquery.js */
/* jquery.velocity.js */
/* velocity.ui.js */
/* jquery.blast.js */

$("div")
  // Blast the text apart by word.
  .blast({ 
  	delimiter: "character", // Set the delimiter type (see left)
    tag: "div", // Set the wrapping element type (e.g. "div")
    position: "absolute"
    });

$("div.blast").each(function(index, element) {
// 	console.log(index);
// 	// // $( this).addClass( index);
// 	// console.log($(this));
// 	// console.log(element.getBoundingClientRect());
// 	// $( this).style.position("absolute");
// 	// if(index == 1){
// 	// 		$( this).position( {
// 	// 			position:"absolute",
//  // 				top:100,
//  // 				left:10,
//  // 				});
// 	// 	}
	if(index %2 == 0){
// 		// $( this).velocity("slideDown", { 
// 	 // 		duration: 1 })

// 		// 	.velocity("slideUp", { 
// 	 //    	duration: 1500 
	    	
// 	 //    });

		
		$(this).velocity({
   			 translateY: "10px",
   			 // rotateZ: "45deg"
		});

	}
});

