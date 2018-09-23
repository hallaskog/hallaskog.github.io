var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;


var imgSpaceship = new Image();
imgSpaceship.src = './spaceship/spaceship.png';

var spaceshipPosY = 1;

var imgAsteroid = new Image();
imgAsteroid.src = './spaceship/asteroid.png';

var imgSkull = new Image();
imgSkull.src = './spaceship/death-skull.png';



//Controls
document.addEventListener('keydown', function(event) {
	 
	  if (event.key == 'w') {
		if(spaceshipPosY != 0) {
			spaceshipPosY -= 1;
		}
	  } else if(event.key == 's') {
		 if(spaceshipPosY != 2) {
			spaceshipPosY += 1;
		} 
	  }
	  
	  if(start == false) {
		  start = true;
	  }
	  if(restart == false) {
		  restart = true;
	  }
});

function didCollide(spaceshipY) {
	var spaceshipSize = (canvas.height*0.8)/3;
	for(i = 0; i < asteroidPosX.length; i++) {
		if(canvas.width/3 - (spaceshipSize*0.7)/2 + spaceshipSize*0.8 > asteroidPosX[i] - spaceshipSize/2
		&& canvas.width/3 - (spaceshipSize*0.7)/2 < asteroidPosX[i] + spaceshipSize/2
		&& spaceshipY - (spaceshipSize)*0.8/2 < asteroidPosY[i] + spaceshipSize/2
		&& spaceshipY - (spaceshipSize)*0.8/2 + spaceshipSize*0.8 > asteroidPosY[i] - spaceshipSize/2
		) {
			return true;
		}
	}
	return false;
}

function gameLoop() {
	
	asteroidHandler();
	
	//Background
	context.clearRect(0,0, canvas.width, canvas.height);
	context.fillStyle = "black";
	context.fillRect(0,0, canvas.width, canvas.height);
	
	//Stars
	drawStars(canvas.width/80);
	
	//Spaceship
	var spaceshipSize = (canvas.height*0.8)/3;
	var spaceshipY = 0.1*canvas.height + spaceshipPosY*spaceshipSize + spaceshipSize*0.5;
	
	if(didCollide(spaceshipY)) {
		
		timeEnd = Date.now();
		spaceshipPosYEnd = spaceshipPosY;
		clearInterval(loop);
		loop = setInterval(endGameAnimation,1);
	}
	
	//Hit box = context.fillRect(canvas.width/3 - (spaceshipSize*0.7)/2, spaceshipY - (spaceshipSize)*0.8/2, spaceshipSize*0.8, spaceshipSize*0.8);
	
	drawImageRotated(imgSpaceship, canvas.width/3, spaceshipY, spaceshipSize, spaceshipSize, 90);
	
	drawAsteroid();
	
	drawHUD();
}

var start = false;
function startGame() {
	//Background
	context.clearRect(0,0, canvas.width, canvas.height);
	context.fillStyle = "black";
	context.fillRect(0,0, canvas.width, canvas.height);
	
	drawStars(canvas.width/320);
	
	var spaceshipSize = (canvas.height*0.8)/3;
	var spaceshipY = 0.1*canvas.height + 2*spaceshipSize + spaceshipSize*0.5;
	drawImageRotated(imgSpaceship, canvas.width/2, spaceshipY, spaceshipSize, spaceshipSize, 90);
	
	context.fillStyle = 'white';
	context.textAlign = "left";
	
	context.font = canvas.width/20 + "px Orbitron";
	context.fillText("spaceship", canvas.width/2 - context.measureText("spaceship").width/2, canvas.height/2);
	
	context.font = canvas.width/40 + "px Orbitron";
	context.fillText("- press any key to start -", canvas.width/2 - context.measureText("- press any key to start -").width/2, canvas.height*0.6);
	
	if(start == true) {
		clearInterval(loop);
		loop = setInterval(startAnimation, 1);
		timeStart = Date.now();
	}
}

