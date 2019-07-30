var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

canvas.addEventListener("click", clickEvent, false);

function draw() {
	//background
	var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
	grd.addColorStop(1, "#0000ff");
	grd.addColorStop(0, "#66ccff");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, canvas.width, canvas.height);


	//header
	var headersize = canvas.height/8;

	var fontSize = canvas.height/12;
	var text = "hallaskog.github.io";
	ctx.fillStyle = 'black';

	ctx.font = fontSize + "px 'Roboto Mono'";
	ctx.fillText(text, canvas.width/24, headersize/2 + fontSize/2);

	//btn
	var size = canvas.width/6;
	var spacingsize = (canvas.height - headersize - 2*size)/3;


	var x = (canvas.width - (3*size + 2*(spacingsize)))/2;
	var y = headersize + spacingsize;

	var px;
	var py;
	
	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 2; j++) {
			px = x + i*(size + spacingsize);
			py = y + j*(size + spacingsize);
			
			grd = ctx.createLinearGradient(0, py, 0, py + size);
			grd.addColorStop(1, "#000000");
			grd.addColorStop(0, "#262626");
			ctx.fillStyle = grd;
			
			ctx.fillRect(px, py, size, size);	
			
			/*
			ctx.fillStyle = 'red';
			ctx.fillRect(px, py + 4*size/5, size, size/5);
			ctx.fillRect(px + size/10, py + size/10, 4*size/5, 4*size/5);
			*/
		}
	}
	
	//portracer
	var names = ["portracer", "spaceship", "parallax effect", "cgol", "particlesim", "coming soon"];
	var imgSrc = ["./projects/portracer/race.png", "./projects/spaceship/spaceship.png", "./projects/p1/ship.png",
				  "./projects/cgol/cgolLogoNew.png", "./projects/particleSimulation/particle.png", "./time.png"];
				  
	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 2; j++) {
			px = x + i*(size + spacingsize);
			py = y + j*(size + spacingsize);
			
			if(names[i + 3*j] != undefined) {
				fontSize = size/6;
				text = names[i + 3*j];
				ctx.font = findFontSize(fontSize, size, text) + " 'Roboto Mono'";
				ctx.fillStyle = 'white';
				ctx.fillText(text, px + size/2 - ctx.measureText(text).width/2, py + size - fontSize/3);
			}
			 
			if(imgSrc[i + 3*j] != undefined) {
				var img = new Image(200, 200);
				img.src = imgSrc[i + 3*j];
			
				ctx.drawImage(img, px + 1.5*size/10, py + size/10, 7*size/10, 7*size/10);
			}
			
		}
	}
	
}

function findFontSize(startFontSize, containerSize, text) {
	ctx.font = startFontSize + "px 'Roboto Mono'";
	var textwidth = ctx.measureText(text).width;
	if(18*containerSize/20 < textwidth) {
		findFontSize(startFontSize - startFontSize/50, containerSize, text);
	}
	return startFontSize;
}

function clickEvent(e) {
	
	switch(getBtn(e.clientX, e.clientY)) {
		case 0:
			window.open("./projects/portracer.html", "_top"); 
			break;
		
		case 1:
			window.open("./projects/spaceship.html", "_top"); 
			break;
		
		case 2:
			window.open("./projects/p1.html", "_top"); 
			break;
		
		case 3:
			window.open("./projects/cgol.html", "_top"); 
			break;
		
		case 4:
			window.open("./projects/particleSimulation.html", "_top"); 
			break;
		
		default:
			break;
	}
	
}

function getBtn(mouseX, mouseY) {
	var size = canvas.width/6;
	var headersize = canvas.height/8;
	var spacingsize = (canvas.height - headersize - 2*size)/3;
	
	var x = (canvas.width - (3*size + 2*(spacingsize)))/2;
	var y = headersize + spacingsize;
	
	var px = 0;
	var py = 0;
	
	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 2; j++) {
			px = x + i*(size + spacingsize);
			py = y + j*(size + spacingsize);
			
			if(mouseX > px && mouseX < px + size && mouseY > py && mouseY < py + size) {
				return (i + 3*j);
			}
			
			
		}
	}
	return -1;
}

draw();
setTimeout(draw, 100);




