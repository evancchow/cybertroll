/* jquery.js */
/* jquery.velocity.js */
/* velocity.ui.js */
/* jquery.blast.js */





// blastWebpage_Words();
// console.log("webpage blasted");
// deleteChar();
// blockWord();
// generateBlocks();
// screenCapture();
// blastWebpage_Chars()
// deleteChar();
// console.log("chars deleted");
// deleteElem();

// blastWebpage_Words_Divs(globalPositionAll);

blastWebpage_Chars_Divs(globalPositionAll);
// deleteEveryOtherChar();



function blastWebpage_Words_Divs(callback){

  $("div")
  // Blast the text apart by word.
  .blast({ 
    delimiter: "word", // Set the delimiter type (see left)
    tag: "div", // Set the wrapping element type (e.g. "div")
    });

  $("p")
  // Blast the text apart by word.
  .blast({ 
    delimiter: "word", // Set the delimiter type (see left)
    tag: "div", // Set the wrapping element type (e.g. "div")

    });

  var x = document.getElementsByClassName("blast blast");
  
  // Assign unique id to all elements
  for (var i = 0; i < x.length; i++) {
    x[i].id = i;
  };

  console.log(x);

  var divPositions = [x.length];


  console.log("completed blasting");

  callback(x, divPositions);

}

function blastWebpage_Chars_Divs(callback){
$("span").blast(false);
$("div")
  // Blast the text apart by char.
  .blast({ 
    delimiter: "character", // Set the delimiter type (see left)
    tag: "span", // Set the wrapping element type (e.g. "div")
    });

  $("p")
  // Blast the text apart by word.
  .blast({ 
    delimiter: "character", // Set the delimiter type (see left)
    tag: "span", // Set the wrapping element type (e.g. "div")
    });

  var x = document.getElementsByClassName("blast");
  
  // Assign unique id to all elements
  for (var i = 0; i < x.length; i++) {
    x[i].id = i;
  };

  console.log(x);

  var divPositions = [x.length];

  console.log("completed blasting");

  callback(x, divPositions);
}

function globalPositionAll(x, divPositions){
  $("div").each(function(index, element) {
    $(this).context.style.display = "inline-block";
    $(this).context.style.zIndex= 1;
  });

  for (var i = x.length-1; i > -1; i--) {
    var testdiv = document.getElementById(i);
    var dimensions = [testdiv.offsetLeft,testdiv.offsetTop, testdiv.offsetWidth,testdiv.offsetHeight]; // [x coord, y coord, width, height]
    divPositions[i] = dimensions;

    if(testdiv.childElementCount > 0){
      var children = testdiv.children;
      testdiv.remove(); // Can improve this later. Removes troublesome chars
    }
        // DUPLICATE DETECTION
    // for(var j = x.length-1; j > i; j--){
    //   var dimension2 = divPositions[j];
    //   if(dimensions[0] == dimension2[0] && dimensions[1] == dimension2[1]){
    //     console.log("One Match");
    //     dimensions[1] = dimensions[1] + 6;
    //     testdiv.style.zIndex = 2;
    //   }
    // }
  };

  console.log(divPositions)

  // ADJUST TO ABSOLUTE POSITIONING
  for (var i = x.length-1; i > -1; i--) {
    var testdiv = document.getElementById(i);
    // currentdiv = index;   
    testdiv.style.position = "absolute";
    var dimensions = divPositions[i];
    testdiv.style.left =  dimensions[0]; 
    testdiv.style.top = dimensions[1]; 

  };

}

function deleteEveryOtherChar(){

	var background_rgb = [255, 255, 255];
    $("span").each(function(index, element) {

	if(index %2 == 0){
		deleteDivElem($(this));
	}
}); 
}


function deleteDivElem(element){
  element.remove();
}

function moveDivElem(element,newX,newY){
  testdiv.style.left =  newX; 
  testdiv.style.top = newY; 
}

function GetDivPositioning(element){
  testdiv.style.left =  curX; 
  testdiv.style.top = curY; 
  var position = [curX, curY];
  return position;
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

function screenCapture(element){
$(document).ready(function() {
    // var testdiv = document.getElementById("blast-1");
    html2canvas($("#blast-1"), {
        onrendered: function(canvas) {
            // canvas is the final rendered <canvas> element
            var myImage = canvas.toDataURL("image/png");
            window.open(myImage);
        }
    });

    console.log(" Screen capture complete");
  });
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










