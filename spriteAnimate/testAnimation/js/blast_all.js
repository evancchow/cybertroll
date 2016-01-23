/* jquery.js */
/* jquery.velocity.js */
/* velocity.ui.js */
/* jquery.blast.js */





blastWebpage();
console.log("webpage blasted");
deleteChar();
console.log("chars deleted");
// deleteElem();


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

function deleteChar(){

	var background_rgb = [255, 255, 255];
    $("span").each(function(index, element) {

	if(index %2 == 0){
		deleteElem($(this));
	}
}

); 
}

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
	element.css("color" , backgroundWrite);
}

// SAMPLE DIV BLASTING
// $("div")
//   // Blast the text apart by word.
//   .blast({ 
//   	delimiter: "word", // Set the delimiter type (see left)
//     tag: "div", // Set the wrapping element type (e.g. "div")
//     // position: "absolute"
//     });

// $("div.blast").each(function(index, element) {
// // 	console.log(index);
// // 	// // $( this).addClass( index);
// // 	// console.log($(this));
// // 	// console.log(element.getBoundingClientRect());
// // 	// $( this).style.position("absolute");
// // 	// if(index == 1){
// 			// $( this).position( {
// 			// 	position:"absolute",
//  		// 		 top:0,
// 			// 	 right:0,
// 			// 	 width:"200px",
//  		// 		});
// // 	// 	}
// 	if(index %2 == 0){
// // 		// $( this).velocity("slideDown", { 
// // 	 // 		duration: 1 })

// // 		// 	.velocity("slideUp", { 
// // 	 //    	duration: 1500 
	    	
// // 	 //    });

		
// 		$(this).velocity({
//    			 translateY: "20px",
//    			 rotateZ: "20deg"
// 		});

// 	}
// });



// ANIMATED DELETION
// animatedDelete()


// function animatedDelete(){
//     $("span").each(function(index, element) {

// 	if(index %2 == 0){
// 		$( this).slideDown({ 
// 	 		duration: 100 ,
// 	 		delay: 1000})

// 			.slideUp( "slow", function() {
//    				 console.log("animation complete");
//    				 element.style.display = "inline";

//   				 var c = $("body").css("background-color");
// 				 var colors = c.replace(/^rgba?\(|\s+|\)$/g,'').split(',');
// 				 for(var i in colors) {
// 				  console.log(colors[i]);
// 				 }
// 				 background_rgb[0] = colors[0];
// 				 background_rgb[1] = colors[1];
// 				 background_rgb[2] = colors[2];
// 				 var backgroundWrite = "rgb(" + background_rgb[0] + ", " + background_rgb[1] + ", " + background_rgb[2] + ")";
//    				 $( this).css("color" , backgroundWrite);
   				 
//  			 });

// 	}
// }); 
// }








