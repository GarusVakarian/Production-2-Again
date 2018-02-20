var canvas = document.querySelector("canvas"); //link to the HTML

canvas.width = 1000;// canvas set to 1000px width
canvas.height = 800;// canvas set to 800px height

var player = {img:"//img/player.png", x: 120, y: 320}
var surface = canvas.getContext("2d"); // canvas is now set to a 2d surface 
var background = new Image();
background.src = "../img/background.jpg";//setting the background image of the canvas
var player = new Image();
player.src = "../img/player.png";

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

var uInt;//the setIntercal variable 
var leftPressed =  false;
var rightPressed = false;
var upPressed = false;
var playerSpeed = 10;//speed of player

function update()
{
	//checkCollision();
	movePlayer();
	render();
}
 uInt = setInterval(update, 33.34);
 
 function render()
 {
	 surface.clearRect(0,0,canvas.width, canvas.height);
	 surface.drawImage(player, 100, 100);
	 surface.drawImage(background, 0, 0);
 }

function onKeyDown(event)
{
	switch (event.keyCode)
	{
		case 65: // A
			leftPressed = true; 
			break;
		case 68: // D
			rightPressed = true;
			break;
		case 87: // W
			upPressed = true;
			break;
		case 83: // S
			downPressed = true;
			break;
	} 
}

function onKeyUp(event)
{
	switch (event.keyCode)
	{
		case 65: // A
			leftPressed = false; 
			break;
		case 68: // D
			rightPressed = false;
			break;
		case 87: // W
			upPressed = false;
			break;
		case 83: // S
			downPressed = false;
			break;
	}
}

function movePlayer()
{
	if (leftPressed == true)
		player.x -= playerSpeed;
	if (rightPressed == true)
		player.x += playerSpeed;
	if (upPressed == true)
		player.y -= playerSpeed;
}


//surface.font = "100px Gadget";
//surface.fillStyle = "#FF00FF";
//surface.textAlign = "center";
//surface.fillText("Awesome Game Title", canvas.width/2, canvas.height/2);
//surface.font = "30px san-serif";
//surface.fillText("Press Enter to Start", canvas.width/2, canvas.height/2 + 50);