function startAnimation() {
	var milliseconds = Date.now() - timeStart;
	
	context.clearRect(0,0, canvas.width, canvas.height);
	context.fillStyle = "black";
	context.fillRect(0,0, canvas.width, canvas.height);
	
	drawStars(canvas.width/(320/(0.002*milliseconds)));
	
	var spaceshipSize = (canvas.height*0.8)/3;
	var spaceshipY = 0.1*canvas.height + 2*spaceshipSize + spaceshipSize*0.5;
	var posX = (2 + milliseconds/1000);
	if(posX > 3) {
		posX = 3;
	}
	if(milliseconds >= 1000) {
		spaceshipY = 0.1*canvas.height + (2 - (milliseconds - 1000)/1000)*spaceshipSize + spaceshipSize*0.5;
	}
	drawImageRotated(imgSpaceship, canvas.width/posX, spaceshipY, spaceshipSize, spaceshipSize, 90);
	
	context.fillStyle = "rgba(255, 255, 255,"+ (500-milliseconds)/500 +")";
	
	context.font = canvas.width/20 + "px Orbitron";
	context.fillText("spaceship", canvas.width/2 - context.measureText("spaceship").width/2, canvas.height/2);
	
	context.font = canvas.width/40 + "px Orbitron";
	context.fillText("- press any key to start -", canvas.width/2 - context.measureText("- press any key to start -").width/2, canvas.height*0.6);
	
	context.fillStyle = 'white';
	context.fillRect((-canvas.width/4)*((2000-milliseconds)/2000), canvas.height*0.9, canvas.width/6, canvas.height*0.1);
	
	context.beginPath();
	context.moveTo((-canvas.width/4)*((2000-milliseconds)/2000)+canvas.width/6, canvas.height*0.9);
	context.lineTo((-canvas.width/4)*((2000-milliseconds)/2000)+(canvas.width/6)*1.5, canvas.height);
	context.lineTo((-canvas.width/4)*((2000-milliseconds)/2000)+canvas.width/6, canvas.height);
	context.closePath();
	context.fill();
	
	context.fillStyle = 'black';
	context.font = canvas.width/42 + "px Orbitron";
	context.textAlign = "left";
	var time = "Time: 00:00";
	context.fillText(time, canvas.width/12 + (-canvas.width/4)*((2000-milliseconds)/2000) - context.measureText(time).width/2, canvas.height*0.965);
	
	
	if(milliseconds >= 2000) {
		clearInterval(loop);
		loop = setInterval(gameLoop, 1);
		timeStart = Date.now();
		spaceshipPosY = 1;
	}
}

var timeEnd;
var randoX = Math.floor(Math.random()*(canvas.width*4)/6 + canvas.width/6);
var randoY = Math.floor(Math.random()*(canvas.height*4)/6 + canvas.height/6);
var spaceshipPosYEnd;
var explosionSize = 0;
function endGameAnimation() {
	var spaceshipSize = (canvas.height*0.8)/3;
	var spaceshipY = 0.1*canvas.height + spaceshipPosYEnd*spaceshipSize + spaceshipSize*0.5;
	
	explosionSize += spaceshipSize/80;
	if(explosionSize >= spaceshipSize/2 && Date.now() - timeEnd < 1250) {
		explosionSize = spaceshipSize/2;
	}
	context.fillStyle = "white";
	context.beginPath();
	context.arc(canvas.width/3, spaceshipY, explosionSize,0,2*Math.PI);
	context.fill();
	
	context.beginPath();
	if(Date.now() - timeEnd >= 250) {
		context.moveTo(canvas.width/3, spaceshipY);
		context.lineTo(randoX, 0);
		context.lineTo(randoX + canvas.height/6, 0);
	}
	context.fill();
	
	context.beginPath();
	if(Date.now() - timeEnd >= 500) {
		context.moveTo(canvas.width/3, spaceshipY);
		context.lineTo(0, randoY);
		context.lineTo(0, randoY + canvas.width/6);
	}
	context.fill();
	
	context.beginPath();
	if(Date.now() - timeEnd >= 750) {
		context.moveTo(canvas.width/3, spaceshipY);
		context.lineTo(randoX, canvas.height);
		context.lineTo(randoX - canvas.width/6, canvas.height);
	}
	context.fill();
	
	context.beginPath();
	if(Date.now() - timeEnd >= 1000) {
		context.moveTo(canvas.width/3, spaceshipY);
		context.lineTo(canvas.width, randoY);
		context.lineTo(canvas.width, randoY - canvas.height/6);
	}
	context.fill();
	
	if(Date.now() - timeEnd >= 2600) {
		timeEnd = Date.now();
		clearInterval(loop);
		loop = setInterval(endGame,1);
	}
	
	restart = false;
	
}

