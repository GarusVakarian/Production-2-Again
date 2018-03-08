context = document.querySelector("canvas").getContext("2d");//getting reference to the html and setting the canvas to a 2d Surface.

context.canvas.height = 800;//height of the canvas
context.canvas.width = 800;//width of the canvas 
 
var context, controller, player, loop, jumpSFX;// creating variables to represent the player, the main loop and a controller for the player.
//jumpSFX = document.getElementById ("jump");
var score = 0;
var uInt;
var level;
var scrollSpeed = 4;
const ROWS = 6
const COLS = 10;
var images = [];
var imgStr = ["water", "ground", "enemy", "player"];
var enemiesArray = [];
var gapMoveChance = 66;



//player = {

 // height:32,//height of the player
  //jumping:true,//making sure that when the player spawns they are NOT jumping
 // width:32,//width of the player 
 // x:5, // set the starting x position of the player 
 // x_velocity:0,// setting the intimal velocity for the player
 // y:500,//setting the initial y position of the player 
 // y_velocity:0//setting the initial downward velocity of the player  

//};

controller = {

  left:false,
  right:false,
  up:false,//setting the movement booleans to false so that the player is not moving when spawning 
  keyListener:function(event) //function for the listening for key presses 
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

createLevel();


function update()
{
	scrollLevel();
	//score++;
	//console.log(score);
}

function createLevel()
{
	for (var i = 0; i < 4; i++)
	{
		images[i] = new Image();
		images[i].src = "../img/"+imgStr[i]+".png";
	}
	level = [];

	for (var row = 0; row < ROWS; row++)
	{
		level[row] = [];
		for ( col = 0; col < COLS; col++)
		{
			var tile = {};
			tile.x = col*64;
			tile.y = row*64;
			tile.img = images[0];
			level[row][col] = tile;
		}
	}
	player.img = images[3];
	uInt = setInterval(update, 33.34);
}

function scrollLevel()
{
	for (var row = 0; row < ROWS; row++)
	{
		for (col = 0; col < COLS; col++)
		{
			level[row][col].x -= scrollSpeed;
		}
	}
	if (level[0][0].x <= 64)
	{
		for (var row = 0; row < ROWS; row++)
		{
			if (enemiesArray.indexOf(level[row][0]) == 0)
				enemiesArray.shift();
			console.log(enemiesArray.length);
			level[row].shift();
			var tile = {};
			tile.x = (COLS - 1)*64;
			tile.y = rows*64;
			setTileType(tile, row);
			level[row].push(tile);
		}
	}
}
loop = function() {//main game loop

	
  if (controller.up && player.jumping == false) {// this is stating if the player is not jumping it will will give it the ability to jump

    player.y_velocity -= 20;
    player.jumping = true;

  }

  if (controller.left) {

    player.x_velocity -= 0.5;//moving the player at a speed of 0.5 in left direction

  }

  if (controller.right) {

    player.x_velocity += 0.5;//moving the player to the right at a velocity of 0.5

  }

  player.y_velocity += 1.5;// gravity
  player.x += player.x_velocity;//displacing the players position by the position added by velocity 
  player.y += player.y_velocity;
  player.x_velocity *= 0.9;// friction
  player.y_velocity *= 0.9;// friction


  if (player.y > 500)   // if player is falling below floor line, it will reset the player back to the spot it spawned at 
  {

    player.jumping = false;//it will spawn not jumping
    player.y = 500;
    player.y_velocity = 0;//with a speed of 0

  }

  
  if (player.x < -32) {// if player is going off the left of the screen

    player.x = 320;

  } else if (player.x > 1000) {// if player goes past right boundary

    player.x = -32;

  }
   
  //function playAudio()
  //{
	 // jumpSFX.play();
  //}

 // context.fillStyle = "#00ced1";//setting color for the background canvas 
 // context.fillRect(0, 0, 800, 600);// x, y, width, height of the background which is in-turn the canvas
 
//  context.fillStyle = "#a52a2a";// setting color for the player
//  context.beginPath();
 // context.rect(player.x, player.y, player.width, player.height);
 // context.fill();
  
  context.strokeStyle = "#202830";//this is the floor color 
  context.lineWidth = 4;//this is the width of the floor
  context.beginPath();//this is to call that we care going to begin drawing the floor
  context.moveTo(0, 534);//this is the x and y coordinates for the start of the line
  context.lineTo(1000,534);//this is the final x and y coordinate for the floor 
  context.stroke();//this is to ACTUALLY draw the line 
	
  score++;//incrementing the score by one 
  context.font = "30px Arial";//setting the font for the entire game
  context.fillText ("Score: "+ score, 10, 50); //displaying the score

  
  
  window.requestAnimationFrame(loop);// call update when the browser is ready to draw again
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
