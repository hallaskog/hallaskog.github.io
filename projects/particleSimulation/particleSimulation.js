var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight; 

var ball = [];
var gravity = 1;
var friction = 0.99;

function Particle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
}

function init() {
	for(var i = 0; i < 20; i++) {
		
		var radius = getRandomInt(20, 60);
		var x = getRandomInt(radius, canvas.width - radius);
		var y = getRandomInt(radius, canvas.height - radius*4);
		var dx = getRandomInt(-5, 5);
		var dy = getRandomInt(-2, 2);
		
		ball.push(new Particle(x, y , dx , dy, radius));
	}
}



function drawObjects() {
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	for(var i = 0; i < ball.length; i++) {
		context.beginPath();
		context.arc(ball[i].x, ball[i].y, ball[i].radius*1.5, 0, 2 * Math.PI);
		context.fillStyle = "rgba(255, 255, 255, 0.65)";
		context.fill();
		
		context.beginPath();
		context.arc(ball[i].x, ball[i].y, ball[i].radius, 0, 2 * Math.PI);
		context.fillStyle = "rgba(255, 255, 255, 1)";
		context.fill();
	}
}

function move() {
	for(var i = 0; i < ball.length; i++) {
		
		if(ball[i].x + ball[i].radius > canvas.width || ball[i].x - ball[i].radius <= 0) {
			ball[i].dx = -ball[i].dx * friction;
		}
		
		if(ball[i].y + ball[i].radius > canvas.height) {
			ball[i].dy = -ball[i].dy * friction;
			ball[i].dx = ball[i].dx * friction;
		} else {
			ball[i].dy += gravity * friction;
		}
		
		ball[i].x += ball[i].dx;
		ball[i].y += ball[i].dy;
	}
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min;
}

init();
var interval1 = setInterval(function() {drawObjects()}, 10);
var interval2 = setInterval(function() {move()}, 10);