
class Background {
	constructor(width, height) {
		
		this.width = width;
		this.height = height;
		
		this.layer = [];
		var mult = 1;
		for(var i = 0; i < 40; i++) {
			this.layer.push(new Layer(width, height, 1/mult));
			mult++;
		}
	}
	
	calcNewXY(EV, speed) {
		for(var i = 0; i < this.layer.length; i++) {
			this.layer[i].calcNewXY(EV, speed);
		}
	}
	
	draw(context) {
		context.fillStyle = 'black'
		context.fillRect(0, 0, this.width, this.height); 
		for(var i = 0; i < this.layer.length; i++) {
			this.layer[i].draw(context);
		}
	}
}