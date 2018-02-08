var canvas = document.querySelector("canvas"); //link to the HTML

canvas.width = 1000;// canvas set to 1000px width
canvas.height = 800;// canvas set to 800px height

var surface = canvas .getContext("2d"); // canvas is now set to a 2d surface 

surface.font = "100px Gadget";
surface.fillStyle = "#FF00FF";
surface.textAlign = "center";
surface.fillText("Awesome Game Title", canvas.width/2, canvas.height/2);

surface.font = "30px san-serif";
surface.fillText("Press Enter to Start", canvas.width/2, canvas.height/2 + 50);
