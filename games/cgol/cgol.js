var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var xS;
var yS;
var size;
var x0 = 0;
var y0 = 0;
var zoom = 1;

var life = [];
var generationCount = 0;
var skipGenerations = 1;

var drawHUD = true;

//EventListener
document.addEventListener('keydown', function(event) {
	 if(event.key == 'w') {
		y0 += 1;
	  } else if(event.key == 's') {
		y0 -= 1;
	  } else if(event.key == 'd') {
		x0 -= 1;
	  } else if(event.key == 'a') {
		x0 += 1;
	  }
	  
	  if(event.key == '+') {
		  zoom = zoom*2;
	  } else if (event.key == '-') {
		  zoom = zoom/2
	  } else if (event.key == 'r') {
		  zoom = 1;
		  x0 = 0;
		  y0 = 0;
	  }
	  
	  if(event.keyCode == '38') {
		  skipGenerations++;
	  } else if(event.keyCode == '40') {
		  if(skipGenerations-1 > 0)
			skipGenerations--;
	  }
	  
	  if(event.key == ' ') {
		for(var i = 0; i < skipGenerations; i++) {
			generation(); 
		}
		skipGenerations = 1;
	  }
	  
	  if(event.key == 'h') {
		if(drawHUD == true) {
			drawHUD = false;
		} else {
			drawHUD = true;
		}
	  }
	  
});

document.addEventListener('mousedown', function(event) {
	changeCellXY(event.clientX, event.clientY);
});

//init Operationen
function initEmpty() {
	initSize();
	
	for(var x = 0; x < xS; x++) {
		for(var y = 0; y < yS; y++) {
			life.push(0);
		}
	}
	disableButtons();
}

function initRandom() {
	initSize();
	
	for(var x = 0; x < xS; x++) {
		for(var y = 0; y < yS; y++) {
			life.push(Math.floor((Math.random() * 2)));
		}
	}
	disableButtons();
}

function initSize() {
	xS = Number(document.getElementById("widthNumber").value);
	yS = Number(document.getElementById("heightNumber").value);
	size = canvas.height/yS;
	skipGenerations = Number(document.getElementById("skipGeneration").value);
}

//Logik
function generation() {
	var lifeCopy = life.slice(0);
	for(var i = 0; i < life.length; i++) {
		let count = 0;
		
		//Check Feld 0
		if( i % xS != 0 && (i - 1 - xS >= 0)) {
			if(life[i - xS - 1] == 1) {
				count++;
			}
		}
		
		//Check Feld 1
		if( (i - xS) % xS == (i % xS) && (i - xS >= 0)) {
			if(life[i - xS] == 1) {
				count++;
			}
		}
		
		//Check Feld 2
		if( i % xS != (xS-1) && (i - xS + 1 >= 0) ) {
			if(life[i - xS + 1] == 1) {
				count++;
			}
		}
		
		//Check Feld 3
		if( i % xS != 0 && (i - 1 >= 0)) {
			if(life[i - 1] == 1) {
				count++;
			}
		}
		
		//Check Feld 5
		if( i % xS != (xS-1) ) {
			if(life[i + 1] == 1) {
				count++;
			}
		}
		
		//Check Feld 6
		if( i % xS != 0 && (i - 1 + xS < xS*yS)) {
			if(life[i + xS - 1] == 1) {
				count++;
			}
		}
		
		//Check Feld 7
		if( (i + xS) % xS == (i % xS) && (i + xS < xS*yS)) {
			if(life[i + xS] == 1) {
				count++;
			}
		}
		
		//Check Feld 8
		if( i % xS != (xS-1) && (i + xS + 1 < xS*yS) ) {
			if(life[i + xS + 1] == 1) {
				count++;
			}
		}
		
		if(count == 3) {
			lifeCopy[i] = 1;
		} else if(life[i] == 1 && count < 2) {
			lifeCopy[i] = 0;
		} else if(life[i] == 1 && (count == 3 || count == 2)) {
			lifeCopy[i] = 1;
		} else if(life[i] == 1 && count > 3) {
			lifeCopy[i] = 0;
		}
		
	}
	life = lifeCopy;
	generationCount++;
}

function changeCellXY(mousePosX, mousePosY) {
	for(var x = 0; x < xS; x++) {
		for(var y = 0; y < yS; y++) {
			
			if(mousePosX > canvas.width/2 - (xS*size*zoom)/2 + (x+x0)*size*zoom
			&& mousePosX < canvas.width/2 - (xS*size*zoom)/2 + (x+x0)*size*zoom + size*zoom
			&& mousePosY > (y+y0)*size*zoom
			&& mousePosY < (y+y0)*size*zoom + size*zoom) {
				
				if(life[x+xS*y] == 0) {
					life[x+xS*y] = 1;
				} else if(life[x+xS*y] == 1) {
					life[x+xS*y] = 0;
				}
			}
			
			
		}
	}
}

