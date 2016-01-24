/* jquery.js */
/* jquery.velocity.js */
/* velocity.ui.js */
/* jquery.blast.js */


function blastWebpage(){ // choose which mode you want
  blastWebpage_Chars_Divs(globalPositionAll);
}


/* Blasts by word division */
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
/* Blasts by char division */
function blastWebpage_Chars_Divs(callback){
$("span").blast(false);
$("div")
  .blast({ 
    delimiter: "character", // Set the delimiter type (see left)
    tag: "span", // Set the wrapping element type (e.g. "div")
    });

  $("p")
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
      deleteElem(testdiv); // Can improve this later. Removes troublesome chars
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

/* Delete an Element */
function deleteElem(element){
  element.remove();
}

/* Move an Element */
function moveDivElem(element,newX,newY){
  testdiv.style.left =  newX; 
  testdiv.style.top = newY; 
}

/* Get an Element's Position */
function GetDivPositioning(element){
  testdiv.style.left =  curX; 
  testdiv.style.top = curY; 
  var position = [curX, curY];
  return position;
}

/* Get screen capture at a div */
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