var context = document.querySelector("canvas")

context.width = 768;
context.height = 640;

var surface = context.getContext("2d")//getting reference to the html and setting the canvas to a 2d Surface.
var uInt;
var level;
var enemyArray = [];
var scrollSpeed = 4;
var images = [];
var imgStr = ["water", "ground", "enemy", "player",]

const ROWS = 5;
const COLS = 6;

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;
var playerSpeed = 10;

var enemyChance = 33;
var gapMoveChance = 66;
var gapRow = Math.floor(Math.random() * ROWS);

var player = {img:null, x:120, y:320}

createLevel();

function update()
{
	checkCollision();
	scrollLevel();
	render();
	movePlayer();
}

function createLevel()
{
	for (var i = 0; i < imgStr.length; i++)
	{
		images[i] = new Image();
		images[i].src = "../img/"+imgStr[i]+".png";
	}
	
	level = [];
	for (var row = 0; row < ROWS; row++)
	{
		level[row] = [];
		for (var col = 0; col < COLS; col++)
		{
			var tile = {};
			tile.x = col*128;
			tile.y = row*128;
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
		for (var col = 0; col < COLS; col++)
		{
			level[row][col].x -= scrollSpeed;
		}
	}
	if (level[0][0].x <= -128)
	{
		for (var row = 0; row < ROWS; row++)
		{
			if(enemyArray.indexOf(level[row][0]) == 0)
				enemyArray.shift();
			level[row].shift();
			var tile = {};
			tile.x = (COLS-1)*128;
			tile.y = row*128;
			setTileType(tile, row);
			level[row].push(tile);
		}
		var rand = Math.ceil(Math.random() * 99);
		if (rand <= gapMoveChance)
		{
			if (gapRow == 0)
			gapRow = 1;
			else if (gapRow == ROWS-1)
				gapRow = ROWS-2;
			else
				gapRow += (Math.floor(Math.random() * 2) * 2) -1;
			
		}
		
	}
	
}

function setTileType(t, r)
{
	var rand = Math.ceil(Math.random() * 99)
	if(r == gapRow)
		t.img = images[0];
	else if (rand <= enemyChance)
	{
		t.img = images[2];
		enemyArray.push(t);
	}
	else 
		t.img = images[1];
}

function checkCollision()
{
	for (var i = 0; i < enemyArray.length; i++)
	{
		if(!(player.x+8 > enemyArray[i].x+64||
			player.x+64 < enemyArray[i].x+8||
			player.y > enemyArray[i].y+52||
			player.y+58 < enemyArray[i].y+8))
			{
				window.alert("GAME OVER");
				clearInterval(uInt);
			}
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
	if (downPressed == true)
		player.y += playerSpeed;
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

function render()
{
	surface.clearRect(0,0,context.width,context.height); // Clears what was drawn on the canvas within the specified rectangle.
	for (var row = 0; row < ROWS; row++)
	{
		for (var col = 0; col < COLS; col++)
		{
			surface.drawImage(level[row][col].img, level[row][col].x, level[row][col].y);
		}
		
	}
	surface.drawImage(player.img, 
					  0, 0, 128, 128,
					  player.x, player.y, 128, 128
					  						);  // Position and size on canvas.
}

//function loop();