var restart = false;
function endGame() {
	
	context.clearRect(0,0, canvas.width, canvas.height);
	context.fillStyle = "white";
	context.fillRect(0,0, canvas.width, canvas.height);
	
	var skullSize = (canvas.height*0.5)/3;
	var skullPosY = canvas.height*0.00066*(Date.now() - timeEnd);
	if(skullPosY >= 0.33*canvas.height) {
		skullPosY = 0.33*canvas.height;
	}
	
	drawImageRotated(imgSkull, canvas.width/2, skullPosY, skullSize, skullSize, 0);
	
	context.fillStyle = "rgba(0, 0, 0,"+ (Date.now() - timeEnd)/1000 +")";
	context.textAlign = "left";
	
	context.font = canvas.width/20 + "px Orbitron";
	context.fillText("- This is the End -", canvas.width/2 - context.measureText("- This is the End -").width/2, canvas.height*0.2);
	
	context.font = canvas.width/30 + "px Orbitron";
	var text = "You survived " + minutes+ " minutes and "+ seconds+" seconds!";
	context.fillText(text, canvas.width/2 - context.measureText(text).width/2, canvas.height/2);
	
	context.font = canvas.width/40 + "px Orbitron";
	context.fillText("- press any key to restart -", canvas.width/2 - context.measureText("- press any key to restart -").width/2, canvas.height*0.8);
	
	if(restart == true) {
		start = false;
		randoX = Math.floor(Math.random()*(canvas.width*4)/6 + canvas.width/6);
		randoY = Math.floor(Math.random()*(canvas.height*4)/6 + canvas.height/6);
		explosionSize = 0;
		restart = false;
		asteroidPosX = [];
		asteroidPosY = [];
		asteroidRotation = [];
		asteroidRotationDirection = [];
		asteroidRotationSpeed = [];
		asteroidSpeed = [];
		round = 0;
		intervalSet = false;
		timeStart = Date.now();
		clearInterval(spawnInterval);
		
		clearInterval(loop);
		loop = setInterval(startGame, 1);
	}
	
}

function drawImageRotated(img, x, y, w, h, deg) {
	context.mozImageSmoothingEnabled = false;
	context.webkitImageSmoothingEnabled = false;
	context.msImageSmoothingEnabled = false;
	context.imageSmoothingEnabled = false;

	img.width = w;
	img.height = h;
	
	context.save();
	context.translate(x, y);
	context.rotate(deg*Math.PI/180);
	context.translate(-x, -y);
	context.drawImage(img, x - img.width/2, y - img.height/2, w, h);
	context.restore();	
}

//Stars
var starPosX = new Array();
var starPosY = new Array();
var starsCount = canvas.width/25;

for(i = 0; i < starsCount; i++) {
	starPosX[i] = Math.floor(Math.random()*canvas.width*2);
	starPosY[i] = Math.floor(Math.random()*canvas.height);
}
function drawStars(speed) {
	for(i = 0; i < starsCount; i++) {
		if(starPosX[i] < 0) {
			starPosX[i] = Math.floor(Math.random()*canvas.width) + canvas.width;
			starPosY[i] = Math.floor(Math.random()*canvas.height);
		} else {
			starPosX[i] -= speed;
		}

		context.fillStyle = "white";
		if(starPosX[i] < canvas.width) {
			context.fillRect(starPosX[i], starPosY[i], 2, 2)
		}
	}
}

//Asteroid
var asteroidPosX = new Array();
var asteroidPosY = new Array();
var asteroidRotation = new Array();
var asteroidRotationDirection = new Array();
var asteroidRotationSpeed = new Array();
var asteroidSpeed = new Array();

