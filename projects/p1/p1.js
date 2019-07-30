var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight; 




var ship = new Spaceship(canvas.width,canvas.height, 0);
var background = new Background(canvas.width, canvas.height);

var keysPressed = [];

document.addEventListener("keydown", function(e){
   addKey(e.key);
} );

document.addEventListener("keyup", function(e){
   removeKey(e.key);
} );

function addKey(newKey) {
	if(newKey != null) {
		var notYetPressed = true;
		for(var i = 0; i < keysPressed.length; i++) {
			if(newKey == keysPressed[i]) {
				notYetPressed = false;
			}
		}
	}
	if(notYetPressed) {
		keysPressed.push(newKey);
	}
}

function removeKey(oldKey) {
	if(oldKey != null) {
		for(var i = 0; i < keysPressed.length; i++) {
			if(oldKey == keysPressed[i]) {
				keysPressed.splice(i, 1);
			}
		}
	}
}

function handleKeysPressed() {
	for(var i = 0; i < keysPressed.length; i++) {
		if(keysPressed[i] == "w") {
			ship.incSpeed();
			
		}
		
		if(keysPressed[i] == "s") {
			ship.decSpeed();
		}
		
		if(keysPressed[i] == "d") {
			ship.deg += 5;
		}
		if(keysPressed[i] == "a") {
			ship.deg -= 5;
		}
	}
}

function gameLoop() {
	
	ship.calcNewXY();
	background.calcNewXY(ship.EV, ship.speed);
	
	context.clearRect(0,0, canvas.width, canvas.height);
	background.draw(context);
	
	/*
	context.beginPath();
	context.moveTo(ship.x, ship.y);
	context.lineTo(ship.x + ship.EV[0]*(canvas.width/1.5), ship.y + ship.EV[1]*(canvas.width/1.5));
	context.moveTo(ship.x, ship.y);
	context.lineTo(ship.x + ship.EV[0]*-(canvas.width/1.5), ship.y + ship.EV[1]*-(canvas.width/1.5));
	context.strokeStyle = 'white';
	context.stroke();
	*/
	ship.drawShip(context, keysPressed);
	handleKeysPressed();
	
}

setInterval(gameLoop, 20);