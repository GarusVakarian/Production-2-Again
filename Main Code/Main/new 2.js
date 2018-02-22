context = document.querySelector("canvas").getContext("2d");//getting reference to the html and setting the canvas to a 2d Surface.

context.canvas.height = 800;//height of the canvas
context.canvas.width = 800;//width of the canvas
 
var context, controller, rectangle, loop;// creating variables to represent the player, the main loop and a controller for the player.


rectangle = {

  height:32,//height of the player
  jumping:true,//making sure that when the player spawns they are NOT jumping
  width:32,//width of the player 
  x:5, // set the starting x postion of the player 
  x_velocity:0,// setting the intital velocity for the player
  y:500,//setting the intial y position of the player 
  y_velocity:0//stting the initial downard velocity of the player  

};

controller = {

  left:false,
  right:false,
  up:false,//setting the movement booleans to false so that the player is not moving when spawning 
  keyListener:function(event) //function for the listning for key presses 
  {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
        controller.left = key_state;
      break;
      case 38:// up key
        controller.up = key_state;
      break;
      case 39:// right key
        controller.right = key_state;//ASCII table codes for the arrow keys 
      break;

    }

  }

};

loop = function() {

  if (controller.up && rectangle.jumping == false) {

    rectangle.y_velocity -= 20;
    rectangle.jumping = true;

  }

  if (controller.left) {

    rectangle.x_velocity -= 0.5;//moving the player at a speed of 0.5 in left direction

  }

  if (controller.right) {

    rectangle.x_velocity += 0.5;

  }

  rectangle.y_velocity += 1.5;// gravity
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.9;// friction
  rectangle.y_velocity *= 0.9;// friction


  if (rectangle.y > 500)   // if rectangle is falling below floor line
  {

    rectangle.jumping = false;
    rectangle.y = 500;
    rectangle.y_velocity = 0;

  }

  // if rectangle is going off the left of the screen
  if (rectangle.x < -32) {

    rectangle.x = 320;

  } else if (rectangle.x > 1000) {// if rectangle goes past right boundary

    rectangle.x = -32;

  }

  context.fillStyle = "#202020";
  context.fillRect(0, 0, 800, 600);// x, y, width, height
  context.fillStyle = "#ff0000";// hex for red
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();
  context.strokeStyle = "#202830";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 164);
  context.lineTo(1000, 164);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);

//surface.font = "100px Gadget";
//surface.fillStyle = "#FF00FF";
//surface.textAlign = "center";
//surface.fillText("Awesome Game Title", canvas.width/2, canvas.height/2);
//surface.font = "30px san-serif";
//surface.fillText("Press Enter to Start", canvas.width/2, canvas.height/2 + 50);