function newAsteroid(line, speed) {
	var asteroidSize = (canvas.height*0.8)/3;
	asteroidPosX.push(canvas.width + asteroidSize/2);
	asteroidPosY.push(0.1*canvas.height + line*asteroidSize + asteroidSize*0.5);
	asteroidRotation.push(0);
	asteroidRotationDirection.push(Math.floor(Math.random()*2));
	asteroidRotationSpeed.push(1);
	asteroidSpeed.push(speed);
}

function newAsteroidPattern(speed) {
	
	switch(Math.floor(Math.random()*5)) {
		case 0:
			newAsteroid(0, speed);
			break;
		case 1:
			newAsteroid(0, speed);
			newAsteroid(1, speed);
		break;
		case 2:
			newAsteroid(0, speed);
			newAsteroid(2, speed);
		break;
		case 3:
			newAsteroid(1, speed);
		break;
		case 4:
			newAsteroid(1, speed);
			newAsteroid(2, speed);
		break;
	}
}

function drawAsteroid() {
	
	var asteroidSize = (canvas.height*0.8)/3;
	
	for(i = 0; i < asteroidPosX.length; i++) {
		
		//Rotation
		
		if(asteroidRotationDirection[i] == 1) {
			if(asteroidRotation[i] == 360) {
				asteroidRotation[i] = 0;
			} else {
				asteroidRotation[i] += asteroidRotationSpeed[i];
			}
		} else {
			if(asteroidRotation[i] == 0) {
				asteroidRotation[i] = 360;
			} else {
				asteroidRotation[i] -= asteroidRotationSpeed[i];
			}
		}
		
		//Speed 
		if(asteroidPosX < 0 - asteroidSize) {
			asteroidPosX.splice(i, 1);
			asteroidPosY.splice(i, 1);
			asteroidRotation.splice(i, 1);
			asteroidRotationDirection.splice(i, 1);
			asteroidRotationSpeed.splice(i, 1);
			asteroidSpeed.splice(i, 1);
		} else {
			asteroidPosX[i] -= asteroidSpeed[i];
		}
		
		drawImageRotated(imgAsteroid, asteroidPosX[i], asteroidPosY[i], asteroidSize, asteroidSize, asteroidRotation[i]);
		
	}
	
}

var spawnInterval;
var round = 0;
var intervalSet = false;
function asteroidHandler() {
	if(totalSeconds < 20*round+2 && totalSeconds > 20*(round-1)) {
		intervalSet = false;
	}
	
	if(totalSeconds == 20*round + 2&& !intervalSet) {
		clearInterval(spawnInterval);
		var speed = Math.floor(3*Math.pow(1.25, round+1));
		var inter = Math.floor(3000*Math.pow(0.5, round+1));

		if(inter < 1000) {
			inter = 1000;
		}
		
		spawnInterval = setInterval(function() {newAsteroidPattern(speed); }, inter);
		intervalSet = true;
		console.log("test");
		round++;
	}
	
}

//hud
var timeStart = Date.now();
var milliseconds;
var totalSeconds;
var minutes;
var seconds;


function drawHUD() {
	context.fillStyle = 'white';
	context.fillRect(0, canvas.height*0.9, canvas.width/6, canvas.height*0.1);
	
	context.beginPath();
	context.moveTo(canvas.width/6, canvas.height*0.9);
	context.lineTo((canvas.width/6)*1.5, canvas.height);
	context.lineTo(canvas.width/6, canvas.height);
	context.closePath();
	context.fill();
	
	milliseconds = Date.now() - timeStart;
	totalSeconds = Math.floor(milliseconds/1000);
	minutes = Math.floor(totalSeconds/60);
	seconds = totalSeconds - minutes * 60;
	
	var time = "Time: ";
	if(minutes < 10) {
		time += "0";
	}
	time += minutes + ":";
	
	if(seconds < 10) {
		time += "0";
	}
	time += seconds;
	
	context.fillStyle = 'black';
	context.font = canvas.width/42 + "px Orbitron";
	context.textAlign = "left";
	context.fillText(time, canvas.width/12 - context.measureText(time).width/2, canvas.height*0.965);
	
}


var loop = setInterval(startGame, 1);