//GUI
function drawGame() {
	//Background
	context.clearRect(0,0, canvas.width, canvas.height);
	context.fillStyle = "#133337";
	context.fillRect(0,0, canvas.width, canvas.height);
	
	context.beginPath();
	for(var x = 0; x < xS; x++) {
		for(var y = 0; y < yS; y++) {
			
			if(life[x+xS*y] == 0) {
				context.fillStyle = "#008080";
			} else {
				context.fillStyle = "#800000";
			}
			
			context.fillRect(canvas.width/2 - (xS*size*zoom)/2 + (x+x0)*size*zoom, (y+y0)*size*zoom, size*zoom, size*zoom);
			context.rect(canvas.width/2 - (xS*size*zoom)/2 + (x+x0)*size*zoom, (y+y0)*size*zoom, size*zoom, size*zoom);
		}
	}
	
	context.lineWidth = 1;
	context.strokeStyle = "black";
	context.stroke();
	
	var text = ["Generation: " + generationCount,
				"SPACE for the next generation",
				"Skip generations: " + skipGenerations,
				"UP to increase the generations skipped",
				"DOWN to decrease the generations skipped",
				"x: " + x0 + " y: " + y0,
				"R to reset camera",
				"W, A, S, D to move camera",
				"+/- to zoom",
				"H to hide this text"];
	
	if(drawHUD == true) {
		context.fillStyle = "white";
		var fontSize = canvas.width/100;
		context.font = fontSize + "px Unlock";
		
		for(var i = 0; i < text.length; i++) {
			context.fillText(text[i],fontSize, fontSize*2+i*fontSize*1.25);
		}
	}
}

function drawMenu() {
	context.clearRect(0,0, canvas.width, canvas.height);
	context.fillStyle = "#133337";
	context.fillRect(0,0, canvas.width, canvas.height);
	
	context.fillStyle = "white";
	var fontSize = canvas.width/25;
	context.font = fontSize + "px Unlock";
	context.fillText("Settings",fontSize, fontSize*2);
	
	context.fillText("Widht:", fontSize, fontSize*3.25);
	var widthNumber = document.getElementById("widthNumber");
    widthNumber.style = "position:absolute;"+
						"left:"+(fontSize*1.5+context.measureText("Width:").width)+"px;"+
						"top:"+(fontSize*2.75)+"px;"+
						"width:"+canvas.width/10+"px;"+
						"height:"+fontSize/2+"px;"+
						"font-size:"+fontSize/2+"px;";
	
	context.fillText("Height:", fontSize, fontSize*4.5);
	var heightNumber = document.getElementById("heightNumber");
    heightNumber.style = "position:absolute;"+
						 "left:"+(fontSize*1.5+context.measureText("Widht:").width)+"px;"+
						 "top:"+(fontSize*4)+"px;"+
						 "width:"+canvas.width/10+"px;"+
						 "height:"+fontSize/2+"px;"+
						 "font-size:"+fontSize/2+"px;";
	var skipGeneration = document.getElementById("skipGeneration");
	skipGeneration.style = "position:absolute;"+
						"left:"+((canvas.width/3)+context.measureText("Skip to Generation:").width - canvas.width/10)+"px;"+
						"top:"+(fontSize*4)+"px;"+
						"width:"+canvas.width/10+"px;"+
						"height:"+fontSize/2+"px;"+
						"font-size:"+fontSize/2+"px;";
	context.fillText("Skip to Generation:", canvas.width/3, fontSize*3.25);
	
	var randomButton = document.getElementById("random");
	randomButton.style = "position:absolute;"+
						"left:"+canvas.width/4+"px;"+
						"top:"+(fontSize*6)+"px;"+
						"width:"+canvas.width/2+"px;"+
						"height:"+fontSize+"px;"+
						"font-size:"+fontSize/2+"px;";
	var emptyButton = document.getElementById("empty");
	emptyButton.style = "position:absolute;"+
						"left:"+canvas.width/4+"px;"+
						"top:"+(fontSize*8)+"px;"+
						"width:"+canvas.width/2+"px;"+
						"height:"+fontSize+"px;"+
						"font-size:"+fontSize/2+"px;";
	if(widthNumber.value <= 0 || heightNumber.value <= 0 || skipGeneration.value <= 0) {
		randomButton.disabled = true;
		emptyButton.disabled = true;
	} else {
		randomButton.disabled = false;
		emptyButton.disabled = false;
	}
}

//Logik des Menüs
function disableButtons() {
	document.getElementById("widthNumber").style.visibility = 'hidden';
	document.getElementById("heightNumber").style.visibility = 'hidden';
	document.getElementById("skipGeneration").style.visibility = 'hidden';
	document.getElementById("random").style.visibility = 'hidden';
	document.getElementById("empty").style.visibility = 'hidden';
	clearInterval(interval);
	interval = setInterval(function() {drawGame()}, 5);
}

//main
var interval = setInterval(function() {drawMenu()}, 5);



