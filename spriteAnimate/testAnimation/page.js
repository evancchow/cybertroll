//Global variables that will be accessed in the functions below.
var currentKey;          //records the current key pressed
var TimerWalk;          //timer handle
var charStep = 2;       //1=1st foot, 2=stand, 3=2nd foot, 4=stand
var charSpeed = 400; //how fast the character will move

$(document).ready(function() {
	//add character state class
	$('#character').addClass('front-stand');
});

//KeyDown Function
  //if there is no currentKey down, execute charWalk
$(document).keydown(function(e) {
    if (!currentKey) {
 
      //set the currentKey to the key that is down
      currentKey = e.keyCode;
      console.log(e.keyCode);
 
      //execute character movement function charWalk('direction')
      switch(e.keyCode) {
        case 38: charWalk('up');    break;
        case 39: charWalk('right'); break;
        case 40: charWalk('down');  break;
        case 37: charWalk('left');  break;
      }
 
    }
 
  });
 
  //KeyUp Function
  $(document).keyup(function(e) {
 
    //don't stop the walk if the player is pushing other buttons
    //only stop the walk if the key that started the walk is released
    if (e.keyCode == currentKey) {
 
      //set the currentKey to false, this will enable a new key to be pressed
      currentKey = false;
 
      //clear the walk timer
      clearInterval(TimerWalk);
 
      //finish the character's movement
      $('#character').stop(true, true);
 
    }
 
  });

  //Character Walk Function
  function charWalk(dir) {
 
    //adjust from lang to code
    if (dir == 'up') dir = 'back';
    if (dir == 'down') dir = 'front';
 
    //move the character
    processWalk(dir);
 
    //set the interval timer to continually move the character
    TimerWalk = setInterval(function() { processWalk(dir); }, charSpeed);
 
  }
 
  //Process Character Walk Function
  function processWalk(dir) {
 
    //increment the charStep as we will want to use the next stance in the animation
   //if the character is at the end of the animation, go back to the beginning
    charStep++;
    if (charStep == 5) charStep = 1;
 
    //remove the current class
    $('#character').removeAttr('class');
 
    //add the new class
    switch(charStep) {
      case 1: $('#character').addClass(dir+'-stand'); break;
      case 2: $('#character').addClass(dir+'-right'); break;
      case 3: $('#character').addClass(dir+'-stand'); break;
      case 4: $('#character').addClass(dir+'-left');  break;
    }
 
    //move the char
    //we will only want to move the character 32px (which is 1 unit) in any direction
    switch(dir) {
      case'front':
        $('#character').animate({top: '+=32'}, charSpeed);
        break;
      case'back':
        //don't let the character move any further up if they are already at the top of the screen
        if ($('#character').position().top > 0) {
          $('#character').animate({top: '-=32'}, charSpeed);
        }
        break;
      case'left':
      //don't let the character move any further left if they are already at the left side of the screen  
      if ($('#character').position().left > 0) {
          $('#character').animate({left: '-=32'}, charSpeed);
        }
        break;
      case'right':
        $('#character').animate({left: '+=32'}, charSpeed);
        break;
      }
 
  }